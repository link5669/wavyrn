import express from "express";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  Timestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { requireAuth } from "../middleware/auth.js";
import { replaceDropboxUrl } from "../utilities.js";

export const TEAM_CATEGORIES = ["Production", "Sound Design", "Music", "Voice-Over"];
const SOCIAL_PLATFORMS = [
  "website", "instagram", "twitter", "tiktok", "facebook", "threads", "email", "bluesky", "linkedin",
];
const MEDIA_TYPES = ["image", "audio", "video", "embed"];

const sanitizeStorageName = (name) =>
  String(name || "").replace(/[^A-Za-z0-9._-]/g, "_").replace(/^\.+/, "").slice(0, 120);

const text = (value) => (typeof value === "string" ? value.trim() : "");

// Keeps only known fields, in the shapes the site renders. Returns { profile } or { error }.
const readProfile = (body) => {
  const name = text(body.name);
  if (!name) return { error: "Name is required" };

  const list = (value) => (Array.isArray(value) ? value : []);
  return {
    profile: {
      name,
      nameJP: text(body.nameJP),
      title: text(body.title),
      titleJP: text(body.titleJP),
      visible: body.visible !== false,
      categories: TEAM_CATEGORIES.filter((c) => list(body.categories).includes(c)),
      headshot: replaceDropboxUrl(text(body.headshot)),
      headshotPosition: text(body.headshotPosition),
      background: replaceDropboxUrl(text(body.background)),
      bio: typeof body.bio === "string" ? body.bio.trim() : "",
      socials: list(body.socials)
        .map((s) => ({ platform: text(s?.platform), value: text(s?.value) }))
        .filter((s) => SOCIAL_PLATFORMS.includes(s.platform) && s.value),
      media: list(body.media)
        .map((m) => ({
          type: text(m?.type),
          url: m?.type === "embed" ? text(m?.url) : replaceDropboxUrl(text(m?.url)),
          title: text(m?.title),
        }))
        .filter((m) => MEDIA_TYPES.includes(m.type) && m.url),
    },
  };
};

// Storage paths (team/...) of files a profile links to, taken from its download URLs:
// https://firebasestorage.googleapis.com/v0/b/<bucket>/o/team%2F<folder>%2F<file>?alt=media...
const STORAGE_PATH_RE = /firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/([^?"'\s)&]+)/g;
const storedFiles = (profile) => {
  const paths = new Set();
  for (const [, encoded] of JSON.stringify(profile).matchAll(STORAGE_PATH_RE)) {
    const path = decodeURIComponent(encoded);
    if (path.startsWith("team/")) paths.add(path);
  }
  return paths;
};

export default function teamRoute(firebaseApp) {
  const router = express.Router();
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const profilesRef = collection(db, "teamProfiles");

  const loadProfiles = async () => {
    const snapshot = await getDocs(profilesRef);
    return snapshot.docs
      .map((d) => ({ docId: d.id, ...d.data() }))
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  };

  // Deletes files `oldProfile` linked to that no profile in the database links to anymore.
  // Failures are only logged: the profile itself was already saved or deleted.
  const deleteUnusedFiles = async (oldProfile) => {
    try {
      const candidates = storedFiles(oldProfile);
      if (candidates.size === 0) return;
      const inUse = new Set();
      for (const profile of await loadProfiles()) {
        for (const path of storedFiles(profile)) inUse.add(path);
      }
      await Promise.all(
        [...candidates]
          .filter((path) => !inUse.has(path))
          .map((path) => deleteObject(ref(storage, path)).catch((error) => {
            if (error.code !== "storage/object-not-found") throw error;
          })),
      );
    } catch (error) {
      console.error("Failed to delete unused team files:", error);
    }
  };

  // GET all profiles in display order, hidden ones included (they have `visible: false`)
  router.get("/", async (req, res) => {
    try {
      res.status(200).json({ profiles: await loadProfiles(), categories: TEAM_CATEGORIES });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST a file (image, audio or video) for a profile. Body is the raw file;
  // ?fileName names it. Returns its public URL.
  router.post(
    "/files",
    requireAuth,
    express.raw({ type: () => true, limit: "300mb" }),
    async (req, res) => {
      try {
        const fileName = sanitizeStorageName(req.query.fileName);
        if (!fileName || !Buffer.isBuffer(req.body) || req.body.length === 0) {
          return res.status(400).json({ error: "fileName and a file body are required" });
        }
        const folder = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        const fileRef = ref(storage, `team/${folder}/${fileName}`);
        await uploadBytes(fileRef, req.body, {
          contentType: req.get("Content-Type") || "application/octet-stream",
        });
        res.status(201).json({ url: await getDownloadURL(fileRef) });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  );

  // POST a new profile; it goes to the end of the list
  router.post("/", requireAuth, async (req, res) => {
    try {
      const { profile, error } = readProfile(req.body);
      if (error) return res.status(400).json({ error });

      const profiles = await loadProfiles();
      const position = profiles.length ? Math.max(...profiles.map((p) => p.position ?? 0)) + 1 : 1;
      const data = { ...profile, position, createdAt: Timestamp.now(), updatedAt: Timestamp.now() };
      const docRef = await addDoc(profilesRef, data);
      res.status(201).json({ profile: { docId: docRef.id, ...data } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT new positions: body is { order: [docId, ...] } listing every profile
  router.put("/order", requireAuth, async (req, res) => {
    try {
      const order = Array.isArray(req.body.order) ? req.body.order : [];
      const profiles = await loadProfiles();
      const ids = new Set(profiles.map((p) => p.docId));
      if (order.length !== ids.size || !order.every((id) => ids.has(id))) {
        return res.status(400).json({ error: "order must list every profile id once" });
      }
      const batch = writeBatch(db);
      order.forEach((id, i) => batch.update(doc(profilesRef, id), { position: i + 1 }));
      await batch.commit();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT an edited profile (position is unchanged)
  router.put("/:docId", requireAuth, async (req, res) => {
    try {
      const { profile, error } = readProfile(req.body);
      if (error) return res.status(400).json({ error });

      const docRef = doc(profilesRef, req.params.docId);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return res.status(404).json({ error: "Profile not found" });

      await updateDoc(docRef, { ...profile, updatedAt: Timestamp.now() });
      // Files the edit removed from the profile
      await deleteUnusedFiles(snapshot.data());
      res.status(200).json({ profile: { docId: snapshot.id, ...snapshot.data(), ...profile } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE a profile and the uploaded files only it used
  router.delete("/:docId", requireAuth, async (req, res) => {
    try {
      const docRef = doc(profilesRef, req.params.docId);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return res.status(404).json({ error: "Profile not found" });

      await deleteDoc(docRef);
      await deleteUnusedFiles(snapshot.data());
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
