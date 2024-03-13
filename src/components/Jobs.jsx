import { Col, Container, Row } from "react-bootstrap";
import "./Jobs.css";
import BoxCell from "./BoxCell";
import { useEffect, useState } from "react";

const Jobs = ({ selected, setSelected }) => {
  const [currUnderline, setCurrUnderline] = useState(0);
  useEffect(() => {
    setCurrUnderline(selected)
  }, [selected])
  const handleMouseOver = (index) => {
    console.log(index);
    setCurrUnderline(index);
  };

  return (
    <div onMouseOut={() => setCurrUnderline(selected)}>
      <Container style={{ margin: "0px" }}>
        <Row style={{ height: "10em", width: "100vw", padding: 0 }}>
          <Col
            className="parent"
            style={{ padding: 0 }}
            onClick={() => {
              setSelected(0);
            }}
          >
            <BoxCell
              onMouseOver={() => handleMouseOver(0)}
              isUnderlined={currUnderline == 0 ? true : false}
              selected={selected == 0 ? true : false}
              title="Audio Directing"
              subtitle="Project Management & Coordination"
              imageName="Services_AudioDirecting.jpg"
            />
          </Col>
          <Col
            className="parent"
            style={{ padding: 0 }}
            onClick={() => {
              setSelected(1);
            }}
          >
            <BoxCell
              onMouseOver={() => handleMouseOver(1)}
              isUnderlined={currUnderline == 1 ? true : false}
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
          <Col
            className="parent"
            style={{ padding: 0 }}
            onClick={() => {
              setSelected(2);
            }}
          >
            <BoxCell
              onMouseOver={() => handleMouseOver(2)}
              isUnderlined={currUnderline == 2 ? true : false}
              selected={selected == 2 ? true : false}
              title="Sound Design"
              subtitle="Sound Effects, Ambiences, Foley, & Sonic Branding"
              imageName="Services_SoundDesign.jpg"
            />
          </Col>
          <Col
            className="parent"
            style={{ padding: 0 }}
            onClick={() => {
              setSelected(3);
            }}
          >
            <BoxCell
              onMouseOver={() => handleMouseOver(3)}
              isUnderlined={currUnderline == 3 ? true : false}
              selected={selected == 3 ? true : false}
              title="Music"
              subtitle="Film, Games, Theme Parks, Trailers, & Interactive Media"
              imageName="Services_Music.png"
            />
          </Col>
          <Col
            className="parent"
            style={{ padding: 0 }}
            onClick={() => {
              setSelected(4);
            }}
          >
            <BoxCell
              onMouseOver={() => handleMouseOver(4)}
              isUnderlined={currUnderline == 4 ? true : false}
              selected={selected == 4 ? true : false}
              title="Dialogue"
              subtitle="Writing, Casting, Editing & Voice Acting"
              imageName="Services_Dialogue.jpg"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Jobs;
