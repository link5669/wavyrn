// Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaEnvelope, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";
import "./Navbar.css";
import { IconContext } from "react-icons";

const Navbar = ({ showLogo }) => {
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
        <div style={{ position: "fixed", zIndex: 150 }}>
            <nav className={`navbar`}>
                {" "}
                <div className="nav-left">
                    <button className="icon-button" onClick={handleMailClick}>
                        <FaEnvelope />
                    </button>
                    <span className="email-text">contact@wavyrn.com</span>
                </div>
                {showLogo && (
                    <div className="nav-center">
                        <Link
                            to="/about"
                            className={`nav-item ${getActiveClass("/about")}`}
                            onMouseEnter={() => setHoveredButton("/about")}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            <span style={{ color: "white" }}>About</span>
                        </Link>
                        <Link
                            to="/portfolio"
                            className={`nav-item ${getActiveClass("/portfolio")}`}
                            onMouseEnter={() => setHoveredButton("/portfolio")}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            <span style={{ color: "white" }}>Portfolio</span>
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
                            <span style={{ color: "white" }}> Blog</span>
                        </Link>
                        <Link
                            to="/contact"
                            className={`nav-item ${getActiveClass("/contact")}`}
                            onMouseEnter={() => setHoveredButton("/contact")}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            <span style={{ color: "white" }}>Contact</span>
                        </Link>
                    </div>
                )}
                <div className="nav-right">
                    <a
                        href="https://www.instagram.com/wavyrnaudio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button"
                    >
                        <IconContext.Provider
                            value={{
                                color: "white",
                                className: "global-class-name",
                            }}
                        >
                            <div>
                                <FaInstagram />
                            </div>
                        </IconContext.Provider>
                    </a>
                    <a
                        href="https://x.com/wavyrnaudio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button"
                    >
                        <IconContext.Provider
                            value={{
                                color: "white",
                                className: "global-class-name",
                            }}
                        >
                            <div>
                                <FaTwitter />
                            </div>
                        </IconContext.Provider>
                    </a>
                    <a
                        href="https://bsky.app/profile/wavyrnaudio.bsky.social"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button"
                    >
                        <IconContext.Provider
                            value={{
                                color: "white",
                                className: "global-class-name",
                            }}
                        >
                            <div>
                                <SiBluesky />
                            </div>
                        </IconContext.Provider>
                    </a>
                    <a
                        href="https://www.facebook.com/WavyrnAudio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button"
                    >
                        <IconContext.Provider
                            value={{
                                color: "white",
                                className: "global-class-name",
                            }}
                        >
                            <div>
                                <FaFacebook />
                            </div>
                        </IconContext.Provider>
                    </a>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
