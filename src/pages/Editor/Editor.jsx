import React, { useState, useEffect } from "react";
import WavNavbar from "../../components/Navbar/Navbar";
import SFXEditor from "./SFXEditor";
import PortfolioEditor from "./PortfolioEditor";
import AlbumEditor from "./CarouselEditor";

const Editor = () => {
  const [activeTab, setActiveTab] = useState("sfx"); // 'sfx' or 'portfolio'

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
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        {/* Tab Navigation */}
        <div style={{ marginBottom: "30px", borderBottom: "2px solid #eee" }}>
          <button
            onClick={() => setActiveTab("sfx")}
            style={{
              backgroundColor: activeTab === "sfx" ? "#007bff" : "transparent",
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
            Album Carousel
          </button>
        </div>

        {/* SFX Tab Content */}
        {activeTab === "sfx" && (
          <SFXEditor/>
        )}

        {/* Portfolio Tab Content */}
        {activeTab === "portfolio" && (
          <PortfolioEditor/>
        )}

        {activeTab === "carousel" && (
          <AlbumEditor/>
        )}
      </div>
    </div>
  );
};

export default Editor;
