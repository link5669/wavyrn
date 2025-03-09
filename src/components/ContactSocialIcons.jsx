import {
    Facebook_svg,
    Insta_svg,
    Mail_svg,
    Threads_svg,
    Twitter_svg,
    Bluesky_svg,
} from "../utilities/svgs";
import { SiBluesky } from "react-icons/si";
import { IconContext } from "react-icons";

const ContactSocialIcons = () => {
    return (
        <div
            style={{
                display: "flex",
                // flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div className="flexAndCenter">
                <div style={{ paddingInline: "7%" }}>
                    <a href="https://www.instagram.com/wavyrnaudio/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-instagram"
                            viewBox="0 0 16 16"
                            style={{ color: "white" }}
                        >
                            <Insta_svg />{" "}
                        </svg>
                    </a>
                </div>
                <div style={{ paddingInline: "7%" }}>
                    <a href="https://twitter.com/wavyrnaudio">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-twitter"
                            viewBox="0 0 16 16"
                            style={{ color: "white" }}
                        >
                            <Twitter_svg />{" "}
                        </svg>
                    </a>
                </div>
                <div style={{ paddingInline: "7%" }}>
                    <a href="https://www.facebook.com/profile.php?id=61556576406909">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-facebook"
                            viewBox="0 0 16 16"
                            style={{ color: "white" }}
                        >
                            <Facebook_svg />{" "}
                        </svg>
                    </a>
                </div>
                <div style={{ paddingInline: "7%" }}>
                    <a href="https://bsky.app/profile/wavyrnaudio.bsky.social">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-facebook"
                            viewBox="0 0 24 24"
                            style={{ color: "white" }}
                        >
                            <Bluesky_svg />{" "}
                        </svg>
                    </a>
                </div>
                <div style={{ paddingInline: "7%" }}>
                    <a href="mailto:contact@wavyrn.com">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-envelope"
                            viewBox="0 0 16 16"
                            style={{ color: "white" }}
                        >
                            <Mail_svg />{" "}
                        </svg>
                    </a>
                </div>
            </div>
            <br />
        </div>
    );
};

export default ContactSocialIcons;
