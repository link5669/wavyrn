import { Col, Container, Row } from "react-bootstrap";
import "./Jobs.css";
import BoxCell from "./BoxCell";

const Jobs = ({ selected, setSelected }) => {
  return (
    <>
      <Container style={{ margin: "0px" }}>
        <Row style={{ height: "10em", width: "100vw", padding: 0 }}>
          <Col className="parent" style={{ padding: 0}} onClick={() => setSelected(0)}>
            <BoxCell
              selected={selected == 0 ? true : false}
              title="Audio Directing"
              subtitle="Project Management & Coordination"
              imageName="Services_AudioDirecting.jpg"
            />
          </Col>
          <Col className="parent" style={{ padding: 0}} onClick={() => setSelected(1)}>
            <BoxCell
              selected={selected == 1 ? true : false}
              title="Production"
              subtitle="Mixing, Mastering, & Music Editing"
              imageName="Services_Production.png"
            />
          </Col>
        </Row>
      </Container>
      <Container style={{ margin: "0px" }}>
        <Row style={{ height: "10em", width: "100vw" }}>
          <Col className="parent" style={{ padding: 0}} onClick={() => setSelected(2)}>
            <BoxCell
              selected={selected == 2 ? true : false}
              title="Sound Design"
              subtitle="Sound Effects, Ambiences, Foley, & Sonic Branding"
              imageName="Services_SoundDesign.jpg"
            />
          </Col>
          <Col className="parent" style={{ padding: 0}} onClick={() => setSelected(3)}>
            <BoxCell
              selected={selected == 3 ? true : false}
              title="Music"
              subtitle="Film, Games, Theme Parks, Trailers, & Interactive Media"
              imageName="Services_Music.png"
            />
          </Col>
          <Col className="parent" style={{ padding: 0}} onClick={() => setSelected(4)}>
            <BoxCell
              selected={selected == 4 ? true : false}
              title="Dialogue"
              subtitle="Writing, Casting, Editing & Voice Acting"
              imageName="Services_Dialogue.jpg"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Jobs;
