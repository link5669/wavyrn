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
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { requireAuth } from "../middleware/auth.js";

const sanitizeStorageName = (name) =>
  String(name || "").replace(/[^A-Za-z0-9._-]/g, "_").replace(/^\.+/, "").slice(0, 120);

export default function blogRoute(firebaseApp) {
  const router = express.Router();
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

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

  // POST route to create a new blog post
  router.post("/", async (req, res) => {
    try {
      const {
        title, author, date, topics, content, preview, fontColor, slug, previewImage,
        contentType, contentStyles, contentBodyClass, contentBodyStyle,
      } = req.body;

      // Validate required fields
      if (!title || !author || !content) {
        return res.status(400).json({
          error: "Title, author, and content are required",
        });
      }

      // Validate topics array
      if (!Array.isArray(topics)) {
        return res.status(400).json({
          error: "Topics must be an array",
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
        topics: topics,
        content: content,
        preview: preview || "",
        fontColor: fontColor || "#000000", // Default to black if not specified
        slug: finalSlug,
        previewImage: previewImage || "",
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
      const querySnapshot = await getDocs(
        query(collection(db, "blogPosts"), orderBy("createdAt", "desc"))
      );
      
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          docId: doc.id,
          ...doc.data(),
        });
      });

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
      res.status(200).json({
        docId: docSnapshot.id,
        ...docSnapshot.data()
      });
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

      res.status(200).json({
        docId: docSnapshot.id,
        ...docSnapshot.data()
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT route to update a blog post
  router.put("/:docId", async (req, res) => {
    try {
      const { docId } = req.params;
      const {
        title, author, date, topics, content, preview, fontColor, slug, previewImage,
        contentType, contentStyles, contentBodyClass, contentBodyStyle,
      } = req.body;

      // Validate required fields
      if (!title || !author || !content) {
        return res.status(400).json({
          error: "Title, author, and content are required",
        });
      }

      // Validate topics array
      if (!Array.isArray(topics)) {
        return res.status(400).json({
          error: "Topics must be an array",
        });
      }

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
        topics: topics,
        content: content,
        preview: preview || "",
        slug: finalSlug,
        fontColor: fontColor || "#000000", // Default to black if not specified
        previewImage: previewImage !== undefined ? previewImage : (docSnapshot.data().previewImage || ""),
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

      res.status(200).json({
        success: true,
        message: "Blog post updated successfully",
        data: updateData
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
      
      const querySnapshot = await getDocs(
        query(
          collection(db, "blogPosts"),
          where("topics", "array-contains", topic),
          orderBy("createdAt", "desc")
        )
      );
      
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          docId: doc.id,
          ...doc.data(),
        });
      });

      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
