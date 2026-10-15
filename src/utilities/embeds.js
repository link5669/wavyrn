// Turns links to YouTube, Spotify and SoundCloud into each service's own embed player.
// The iframe attributes match the embed code each site's share dialog provides.

// Parses an http(s) link, or returns null. Google Docs exports wrap every link in
// https://www.google.com/url?q=<target>, so that is unwrapped first.
export const parseLink = (href) => {
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

// "90", "1m30s", "1h2m3s" -> seconds
const parseStartTime = (t) => {
  if (!t) return 0;
  if (/^\d+$/.test(t)) return Number(t);
  const [, h = 0, m = 0, sec = 0] = t.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/) || [];
  return Number(h) * 3600 + Number(m) * 60 + Number(sec);
};

const youTubeEmbed = (url) => {
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
  return {
    service: "youtube",
    src: `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`,
    title: "YouTube video player",
    aspectRatio: "16 / 9",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
  };
};

// open.spotify.com/track/<id>, also /intl-ja/album/<id> etc.
const spotifyEmbed = (url) => {
  if (url.hostname !== "open.spotify.com") return null;
  const match = url.pathname.match(
    /^\/(?:intl-[a-z-]+\/)?(?:embed\/)?(track|album|playlist|artist|episode|show)\/([A-Za-z0-9]+)/,
  );
  if (!match) return null;
  const [, type, id] = match;
  return {
    service: "spotify",
    src: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`,
    title: "Spotify player",
    // Spotify's compact player for single items, the full one for collections
    height: type === "track" || type === "episode" ? 152 : 352,
    borderRadius: "12px",
    allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
  };
};

// First path segments that are SoundCloud pages, not artists
const SOUNDCLOUD_RESERVED = new Set([
  "discover", "search", "stream", "upload", "you", "charts", "pages", "jobs", "imprint",
  "terms-of-use", "settings", "messages", "notifications", "signin", "people", "tags",
]);
// Second path segments that are tabs of an artist's profile, not tracks
const SOUNDCLOUD_PROFILE_TABS = new Set([
  "tracks", "albums", "reposts", "likes", "followers", "following", "popular-tracks",
  "comments", "spotlight",
]);
const SOUNDCLOUD_PARAMS =
  "&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true";

// soundcloud.com/<artist>/<track> or soundcloud.com/<artist>/sets/<playlist>.
// Also accepts an existing w.soundcloud.com/player/ widget URL.
const soundCloudEmbed = (url) => {
  const host = url.hostname.replace(/^(www|m)\./, "");
  const base = {
    service: "soundcloud",
    title: "SoundCloud player",
    allow: "autoplay",
  };

  if (host === "w.soundcloud.com" && url.pathname.startsWith("/player")) {
    const visual = url.searchParams.get("visual") === "true";
    return { ...base, src: url.href, height: visual ? 300 : 166 };
  }
  if (host !== "soundcloud.com") return null;

  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length < 2 || SOUNDCLOUD_RESERVED.has(segments[0])) return null;
  const isPlaylist = segments[1] === "sets";
  if (isPlaylist ? segments.length < 3 : SOUNDCLOUD_PROFILE_TABS.has(segments[1])) return null;

  // Drop tracking query strings (?si=..., ?utm_...) from share links
  const page = `https://soundcloud.com/${segments.join("/")}`;
  return {
    ...base,
    src: `https://w.soundcloud.com/player/?url=${encodeURIComponent(page)}${SOUNDCLOUD_PARAMS}${isPlaylist ? "&visual=true" : ""}`,
    height: isPlaylist ? 300 : 166,
  };
};

// Returns how to embed `href` ({ service, src, title, allow, height | aspectRatio, ... }), or null
export const getEmbedInfo = (href) => {
  const url = parseLink(href);
  if (!url) return null;
  return youTubeEmbed(url) || spotifyEmbed(url) || soundCloudEmbed(url);
};

// Builds the player for plain-DOM rendering (blog posts render into a shadow root)
export const createEmbedElement = (info) => {
  const iframe = document.createElement("iframe");
  iframe.src = info.src;
  iframe.title = info.title;
  iframe.allow = info.allow;
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("scrolling", "no");

  if (info.aspectRatio) {
    const wrapper = document.createElement("div");
    wrapper.style.cssText = `width: 100%; max-width: 640px; aspect-ratio: ${info.aspectRatio}; margin: 16px 0;`;
    iframe.style.cssText = "width: 100%; height: 100%; border: 0;";
    wrapper.appendChild(iframe);
    return wrapper;
  }
  iframe.style.cssText =
    `display: block; width: 100%; max-width: 640px; height: ${info.height}px; border: 0; margin: 16px 0;` +
    (info.borderRadius ? ` border-radius: ${info.borderRadius};` : "");
  return iframe;
};
