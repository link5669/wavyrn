import renderPaginationControls from "./PaginationControls";
import { useState, useEffect } from "react";

const PortfolioEditor = () => {
  const [portfolioFormData, setPortfolioFormData] = useState({
    title: "",
    subtitle: "",
    imgSrc: "",
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
  });

  const fetchPortfolioList = async () => {
    setLoadingPortfolio(true);
    try {
      const response = await fetch("https://wavyrn-backend-k4sh6a558-mi-s-projects.vercel.app/api/portfolio");
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
      const response = await fetch("https://wavyrn-backend-k4sh6a558-mi-s-projects.vercel.app/api/portfolio", {
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
        setPortfolioFormData({ title: "", subtitle: "", imgSrc: "" });
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
      const response = await fetch(
        `https://wavyrn-backend-k4sh6a558-mi-s-projects.vercel.app/api/portfolio/${editingPortfolio}`,
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
        setPortfolioMessage("Portfolio image updated successfully!");
        setPortfolioMessageType("success");
        setEditingPortfolio(null);
        setEditFormData({ title: "", subtitle: "", imgSrc: "" });
        fetchPortfolioList();
      } else {
        setPortfolioMessage(data.error || "Failed to update portfolio image");
        setPortfolioMessageType("error");
      }
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
    });
  };

  const cancelEdit = () => {
    setEditingPortfolio(null);
    setEditFormData({ title: "", subtitle: "", imgSrc: "" });
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
        `https://wavyrn-backend-k4sh6a558-mi-s-projects.vercel.app/api/portfolio/${docId}`,
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
        "https://wavyrn-backend-k4sh6a558-mi-s-projects.vercel.app/api/portfolio/reorder",
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
            color:
              portfolioMessageType === "success" ? "#155724" : "#721c24",
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
                            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
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
                          <div style={{ display: "flex", gap: "10px" }}>
                            <button
                              type="submit"
                              disabled={portfolioLoading}
                              style={{
                                backgroundColor: portfolioLoading ? "#ccc" : "#28a745",
                                color: "white",
                                padding: "6px 12px",
                                border: "none",
                                borderRadius: "4px",
                                cursor: portfolioLoading ? "not-allowed" : "pointer",
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
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
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
                            onClick={() => handlePortfolioDelete(portfolio.docId)}
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
