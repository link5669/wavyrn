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
import { useLanguage } from "../../../contexts/LanguageContext";
import { useTranslation } from "../../../hooks/useTranslation";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const { language, changeLanguage } = useLanguage();
    const { t } = useTranslation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const languages = [
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "jp", name: "日本語", flag: "🇯🇵" },
    ];

    const handleLanguageSelect = (languageCode) => {
      changeLanguage(languageCode);
      setIsLanguageDropdownOpen(false);
    };

    const toggleLanguageDropdown = () => {
      setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    };

    const selectedLang = languages.find((lang) => lang.code === language);


    const handleMailClick = () => {
        window.location.href = "mailto:contact@wavyrn.com";
    };


    return (
        <div style={{ maxWidth: "100vw" }}>
          {/* Language Selector - Floating Top Right */}
          <div className="language-selector floating">
            <div className="language-trigger" onClick={toggleLanguageDropdown}>
              <span className="flag">{selectedLang?.flag}</span>
              <span className="language-code">
                {selectedLang?.code.toUpperCase()}
              </span>
              <span
                className={`dropdown-arrow ${isLanguageDropdownOpen ? "open" : ""}`}
              >
                ▼
              </span>
            </div>

            {isLanguageDropdownOpen && (
              <div className="language-dropdown">
                {languages.map((language) => (
                  <div
                    key={language.code}
                    className={`language-option ${selectedLanguage === language.code ? "selected" : ""}`}
                    onClick={() => handleLanguageSelect(language.code)}
                  >
                    <span className="flag">{language.flag}</span>
                    <span className="language-name">{language.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
            {/* Overlay for Greyed-out Background */}
            <div
                className={`overlay ${isMenuOpen ? "active" : ""}`}
                onClick={toggleMenu}
            ></div>

            {/* Navbar */}
            <div className="navbar">
                {/* Logo on the Left */}
                <div className="nav-logo">
                    <Link to="/portfolio" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                        <img
                            src="https://www.dl.dropboxusercontent.com/scl/fo/8tncy3sxsivuxhnu4f5ss/ADPj2yAPHytKhsgF_ePkxr0/Logo%20files/PNGs%20-%20SVGs/2x/Asset%203%402x-8.png?rlkey=30rz3mieb7fb53lp5n6jr8quz&e=1&dl=0"
                            alt="Logo"
                        />
                        <span style={{ 
                            color: "white", 
                            fontSize: "0.6em", 
                            marginLeft: "3px",
                            marginTop: "-2px",
                            verticalAlign: "top",
                            lineHeight: "1"
                        }}>™</span>
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
                    {t('nav.about')}
                </Link>
                <hr />
                <Link
                    to="/portfolio"
                    className="icon-button"
                    style={{ textDecoration: "none", fontSize: "1.3em" }}
                >
                    {t('nav.portfolio')}
                </Link>
                <hr />
                <Link
                    to="/blog"
                    className="icon-button"
                    style={{ textDecoration: "none", fontSize: "1.3em" }}
                >
                    {t('nav.blog')}
                </Link>
                <hr />
                <Link
                    to="/contact"
                    className="icon-button"
                    style={{ textDecoration: "none", fontSize: "1.3em" }}
                >
                    {t('nav.contact')}
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
