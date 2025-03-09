import { Col } from "react-bootstrap";
import "./MobileProfilePic.css";
import { getPfpImage } from "../utilities/utilities.js";

const ProfilePic = ({ name, title, setSelectedUser, isMobile }) => {
    const parentStyle = {
        width: "6em",
        height: "9.89em",
        overflow: "hidden",
        border: "medium solid white",
    };

    const imgStyle = {
        width: "6em",
        height: "9.89em",
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
                flexGrow: "0",
                width: "6em",
                height: "9.89em",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div className="parent" style={parentStyle}>
                    <img
                        onClick={() => {
                            if (
                                name == "Josh Trochet" ||
                                name == "Miles Acquaviva"
                            )
                                return;
                            setSelectedUser({ name: name, title: title });
                        }}
                        src={getPfpImage(name)}
                        className="childPfp"
                        style={imgStyle}
                    />
                    {name !== "Josh Trochet" && name !== "Miles Acquaviva" && (
                        <div className="overlay-text">Learn more...</div>
                    )}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start", // Align items to the start (left)
                    textAlign: "left", // Ensure text is aligned to the left
                    fontSize: ".7em",
                    paddingTop: "10px",
                }}
            >
                <p style={{ margin: 0 }}>
                    <b>{name}</b>
                </p>
                <p style={{ margin: 0 }}>{title}</p>
            </div>
        </Col>
    );
};

export default ProfilePic;
