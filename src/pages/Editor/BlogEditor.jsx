import { useState, useEffect } from "react";

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
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: "",
    topics: [],
    content: "",
    preview: "",
    fontColor: "#000000",
  });
  
  // Edit states
  const [editingPost, setEditingPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    author: "",
    date: "",
    topics: [],
    content: "",
    preview: "",
    fontColor: "#000000",
  });
  
  // UI states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format date to "March 30th, 2025" format
  const formatDate = (date) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    // Add ordinal suffix
    const getOrdinalSuffix = (day) => {
      if (day >= 11 && day <= 13) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
    
    return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/blog`);
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
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/filters/tags`);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTopicToggle = (topicName) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.includes(topicName)
        ? prev.topics.filter(t => t !== topicName)
        : [...prev.topics, topicName]
    }));
  };

  const handleEditTopicToggle = (topicName) => {
    setEditFormData((prev) => ({
      ...prev,
      topics: prev.topics.includes(topicName)
        ? prev.topics.filter(t => t !== topicName)
        : [...prev.topics, topicName]
    }));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setFormData((prev) => ({
      ...prev,
      date: formatDate(date),
    }));
    setShowDatePicker(false);
  };

  const handleEditDateSelect = (date) => {
    setSelectedDate(date);
    setEditFormData((prev) => ({
      ...prev,
      date: formatDate(date),
    }));
    setShowDatePicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Blog post created successfully!");
        setMessageType("success");
        setFormData({
          title: "",
          author: "",
          date: "",
          topics: [],
          content: "",
          preview: "",
          fontColor: "#000000",
        });
        fetchPosts();
      } else {
        setMessage(data.error || "Failed to create blog post");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/blog/${editingPost}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Blog post updated successfully!");
        setMessageType("success");
        setEditingPost(null);
        setEditFormData({
          title: "",
          author: "",
          date: "",
          topics: [],
          content: "",
          preview: "",
          fontColor: "#000000",
        });
        fetchPosts();
      } else {
        setMessage(data.error || "Failed to update blog post");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
      setMessageType("error");
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
      fontColor: post.fontColor || "#000000",
    });
  };

  const handleDelete = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/blog/${docId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Blog post deleted successfully!");
        setMessageType("success");
        fetchPosts();
      } else {
        setMessage(data.error || "Failed to delete blog post");
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
    setEditingPost(null);
    setEditFormData({
      title: "",
      author: "",
      date: "",
      topics: [],
      content: "",
      preview: "",
    });
    setMessage("");
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const getMonthName = (date) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[date.getMonth()];
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === selectedDate.getMonth();
  };

  // Get all available topics from tags
  const getAllTopics = () => {
    const allTopics = [];
    Object.values(tags).forEach(categoryTags => {
      categoryTags.forEach(tag => {
        allTopics.push({
          name: tag.name,
          category: tag.category,
          position: tag.position
        });
      });
    });
    return allTopics.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.position - b.position;
    });
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
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="title"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              placeholder="Enter blog post title"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="author"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Author:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              placeholder="Enter author name"
            />
          </div>

          <div style={{ marginBottom: "15px", position: "relative" }}>
            <label
              htmlFor="date"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Date:
            </label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              onClick={() => setShowDatePicker(!showDatePicker)}
              readOnly
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              placeholder="Click to select date"
            />
            
            {showDatePicker && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                zIndex: 1000,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                minWidth: "300px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <button
                    type="button"
                    onClick={() => navigateMonth(-1)}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    ‹
                  </button>
                  <h4 style={{ margin: 0 }}>
                    {getMonthName(selectedDate)} {selectedDate.getFullYear()}
                  </h4>
                  <button
                    type="button"
                    onClick={() => navigateMonth(1)}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    ›
                  </button>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "10px" }}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} style={{ textAlign: "center", fontWeight: "bold", padding: "5px" }}>
                      {day}
                    </div>
                  ))}
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
                  {generateCalendarDays().map((date, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDateSelect(date)}
                      style={{
                        padding: "8px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        backgroundColor: isSelected(date) ? "#007bff" : 
                                       isToday(date) ? "#e3f2fd" : 
                                       isCurrentMonth(date) ? "white" : "#f5f5f5",
                        color: isSelected(date) ? "white" : 
                               isCurrentMonth(date) ? "black" : "#999",
                        fontWeight: isToday(date) ? "bold" : "normal",
                      }}
                    >
                      {date.getDate()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px", position: "relative" }}>
            <label
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Topics:
            </label>
            <div
              onClick={() => setShowTopicDropdown(!showTopicDropdown)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                backgroundColor: "white",
                minHeight: "20px",
              }}
            >
              {formData.topics.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {formData.topics.map(topic => (
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
              ) : (
                <span style={{ color: "#999" }}>Click to select topics</span>
              )}
            </div>
            
            {showTopicDropdown && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 1000,
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}>
                {getAllTopics().length > 0 ? (
                  getAllTopics().map(topic => (
                    <div
                      key={topic.name}
                      onClick={() => handleTopicToggle(topic.name)}
                      style={{
                        padding: "8px 12px",
                        cursor: "pointer",
                        backgroundColor: formData.topics.includes(topic.name) ? "#e3f2fd" : "white",
                        borderBottom: "1px solid #eee",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.topics.includes(topic.name)}
                        onChange={() => {}}
                        style={{ margin: 0 }}
                      />
                      <span>{topic.name}</span>
                      <span style={{ fontSize: "12px", color: "#666", marginLeft: "auto" }}>
                        {topic.category}
                      </span>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "12px", color: "#666", textAlign: "center" }}>
                    No topics available. Add topics in the Filter Editor first.
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="preview"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Preview Text:
            </label>
            <textarea
              id="preview"
              name="preview"
              value={formData.preview}
              onChange={handleInputChange}
              rows="3"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                resize: "vertical",
              }}
              placeholder="Enter preview text (optional)"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="content"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="15"
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                resize: "vertical",
                fontFamily: "monospace",
              }}
              placeholder="Enter blog post content (supports Markdown)"
            />
            <small style={{ color: "#666", fontSize: "12px", display: "block", marginTop: "5px" }}>
              <strong>Markdown Support:</strong> Use **bold**, *italic*, [links](url), # headers, - lists, etc.
              <br />
              <strong>Media:</strong> Add images with ![alt](url) and videos with [video](url)
              <br />
              <strong>YouTube Embeds:</strong> Use {`{youtube:VIDEO_ID}`} to embed YouTube videos (e.g., {`{youtube:5kXOXbqihp0}`})
              <br />
              <strong>Video Player:</strong> Use {`{player:URL}`} for ReactPlayer (supports YouTube, Vimeo, Dropbox, etc.)
              <br />
              <strong>HTML Video:</strong> Use {`{video:URL}`} for direct video files (MP4, WebM, etc.)
              <br />
              <strong>Images:</strong> Use {`{image:URL}`} to embed images from any URL
              <br />
              <strong>Inline Colors:</strong> Use {`{color:#FF5733}colored text{/color}`} for specific text colors
              <br />
              <strong>Indentation:</strong> Use {`{indent:20}indented text{/indent}`} to indent blocks of text
            </small>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="fontColor"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Font Color:
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="color"
                id="fontColor"
                name="fontColor"
                value={formData.fontColor}
                onChange={handleInputChange}
                style={{
                  width: "60px",
                  height: "40px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontSize: "14px", color: "#666" }}>
                {formData.fontColor}
              </span>
            </div>
            <small style={{ color: "#666", fontSize: "12px", display: "block", marginTop: "5px" }}>
              Choose the default color for the main text content. Use inline color syntax for specific sections.
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
                        <div style={{ marginBottom: "10px" }}>
                          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Title:
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={editFormData.title}
                            onChange={handleEditInputChange}
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
                            Author:
                          </label>
                          <input
                            type="text"
                            name="author"
                            value={editFormData.author}
                            onChange={handleEditInputChange}
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
                            Date:
                          </label>
                          <input
                            type="text"
                            name="date"
                            value={editFormData.date}
                            onChange={handleEditInputChange}
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
                            Topics:
                          </label>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "5px" }}>
                            {editFormData.topics.map(topic => (
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
                                <button
                                  type="button"
                                  onClick={() => handleEditTopicToggle(topic)}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "white",
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <select
                            onChange={(e) => {
                              if (e.target.value && !editFormData.topics.includes(e.target.value)) {
                                handleEditTopicToggle(e.target.value);
                              }
                              e.target.value = "";
                            }}
                            style={{
                              width: "100%",
                              padding: "6px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                            }}
                          >
                            <option value="">Add topic...</option>
                            {getAllTopics().map(topic => (
                              <option key={topic.name} value={topic.name}>
                                {topic.name} ({topic.category})
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div style={{ marginBottom: "10px" }}>
                          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Preview:
                          </label>
                          <textarea
                            name="preview"
                            value={editFormData.preview}
                            onChange={handleEditInputChange}
                            rows="2"
                            style={{
                              width: "100%",
                              padding: "6px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              resize: "vertical",
                            }}
                          />
                        </div>
                        
                        <div style={{ marginBottom: "10px" }}>
                          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Content:
                          </label>
                          <textarea
                            name="content"
                            value={editFormData.content}
                            onChange={handleEditInputChange}
                            rows="10"
                            required
                            style={{
                              width: "100%",
                              padding: "6px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              resize: "vertical",
                              fontFamily: "monospace",
                            }}
                          />
                        </div>
                        
                        <div style={{ marginBottom: "10px" }}>
                          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                            Font Color:
                          </label>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input
                              type="color"
                              name="fontColor"
                              value={editFormData.fontColor}
                              onChange={handleEditInputChange}
                              style={{
                                width: "50px",
                                height: "30px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            />
                            <span style={{ fontSize: "12px", color: "#666" }}>
                              {editFormData.fontColor}
                            </span>
                          </div>
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
