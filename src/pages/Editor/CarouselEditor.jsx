import renderPaginationControls from "./PaginationControls";
import { useState, useEffect } from "react";

const AlbumEditor = () => {
  const [albumFormData, setAlbumFormData] = useState({
    title: "",
    track: "",
    coverUrl: "",
    position: "",
  });
  const [albumLoading, setAlbumLoading] = useState(false);
  const [albumMessage, setAlbumMessage] = useState("");
  const [albumMessageType, setAlbumMessageType] = useState("");
  const [albumList, setAlbumList] = useState([]);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [albumCurrentPage, setAlbumCurrentPage] = useState(1);
  const [deletingAlbum, setDeletingAlbum] = useState(null);
  const [reorderingAlbum, setReorderingAlbum] = useState(null);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    track: "",
    coverUrl: "",
    position: "",
  });
  const [moveToIndexValues, setMoveToIndexValues] = useState({});

  // URL validation function
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const fetchAlbumList = async () => {
    setLoadingAlbums(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/albums`);
      const data = await response.json();
      if (response.ok) {
        setAlbumList(data.albums || []);
      } else {
        console.error("Failed to fetch albums:", data.error);
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoadingAlbums(false);
    }
  };

  // Handle Escape key to cancel editing
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && editingAlbum) {
        cancelEdit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editingAlbum]);

  useEffect(() => {
    fetchAlbumList();
  }, []);

  const handleAlbumInputChange = (e) => {
    const { name, value } = e.target;
    setAlbumFormData((prev) => ({
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

  const handleAlbumSubmit = async (e) => {
    e.preventDefault();

    // Validate URL before submitting
    if (!isValidUrl(albumFormData.coverUrl)) {
      setAlbumMessage("Please enter a valid cover URL");
      setAlbumMessageType("error");
      return;
    }

    setAlbumLoading(true);
    setAlbumMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/albums`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(albumFormData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlbumMessage("Album added successfully!");
        setAlbumMessageType("success");
        setAlbumFormData({ title: "", track: "", coverUrl: "", position: "" });
        fetchAlbumList();
      } else {
        setAlbumMessage(data.error || "Failed to add album");
        setAlbumMessageType("error");
      }
    } catch (error) {
      setAlbumMessage("Network error: " + error.message);
      setAlbumMessageType("error");
    } finally {
      setAlbumLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Validate URL before submitting
    if (!isValidUrl(editFormData.coverUrl)) {
      setAlbumMessage("Please enter a valid cover URL");
      setAlbumMessageType("error");
      return;
    }

    setAlbumLoading(true);
    setAlbumMessage("");

    try {
      // First, update the basic fields (title, track, coverUrl)
      const updateResponse = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/albums/${editingAlbum}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editFormData.title,
            track: editFormData.track,
            coverUrl: editFormData.coverUrl,
          }),
        },
      );

      const updateData = await updateResponse.json();

      if (!updateResponse.ok) {
        setAlbumMessage(updateData.error || "Failed to update album");
        setAlbumMessageType("error");
        return;
      }

      // If position changed, handle position update separately
      const currentItem = albumList.find(item => item.docId === editingAlbum);
      if (currentItem && parseInt(editFormData.position) !== currentItem.id) {
        const positionResponse = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/albums/position`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              docId: editingAlbum,
              position: parseInt(editFormData.position),
            }),
          },
        );

        const positionData = await positionResponse.json();

        if (!positionResponse.ok) {
          setAlbumMessage(positionData.error || "Failed to update position");
          setAlbumMessageType("error");
          return;
        }
      }

      setAlbumMessage("Album updated successfully!");
      setAlbumMessageType("success");
      setEditingAlbum(null);
      setEditFormData({ title: "", track: "", coverUrl: "", position: "" });
      fetchAlbumList();
    } catch (error) {
      setAlbumMessage("Network error: " + error.message);
      setAlbumMessageType("error");
    } finally {
      setAlbumLoading(false);
    }
  };

  const startEdit = (album) => {
    setEditingAlbum(album.docId);
    setEditFormData({
      title: album.title,
      track: album.track,
      coverUrl: album.coverUrl,
      position: album.id,
    });
    setAlbumMessage(""); // Clear any existing messages
  };

  const cancelEdit = () => {
    setEditingAlbum(null);
    setEditFormData({ title: "", track: "", coverUrl: "", position: "" });
    setAlbumMessage(""); // Clear any existing messages
  };

  const handleAlbumDelete = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this album?")) {
      return;
    }

    setDeletingAlbum(docId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/albums/${docId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (response.ok) {
        setAlbumMessage("Album deleted successfully!");
        setAlbumMessageType("success");
        fetchAlbumList();
      } else {
        setAlbumMessage(data.error || "Failed to delete album");
        setAlbumMessageType("error");
      }
    } catch (error) {
      setAlbumMessage("Network error: " + error.message);
      setAlbumMessageType("error");
    } finally {
      setDeletingAlbum(null);
    }
  };

  const handleAlbumReorder = async (docId, direction) => {
    setReorderingAlbum(docId);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/albums/reorder`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ docId, direction }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setAlbumMessageType("success");
        fetchAlbumList();
      } else {
        setAlbumMessage(data.error || "Failed to reorder albums");
        setAlbumMessageType("error");
      }
    } catch (error) {
      setAlbumMessage("Network error: " + error.message);
      setAlbumMessageType("error");
    } finally {
      setReorderingAlbum(null);
    }
  };

  const handleMoveToIndex = async (docId, targetIndex) => {
    // Convert to number and validate
    const position = parseInt(targetIndex);
    
    console.log("Validation check:", { targetIndex, position, albumListLength: albumList.length });
    
    if (!targetIndex || targetIndex === "" || isNaN(position) || position < 1 || position > albumList.length) {
      setAlbumMessage(`Please enter a valid position between 1 and ${albumList.length}`);
      setAlbumMessageType("error");
      return;
    }

    setReorderingAlbum(docId);

    try {
      const requestBody = { docId, position };
      console.log("Sending request:", requestBody); // Debug log
      console.log("Backend URL:", import.meta.env.VITE_REACT_APP_BACKEND_URL); // Debug log
      
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/albums/position`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      const data = await response.json();
      console.log("Response:", response.status, data); // Debug log

      if (response.ok) {
        setAlbumMessage(`Album moved to position ${position} successfully!`);
        setAlbumMessageType("success");
        // Clear the input value for this album
        setMoveToIndexValues(prev => ({
          ...prev,
          [docId]: ""
        }));
        fetchAlbumList();
      } else {
        setAlbumMessage(data.error || `Failed to move album (${response.status})`);
        setAlbumMessageType("error");
      }
    } catch (error) {
      console.error("Move to index error:", error); // Debug log
      setAlbumMessage("Network error: " + error.message);
      setAlbumMessageType("error");
    } finally {
      setReorderingAlbum(null);
    }
  };

  const handleAlbumPageChange = (pageNumber) => {
    setAlbumCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>Add Album</h2>

      <form onSubmit={handleAlbumSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="title"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Album Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={albumFormData.title}
            onChange={handleAlbumInputChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter album title"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="track"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Track URL:
          </label>
          <input
            type="text"
            id="track"
            name="track"
            value={albumFormData.track}
            onChange={handleAlbumInputChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter track or artist name"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="coverUrl"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Cover URL:
          </label>
          <input
            type="url"
            id="coverUrl"
            name="coverUrl"
            value={albumFormData.coverUrl}
            onChange={handleAlbumInputChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter album cover URL"
          />
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
            value={albumFormData.position}
            onChange={handleAlbumInputChange}
            min="1"
            max={albumList.length + 1}
            style={{
              width: "100%",
              padding: "8px",
              border: "2px solid #007bff",
              borderRadius: "4px",
              backgroundColor: "#f8f9fa",
            }}
            placeholder={`Enter position (1 to ${albumList.length + 1})`}
          />
          <small style={{ color: "#666", fontSize: "12px", display: "block", marginTop: "5px" }}>
            <strong>Current albums:</strong> {albumList.length} | 
            <strong> Leave empty</strong> to add at the end | 
            <strong> Enter number</strong> to insert at that specific position
          </small>
        </div>

        <button
          type="submit"
          disabled={albumLoading}
          style={{
            backgroundColor: albumLoading ? "#ccc" : "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: albumLoading ? "not-allowed" : "pointer",
          }}
        >
          {albumLoading ? "Adding..." : "Add Album"}
        </button>
      </form>

      {albumMessage && (
        <div
          style={{
            padding: "10px",
            borderRadius: "4px",
            backgroundColor:
              albumMessageType === "success" ? "#d4edda" : "#f8d7da",
            color: albumMessageType === "success" ? "#155724" : "#721c24",
            border:
              albumMessageType === "success"
                ? "1px solid #c3e6cb"
                : "1px solid #f5c6cb",
            marginBottom: "20px",
          }}
        >
          {albumMessage}
        </div>
      )}

      {/* Albums List */}
      <div>
        <h3>Current Tracks ({albumList.length} total)</h3>

        {loadingAlbums ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Loading albums...
          </div>
        ) : (
          <>
            {albumList.length > 0 ? (
              <div style={{ marginBottom: "20px" }}>
                {albumList.map((album, index) => (
                  <div
                    key={album.docId || index}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "15px",
                      marginBottom: "10px",
                      backgroundColor:
                        editingAlbum === album.docId ? "#f0f8ff" : "#f9f9f9",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    {editingAlbum !== album.docId && (
                      <img
                        src={album.coverUrl}
                        alt={album.title}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}

                    <div style={{ flex: 1 }}>
                      {editingAlbum === album.docId ? (
                        <form
                          onSubmit={handleEditSubmit}
                          style={{ marginBottom: "10px" }}
                        >
                          <div style={{ marginBottom: "10px" }}>
                            <label
                              style={{
                                display: "block",
                                marginBottom: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              Album Title:
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
                            <label
                              style={{
                                display: "block",
                                marginBottom: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              Track:
                            </label>
                            <input
                              type="text"
                              name="track"
                              value={editFormData.track}
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
                            <label
                              style={{
                                display: "block",
                                marginBottom: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              Cover URL:
                            </label>
                            <input
                              type="url"
                              name="coverUrl"
                              value={editFormData.coverUrl}
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
                            <label
                              style={{
                                display: "block",
                                marginBottom: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              Position:
                            </label>
                            <input
                              type="number"
                              name="position"
                              value={editFormData.position}
                              onChange={handleEditInputChange}
                              min="1"
                              max={albumList.length}
                              style={{
                                width: "100%",
                                padding: "6px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                            />
                            <small style={{ color: "#666", fontSize: "11px" }}>
                              Current position: {editFormData.position}
                            </small>
                          </div>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <button
                              type="submit"
                              disabled={albumLoading}
                              style={{
                                backgroundColor: albumLoading
                                  ? "#ccc"
                                  : "#28a745",
                                color: "white",
                                padding: "6px 12px",
                                border: "none",
                                borderRadius: "4px",
                                cursor: albumLoading
                                  ? "not-allowed"
                                  : "pointer",
                              }}
                            >
                              {albumLoading ? "Updating..." : "Save"}
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
                          <h4 style={{ margin: "0 0 5px 0", color: "#333" }}>
                            #{album.id} - {album.title}
                          </h4>
                          <p style={{ margin: "5px 0", color: "#666" }}>
                            {album.track}
                          </p>
                          <p
                            style={{
                              margin: "5px 0",
                              fontSize: "0.9em",
                              wordBreak: "break-all",
                            }}
                          >
                            <strong>Cover URL:</strong>
                            <a
                              href={album.coverUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ marginLeft: "5px", color: "#007bff" }}
                            >
                              {album.coverUrl}
                            </a>
                          </p>
                          {album.createdAt && (
                            <p
                              style={{
                                margin: "5px 0",
                                fontSize: "0.9em",
                                color: "#666",
                              }}
                            >
                              <strong>Added:</strong>{" "}
                              {new Date(
                                album.createdAt.seconds * 1000,
                              ).toLocaleDateString()}
                            </p>
                          )}
                          {album.updatedAt && (
                            <p
                              style={{
                                margin: "5px 0",
                                fontSize: "0.9em",
                                color: "#666",
                              }}
                            >
                              <strong>Updated:</strong>{" "}
                              {new Date(
                                album.updatedAt.seconds * 1000,
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    {editingAlbum !== album.docId && (
                      <>
                        {/* Reorder Controls */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <button
                            onClick={() =>
                              handleAlbumReorder(album.docId, "top")
                            }
                            disabled={
                              reorderingAlbum === album.docId || album.id === 1
                            }
                            style={{
                              backgroundColor:
                                reorderingAlbum === album.docId ||
                                album.id === 1
                                  ? "#ccc"
                                  : "#28a745",
                              color: "white",
                              padding: "4px 8px",
                              border: "none",
                              borderRadius: "3px",
                              cursor:
                                reorderingAlbum === album.docId ||
                                album.id === 1
                                  ? "not-allowed"
                                  : "pointer",
                              fontSize: "12px",
                            }}
                            title="Move to top"
                          >
                            ⇈
                          </button>
                          <button
                            onClick={() =>
                              handleAlbumReorder(album.docId, "up")
                            }
                            disabled={
                              reorderingAlbum === album.docId || album.id === 1
                            }
                            style={{
                              backgroundColor:
                                reorderingAlbum === album.docId ||
                                album.id === 1
                                  ? "#ccc"
                                  : "#17a2b8",
                              color: "white",
                              padding: "4px 8px",
                              border: "none",
                              borderRadius: "3px",
                              cursor:
                                reorderingAlbum === album.docId ||
                                album.id === 1
                                  ? "not-allowed"
                                  : "pointer",
                              fontSize: "12px",
                            }}
                            title="Move up"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() =>
                              handleAlbumReorder(album.docId, "down")
                            }
                            disabled={
                              reorderingAlbum === album.docId ||
                              album.id === albumList.length
                            }
                            style={{
                              backgroundColor:
                                reorderingAlbum === album.docId ||
                                album.id === albumList.length
                                  ? "#ccc"
                                  : "#17a2b8",
                              color: "white",
                              padding: "4px 8px",
                              border: "none",
                              borderRadius: "3px",
                              cursor:
                                reorderingAlbum === album.docId ||
                                album.id === albumList.length
                                  ? "not-allowed"
                                  : "pointer",
                              fontSize: "12px",
                            }}
                            title="Move down"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() =>
                              handleAlbumReorder(album.docId, "bottom")
                            }
                            disabled={
                              reorderingAlbum === album.docId ||
                              album.id === albumList.length
                            }
                            style={{
                              backgroundColor:
                                reorderingAlbum === album.docId ||
                                album.id === albumList.length
                                  ? "#ccc"
                                  : "#28a745",
                              color: "white",
                              padding: "4px 8px",
                              border: "none",
                              borderRadius: "3px",
                              cursor:
                                reorderingAlbum === album.docId ||
                                album.id === albumList.length
                                  ? "not-allowed"
                                  : "pointer",
                              fontSize: "12px",
                            }}
                            title="Move to bottom"
                          >
                            ⇊
                          </button>
                          
                          {/* Move to specific index */}
                          <div style={{ marginTop: "5px", borderTop: "1px solid #ddd", paddingTop: "5px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                              <input
                                type="number"
                                value={moveToIndexValues[album.docId] || ""}
                                onChange={(e) => {
                                  setMoveToIndexValues(prev => ({
                                    ...prev,
                                    [album.docId]: e.target.value
                                  }));
                                }}
                                min="1"
                                max={albumList.length}
                                placeholder={`1-${albumList.length}`}
                                style={{
                                  width: "60px",
                                  padding: "2px 4px",
                                  border: "1px solid #007bff",
                                  borderRadius: "3px",
                                  fontSize: "11px",
                                  textAlign: "center",
                                }}
                                title="Enter position to move this album to"
                              />
                              <button
                                onClick={() => {
                                  handleMoveToIndex(album.docId, moveToIndexValues[album.docId]);
                                }}
                                disabled={reorderingAlbum === album.docId || !moveToIndexValues[album.docId] || moveToIndexValues[album.docId] === ""}
                                style={{
                                  backgroundColor: reorderingAlbum === album.docId || !moveToIndexValues[album.docId] || moveToIndexValues[album.docId] === "" ? "#ccc" : "#007bff",
                                  color: "white",
                                  padding: "2px 4px",
                                  border: "none",
                                  borderRadius: "2px",
                                  cursor: reorderingAlbum === album.docId || !moveToIndexValues[album.docId] || moveToIndexValues[album.docId] === "" ? "not-allowed" : "pointer",
                                  fontSize: "10px",
                                }}
                                title="Move to this position"
                              >
                                Move
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Edit and Delete buttons */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
                          <button
                            onClick={() => startEdit(album)}
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
                            onClick={() => handleAlbumDelete(album.docId)}
                            disabled={deletingAlbum === album.docId}
                            style={{
                              backgroundColor:
                                deletingAlbum === album.docId
                                  ? "#ccc"
                                  : "#dc3545",
                              color: "white",
                              padding: "8px 15px",
                              border: "none",
                              borderRadius: "4px",
                              cursor:
                                deletingAlbum === album.docId
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            {deletingAlbum === album.docId
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}{" "}
                {/* Fixed: Added missing closing parenthesis and brace for map function */}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#666",
                }}
              >
                No albums found. Add some using the form above!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AlbumEditor;
