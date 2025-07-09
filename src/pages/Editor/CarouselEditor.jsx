import renderPaginationControls from "./PaginationControls";
import { useState, useEffect } from "react";

const AlbumEditor = () => {
  const [albumFormData, setAlbumFormData] = useState({
    title: "",
    track: "",
    coverUrl: "",
  });
  const [albumLoading, setAlbumLoading] = useState(false);
  const [albumMessage, setAlbumMessage] = useState("");
  const [albumMessageType, setAlbumMessageType] = useState("");
  const [albumList, setAlbumList] = useState([]);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [albumCurrentPage, setAlbumCurrentPage] = useState(1);
  const [deletingAlbum, setDeletingAlbum] = useState(null);
  const [reorderingAlbum, setReorderingAlbum] = useState(null);
  const [itemsPerPage] = useState(10);

  const albumIndexOfLastItem = albumCurrentPage * itemsPerPage;
  const albumIndexOfFirstItem = albumIndexOfLastItem - itemsPerPage;
  const albumCurrentItems = albumList.slice(
    albumIndexOfFirstItem,
    albumIndexOfLastItem,
  );
  const albumTotalPages = Math.ceil(albumList.length / itemsPerPage);

  const fetchAlbumList = async () => {
    setLoadingAlbums(true);
    try {
      const response = await fetch("https://wavyrn-backend-k4sh6a558-mi-s-projects.vercel.app/api/albums");
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

  const handleAlbumSubmit = async (e) => {
    e.preventDefault();
    setAlbumLoading(true);
    setAlbumMessage("");

    try {
      const response = await fetch("https://wavyrn-backend-k4sh6a558-mi-s-projects.vercel.app/api/albums", {
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
        setAlbumFormData({ title: "", track: "", coverUrl: "" });
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

  const handleAlbumDelete = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this album?")) {
      return;
    }

    setDeletingAlbum(docId);
    try {
      const response = await fetch(`https://wavyrn-backend-k4sh6a558-mi-s-projects.vercel.app/api/albums/${docId}`, {
        method: "DELETE",
      });

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
      const response = await fetch("https://wavyrn-backend-k4sh6a558-mi-s-projects.vercel.app/api/albums/reorder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ docId, direction }),
      });

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
            Track/Artist:
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
        <h3>Current Albums ({albumList.length} total)</h3>

        {loadingAlbums ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Loading albums...
          </div>
        ) : (
          <>
            {albumCurrentItems.length > 0 ? (
              <div style={{ marginBottom: "20px" }}>
                {albumCurrentItems.map((album, index) => (
                  <div
                    key={album.docId || index}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "15px",
                      marginBottom: "10px",
                      backgroundColor: "#f9f9f9",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
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
                    <div style={{ flex: 1 }}>
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
                    </div>

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
                            reorderingAlbum === album.docId || album.id === 1
                              ? "#ccc"
                              : "#28a745",
                          color: "white",
                          padding: "4px 8px",
                          border: "none",
                          borderRadius: "3px",
                          cursor:
                            reorderingAlbum === album.docId || album.id === 1
                              ? "not-allowed"
                              : "pointer",
                          fontSize: "12px",
                        }}
                        title="Move to top"
                      >
                        ⇈
                      </button>
                      <button
                        onClick={() => handleAlbumReorder(album.docId, "up")}
                        disabled={
                          reorderingAlbum === album.docId || album.id === 1
                        }
                        style={{
                          backgroundColor:
                            reorderingAlbum === album.docId || album.id === 1
                              ? "#ccc"
                              : "#17a2b8",
                          color: "white",
                          padding: "4px 8px",
                          border: "none",
                          borderRadius: "3px",
                          cursor:
                            reorderingAlbum === album.docId || album.id === 1
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
                    </div>

                    <button
                      onClick={() => handleAlbumDelete(album.docId)}
                      disabled={deletingAlbum === album.docId}
                      style={{
                        backgroundColor:
                          deletingAlbum === album.docId ? "#ccc" : "#dc3545",
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
                      {deletingAlbum === album.docId ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                ))}
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

            {renderPaginationControls(
              albumCurrentPage,
              albumTotalPages,
              handleAlbumPageChange,
              albumIndexOfFirstItem,
              albumIndexOfLastItem,
              albumList.length,
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AlbumEditor;
