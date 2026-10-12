// One-off migration: blog posts used to store tag names in `topics`; they now store
// tag doc ids in `tagIds`. Converts every post that still has `topics`.
//
//   node scripts/migrate-tag-ids.js           # preview changes
//   node scripts/migrate-tag-ids.js --write   # apply them
import "../api/loadenv.js";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  writeBatch,
  deleteField,
} from "firebase/firestore";

const write = process.argv.includes("--write");

const app = initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
});
const db = getFirestore(app);

const tagsSnapshot = await getDocs(collection(db, "tags"));
const tagIdByName = new Map(tagsSnapshot.docs.map((t) => [t.data().name, t.id]));

const postsSnapshot = await getDocs(collection(db, "blogPosts"));
const batch = writeBatch(db);
let changed = 0;

for (const post of postsSnapshot.docs) {
  const { title, topics, tagIds } = post.data();
  if (!Array.isArray(topics)) continue;

  const missing = topics.filter((name) => !tagIdByName.has(name));
  const ids = [...new Set([...(tagIds || []), ...topics.map((name) => tagIdByName.get(name)).filter(Boolean)])];

  console.log(`${post.id} "${title}": [${topics.join(", ")}] -> [${ids.join(", ")}]`);
  if (missing.length > 0) {
    console.log(`  dropping names with no matching tag: ${missing.join(", ")}`);
  }

  batch.update(post.ref, { tagIds: ids, topics: deleteField() });
  changed++;
}

if (changed === 0) {
  console.log("No posts need migrating.");
} else if (write) {
  await batch.commit();
  console.log(`Migrated ${changed} post(s).`);
} else {
  console.log(`\n${changed} post(s) would change. Re-run with --write to apply.`);
}
process.exit(0);
