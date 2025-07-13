import renderPaginationControls from "./PaginationControls";
import { useState, useEffect } from "react";

const SFXEditor = () => {
  const [sfxFormData, setSfxFormData] = useState({
    name: "",
    link: "",
  });
  const [sfxLoading, setSfxLoading] = useState(false);
  const [sfxMessage, setSfxMessage] = useState("");
  const [sfxMessageType, setSfxMessageType] = useState("");
  const [sfxList, setSfxList] = useState([]);
  const [loadingSfx, setLoadingSfx] = useState(false);
  const [sfxCurrentPage, setSfxCurrentPage] = useState(1);
  const [deletingSfx, setDeletingSfx] = useState(null);
  const [editingSfx, setEditingSfx] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    link: "",
  });
  const [itemsPerPage] = useState(10);

  const sfxIndexOfLastItem = sfxCurrentPage * itemsPerPage;
  const sfxIndexOfFirstItem = sfxIndexOfLastItem - itemsPerPage;
  const sfxCurrentItems = sfxList.slice(
    sfxIndexOfFirstItem,
    sfxIndexOfLastItem,
  );
  const sfxTotalPages = Math.ceil(sfxList.length / itemsPerPage);

  // URL validation function
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const fetchSfxList = async () => {
    setLoadingSfx(true);
    try {
      const response = await fetch("https://wavyrn-backend-k4sh6a558-mi-s-projects.vercel.app/api/soundEffects");
      const data = await response.json();
      if (response.ok) {
        setSfxList(data.soundEffects || []);
      } else {
        console.error("Failed to fetch sound effects:", data.error);
      }
    } catch (error) {
      console.error("Error fetching sound effects:", error);
    } finally {
      setLoadingSfx(false);
    }
  };

  // Handle Escape key to cancel editing
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && editingSfx) {
        cancelEdit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editingSfx]);

  useEffect(() => {
    fetchSfxList();
  }, []);

  const handleSfxInputChange = (e) => {
    const { name, value } = e.target;
    setSfxFormData((prev) => ({
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

  const handleSfxSubmit = async (e) => {
    e.preventDefault();

    // Validate URL before submitting
    if (!isValidUrl(sfxFormData.link)) {
      setSfxMessage("Please enter a valid URL");
      setSfxMessageType("error");
      return;
    }

    setSfxLoading(true);
    setSfxMessage("");

    try {
      const response = await fetch("https://wavyrn-backend-k4sh6a558-mi-s-projects.vercel.app/api/soundEffects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sfxFormData),
      });

      const data = await response.json();

      if (response.ok) {
        setSfxMessage("Sound effect added successfully!");
        setSfxMessageType("success");
        setSfxFormData({ name: "", link: "" });
        fetchSfxList();
      } else {
        setSfxMessage(data.error || "Failed to add sound effect");
        setSfxMessageType("error");
      }
    } catch (error) {
      setSfxMessage("Network error: " + error.message);
      setSfxMessageType("error");
    } finally {
      setSfxLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Validate URL before submitting
    if (!isValidUrl(editFormData.link)) {
      setSfxMessage("Please enter a valid URL");
      setSfxMessageType("error");
      return;
    }

    setSfxLoading(true);
    setSfxMessage("");

    try {
      const response = await fetch(
        `https://wavyrn-backend-k4sh6a558-mi-s-projects.vercel.app/api/soundEffects/${editingSfx}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSfxMessage("Sound effect updated successfully!");
        setSfxMessageType("success");
        setEditingSfx(null);
        setEditFormData({ name: "", link: "" });
        fetchSfxList();
      } else {
        setSfxMessage(data.error || "Failed to update sound effect");
        setSfxMessageType("error");
      }
    } catch (error) {
      setSfxMessage("Network error: " + error.message);
      setSfxMessageType("error");
    } finally {
      setSfxLoading(false);
    }
  };

  const startEdit = (sfx) => {
    setEditingSfx(sfx.id);
    setEditFormData({
      name: sfx.name,
      link: sfx.link,
    });
    setSfxMessage(""); // Clear any existing messages
  };

  const cancelEdit = () => {
    setEditingSfx(null);
    setEditFormData({ name: "", link: "" });
    setSfxMessage(""); // Clear any existing messages
  };

  const handleSfxDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sound effect?")) {
      return;
    }

    setDeletingSfx(id);
    try {
      const response = await fetch(
        `https://wavyrn-backend-k4sh6a558-mi-s-projects.vercel.app/api/soundEffects/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (response.ok) {
        setSfxMessage("Sound effect deleted successfully!");
        setSfxMessageType("success");
        fetchSfxList();
      } else {
        setSfxMessage(data.error || "Failed to delete sound effect");
        setSfxMessageType("error");
      }
    } catch (error) {
      setSfxMessage("Network error: " + error.message);
      setSfxMessageType("error");
    } finally {
      setDeletingSfx(null);
    }
  };

  const handleSfxPageChange = (pageNumber) => {
    setSfxCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>Add Sound Effect</h2>

      <form onSubmit={handleSfxSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Sound Effect Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={sfxFormData.name}
            onChange={handleSfxInputChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter sound effect name"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="link"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Sound Effect Link:
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={sfxFormData.link}
            onChange={handleSfxInputChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter sound effect URL"
          />
        </div>

        <button
          type="submit"
          disabled={sfxLoading}
          style={{
            backgroundColor: sfxLoading ? "#ccc" : "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: sfxLoading ? "not-allowed" : "pointer",
          }}
        >
          {sfxLoading ? "Adding..." : "Add Sound Effect"}
        </button>
      </form>

      {sfxMessage && (
        <div
          style={{
            padding: "10px",
            borderRadius: "4px",
            backgroundColor:
              sfxMessageType === "success" ? "#d4edda" : "#f8d7da",
            color: sfxMessageType === "success" ? "#155724" : "#721c24",
            border:
              sfxMessageType === "success"
                ? "1px solid #c3e6cb"
                : "1px solid #f5c6cb",
            marginBottom: "20px",
          }}
        >
          {sfxMessage}
        </div>
      )}

      <div>
        <h3>Current Sound Effects ({sfxList.length} total)</h3>

        {loadingSfx ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Loading sound effects...
          </div>
        ) : (
          <>
            {sfxCurrentItems.length > 0 ? (
              <div style={{ marginBottom: "20px" }}>
                {sfxCurrentItems.map((sfx, index) => (
                  <div
                    key={sfx.id || index}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "15px",
                      marginBottom: "10px",
                      backgroundColor: editingSfx === sfx.id ? "#f0f8ff" : "#f9f9f9",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        {editingSfx === sfx.id ? (
                          <form onSubmit={handleEditSubmit} style={{ marginBottom: "10px" }}>
                            <div style={{ marginBottom: "10px" }}>
                              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                                Sound Effect Name:
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={editFormData.name}
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
                                Sound Effect Link:
                              </label>
                              <input
                                type="url"
                                name="link"
                                value={editFormData.link}
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
                            <div style={{ display: "flex", gap: "10px" }}>
                              <button
                                type="submit"
                                disabled={sfxLoading}
                                style={{
                                  backgroundColor: sfxLoading ? "#ccc" : "#28a745",
                                  color: "white",
                                  padding: "6px 12px",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: sfxLoading ? "not-allowed" : "pointer",
                                }}
                              >
                                {sfxLoading ? "Updating..." : "Save"}
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
                              {sfx.name}
                            </h4>
                            <p
                              style={{
                                margin: "5px 0",
                                wordBreak: "break-all",
                              }}
                            >
                              <strong>Link:</strong>
                              <a
                                href={sfx.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  marginLeft: "5px",
                                  color: "#007bff",
                                }}
                              >
                                {sfx.link}
                              </a>
                            </p>
                            {sfx.createdAt && (
                              <p
                                style={{
                                  margin: "5px 0",
                                  fontSize: "0.9em",
                                  color: "#666",
                                }}
                              >
                                <strong>Added:</strong>{" "}
                                {new Date(
                                  sfx.createdAt.seconds * 1000,
                                ).toLocaleDateString()}
                              </p>
                            )}
                            {sfx.updatedAt && (
                              <p
                                style={{
                                  margin: "5px 0",
                                  fontSize: "0.9em",
                                  color: "#666",
                                }}
                              >
                                <strong>Updated:</strong>{" "}
                                {new Date(
                                  sfx.updatedAt.seconds * 1000,
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      {editingSfx !== sfx.id && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginLeft: "15px" }}>
                          <button
                            onClick={() => startEdit(sfx)}
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
                            onClick={() => handleSfxDelete(sfx.id)}
                            disabled={deletingSfx === sfx.id}
                            style={{
                              backgroundColor:
                                deletingSfx === sfx.id ? "#ccc" : "#dc3545",
                              color: "white",
                              padding: "8px 15px",
                              border: "none",
                              borderRadius: "4px",
                              cursor:
                                deletingSfx === sfx.id
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            {deletingSfx === sfx.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      )}
                    </div>
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
                No sound effects found. Add some using the form above!
              </div>
            )}

            {renderPaginationControls(
              sfxCurrentPage,
              sfxTotalPages,
              handleSfxPageChange,
              sfxIndexOfFirstItem,
              sfxIndexOfLastItem,
              sfxList.length,
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SFXEditor;
