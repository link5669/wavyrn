import "./Service.css";
import HRDiv from "../HRDiv";
import { Col, Row } from "react-bootstrap";
import { useRef, useEffect } from "react";

const SoundDesign = ({ isMobile }) => {
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const equalizeHeight = () => {
      if (leftColRef.current && rightColRef.current) {
        // Reset heights to auto to get natural heights
        leftColRef.current.style.height = "auto";
        rightColRef.current.style.height = "auto";

        // Get the natural heights
        const leftHeight = leftColRef.current.offsetHeight;
        const rightHeight = rightColRef.current.offsetHeight;

        // Set both columns to the larger height
        const maxHeight = Math.max(leftHeight, rightHeight);
        leftColRef.current.style.height = `${maxHeight}px`;
        rightColRef.current.style.height = `${maxHeight}px`;
      }
    };

    equalizeHeight();

    // Re-run on window resize
    window.addEventListener("resize", equalizeHeight);
    return () => window.removeEventListener("resize", equalizeHeight);
  }, []);
  return (
    <>
      <Row
        style={{
          paddingLeft: isMobile ? "0%" : "28%",
          paddingRight: isMobile ? "5%" : "25%",
          fontSize: isMobile && ".8em",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col ref={leftColRef} style={{ display: "flex", alignItems: "center" }}>
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
              lineHeight: "25px",
            }}
          >
            <li>&#9633; Sound Design & Foley</li>
            <li>&#9633; UI & Sonic Branding</li>
            <li>&#9633; One-Shots & Ambiences</li>
            <li>&#9633; Wwise, FMOD, & Unity</li>
            <li>&#9633; Post-Production & Cinematics</li>
          </ul>
        </Col>
        <Col
          ref={rightColRef}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h5
            style={{
              textAlign: "left",
              margin: 0,
            }}
          >
            Even the smallest footstep can describe your surroundings. Whether
            it’s a sonic logo or the cackle of a tavern fireplace, every sound
            is made unique.
          </h5>
        </Col>
      </Row>
    </>
  );
};

export default SoundDesign;
