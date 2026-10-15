import { useEffect, useState } from "react";
import { FiArrowUp, FiArrowDown, FiTrash2 } from "react-icons/fi";
import { toDirectDropboxUrl } from "../../utilities/dropbox";
import { getEmbedInfo } from "../../utilities/embeds";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const SOCIAL_PLATFORMS = [
  { value: "website", label: "Website", placeholder: "https://..." },
  { value: "instagram", label: "Instagram", placeholder: "handle" },
  { value: "twitter", label: "Twitter", placeholder: "handle" },
  { value: "tiktok", label: "TikTok", placeholder: "@handle" },
  { value: "facebook", label: "Facebook", placeholder: "handle or profile.php?id=..." },
  { value: "threads", label: "Threads", placeholder: "handle" },
  { value: "email", label: "Email", placeholder: "name@example.com" },
  { value: "bluesky", label: "Bluesky", placeholder: "https://bsky.app/profile/..." },
  { value: "linkedin", label: "LinkedIn", placeholder: "handle" },
];
const MEDIA_TYPES = [
  { value: "image", label: "Image", titleLabel: "Alt text" },
  { value: "audio", label: "Audio", titleLabel: "Track title" },
  { value: "video", label: "Video", titleLabel: "Caption" },
  { value: "embed", label: "YouTube / Spotify / SoundCloud", titleLabel: "Caption" },
];
const EMPTY_PROFILE = {
  name: "", nameJP: "", title: "", titleJP: "", visible: true, categories: [],
  headshot: "", headshotPosition: "", background: "", bio: "", socials: [], media: [],
};

