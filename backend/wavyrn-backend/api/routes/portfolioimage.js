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
  getDoc,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

export default function portfolioRoute(firebaseApp) {
  const router = express.Router();
  const db = getFirestore(firebaseApp);

  // POST route to upload portfolio image
  router.post("/", async (req, res) => {
    try {
      const { title, subtitle, imgSrc, position } = req.body;

      // Validate required fields
      if (!title || !subtitle || !imgSrc) {
        return res.status(400).json({
          error: "All fields (title, subtitle, imgSrc) are required",
        });
      }

      // Get all portfolio images to determine insertion position
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

      let insertPosition = portfolioImages.length + 1; // Default to end
      
      // If position is specified, validate and use it
      if (position && position >= 1 && position <= portfolioImages.length + 1) {
        insertPosition = position;
      } else if (position && (position < 1 || position > portfolioImages.length + 1)) {
        return res.status(400).json({
          error: `Position must be between 1 and ${portfolioImages.length + 1}`,
        });
      }

      // Create the document to add to Firestore
      const portfolioData = {
        id: insertPosition,
        title: title,
        subtitle: subtitle,
        imgSrc: imgSrc,
        createdAt: Timestamp.now(),
      };

      // If inserting at a specific position, we need to reorder existing items
      if (insertPosition <= portfolioImages.length) {
        // Shift existing items to make room
        const batch = writeBatch(db);
        
        // Update IDs for items that need to shift (items at or after the insert position)
        portfolioImages.forEach((item, index) => {
          if (item.id >= insertPosition) {
            const docRef = doc(db, "portfolioImages", item.docId);
            batch.update(docRef, { id: item.id + 1 }); // Shift by 1
          }
        });

        await batch.commit();
      }

      // Add document to the portfolioImages collection
      const docRef = await addDoc(
        collection(db, "portfolioImages"),
        portfolioData,
      );

      res.status(201).json({
        success: true,
        message: `Portfolio image added successfully at position ${insertPosition}`,
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

  // PUT route to set specific position for portfolio image
  router.put("/position", async (req, res) => {
    try {
      const { docId, position } = req.body;
      
      console.log("Portfolio position request received:", { docId, position, type: typeof position });

      if (!docId || position === undefined || position === null || position < 1) {
        return res.status(400).json({
          error: "Document ID and valid position (>= 1) are required",
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

      // Validate position
      console.log("Portfolio images found:", portfolioImages.length, "Requested position:", position);
      if (position > portfolioImages.length) {
        return res.status(400).json({ 
          error: `Position must be between 1 and ${portfolioImages.length}` 
        });
      }

      const newIndex = position - 1; // Convert to 0-based index

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
        message: `Portfolio image moved to position ${position}`,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

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

  // PUT route to update a portfolio image
  router.put("/update", async (req, res) => {
    console.log("hit /api/portfolio/update endpoint");

    try {
      const { docId, title, subtitle, imgSrc } = req.body;
      console.log("docId:", docId);

      // Validate required fields
      if (!docId || !title || !subtitle || !imgSrc) {
        return res.status(400).json({
          error: "All fields (docId, title, subtitle, imgSrc) are required",
        });
      }

      // Check if document exists
      const docRef = doc(db, "portfolioImages", docId);
      const docSnapshot = await getDoc(docRef);
      console.log("exists:", docSnapshot.exists());

      if (!docSnapshot.exists()) {
        return res.status(404).json({
          error: "Portfolio image not found",
        });
      }

      // Update the document
      const updateData = {
        title,
        subtitle,
        imgSrc,
        updatedAt: Timestamp.now(),
      };

      await updateDoc(docRef, updateData);

      res.status(200).json({
        success: true,
        message: "Portfolio image updated successfully",
        data: updateData,
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
