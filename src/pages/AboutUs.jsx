import WavNavbar from "../components/Navbar";
import ProfilePic from "../components/ProfilePic";
import { Container, Row, Col } from "react-bootstrap";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import {
  projectManagement,
  audioDirecting,
  production,
  soundDesign,
  music,
  dialogue,
  allUsers,
} from "../utilities/users";

const AboutUs = () => {
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 400,
    easing: "ease-in-out",
    disrespectUserMotionPreference: false,
  });
  const categoryStyle = {
    paddingRight: "1em",
    color: "red",
    textDecoration: "underline",
  };

  const [visibleUsers, setVisibleUsers] = useState(allUsers);

  return (
    <div style={{ minHeight: "100vh" }}>
      <WavNavbar />
      <div
        style={{
          backgroundImage: "url('../../assets/images/temp_background.png?url')",
          height: "10em",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: ".5em", marginTop: "1em" }}>
          Stuff we've made
        </h2>
        <p
          style={{
            paddingLeft: "10em",
            paddingRight: "10em",
            paddingBottom: "3em",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          malesuada facilisis tellus, aliquam molestie purus consequat nec.
          Fusce arcu sapien, fringilla eu arcu volutpat, consequat dignissim
          est.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p onClick={() => setVisibleUsers(allUsers)} style={categoryStyle}>
          All
        </p>
        <p
          onClick={() => setVisibleUsers(projectManagement)}
          style={categoryStyle}
        >
          Project Management
        </p>
        <p
          onClick={() => setVisibleUsers(audioDirecting)}
          style={categoryStyle}
        >
          Audio Directing
        </p>
        <p onClick={() => setVisibleUsers(production)} style={categoryStyle}>
          Production
        </p>
        <p onClick={() => setVisibleUsers(soundDesign)} style={categoryStyle}>
          Sound Design
        </p>
        <p onClick={() => setVisibleUsers(music)} style={categoryStyle}>
          Music
        </p>
        <p onClick={() => setVisibleUsers(dialogue)} style={categoryStyle}>
          Dialogue
        </p>
      </div>
      <Container
        style={{
          display: "flex",
          flexFlow: "row wrap",
          paddingLeft: "15%",
          paddingRight: "15%",
        }}
        ref={parent}
      >
        {visibleUsers.map((user) => {
          return (
            <ProfilePic key={user.name} name={user.name} title={user.title} />
          );
        })}
      </Container>
    </div>
  );
};

export default AboutUs;
