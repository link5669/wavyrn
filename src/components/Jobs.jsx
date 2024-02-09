import { Col, Container, Row } from "react-bootstrap";
import "./Jobs.css";
import BoxCell from "./BoxCell";

const Jobs = ({ selected }) => {
  return (
    <>
      <Container style={{margin: '0px'}}>
        <Row style={{ height: "10em", width: '100vw' }}>
          <Col className="parent" style={{ padding: "0" }}>
            <BoxCell
              selected={selected == 0 ? true : false}
              title="Audio Directing"
              subtitle="Project Management & Coordination"
            />
          </Col>
          <Col className="parent" style={{ padding: "0" }}>
            <BoxCell
              selected={selected == 1 ? true : false}
              title="Production"
              subtitle="Mixing, Mastering, & Music Editing"
            />
          </Col>
        </Row>
      </Container>
      <Container style={{margin: '0px'}}>
        <Row style={{ height: "10em", width: '100vw' }}>
          <Col className="parent" style={{ padding: "0" }}>
            <BoxCell
              selected={selected == 2 ? true : false}
              title="Sound Design"
              subtitle="Sound Effects, Ambiences, Foley, & Sonic Branding"
            />
          </Col>
          <Col className="parent" style={{ padding: "0" }}>
            <BoxCell
              selected={selected == 3 ? true : false}
              title="Music"
              subtitle="Film, Games, Theme Parks, Trailers, & Interactive Media"
            />
          </Col>
          <Col className="parent" style={{ padding: "0" }}>
            <BoxCell
              selected={selected == 4 ? true : false}
              title="Dialogue"
              subtitle="Writing, Casting, Editing & Voice Acting"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Jobs;
