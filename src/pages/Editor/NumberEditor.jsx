import { useState, useEffect } from "react";

const NumberEditor = () => {
  const [activeSection, setActiveSection] = useState("portfolio");
  const [portfolioList, setPortfolioList] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [movingItem, setMovingItem] = useState(null);

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

  useEffect(() => {
    if (activeSection === "portfolio") {
      fetchPortfolioList();
    } else {
      fetchAlbumList();
    }
  }, [activeSection]);

  const handlePositionChange = async (docId, newPosition, section) => {
    setMovingItem(docId);
    setMessage("");

    try {
      const endpoint = section === "portfolio" 
        ? `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/portfolio/position`
        : `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/albums/position`;

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ docId, position: newPosition }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Position updated successfully!");
        setMessageType("success");
        // Refresh the list
        if (section === "portfolio") {
          fetchPortfolioList();
        } else {
          fetchAlbumList();
        }
      } else {
        setMessage(data.error || "Failed to update position");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
      setMessageType("error");
    } finally {
      setMovingItem(null);
    }
  };

  const renderItemList = (items, section) => {
    if (items.length === 0) {
      return (
        <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
          No {section === "portfolio" ? "portfolio images" : "albums"} found.
        </div>
      );
    }

    return (
      <div style={{ marginBottom: "20px" }}>
        {items.map((item, index) => (
          <div
            key={item.docId || index}
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
            <div style={{ minWidth: "60px", textAlign: "center" }}>
              <div style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
                #{item.id}
              </div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                Current
              </div>
            </div>

            {section === "portfolio" ? (
              <img
                src={item.imgSrc}
                alt={item.title}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <img
                src={item.coverUrl}
                alt={item.title}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 5px 0", color: "#333" }}>
                {item.title}
              </h4>
              <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
                {section === "portfolio" ? item.subtitle : item.track}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label style={{ fontSize: "14px", color: "#666" }}>
                Move to position:
              </label>
              <select
                value=""
                onChange={(e) => {
                  const newPosition = parseInt(e.target.value);
                  if (newPosition && newPosition !== item.id) {
                    handlePositionChange(item.docId, newPosition, section);
                  }
                }}
                disabled={movingItem === item.docId}
                style={{
                  padding: "5px 10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: movingItem === item.docId ? "#f5f5f5" : "white",
                }}
              >
                <option value="">Select position</option>
                {Array.from({ length: items.length }, (_, i) => i + 1).map((pos) => (
                  <option key={pos} value={pos} disabled={pos === item.id}>
                    {pos === item.id ? `${pos} (current)` : pos}
                  </option>
                ))}
              </select>
              {movingItem === item.docId && (
                <span style={{ fontSize: "12px", color: "#666" }}>
                  Moving...
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>Number Editor</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Change the position of portfolio images and music albums by selecting a new position from the dropdown.
      </p>

      {/* Section Tabs */}
      <div style={{ marginBottom: "30px", borderBottom: "2px solid #eee" }}>
        <button
          onClick={() => setActiveSection("portfolio")}
          style={{
            backgroundColor: activeSection === "portfolio" ? "#007bff" : "transparent",
            color: activeSection === "portfolio" ? "white" : "#007bff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px 4px 0 0",
            cursor: "pointer",
            marginRight: "10px",
            fontWeight: "bold",
          }}
        >
          Portfolio Images
        </button>
        <button
          onClick={() => setActiveSection("albums")}
          style={{
            backgroundColor: activeSection === "albums" ? "#007bff" : "transparent",
            color: activeSection === "albums" ? "white" : "#007bff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px 4px 0 0",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Music Albums
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <div
          style={{
            padding: "10px",
            borderRadius: "4px",
            backgroundColor: messageType === "success" ? "#d4edda" : "#f8d7da",
            color: messageType === "success" ? "#155724" : "#721c24",
            border: messageType === "success" ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
            marginBottom: "20px",
          }}
        >
          {message}
        </div>
      )}

      {/* Content */}
      <div>
        <h3>
          {activeSection === "portfolio" ? "Portfolio Images" : "Music Albums"} 
          ({activeSection === "portfolio" ? portfolioList.length : albumList.length} total)
        </h3>

        {activeSection === "portfolio" ? (
          loadingPortfolio ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              Loading portfolio images...
            </div>
          ) : (
            renderItemList(portfolioList, "portfolio")
          )
        ) : (
          loadingAlbums ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              Loading albums...
            </div>
          ) : (
            renderItemList(albumList, "albums")
          )
        )}
      </div>
    </div>
  );
};

export default NumberEditor;


