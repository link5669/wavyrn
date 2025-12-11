import WavNavbar from "../components/Navbar/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ContactSocialIcons from "../components/ContactSocialIcons";
import Footer from "../components/Footer";
import { useTranslation } from "../hooks/useTranslation";

const Contact = ({ isMobile }) => {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [sent, setSent] = useState("");

    const form = useRef();
    const captchaRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = captchaRef.current.getValue();
        captchaRef.current.reset();
        if (!token) {
            setError(t('contact.form.captchaError'));
            return;
        }
        if (
            name.trim() === "" ||
            email.trim() === "" ||
            subject.trim() === "" ||
            message.trim() === ""
        ) {
            setError(t('contact.form.fillFieldsError'));
            return;
        }

        emailjs
            .sendForm("service_n3uw9ji", "template_4jgigf1", form.current, {
                publicKey: "jk8hVoSyJiKGAFCRe",
            })
            .then(
                () => {
                    setSent(t('contact.form.sent'));
                    console.log("SUCCESS!");
                },
                (error) => {
                    setSent(t('contact.form.error'));
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
                    backgroundColor: "white",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        paddingTop: "1%",
                        color: "black",
                    }}
                >
                    {t('contact.title')}
                </h2>
                <h3
                    style={{
                        textAlign: "center",
                        color: "black",
                        fontSize: "1.1em",
                    }}
                >
                    {t('contact.subtitle')}
                </h3>
                <hr
                    style={{
                        display: "block",
                        height: "3px",
                        border: 0,
                        borderTop: "1px solid #000000",
                        margin: "1em 0",
                        marginLeft: "30%",
                        marginRight: "30%",
                        opacity: 100,
                    }}
                />
                <h4
                    style={{
                        textAlign: "center",
                        color: "black",
                        fontSize: "1em",
                        marginTop: "0.5em",
                        marginBottom: "0.5em",
                    }}
                >
                    {t('contact.email')}
                </h4>
                <ContactSocialIcons color="#ce0031" />
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
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                placeholder={t('contact.form.name')}
                                style={{
                                    padding: "10px",
                                    outline: "none",
                                    backgroundColor: "#f8f8f8",
                                    height: "4em",
                                    borderRadius: "10px",
                                    borderColor: "#000000",
                                    borderStyle: "solid",
                                    borderWidth: "1px",
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
                                type="text"
                                value={email}
                                placeholder={t('contact.form.email')}
                                style={{
                                    padding: "10px",
                                    outline: "none",
                                    backgroundColor: "#f8f8f8",
                                    height: "4em",
                                    borderRadius: "10px",
                                    borderColor: "#000000",
                                    borderStyle: "solid",
                                    borderWidth: "1px",
                                    width: "100%",
                                }}
                            />
                        </Col>
                    </Row>
                    <input
                        name="subject"
                        onChange={(e) => setSubject(e.target.value)}
                        type="text"
                        value={subject}
                        placeholder={t('contact.form.subject')}
                        style={{
                            outline: "none",
                            padding: "10px",
                            marginTop: "1.2em",
                            backgroundColor: "#f8f8f8",
                            height: "4em",
                            borderRadius: "10px",
                                    borderColor: "#000000",
                                    borderStyle: "solid",
                                    borderWidth: "1px",
                            width: "100%",
                        }}
                    />
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        name="message"
                        value={message}
                        placeholder={t('contact.form.message')}
                        style={{
                            padding: "10px",
                            marginTop: "1.2em",
                            marginBottom: "1.2em",
                            backgroundColor: "#f8f8f8",
                            height: "10em",
                            borderRadius: "10px",
                                    borderColor: "#000000",
                                    borderStyle: "solid",
                                    borderWidth: "1px",
                            width: "100%",
                            paddingTop: "20px",
                        }}
                    />
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", paddingBottom: "30px" }}>
                        <ReCAPTCHA
                            sitekey="6Lcjzm0pAAAAADPgllq3V1121dMrCMYnZwaRSLr5"
                            ref={captchaRef}
                        />
                        <input
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                            value={t('contact.form.sendButton')}
                            style={{
                                width: "9em",
                                color: "white",
                                fontSize: "1em",
                                backgroundColor: "#ce0031",
                                borderRadius: "5px",
                                borderStyle: "none",
                                height: "2.5em",
                                padding: "0.5em 1em",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        />
                        {error}
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
