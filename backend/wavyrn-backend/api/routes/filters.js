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

export default function filtersRoute(firebaseApp) {
  const router = express.Router();
  const db = getFirestore(firebaseApp);

  // POST route to add a new tag
  router.post("/tags", async (req, res) => {
    try {
      const { name, category, position } = req.body;

      // Validate required fields
      if (!name || !category) {
        return res.status(400).json({
          error: "Tag name and category are required",
        });
      }

      // Validate category
      const validCategories = ["TOPIC", "PROJECT", "GENRE"];
      if (!validCategories.includes(category)) {
        return res.status(400).json({
          error: `Category must be one of: ${validCategories.join(", ")}`,
        });
      }

      // Get all tags in the specified category to determine position
      const querySnapshot = await getDocs(
        query(collection(db, "tags"), orderBy("category", "asc"), orderBy("position", "asc"))
      );

      const tags = [];
      querySnapshot.forEach((doc) => {
        tags.push({
          docId: doc.id,
          ...doc.data(),
        });
      });

      const categoryTags = tags.filter(tag => tag.category === category);
      let insertPosition = categoryTags.length + 1; // Default to end
      
      // If position is specified, validate and use it
      if (position && position >= 1 && position <= categoryTags.length + 1) {
        insertPosition = position;
      } else if (position && (position < 1 || position > categoryTags.length + 1)) {
        return res.status(400).json({
          error: `Position must be between 1 and ${categoryTags.length + 1}`,
        });
      }

      // Create the document to add to Firestore
      const tagData = {
        name: name,
        category: category,
        position: insertPosition,
        createdAt: Timestamp.now(),
      };

      // If inserting at a specific position, we need to reorder existing items
      if (insertPosition <= categoryTags.length) {
        // Shift existing items to make room
        const batch = writeBatch(db);
        
        // Update positions for items that need to shift (items at or after the insert position)
        categoryTags.forEach((tag) => {
          if (tag.position >= insertPosition) {
            const docRef = doc(db, "tags", tag.docId);
            batch.update(docRef, { position: tag.position + 1 }); // Shift by 1
          }
        });

        await batch.commit();
      }

      // Add document to the tags collection
      const docRef = await addDoc(collection(db, "tags"), tagData);

      res.status(201).json({
        success: true,
        message: `Tag added successfully at position ${insertPosition}`,
        id: docRef.id,
        data: tagData,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET route to retrieve all tags grouped by category
  router.get("/tags", async (req, res) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "tags"), orderBy("category", "asc"), orderBy("position", "asc"))
      );
      
      const tags = [];
      querySnapshot.forEach((doc) => {
        tags.push({
          docId: doc.id,
          ...doc.data(),
        });
      });

      // Group tags by category
      const groupedTags = {
        TOPIC: [],
        PROJECT: [],
        GENRE: []
      };

      tags.forEach(tag => {
        if (groupedTags[tag.category]) {
          groupedTags[tag.category].push(tag);
        }
      });

      res.status(200).json({ tags: groupedTags });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT route to set specific position for tag
  router.put("/tags/position", async (req, res) => {
    try {
      const { docId, position } = req.body;
      
      console.log("Tag position request received:", { docId, position, type: typeof position });

      if (!docId || position === undefined || position === null || position < 1) {
        return res.status(400).json({
          error: "Document ID and valid position (>= 1) are required",
        });
      }

      // Get all tags ordered by category and position
      const querySnapshot = await getDocs(
        query(collection(db, "tags"), orderBy("category", "asc"), orderBy("position", "asc"))
      );

      const tags = [];
      querySnapshot.forEach((doc) => {
        tags.push({
          docId: doc.id,
          ...doc.data(),
        });
      });

      // Find the current item
      const currentIndex = tags.findIndex(item => item.docId === docId);
      if (currentIndex === -1) {
        return res.status(404).json({ error: "Tag not found" });
      }

      const currentTag = tags[currentIndex];
      const categoryTags = tags.filter(tag => tag.category === currentTag.category);

      // Validate position within category
      console.log("Category tags found:", categoryTags.length, "Requested position:", position);
      if (position > categoryTags.length) {
        return res.status(400).json({ 
          error: `Position must be between 1 and ${categoryTags.length}` 
        });
      }

      const newIndex = position - 1; // Convert to 0-based index within category
      const currentCategoryIndex = categoryTags.findIndex(tag => tag.docId === docId);

      // If no change needed
      if (newIndex === currentCategoryIndex) {
        return res.status(200).json({ message: "No change needed" });
      }

      // Reorder the category array
      const [movedItem] = categoryTags.splice(currentCategoryIndex, 1);
      categoryTags.splice(newIndex, 0, movedItem);

      // Update positions in batch
      const batch = writeBatch(db);
      categoryTags.forEach((item, index) => {
        const docRef = doc(db, "tags", item.docId);
        batch.update(docRef, { position: index + 1 });
      });

      await batch.commit();

      res.status(200).json({
        success: true,
        message: `Tag moved to position ${position}`,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT route to update a tag
  router.put("/tags/:docId", async (req, res) => {
    try {
      const { docId } = req.params;
      const { name, category } = req.body;

      // Validate required fields
      if (!name || !category) {
        return res.status(400).json({
          error: "Tag name and category are required",
        });
      }

      // Validate category
      const validCategories = ["TOPIC", "PROJECT", "GENRE"];
      if (!validCategories.includes(category)) {
        return res.status(400).json({
          error: `Category must be one of: ${validCategories.join(", ")}`,
        });
      }

      // Check if document exists
      const docRef = doc(db, "tags", docId);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return res.status(404).json({
          error: "Tag not found"
        });
      }

      // Update the document
      const updateData = {
        name: name,
        category: category,
        updatedAt: Timestamp.now()
      };

      await updateDoc(docRef, updateData);

      res.status(200).json({
        success: true,
        message: "Tag updated successfully",
        data: updateData
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE route to delete a tag
  router.delete("/tags/:docId", async (req, res) => {
    try {
      const { docId } = req.params;

      if (!docId) {
        return res.status(400).json({
          error: "Tag document ID is required",
        });
      }

      // Check if document exists before deleting
      const docRef = doc(db, "tags", docId);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return res.status(404).json({
          error: "Tag not found"
        });
      }

      const tagData = docSnapshot.data();
      const category = tagData.category;

      // Delete the document from Firestore
      await deleteDoc(docRef);

      // Reorder remaining items in the same category to fill the gap
      const querySnapshot = await getDocs(
        query(collection(db, "tags"), orderBy("category", "asc"), orderBy("position", "asc"))
      );

      const batch = writeBatch(db);
      let newPosition = 1;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.category === category) {
          batch.update(doc.ref, { position: newPosition });
          newPosition++;
        }
      });

      await batch.commit();

      res.status(200).json({
        success: true,
        message: "Tag deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST route to add a new category
  router.post("/categories", async (req, res) => {
    try {
      const { name, displayName, color } = req.body;

      // Validate required fields
      if (!name || !displayName) {
        return res.status(400).json({
          error: "Category name and display name are required",
        });
      }

      // Validate category name format (should be uppercase)
      if (name !== name.toUpperCase()) {
        return res.status(400).json({
          error: "Category name must be uppercase",
        });
      }

      // Check if category already exists
      const querySnapshot = await getDocs(collection(db, "categories"));
      const existingCategories = [];
      querySnapshot.forEach((doc) => {
        existingCategories.push(doc.data());
      });

      if (existingCategories.some(cat => cat.name === name)) {
        return res.status(400).json({
          error: "Category already exists",
        });
      }

      // Create the document to add to Firestore
      const categoryData = {
        name: name,
        displayName: displayName,
        color: color || "#CE0036", // Default color
        createdAt: Timestamp.now(),
      };

      // Add document to the categories collection
      const docRef = await addDoc(collection(db, "categories"), categoryData);

      res.status(201).json({
        success: true,
        message: "Category added successfully",
        id: docRef.id,
        data: categoryData,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET route to retrieve all categories
  router.get("/categories", async (req, res) => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({
          docId: doc.id,
          ...doc.data(),
        });
      });

      res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT route to update a category
  router.put("/categories/:docId", async (req, res) => {
    try {
      const { docId } = req.params;
      const { displayName, color } = req.body;

      // Check if document exists
      const docRef = doc(db, "categories", docId);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return res.status(404).json({
          error: "Category not found"
        });
      }

      // Update the document
      const updateData = {
        displayName: displayName,
        color: color,
        updatedAt: Timestamp.now()
      };

      await updateDoc(docRef, updateData);

      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: updateData
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
