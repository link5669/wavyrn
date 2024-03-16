import WavNavbar from "../components/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ContactSocialIcons from "../components/ContactSocialIcons";

const Contact = ({ isMobile }) => {
  const [name, setName] = useState("Name");
  const [email, setEmail] = useState("Email");
  const [message, setMessage] = useState("Message");
  const [error, setError] = useState("");

  const form = useRef();
  const captchaRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    if (!token) {
      setError("Please complete the captcha!");
      return;
    }
    if (name == "Name" || email == "Email" || message == "Message") {
      setError("Please fill out all fields!");
      return;
    }

    emailjs
      .sendForm("service_qmi40xs", "template_4jgigf1", form.current, {
        publicKey: "jk8hVoSyJiKGAFCRe",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <div style={{ minHeight: "90vh" }}>
        {!isMobile && (
          <div
            style={{
              backgroundImage: isMobile
                ? "none"
                : "url('/images/Contact - Banner.jpg?url')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%",
              height: "15em",
              width: "100vw",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                // marginBottom: ".5em",
                // marginTop: "1em",
                color: "white",
                fontWeight: 'bold',
                fontSize: '5em'
              }}
            >
              LEAVE A NOTE!
            </h2>
            {/* <p
              style={{
                paddingLeft: "12em",
                paddingRight: "12em",
                paddingBottom: "3em",
                color: "white",
              }}
            >
              <b>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                malesuada facilisis tellus, aliquam molestie purus consequat
                nec. Fusce arcu sapien, fringilla eu arcu volutpat, consequat
                dignissim est.
              </b>
            </p> */}
          </div>
        )}
        <h3 style={{ textAlign: "center", paddingTop: '1%' }}>contact@wavyrn.com</h3>
        <ContactSocialIcons />
        <hr style={{ width: "33%", marginLeft: "33%" }} />
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "15%",
            paddingRight: "15%",
            alignItems: "center",
          }}
          id="contact-form"
          ref={form}
        >
          <input type="hidden" name="contact_number" />
          <input
            name="user_name"
            onFocus={() => {
              if (name == "Name") setName("");
            }}
            onBlur={() => {
              if (name == "") setName("Name");
            }}
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            style={{
              padding: '10px',
                outline: 'none',
              backgroundColor: "#f8f8f8",
              height: "4em",
              borderRadius: "10px",
              outlineColor: "#eeeeee",
              borderStyle: "solid",
              width: "100%",
            }}
          ></input>
          <input
            name="email_address"
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => {
              if (email == "Email") setEmail("");
            }}
            onBlur={() => {
              if (email == "") setEmail("Email");
            }}
            type="text"
            value={email}
            style={{
              outline: 'none',

              padding: '10px',
              marginTop: "1.2em",
              backgroundColor: "#f8f8f8",
              height: "4em",
              borderRadius: "10px",
              outlineColor: "#eeeeee",
              borderStyle: "solid",
              width: "100%",
            }}
          ></input>{" "}
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            onFocus={() => {
              if (message == "Message") setMessage("");
            }}
            onBlur={() => {
              if (message == "") setMessage("Message");
            }}
            value={message}
            style={{
              padding: '10px',

              marginTop: "1.2em",
              marginBottom: "1.2em",
              backgroundColor: "#f8f8f8",
              height: "10em",
              borderRadius: "10px",
              outlineColor: "#eeeeee",
              borderStyle: "solid",
              width: "100%",
              resize: "none",
              paddingTop: "20px",
            }}
          ></textarea>{" "}
          <div style={{ width: "100%" }}>
            <Row>
              <Col xs={4}>
                {!isMobile ? (
                  <ReCAPTCHA
                    sitekey={"6Lcjzm0pAAAAADPgllq3V1121dMrCMYnZwaRSLr5"}
                    ref={captchaRef}
                  />
                ) : (
                  <></>
                )}
              </Col>
              <Col
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "2%",
                }}
              >
                <input
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                  value="Send"
                  style={{
                    width: "9em",
                    color: "white",
                    backgroundColor: "#bb1d1a",
                    borderRadius: "10px",
                    borderStyle: "none",
                    height: "2.5em",
                  }}
                />
              </Col>
              <Col xs={4} />
            </Row>
            {isMobile ? (
              <Col xs={4}>
                <ReCAPTCHA
                  sitekey={"6Lcjzm0pAAAAADPgllq3V1121dMrCMYnZwaRSLr5"}
                  ref={captchaRef}
                />
              </Col>
            ) : (
              <></>
            )}
            {error}
          </div>
        </form>
      </div>
      <footer
        style={{
          backgroundColor: "black",
          height: "50px", // Adjust height as needed
        }}
      >
        <p style={{ color: "white", textAlign: "center", lineHeight: "50px" }}>
          ©️2024 Wavyrn • All Rights Reserved
        </p>
      </footer>
    </>
  );
};

export default Contact;
