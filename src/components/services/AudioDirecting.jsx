import { Col, Row } from "react-bootstrap";
import HRDiv from "../HRDiv";
import "./Service.css";
import { useRef, useEffect } from "react";

const AudioDirecting = ({ isMobile }) => {
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
            <li>&#9633; Audio Directing & Management</li>
            <li>&#9633; Music Coordination</li>
            <li>&#9633; Audio Cataloging</li>
            <li>&#9633; Session Engineering</li>
            <li>&#9633; Mixing, Mastering, & Editing</li>
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
            We're committed to bringing you the best audio production
            experience. We'll realize the audio process in its entirety for you,
            even the planners.
          </h5>
        </Col>
      </Row>
      {/* </p> */}
    </>
  );
};

export default AudioDirecting;
