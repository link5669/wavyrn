import React, { useState, useEffect } from "react";
import WavNavbar from "../../components/Navbar/Navbar";
import SFXEditor from "./SFXEditor";
import PortfolioEditor from "./PortfolioEditor";
import AlbumEditor from "./CarouselEditor";
import PasswordProtection from "../../components/EditorLogin";
import URLShortenerEditor from "../../components/URLShortener";

const Editor = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("sfx");

  useEffect(() => {
    console.log(import.meta.env.VITE_REACT_APP_BACKEND_URL)
    // Check if user is already authenticated
    const token = localStorage.getItem("authToken");
    if (token) {
      // Optionally verify token with backend
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/auth/verify-token`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("authToken");
      }
    } catch (err) {
      localStorage.removeItem("authToken");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "white",
      }}
    >
      <WavNavbar showLogo={true} />
      <div style={{ paddingTop: "70px" }} />
      {!isAuthenticated ? (
        <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />
      ) : (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ marginBottom: "30px", borderBottom: "2px solid #eee" }}>
            <button
              onClick={() => setActiveTab("sfx")}
              style={{
                backgroundColor:
                  activeTab === "sfx" ? "#007bff" : "transparent",
                color: activeTab === "sfx" ? "white" : "#007bff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px 4px 0 0",
                cursor: "pointer",
                marginRight: "10px",
                fontWeight: "bold",
              }}
            >
              Sound Effects
            </button>
            <button
              onClick={() => setActiveTab("portfolio")}
              style={{
                backgroundColor:
                  activeTab === "portfolio" ? "#007bff" : "transparent",
                color: activeTab === "portfolio" ? "white" : "#007bff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px 4px 0 0",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Portfolio Images
            </button>
            <button
              onClick={() => setActiveTab("carousel")}
              style={{
                backgroundColor:
                  activeTab === "carousel" ? "#007bff" : "transparent",
                color: activeTab === "carousel" ? "white" : "#007bff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px 4px 0 0",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Music Carousel
            </button>
            <button
              onClick={() => setActiveTab("url")}
              style={{
                backgroundColor:
                  activeTab === "url" ? "#007bff" : "transparent",
                color: activeTab === "url" ? "white" : "#007bff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px 4px 0 0",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              URL Shortener
            </button>
          </div>

          {activeTab === "sfx" && <SFXEditor />}

          {/* Portfolio Tab Content */}
          {activeTab === "portfolio" && <PortfolioEditor />}

          {activeTab === "carousel" && <AlbumEditor />}

          {activeTab === "url" && <URLShortenerEditor />}
        </div>
      )}
    </div>
  );
};

export default Editor;
