import { Col, Container, Row } from "react-bootstrap";
import HRDiv from "../components/HRDiv";
import WavMediaPlayer from "../components/MediaPlayer";

const Portfolio = ({ isMobile }) => {
  return (
    <>
      <div style={{ minHeight: "100vh" }}>
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
          <h2 style={{ marginBottom: "0", color: "white" }}>
            Stuff we've made
          </h2>
        </div>

        <p style={{ padding: "3em" }}>
          As a growing full-service audio production studio, we are excited to
          share with you our shared portfolio, which includes works created by
          current team members from previous collaborative efforts.
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
      <footer
        style={{
          backgroundColor: "black",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50px", // Adjust height as needed
        }}
      >
        <p style={{ color: "white", textAlign: "center", lineHeight: "50px" }}>
          ©️2024 .wavyrn • All Rights Reserved
        </p>
      </footer>
    </>
  );
};

export default Portfolio;
