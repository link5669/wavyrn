import { Col, Container, Row } from "react-bootstrap";
import WavNavbar from "../components/Navbar";
import HRDiv from "../components/HRDiv";
import WavMediaPlayer from "../components/MediaPlayer";

const Portfolio = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <WavNavbar />
      <div
        style={{
          backgroundImage:
            "url('../../assets/images/Portfolio - Banner.JPG?url')",
          backgroundSize: "100% auto",
          height: "8em",
          width: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: "0", color: "white" }}>Stuff we've made</h2>
      </div>

      <p style={{ padding: "3em" }}>
        As a new full-service audio production studio, we are excited to share
        with you our shared portfolio, which includes works created by current
        team members from previous collaborative efforts.
      </p>
      <HRDiv />
      <p style={{ textAlign: "center", fontSize: "1.2em" }}>
        <b>Wavyrn Demo Reel</b>
      </p>
      <iframe
        src={`https://www.youtube.com/embed/videoId?autoplay=1&rel=0&modestbranding=1&fs=0&color=white`}
        title="YouTube video player"
        allowFullScreen
      />
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          paddingLeft: "15%",
          paddingRight: "15%",
        }}
      >
        <WavMediaPlayer
          imgSrc={
            "url('../../assets/images/Portfolio - Project Pictures/Stalling - Short Film.png?url')"
          }
          videoId={"Av5oRf88aso"}
          title={"Stalling"}
        />
        <WavMediaPlayer
          imgSrc={
            "url('../../assets/images/Portfolio - Project Pictures/Stalling - Short Film.png?url')"
          }
          title={"Stalling"}
        />
        <WavMediaPlayer
          imgSrc={
            "url('../../assets/images/Portfolio - Project Pictures/Stalling - Short Film.png?url')"
          }
          title={"Stalling"}
        />
        <WavMediaPlayer
          imgSrc={
            "url('../../assets/images/Portfolio - Project Pictures/Stalling - Short Film.png?url')"
          }
          title={"Stalling"}
        />
        <WavMediaPlayer
          imgSrc={
            "url('../../assets/images/Portfolio - Project Pictures/Stalling - Short Film.png?url')"
          }
          title={"Stalling"}
        />
        <WavMediaPlayer
          imgSrc={
            "url('../../assets/images/Portfolio - Project Pictures/Stalling - Short Film.png?url')"
          }
          title={"Stalling"}
        />
        <WavMediaPlayer
          imgSrc={
            "url('../../assets/images/Portfolio - Project Pictures/Stalling - Short Film.png?url')"
          }
          title={"Stalling"}
        />
        <WavMediaPlayer
          imgSrc={
            "url('../../assets/images/Portfolio - Project Pictures/Stalling - Short Film.png?url')"
          }
          title={"Stalling"}
        />
      </div>
    </div>
  );
};

export default Portfolio;

// <Container>
//   <Row>
//     <Col>
//       <h2>Audio & SFX Reel</h2>
//       <iframe
//         height="100%"
//         src="https://www.youtube.com/embed/ESmaQUJ9sgs?si=TL4DYM_9puOZJ_Pv"
//         title="YouTube video player"
//         frameborder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         allowfullscreen
//       ></iframe>
//     </Col>
//     <Col>
//       <h2>Music Production Reel</h2>
//       <iframe
//         height="100%"
//         src="https://www.youtube.com/embed/ESmaQUJ9sgs?si=TL4DYM_9puOZJ_Pv"
//         title="YouTube video player"
//         frameborder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         allowfullscreen
//       ></iframe>
//     </Col>
//     <Col>
//       <h2>Voiceover Reel</h2>
//       <iframe
//         height="100%"
//         src="https://www.youtube.com/embed/ESmaQUJ9sgs?si=TL4DYM_9puOZJ_Pv"
//         title="YouTube video player"
//         frameborder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         allowfullscreen
//       ></iframe>
//     </Col>
//   </Row>
// </Container>
