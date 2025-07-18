import WavNavbar from "../components/Navbar/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ContactSocialIcons from "../components/ContactSocialIcons";

const Contact = ({ isMobile }) => {
    const [name, setName] = useState("Name");
    const [email, setEmail] = useState("Email");
    const [subject, setSubject] = useState("Subject");
    const [message, setMessage] = useState("Message");
    const [error, setError] = useState("");
    const [sent, setSent] = useState("");

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
        if (
            name == "Name" ||
            email == "Email" ||
            subject == "Subject" ||
            message == "Message"
        ) {
            setError("Please fill out all fields!");
            return;
        }

        emailjs
            .sendForm("service_qmi40xs", "template_4jgigf1", form.current, {
                publicKey: "jk8hVoSyJiKGAFCRe",
            })
            .then(
                () => {
                    setSent("Sent");
                    console.log("SUCCESS!");
                },
                (error) => {
                    setSent("Error! Please reload the page and try again");
                    console.log("FAILED...", error.text);
                },
            );
    };

    return (
        <>
            <WavNavbar showLogo={true} />
            <div
                style={{
                    minHeight: "100vh",
                    paddingTop: "90px",
                    width: "100vw",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        paddingTop: "1%",
                        color: "white",
                    }}
                >
                    Contact Us
                </h2>
                <h3
                    style={{
                        textAlign: "center",
                        color: "white",
                    }}
                >
                    contact@wavyrn.com
                </h3>
                <hr
                    style={{
                        display: "block",
                        height: "3px",
                        border: 0,
                        borderTop: "1px solid #ffffff",
                        margin: "1em 0",
                        marginLeft: "30%",
                        marginRight: "30%",
                        opacity: 100,
                    }}
                />
                <ContactSocialIcons />
                <hr style={{ width: "33%", marginLeft: "33%" }} />
                <p style={{ textAlign: "center" }}>{sent}</p>
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "25%",
                        paddingRight: "25%",
                        alignItems: "center",
                    }}
                    id="contact-form"
                    ref={form}
                >
                    <input type="hidden" name="contact_number" />
                    <Row
                        style={{
                            width: "100%",
                            marginLeft: 0,
                            marginRight: 0,
                        }}
                    >
                        <Col
                            xs={6}
                            style={{ paddingLeft: 0, paddingRight: "5px" }}
                        >
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
                                    padding: "10px",
                                    outline: "none",
                                    backgroundColor: "#f8f8f8",
                                    height: "4em",
                                    borderRadius: "10px",
                                    outlineColor: "#eeeeee",
                                    borderStyle: "solid",
                                    width: "100%",
                                }}
                            />
                        </Col>
                        <Col
                            xs={6}
                            style={{ paddingLeft: "5px", paddingRight: 0 }}
                        >
                            <input
                                name="user_email"
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
                                    padding: "10px",
                                    outline: "none",
                                    backgroundColor: "#f8f8f8",
                                    height: "4em",
                                    borderRadius: "10px",
                                    outlineColor: "#eeeeee",
                                    borderStyle: "solid",
                                    width: "100%",
                                }}
                            />
                        </Col>
                    </Row>
                    <input
                        name="subject"
                        onChange={(e) => setSubject(e.target.value)}
                        onFocus={() => {
                            if (subject == "Subject") setSubject("");
                        }}
                        onBlur={() => {
                            if (subject == "") setSubject("Subject");
                        }}
                        type="text"
                        value={subject}
                        style={{
                            outline: "none",
                            padding: "10px",
                            marginTop: "1.2em",
                            backgroundColor: "#f8f8f8",
                            height: "4em",
                            borderRadius: "10px",
                            outlineColor: "#eeeeee",
                            borderStyle: "solid",
                            width: "100%",
                        }}
                    />
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
                            padding: "10px",
                            marginTop: "1.2em",
                            marginBottom: "1.2em",
                            backgroundColor: "#f8f8f8",
                            height: "10em",
                            borderRadius: "10px",
                            outlineColor: "#eeeeee",
                            borderStyle: "solid",
                            width: "100%",
                            paddingTop: "20px",
                        }}
                    />
                    <div style={{ width: "100%" }}>
                        <Row>
                            <Col xs={4}>
                                {!isMobile ? (
                                    <ReCAPTCHA
                                        sitekey={
                                            "6Lcjzm0pAAAAADPgllq3V1121dMrCMYnZwaRSLr5"
                                        }
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
                                }}
                            >
                                <input
                                    onClick={(e) => handleSubmit(e)}
                                    type="submit"
                                    value="SEND"
                                    style={{
                                        width: "6em",
                                        color: "white",
                                        fontSize: "2em",
                                        backgroundColor: "#bb1d1a",
                                        borderRadius: "10px",
                                        borderStyle: "none",
                                        height: "100%",
                                    }}
                                />
                            </Col>
                            <Col xs={4} />
                        </Row>
                        {isMobile ? (
                            <Col xs={4}>
                                <ReCAPTCHA
                                    sitekey={
                                        "6Lcjzm0pAAAAADPgllq3V1121dMrCMYnZwaRSLr5"
                                    }
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
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "30px 30%"
            }}>
              <img
                style={{
                  maxHeight: "60px",
                  flexShrink: 1,
                  paddingRight: "20%",
                }}
                src="/images/logo_red.png"
              />
              <p
                style={{
                  color: "white",
                  margin: 0,
                  lineHeight: "50px",
                  whiteSpace: "nowrap"  // Prevents text wrapping
                }}
              >
                ©️2025 Wavyrn • All Rights Reserved
              </p>
            </div>
        </>
    );
};

export default Contact;
