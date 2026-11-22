import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./ProjectImage/ProjectImage.css";

const TOOLTIP_OFFSET = 16;

const ProjectImage = ({ imgSrc, title, subtitle, noImg, hoverText }) => {
    const [clicked, setClicked] = useState(false);
    const [cursor, setCursor] = useState(null);
    const hasHoverText = Boolean(hoverText && hoverText.trim());

    const handleMouseMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    const handleMouseLeave = () => setCursor(null);

    // Flip to the other side of the cursor near the right/bottom edge so the box stays on screen
    const tooltipStyle = cursor && {
        left: cursor.x + TOOLTIP_OFFSET,
        top: cursor.y + TOOLTIP_OFFSET,
        transform: `translate(${cursor.x > window.innerWidth * 0.65 ? `calc(-100% - ${TOOLTIP_OFFSET * 2}px)` : "0"}, ${cursor.y > window.innerHeight * 0.8 ? `calc(-100% - ${TOOLTIP_OFFSET * 2}px)` : "0"})`,
    };

    const overlayStyle2 = {
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: clicked ? "block" : "none",
        zIndex: 10000001,
    };

    return (
        <div
            className="project-image"
            onMouseMove={hasHoverText ? handleMouseMove : undefined}
            onMouseLeave={hasHoverText ? handleMouseLeave : undefined}
        >
            {!noImg && (
                <div className="project-image__fill-wrap">
                    <div className="project-image__fill">
                        <img className="project-image__fill-img" src={imgSrc} alt="" />
                    </div>
                </div>
            )}
            <div className="project-image__spacer" aria-hidden />
            <div className="project-image__img-wrap">
                <div className="project-image__img-wrap-inner">
                    {!noImg && (
                        <img
                            className="project-image__img"
                            src={imgSrc}
                            alt=""
                        />
                    )}
                </div>
            </div>
            {!noImg && clicked && <div style={overlayStyle2} aria-hidden />}
            <div className="project-image__overlay-panel">
                <div className="project-image__overlay-panel-left" aria-hidden />
                <div className="project-image__overlay-panel-right" aria-hidden />
                <div className="project-image__text">
                    <span className="project-image__title">{title}</span>
                    <span className="project-image__subtitle">{subtitle}</span>
                </div>
            </div>
            {hasHoverText && cursor &&
                createPortal(
                    <div className="project-image__tooltip" style={tooltipStyle} role="tooltip">
                        {hoverText}
                    </div>,
                    document.body,
                )}
        </div>
    );
};

export default ProjectImage;
