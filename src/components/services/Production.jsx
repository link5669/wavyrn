import "./Service.css";
import HRDiv from "../HRDiv";
import { Col, Row } from "react-bootstrap";
import { useEffect, useRef } from "react";

const Production = ({ isMobile }) => {
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
            <li>&#9633; Podcast & Long-Form Production</li>
            <li>&#9633; Vocal Production & Synthesis</li>
            <li>&#9633; MIDI & Synth Programming</li>
            <li>&#9633; Mixing, Mastering, & Editing</li>
            <li>&#9633; Custom Plugin Solutions</li>
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
            Tell us about your audio vision and we’ll find the right team to
            execute it. We’re here to mix, master, and take your audio to the
            finish line.
          </h5>
        </Col>
      </Row>
    </>
  );
};

export default Production;
