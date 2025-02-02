// components/Overlay.jsx
import { useEffect } from "react";
import { X_svg } from "../../utilities/svgs";
import "./Overlay.css";

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

  return (
    <div className={`overlay ${isVisible ? "visible" : ""}`}>
      <div className="overlay-content">
        <div className="overlay-header">
          <div className="profile-section">
            <img
              src={profileInfo.image}
              alt={profileInfo.name}
              className="overlay-profile-pic"
            />
            <div className="profile-info">
              <h3>{profileInfo.name}</h3>
              <p>{profileInfo.title}</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
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
          <div className="scroll-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
