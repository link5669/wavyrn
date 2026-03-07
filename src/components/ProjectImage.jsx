import React, { useState } from "react";
import "./ProjectImage/ProjectImage.css";

const ProjectImage = ({ imgSrc, title, subtitle, noImg }) => {
    const [clicked, setClicked] = useState(false);

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
        <div className="project-image">
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
        </div>
    );
};

export default ProjectImage;
