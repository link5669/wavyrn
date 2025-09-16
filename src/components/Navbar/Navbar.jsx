// Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaEnvelope, FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTranslation } from "../../hooks/useTranslation";

const Navbar = ({ showLogo }) => {
    const location = useLocation();
    const [hoveredButton, setHoveredButton] = useState(null);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const { language, changeLanguage } = useLanguage();
    const { t } = useTranslation();

    const getActiveClass = (path) => {
        const currentPath = location.pathname;
        if (hoveredButton === path) return "hovered";
        if (currentPath === path) return "active";
        return "";
    };

    const handleMailClick = () => {
        window.location.href = "mailto:contact@wavyrn.com";
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

    return (
        <div style={{ position: "fixed", zIndex: 150, width: "100%", left: 0, right: 0 }}>
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
                            <span style={{ color: "white" }}>{t('nav.about')}</span>
                        </Link>
                        <Link
                            to="/portfolio"
                            className={`nav-item ${getActiveClass("/portfolio")}`}
                            onMouseEnter={() => setHoveredButton("/portfolio")}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            <span style={{ color: "white" }}>{t('nav.portfolio')}</span>
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
                            <span style={{ color: "white" }}>{t('nav.blog')}</span>
                        </Link>
                        <Link
                            to="/contact"
                            className={`nav-item ${getActiveClass("/contact")}`}
                            onMouseEnter={() => setHoveredButton("/contact")}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            <span style={{ color: "white" }}>{t('nav.contact')}</span>
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
                                size: "18px",
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
                                size: "18px",
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
                                size: "18px",
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
                                size: "18px",
                            }}
                        >
                            <div>
                                <FaFacebook />
                            </div>
                        </IconContext.Provider>
                    </a>
                    <a
                        href="https://www.linkedin.com/company/wavyrn-audio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button"
                    >
                        <IconContext.Provider
                            value={{
                                color: "white",
                                className: "global-class-name",
                                size: "18px",
                            }}
                        >
                            <div>
                                <FaLinkedin />
                            </div>
                        </IconContext.Provider>
                    </a>
                    
                    {/* Language Dropdown */}
                    <div className="language-dropdown-container">
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
                                {languages.map((lang) => (
                                    <div
                                        key={lang.code}
                                        className={`language-option ${language === lang.code ? "selected" : ""}`}
                                        onClick={() => handleLanguageSelect(lang.code)}
                                    >
                                        <span className="flag">{lang.flag}</span>
                                        <span className="language-name">{lang.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
