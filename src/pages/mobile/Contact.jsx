import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ContactSocialIcons from "../../components/ContactSocialIcons";
import BottomSection from "../../components/BottomSection/BottomSection";
import WavNavbar from "../../components/Navbar/MobileNavbar/MobileNavbar";

const Contact = ({ isMobile }) => {
    const [name, setName] = useState("Name");
    const [email, setEmail] = useState("Email");
    const [message, setMessage] = useState("Message");
    const [error, setError] = useState("");
    const [sent, setSent] = useState("");

    const form = useRef();
    const captchaRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        // const token = captchaRef.current.getValue();
        // captchaRef.current.reset();
        // if (!token) {
        //     setError("Please complete the captcha!");
        //     return;
        // }
        if (name == "Name" || email == "Email" || message == "Message") {
            setError("Please fill out all fields!");
            return;
        }

        emailjs
            .sendForm("service_4slc6on", "template_olgmh6l", form.current, {
                publicKey: "kS8iWx3WR9GyvZWaN",
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
                    width: "100vw",
                    backgroundColor: "#CE0036",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        paddingTop: "3%",
                        paddingLeft: "7%",
                        paddingRight: "7%",
                        color: "white",
                        fontSize: "2em",
                    }}
                >
                    <b>
                        We'd love to <br />
                        hear from you!
                    </b>
                </h2>
                <h3
                    style={{
                        textAlign: "center",
                        color: "white",
                    }}
                >
                    <i>contact@wavyrn.com</i>
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
                <p style={{ textAlign: "center" }}>{sent}</p>
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "10%",
                        paddingRight: "10%",
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
                    </Row>
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
                            marginTop: "1.2em",
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
                        <Row
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
                                    fontSize: "1em",
                                    backgroundColor: "#CE0036",
                                    borderRadius: "10px",
                                    borderStyle: "none",
                                    height: "40px",
                                    border: "solid white 2px",
                                }}
                            />
                        </Row>
                        {error}
                    </div>
                </form>
            </div>
            <BottomSection />
        </>
    );
};

export default Contact;
