import React, { useState } from "react";

const ProjectImage = ({ imgSrc, title, subtitle, noImg }) => {
    const [opaque, setOpaque] = useState(false);
    const [clicked, setClicked] = useState(false);

    const [scale, setScale] = useState(100);
    const [underlineAnimation, setUnderlineAnimation] = useState(false);

    const handleMouseOver = () => {
        setScale(120);
        setUnderlineAnimation(true);
        onMouseOver();
    };

    const handleMouseOut = () => {
        setScale(100);
        setUnderlineAnimation(false);
    };
    const containerStyle = {
        position: "relative",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        margin: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px", // Match portfolio-item border radius
        clipPath: "inset(0 round 12px)", // Ensure rounded corners are maintained
    };

    const imgStyle = {
        height: "100%",
        width: "100%", // Changed from "auto" to fill container
        display: "block",
        objectFit: "cover",
        transform: `scale(${scale / 100})`,
        transition: "transform 0.3s ease",
        borderRadius: "12px", // Match container border radius
    };

    const overlayStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent gray color
        opacity: opaque ? 1 : 0, // Initially transparent
        transition: "opacity 0.3s ease", // Smooth transition for opacity change
    };

    const overlayStyle2 = {
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent gray color
        display: clicked ? "block" : "none",
        zIndex: 10000001,
    };

    const textStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        transform: "translate(-50%, -50%)",
        color: "#fff",
        fontSize: ".8em",
        fontWeight: "bold",
        textAlign: "center",
        pointerEvents: "none", // Make the text unclickable
        opacity: opaque ? 1 : 0, // Initially transparent
        transition: "opacity 0.3s ease", // Smooth transition for opacity change
    };

    const textStyle2 = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#fff",
        fontSize: ".8em",
        textAlign: "center",
        pointerEvents: "none", // Make the text unclickable
        opacity: opaque ? 1 : 0, // Initially transparent
        transition: "opacity 0.3s ease", // Smooth transition for opacity change
    };

    return (
        <div
            style={containerStyle}
            onMouseEnter={() => {
                setOpaque(true);
                setScale(120); // 20% zoom
            }}
            onMouseLeave={() => {
                setOpaque(false);
                setScale(100); // Return to normal size
            }}
        >
            {!noImg && <img style={imgStyle} src={imgSrc} />}

            {!noImg && <div style={clicked ? overlayStyle2 : overlayStyle} />}
            <div style={textStyle}>
                {title} <div style={{ fontWeight: "initial" }}>{subtitle}</div>
            </div>
        </div>
    );
};

export default ProjectImage;
