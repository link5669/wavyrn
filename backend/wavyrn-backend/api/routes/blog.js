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

export default function blogRoute(firebaseApp) {
  const router = express.Router();
  const db = getFirestore(firebaseApp);

  // POST route to create a new blog post
  router.post("/", async (req, res) => {
    try {
      const { title, author, date, topics, content, preview, fontColor } = req.body;

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

      // Create the document to add to Firestore
      const blogData = {
        title: title,
        author: author,
        date: date || new Date().toISOString(),
        topics: topics,
        content: content,
        preview: preview || "",
        fontColor: fontColor || "#000000", // Default to black if not specified
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

  // GET route to retrieve a single blog post
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
      const { title, author, date, topics, content, preview, fontColor } = req.body;

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

      // Update the document
      const updateData = {
        title: title,
        author: author,
        date: date,
        topics: topics,
        content: content,
        preview: preview || "",
        fontColor: fontColor || "#000000", // Default to black if not specified
        updatedAt: Timestamp.now(),
      };

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
