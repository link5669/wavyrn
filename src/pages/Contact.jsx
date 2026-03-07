import WavNavbar from "../components/Navbar/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import Footer from "../components/Footer";
import { useTranslation } from "../hooks/useTranslation";
import "./Contact.css";

const Contact = ({ isMobile }) => {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [sent, setSent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        setIsSubmitting(true);
        emailjs
            .sendForm("service_n3uw9ji", "template_4jgigf1", form.current, {
                publicKey: "jk8hVoSyJiKGAFCRe",
            })
            .then(
                () => {
                    setSent(t('contact.form.sent'));
                    console.log("SUCCESS!");
                },
                (err) => {
                    setIsSubmitting(false);
                    setSent(t('contact.form.error'));
                    console.log("FAILED...", err.text);
                },
            );
    };

    const subtitle = t("contact.subtitle");
    const highlight = t("contact.subtitleHighlight");
    const subtitleParts = highlight && subtitle.includes(highlight)
        ? subtitle.split(highlight)
        : [subtitle];

    return (
        <>
            <WavNavbar showLogo={true} />
            <div className="contact-page">
                <h1 className="contact-title">{t("contact.title")}</h1>
                <p className="contact-subtitle">
                    {subtitleParts.length === 2 ? (
                        <>{subtitleParts[0]}<span className="contact-subtitle-accent">{highlight}</span></>
                    ) : (
                        subtitle
                    )}
                </p>
                <hr className="contact-hr" />
                <p className="contact-email">{t("contact.email")}</p>
                {/* <ContactSocialIcons color="#e01e3d" /> */}
                {(sent || error) && (
                    <p className={`contact-message ${error ? "error" : ""}`}>{error || sent}</p>
                )}
                <form id="contact-form" ref={form} className="contact-form">
                    <input type="hidden" name="contact_number" />
                    <div className="contact-row">
                        <div className="contact-field">
                            <label htmlFor="contact-name" className="contact-label">{t("contact.form.name")} *</label>
                            <input
                                id="contact-name"
                                name="user_name"
                                type="text"
                                className="contact-input"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                // placeholder={t("contact.form.name")}
                            />
                        </div>
                        </div>
                    
                        <div className="contact-field">
                            <label htmlFor="contact-email" className="contact-label">{t("contact.form.email")} *</label>
                            <input
                                id="contact-email"
                                name="user_email"
                                type="email"
                                className="contact-input"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                // placeholder={t("contact.form.email")}
                            />
                        </div>
                    <div className="contact-field">
                        <label htmlFor="contact-subject" className="contact-label">{t("contact.form.subject")} *</label>
                        <input
                            id="contact-subject"
                            name="subject"
                            type="text"
                            className="contact-input"
                            onChange={(e) => setSubject(e.target.value)}
                            value={subject}
                            // placeholder={t("contact.form.subject")}
                        />
                    </div>
                    <div className="contact-field">
                        <label htmlFor="contact-message" className="contact-label">{t("contact.form.message")} *</label>
                        <textarea
                            id="contact-message"
                            name="message"
                            className="contact-textarea"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            // placeholder={t("contact.form.message")}
                        />
                    </div>
                    <div className="contact-captcha-wrap">
                        <ReCAPTCHA
                            sitekey="6Lcjzm0pAAAAADPgllq3V1121dMrCMYnZwaRSLr5"
                            ref={captchaRef}
                        />
                    </div>
                    <div className="contact-submit-wrap">
                        <button
                            type="button"
                            className={`contact-submit ${isSubmitting ? "contact-submit--submitting" : ""}`}
                            onClick={(e) => handleSubmit(e)}
                            disabled={isSubmitting}
                        >
                            <span className="contact-submit-text">{t("contact.form.sendButton")}</span>
                            <span className="contact-submit-check" aria-hidden="true">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
