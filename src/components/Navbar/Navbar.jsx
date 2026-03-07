// Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
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
        if (path === "/" && (currentPath === "/" || currentPath === "/jp")) return "active";
        if (path !== "/" && currentPath === path) return "active";
        return "";
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

    const navLinks = [
        { path: "/", labelKey: "nav.home" },
        { path: "/about", labelKey: "nav.about" },
        { path: "/portfolio", labelKey: "nav.portfolio" },
        { path: "/blog", labelKey: "nav.blog" },
        { path: "/contact", labelKey: "nav.contactUs" },
    ];

    return (
        <div style={{ position: "fixed", zIndex: 150, width: "100%", left: 0, right: 0 }}>
            <nav className="navbar">
                <div className="nav-left">
                    {navLinks.map(({ path, labelKey }) => (
                        <Link
                            key={path}
                            to={path}
                            className={`nav-item ${getActiveClass(path)}`}
                            onMouseEnter={() => setHoveredButton(path)}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            <span>{t(labelKey)}</span>
                        </Link>
                    ))}
                </div>
                {showLogo && (
                    <div className="nav-center">
                        <Link to="/" className="logo-container">
                            <img
                                src="/images/logo_red.png"
                                alt="Wavyrn"
                                className="logo"
                            />
                        </Link>
                    </div>
                )}
                <div className="nav-right">
                    <a
                        href="https://www.instagram.com/wavyrnaudio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button"
                        aria-label="Instagram"
                    >
                        <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "18px" }}>
                            <FaInstagram />
                        </IconContext.Provider>
                    </a>
                    <a
                        href="https://x.com/wavyrnaudio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button"
                        aria-label="Twitter"
                    >
                        <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "18px" }}>
                            <FaTwitter />
                        </IconContext.Provider>
                    </a>
                    <a
                        href="https://bsky.app/profile/wavyrnaudio.bsky.social"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button"
                        aria-label="Bluesky"
                    >
                        <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "18px" }}>
                            <SiBluesky />
                        </IconContext.Provider>
                    </a>
                    <a
                        href="https://www.facebook.com/WavyrnAudio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button"
                        aria-label="Facebook"
                    >
                        <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "18px" }}>
                            <FaFacebook />
                        </IconContext.Provider>
                    </a>
                    <a
                        href="https://www.linkedin.com/company/wavyrnaudio/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-button"
                        aria-label="LinkedIn"
                    >
                        <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "18px" }}>
                            <FaLinkedin />
                        </IconContext.Provider>
                    </a>

                    <div className="language-dropdown-container">
                        <div className="language-trigger" onClick={toggleLanguageDropdown}>
                            <span className="flag">{selectedLang?.flag}</span>
                            <span className="language-code">{selectedLang?.code.toUpperCase()}</span>
                            <span className={`dropdown-arrow ${isLanguageDropdownOpen ? "open" : ""}`}>▼</span>
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
