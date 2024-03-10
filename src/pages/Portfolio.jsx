import { Col, Container, Row } from "react-bootstrap";
import HRDiv from "../components/HRDiv";
import ProjectImage from "../components/ProjectImage";
import WavMediaPlayer from "../components/WavMediaPlayer";

const Portfolio = ({ isMobile }) => {
  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <div
          style={{
            backgroundImage: "url('/images/Portfolio - Banner.JPG?url')",
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
        <div style={{ alignContent: "center" }}>
          <WavMediaPlayer
            imgSrc={"reel.png"}
            videoId={"Av5oRf88aso"}
            title={"Afterlife"}
          />
          {/* <iframe
            src={`https://www.youtube.com/embed/videoId?autoplay=1&rel=0&modestbranding=1&fs=0&color=white`}
            title="YouTube video player"
            allowFullScreen
          /> */}
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
            paddingLeft: "15%",
            paddingRight: "15%",
          }}
        >
          <ProjectImage
            imgSrc={"Afterlife - Short Film.png"}
            videoId={"Av5oRf88aso"}
            title={"Afterlife"}
          />
          <ProjectImage
            imgSrc={"AI Gotta Go - Video Game.png"}
            title={"AI Gotta Go"}
          />
          <ProjectImage
            imgSrc={"Alistair - Video Game.jpg"}
            title={"Alistair"}
          />
          <ProjectImage imgSrc={"Arcana - Video Game.jpg"} title={"Arcana"} />
          <ProjectImage
            imgSrc={"Boil Over - Video Game.jpg"}
            title={"Boil Over"}
          />
          <ProjectImage
            imgSrc={"Broadway Blues - Musical.png"}
            title={"Broadway Blues"}
          />
          <ProjectImage imgSrc={"Bugby - Video Game.png"} title={"Bugby"} />
          <ProjectImage
            imgSrc={"Ceiba Y Sus Raices Tainas - Short Film.png"}
            title={"Ceiba Y Sus Raíces Taínas"}
          />
          <ProjectImage
            imgSrc={"Fashion Digg - App.png"}
            title={"Fashion Digg"}
          />
          <ProjectImage
            imgSrc={"Glitch Witch - Video Game.png"}
            title={"Glitch Witch"}
          />
          <ProjectImage
            imgSrc={"Guildmaster's Guide to Capitalism.jpg"}
            title={"Guildmaster's Guide to Capitalism"}
          />
          <ProjectImage
            imgSrc={"Let's Make A Game - Video Game.png"}
            title={"Let's Make A Game"}
          />
          <ProjectImage imgSrc={"Only One - Album.png"} title={"Only One"} />
          <ProjectImage
            imgSrc={"Potion Pushas - Video Game.png"}
            title={"Potion Pushas"}
          />
          <ProjectImage
            imgSrc={"Professional Therapy - Short Film.png"}
            title={"Professional Therapy"}
          />
          <ProjectImage
            imgSrc={"Project Nautilus - Video Game.jpg"}
            title={"Project Nautilus"}
          />
          <ProjectImage
            imgSrc={"Reclaiming the Past - Video Game.png"}
            title={"Reclaiming the Past"}
          />
          <ProjectImage
            imgSrc={"Resurgence of the Storm - Video Game.png"}
            title={"Resurgence of the Storm"}
          />
          <ProjectImage imgSrc={"Scamper - Short Film.png"} title={"Scamper"} />
          <ProjectImage imgSrc={"Shiny - Video Game.jpg"} title={"Shiny"} />
          <ProjectImage
            imgSrc={"Skulls & Scrolls - Video Game.png"}
            title={"Skulls & Scrolls"}
          />
          <ProjectImage
            imgSrc={"Snow Girl (Guy) - Single.png"}
            title={"Snow Girl (Guy)"}
          />
          <ProjectImage
            imgSrc={"Space Shark - Video Game.jpg"}
            title={"Space Shark"}
          />
          <ProjectImage
            imgSrc={"Starweave - Video Game.png"}
            title={"Starweave"}
          />
          <ProjectImage
            imgSrc={"Cartomancy Anthology - Video Game.jpg"}
            title={"Cartomancy Anthology"}
          />
          <ProjectImage imgSrc={"String - Video Game.png"} title={"String"} />
          <ProjectImage
            imgSrc={"The Dream Factory - Short Film.jpg"}
            title={"The Dream Factory"}
          />
          <ProjectImage imgSrc={"The Metamorph.png"} title={"The Metamorph"} />
          <ProjectImage
            imgSrc={"The Pablo Mhanna Show - Podcast.png"}
            title={"The Pablo Mhanna Show"}
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
