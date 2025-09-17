import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";
import "./BottomSection.css";
import { useSwipeable } from "react-swipeable";
import { useTranslation } from "../../hooks/useTranslation";

function BottomSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const handlers = useSwipeable({
    onSwipedUp: () => toggleExpanded(),
    onSwipedDown: () => toggleExpanded(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      {...handlers}
      className={`bottom-section ${isExpanded ? "expanded" : ""}`}
    >
      <div className="handle" onClick={toggleExpanded}></div>
      <div className="connect-text">
        <div className="social-icons">
          <a
            href="https://www.instagram.com/wavyrnaudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/wavyrnaudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button"
          >
            <FaTwitter />
          </a>
          <a
            href="https://bsky.app/profile/wavyrnaudio.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button"
          >
            <SiBluesky />
          </a>
          <a
            href="https://www.facebook.com/WavyrnAudio"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button"
          >
            <FaFacebook />
          </a>
        </div>
      </div>
      {isExpanded && (
        <>
          {/* Email Address */}
          <div className="email-text">
            <a
              style={{ textDecoration: "none", color: "white" }}
              href="mailto:contact@wavyrn.com"
            >
              <i>contact@wavyrn.com</i>
            </a>
          </div>
          {/* Newsletter Button */}
          <button className="newsletter-button">
            <a
              style={{ textDecoration: "none", color: "white" }}
              href="http://eepurl.com/iR3Ccc"
            >
              <b>Join our Newsletter</b>
            </a>
          </button>
          <p>{t('footer.copyright')}</p>
        </>
      )}
    </div>
  );
}

export default BottomSection;
