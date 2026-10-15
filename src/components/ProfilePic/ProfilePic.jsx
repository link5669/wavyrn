import "./ProfilePic.css";
import { useTranslation } from "../../hooks/useTranslation";
import { useState, useRef, useCallback } from "react";

// `hasBio` is false for profiles with nothing to show when clicked
const ProfilePic = ({ name, title, headshot, background, hasBio, onClick }) => {
  const { t } = useTranslation();
  const wrapperRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setParallax({ x: dx * 5, y: dy * 5 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  const handleClick = () => {
    if (hasBio) onClick();
  };

  const bgUrl = background;

  return (
    <div className="profile-pic-container">
      <div
        ref={wrapperRef}
        className={`profile-pic-wrapper ${hasBio ? "" : "profile-pic-wrapper--disabled"}`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-disabled={!hasBio}
      >
        <div
          className="profile-pic-backdrop"
          style={{
            backgroundImage: bgUrl ? `url(${bgUrl})` : "none",
            backgroundColor: bgUrl ? "transparent" : "#1a1510",
            transform: bgUrl ? `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px) scale(1.08)` : "none",
          }}
        />
        <div className="profile-pic-image-wrap">
          <img
            src={headshot || "https://via.placeholder.com/150"}
            alt={name}
            className="profile-pic-image"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              transform: `translate(${-parallax.x * 0.4}px, ${-parallax.y * 0.4}px)`,
              transformOrigin: "center center",
            }}
          />
        </div>
        {hasBio && (
          <div className="profile-pic-overlay">
            <span className="overlay-text">{t('common.learnMore')}...</span>
          </div>
        )}
      </div>
      <div className="profile-pic-info">
        <h4 className="profile-pic-name">{name}</h4>
        <p className="profile-pic-title">{title}</p>
      </div>
    </div>
  );
};

export default ProfilePic;
