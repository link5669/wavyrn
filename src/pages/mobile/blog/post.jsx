import ReactPlayer from "react-player";
import WavNavbar from "../../../components/Navbar/MobileNavbar/MobileNavbar";
import BottomSection from "../../../components/BottomSection/BottomSection";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const Post = ({ isMobile, title, byline, image, content, author, date }) => {
    return (
        <>
            <WavNavbar showLogo={true} />
            <div
                style={{
                    float: "left",
                    backgroundColor: "#CE0036",
                    paddingBottom: "50px",
                }}
            >
                <div
                    style={{
                        margin: !isMobile && "7vh",
                        padding: isMobile ? "3%" : "2vw",
                        // backgroundColor: "white",
                        borderRadius: !isMobile && "30px",
                    }}
                >
                    <div
                        style={{
                            width: "100vw",
                            textAlign: "center",
                            color: "white",
                            padding: "3vw",
                        }}
                    >
                        <Link
                            to="/blog"
                            style={{ color: "white", textDecoration: "none" }}
                        >
                            <button
                                style={{
                                    backgroundColor: "#CE0036",
                                    border: "solid white",
                                }}
                            >
                                ← Return to Blogs
                            </button>
                        </Link>
                    </div>
                    <h2 style={{ textAlign: "left", color: "white" }}>
                        {title}
                    </h2>
                    <Row
                        style={{
                            justifyContent: "space-between", // Space between author and date
                            fontSize: "1em",
                            marginBottom: "1rem",
                            zIndex: 100,
                            position: "relative",
                            color: "white",
                        }}
                    >
                        <Col style={{ textAlign: "left" }}>{author}</Col>
                        <Col style={{ textAlign: "right" }}>{date}</Col>
                    </Row>
                    <img
                        style={{
                            paddingTop: "1vw",
                            paddingBottom: "1vw",
                            width: "40vw",
                        }}
                        src={image}
                    />
                    <p style={{ color: "white" }}>{content}</p>
                </div>
            </div>
            <BottomSection />
        </>
    );
};

export default Post;
