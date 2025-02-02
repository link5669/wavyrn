import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";
import "./Home.css";
import WavNavbar from "../components/Navbar";

function App() {
  const handleEnter = () => {
    // Your enter button logic
  };

  const handleMailClick = () => {
    window.location.href = "mailto:your-email@example.com";
  };

  return (
    <>
      <WavNavbar />

      <div className="home-container">
        <div className="content-wrapper">
          <div className="image-container">
            <img
              src="/images/no_text_white.png"
              alt="Website Logo"
              className="logo-image"
            />
          </div>
          <h1 className="logo-text">Wavyrn</h1>
          <button onClick={handleEnter} className="enter-button">
            Enter →
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
