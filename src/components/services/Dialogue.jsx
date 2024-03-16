import "./Service.css";
import HRDiv from "../HRDiv";
import { Col, Row } from "react-bootstrap";


const Dialogue = ({ isMobile }) => {
  return (
    <>
      <h1 style={{ fontWeight: "bold" }}>
      {!isMobile &&  <em>Voice Acting</em>}
      </h1>
      <h5 style={{paddingInline: isMobile ? "2%" : "20%",
          textAlign: isMobile && "left",
          fontSize: isMobile && ".8em",}}>
        Choose your character: orcs, paladins, deuteragonists, and even space
        pirates caught in a tragic romance. We’ll find the right voice, produce
        the session, and deliver clean dialogue (elvish included).
      </h5>
      <HRDiv />
        <Row style={{
          paddingLeft: isMobile ? "0%" : "28%",
          paddingRight: isMobile ? "5%" : "25%",
          fontSize: isMobile && ".8em",
        }}>
          <Col>
            <ul style={{ listStyleType: "none" }}>
              <li>&#9633; Voice Acting</li>
              <li>&#9633; Session Coordination</li>
              <li>&#9633; Session Production</li>
            </ul>
          </Col>
          <Col>
            <ul style={{ listStyleType: "none" }}>
              <li>&#9633; Voice Effects & Design</li>
              <li>&#9633; Dialogue Writing</li>
              <li>&#9633; Specialty Languages</li>
            </ul>
          </Col>
        </Row>
    </>
  );
};

export default Dialogue;
