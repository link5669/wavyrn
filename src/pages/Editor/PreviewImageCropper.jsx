import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const MAX_SIZE = 1200; // px; larger crops are scaled down

const buttonStyle = {
  color: "white",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

// Remote images go through the backend so the canvas isn't tainted by cross-origin pixels
const loadImageBlob = async (src) => {
  const response = src.startsWith("data:")
    ? await fetch(src)
    : await fetch(`${BACKEND_URL}/api/blog/image-proxy?${new URLSearchParams({ url: src })}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Could not load the image");
  }
  return response.blob();
};

const cropToBlob = (src, area, type) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = () => reject(new Error("Could not read the image"));
    img.onload = () => {
      const size = Math.min(area.width, MAX_SIZE);
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      canvas.getContext("2d").drawImage(img, area.x, area.y, area.width, area.height, 0, 0, size, size);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Could not crop the image"))),
        type,
        0.9,
      );
    };
    img.src = src;
  });

// Full-screen view for cropping the preview image to a square.
// `onSave(blob, type)` uploads the cropped image; if it throws, the error is shown here.
const PreviewImageCropper = ({ src, onCancel, onSave }) => {
  const [image, setImage] = useState(null); // { url, type } of the loaded image
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let url;
    let cancelled = false;
    loadImageBlob(src)
      .then((blob) => {
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        // Keep PNG transparency; everything else becomes JPEG
        setImage({ url, type: blob.type === "image/png" ? "image/png" : "image/jpeg" });
      })
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [src]);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && !saving && onCancel();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [saving, onCancel]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await onSave(await cropToBlob(image.url, area, image.type), image.type);
    } catch (e) {
      setError(e.message);
      setSaving(false);
    }
  };

  return (
    <div
      onClick={() => !saving && onCancel()}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 200, // above the fixed navbar (150)
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "white", borderRadius: "8px", padding: "16px", width: "min(600px, 100%)" }}
      >
        <h4 style={{ margin: "0 0 12px" }}>Crop preview image</h4>

        <div style={{ position: "relative", height: "min(60vh, 450px)", backgroundColor: "#333", borderRadius: "4px" }}>
          {image ? (
            <Cropper
              image={image.url}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, pixels) => setArea(pixels)}
            />
          ) : (
            !error && <div style={{ color: "#ccc", padding: "20px", textAlign: "center" }}>Loading image...</div>
          )}
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: "10px", margin: "12px 0", fontSize: "14px" }}>
          Zoom
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            disabled={!image}
            onChange={(e) => setZoom(Number(e.target.value))}
            style={{ flex: 1 }}
          />
        </label>

        {error && <div style={{ color: "#721c24", fontSize: "14px", marginBottom: "12px" }}>{error}</div>}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button type="button" onClick={onCancel} disabled={saving} style={{ ...buttonStyle, backgroundColor: "#6c757d" }}>
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!image || !area || saving}
            style={{ ...buttonStyle, backgroundColor: !image || !area || saving ? "#ccc" : "#007bff" }}
          >
            {saving ? "Uploading..." : "Crop & upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewImageCropper;
