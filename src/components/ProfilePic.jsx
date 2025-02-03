import { Col } from "react-bootstrap";
import "./ProfilePic.css";
import { getPfpImage } from "../utilities/utilities.js";

const ProfilePic = ({ name, title, setSelectedUser, isMobile }) => {
  const parentStyle = {
    width: "6em",
    height: "10em",
    overflow: "hidden",
    border: "medium solid white",
  };

  const imgStyle = {
    width: "6em",
    height: "10em",
    objectFit: "cover",
  };

  const textStyle = {
    fontSize: isMobile ? "1em" : ".7em",
    marginBottom: "0",
    width: "10em",
    textAlign: "center",
    whiteSpace: "pre-wrap",
  };

  return (
    <Col
      style={{
        paddingBottom: "1%",
        paddingTop: "2%",
        flexGrow: "0",
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
            src={getPfpImage(name)}
            className="childPfp"
            style={imgStyle}
          />
          {name !== "Josh Trochet" &&
            name !== "Paul Edward May" &&
            name !== "Miles Acquaviva" && (
              <div className="overlay-text">Learn more...</div>
            )}
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
