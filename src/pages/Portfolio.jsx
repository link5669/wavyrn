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
            width: "100vw",
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
            isMobile={isMobile}
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
            paddingLeft: isMobile ? "5% " : "15%",
            paddingRight: isMobile ? "5% " : "15%",
            paddingBottom: "2%",
          }}
        >
          <ProjectImage
            subtitle={"Short Film"}
            imgSrc={"Afterlife - Short Film.png"}
            title={"Afterlife"}
          />
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"AI Gotta Go - Video Game.png"}
            title={"AI Gotta Go"}
          />
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Alistair - Video Game.jpg"}
            title={"Alistair"}
          />
          <ProjectImage
            imgSrc={"Arcana - Video Game.jpg"}
            subtitle={"Video Game"}
            title={"Arcana"}
          />
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Boil Over - Video Game.jpg"}
            title={"Boil Over"}
          />
          <div style={{ flexBasis: "100%", height: 0 }}></div>
          <ProjectImage
            subtitle={"Musical"}
            imgSrc={"Broadway Blues - Musical.png"}
            title={"Broadway Blues"}
          />
          <ProjectImage
            subtitle={"Video Game"}
              imgSrc={"Bugby - Video Game.png"}
            title={"Bugby"}
          />
          <ProjectImage
            subtitle={"Short Film"}
            imgSrc={"Ceiba Y Sus Raices Tainas - Short Film.png"}
            title={"Ceiba Y Sus Raíces Taínas"}
          />
          <ProjectImage
            subtitle={"App"}
            imgSrc={"Fashion Digg - App.png"}
            title={"Fashion Digg"}
          />
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Glitch Witch - Video Game.png"}
            title={"Glitch Witch"}
          />
          <div style={{ flexBasis: "100%", height: 0 }}></div>
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Guildmaster's Guide to Capitalism.jpg"}
            title={"Guildmaster's Guide to Capitalism"}
          />
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Let's Make A Game - Video Game.png"}
            title={"Let's Make A Game"}
          />
          <ProjectImage
            subtitle={"Album"}
            imgSrc={"Only One - Album.png"}
            title={"Only One"}
          />
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Potion Pushas - Video Game.png"}
            title={"Potion Pushas"}
          />
          <ProjectImage
            subtitle={"Short Film"}
            imgSrc={"Professional Therapy - Short Film.png"}
            title={"Professional Therapy"}
          />
          <div style={{ flexBasis: "100%", height: 0 }}></div>
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Project Nautilus - Video Game.jpg"}
            title={"Project Nautilus"}
          />
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Reclaiming the Past - Video Game.png"}
            title={"Reclaiming the Past"}
          />
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Resurgence of the Storm - Video Game.png"}
            title={"Resurgence of the Storm"}
          />
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Scamper - Short Film.png"}
            title={"Scamper"}
          />
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Shiny - Video Game.jpg"}
            title={"Shiny"}
          />
          <div style={{ flexBasis: "100%", height: 0 }}></div>
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Skulls & Scrolls - Video Game.png"}
            title={"Skulls & Scrolls"}
          />
          <ProjectImage
            subtitle={"Single"}
            imgSrc={"Snow Girl (Guy) - Single.png"}
            title={"Snow Girl (Guy)"}
          />
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Space Shark - Video Game.jpg"}
            title={"Space Shark"}
          />
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Starweave - Video Game.png"}
            title={"Starweave"}
          />
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"Cartomancy Anthology - Video Game.jpg"}
            title={"Cartomancy Anthology"}
          />
          <div style={{ flexBasis: "100%", height: 0 }}></div>
          <ProjectImage
            subtitle={"Video Game"}
            imgSrc={"String - Video Game.png"}
            title={"String"}
          />
          <ProjectImage
            subtitle={"Short Film"}
            imgSrc={"The Dream Factory - Short Film.jpg"}
            title={"The Dream Factory"}
          />
          <ProjectImage
            imgSrc={"The Metamorph.png"}
            subtitle={"Video Game"}
            title={"The Metamorph"}
          />
          <ProjectImage
            subtitle={"Podcast"}
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
