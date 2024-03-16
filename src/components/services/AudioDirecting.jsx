import { Col, Row } from "react-bootstrap";
import HRDiv from "../HRDiv";
import "./Service.css";

const AudioDirecting = ({ isMobile }) => {
  return (
    <>
      <h1 style={{ fontWeight: "bold" }}>
        {!isMobile && <em>Audio Directing</em>}
      </h1>
      <h5
        style={{
          paddingInline: isMobile ? "2%" : "20%",
          textAlign: isMobile && "left",
          fontSize: isMobile && ".8em",
        }}
      >
        At Wavyrn, we’re committed to bringing you the best audio production
        experience. We’ll produce, manage, and realize the audio process in its
        entirety for you, even the spreadsheets.
      </h5>
      <HRDiv />{" "}
      <Row
        style={{
          paddingLeft: isMobile ? "0%" : "28%",
          paddingRight: isMobile ? "5%" : "25%",
          fontSize: isMobile && ".8em",
        }}
      >
        <Col>
          <ul style={{ listStyleType: "none" }}>
            <li>&#9633; Audio Directing</li>
            <li>&#9633; Project Management</li>
            <li>&#9633; Music Coordination</li>
          </ul>
        </Col>
        <Col>
          <ul style={{ listStyleType: "none" }}>
            <li>&#9633; Audio Cataloging</li>
            <li>&#9633; Scheduling & Planning</li>
            <li>&#9633; Music Copying</li>
          </ul>
        </Col>
      </Row>
      {/* </p> */}
    </>
  );
};

export default AudioDirecting;
