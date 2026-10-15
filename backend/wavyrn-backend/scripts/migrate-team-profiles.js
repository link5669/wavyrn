// One-off migration: moves the "Our Team" profiles that used to be hard-coded in
// src/components/UserProfiles.jsx into the teamProfiles collection. Media files that
// were served from the site's public/ folder are uploaded to Storage under team/.
//
//   node scripts/migrate-team-profiles.js           # preview
//   node scripts/migrate-team-profiles.js --write   # upload files and create profiles
//
// Refuses to run if any profiles already exist, so it can't overwrite edits made in the editor.
import "../api/loadenv.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, writeBatch, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const write = process.argv.includes("--write");
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(scriptDir, "../../../public");
const profiles = JSON.parse(fs.readFileSync(path.join(scriptDir, "team-profiles.json"), "utf8"));

const CONTENT_TYPES = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
  ".mp3": "audio/mpeg", ".wav": "audio/wav", ".mov": "video/quicktime", ".mp4": "video/mp4",
};

const app = initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
});
const db = getFirestore(app);
const storage = getStorage(app);

const existing = await getDocs(collection(db, "teamProfiles"));
if (!existing.empty) {
  console.log(`teamProfiles already has ${existing.size} profile(s); nothing was changed.`);
  process.exit(1);
}

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// "local:<path under public/>" -> uploaded file's URL
const upload = async (localUrl, profileSlug) => {
  const file = path.join(publicDir, localUrl.slice("local:".length));
  const name = path.basename(file);
  const size = (fs.statSync(file).size / 1e6).toFixed(1);
  if (!write) {
    console.log(`    would upload ${name} (${size} MB)`);
    return localUrl;
  }
  console.log(`    uploading ${name} (${size} MB)...`);
  const fileRef = ref(storage, `team/${profileSlug}/${name.replace(/[^A-Za-z0-9._-]/g, "_")}`);
  await uploadBytes(fileRef, fs.readFileSync(file), {
    contentType: CONTENT_TYPES[path.extname(name).toLowerCase()] || "application/octet-stream",
  });
  return getDownloadURL(fileRef);
};

const batch = writeBatch(db);
for (const [i, profile] of profiles.entries()) {
  const id = slug(profile.name);
  console.log(`${i + 1}. ${profile.name}${profile.visible ? "" : " (hidden)"}`);
  const media = [];
  for (const item of profile.media) {
    media.push({ ...item, url: item.url.startsWith("local:") ? await upload(item.url, id) : item.url });
  }
  batch.set(doc(db, "teamProfiles", id), {
    ...profile,
    media,
    position: i + 1,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

if (write) {
  await batch.commit();
  console.log(`\nCreated ${profiles.length} profiles.`);
} else {
  console.log(`\n${profiles.length} profiles would be created. Re-run with --write to apply.`);
}
process.exit(0);
