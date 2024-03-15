import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  Facebook_svg,
  Insta_svg,
  Mail_svg,
  Twitter_svg,
  Menu_svg,
} from "../utilities/svgs";
import logo from "/images/logo.png";
import { useEffect, useRef, useState } from "react";

const WavNavbar = ({ isMobile }) => {
  const [selected, setSelected] = useState(0);
  const [lastSelected, setLastSelected] = useState(-1);
  const [underlineAnimation, setUnderlineAnimation] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate();
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 200,
    easing: "ease-in-out",
    disrespectUserMotionPreference: false,
  });

  const aboutUs = useRef(null);
  const services = useRef(null);
  const portfolio = useRef(null);
  const contact = useRef(null);
  const underlineDiv = useRef(null);
  const line = useRef(null);
  const parentParent = useRef(null);

  useEffect(() => {
    if (aboutUs == null) return;

    rearrangeChildren(selected);
  }, [selected]);

  useEffect(() => {}, []);

  const rearrangeChildren = (index) => {
    let parentRef = underlineDiv.current.children[0];

    if (!parentRef || index < 0 || index > 4) return;

    const children = [...parentRef.children];

    let underlineElement = children.find(
      (child) => child.style.backgroundColor == "rgb(206, 0, 54)"
    );
    console.log(selected);

    if (index == 4) {
      if (underlineElement) {
        underlineElement.remove();
      }
      return;
    }
    if (lastSelected == 4) {
      const node = document.createElement("div");
      node.style.width = "110px";
      node.style.backgroundColor = "rgb(206, 0, 54)";
      node.style.height = "2px";
      children.splice(index, 0, node);
      parentRef.replaceChildren(...children);
      return;
    }
    if (underlineElement) {
      children.splice(
        index,
        0,
        children.splice(children.indexOf(underlineElement), 1)[0]
      );
      parentRef.replaceChildren(...children);
    }
  };

  const getButtonStyle = () => {
    return {
      paddingRight: "10px",
      paddingLeft: "10px",
      color: "#CE0036",
      fontSize: "1.3em",
      paddingBottom: "0",
      textDecoration: "none",
      marginTop: "0px",
      whiteSpace: "nowrap",
      textAlign: "center",
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
            <Col
              xs={2}
              md={4}
              style={{ display: isMobile ? "none" : "initial" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "row-reverse",
                }}
              >
                <a href="https://www.instagram.com/wavyrnaudio/">
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
                <a href="https://twitter.com/wavyrnaudio">
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
                <a href="https://www.facebook.com/profile.php?id=61556576406909">
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
                <a href="mailto:contact@wavyrn.com">
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
          minWidth: 0,
        }}
      >
        <div style={{ justifyContent: "flex-start", minWidth: 0 }}>
          <Link to="/">
            <img
              src={logo}
              onMouseLeave={() => {
                let currentPage = window.location.href.split("/");
                currentPage = currentPage[currentPage.length - 1];
                let pageIndex =
                  currentPage == "about-us"
                    ? 0
                    : currentPage == "services"
                    ? 1
                    : currentPage == "portfolio"
                    ? 2
                    : currentPage == "contact"
                    ? 3
                    : 4;
                setLastSelected(selected);
                setSelected(pageIndex);
              }}
              style={{ maxHeight: "100%" }}
            />
          </Link>
          <div
            style={{
              display: isMobile ? "initial" : "none",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#CE0036"
              className="bi bi-envelope"
              viewBox="0 0 16 16"
              style={{ color: "gray" }}
              onClick={() => setToggled(!toggled)}
            >
              <Menu_svg />
            </svg>
          </div>
        </div>
        <div style={{ display: "grid" }} ref={parentParent}>
          <div
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              display: isMobile ? "none" : "flex",
              zIndex: 10000000,
            }}
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => {
              let currentPage = window.location.href.split("/");
              currentPage = currentPage[currentPage.length - 1];
              let pageIndex =
                currentPage == "about-us"
                  ? 0
                  : currentPage == "services"
                  ? 1
                  : currentPage == "portfolio"
                  ? 2
                  : currentPage == "contact"
                  ? 3
                  : 4;
              setLastSelected(selected);
              setSelected(pageIndex);
            }}
            ref={parent}
          >
            <Link
              ref={aboutUs}
              to="/about-us"
              state={{ useAnimate: true }}
              style={{
                textDecoration: "none",
                paddingTop: "3%",
                width: "110px",
              }}
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
              style={{
                textDecoration: "none",
                paddingTop: "3%",
                width: "110px",
              }}
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
              style={{
                textDecoration: "none",
                paddingTop: "3%",
                width: "110px",
              }}
              onClick={() => {
                setLastSelected(selected);
                setSelected(2);
                setToggled(false);
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
                width: "110px",
              }}
              onClick={() => {
                setLastSelected(selected);
                setSelected(3);
                setToggled(false);
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
                display: isMobile ? "none" : "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                opacity: hovered ? 1 : 0,
                transition: "opacity 200ms",
              }}
              ref={parent}
            >
              <div
                ref={line}
                style={{
                  width: "110px",
                  backgroundColor: "rgb(206, 0, 54)",
                  height: "2px",
                }}
              />
              <div
                style={{
                  width: "110px",
                  height: "2px",
                }}
              />
              <div
                style={{
                  width: "110px",
                  height: "2px",
                }}
              />
              <div
                style={{
                  width: "110px",
                  height: "2px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            backgroundColor: "white",
            display: toggled ? "initial" : "none",
            position: "fixed",
            top: "90px",
            left: 0,
            width: "100vw",
          }}
        >
          <div style={{ paddingLeft: "2%" }}>
            <Link
              state={{ useAnimate: true }}
              onClick={() => setToggled(false)}
              to="/about-us"
              style={{ textDecoration: "none", color: "#CE0036" }}
            >
              <p>About Us</p>
            </Link>
            <Link
              onClick={() => setToggled(false)}
              to="/services"
              style={{ textDecoration: "none", color: "#CE0036" }}
            >
              <p>Services</p>
            </Link>
            <Link
              onClick={() => setToggled(false)}
              to="/portfolio"
              style={{ textDecoration: "none", color: "#CE0036" }}
            >
              <p>Portfolio</p>
            </Link>
            <Link
              onClick={() => setToggled(false)}
              to="/contact"
              style={{ textDecoration: "none", color: "#CE0036" }}
            >
              <p>Contact</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WavNavbar;
