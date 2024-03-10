import React, { useState } from "react";

const ProjectImage = ({ imgSrc, title, videoId }) => {
  const [opaque, setOpaque] = useState(false);
  const [clicked, setClicked] = useState(false);
  const containerStyle = {
    position: "relative",
    height: "8em",
    width: "6em",
    overflowX: "hidden",
  };

  const imgStyle = {
    height: "100%",
    width: "auto",
    display: "block",
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
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontSize: "1.2em",
    fontWeight: "bold",
    textAlign: "center",
    pointerEvents: "none", // Make the text unclickable
    opacity: opaque ? 1 : 0, // Initially transparent
    transition: "opacity 0.3s ease", // Smooth transition for opacity change
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setOpaque(true)}
      onMouseLeave={() => setOpaque(false)}
    >
      <img
        style={imgStyle}
        src={"/images/Portfolio - Project Pictures/" + imgSrc}
      />
      <div style={clicked ? overlayStyle2 : overlayStyle} />
      <div style={textStyle}>{title}</div>
    </div>
  );
};

export default ProjectImage;
