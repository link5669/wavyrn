// components/Overlay.jsx
import { useEffect } from "react";
import { X_svg } from "../../utilities/svgs";
import {
    FacebookLink,
    InstaLink,
    MailLink,
    ThreadsLink,
    TikTokLink,
    TwitterLink,
    WebsiteLink,
    BlueskyLink,
    LinkedinLink,
} from "../SocialLinks";
import "./Overlay.css";
import { Link } from "react-router-dom";

// Social links mapping for each user
const getUserSocialLinks = (userName) => {
    const socialLinksMap = {
        "Gret Price": [
            <InstaLink key="insta" handle="gretplaysallflutes" />
        ],
        "Zionna Brown": [
            <InstaLink key="insta" handle="zionnavee" />
        ],
        "Austin Leshock": [
            <InstaLink key="insta" handle="au_shock" />,
            <FacebookLink key="facebook" handle="profile.php?id=100008654137201" />
        ],
        "Marc Yu": [
            <WebsiteLink key="website" link="https://marcyumusic.com" />,
            <InstaLink key="insta" handle="MarcYuMusic" />,
            <TwitterLink key="twitter" handle="MarcYuMusic" />,
            <FacebookLink key="facebook" handle="MarcYuMusic" />,
            <ThreadsLink key="threads" handle="MarcYuMusic" />,
            <BlueskyLink key="bluesky" address="https://bsky.app/profile/marcyumusic.bsky.social" />
        ],
        "Sam Leigh": [
            <WebsiteLink key="website" link="https://www.samleighstudio.com/" />,
            <InstaLink key="insta" handle="@samleighsings" />,
            <TikTokLink key="tiktok" handle="@samleighsings" />
        ],
        "Julian Cabrera": [
            <WebsiteLink key="website" link="https://www.juliancabreraaudio.com/" />,
            <InstaLink key="insta" handle="super_monzee" />,
            <TwitterLink key="twitter" handle="@Super_MonZee" />
        ],
        "Michelle Lai": [
            <WebsiteLink key="website" link="michellelaimusic.com" />,
            <InstaLink key="insta" handle="michellelaimusic" />,
            <MailLink key="mail" address="michellelaimusic@gmail.com" />,
            <LinkedinLink key="linkedin" handle="michellelaimusic" />
        ],
        "Grace Pehrman": [
            <LinkedinLink key="linkedin" handle="gracepehrman" />,
            <InstaLink key="insta" handle="gracepehrman" />,
            <FacebookLink key="facebook" handle="grace.pehrman" />,
            <WebsiteLink key="website" link="https://gracepehrman.com/" />,
        ],
        "Neil Small": [
            <TwitterLink key="twitter" handle="@smallsoundss" />,
            <InstaLink key="insta" handle="smallsoundss" />,
            <BlueskyLink key="bluesky" address="https://bsky.app/profile/smallsoundss.bsky.social" />
        ],
        "Quinne Houck": [
            <InstaLink key="insta" handle="enbeatsu" />,
            <WebsiteLink key="website" link="https://enbeatsu.wixsite.com/" />,
            <BlueskyLink key="bluesky" address="https://bsky.app/profile/enbeatsu.on.computer" />,
            <WebsiteLink key="youtube" link="https://www.youtube.com/@enbeatsu" />,
            <WebsiteLink key="bandcamp" link="https://enbeatsu.bandcamp.com/" />,
            <WebsiteLink key="soundcloud" link="https://soundcloud.com/enbeatsu" />,
            <LinkedinLink key="linkedin" handle="in/quinne-houck/" />
        ]
    };
    
    return socialLinksMap[userName] || [];
};

const Overlay = ({ isVisible, onClose, children, profileInfo }) => {
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isVisible]);

    return (
        <div className={`overlay ${isVisible ? "visible" : ""}`}>
            <div className="overlay-content">
                <div className="overlay-header">
                    <div className="profile-section">
                        <img
                            src={profileInfo.image}
                            alt={profileInfo.name}
                            style={{
                                objectPosition:
                                    profileInfo.name == "Zionna Brown"
                                        ? "0% 25%"
                                        : profileInfo.name == "Sam Leigh"
                                          ? "0% 40%"
                                          : "",
                            }}
                            className="overlay-profile-pic"
                        />
                        <div className="profile-info">
                            <h3>{profileInfo.name}</h3>
                            <p>{profileInfo.title}</p>
                            <div className="social-links-header">
                                {getUserSocialLinks(profileInfo.userKey || profileInfo.name).map((link, index) => (
                                    <div key={index}>
                                        {link}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="overlay-divider" aria-hidden="true" />
                    <button className="close-button" onClick={onClose} aria-label="Close">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-x"
                            viewBox="0 0 16 16"
                        >
                            <X_svg />
                        </svg>
                    </button>
                </div>
                <div className="overlay-body">
                    <div className="scroll-content">
                        <div className="overlay-content-wrapper">
                            <div className="overlay-text-content">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overlay;
