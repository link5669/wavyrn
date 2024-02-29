import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  Facebook_svg,
  Insta_svg,
  Mail_svg,
  Threads_svg,
  Twitter_svg,
} from "../utilities/svgs";
import { useEffect, useRef, useState } from "react";

const WavNavbar = () => {
  const [selected, setSelected] = useState(0);
  const [lastSelected, setLastSelected] = useState(-1);
  const [underlineAnimation, setUnderlineAnimation] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 400,
    easing: "ease-in-out",
    disrespectUserMotionPreference: false,
  });

  const aboutUs = useRef(null);
  const services = useRef(null);
  const portfolio = useRef(null);
  const contact = useRef(null);
  const underlineDiv = useRef(null);

  useEffect(() => {
    if (aboutUs == null) return;
    rearrangeChildren(selected);
  }, [selected]);

  const rearrangeChildren = (index) => {
    let parentRef = underlineDiv.current.children[0];

    console.log(parentRef, index);
    if (!parentRef || index < 0 || index > 3) return;

    const children = [...parentRef.children];

    const underlineElement = children.find(
      (child) => child.style.backgroundColor === "black"
    );

    if (underlineElement) {
      children.splice(
        index,
        0,
        children.splice(children.indexOf(underlineElement), 1)[0]
      );
      parentRef.replaceChildren(...children);
    }
  };

  const getButtonStyle = (val) => {
    return {
      paddingRight: "10px",
      paddingLeft: "10px",
      color: "#CE0036",
      fontSize: "1.3em",
      paddingBottom: "0",
      textDecoration: "none",
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
                style={{ paddingLeft: "10px", paddingBottom: "10px" }}
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
        <div style={{ display: "grid" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            ref={parent}
          >
            <Link
              ref={aboutUs}
              to="/about-us"
              style={{ textDecoration: "none", paddingTop: "3%" }}
              onClick={() => {
                setLastSelected(selected);
                setSelected(0);
              }}
              onMouseEnter={() => {
                setLastSelected(selected);
                setSelected(0);
              }}
              className="underline-target"
            >
              <p style={getButtonStyle(0)}>About Us</p>
            </Link>
            <Link
              ref={services}
              to="/services"
              style={{ textDecoration: "none", paddingTop: "3%" }}
              onClick={() => {
                setLastSelected(selected);
                setSelected(1);
              }}
              onMouseEnter={() => {
                setLastSelected(selected);
                setSelected(1);
              }}
              className="underline-target"
            >
              <p style={getButtonStyle(1)}>Services</p>
            </Link>
            <Link
              ref={portfolio}
              to="/portfolio"
              style={{ textDecoration: "none", paddingTop: "3%" }}
              onClick={() => {
                setLastSelected(selected);
                setSelected(2);
              }}
              onMouseEnter={() => {
                setLastSelected(selected);
                setSelected(2);
              }}
              className="underline-target"
            >
              <p style={getButtonStyle(2)}>Portfolio</p>
            </Link>
            <Link
              ref={contact}
              to="/contact"
              style={{
                textDecoration: "none",
                paddingTop: "3%",
                marginRight: "25px",
              }}
              onClick={() => {
                setLastSelected(selected);
                setSelected(3);
              }}
              onMouseEnter={() => {
                setLastSelected(selected);
                setSelected(3);
              }}
              className="underline-target"
            >
              <p style={getButtonStyle(3)}>Contact</p>
            </Link>
          </div>
          <div ref={underlineDiv} style={{ transform: "translateY(-15px)" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                visibility: hovered ? "visible" : "hidden",
              }}
              ref={parent}
            >
              <div
                style={{
                  width: aboutUs.current ? aboutUs.current.clientWidth : 0,
                  backgroundColor: "black",
                  height: "3px",
                }}
              />
              <div
                style={{
                  width: services.current ? services.current.clientWidth : 0,
                  height: "3px",
                }}
              />
              <div
                style={{
                  width: portfolio.current ? portfolio.current.clientWidth : 0,
                  height: "3px",
                }}
              />

              <div
                style={{
                  width: contact.current ? contact.current.clientWidth : 0,
                  height: "3px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WavNavbar;
