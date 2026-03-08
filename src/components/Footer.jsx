import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";
import { IconContext } from "react-icons";
import "./Footer.css";

const QUICK_LINKS = [
    { to: "/", labelKey: "nav.home" },
    { to: "/about", labelKey: "nav.about" },
    { to: "/portfolio", labelKey: "nav.portfolio" },
    { to: "/blog", labelKey: "nav.blog" },
    { to: "/contact", labelKey: "nav.contactUs" },
];

const SOCIAL_LINKS = [
    { href: "https://www.instagram.com/wavyrnaudio/", label: "Instagram", Icon: FaInstagram },
    { href: "https://x.com/wavyrnaudio/", label: "Twitter", Icon: FaTwitter },
    { href: "https://bsky.app/profile/wavyrnaudio.bsky.social", label: "Bluesky", Icon: SiBluesky },
    { href: "https://www.facebook.com/WavyrnAudio", label: "Facebook", Icon: FaFacebook },
    { href: "https://www.linkedin.com/company/wavyrn-audio/", label: "LinkedIn", Icon: FaLinkedin },
];

const Footer = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        const trimmed = email.trim();
        if (!trimmed) return;

        setStatus("loading");
        try {
            const base = import.meta.env.VITE_REACT_APP_BACKEND_URL || "";
            const res = await fetch(`${base}/api/newsletter/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: trimmed }),
            });
            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                setEmail("");
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <footer className="site-footer">
            <div className="site-footer-top">
                <div className="site-footer-brand">
                    <Link to="/" className="site-footer-logo">
                        <img src="/images/logo_red.png" alt="" className="site-footer-logo-img" />
                        {/* <span className="site-footer-logo-text">.wavyrn</span> */}
                    </Link>
                    <p className="site-footer-tagline">{t("footer.tagline")}</p>
                    <div className="site-footer-social">
                        {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="site-footer-social-icon" aria-label={label}>
                                <IconContext.Provider value={{ color: "white", size: "16px" }}>
                                    <Icon />
                                </IconContext.Provider>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="site-footer-links">
                    <h3 className="site-footer-heading">{t("footer.quickLinks")}</h3>
                    <ul className="site-footer-list">
                        {QUICK_LINKS.map(({ to, labelKey }) => (
                            <li key={labelKey}>
                                <Link
                                    to={to}
                                    onClick={to === "/blog" ? () => {
                                        const scrollToTop = () => {
                                            const el = document.scrollingElement || document.documentElement;
                                            if (el) el.scrollTop = 0;
                                            window.scrollTo(0, 0);
                                            document.documentElement.scrollTop = 0;
                                            document.body.scrollTop = 0;
                                        };
                                        scrollToTop();
                                        requestAnimationFrame(scrollToTop);
                                        setTimeout(scrollToTop, 0);
                                        setTimeout(scrollToTop, 100);
                                        setTimeout(scrollToTop, 300);
                                    } : undefined}
                                >
                                    {t(labelKey)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="site-footer-newsletter">
                    <h3 className="site-footer-heading">{t("footer.joinNewsletter")}</h3>
                    <form className="site-footer-form" onSubmit={handleNewsletterSubmit}>
                        <input
                            type="email"
                            placeholder={t("footer.enterEmail")}
                            className="site-footer-input"
                            aria-label={t("footer.enterEmail")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === "loading"}
                            required
                        />
                        <div className="site-footer-submit-wrap">
                            <button
                                type="submit"
                                className={`site-footer-submit-btn ${status === "loading" ? "site-footer-submit-btn--loading" : ""} ${status === "success" ? "site-footer-submit-btn--success" : ""}`}
                                disabled={status === "loading"}
                            >
                                <span className="site-footer-submit-text">
                                    {status === "loading" ? "..." : t("footer.subscribe")}
                                </span>
                                <span className="site-footer-submit-done" aria-hidden="true">
                                    Subscribed!
                                </span>
                            </button>
                        </div>
                    </form>
                    {status === "success" && (
                        <p className="site-footer-newsletter-message site-footer-newsletter-message--success">
                            {t("footer.newsletterSuccess")}
                        </p>
                    )}
                    {status === "error" && (
                        <p className="site-footer-newsletter-message site-footer-newsletter-message--error">
                            {t("footer.newsletterError")}
                        </p>
                    )}
                </div>
            </div>
            <div className="site-footer-bottom">
                <div className="site-footer-line" />
                <p className="site-footer-copy">{t("footer.copyright").replace("{{year}}", new Date().getFullYear())}</p>
            </div>
        </footer>
    );
};

export default Footer;
