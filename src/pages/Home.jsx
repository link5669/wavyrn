import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "./Home.css";
import { FaEnvelope, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";
import "../components/Navbar/Navbar.css";
import { IconContext } from "react-icons";

function App() {
    const [isAnimating, setIsAnimating] = useState(false);
    const [moveLogo, setMoveLogo] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const navigate = useNavigate();
    const [parent] = useAutoAnimate({ duration: 1500 });
    const [showNavItems, setShowNavItems] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 100); // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, []);

    const handleEnter = () => {
        setIsAnimating(true);

        setTimeout(() => {
            setMoveLogo(true);
        }, 200);

        setTimeout(() => {
            setShowNavItems(true);
            setFadeOut(true);
        }, 1600);

        setTimeout(() => {
            navigate("/portfolio");
        }, 3200);
    };

    useEffect(() => {
        if (isAnimating) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isAnimating]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden"; // This affects the html element

        return () => {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        };
    }, []);

    const handleMailClick = () => {
        window.location.href = "mailto:contact@wavyrn.com";
    };

    return (
        <div
            style={{
                overflow: "hidden",
                height: "100vh",
                width: "100%",
            }}
        >
            <div
                className={`navbar ${showNavItems ? "show-nav-items" : ""} ${fadeOut ? "fade-out" : ""}`}
            >
                <div className="nav-left">
                    <button className="icon-button" onClick={handleMailClick}>
                        <FaEnvelope />
                    </button>
                    <span className="email-text">contact@wavyrn.com</span>
                </div>
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
            </div>{" "}
            <div
                className={`home-container ${isAnimating ? "animating" : ""} ${fadeOut ? "fade-out" : ""}`}
            >
                <div className="content-wrapper-home" ref={parent}>
                    <div
                        className={`image-container ${moveLogo ? "move-logo" : ""}`}
                    >
                        <img
                            key={isAnimating ? "animating" : "not-animating"}
                            src="/images/no_text_white.png"
                            alt="Website Logo"
                            className={`logo-image `}
                        />
                    </div>
                    <img
                        src="/images/textlogo.png"
                        alt="Website Logo"
                        className={`logo-text ${isAnimating ? "fade-out-animation" : ""}`}
                    />
                    <button
                        onClick={handleEnter}
                        className={`enter-button ${isAnimating ? "fade-out-animation" : ""}`}
                        style={{ fontSize: "2em" }}
                    >
                        Enter →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
