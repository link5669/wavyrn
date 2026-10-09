import { useState, useEffect } from "react";
import TagSelector from "./TagSelector";
import GoogleDocContent from "../../components/GoogleDocContent";
import { importGoogleDocZip } from "../../utilities/googleDocImport";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const EMPTY_FORM = {
  title: "",
  author: "",
  date: "",
  topics: [],
  content: "",
  preview: "",
  slug: "",
  previewImage: "",
};

const labelStyle = { display: "block", marginBottom: "5px", fontWeight: "bold" };
const inputStyle = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};
const readOnlyStyle = { ...inputStyle, backgroundColor: "#f5f5f5", color: "#555", minHeight: "38px" };

const uploadImage = async (uploadId, blob, fileName) => {
  const params = new URLSearchParams({ uploadId, fileName });
  const response = await fetch(`${BACKEND_URL}/api/blog/images?${params}`, {
    method: "POST",
    headers: {
      "Content-Type": blob.type,
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: blob,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Failed to upload ${fileName}`);
  }
  return data.url;
};

// Fields shared by the create and edit forms
const PostFields = ({ values, setValues, tags, onAddTag, onRenameTag, onDeleteTag, setMessage }) => {
  const [importStatus, setImportStatus] = useState("");
  const [importWarnings, setImportWarnings] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleArchive = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setImportWarnings([]);
    setImportStatus("Reading archive...");
    try {
      const uploadId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      const { warnings, ...imported } = await importGoogleDocZip(
        file,
        (blob, name) => uploadImage(uploadId, blob, name),
        setImportStatus,
      );
      setValues((prev) => ({ ...prev, ...imported }));
      setImportWarnings(warnings);
      setImportStatus(`Imported ${file.name}`);
    } catch (error) {
      setImportStatus("");
      setMessage("Import failed: " + error.message, "error");
    }
  };

  const handleTopicToggle = (topicName) => {
    setValues((prev) => ({
      ...prev,
      topics: prev.topics.includes(topicName)
        ? prev.topics.filter((t) => t !== topicName)
        : [...prev.topics, topicName],
    }));
  };

  const handleAddTag = async (category, name) => {
    const added = await onAddTag(category, name);
    if (added && !values.topics.includes(name)) handleTopicToggle(name);
    return added;
  };

  return (
    <>
      <div style={{ marginBottom: "15px" }}>
        <label style={labelStyle}>Google Doc archive (.zip):</label>
        <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
          In Google Docs, choose File → Download → Web Page (.html, zipped). The title, subtitle,
          "Author:" and "Date:" are read from the document; the post body starts after the page break.
        </p>
        <input type="file" accept=".zip,application/zip" onChange={handleArchive} style={{ fontSize: "14px" }} />
        {importStatus && (
          <div style={{ fontSize: "13px", color: "#155724", marginTop: "6px" }}>{importStatus}</div>
        )}
        {importWarnings.map((w) => (
          <div key={w} style={{ fontSize: "13px", color: "#856404", marginTop: "4px" }}>
            ⚠ {w}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={labelStyle}>Title:</label>
        <div style={readOnlyStyle}>{values.title}</div>
      </div>

      <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Author:</label>
          <div style={readOnlyStyle}>{values.author}</div>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Date:</label>
          <div style={readOnlyStyle}>{values.date}</div>
        </div>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={labelStyle}>Preview Text:</label>
        <div style={readOnlyStyle}>{values.preview}</div>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={labelStyle}>Preview image (blog card):</label>
        <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
          Paste an image URL. This image is shown on the blog listing.
        </p>
        <input
          type="url"
          name="previewImage"
          value={values.previewImage || ""}
          onChange={handleChange}
          placeholder="Image URL"
          style={inputStyle}
        />
        {values.previewImage && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={values.previewImage}
              alt="Preview"
              style={{ maxWidth: "200px", maxHeight: "120px", objectFit: "cover", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={labelStyle}>Slug:</label>
        <input
          type="text"
          name="slug"
          value={values.slug}
          onChange={handleChange}
          style={inputStyle}
          placeholder="e.g., my-awesome-blog-post (leave empty to auto-generate from title)"
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={labelStyle}>Filters:</label>
        <TagSelector
          tags={tags}
          selected={values.topics}
          onToggle={handleTopicToggle}
          onAdd={handleAddTag}
          onRename={onRenameTag}
          onDelete={onDeleteTag}
        />
      </div>

      {values.contentType === "html" && values.content && (
        <details style={{ marginBottom: "15px" }}>
          <summary style={{ cursor: "pointer", fontWeight: "bold" }}>Preview post body</summary>
          <div style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "15px", marginTop: "8px", backgroundColor: "white" }}>
            <GoogleDocContent
              html={values.content}
              styles={values.contentStyles}
              bodyClass={values.contentBodyClass}
              bodyStyle={values.contentBodyStyle}
            />
          </div>
        </details>
      )}
    </>
  );
};

const BlogEditor = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState({
    TOPIC: [],
    PROJECT: [],
    GENRE: []
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingPost, setEditingPost] = useState(null);
  const [editFormData, setEditFormData] = useState(EMPTY_FORM);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/blog`);
      const data = await response.json();
      if (response.ok) {
        setPosts(data.posts || []);
      } else {
        console.error("Failed to fetch posts:", data.error);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/filters/tags`);
      const data = await response.json();
      if (response.ok) {
        setTags(data.tags || { TOPIC: [], PROJECT: [], GENRE: [] });
      } else {
        console.error("Failed to fetch tags:", data.error);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

  const handleAddTag = async (category, name) => {
    const exists = Object.values(tags).flat().some((t) => t.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      showMessage(`A tag named "${name}" already exists`, "error");
      return false;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/filters/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category }),
      });
      const data = await response.json();
      if (!response.ok) {
        showMessage(data.error || "Failed to add tag", "error");
        return false;
      }
      await fetchTags();
      return true;
    } catch (error) {
      showMessage("Network error: " + error.message, "error");
      return false;
    }
  };

  const handleDeleteTag = async (tag) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/filters/tags/${tag.docId}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        showMessage(data.error || "Failed to delete tag", "error");
        return;
      }
      const removeTag = (prev) => ({ ...prev, topics: prev.topics.filter((t) => t !== tag.name) });
      setFormData(removeTag);
      setEditFormData(removeTag);
      setPosts((prev) => prev.map((p) => (p.topics ? removeTag(p) : p)));
      showMessage(`Tag "${tag.name}" deleted`, "success");
      fetchTags();
    } catch (error) {
      showMessage("Network error: " + error.message, "error");
    }
  };

  const handleRenameTag = async (tag, name) => {
    if (name === tag.name) return true;
    const exists = Object.values(tags)
      .flat()
      .some((t) => t.docId !== tag.docId && t.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      showMessage(`A tag named "${name}" already exists`, "error");
      return false;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/filters/tags/${tag.docId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category: tag.category }),
      });
      const data = await response.json();
      if (!response.ok) {
        showMessage(data.error || "Failed to rename tag", "error");
        return false;
      }
      const renameTag = (prev) => ({
        ...prev,
        topics: prev.topics.map((t) => (t === tag.name ? name : t)),
      });
      setFormData(renameTag);
      setEditFormData(renameTag);
      setPosts((prev) => prev.map((p) => (p.topics ? renameTag(p) : p)));
      showMessage(`Tag "${tag.name}" renamed to "${name}"`, "success");
      fetchTags();
      return true;
    } catch (error) {
      showMessage("Network error: " + error.message, "error");
      return false;
    }
  };

  const validate = (values) => {
    if (!values.content) return "Upload a Google Doc archive first.";
    if (!values.title) return 'The document needs an element with the "title" class.';
    if (!values.author) return 'The document needs an "Author:" line.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate(formData);
    if (error) return showMessage(error, "error");

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("Blog post created successfully!", "success");
        setFormData(EMPTY_FORM);
        fetchPosts();
      } else {
        showMessage(data.error || "Failed to create blog post", "error");
      }
    } catch (error) {
      showMessage("Network error: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const error = validate(editFormData);
    if (error) return showMessage(error, "error");

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/blog/${editingPost}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("Blog post updated successfully!", "success");
        setEditingPost(null);
        setEditFormData(EMPTY_FORM);
        fetchPosts();
      } else {
        showMessage(data.error || "Failed to update blog post", "error");
      }
    } catch (error) {
      showMessage("Network error: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (post) => {
    setEditingPost(post.docId);
    setEditFormData({
      title: post.title,
      author: post.author,
      date: post.date,
      topics: post.topics || [],
      content: post.content,
      preview: post.preview || "",
      fontColor: post.fontColor,
      slug: post.slug || "",
      previewImage: post.previewImage || "",
      contentType: post.contentType,
      contentStyles: post.contentStyles,
      contentBodyClass: post.contentBodyClass,
      contentBodyStyle: post.contentBodyStyle,
    });
  };

  const handleDelete = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/blog/${docId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("Blog post deleted successfully!", "success");
        fetchPosts();
      } else {
        showMessage(data.error || "Failed to delete blog post", "error");
      }
    } catch (error) {
      showMessage("Network error: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setEditFormData(EMPTY_FORM);
    setMessage("");
  };

  return (
    <div>
      <h2>Blog Editor</h2>

      {message && (
        <div
          style={{
            padding: "10px",
            borderRadius: "4px",
            backgroundColor:
              messageType === "success" ? "#d4edda" : "#f8d7da",
            color: messageType === "success" ? "#155724" : "#721c24",
            border:
              messageType === "success"
                ? "1px solid #c3e6cb"
                : "1px solid #f5c6cb",
            marginBottom: "20px",
          }}
        >
          {message}
        </div>
      )}

      {/* Create New Blog Post Form */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Create New Blog Post</h3>
        <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
          <PostFields
            values={formData}
            setValues={setFormData}
            tags={tags}
            onAddTag={handleAddTag}
            onRenameTag={handleRenameTag}
            onDeleteTag={handleDeleteTag}
            setMessage={showMessage}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#ccc" : "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating..." : "Create Blog Post"}
          </button>
        </form>
      </div>

      {/* Current Blog Posts */}
      <div>
        <h3>Current Blog Posts</h3>

        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Loading blog posts...
          </div>
        ) : (
          <>
            {posts.length > 0 ? (
              <div style={{ marginBottom: "20px" }}>
                {posts.map((post) => (
                  <div
                    key={post.docId}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "15px",
                      marginBottom: "10px",
                      backgroundColor: editingPost === post.docId ? "#f0f8ff" : "#f9f9f9",
                    }}
                  >
                    {editingPost === post.docId ? (
                      <form onSubmit={handleEditSubmit} style={{ marginBottom: "10px" }}>
                        <PostFields
                          values={editFormData}
                          setValues={setEditFormData}
                          tags={tags}
                          onAddTag={handleAddTag}
                          onRenameTag={handleRenameTag}
                          onDeleteTag={handleDeleteTag}
                          setMessage={showMessage}
                        />

                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            type="submit"
                            disabled={loading}
                            style={{
                              backgroundColor: loading ? "#ccc" : "#28a745",
                              color: "white",
                              padding: "6px 12px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: loading ? "not-allowed" : "pointer",
                            }}
                          >
                            {loading ? "Updating..." : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
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
                        <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>
                          {post.title}
                        </h4>
                        <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#666" }}>
                          <strong>Author:</strong> {post.author}
                        </p>
                        <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#666" }}>
                          <strong>Date:</strong> {post.date}
                        </p>
                        {post.topics && post.topics.length > 0 && (
                          <div style={{ margin: "5px 0" }}>
                            <strong style={{ fontSize: "0.9em", color: "#666" }}>Topics:</strong>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
                              {post.topics.map(topic => (
                                <span
                                  key={topic}
                                  style={{
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    padding: "2px 8px",
                                    borderRadius: "12px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {post.preview && (
                          <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#666" }}>
                            <strong>Preview:</strong> {post.preview}
                          </p>
                        )}
                        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                          <button
                            onClick={() => startEdit(post)}
                            style={{
                              backgroundColor: "#ffc107",
                              color: "black",
                              padding: "8px 15px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post.docId)}
                            disabled={loading}
                            style={{
                              backgroundColor: loading ? "#ccc" : "#dc3545",
                              color: "white",
                              padding: "8px 15px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: loading ? "not-allowed" : "pointer",
                            }}
                          >
                            {loading ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                No blog posts found. Create your first blog post using the form above!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
