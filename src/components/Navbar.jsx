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
import { useEffect, useState } from "react";

const WavNavbar = () => {
  const [selected, setSelected] = useState(0);
  const [underlineAnimation, setUnderlineAnimation] = useState(false);
  const getButtonStyle = (val) => {
    return {
      marginRight: "15px",
      color: "#CE0036",
      fontSize: "1.3em",
      textDecoration: "none",
      background:
        selected == val
          ? `linear-gradient(currentColor, currentColor) bottom / 0 0.08em no-repeat`
          : "none",
      transition: "1s background-size",
      backgroundSize: underlineAnimation ? "100% 0.1em" : "0 0.1em",
      marginTop: "0px",
    };
  };

  useEffect(() => {
    setUnderlineAnimation(true);
    setTimeout(() => setUnderlineAnimation(false), 1000);
  }, [selected]);

  return (
    <div
      style={{
        width: "100vw",
        position: "sticky",
        top: "0px",
        zIndex: 1000000,
      }}
    >
      <div style={{ height: "30px", backgroundColor: "lightGray" }}>
        <Container
          fluid
          style={{ paddingTop: "1px", margin: "0", backgroundSize: "100%" }}
        >
          <Row>
            <Col
              style={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
              }}
              xs={12}
              md={8}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={21}
                fill="#CE0036"
                className="bi bi-envelope"
                viewBox="0 -.5 16 12"
                onClick={() =>
                  (window.location.href = "mailto:contact@wavyrn.com")
                }

              >
                <Mail_svg />
              </svg>
              <p
                style={{ paddingLeft: "10px", paddingBottom: '10px' }}
                onClick={() =>
                  (window.location.href = "mailto:contact@wavyrn.com")
                }
                
              >
                contact@wavyrn.com
              </p>
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
                    fill="#CE0036"
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
                    fill="#CE0036"
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
                    fill="#CE0036"
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
                    fill="#CE0036"
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
                    fill="#CE0036"
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "60px",
          backgroundColor: "white",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <img
            src="url('../../assets/images/logo.png?url')"
            style={{ maxHeight: "100%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Link
            to="/about-us"
            style={{ textDecoration: "none", paddingTop: "3%" }}
            onClick={() => setSelected(0)}
            className="underline-target"
          >
            <p style={getButtonStyle(0)}>About Us</p>
          </Link>
          <Link
            to="/services"
            style={{ textDecoration: "none", paddingTop: "3%" }}
            onClick={() => setSelected(1)}
            className="underline-target"
          >
            <p style={getButtonStyle(1)}>Services</p>
          </Link>
          <Link
            to="/portfolio"
            style={{ textDecoration: "none", paddingTop: "3%" }}
            onClick={() => setSelected(2)}
            className="underline-target"
          >
            <p style={getButtonStyle(2)}>Portfolio</p>
          </Link>
          <Link
            to="/contact"
            style={{ textDecoration: "none", paddingTop: "3%" }}
            onClick={() => setSelected(3)}
            className="underline-target"
          >
            <p style={getButtonStyle(3)}>Contact</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default WavNavbar;
