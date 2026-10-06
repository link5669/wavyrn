import JSZip from "jszip";

const BLOCK_SELECTOR = "p, li, h1, h2, h3, h4, h5, h6, td, th";

const IMAGE_TYPES = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  bmp: "image/bmp",
};

// Google Docs shows images at most ~624px wide; 1600px keeps them sharp on high-DPI screens.
const MAX_IMAGE_DIMENSION = 1600;
const WEBP_QUALITY = 0.82;
// SVGs are already compact and GIFs may be animated, so those are uploaded untouched.
const SKIP_CONVERSION = new Set(["image/svg+xml", "image/gif"]);

// Downscales an image and re-encodes it as WebP. Resolves to { blob, name }.
const toWebp = async (blob, name) => {
  if (SKIP_CONVERSION.has(blob.type)) return { blob, name };

  const bitmap = await createImageBitmap(blob);
  const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const webp = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", WEBP_QUALITY));
  // Browsers without WebP encoding (older Safari) fall back to PNG; keep the original then.
  if (!webp || webp.type !== "image/webp") return { blob, name };
  return { blob: webp, name: name.replace(/\.[^.]+$/, "") + ".webp" };
};

const normalizePath = (path) =>
  path.replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");

const dirname = (path) => {
  const i = path.lastIndexOf("/");
  return i === -1 ? "" : path.slice(0, i + 1);
};

const basename = (path) => path.slice(path.lastIndexOf("/") + 1);

// Returns the text following the first occurrence of `label` (e.g. "Author:"),
// limited to the block element it appears in and cut off at any other label.
const findLabeledValue = (doc, label, otherLabels) => {
  for (const el of doc.body.querySelectorAll(BLOCK_SELECTOR)) {
    const text = el.textContent.replace(/ /g, " ");
    const idx = text.indexOf(label);
    if (idx === -1) continue;
    let value = text.slice(idx + label.length);
    for (const other of otherLabels) {
      const cut = value.indexOf(other);
      if (cut !== -1) value = value.slice(0, cut);
    }
    return value.trim();
  }
  return "";
};

const findPageBreak = (doc) =>
  Array.from(doc.body.querySelectorAll("hr")).find((hr) =>
    /page-break-before\s*:\s*always/i.test(hr.getAttribute("style") || ""),
  );

/**
 * Reads a Google Docs "Web Page (.html, zipped)" export.
 *
 * `uploadImage(blob, fileName)` must upload one image and resolve to its public URL.
 * Resolves to the fields to store on the blog post.
 */
export async function importGoogleDocZip(file, uploadImage, onProgress = () => {}) {
  const zip = await JSZip.loadAsync(file);
  const entries = Object.values(zip.files).filter(
    (f) => !f.dir && !f.name.startsWith("__MACOSX/"),
  );

  const htmlEntry = entries.find((f) => /\.html?$/i.test(f.name));
  if (!htmlEntry) throw new Error("No .html file found in the archive.");

  const htmlDir = dirname(normalizePath(htmlEntry.name));
  const doc = new DOMParser().parseFromString(await htmlEntry.async("string"), "text/html");

  // Upload every image referenced by the document and point the <img> tags at the hosted copies.
  const imageEntries = new Map();
  for (const entry of entries) {
    const path = normalizePath(entry.name);
    const ext = path.split(".").pop().toLowerCase();
    if (!IMAGE_TYPES[ext]) continue;
    const relative = path.startsWith(htmlDir) ? path.slice(htmlDir.length) : path;
    imageEntries.set(relative, entry);
    if (!imageEntries.has(basename(relative))) imageEntries.set(basename(relative), entry);
  }

  const imgs = Array.from(doc.querySelectorAll("img[src]")).filter(
    (img) => !/^(https?:|data:)/i.test(img.getAttribute("src")),
  );
  const total = new Set(imgs.map((img) => img.getAttribute("src"))).size;
  const uploaded = new Map();
  for (const img of imgs) {
    const src = normalizePath(decodeURIComponent(img.getAttribute("src")));
    const entry = imageEntries.get(src) || imageEntries.get(basename(src));
    if (!entry) throw new Error(`Image "${src}" is referenced but missing from the archive.`);
    if (!uploaded.has(entry.name)) {
      const name = basename(normalizePath(entry.name));
      const blob = new Blob([await entry.async("uint8array")], {
        type: IMAGE_TYPES[name.split(".").pop().toLowerCase()],
      });
      onProgress(`Converting image ${uploaded.size + 1} of ${total}...`);
      const converted = await toWebp(blob, name);
      onProgress(`Uploading image ${uploaded.size + 1} of ${total}...`);
      uploaded.set(entry.name, await uploadImage(converted.blob, converted.name));
    }
    img.setAttribute("src", uploaded.get(entry.name));
  }

  // Scripts never come from Google Docs; drop them so nothing executes on the site.
  doc.querySelectorAll("script").forEach((s) => s.remove());

  const title = doc.querySelector(".title")?.textContent.trim() || "";
  const preview = doc.querySelector(".subtitle")?.textContent.trim() || "";
  const author = findLabeledValue(doc, "Author:", ["Date:"]);
  const date = findLabeledValue(doc, "Date:", ["Author:"]);

  // The post body is everything after the page break.
  const pageBreak = findPageBreak(doc);
  let content;
  if (pageBreak) {
    const range = doc.createRange();
    range.setStartAfter(pageBreak);
    range.setEndAfter(doc.body.lastChild);
    const wrapper = doc.createElement("div");
    wrapper.appendChild(range.cloneContents());
    content = wrapper.innerHTML;
  } else {
    content = doc.body.innerHTML;
  }

  const contentStyles = Array.from(doc.querySelectorAll("style"))
    .map((s) => s.textContent)
    .join("\n");

  return {
    title,
    author,
    date,
    preview,
    content,
    contentStyles,
    contentBodyClass: doc.body.getAttribute("class") || "",
    contentBodyStyle: doc.body.getAttribute("style") || "",
    contentType: "html",
    warnings: [
      !pageBreak && "No page break found; the entire document was used as the body.",
      !title && 'No element with class "title" found.',
      !preview && 'No element with class "subtitle" found.',
      !author && 'No "Author:" found.',
      !date && 'No "Date:" found.',
    ].filter(Boolean),
  };
}
