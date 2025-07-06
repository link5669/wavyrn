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

export default function albumRoute(firebaseApp) {
  const router = express.Router();
  const db = getFirestore(firebaseApp);

  // POST route to add album
  router.post("/", async (req, res) => {
    try {
      const { title, track, coverUrl } = req.body;

      // Validate required fields
      if (!title || !track || !coverUrl) {
        return res.status(400).json({
          error: "All fields (title, track, coverUrl) are required",
        });
      }

      // Get the current highest ID to assign the next one
      const querySnapshot = await getDocs(
        query(collection(db, "albums"), orderBy("id", "desc"))
      );

      let nextId = 1;
      if (!querySnapshot.empty) {
        const highestDoc = querySnapshot.docs[0];
        nextId = (highestDoc.data().id || 0) + 1;
      }

      // Create the document to add to Firestore
      const albumData = {
        id: nextId,
        title: title,
        track: track,
        coverUrl: coverUrl,
        createdAt: Timestamp.now(),
      };

      // Add document to the albums collection
      const docRef = await addDoc(collection(db, "albums"), albumData);

      res.status(201).json({
        success: true,
        message: "Album added successfully",
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

      // Delete the document from Firestore
      await deleteDoc(doc(db, "albums", docId));

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
