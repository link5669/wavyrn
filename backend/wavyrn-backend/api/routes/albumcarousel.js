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
import { replaceDropboxUrl } from '../utilities.js';

export default function albumRoute(firebaseApp) {
  const router = express.Router();
  const db = getFirestore(firebaseApp);

  // POST route to add album
  router.post("/", async (req, res) => {
    try {
      const { title, track, coverUrl, position } = req.body;

      // Replace Dropbox URL with direct link
      const directLink = replaceDropboxUrl(coverUrl);

      // Validate required fields
      if (!title || !track || !coverUrl) {
        return res.status(400).json({
          error: "All fields (title, track, coverUrl) are required",
        });
      }

      // Get all albums to determine insertion position
      const querySnapshot = await getDocs(
        query(collection(db, "albums"), orderBy("id", "asc"))
      );

      const albums = [];
      querySnapshot.forEach((doc) => {
        albums.push({
          docId: doc.id,
          ...doc.data(),
        });
      });

      let insertPosition = albums.length + 1; // Default to end
      
      // If position is specified, validate and use it
      if (position && position >= 1 && position <= albums.length + 1) {
        insertPosition = position;
      } else if (position && (position < 1 || position > albums.length + 1)) {
        return res.status(400).json({
          error: `Position must be between 1 and ${albums.length + 1}`,
        });
      }

      // Create the document to add to Firestore
      const albumData = {
        id: insertPosition,
        title: title,
        track: track,
        coverUrl: directLink,
        createdAt: Timestamp.now(),
      };

      // If inserting at a specific position, we need to reorder existing items
      if (insertPosition <= albums.length) {
        // Shift existing items to make room
        const batch = writeBatch(db);
        
        // Update IDs for items that need to shift (items at or after the insert position)
        albums.forEach((item, index) => {
          if (item.id >= insertPosition) {
            const docRef = doc(db, "albums", item.docId);
            batch.update(docRef, { id: item.id + 1 }); // Shift by 1
          }
        });

        await batch.commit();
      }

      // Add document to the albums collection
      const docRef = await addDoc(collection(db, "albums"), albumData);

      res.status(201).json({
        success: true,
        message: `Album added successfully at position ${insertPosition}`,
        id: docRef.id,
        data: albumData,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET route to retrieve albums
  router.get("/", async (req, res) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "albums"), orderBy("id", "asc"))
      );
      let albums = [];
      querySnapshot.forEach((doc) => {
        albums.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
      res.status(200).json({ albums });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET route to retrieve a single album
  router.get("/:docId", async (req, res) => {
    try {
      const { docId } = req.params;
      const docRef = doc(db, "albums", docId);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return res.status(404).json({
          error: "Album not found"
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

  // PUT route to set specific position for album
  router.put("/position", async (req, res) => {
    try {
      const { docId, position } = req.body;
      
      console.log("Position request received:", { docId, position, type: typeof position });

      if (!docId || position === undefined || position === null || position < 1) {
        return res.status(400).json({
          error: "Document ID and valid position (>= 1) are required",
        });
      }

      // Get all albums ordered by id
      const querySnapshot = await getDocs(
        query(collection(db, "albums"), orderBy("id", "asc"))
      );

      const albums = [];
      querySnapshot.forEach((doc) => {
        albums.push({
          docId: doc.id,
          ...doc.data(),
        });
      });

      // Find the current item
      const currentIndex = albums.findIndex(item => item.docId === docId);
      if (currentIndex === -1) {
        return res.status(404).json({ error: "Album not found" });
      }

      // Validate position
      console.log("Albums found:", albums.length, "Requested position:", position);
      if (position > albums.length) {
        return res.status(400).json({ 
          error: `Position must be between 1 and ${albums.length}` 
        });
      }

      const newIndex = position - 1; // Convert to 0-based index

      // If no change needed
      if (newIndex === currentIndex) {
        return res.status(200).json({ message: "No change needed" });
      }

      // Reorder the array
      const [movedItem] = albums.splice(currentIndex, 1);
      albums.splice(newIndex, 0, movedItem);

      // Update IDs in batch
      const batch = writeBatch(db);
      albums.forEach((item, index) => {
        const docRef = doc(db, "albums", item.docId);
        batch.update(docRef, { id: index + 1 });
      });

      await batch.commit();

      res.status(200).json({
        success: true,
        message: `Album moved to position ${position}`,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT route to update an album
  router.put("/:docId", async (req, res) => {
    try {
      const { docId } = req.params;
      const { title, track, coverUrl } = req.body;

      // Validate required fields
      if (!title || !track || !coverUrl) {
        return res.status(400).json({
          error: "All fields (title, track, coverUrl) are required",
        });
      }

      // Check if document exists
      const docRef = doc(db, "albums", docId);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return res.status(404).json({
          error: "Album not found"
        });
      }

      // Update the document
      const updateData = {
        title: title,
        track: track,
        coverUrl: coverUrl,
        updatedAt: Timestamp.now()
      };

      await updateDoc(docRef, updateData);

      res.status(200).json({
        success: true,
        message: "Album updated successfully",
        data: updateData
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT route to reorder albums
  router.put("/reorder", async (req, res) => {
    try {
      const { docId, direction } = req.body;

      if (!docId || !direction) {
        return res.status(400).json({
          error: "Document ID and direction are required",
        });
      }

      // Get all albums ordered by id
      const querySnapshot = await getDocs(
        query(collection(db, "albums"), orderBy("id", "asc"))
      );

      const albums = [];
      querySnapshot.forEach((doc) => {
        albums.push({
          docId: doc.id,
          ...doc.data(),
        });
      });

      // Find the current item
      const currentIndex = albums.findIndex((item) => item.docId === docId);
      if (currentIndex === -1) {
        return res.status(404).json({ error: "Album not found" });
      }

      let newIndex;
      switch (direction) {
        case "up":
          newIndex = Math.max(0, currentIndex - 1);
          break;
        case "down":
          newIndex = Math.min(albums.length - 1, currentIndex + 1);
          break;
        case "top":
          newIndex = 0;
          break;
        case "bottom":
          newIndex = albums.length - 1;
          break;
        default:
          return res.status(400).json({ error: "Invalid direction" });
      }

      // If no change needed
      if (newIndex === currentIndex) {
        return res.status(200).json({ message: "No change needed" });
      }

      // Reorder the array
      const [movedItem] = albums.splice(currentIndex, 1);
      albums.splice(newIndex, 0, movedItem);

      // Update IDs in batch
      const batch = writeBatch(db);
      albums.forEach((item, index) => {
        const docRef = doc(db, "albums", item.docId);
        batch.update(docRef, { id: index + 1 });
      });

      await batch.commit();

      res.status(200).json({
        success: true,
        message: "Albums reordered successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE route to delete an album
  router.delete("/:docId", async (req, res) => {
    try {
      const { docId } = req.params;

      if (!docId) {
        return res.status(400).json({
          error: "Album document ID is required",
        });
      }

      // Check if document exists before deleting
      const docRef = doc(db, "albums", docId);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return res.status(404).json({
          error: "Album not found"
        });
      }

      // Delete the document from Firestore
      await deleteDoc(docRef);

      // Reorder remaining items to fill the gap
      const querySnapshot = await getDocs(
        query(collection(db, "albums"), orderBy("id", "asc"))
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
        message: "Album deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
