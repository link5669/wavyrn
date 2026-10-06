import { useEffect, useRef } from "react";

const IMPORT_RE = /@import\s+url\(\s*['"]?([^'")]+)['"]?\s*\)\s*;?/gi;

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
    root.appendChild(body);
  }, [html, styles, bodyClass, bodyStyle]);

  return <div ref={hostRef} />;
};

export default GoogleDocContent;
