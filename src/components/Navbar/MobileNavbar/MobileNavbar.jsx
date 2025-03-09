import React, { useState } from "react";
import {
    FaInstagram,
    FaTwitter,
    FaFacebook,
    FaBars,
    FaTimes,
} from "react-icons/fa";
import { SiBluesky } from "react-icons/si";
import { IconContext } from "react-icons";
import "./MobileNavbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMailClick = () => {
        window.location.href = "mailto:contact@wavyrn.com";
    };

    return (
        <div style={{ maxWidth: "100vw" }}>
            {/* Overlay for Greyed-out Background */}
            <div
                className={`overlay ${isMenuOpen ? "active" : ""}`}
                onClick={toggleMenu}
            ></div>

            {/* Navbar */}
            <div className="navbar">
                {/* Logo on the Left */}
                <div className="nav-logo">
                    <Link to="/portfolio">
                        <img
                            src="https://www.dl.dropboxusercontent.com/scl/fo/8tncy3sxsivuxhnu4f5ss/ADPj2yAPHytKhsgF_ePkxr0/Logo%20files/PNGs%20-%20SVGs/2x/Asset%203%402x-8.png?rlkey=30rz3mieb7fb53lp5n6jr8quz&e=1&dl=0"
                            alt="Logo"
                        />
                    </Link>
                </div>

                {/* Hamburger Menu Icon */}
                <div className="hamburger-menu" onClick={toggleMenu}>
                    <FaBars size={24} color="white" />{" "}
                    {/* Always show hamburger icon */}
                </div>

                {/* Regular Navbar Links (Hidden on Mobile) */}
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
                            <FaInstagram />
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
                            <FaTwitter />
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
                            <SiBluesky />
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
                            <FaFacebook />
                        </IconContext.Provider>
                    </a>
                </div>
            </div>

            {/* Slide-out Menu */}
            <div className={`slide-out-menu ${isMenuOpen ? "open" : ""}`}>
                <button className="close-button" onClick={toggleMenu}>
                    <FaTimes size={24} color="white" />
                </button>

                <Link
                    to="/about"
                    className="icon-button"
                    style={{
                        textDecoration: "none",
                        fontSize: "1.3em",
                        paddingTop: "50%",
                    }}
                >
                    About
                </Link>
                <hr />
                <Link
                    to="/portfolio"
                    className="icon-button"
                    style={{ textDecoration: "none", fontSize: "1.3em" }}
                >
                    Portfolio
                </Link>
                <hr />
                <Link
                    to="/blog"
                    className="icon-button"
                    style={{ textDecoration: "none", fontSize: "1.3em" }}
                >
                    Blog
                </Link>
                <hr />
                <Link
                    to="/contact"
                    className="icon-button"
                    style={{ textDecoration: "none", fontSize: "1.3em" }}
                >
                    Contact
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
