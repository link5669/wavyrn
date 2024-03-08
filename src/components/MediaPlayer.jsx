import React, { useState } from "react";
import { X_svg } from "../utilities/svgs";

const WavMediaPlayer = ({ imgSrc, title, videoId }) => {
  const [opaque, setOpaque] = useState(false);
  const [clicked, setClicked] = useState(false);
  const containerStyle = {
    position: "relative",
    height: "8em",
    width: "6em",
    overflowX: 'hidden',
    
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

  const videoStyle = {
    width: "90vw",
    height: "90vh",
    zIndex: 10000002,
    display: clicked ? "block" : "none",
    visibility: clicked ? "visible" : "hidden",
  };

  const videoContainerStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10000002,
    display: clicked ? "block" : "none",
    visibility: clicked ? "visible" : "hidden",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setOpaque(true)}
      onMouseLeave={() => setOpaque(false)}
      onClick={() => {
        if (!clicked) setClicked(true);
      }}
    >
      <img
        style={imgStyle}
        src={"/images/Portfolio - Project Pictures/" + imgSrc}
      />
      <div style={clicked ? overlayStyle2 : overlayStyle} />
      <div style={textStyle}>{title}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="65"
        height="65"
        fill="white"
        className="bi bi-x"
        viewBox="0 0 45 45"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 10000004,
          visibility: clicked ? "visible" : "hidden",
          pointerEvents: "all",
        }}
        onClick={(event) => {
          event.stopPropagation();
          setClicked(false);
        }}
      >
        <X_svg
          onClick={(event) => {
            event.stopPropagation();
            setClicked(false);
          }}
        />
      </svg>
      <div style={videoContainerStyle}>
        <iframe
          style={videoStyle}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&fs=0&color=white`}
          title="YouTube video player"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default WavMediaPlayer;
