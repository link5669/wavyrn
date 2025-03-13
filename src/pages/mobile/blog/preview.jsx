import { Link } from "react-router-dom";
import "./blog.css";
import { Col, Container, Row } from "react-bootstrap";

const Preview = ({ isMobile, title, author, date, tags, link }) => {
    return (
        <Link to={link} style={{ textDecoration: "none" }}>
            <div
                style={{
                    position: "relative", // Required for pseudo-element positioning
                    padding: "5vw",
                    backgroundColor: "rgba(0,0,0,.8)",
                    color: "white", // White text for contrast
                    width: isMobile ? "90%" : "40vw", // Responsive width
                    maxWidth: "600px", // Max width for larger screens
                    textAlign: "left", // Center align text
                    margin: "15px",
                    textDecoration: "none",
                }}
            >
                {/* Drop Shadow Box (Pseudo-Element) */}
                <div
                    style={{
                        position: "absolute",
                        top: "8px", // Slight offset below
                        left: "8px", // Slight offset to the right
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,.5)",
                        borderRadius: isMobile ? "0px" : "10px", // Match main box
                        zIndex: 0, // Place behind the main box
                        padding: "2vw",
                    }}
                />

                <h2
                    style={{
                        margin: "0 0 1rem 0",
                        fontSize: "1.2em",
                        textAlign: "left",
                        zIndex: 100,
                        position: "relative",
                    }}
                >
                    {title}
                </h2>

                <Row
                    style={{
                        justifyContent: "space-between", // Space between author and date
                        fontSize: "1em",
                        marginBottom: "1rem",
                        zIndex: 100,
                        position: "relative",
                    }}
                >
                    <Col style={{ textAlign: "left" }}>{author}</Col>
                    <Col style={{ textAlign: "right" }}>{date}</Col>
                </Row>

                {/* Tags */}

                {tags.map((tag, index) => (
                    <span key={index} style={{ padding: "0.3rem 0" }}>
                        <b>#{tag} </b>
                    </span>
                ))}
            </div>
            <hr
                style={{
                    border: "solid white 1px",
                    opacity: 1,
                    margin: "auto 10%",
                    marginTop: isMobile && "6vw",
                }}
            />
        </Link>
    );
};

export default Preview;
