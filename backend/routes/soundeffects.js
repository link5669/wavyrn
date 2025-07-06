import express from "express";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

export default function soundEffectsRoute(firebaseApp) {
    const router = express.Router();
    const db = getFirestore(firebaseApp);

    // POST route to upload SFX name and link
    router.post("/", async (req, res) => {
        try {
            const { name, link } = req.body;

            // Validate required fields
            if (!name || !link) {
                return res.status(400).json({
                    error: "Both 'name' and 'link' are required fields"
                });
            }

            // Create the document to add to Firestore
            const sfxData = {
                name: name,
                link: link,
                createdAt: Timestamp.now()
            };

            // Add document to the soundEffects collection
            const docRef = await addDoc(collection(db, "soundEffects"), sfxData);

            res.status(201).json({
                success: true,
                message: "Sound effect uploaded successfully",
                id: docRef.id,
                data: sfxData
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // GET route to retrieve sound effects
    router.get("/", async (req, res) => {
        try {
            const querySnapshot = await getDocs(collection(db, "soundEffects"));
            let soundEffects = [];

            querySnapshot.forEach((doc) => {
                soundEffects.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            res.status(200).json({ soundEffects });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // DELETE route to delete a sound effect
    router.delete("/:id", async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    error: "Sound effect ID is required"
                });
            }

            // Delete the document from Firestore
            await deleteDoc(doc(db, "soundEffects", id));

            res.status(200).json({
                success: true,
                message: "Sound effect deleted successfully"
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}
