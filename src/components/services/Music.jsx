import "./Service.css";
import HRDiv from "../HRDiv";
import { Col, Row } from "react-bootstrap";


const Music = ({ isMobile }) => {
  return (
    <>
      <h1 style={{fontWeight: 'bold'}}>{!isMobile && <em>Music</em>}</h1>
      <h5 style={{paddingInline: '20%'}}>
      We are storytellers, chronicling your vision and bringing it to life. From animated shorts to feature films, video games to theme parks, we’ll score the moment for you.
      </h5>
      <HRDiv />
        <Row style={{
          paddingLeft: isMobile ? "0%" : "28%",
          paddingRight: isMobile ? "2%" : "25%",
        }}>
          <Col>
          <ul style={{ listStyleType: "none" }}>
              <li>&#9633; Music Production</li>
              <li>&#9633; Orchestration</li>
              <li>&#9633; Arranging</li>
            </ul>
          </Col>
          <Col>
          <ul style={{ listStyleType: "none" }}>
              <li>&#9633; Interactive Audio</li>
              <li>&#9633; Non-Linear Media</li>
              <li>&#9633; Live Players</li>
            </ul>
          </Col>
        </Row>
    </>
  );
};

export default Music;
