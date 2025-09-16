import renderPaginationControls from "./PaginationControls";
import { useState, useEffect } from "react";

const PortfolioEditor = () => {
  const [portfolioFormData, setPortfolioFormData] = useState({
    title: "",
    subtitle: "",
    imgSrc: "",
    position: "",
  });
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [portfolioMessage, setPortfolioMessage] = useState("");
  const [portfolioMessageType, setPortfolioMessageType] = useState("");
  const [portfolioList, setPortfolioList] = useState([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);
  const [portfolioCurrentPage, setPortfolioCurrentPage] = useState(1);
  const [deletingPortfolio, setDeletingPortfolio] = useState(null);
  const [reorderingPortfolio, setReorderingPortfolio] = useState(null);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    subtitle: "",
    imgSrc: "",
    position: "",
  });
  const [moveToIndexValues, setMoveToIndexValues] = useState({});

  const fetchPortfolioList = async () => {
    setLoadingPortfolio(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/portfolio`);
      const data = await response.json();
      if (response.ok) {
        setPortfolioList(data.portfolioImages || []);
      } else {
        console.error("Failed to fetch portfolio images:", data.error);
      }
    } catch (error) {
      console.error("Error fetching portfolio images:", error);
    } finally {
      setLoadingPortfolio(false);
    }
  };

  useEffect(() => {
    fetchPortfolioList();
  }, []);

  const handlePortfolioInputChange = (e) => {
    const { name, value } = e.target;
    setPortfolioFormData((prev) => ({
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

  const handlePortfolioSubmit = async (e) => {
    e.preventDefault();
    setPortfolioLoading(true);
    setPortfolioMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioFormData),
      });

      const data = await response.json();

      if (response.ok) {
        setPortfolioMessage("Portfolio image added successfully!");
        setPortfolioMessageType("success");
        setPortfolioFormData({ title: "", subtitle: "", imgSrc: "", position: "" });
        fetchPortfolioList();
      } else {
        setPortfolioMessage(data.error || "Failed to add portfolio image");
        setPortfolioMessageType("error");
      }
    } catch (error) {
      setPortfolioMessage("Network error: " + error.message);
      setPortfolioMessageType("error");
    } finally {
      setPortfolioLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setPortfolioLoading(true);
    setPortfolioMessage("");

    try {
      // First, update the basic fields (title, subtitle, imgSrc)
      const updateResponse = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/portfolio/${editingPortfolio}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editFormData.title,
            subtitle: editFormData.subtitle,
            imgSrc: editFormData.imgSrc,
          }),
        },
      );

      const updateData = await updateResponse.json();

      if (!updateResponse.ok) {
        setPortfolioMessage(updateData.error || "Failed to update portfolio image");
        setPortfolioMessageType("error");
        return;
      }

      // If position changed, handle position update separately
      const currentItem = portfolioList.find(item => item.docId === editingPortfolio);
      if (currentItem && parseInt(editFormData.position) !== currentItem.id) {
        const positionResponse = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/portfolio/position`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              docId: editingPortfolio,
              position: parseInt(editFormData.position),
            }),
          },
        );

        const positionData = await positionResponse.json();

        if (!positionResponse.ok) {
          setPortfolioMessage(positionData.error || "Failed to update position");
          setPortfolioMessageType("error");
          return;
        }
      }

      setPortfolioMessage("Portfolio image updated successfully!");
      setPortfolioMessageType("success");
      setEditingPortfolio(null);
      setEditFormData({ title: "", subtitle: "", imgSrc: "", position: "" });
      fetchPortfolioList();
    } catch (error) {
      setPortfolioMessage("Network error: " + error.message);
      setPortfolioMessageType("error");
    } finally {
      setPortfolioLoading(false);
    }
  };

  const startEdit = (portfolio) => {
    setEditingPortfolio(portfolio.docId);
    setEditFormData({
      title: portfolio.title,
      subtitle: portfolio.subtitle,
      imgSrc: portfolio.imgSrc,
      position: portfolio.id,
    });
  };

  const cancelEdit = () => {
    setEditingPortfolio(null);
    setEditFormData({ title: "", subtitle: "", imgSrc: "", position: "" });
  };

  const handlePortfolioDelete = async (docId) => {
    if (
      !window.confirm("Are you sure you want to delete this portfolio image?")
    ) {
      return;
    }

    setDeletingPortfolio(docId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/portfolio/${docId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (response.ok) {
        setPortfolioMessage("Portfolio image deleted successfully!");
        setPortfolioMessageType("success");
        fetchPortfolioList();
      } else {
        setPortfolioMessage(data.error || "Failed to delete portfolio image");
        setPortfolioMessageType("error");
      }
    } catch (error) {
      setPortfolioMessage("Network error: " + error.message);
      setPortfolioMessageType("error");
    } finally {
      setDeletingPortfolio(null);
    }
  };

  const handlePortfolioReorder = async (docId, direction) => {
    setReorderingPortfolio(docId);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/portfolio/reorder`,
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
        setPortfolioMessageType("success");
        fetchPortfolioList();
      } else {
        setPortfolioMessage(data.error || "Failed to reorder portfolio images");
        setPortfolioMessageType("error");
      }
    } catch (error) {
      setPortfolioMessage("Network error: " + error.message);
      setPortfolioMessageType("error");
    } finally {
      setReorderingPortfolio(null);
    }
  };

  const handleMoveToIndex = async (docId, targetIndex) => {
    // Convert to number and validate
    const position = parseInt(targetIndex);
    
    console.log("Portfolio validation check:", { targetIndex, position, portfolioListLength: portfolioList.length });
    
    if (!targetIndex || targetIndex === "" || isNaN(position) || position < 1 || position > portfolioList.length) {
      setPortfolioMessage(`Please enter a valid position between 1 and ${portfolioList.length}`);
      setPortfolioMessageType("error");
      return;
    }

    setReorderingPortfolio(docId);

    try {
      const requestBody = { docId, position };
      console.log("Sending portfolio request:", requestBody);
      console.log("Backend URL:", import.meta.env.VITE_REACT_APP_BACKEND_URL);
      
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/portfolio/position`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      const data = await response.json();
      console.log("Portfolio response:", response.status, data);

      if (response.ok) {
        setPortfolioMessage(`Portfolio image moved to position ${position} successfully!`);
        setPortfolioMessageType("success");
        // Clear the input value for this portfolio image
        setMoveToIndexValues(prev => ({
          ...prev,
          [docId]: ""
        }));
        fetchPortfolioList();
      } else {
        setPortfolioMessage(data.error || `Failed to move portfolio image (${response.status})`);
        setPortfolioMessageType("error");
      }
    } catch (error) {
      console.error("Move portfolio to index error:", error);
      setPortfolioMessage("Network error: " + error.message);
      setPortfolioMessageType("error");
    } finally {
      setReorderingPortfolio(null);
    }
  };

  const handlePortfolioPageChange = (pageNumber) => {
    setPortfolioCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>Add Portfolio Image</h2>

      <form onSubmit={handlePortfolioSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="title"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={portfolioFormData.title}
            onChange={handlePortfolioInputChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter image title"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="subtitle"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Subtitle:
          </label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={portfolioFormData.subtitle}
            onChange={handlePortfolioInputChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter image subtitle"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="imgSrc"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Image URL:
          </label>
          <input
            type="url"
            id="imgSrc"
            name="imgSrc"
            value={portfolioFormData.imgSrc}
            onChange={handlePortfolioInputChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter image URL"
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
            value={portfolioFormData.position}
            onChange={handlePortfolioInputChange}
            min="1"
            max={portfolioList.length + 1}
            style={{
              width: "100%",
              padding: "8px",
              border: "2px solid #007bff",
              borderRadius: "4px",
              backgroundColor: "#f8f9fa",
            }}
            placeholder={`Enter position (1 to ${portfolioList.length + 1})`}
          />
          <small style={{ color: "#666", fontSize: "12px", display: "block", marginTop: "5px" }}>
            <strong>Current images:</strong> {portfolioList.length} | 
            <strong> Leave empty</strong> to add at the end | 
            <strong> Enter number</strong> to insert at that specific position
          </small>
        </div>

        <button
          type="submit"
          disabled={portfolioLoading}
          style={{
            backgroundColor: portfolioLoading ? "#ccc" : "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: portfolioLoading ? "not-allowed" : "pointer",
          }}
        >
          {portfolioLoading ? "Adding..." : "Add Portfolio Image"}
        </button>
      </form>

      {portfolioMessage && (
        <div
          style={{
            padding: "10px",
            borderRadius: "4px",
            backgroundColor:
              portfolioMessageType === "success" ? "#d4edda" : "#f8d7da",
            color: portfolioMessageType === "success" ? "#155724" : "#721c24",
            border:
              portfolioMessageType === "success"
                ? "1px solid #c3e6cb"
                : "1px solid #f5c6cb",
            marginBottom: "20px",
          }}
        >
          {portfolioMessage}
        </div>
      )}

      <div>
        <h3>Current Portfolio Images ({portfolioList.length} total)</h3>

        {loadingPortfolio ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Loading portfolio images...
          </div>
        ) : (
          <>
            {portfolioList.length > 0 ? (
              <div style={{ marginBottom: "20px" }}>
                {portfolioList.map((portfolio, index) => (
                  <div
                    key={portfolio.docId || index}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "15px",
                      marginBottom: "10px",
                      backgroundColor: "#f9f9f9",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    <img
                      src={portfolio.imgSrc}
                      alt={portfolio.title}
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
                      {editingPortfolio === portfolio.docId ? (
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
                            <label
                              style={{
                                display: "block",
                                marginBottom: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              Subtitle:
                            </label>
                            <input
                              type="text"
                              name="subtitle"
                              value={editFormData.subtitle}
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
                              Image URL:
                            </label>
                            <input
                              type="url"
                              name="imgSrc"
                              value={editFormData.imgSrc}
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
                              max={portfolioList.length}
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
                              disabled={portfolioLoading}
                              style={{
                                backgroundColor: portfolioLoading
                                  ? "#ccc"
                                  : "#28a745",
                                color: "white",
                                padding: "6px 12px",
                                border: "none",
                                borderRadius: "4px",
                                cursor: portfolioLoading
                                  ? "not-allowed"
                                  : "pointer",
                              }}
                            >
                              {portfolioLoading ? "Updating..." : "Save"}
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
                            #{portfolio.id} - {portfolio.title}
                          </h4>
                          <p style={{ margin: "5px 0", color: "#666" }}>
                            {portfolio.subtitle}
                          </p>
                          <p
                            style={{
                              margin: "5px 0",
                              fontSize: "0.9em",
                              wordBreak: "break-all",
                            }}
                          >
                            <strong>Image URL:</strong>
                            <a
                              href={portfolio.imgSrc}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ marginLeft: "5px", color: "#007bff" }}
                            >
                              {portfolio.imgSrc}
                            </a>
                          </p>
                          {portfolio.createdAt && (
                            <p
                              style={{
                                margin: "5px 0",
                                fontSize: "0.9em",
                                color: "#666",
                              }}
                            >
                              <strong>Added:</strong>{" "}
                              {new Date(
                                portfolio.createdAt.seconds * 1000,
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    {editingPortfolio !== portfolio.docId && (
                      <>
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
                              handlePortfolioReorder(portfolio.docId, "top")
                            }
                            disabled={
                              reorderingPortfolio === portfolio.docId ||
                              portfolio.id === 1
                            }
                            style={{
                              backgroundColor:
                                reorderingPortfolio === portfolio.docId ||
                                portfolio.id === 1
                                  ? "#ccc"
                                  : "#28a745",
                              color: "white",
                              padding: "4px 8px",
                              border: "none",
                              borderRadius: "3px",
                              cursor:
                                reorderingPortfolio === portfolio.docId ||
                                portfolio.id === 1
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
                              handlePortfolioReorder(portfolio.docId, "up")
                            }
                            disabled={
                              reorderingPortfolio === portfolio.docId ||
                              portfolio.id === 1
                            }
                            style={{
                              backgroundColor:
                                reorderingPortfolio === portfolio.docId ||
                                portfolio.id === 1
                                  ? "#ccc"
                                  : "#17a2b8",
                              color: "white",
                              padding: "4px 8px",
                              border: "none",
                              borderRadius: "3px",
                              cursor:
                                reorderingPortfolio === portfolio.docId ||
                                portfolio.id === 1
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
                              handlePortfolioReorder(portfolio.docId, "down")
                            }
                            disabled={
                              reorderingPortfolio === portfolio.docId ||
                              portfolio.id === portfolioList.length
                            }
                            style={{
                              backgroundColor:
                                reorderingPortfolio === portfolio.docId ||
                                portfolio.id === portfolioList.length
                                  ? "#ccc"
                                  : "#17a2b8",
                              color: "white",
                              padding: "4px 8px",
                              border: "none",
                              borderRadius: "3px",
                              cursor:
                                reorderingPortfolio === portfolio.docId ||
                                portfolio.id === portfolioList.length
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
                              handlePortfolioReorder(portfolio.docId, "bottom")
                            }
                            disabled={
                              reorderingPortfolio === portfolio.docId ||
                              portfolio.id === portfolioList.length
                            }
                            style={{
                              backgroundColor:
                                reorderingPortfolio === portfolio.docId ||
                                portfolio.id === portfolioList.length
                                  ? "#ccc"
                                  : "#28a745",
                              color: "white",
                              padding: "4px 8px",
                              border: "none",
                              borderRadius: "3px",
                              cursor:
                                reorderingPortfolio === portfolio.docId ||
                                portfolio.id === portfolioList.length
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
                                value={moveToIndexValues[portfolio.docId] || ""}
                                onChange={(e) => {
                                  setMoveToIndexValues(prev => ({
                                    ...prev,
                                    [portfolio.docId]: e.target.value
                                  }));
                                }}
                                min="1"
                                max={portfolioList.length}
                                placeholder={`1-${portfolioList.length}`}
                                style={{
                                  width: "60px",
                                  padding: "2px 4px",
                                  border: "1px solid #007bff",
                                  borderRadius: "3px",
                                  fontSize: "11px",
                                  textAlign: "center",
                                }}
                                title="Enter position to move this portfolio image to"
                              />
                              <button
                                onClick={() => {
                                  handleMoveToIndex(portfolio.docId, moveToIndexValues[portfolio.docId]);
                                }}
                                disabled={reorderingPortfolio === portfolio.docId || !moveToIndexValues[portfolio.docId] || moveToIndexValues[portfolio.docId] === ""}
                                style={{
                                  backgroundColor: reorderingPortfolio === portfolio.docId || !moveToIndexValues[portfolio.docId] || moveToIndexValues[portfolio.docId] === "" ? "#ccc" : "#007bff",
                                  color: "white",
                                  padding: "2px 4px",
                                  border: "none",
                                  borderRadius: "2px",
                                  cursor: reorderingPortfolio === portfolio.docId || !moveToIndexValues[portfolio.docId] || moveToIndexValues[portfolio.docId] === "" ? "not-allowed" : "pointer",
                                  fontSize: "10px",
                                }}
                                title="Move to this position"
                              >
                                Move
                              </button>
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
                          <button
                            onClick={() => startEdit(portfolio)}
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
                            onClick={() =>
                              handlePortfolioDelete(portfolio.docId)
                            }
                            disabled={deletingPortfolio === portfolio.docId}
                            style={{
                              backgroundColor:
                                deletingPortfolio === portfolio.docId
                                  ? "#ccc"
                                  : "#dc3545",
                              color: "white",
                              padding: "8px 15px",
                              border: "none",
                              borderRadius: "4px",
                              cursor:
                                deletingPortfolio === portfolio.docId
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            {deletingPortfolio === portfolio.docId
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </>
                    )}
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
                No portfolio images found. Add some using the form above!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioEditor;
