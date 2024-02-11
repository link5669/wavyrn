import {
  Facebook_svg,
  Insta_svg,
  Mail_svg,
  Threads_svg,
  Twitter_svg,
} from "../utilities/svgs";

const ContactSocialIcons = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="flexAndCenter">
        <div style={{ paddingInline: "7%" }}>
          <a href="https://www.instagram.com/MarcYuMusic/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-instagram"
              viewBox="0 0 16 16"
              style={{ color: "gray" }}
            >
              <Insta_svg />{" "}
            </svg>
          </a>
        </div>
        <div style={{ paddingInline: "7%" }}>
          <a href="https://twitter.com/MarcYuMusic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-twitter"
              viewBox="0 0 16 16"
              style={{ color: "gray" }}
            >
              <Twitter_svg />{" "}
            </svg>
          </a>
        </div>
        <div style={{ paddingInline: "7%" }}>
          <a href="http://facebook.com/MarcYuMusic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-facebook"
              viewBox="0 0 16 16"
              style={{ color: "gray" }}
            >
              <Facebook_svg />{" "}
            </svg>
          </a>
        </div>
        <div style={{ paddingInline: "7%" }}>
          <a href="http://threads.net/MarcYuMusic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-threads"
              viewBox="0 0 16 16"
              style={{ color: "gray" }}
            >
              <Threads_svg />{" "}
            </svg>
          </a>
        </div>
        <div style={{ paddingInline: "7%" }}>
          <a href="mailto:marcyu@marcyumusic.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-envelope"
              viewBox="0 0 16 16"
              style={{ color: "gray" }}
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
