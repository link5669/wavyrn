import express from "express";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
  getDoc,
  where,
  deleteField,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { requireAuth } from "../middleware/auth.js";
import { replaceDropboxUrl } from "../utilities.js";

const sanitizeStorageName = (name) =>
  String(name || "").replace(/[^A-Za-z0-9._-]/g, "_").replace(/^\.+/, "").slice(0, 120);

export default function blogRoute(firebaseApp) {
  const router = express.Router();
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  // Storage folders (blog/<uploadId>) holding a post's images. Posts don't record their
  // upload ids, but every image URL encodes its storage path:
  // https://firebasestorage.googleapis.com/v0/b/<bucket>/o/blog%2F<uploadId>%2F<file>?alt=media...
  const STORAGE_PATH_RE = /firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/([^?"'\s)&]+)/g;
  const imageFolders = (post) => {
    const folders = new Set();
    const text = `${post.content || ""} ${post.previewImage || ""}`;
    for (const [, encoded] of text.matchAll(STORAGE_PATH_RE)) {
      const path = decodeURIComponent(encoded);
      const folder = path.slice(0, path.lastIndexOf("/"));
      if (folder.startsWith("blog/")) folders.add(folder);
    }
    return folders;
  };

  // Deletes the image folders `oldPost` used, unless a post still in the database uses them
  // (the updated version of the same post, or another post). Failures are only logged:
  // the post itself was already saved or deleted.
  const deleteUnusedImages = async (oldPost) => {
    try {
      const candidates = imageFolders(oldPost);
      if (candidates.size === 0) return;

      const inUse = new Set();
      for (const postDoc of (await getDocs(collection(db, "blogPosts"))).docs) {
        for (const folder of imageFolders(postDoc.data())) inUse.add(folder);
      }

      for (const folder of candidates) {
        if (inUse.has(folder)) continue;
        const { items } = await listAll(ref(storage, folder));
        await Promise.all(items.map((item) => deleteObject(item)));
      }
    } catch (error) {
      console.error("Failed to delete unused blog images:", error);
    }
  };

  // Tags in display order: by category as the editor's picker lists them, then by position
  const CATEGORY_ORDER = ["TOPIC", "PROJECT", "GENRE"];
  const loadTags = async () => {
    const snapshot = await getDocs(collection(db, "tags"));
    const rank = (tag) => {
      const i = CATEGORY_ORDER.indexOf(tag.category);
      return i === -1 ? CATEGORY_ORDER.length : i;
    };
    return snapshot.docs
      .map((tagDoc) => ({ docId: tagDoc.id, ...tagDoc.data() }))
      .sort((a, b) => rank(a) - rank(b) || (a.position ?? 0) - (b.position ?? 0));
  };

  // Posts store tag doc ids in `tagIds`. Clients may send ids or tag names (older
  // versions of the Google Docs add-on send names), so accept either.
  // Ids come back in display order (the order of `tags`), not the order they were picked.
  const resolveTagIds = (values, tags) => {
    const found = new Set();
    const unknown = [];
    for (const value of values) {
      const tag = tags.find((t) => t.docId === value) || tags.find((t) => t.name === value);
      if (tag) found.add(tag.docId);
      else unknown.push(value);
    }
    return { ids: tags.filter((t) => found.has(t.docId)).map((t) => t.docId), unknown };
  };

  // Adds `topics` (the current tag names) so readers never see stale names after a rename.
  // Posts saved before `tagIds` existed only have `topics` names; map those to ids.
  const withTagNames = (post, tags) => {
    const postTags = post.tagIds
      ? tags.filter((t) => post.tagIds.includes(t.docId))
      : resolveTagIds(post.topics || [], tags).ids.map((id) => tags.find((t) => t.docId === id));
    const tagIds = postTags.map((t) => t.docId);
    const topics = postTags.map((t) => t.name);
    // Also repairs Dropbox links saved before replaceDropboxUrl handled every Dropbox host
    return { ...post, tagIds, topics, previewImage: replaceDropboxUrl(post.previewImage) };
  };

  // Reads the post's tags from the request body as `tagIds`, or `topics` from older clients
  const readTagIds = async (body, res) => {
    const values = body.tagIds ?? body.topics;
    if (!Array.isArray(values)) {
      res.status(400).json({ error: "tagIds must be an array" });
      return null;
    }
    const { ids, unknown } = resolveTagIds(values, await loadTags());
    if (unknown.length > 0) {
      res.status(400).json({ error: `Unknown tags: ${unknown.join(", ")}` });
      return null;
    }
    return ids;
  };

  // POST route to host an image referenced by an imported Google Doc.
  // Body is the raw image; ?uploadId groups images from one import, ?fileName names the file.
  router.post(
    "/images",
    requireAuth,
    express.raw({ type: "image/*", limit: "25mb" }),
    async (req, res) => {
      try {
        const uploadId = sanitizeStorageName(req.query.uploadId);
        const fileName = sanitizeStorageName(req.query.fileName);
        if (!uploadId || !fileName || !Buffer.isBuffer(req.body) || req.body.length === 0) {
          return res.status(400).json({
            error: "uploadId, fileName, and an image body are required",
          });
        }

        const imageRef = ref(storage, `blog/${uploadId}/${fileName}`);
        await uploadBytes(imageRef, req.body, { contentType: req.get("Content-Type") });
        const url = await getDownloadURL(imageRef);

        res.status(201).json({ success: true, url });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );

  // GET route that relays a remote image so the editor can crop it: browsers won't let
  // a canvas export pixels from another origin unless that origin allows CORS.
  router.get("/image-proxy", requireAuth, async (req, res) => {
    try {
      const url = new URL(replaceDropboxUrl(String(req.query.url || "")));
      if (url.protocol !== "https:" && url.protocol !== "http:") {
        return res.status(400).json({ error: "url must be an http(s) URL" });
      }

      const response = await fetch(url);
      const contentType = response.headers.get("content-type") || "";
      if (!response.ok || !contentType.startsWith("image/")) {
        return res.status(502).json({ error: "Could not load an image from that URL" });
      }

      res.set("Content-Type", contentType);
      res.send(Buffer.from(await response.arrayBuffer()));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // POST route to create a new blog post
  router.post("/", async (req, res) => {
    try {
      const {
        title, author, date, content, preview, fontColor, slug, previewImage,
        contentType, contentStyles, contentBodyClass, contentBodyStyle,
      } = req.body;

      // Validate required fields
      if (!title || !author || !content) {
        return res.status(400).json({
          error: "Title, author, and content are required",
        });
      }

      const tagIds = await readTagIds(req.body, res);
      if (!tagIds) return;

      // Generate slug if not provided
      let finalSlug = slug;
      if (!finalSlug) {
        finalSlug = title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
          .trim();
      }

      // Check if slug already exists
      const existingSlugQuery = query(
        collection(db, "blogPosts"),
        where("slug", "==", finalSlug)
      );
      const existingSlugSnapshot = await getDocs(existingSlugQuery);
      
      if (!existingSlugSnapshot.empty) {
        return res.status(400).json({
          error: "A blog post with this slug already exists",
        });
      }

      // Create the document to add to Firestore
      const blogData = {
        title: title,
        author: author,
        date: date || new Date().toISOString(),
        tagIds: tagIds,
        content: content,
        preview: preview || "",
        fontColor: fontColor || "#000000", // Default to black if not specified
        slug: finalSlug,
        previewImage: replaceDropboxUrl(previewImage || ""),
        contentType: contentType || "markdown",
        contentStyles: contentStyles || "",
        contentBodyClass: contentBodyClass || "",
        contentBodyStyle: contentBodyStyle || "",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        published: true, // Instantly published as per requirements
      };

      // Add document to the blogPosts collection
      const docRef = await addDoc(collection(db, "blogPosts"), blogData);

      res.status(201).json({
        success: true,
        message: "Blog post created successfully",
        id: docRef.id,
        data: blogData,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET route to retrieve all blog posts
  router.get("/", async (req, res) => {
    try {
      const [querySnapshot, tags] = await Promise.all([
        getDocs(query(collection(db, "blogPosts"), orderBy("createdAt", "desc"))),
        loadTags(),
      ]);

      const posts = querySnapshot.docs.map((doc) =>
        withTagNames({ docId: doc.id, ...doc.data() }, tags)
      );

      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET route to retrieve a single blog post by slug
  router.get("/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const slugQuery = query(
        collection(db, "blogPosts"),
        where("slug", "==", slug)
      );
      const querySnapshot = await getDocs(slugQuery);

      if (querySnapshot.empty) {
        return res.status(404).json({
          error: "Blog post not found"
        });
      }

      const docSnapshot = querySnapshot.docs[0];
      res.status(200).json(
        withTagNames({ docId: docSnapshot.id, ...docSnapshot.data() }, await loadTags())
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET route to retrieve a single blog post by docId (legacy support)
  router.get("/:docId", async (req, res) => {
    try {
      const { docId } = req.params;
      const docRef = doc(db, "blogPosts", docId);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return res.status(404).json({
          error: "Blog post not found"
        });
      }

      res.status(200).json(
        withTagNames({ docId: docSnapshot.id, ...docSnapshot.data() }, await loadTags())
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT route to update a blog post
  router.put("/:docId", async (req, res) => {
    try {
      const { docId } = req.params;
      const {
        title, author, date, content, preview, fontColor, slug, previewImage,
        contentType, contentStyles, contentBodyClass, contentBodyStyle,
      } = req.body;

      // Validate required fields
      if (!title || !author || !content) {
        return res.status(400).json({
          error: "Title, author, and content are required",
        });
      }

      const tagIds = await readTagIds(req.body, res);
      if (!tagIds) return;

      // Check if document exists
      const docRef = doc(db, "blogPosts", docId);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return res.status(404).json({
          error: "Blog post not found"
        });
      }

      // Generate slug if not provided
      let finalSlug = slug;
      if (!finalSlug) {
        finalSlug = title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
          .trim();
      }

      // Check if slug already exists (excluding current post)
      const existingSlugQuery = query(
        collection(db, "blogPosts"),
        where("slug", "==", finalSlug)
      );
      const existingSlugSnapshot = await getDocs(existingSlugQuery);
      
      // Check if any existing post with this slug is not the current post
      const conflictingPost = existingSlugSnapshot.docs.find(doc => doc.id !== docId);
      if (conflictingPost) {
        return res.status(400).json({
          error: "A blog post with this slug already exists",
        });
      }

      // Update the document
      const updateData = {
        title: title,
        author: author,
        date: date,
        tagIds: tagIds,
        topics: deleteField(), // replaced by tagIds
        content: content,
        preview: preview || "",
        slug: finalSlug,
        fontColor: fontColor || "#000000", // Default to black if not specified
        previewImage: previewImage !== undefined ? replaceDropboxUrl(previewImage) : (docSnapshot.data().previewImage || ""),
        updatedAt: Timestamp.now(),
      };

      // Only replace the imported document's styling when new content was imported
      if (contentType !== undefined) {
        Object.assign(updateData, {
          contentType,
          contentStyles: contentStyles || "",
          contentBodyClass: contentBodyClass || "",
          contentBodyStyle: contentBodyStyle || "",
        });
      }

      await updateDoc(docRef, updateData);
      // Images from the replaced version are no longer referenced
      await deleteUnusedImages(docSnapshot.data());

      res.status(200).json({
        success: true,
        message: "Blog post updated successfully",
        data: { ...updateData, topics: undefined },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE route to delete a blog post
  router.delete("/:docId", async (req, res) => {
    try {
      const { docId } = req.params;

      if (!docId) {
        return res.status(400).json({
          error: "Blog post document ID is required",
        });
      }

      // Check if document exists before deleting
      const docRef = doc(db, "blogPosts", docId);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return res.status(404).json({
          error: "Blog post not found"
        });
      }

      // Delete the document from Firestore
      await deleteDoc(docRef);
      await deleteUnusedImages(docSnapshot.data());

      res.status(200).json({
        success: true,
        message: "Blog post deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET route to retrieve blog posts by topic
  router.get("/topic/:topic", async (req, res) => {
    try {
      const { topic } = req.params;

      // `topic` may be a tag id or a tag name
      const tags = await loadTags();
      const [tagId] = resolveTagIds([topic], tags).ids;
      if (!tagId) {
        return res.status(200).json({ posts: [] });
      }

      const querySnapshot = await getDocs(
        query(
          collection(db, "blogPosts"),
          where("tagIds", "array-contains", tagId),
          orderBy("createdAt", "desc")
        )
      );

      const posts = querySnapshot.docs.map((doc) =>
        withTagNames({ docId: doc.id, ...doc.data() }, tags)
      );

      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
