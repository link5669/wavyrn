import { useEffect, useRef } from "react";
import { toDirectDropboxUrl } from "../utilities/dropbox";

const IMPORT_RE = /@import\s+url\(\s*['"]?([^'")]+)['"]?\s*\)\s*;?/gi;

// "90", "1m30s", "1h2m3s" -> seconds
const parseStartTime = (t) => {
  if (!t) return 0;
  if (/^\d+$/.test(t)) return Number(t);
  const [, h = 0, m = 0, sec = 0] = t.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/) || [];
  return Number(h) * 3600 + Number(m) * 60 + Number(sec);
};

// Parses an http(s) link, or returns null. Google Docs exports wrap every link in
// https://www.google.com/url?q=<target>, so that is unwrapped first.
const parseLink = (href) => {
  try {
    let url = new URL(href);
    if (url.hostname === "www.google.com" && url.pathname === "/url") {
      url = new URL(url.searchParams.get("q"));
    }
    return /^https?:$/.test(url.protocol) ? url : null;
  } catch {
    return null;
  }
};

// Returns the embed URL for a link to a YouTube video, or null.
const youTubeEmbedUrl = (href) => {
  const url = parseLink(href);
  if (!url) return null;

  const host = url.hostname.replace(/^(www|m)\./, "");
  let id = null;
  if (host === "youtu.be") {
    id = url.pathname.split("/")[1];
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    id = url.pathname === "/watch"
      ? url.searchParams.get("v")
      : url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
  }
  if (!/^[A-Za-z0-9_-]{11}$/.test(id || "")) return null;

  const start = parseStartTime(url.searchParams.get("t") || url.searchParams.get("start"));
  return `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`;
};

const AUDIO_EXTENSIONS = /\.(mp3|wav|m4a|aac|ogg|oga|flac|opus)$/i;

const youTubePlayer = (src) => {
  const player = document.createElement("div");
  player.style.cssText = "width: 100%; max-width: 640px; aspect-ratio: 16 / 9; margin: 16px 0;";
  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.title = "YouTube video player";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.style.cssText = "width: 100%; height: 100%; border: 0;";
  player.appendChild(iframe);
  return player;
};

const filePlayer = (url) => {
  const kind = AUDIO_EXTENSIONS.test(url.pathname) ? "audio" : "video";
  const player = document.createElement(kind);
  player.src = toDirectDropboxUrl(url.href);
  player.controls = true;
  player.preload = "metadata";
  if (kind === "video") player.playsInline = true;
  player.style.cssText = `display: block; width: 100%; max-width: 640px; margin: ${kind === "video" ? 16 : 8}px 0;`;
  return player;
};

const EMBED_FILE_RE = /\[EmbedFile\]\(\s*([^)]*?)\s*\)/g;

// Range covering characters [start, end) of `el.textContent`
const textRange = (el, start, end) => {
  const range = document.createRange();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let offset = 0;
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const length = node.data.length;
    if (offset <= start && start <= offset + length) range.setStart(node, start - offset);
    if (offset <= end && end <= offset + length) {
      range.setEnd(node, end - offset);
      break;
    }
    offset += length;
  }
  return range;
};

// Replaces each "[EmbedFile](link)" typed in the document with an audio or video player.
// The text may be split across spans, and the link is either typed out or a hyperlink
// (e.g. "[EmbedFile](here)" with "here" linked), so matching is done on the block's text.
const embedFiles = (body) => {
  for (const block of body.querySelectorAll("p, li, h1, h2, h3, h4, h5, h6")) {
    const matches = [...block.textContent.matchAll(EMBED_FILE_RE)];
    // Last match first so earlier offsets stay valid as text is removed
    for (const match of matches.reverse()) {
      const range = textRange(block, match.index, match.index + match[0].length);
      const linked = [...block.querySelectorAll("a[href]")].find((a) => range.intersectsNode(a));
      const url = parseLink(match[1]) || (linked && parseLink(linked.getAttribute("href")));
      if (!url) continue;

      const youTubeSrc = youTubeEmbedUrl(url.href);
      range.deleteContents();
      range.insertNode(youTubeSrc ? youTubePlayer(youTubeSrc) : filePlayer(url));
    }
  }
};

// Adds a player for every YouTube link. A paragraph holding only the link is replaced by
// the player; otherwise the player goes after the paragraph so the surrounding text stays.
const embedYouTubeLinks = (body) => {
  const lastInserted = new Map(); // top-level block -> last player placed after it
  for (const link of body.querySelectorAll("a[href]")) {
    const src = youTubeEmbedUrl(link.getAttribute("href"));
    // Skip links inside a paragraph an earlier player already replaced
    if (!src || !body.contains(link)) continue;

    let block = link;
    while (block.parentElement !== body) block = block.parentElement;

    const player = youTubePlayer(src);
    if (block.textContent.trim() === link.textContent.trim() && !block.querySelector("img")) {
      block.replaceWith(player);
    } else {
      (lastInserted.get(block) || block).after(player);
      lastInserted.set(block, player);
    }
  }
};

// Renders HTML exported from Google Docs exactly as given. The document's own
// stylesheet is scoped to a shadow root so it can't leak into (or be overridden by) the site.
const GoogleDocContent = ({ html, styles = "", bodyClass = "", bodyStyle = "" }) => {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // @font-face rules don't apply inside shadow roots, so font imports go in the document head.
    for (const [, url] of styles.matchAll(IMPORT_RE)) {
      if (!document.head.querySelector(`link[data-gdoc-font="${CSS.escape(url)}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        link.dataset.gdocFont = url;
        document.head.appendChild(link);
      }
    }

    const root = host.shadowRoot || host.attachShadow({ mode: "open" });
    root.innerHTML = "";

    const style = document.createElement("style");
    style.textContent = `:host { all: initial; display: block; overflow-x: auto; }\n${styles.replace(IMPORT_RE, "")}`;
    root.appendChild(style);

    // Stands in for the Google Docs <body>. Its page padding/width are dropped because the
    // site's post card already provides them.
    const body = document.createElement("div");
    if (bodyClass) body.className = bodyClass;
    body.setAttribute("style", bodyStyle);
    body.style.padding = "0";
    body.style.maxWidth = "none";
    body.innerHTML = html;
    embedFiles(body);
    embedYouTubeLinks(body);
    root.appendChild(body);
  }, [html, styles, bodyClass, bodyStyle]);

  return <div ref={hostRef} />;
};

export default GoogleDocContent;
