import { useEffect, useRef } from "react";

const IMPORT_RE = /@import\s+url\(\s*['"]?([^'")]+)['"]?\s*\)\s*;?/gi;

// "90", "1m30s", "1h2m3s" -> seconds
const parseStartTime = (t) => {
  if (!t) return 0;
  if (/^\d+$/.test(t)) return Number(t);
  const [, h = 0, m = 0, sec = 0] = t.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/) || [];
  return Number(h) * 3600 + Number(m) * 60 + Number(sec);
};

// Returns the embed URL for a link to a YouTube video, or null. Google Docs exports wrap
// every link in https://www.google.com/url?q=<target>, so that is unwrapped first.
const youTubeEmbedUrl = (href) => {
  let url;
  try {
    url = new URL(href);
    if (url.hostname === "www.google.com" && url.pathname === "/url") {
      url = new URL(url.searchParams.get("q"));
    }
  } catch {
    return null;
  }

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

    const player = document.createElement("div");
    player.style.cssText = "width: 100%; max-width: 640px; aspect-ratio: 16 / 9; margin: 16px 0;";
    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = "YouTube video player";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.style.cssText = "width: 100%; height: 100%; border: 0;";
    player.appendChild(iframe);

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
    embedYouTubeLinks(body);
    root.appendChild(body);
  }, [html, styles, bodyClass, bodyStyle]);

  return <div ref={hostRef} />;
};

export default GoogleDocContent;
