import { Col } from "react-bootstrap";
import "./ProfilePic.css";
const ProfilePic = ({ name, title, setSelectedUser  }) => {
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
    width: "10em",
    textAlign: "center",
  };
  const pfpImage =
    name == "Marc Yu"
      ? "url('../../assets/Team Profiles/Marc Yu/Marc Yu Profile Picture.jpg?url')"
      : name == "Austin Burkett"
      ? "url('../../assets/Team Profiles/Austin Burkett/Austin Burkett Profile Picture.png?url')"
      : name == "Austin Leshock"
      ? "url('../../assets/Team Profiles/Austin Leshock/Austin Leshock Profile Picture.jpg?url')"
      : name == "Max Jaime"
      ? "url('../../assets/Team Profiles/Max Jaime/Max Jaime Profile Picture.JPG?url')"
      : name == "Sam Leigh"
      ? "url('../../assets/Team Profiles/Sam Leigh/Sam Leigh Profile Picture.jpg?url')"
      : name == "Ananta Arora"
      ? "url('../../assets/Team Profiles/Ananta Arora/Ananta Arora Profile Picture.jpg?url')"
      : "https://via.placeholder.com/150";
      
  return (
    <Col style={{ paddingBottom: "1%", paddingTop: "2%", flexGrow: "0" }} >
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
