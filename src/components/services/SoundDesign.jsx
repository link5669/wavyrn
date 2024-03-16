import "./Service.css";
import HRDiv from "../HRDiv";
import { Col, Row } from "react-bootstrap";

const SoundDesign = ({ isMobile }) => {
  return (
    <>
      <h1 style={{ fontWeight: "bold" }}>
        {!isMobile && <em>Sound Design</em>}
      </h1>
      <h5 style={{paddingInline: isMobile ? "2%" : "20%",
          textAlign: isMobile && "left",
          fontSize: isMobile && ".8em",}}>
        Even the smaller footstep can describe the world around you. Whether
        it’s the perfect sonic logo, the cackle of a tavern fireplace, or a
        chime on your phone, every sound will be made immersive and
        unforgettable.
      </h5>
      <HRDiv />
      <Row
        style={{
          paddingLeft: isMobile ? "0%" : "28%",
          paddingRight: isMobile ? "5%" : "25%",
          fontSize: isMobile && ".8em",
        }}
      >
        <Col>
          <ul style={{ listStyleType: "none" }}>
            <li>&#9633; Sound Design</li>
            <li>&#9633; Sonic Branding</li>
            <li>&#9633; Hands-On Foley</li>
          </ul>
        </Col>
        <Col>
          <ul style={{ listStyleType: "none" }}>
            <li>&#9633; Ambiences</li>
            <li>&#9633; Implementation</li>
            <li>&#9633; Interactive Systems</li>
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default SoundDesign;
