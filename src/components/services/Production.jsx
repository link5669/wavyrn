import "./Service.css";
import HRDiv from "../HRDiv";
import { Col, Row } from "react-bootstrap";


const Production = ({ isMobile }) => {
  return (
    <>
      <h1 style={{ fontWeight: "bold" }}>
      {!isMobile &&  <em>Production</em>}
      </h1>
      <h5>
        You don’t have to worry about producing your sound any longer. We’re
        here to mix, master, and take your audio to the finish line, making it
        the best it can be.
      </h5>
      <HRDiv />
      <br />
        {" "}
        <Row style={{
          paddingLeft: isMobile ? "0%" : "28%",
          paddingRight: isMobile ? "5%" : "25%",
        }}>
          <Col>
            <ul style={{ listStyleType: "none" }}>
              <li>&#9633; Audio Production</li>
              <li>&#9633; Mixing & Mastering</li>
              <li>&#9633; Music Editing</li>
            </ul>
          </Col>
          <Col>
            <ul style={{ listStyleType: "none" }}>
              <li>&#9633; Synth Programming</li>
              <li>&#9633; Live Session Recording</li>
              <li>&#9633; Custom Plugin Solutions</li>
            </ul>
          </Col>
        </Row>
    </>
  );
};

export default Production;
