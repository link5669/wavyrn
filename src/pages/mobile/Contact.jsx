import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ContactSocialIcons from "../../components/ContactSocialIcons";
import BottomSection from "../../components/BottomSection/BottomSection";
import WavNavbar from "../../components/Navbar/MobileNavbar/MobileNavbar";
import { useTranslation } from "../../hooks/useTranslation";

const Contact = ({ isMobile }) => {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
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
        if (name.trim() === "" || email.trim() === "" || message.trim() === "" || subject.trim() === "") {
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
                className="mobile-page-container"
                style={{
                    minHeight: "105vh",
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
                      {t('contact.title')}
                    </b>
                </h2>
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
                <h3
                    style={{
                        textAlign: "center",
                        color: "white",
                    }}
                >
                  {t('contact.subtitle')}
                </h3>

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
                                outlineColor: "#eeeeee",
                                borderStyle: "solid",
                                width: "100%",
                            }}
                        />
                    </Row>
                    <input
                        name="user_email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        value={email}
                        placeholder={t('contact.form.email')}
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
                    <input
                        name="subject"
                        onChange={(e) => setSubject(e.target.value)}
                        type="text"
                        value={subject}
                        placeholder={t('contact.form.subject')}
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
                        value={message}
                        placeholder={t('contact.form.message')}
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
                    <ReCAPTCHA
                    style={{paddingBottom: "20px"}}
                        sitekey={
                        "6Lcjzm0pAAAAADPgllq3V1121dMrCMYnZwaRSLr5"
                        }
                        ref={captchaRef}
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
                                value={t('contact.form.sendButton')}
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
