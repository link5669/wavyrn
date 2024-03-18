import React, { useState } from "react";
import { X_svg } from "../utilities/svgs";
import ReactPlayer from "react-player";

const WavMediaPlayer = ({ imgSrc, title, videoId, isMobile }) => {
  const [opaque, setOpaque] = useState(false);
  const [clicked, setClicked] = useState(false);
  const containerStyle = {
    position: "relative",
    width: "auto",
    height: isMobile ? "20vh" : "30vh",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    paddingBottom: "2%",
    overflowX: "hidden",
  };

  const overlayStyle = {};
  const imgStyle = {
    height: "100%",
    width: "auto",
    display: "block",
    filter: opaque ? "brightness(50%)" : "none",
    transition: "filter 0.3s ease",
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
      onClick={() => {
        if (!clicked) setClicked(true);
      }}
    >
      <img
        style={imgStyle}
        onMouseEnter={() => setOpaque(true)}
        onMouseLeave={() => setOpaque(false)}
        src={"/images/" + imgSrc}
      />
      <div
        style={clicked ? overlayStyle2 : overlayStyle}
        onClick={() => setClicked(false)}
      />
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
        <ReactPlayer
          playing={false}
          controls={true}
          url={"https://www.dropbox.com/scl/fi/nkg2sjoyhmibyswvkxzl5/Wavyrn-Demo-Reel-2024-v1.0-hevc.mov?rlkey=ur3knlg1x1o5njkb2c41wxhis&dl=1"}
        />

        {/* <iframe
          style={videoStyle}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&fs=0&color=white`}
          title="YouTube video player"
          allowFullScreen
        /> */}
      </div>
    </div>
  );
};

export default WavMediaPlayer;
