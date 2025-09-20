import express from "express";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  where
} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

export default function urlShortenerRoute(firebaseApp) {
  const router = express.Router();
  const db = getFirestore(firebaseApp);

  // Generate random slug
  const generateSlug = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Check if slug exists
  const slugExists = async (slug) => {
    const q = query(collection(db, "shortenedUrls"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  // Validate URL format
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // POST route to create shortened URL
  router.post("/", async (req, res) => {
    try {
      const { originalUrl, customSlug, title } = req.body;

      // Validate required fields
      if (!originalUrl) {
        return res.status(400).json({
          error: "Original URL is required"
        });
      }

      // Validate URL format
      if (!isValidUrl(originalUrl)) {
        return res.status(400).json({
          error: "Invalid URL format"
        });
      }

      let slug = customSlug;

      // If custom slug provided, validate it
      if (customSlug) {
        // Check if custom slug is already taken
        if (await slugExists(customSlug)) {
          return res.status(409).json({
            error: "Custom slug already exists"
          });
        }

        // Validate slug format (alphanumeric and hyphens only)
        if (!/^[a-zA-Z0-9-]+$/.test(customSlug)) {
          return res.status(400).json({
            error: "Custom slug can only contain letters, numbers, and hyphens"
          });
        }
      } else {
        // Generate unique slug
        do {
          slug = generateSlug();
        } while (await slugExists(slug));
      }

      // Create the document to add to Firestore
      const urlData = {
        originalUrl: originalUrl,
        slug: slug,
        title: title || null,
        clicks: 0,
        createdAt: Timestamp.now()
      };

      // Add document to the shortenedUrls collection
      const docRef = await addDoc(collection(db, "shortenedUrls"), urlData);

      res.status(201).json({
        success: true,
        message: "URL shortened successfully",
        id: docRef.id,
        data: urlData,
        shortUrl: `${req.protocol}://${req.get('host')}/${slug}`
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET route to retrieve all shortened URLs
  router.get("/", async (req, res) => {
    try {
      const querySnapshot = await getDocs(collection(db, "shortenedUrls"));
      let urls = [];

      querySnapshot.forEach((doc) => {
        urls.push({
          id: doc.id,
          ...doc.data()
        });
      });

      // Sort by creation date (newest first)
      urls.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || new Date(a.createdAt);
        const bTime = b.createdAt?.toDate?.() || new Date(b.createdAt);
        return bTime - aTime;
      });

      res.status(200).json({ urls });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET route to redirect by slug (for frontend SPA redirects)
  router.get("/redirect/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      
      // Query Firestore to find the URL by slug
      const q = query(collection(db, "shortenedUrls"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return res.status(404).json({
          error: "Shortened URL not found"
        });
      }
      
      // Get the first (and should be only) document
      const docSnapshot = querySnapshot.docs[0];
      const urlData = docSnapshot.data();
      
      // Increment click count
      const docRef = doc(db, "shortenedUrls", docSnapshot.id);
      await updateDoc(docRef, {
        clicks: urlData.clicks + 1
      });
      
      // Return the original URL for frontend redirect
      res.json({
        originalUrl: urlData.originalUrl,
        title: urlData.title,
        clicks: urlData.clicks + 1
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET route to retrieve a single shortened URL by document ID
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const docRef = doc(db, "shortenedUrls", id);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return res.status(404).json({
          error: "Shortened URL not found"
        });
      }

      res.status(200).json({
        id: docSnapshot.id,
        ...docSnapshot.data()
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT route to update a shortened URL
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { originalUrl, customSlug, title } = req.body;

      // Validate required fields
      if (!originalUrl) {
        return res.status(400).json({
          error: "Original URL is required"
        });
      }

      // Validate URL format
      if (!isValidUrl(originalUrl)) {
        return res.status(400).json({
          error: "Invalid URL format"
        });
      }

      // Check if document exists
      const docRef = doc(db, "shortenedUrls", id);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return res.status(404).json({
          error: "Shortened URL not found"
        });
      }

      const currentData = docSnapshot.data();
      let slug = currentData.slug;

      // If custom slug is different from current, validate and update
      if (customSlug && customSlug !== currentData.slug) {
        if (await slugExists(customSlug)) {
          return res.status(409).json({
            error: "Custom slug already exists"
          });
        }

        if (!/^[a-zA-Z0-9-]+$/.test(customSlug)) {
          return res.status(400).json({
            error: "Custom slug can only contain letters, numbers, and hyphens"
          });
        }

        slug = customSlug;
      }

      // Update the document
      const updateData = {
        originalUrl: originalUrl,
        slug: slug,
        title: title || null,
        updatedAt: Timestamp.now()
      };

      await updateDoc(docRef, updateData);

      res.status(200).json({
        success: true,
        message: "Shortened URL updated successfully",
        data: { ...currentData, ...updateData }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE route to delete a shortened URL
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "URL ID is required"
        });
      }

      // Check if document exists before deleting
      const docRef = doc(db, "shortenedUrls", id);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return res.status(404).json({
          error: "Shortened URL not found"
        });
      }

      // Delete the document from Firestore
      await deleteDoc(docRef);

      res.status(200).json({
        success: true,
        message: "Shortened URL deleted successfully"
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
