import React, { useState, useEffect } from "react";

const URLShortenerEditor = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    originalUrl: "",
    customSlug: "",
    title: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editingUrl, setEditingUrl] = useState(null);
  const [editFormData, setEditFormData] = useState({
    originalUrl: "",
    customSlug: "",
    title: "",
  });

  const API_BASE = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api`;

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE}/urls`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUrls(data.urls);
      }
    } catch (error) {
      console.error("Error fetching URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.originalUrl) {
      alert("Original URL is required");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_BASE}/urls/${editingId}`
        : `${API_BASE}/urls`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (editingId) {
          setUrls(
            urls.map((url) =>
              url.id === editingId ? { id: editingId, ...data.data } : url,
            ),
          );
        } else {
          setUrls([...urls, { id: data.id, ...data.data }]);
        }

        // Reset form
        setFormData({ originalUrl: "", customSlug: "", title: "" });
        setEditingId(null);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error saving URL:", error);
      alert("Error saving URL");
    }
  };

  const handleEdit = (url) => {
    setFormData({
      originalUrl: url.originalUrl,
      customSlug: url.slug,
      title: url.title || "",
    });
    setEditingId(url.id);
  };

  const startEdit = (url) => {
    setEditingUrl(url.id);
    setEditFormData({
      originalUrl: url.originalUrl,
      customSlug: url.slug,
      title: url.title || "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editFormData.originalUrl) {
      alert("Original URL is required");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE}/urls/${editingUrl}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        const data = await response.json();
        setUrls(
          urls.map((url) =>
            url.id === editingUrl ? { id: editingUrl, ...data.data } : url,
          ),
        );
        setEditingUrl(null);
        setEditFormData({ originalUrl: "", customSlug: "", title: "" });
      } else {
        const errorData = await response.json();
        alert(errorData.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error updating URL:", error);
      alert("Error updating URL");
    }
  };

  const cancelInlineEdit = () => {
    setEditingUrl(null);
    setEditFormData({ originalUrl: "", customSlug: "", title: "" });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this shortened URL?")
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE}/urls/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUrls(urls.filter((url) => url.id !== id));
      } else {
        alert("Error deleting URL");
      }
    } catch (error) {
      console.error("Error deleting URL:", error);
      alert("Error deleting URL");
    }
  };

  const copyToClipboard = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl)
  };

  const cancelEdit = () => {
    setFormData({ originalUrl: "", customSlug: "", title: "" });
    setEditingId(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: "30px", color: "#333" }}>URL Shortener</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Original URL *
          </label>
          <input
            type="url"
            value={formData.originalUrl}
            onChange={(e) =>
              setFormData({ ...formData, originalUrl: e.target.value })
            }
            placeholder="https://example.com/very-long-url"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Custom Slug (optional)
          </label>
          <input
            type="text"
            value={formData.customSlug}
            onChange={(e) =>
              setFormData({ ...formData, customSlug: e.target.value })
            }
            placeholder="my-custom-link"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
          <small style={{ color: "#666", fontSize: "12px" }}>
            Leave empty for auto-generated slug
          </small>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Title (optional)
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Description for this link"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {editingId ? "Update URL" : "Shorten URL"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* URLs List */}
      <div>
        <h3 style={{ marginBottom: "20px", color: "#333" }}>
          Your Shortened URLs
        </h3>

        {urls.length === 0 ? (
          <p
            style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}
          >
            No URLs created yet
          </p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {urls.map((url) => (
              <div
                key={url.id}
                style={{
                  backgroundColor: editingUrl === url.id ? "#f0f8ff" : "white",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px",
                }}
              >
                {editingUrl === url.id ? (
                  <form onSubmit={handleEditSubmit} style={{ marginBottom: "10px" }}>
                    <div style={{ marginBottom: "10px" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        Original URL:
                      </label>
                      <input
                        type="url"
                        value={editFormData.originalUrl}
                        onChange={(e) =>
                          setEditFormData({ ...editFormData, originalUrl: e.target.value })
                        }
                        required
                        style={{
                          width: "100%",
                          padding: "6px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        Custom Slug:
                      </label>
                      <input
                        type="text"
                        value={editFormData.customSlug}
                        onChange={(e) =>
                          setEditFormData({ ...editFormData, customSlug: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "6px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        Title:
                      </label>
                      <input
                        type="text"
                        value={editFormData.title}
                        onChange={(e) =>
                          setEditFormData({ ...editFormData, title: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "6px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="submit"
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          padding: "6px 12px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelInlineEdit}
                        style={{
                          backgroundColor: "#6c757d",
                          color: "white",
                          padding: "6px 12px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div style={{ marginBottom: "10px" }}>
                      {url.title && (
                        <h4 style={{ margin: "0 0 8px 0", color: "#333" }}>
                          {url.title}
                        </h4>
                      )}
                      <div style={{ marginBottom: "8px" }}>
                        <strong>Short URL: </strong>
                        <a
                          href={`${window.location.protocol}//${window.location.host}/${url.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#007bff", textDecoration: "none" }}
                        >
                          {window.location.host}/{url.slug}
                        </a>
                        <button
                          onClick={() =>
                            copyToClipboard(`${window.location.host}/${url.slug}`)
                          }
                          style={{
                            marginLeft: "10px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            padding: "4px 8px",
                            borderRadius: "3px",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          Copy
                        </button>
                      </div>
                      <div style={{ marginBottom: "8px", wordBreak: "break-all" }}>
                        <strong>Original: </strong>
                        <a
                          href={url.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#666" }}
                        >
                          {url.originalUrl}
                        </a>
                      </div>
                      <div style={{ fontSize: "12px", color: "#888" }}>
                        Clicks: {url.clicks || 0} | Created:{" "}
                        {new Date(
                          url.createdAt?.toDate?.() || url.createdAt,
                        ).toLocaleDateString()}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => startEdit(url)}
                        style={{
                          backgroundColor: "#17a2b8",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(url.id)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default URLShortenerEditor;
