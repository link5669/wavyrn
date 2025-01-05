import ReactPlayer from "react-player";
import { Player } from "react-simple-player";
import { Link } from "react-router-dom";

const Preview = ({ isMobile, title, image, subtitle, content, link }) => {
  return (
    <div
      style={{
        margin: !isMobile && "7vh",
        padding: "2vw",
        backgroundColor: "white",
        borderRadius: isMobile ? "0px" : "30px",
      }}
    >
      <h2>{title}</h2>
      <h4 style={{ color: "grey", fontSize: "1.4em" }}>{subtitle}</h4>
      <img
        style={{ paddingTop: "1vw", paddingBottom: "1vw", width: "40vw" }}
        src={image}
      />

      <p>{content}</p>
      <Link to={link}>
        <button
          style={{
            backgroundColor: "#CE0036",
            borderRadius: "5px",
            color: "white",
          }}
        >
          Learn more
        </button>
      </Link>
    </div>
  );
};

export default Preview;
