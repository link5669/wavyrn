import { useState, useEffect } from "react";

const FilterEditor = () => {
  const [tags, setTags] = useState({
    TOPIC: [],
    PROJECT: [],
    GENRE: []
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  
  // Tag form state
  const [tagFormData, setTagFormData] = useState({
    name: "",
    category: "TOPIC",
    position: "",
  });
  
  // Category form state
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    displayName: "",
    color: "#CE0036",
  });
  
  // Edit states
  const [editingTag, setEditingTag] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editTagData, setEditTagData] = useState({
    name: "",
    category: "",
  });
  const [editCategoryData, setEditCategoryData] = useState({
    displayName: "",
    color: "",
  });
  
  // Move to index states
  const [moveToIndexValues, setMoveToIndexValues] = useState({});

  const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/filters/tags`);
      const data = await response.json();
      if (response.ok) {
        setTags(data.tags || { TOPIC: [], PROJECT: [], GENRE: [] });
      } else {
        console.error("Failed to fetch tags:", data.error);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/filters/categories`);
      const data = await response.json();
      if (response.ok) {
        setCategories(data.categories || []);
      } else {
        console.error("Failed to fetch categories:", data.error);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchCategories();
  }, []);

  const handleTagInputChange = (e) => {
    const { name, value } = e.target;
    setTagFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/filters/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tagFormData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Tag added successfully!");
        setMessageType("success");
        setTagFormData({ name: "", category: "TOPIC", position: "" });
        fetchTags();
      } else {
        setMessage(data.error || "Failed to add tag");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/filters/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryFormData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Category added successfully!");
        setMessageType("success");
        setCategoryFormData({ name: "", displayName: "", color: "#CE0036" });
        fetchCategories();
      } else {
        setMessage(data.error || "Failed to add category");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleMoveToIndex = async (docId, targetIndex, category) => {
    const position = parseInt(targetIndex);
    
    if (!targetIndex || targetIndex === "" || isNaN(position) || position < 1 || position > tags[category].length) {
      setMessage(`Please enter a valid position between 1 and ${tags[category].length}`);
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const requestBody = { docId, position };
      
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/filters/tags/position`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(`Tag moved to position ${position} successfully!`);
        setMessageType("success");
        setMoveToIndexValues(prev => ({
          ...prev,
          [docId]: ""
        }));
        fetchTags();
      } else {
        setMessage(data.error || `Failed to move tag (${response.status})`);
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const startEditTag = (tag) => {
    setEditingTag(tag.docId);
    setEditTagData({
      name: tag.name,
      category: tag.category,
    });
  };

  const startEditCategory = (category) => {
    setEditingCategory(category.docId);
    setEditCategoryData({
      displayName: category.displayName,
      color: category.color,
    });
  };

  const handleEditTagSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/filters/tags/${editingTag}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editTagData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Tag updated successfully!");
        setMessageType("success");
        setEditingTag(null);
        setEditTagData({ name: "", category: "" });
        fetchTags();
      } else {
        setMessage(data.error || "Failed to update tag");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/filters/categories/${editingCategory}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editCategoryData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Category updated successfully!");
        setMessageType("success");
        setEditingCategory(null);
        setEditCategoryData({ displayName: "", color: "" });
        fetchCategories();
      } else {
        setMessage(data.error || "Failed to update category");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTag = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this tag?")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/filters/tags/${docId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Tag deleted successfully!");
        setMessageType("success");
        fetchTags();
      } else {
        setMessage(data.error || "Failed to delete tag");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingTag(null);
    setEditingCategory(null);
    setEditTagData({ name: "", category: "" });
    setEditCategoryData({ displayName: "", color: "" });
    setMessage("");
  };

  return (
    <div>
      <h2>Filter Editor</h2>

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

      {/* Add New Tag Form */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Add New Tag</h3>
        <form onSubmit={handleTagSubmit} style={{ marginBottom: "30px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Tag Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={tagFormData.name}
              onChange={handleTagInputChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              placeholder="Enter tag name"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="category"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={tagFormData.category}
              onChange={handleTagInputChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="TOPIC">Topic</option>
              <option value="PROJECT">Project</option>
              <option value="GENRE">Genre</option>
            </select>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="position"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Insert Position:
            </label>
            <input
              type="number"
              id="position"
              name="position"
              value={tagFormData.position}
              onChange={handleTagInputChange}
              min="1"
              max={tags[tagFormData.category]?.length + 1 || 1}
              style={{
                width: "100%",
                padding: "8px",
                border: "2px solid #007bff",
                borderRadius: "4px",
                backgroundColor: "#f8f9fa",
              }}
              placeholder={`Enter position (1 to ${tags[tagFormData.category]?.length + 1 || 1})`}
            />
            <small style={{ color: "#666", fontSize: "12px", display: "block", marginTop: "5px" }}>
              <strong>Current tags in {tagFormData.category}:</strong> {tags[tagFormData.category]?.length || 0} | 
              <strong> Leave empty</strong> to add at the end | 
              <strong> Enter number</strong> to insert at that specific position
            </small>
          </div>

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
            {loading ? "Adding..." : "Add Tag"}
          </button>
        </form>
      </div>

      {/* Add New Category Form */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Add New Category</h3>
        <form onSubmit={handleCategorySubmit} style={{ marginBottom: "30px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="categoryName"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Category Name (uppercase):
            </label>
            <input
              type="text"
              id="categoryName"
              name="name"
              value={categoryFormData.name}
              onChange={handleCategoryInputChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                textTransform: "uppercase",
              }}
              placeholder="e.g., STYLE, MEDIUM"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="displayName"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Display Name:
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={categoryFormData.displayName}
              onChange={handleCategoryInputChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              placeholder="e.g., Style, Medium"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="color"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Color:
            </label>
            <input
              type="color"
              id="color"
              name="color"
              value={categoryFormData.color}
              onChange={handleCategoryInputChange}
              style={{
                width: "100px",
                height: "40px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#ccc" : "#28a745",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>

      {/* Current Tags Display */}
      <div>
        <h3>Current Tags</h3>
        
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Loading tags...
          </div>
        ) : (
          <>
            {Object.keys(tags).map((category) => (
              <div key={category} style={{ marginBottom: "30px" }}>
                <h4 style={{ 
                  color: "#CE0036", 
                  fontSize: "1.2em", 
                  marginBottom: "15px",
                  fontWeight: "600"
                }}>
                  {category}
                </h4>
                
                {tags[category].length > 0 ? (
                  <div style={{ marginBottom: "20px" }}>
                    {tags[category].map((tag, index) => (
                      <div
                        key={tag.docId}
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          padding: "15px",
                          marginBottom: "10px",
                          backgroundColor: editingTag === tag.docId ? "#f0f8ff" : "#f9f9f9",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "15px",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          {editingTag === tag.docId ? (
                            <form onSubmit={handleEditTagSubmit} style={{ marginBottom: "10px" }}>
                              <div style={{ marginBottom: "10px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                                  Tag Name:
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  value={editTagData.name}
                                  onChange={(e) => setEditTagData({ ...editTagData, name: e.target.value })}
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
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                                  Category:
                                </label>
                                <select
                                  name="category"
                                  value={editTagData.category}
                                  onChange={(e) => setEditTagData({ ...editTagData, category: e.target.value })}
                                  style={{
                                    width: "100%",
                                    padding: "6px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <option value="TOPIC">Topic</option>
                                  <option value="PROJECT">Project</option>
                                  <option value="GENRE">Genre</option>
                                </select>
                              </div>
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
                              <h5 style={{ margin: "0 0 5px 0", color: "#333" }}>
                                #{tag.position} - {tag.name}
                              </h5>
                              <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#666" }}>
                                Category: {tag.category}
                              </p>
                              {tag.createdAt && (
                                <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#666" }}>
                                  <strong>Created:</strong>{" "}
                                  {new Date(tag.createdAt.seconds * 1000).toLocaleDateString()}
                                </p>
                              )}
                            </>
                          )}
                        </div>

                        {editingTag !== tag.docId && (
                          <>
                            {/* Move to specific index */}
                            <div style={{ marginRight: "10px" }}>
                              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                <input
                                  type="number"
                                  value={moveToIndexValues[tag.docId] || ""}
                                  onChange={(e) => {
                                    setMoveToIndexValues(prev => ({
                                      ...prev,
                                      [tag.docId]: e.target.value
                                    }));
                                  }}
                                  min="1"
                                  max={tags[category].length}
                                  placeholder={`1-${tags[category].length}`}
                                  style={{
                                    width: "60px",
                                    padding: "2px 4px",
                                    border: "1px solid #007bff",
                                    borderRadius: "3px",
                                    fontSize: "11px",
                                    textAlign: "center",
                                  }}
                                  title="Enter position to move this tag to"
                                />
                                <button
                                  onClick={() => {
                                    handleMoveToIndex(tag.docId, moveToIndexValues[tag.docId], category);
                                  }}
                                  disabled={loading || !moveToIndexValues[tag.docId] || moveToIndexValues[tag.docId] === ""}
                                  style={{
                                    backgroundColor: loading || !moveToIndexValues[tag.docId] || moveToIndexValues[tag.docId] === "" ? "#ccc" : "#007bff",
                                    color: "white",
                                    padding: "2px 4px",
                                    border: "none",
                                    borderRadius: "2px",
                                    cursor: loading || !moveToIndexValues[tag.docId] || moveToIndexValues[tag.docId] === "" ? "not-allowed" : "pointer",
                                    fontSize: "10px",
                                  }}
                                  title="Move to this position"
                                >
                                  Move
                                </button>
                              </div>
                            </div>

                            {/* Edit and Delete buttons */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                              <button
                                onClick={() => startEditTag(tag)}
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
                                onClick={() => handleDeleteTag(tag.docId)}
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
                    No tags found in {category}. Add some using the form above!
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Current Categories Display */}
      <div style={{ marginTop: "40px" }}>
        <h3>Current Categories</h3>
        
        {categories.length > 0 ? (
          <div style={{ marginBottom: "20px" }}>
            {categories.map((category) => (
              <div
                key={category.docId}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "15px",
                  marginBottom: "10px",
                  backgroundColor: editingCategory === category.docId ? "#f0f8ff" : "#f9f9f9",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "15px",
                }}
              >
                <div style={{ flex: 1 }}>
                  {editingCategory === category.docId ? (
                    <form onSubmit={handleEditCategorySubmit} style={{ marginBottom: "10px" }}>
                      <div style={{ marginBottom: "10px" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                          Display Name:
                        </label>
                        <input
                          type="text"
                          name="displayName"
                          value={editCategoryData.displayName}
                          onChange={(e) => setEditCategoryData({ ...editCategoryData, displayName: e.target.value })}
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
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                          Color:
                        </label>
                        <input
                          type="color"
                          name="color"
                          value={editCategoryData.color}
                          onChange={(e) => setEditCategoryData({ ...editCategoryData, color: e.target.value })}
                          style={{
                            width: "100px",
                            height: "30px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
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
                      <h5 style={{ margin: "0 0 5px 0", color: "#333" }}>
                        {category.name} - {category.displayName}
                      </h5>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                        <span style={{ fontSize: "0.9em", color: "#666" }}>Color:</span>
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: category.color,
                            borderRadius: "3px",
                            border: "1px solid #ccc",
                          }}
                        />
                        <span style={{ fontSize: "0.9em", color: "#666" }}>{category.color}</span>
                      </div>
                      {category.createdAt && (
                        <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#666" }}>
                          <strong>Created:</strong>{" "}
                          {new Date(category.createdAt.seconds * 1000).toLocaleDateString()}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {editingCategory !== category.docId && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <button
                      onClick={() => startEditCategory(category)}
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
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            No custom categories found. The default categories (TOPIC, PROJECT, GENRE) are always available.
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterEditor;
