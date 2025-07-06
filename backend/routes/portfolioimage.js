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
  writeBatch,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

export default function portfolioRoute(firebaseApp) {
  const router = express.Router();
  const db = getFirestore(firebaseApp);

  // POST route to upload portfolio image
  router.post("/", async (req, res) => {
    try {
      const { title, subtitle, imgSrc } = req.body;

      // Validate required fields
      if (!title || !subtitle || !imgSrc) {
        return res.status(400).json({
          error: "All fields (title, subtitle, imgSrc) are required",
        });
      }

      // Get the current highest ID to assign the next one
      const querySnapshot = await getDocs(
        query(collection(db, "portfolioImages"), orderBy("id", "desc"))
      );

      let nextId = 1;
      if (!querySnapshot.empty) {
        const highestDoc = querySnapshot.docs[0];
        nextId = (highestDoc.data().id || 0) + 1;
      }

      // Create the document to add to Firestore
      const portfolioData = {
        id: nextId,
        title: title,
        subtitle: subtitle,
        imgSrc: imgSrc,
        createdAt: Timestamp.now(),
      };

      // Add document to the portfolioImages collection
      const docRef = await addDoc(
        collection(db, "portfolioImages"),
        portfolioData,
      );

      res.status(201).json({
        success: true,
        message: "Portfolio image uploaded successfully",
        id: docRef.id,
        data: portfolioData,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET route to retrieve portfolio images
  router.get("/", async (req, res) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "portfolioImages"), orderBy("id", "asc")),
      );
      let portfolioImages = [];
      querySnapshot.forEach((doc) => {
        portfolioImages.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
      res.status(200).json({ portfolioImages });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT route to reorder portfolio images
  router.put("/reorder", async (req, res) => {
    try {
      const { docId, direction } = req.body;

      if (!docId || !direction) {
        return res.status(400).json({
          error: "Document ID and direction are required",
        });
      }

      // Get all portfolio images ordered by id
      const querySnapshot = await getDocs(
        query(collection(db, "portfolioImages"), orderBy("id", "asc"))
      );

      const portfolioImages = [];
      querySnapshot.forEach((doc) => {
        portfolioImages.push({
          docId: doc.id,
          ...doc.data(),
        });
      });

      // Find the current item
      const currentIndex = portfolioImages.findIndex(item => item.docId === docId);
      if (currentIndex === -1) {
        return res.status(404).json({ error: "Portfolio image not found" });
      }

      let newIndex;
      switch (direction) {
        case 'up':
          newIndex = Math.max(0, currentIndex - 1);
          break;
        case 'down':
          newIndex = Math.min(portfolioImages.length - 1, currentIndex + 1);
          break;
        case 'top':
          newIndex = 0;
          break;
        case 'bottom':
          newIndex = portfolioImages.length - 1;
          break;
        default:
          return res.status(400).json({ error: "Invalid direction" });
      }

      // If no change needed
      if (newIndex === currentIndex) {
        return res.status(200).json({ message: "No change needed" });
      }

      // Reorder the array
      const [movedItem] = portfolioImages.splice(currentIndex, 1);
      portfolioImages.splice(newIndex, 0, movedItem);

      // Update IDs in batch
      const batch = writeBatch(db);
      portfolioImages.forEach((item, index) => {
        const docRef = doc(db, "portfolioImages", item.docId);
        batch.update(docRef, { id: index + 1 });
      });

      await batch.commit();

      res.status(200).json({
        success: true,
        message: "Portfolio images reordered successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE route to delete a portfolio image
  router.delete("/:docId", async (req, res) => {
    try {
      const { docId } = req.params;

      if (!docId) {
        return res.status(400).json({
          error: "Portfolio image document ID is required",
        });
      }

      // Delete the document from Firestore
      await deleteDoc(doc(db, "portfolioImages", docId));

      // Reorder remaining items to fill the gap
      const querySnapshot = await getDocs(
        query(collection(db, "portfolioImages"), orderBy("id", "asc"))
      );

      const batch = writeBatch(db);
      let newId = 1;

      querySnapshot.forEach((doc) => {
        batch.update(doc.ref, { id: newId });
        newId++;
      });

      await batch.commit();

      res.status(200).json({
        success: true,
        message: "Portfolio image deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
