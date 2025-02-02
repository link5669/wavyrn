// Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaEnvelope, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [hoveredButton, setHoveredButton] = useState(null);

  const getActiveClass = (path) => {
    const currentPath = location.pathname;
    if (hoveredButton === path) return "hovered";
    if (currentPath === path) return "active";
    return "";
  };

  const handleMailClick = () => {
    window.location.href = "mailto:contact@wavyrn.com";
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="icon-button" onClick={handleMailClick}>
          <FaEnvelope />
        </button>
        <span className="email-text">contact@wavyrn.com</span>
      </div>

      <div className="nav-center">
        <Link
          to="/about"
          className={`nav-item ${getActiveClass("/about")}`}
          onMouseEnter={() => setHoveredButton("/about")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          About
        </Link>
        <Link
          to="/portfolio"
          className={`nav-item ${getActiveClass("/portfolio")}`}
          onMouseEnter={() => setHoveredButton("/portfolio")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Portfolio
        </Link>

        <Link to="/about" className="logo-container">
          <img
            src="/images/no_text_white.png"
            alt="Wavyrn Logo"
            className="logo"
          />
        </Link>

        <Link
          to="/blog"
          className={`nav-item ${getActiveClass("/blog")}`}
          onMouseEnter={() => setHoveredButton("/blog")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Blog
        </Link>
        <Link
          to="/contact"
          className={`nav-item ${getActiveClass("/contact")}`}
          onMouseEnter={() => setHoveredButton("/contact")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Contact
        </Link>
      </div>

      <div className="nav-right">
        <a
          href="https://instagram.com/your-handle"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com/your-handle"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button"
        >
          <FaTwitter />
        </a>
        <a
          href="https://bsky.app/your-handle"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button"
        >
          <SiBluesky />
        </a>
        <a
          href="https://facebook.com/your-handle"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button"
        >
          <FaFacebook />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
