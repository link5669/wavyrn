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
import miles from "/Team Profiles/miles.png"
import zionna from "/Team Profiles/zionna.jpg"
import caleb from "/Team Profiles/caleb.jpg"
import julian from "/Team Profiles/julian.jpg"

const ProfilePic = ({ name, title, setSelectedUser, isMobile }) => {
  const parentStyle = {
    width: "5em",
    height: "5em",
    overflow: "hidden",
    borderRadius: "50%",
  };

  const imgStyle = {
    height: "auto",
    width: "6em",
  };

  const textStyle = {
    fontSize: isMobile ? "1em" : ".7em",
    marginBottom: "0",
    width: "10em",
    textAlign: "center",
    whiteSpace: "pre-wrap",
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
      : name == "Miles Acquaviva"
      ? miles
      : name == "Zionna Brown"
      ? zionna
      : name == "Caleb Skelly"
      ? caleb
      : name == "Julian Cabrera"
      ? julian
      : "https://via.placeholder.com/150";

  return (
    <Col
      style={{
        paddingBottom: "1%",
        paddingTop: "2%",
        flexGrow: "0",
        paddingInline: isMobile ? '5%' : '0%'
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="parent" style={parentStyle}>
          <img
            onClick={() => {
              if (
                name == "Josh Trochet" ||
                name == "Paul Edward May" ||
                name == "Miles Acquaviva"
              )
                return;
              setSelectedUser({ name: name, title: title });
            }}
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
          paddingTop: "2%",
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
