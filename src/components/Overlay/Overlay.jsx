// components/Overlay.jsx
import { useEffect } from "react";
import { X_svg } from "../../utilities/svgs";
import { SocialLink } from "../SocialLinks";
import "./Overlay.css";
import { Link } from "react-router-dom";

const Overlay = ({ isVisible, onClose, children, profileInfo }) => {
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isVisible, onClose]);

    return (
        <div className={`overlay ${isVisible ? "visible" : ""}`}>
            <div className="overlay-content">
                <div className="overlay-header">
                    <div className="profile-section">
                        <img
                            src={profileInfo.image}
                            alt={profileInfo.name}
                            style={{ objectPosition: profileInfo.imagePosition || "" }}
                            className="overlay-profile-pic"
                        />
                        <div className="profile-info">
                            <h3>{profileInfo.name}</h3>
                            <p>{profileInfo.title}</p>
                            <div className="social-links-header">
                                {(profileInfo.socials || []).map((social, index) => (
                                    <div key={index}>
                                        <SocialLink {...social} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="overlay-divider" aria-hidden="true" />
                    <button className="close-button" onClick={onClose} aria-label="Close">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-x"
                            viewBox="0 0 16 16"
                        >
                            <X_svg />
                        </svg>
                    </button>
                </div>
                <div className="overlay-body">
                    <div className="scroll-content">
                        <div className="overlay-content-wrapper">
                            <div className="overlay-text-content">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overlay;
