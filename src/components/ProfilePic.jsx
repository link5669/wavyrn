import { Col } from "react-bootstrap";
import "./ProfilePic.css";
import marc from "/Team Profiles/Marc Yu/Marc Yu Profile Picture.jpg";
import austinb from "/Team Profiles/Austin Burkett/Austin Burkett Profile Picture.png";
import austinl from "/Team Profiles/Austin Leshock/Austin Leshock Profile Picture.jpg";
import max from "/Team Profiles/Max Jaime/Max Jaime Profile Picture.jpg";
import sam from "/Team Profiles/Sam Leigh/Sam Leigh Profile Picture.jpg";
import ananta from "/Team Profiles/Ananta Arora/Ananta Arora Profile Picture.jpg";
import angelica from "/Team Profiles/Angelica Ramos Profile Picture.jpg";
import gret from "/Team Profiles/Gret Price/Gret Price Profile Picture.jpg";
import paul from "/Team Profiles/IMG_0407.jpg";
import josh from "/Team Profiles/Josh Trochet Profile Pic.png";

const ProfilePic = ({ name, title, setSelectedUser }) => {
  const parentStyle = {
    width: "6em",
    height: "6em",
    overflow: "hidden",
    borderRadius: "50%",
  };

  const imgStyle = {
    height: "auto",
    width: "6em",
  };

  const textStyle = {
    marginBottom: "0",
    width: "8.5em",
    textAlign: "center",
  };
  const pfpImage =
    name == "Marc Yu"
      ? marc
      : name == "Austin Burkett"
      ? austinb
      : name == "Austin Leshock"
      ? austinl
      : name == "Max Jaime"
      ? max
      : name == "Sam Leigh"
      ? sam
      : name == "Ananta Arora"
      ? ananta
      : name == "Angelica Ramos"
      ? angelica
      : name == "Gret Price"
      ? gret
      : name == "Paul Edward May"
      ? paul
      : name == "Josh Trochet"
      ? josh
      : "https://via.placeholder.com/150";

  return (
    <Col style={{ paddingBottom: "1%", paddingTop: "2%", flexGrow: "0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="parent" style={parentStyle}>
          <img
            onClick={() => setSelectedUser({ name: name, title: title })}
            src={pfpImage}
            className="childPfp"
            style={imgStyle}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "10%",
        }}
      >
        <p style={textStyle}>
          <b>{name}</b>
        </p>
        <p style={textStyle}>{title}</p>
      </div>
    </Col>
  );
};

export default ProfilePic;
