import { Col, Container, Row } from "react-bootstrap";
import WavNavbar from "../components/Navbar";

const Portfolio = () => {
  return (
    <>
      <WavNavbar />
      <div
        style={{
          backgroundImage: "url('../../assets/images/temp_background.png?url')",
          height: "8em",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: "0" }}>Stuff we've made</h2>
      </div>

      <p style={{ padding: "3em" }}>
        As a new full-service audio production studio, we are excited to share
        with you our shared portfolio, which includes works created by current
        team members from previous collaborative efforts.
      </p>
      <hr style={{ width: "33%", marginLeft: "33%" }} />
      <Container>
        <Row>
          <Col>
          <h2>Audio & SFX Reel</h2>
            <iframe
              height="100%"
              src="https://www.youtube.com/embed/ESmaQUJ9sgs?si=TL4DYM_9puOZJ_Pv"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </Col>
          <Col>
          <h2>Music Production Reel</h2>
            <iframe
              height="100%"
              src="https://www.youtube.com/embed/ESmaQUJ9sgs?si=TL4DYM_9puOZJ_Pv"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </Col>
          <Col>
          <h2>Voiceover Reel</h2>
            <iframe
              height="100%"
              src="https://www.youtube.com/embed/ESmaQUJ9sgs?si=TL4DYM_9puOZJ_Pv"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Portfolio;
