import { Col } from "react-bootstrap";
const ProfilePic = ({ name, title }) => {
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

  if (name == "spacer") {
    return (
      <Col style={{visibility: 'hidden'}}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={parentStyle}>
            <img src="https://via.placeholder.com/150" style={imgStyle} />
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
  } else {
    return (
      <Col style={{paddingBottom: '1%'}}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={parentStyle}>
            <img src="https://via.placeholder.com/150" style={imgStyle} />
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
  }
};

export default ProfilePic;
