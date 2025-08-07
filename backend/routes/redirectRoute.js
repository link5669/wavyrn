// redirectRoute.js
import express from "express";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  increment
} from 'firebase/firestore';

export default function redirectRoute(firebaseApp) {
  const router = express.Router();
  const db = getFirestore(firebaseApp);

  // GET route to redirect shortened URLs
  router.get("/:slug", async (req, res) => {
    try {
      const { slug } = req.params;

      // Query for the document with this slug
      const q = query(collection(db, "shortenedUrls"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return res.status(404).json({
          error: "Short URL not found"
        });
      }

      const urlDoc = querySnapshot.docs[0];
      const urlData = urlDoc.data();

      // Increment click count
      await updateDoc(doc(db, "shortenedUrls", urlDoc.id), {
        clicks: increment(1)
      });

      // Redirect to original URL
      res.redirect(301, urlData.originalUrl);
    } catch (error) {
      console.error('Redirect error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
}
