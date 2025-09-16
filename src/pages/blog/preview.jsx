import { Link } from "react-router-dom";
import "./blog.css";

const Preview = ({ isMobile, title, image, subtitle, content, link }) => {
    return (
        <div
            style={{
                margin:  "0",
                width: "70vw",
                margin: "2vw 2vw",
                padding: "2vw",
                backgroundColor: "#fef2f2",
                borderRadius: isMobile ? "0px" : "30px",
                border: "1px solid #fecaca",
                boxShadow: "0 2px 8px rgba(206, 0, 54, 0.1)",
            }}
        >
            <h2 style={{ textAlign: "left" }}>{title}</h2>
            <h4 style={{ color: "grey", fontSize: "1.4em" }}>{subtitle}</h4>
            {image !== ""  && (
            <img
                style={{
                    paddingTop: "1vw",
                    paddingBottom: "1vw",
                    width: "40vw",
                }}
                src={image}
            />
            )}
            <p>{content}</p>
            <Link to={link}>
                <button className="coolBeans">Learn more</button>
            </Link>
        </div>
    );
};

export default Preview;
