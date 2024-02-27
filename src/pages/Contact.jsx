import WavNavbar from "../components/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ContactSocialIcons from "../components/ContactSocialIcons";

const Contact = () => {
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
        publicKey: process.env.CAPTCHA_PUBLIC_KEY,
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
      <WavNavbar />
      <div style={{ minHeight: "100vh" }}>
        <h3 style={{ textAlign: "center" }}>contact@wavyrn.com</h3>
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
                <ReCAPTCHA
                  sitekey={"6Lcjzm0pAAAAADPgllq3V1121dMrCMYnZwaRSLr5"}
                  ref={captchaRef}
                />
              </Col>
              <Col
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
            {error}
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