const labelStyle = { display: "block", marginBottom: "5px", fontWeight: "bold" };
const inputStyle = { width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" };
const hintStyle = { fontSize: "12px", color: "#666", margin: "4px 0 0" };
const fieldStyle = { marginBottom: "15px" };
const button = (backgroundColor) => ({
  backgroundColor, color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer",
});
const iconButton = { background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", color: "#555" };
const thumbStyle = { width: "48px", height: "48px", objectFit: "cover", borderRadius: "4px", border: "1px solid #ccc", background: "#1a1510" };

const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("authToken")}` });

const api = async (path, options = {}) => {
  const response = await fetch(`${BACKEND_URL}/api/team${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
};

// Uploads a file to Firebase Storage; resolves to its public URL
const uploadFile = async (file) => {
  const params = new URLSearchParams({ fileName: file.name });
  const { url } = await api(`/files?${params}`, {
    method: "POST",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });
  return url;
};

const move = (list, index, delta) => {
  const next = [...list];
  [next[index], next[index + delta]] = [next[index + delta], next[index]];
  return next;
};

// URL field with an "Upload" button that fills it with the uploaded file's URL
const UrlWithUpload = ({ value, onChange, accept, placeholder, setError }) => {
  const [uploading, setUploading] = useState(false);
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      onChange(await uploadFile(file));
    } catch (error) {
      setError(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", flex: 1, minWidth: 0 }}>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(toDirectDropboxUrl(e.target.value))}
        placeholder={placeholder || "Paste a URL or upload a file"}
        style={{ ...inputStyle, flex: 1, minWidth: 0 }}
      />
      <label style={{ ...button(uploading ? "#ccc" : "#007bff"), whiteSpace: "nowrap", margin: 0 }}>
        {uploading ? "Uploading..." : "Upload"}
        <input type="file" accept={accept} onChange={handleFile} disabled={uploading} hidden />
      </label>
    </div>
  );
};

const ProfileForm = ({ initial, categories, onSave, onCancel }) => {
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (field, value) => setValues((prev) => ({ ...prev, [field]: value }));
  const setItem = (field, index, changes) =>
    set(field, values[field].map((item, i) => (i === index ? { ...item, ...changes } : item)));
  const removeItem = (field, index) => set(field, values[field].filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.name.trim()) return setError("Name is required.");
    setSaving(true);
    setError("");
    try {
      await onSave(values);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "15px", backgroundColor: "#f0f8ff", marginBottom: "20px" }}>
      <div style={{ display: "flex", gap: "15px" }}>
        <div style={{ ...fieldStyle, flex: 1 }}>
          <label style={labelStyle}>Name:</label>
          <input value={values.name} onChange={(e) => set("name", e.target.value)} style={inputStyle} required />
        </div>
        <div style={{ ...fieldStyle, flex: 1 }}>
          <label style={labelStyle}>Name (Japanese):</label>
          <input value={values.nameJP} onChange={(e) => set("nameJP", e.target.value)} style={inputStyle} />
        </div>
      </div>
      <div style={{ display: "flex", gap: "15px" }}>
        <div style={{ ...fieldStyle, flex: 1 }}>
          <label style={labelStyle}>Title:</label>
          <input value={values.title} onChange={(e) => set("title", e.target.value)} style={inputStyle} placeholder="e.g. Sound Designer, Composer" />
        </div>
        <div style={{ ...fieldStyle, flex: 1 }}>
          <label style={labelStyle}>Title (Japanese):</label>
          <input value={values.titleJP} onChange={(e) => set("titleJP", e.target.value)} style={inputStyle} />
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold" }}>
          <input type="checkbox" checked={values.visible} onChange={(e) => set("visible", e.target.checked)} />
          Show on the "Our Team" page
        </label>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Categories:</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {categories.map((category) => (
            <label key={category} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="checkbox"
                checked={values.categories.includes(category)}
                onChange={(e) =>
                  set("categories", e.target.checked
                    ? [...values.categories, category]
                    : values.categories.filter((c) => c !== category))
                }
              />
              {category}
            </label>
          ))}
        </div>
        <p style={hintStyle}>Every visible profile appears under "All".</p>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Headshot:</label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {values.headshot && <img src={values.headshot} alt="" style={{ ...thumbStyle, objectPosition: values.headshotPosition || "center" }} />}
          <UrlWithUpload value={values.headshot} onChange={(v) => set("headshot", v)} accept="image/*" setError={setError} />
        </div>
        <input
          value={values.headshotPosition}
          onChange={(e) => set("headshotPosition", e.target.value)}
          style={{ ...inputStyle, marginTop: "8px" }}
          placeholder='Crop position, e.g. "0% 25%" (optional)'
        />
        <p style={hintStyle}>
          Which part of the photo shows when it's cropped (the profile popup and the mobile team grid):
          horizontal then vertical, e.g. "0% 25%" keeps more of the top.
        </p>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Background (behind the headshot on the team grid):</label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {values.background && <img src={values.background} alt="" style={thumbStyle} />}
          <UrlWithUpload value={values.background} onChange={(v) => set("background", v)} accept="image/*" setError={setError} />
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Bio:</label>
        <textarea value={values.bio} onChange={(e) => set("bio", e.target.value)} rows={8} style={{ ...inputStyle, resize: "vertical" }} />
        <p style={hintStyle}>Leave a blank line between paragraphs.</p>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Social links:</label>
        {values.socials.map((social, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
            <select value={social.platform} onChange={(e) => setItem("socials", i, { platform: e.target.value })} style={{ ...inputStyle, width: "150px" }}>
              {SOCIAL_PLATFORMS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
            <input
              value={social.value}
              onChange={(e) => setItem("socials", i, { value: e.target.value })}
              placeholder={SOCIAL_PLATFORMS.find((p) => p.value === social.platform)?.placeholder}
              style={{ ...inputStyle, flex: 1 }}
            />
            <button type="button" title="Move up" disabled={i === 0} onClick={() => set("socials", move(values.socials, i, -1))} style={{ ...iconButton, opacity: i === 0 ? 0.3 : 1 }}><FiArrowUp /></button>
            <button type="button" title="Move down" disabled={i === values.socials.length - 1} onClick={() => set("socials", move(values.socials, i, 1))} style={{ ...iconButton, opacity: i === values.socials.length - 1 ? 0.3 : 1 }}><FiArrowDown /></button>
            <button type="button" title="Remove" onClick={() => removeItem("socials", i)} style={{ ...iconButton, color: "#dc3545" }}><FiTrash2 /></button>
          </div>
        ))}
        <button type="button" onClick={() => set("socials", [...values.socials, { platform: "website", value: "" }])} style={button("#6c757d")}>
          + Add social link
        </button>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Media:</label>
        <p style={{ ...hintStyle, marginBottom: "8px" }}>
          Shown below the bio in this order. Images next to each other form a row; audio tracks next to
          each other form a grid.
        </p>
        {values.media.map((item, i) => {
          const type = MEDIA_TYPES.find((t) => t.value === item.type);
          const badEmbed = item.type === "embed" && item.url && !getEmbedInfo(item.url);
          return (
            <div key={i} style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "10px", marginBottom: "8px", backgroundColor: "white" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
                <select value={item.type} onChange={(e) => setItem("media", i, { type: e.target.value })} style={{ ...inputStyle, width: "auto" }}>
                  {MEDIA_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <div style={{ marginLeft: "auto", display: "flex" }}>
                  <button type="button" title="Move up" disabled={i === 0} onClick={() => set("media", move(values.media, i, -1))} style={{ ...iconButton, opacity: i === 0 ? 0.3 : 1 }}><FiArrowUp /></button>
                  <button type="button" title="Move down" disabled={i === values.media.length - 1} onClick={() => set("media", move(values.media, i, 1))} style={{ ...iconButton, opacity: i === values.media.length - 1 ? 0.3 : 1 }}><FiArrowDown /></button>
                  <button type="button" title="Remove" onClick={() => removeItem("media", i)} style={{ ...iconButton, color: "#dc3545" }}><FiTrash2 /></button>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
                {item.type === "image" && item.url && <img src={item.url} alt="" style={thumbStyle} />}
                {item.type === "embed" ? (
                  <input
                    type="url"
                    value={item.url}
                    onChange={(e) => setItem("media", i, { url: e.target.value })}
                    placeholder="Link to a YouTube video, Spotify track/album/playlist, or SoundCloud track/playlist"
                    style={{ ...inputStyle, flex: 1 }}
                  />
                ) : (
                  <UrlWithUpload
                    value={item.url}
                    onChange={(url) => setItem("media", i, { url })}
                    accept={`${item.type}/*`}
                    setError={setError}
                  />
                )}
              </div>
              {badEmbed && <p style={{ ...hintStyle, color: "#721c24", marginBottom: "8px" }}>This isn't a YouTube, Spotify or SoundCloud link that can be embedded.</p>}
              {item.type === "audio" && item.url && <audio src={item.url} controls preload="none" style={{ width: "100%", marginBottom: "8px" }} />}
              <input
                value={item.title}
                onChange={(e) => setItem("media", i, { title: e.target.value })}
                placeholder={`${type?.titleLabel} (optional)`}
                style={inputStyle}
              />
            </div>
          );
        })}
        <button type="button" onClick={() => set("media", [...values.media, { type: "image", url: "", title: "" }])} style={button("#6c757d")}>
          + Add media
        </button>
      </div>

      {error && (
        <div style={{ padding: "10px", borderRadius: "4px", backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb", marginBottom: "15px" }}>
          {error}
        </div>
      )}
      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit" disabled={saving} style={button(saving ? "#ccc" : "#28a745")}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel} disabled={saving} style={button("#6c757d")}>Cancel</button>
      </div>
    </form>
  );
};

const TeamEditor = () => {
  const [profiles, setProfiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // docId being edited, or "new"
  const [message, setMessage] = useState({ text: "", type: "" });

  const showMessage = (text, type) => setMessage({ text, type });

  const fetchProfiles = async () => {
    try {
      const data = await api("");
      setProfiles(data.profiles);
      setCategories(data.categories);
    } catch (error) {
      showMessage("Failed to load profiles: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSave = async (values) => {
    const body = JSON.stringify(values);
    const headers = { "Content-Type": "application/json" };
    if (editing === "new") {
      await api("", { method: "POST", headers, body });
    } else {
      await api(`/${editing}`, { method: "PUT", headers, body });
    }
    showMessage(`Saved "${values.name}"`, "success");
    setEditing(null);
    fetchProfiles();
  };

  const handleMove = async (index, delta) => {
    const reordered = move(profiles, index, delta);
    setProfiles(reordered);
    try {
      await api("/order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: reordered.map((p) => p.docId) }),
      });
    } catch (error) {
      showMessage("Failed to reorder: " + error.message, "error");
      fetchProfiles();
    }
  };

  const handleDelete = async (profile) => {
    if (!window.confirm(`Delete ${profile.name}'s profile? Files uploaded for it will be deleted too.`)) return;
    try {
      await api(`/${profile.docId}`, { method: "DELETE" });
      showMessage(`Deleted "${profile.name}"`, "success");
      fetchProfiles();
    } catch (error) {
      showMessage("Failed to delete: " + error.message, "error");
    }
  };

  return (
    <div>
      <h2>Team Editor</h2>
      <p style={{ color: "#666" }}>
        Profiles on the "Our Team" section of the About page, in the order they appear.
      </p>

      {message.text && (
        <div
          style={{
            padding: "10px",
            borderRadius: "4px",
            backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
            border: message.type === "success" ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
            marginBottom: "20px",
          }}
        >
          {message.text}
        </div>
      )}

      {editing === "new" ? (
        <ProfileForm initial={EMPTY_PROFILE} categories={categories} onSave={handleSave} onCancel={() => setEditing(null)} />
      ) : (
        <button onClick={() => { setEditing("new"); setMessage({ text: "", type: "" }); }} style={{ ...button("#007bff"), marginBottom: "20px", padding: "10px 20px" }}>
          + Add profile
        </button>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Loading profiles...</div>
      ) : (
        profiles.map((profile, index) =>
          editing === profile.docId ? (
            <ProfileForm
              key={profile.docId}
              initial={{ ...EMPTY_PROFILE, ...profile }}
              categories={categories}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          ) : (
            <div
              key={profile.docId}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "10px",
                marginBottom: "8px",
                backgroundColor: profile.visible ? "#f9f9f9" : "#eee",
              }}
            >
              <img src={profile.headshot || "https://via.placeholder.com/48"} alt="" style={{ ...thumbStyle, objectPosition: profile.headshotPosition || "center" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong>{profile.name}</strong>
                {!profile.visible && (
                  <span style={{ marginLeft: "8px", fontSize: "12px", backgroundColor: "#6c757d", color: "white", padding: "2px 8px", borderRadius: "12px" }}>
                    Hidden
                  </span>
                )}
                <div style={{ fontSize: "0.9em", color: "#666" }}>{profile.title}</div>
              </div>
              <button title="Move up" disabled={index === 0} onClick={() => handleMove(index, -1)} style={{ ...iconButton, opacity: index === 0 ? 0.3 : 1 }}><FiArrowUp /></button>
              <button title="Move down" disabled={index === profiles.length - 1} onClick={() => handleMove(index, 1)} style={{ ...iconButton, opacity: index === profiles.length - 1 ? 0.3 : 1 }}><FiArrowDown /></button>
              <button onClick={() => { setEditing(profile.docId); setMessage({ text: "", type: "" }); }} style={button("#ffc107")}>Edit</button>
              <button onClick={() => handleDelete(profile)} style={button("#dc3545")}>Delete</button>
            </div>
          ),
        )
      )}
    </div>
  );
};

export default TeamEditor;
