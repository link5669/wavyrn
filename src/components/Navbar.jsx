import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {
  Facebook_svg,
  Insta_svg,
  Mail_svg,
  Threads_svg,
  Twitter_svg,
} from "../utilities/svgs";

const WavNavbar = () => {
  return (
    <div style={{ width: "100vw", position: "sticky", top: "0px" }}>
      <div style={{ height: "40px", backgroundColor: "lightGray" }}>
        <Container fluid style={{ paddingTop: "5px", margin: "0" }}>
          <Row>
            <Col
              style={{ display: "flex", flexDirection: "row" }}
              xs={12}
              md={8}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="#CE0036"
                className="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <Mail_svg />
              </svg>
              <p style={{ paddingLeft: "10px" }}>contact@wavyrn.com</p>
            </Col>
            <Col xs={6} md={4}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "row-reverse",
                }}
              >
                <a href="https://www.instagram.com/MarcYuMusic/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                    style={{ color: "gray", marginLeft: "10px" }}
                  >
                    <Insta_svg />
                  </svg>
                </a>
                <a href="https://twitter.com/MarcYuMusic">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                    style={{ color: "gray", marginLeft: "10px" }}
                  >
                    <Twitter_svg />
                  </svg>
                </a>
                <a href="http://facebook.com/MarcYuMusic">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16"
                    style={{ color: "gray", marginLeft: "10px" }}
                  >
                    <Facebook_svg />
                  </svg>
                </a>
                <a href="http://threads.net/MarcYuMusic">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-threads"
                    viewBox="0 0 16 16"
                    style={{ color: "gray", marginLeft: "10px" }}
                  >
                    <Threads_svg />
                  </svg>
                </a>
                <a href="mailto:marcyu@marcyumusic.com">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-envelope"
                    viewBox="0 0 16 16"
                    style={{ color: "gray", marginLeft: "10px" }}
                  >
                    <Mail_svg />
                  </svg>
                </a>
                <br />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <image />
          <p>Wavyrn</p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to="/about-us">
            <p style={{ paddingRight: "10px" }}>About Us</p>
          </Link>
          <Link to="/services">
            <p style={{ paddingRight: "10px" }}>Services</p>
          </Link>
          <Link to="/portfolio">
            <p style={{ paddingRight: "10px" }}>Portfolio</p>
          </Link>
          <Link to="/contact">
            <p style={{ paddingRight: "30px" }}>Contact</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default WavNavbar;
