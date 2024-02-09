import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const WavNavbar = () => {
  return (
    <div style={{ width: "100vw", position: "sticky", top: "0px" }}>
      <div style={{ height: "40px", backgroundColor: "lightGray" }}>
        <Container style={{ paddingTop: "5px", margin: "0" }}>
          <Row xs="auto">
            <Col>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
                className="bi bi-envelope"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
              </svg>
            </Col>
            <Col>
              <p>contact@wavyrn.com</p>
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
