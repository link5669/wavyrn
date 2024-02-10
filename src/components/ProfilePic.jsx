import { Col } from "react-bootstrap";
import "./ProfilePic.css";
const ProfilePic = ({ name, title, setSelectedUser }) => {
  const parentStyle = {
    width: "6em",
    height: "6em",
    overflow: "hidden",
    borderRadius: "50%",
  };

  const imgStyle = {
    height: "6em",
    width: "6em",
  };

  const textStyle = {
    marginBottom: "0",
    width: "10em",
    textAlign: "center",
  };
  return (
    <Col style={{ paddingBottom: "1%" }}>
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
            src="https://via.placeholder.com/150"
            className="child"
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
