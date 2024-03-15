import { Link } from "react-router-dom";
import bg from "../../public/images/Home.png";
import { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = ({ isMobile }) => {
  const navigate = useNavigate();
  const [animateImg, setAnimateImg] = useState(false);
  const [animateTxt, setAnimateTxt] = useState(false);

  const handleAnimationEnd = () => {
    navigate("/about-us", { state: { useAnimate: false } });
    setAnimateImg(false); // Remove the animation class after animation ends
  };

  const handleClick = () => {
    setAnimateImg(true);
    setAnimateTxt(true);
    setTimeout(() => {
      handleAnimationEnd();
    }, 1000); // Duration of your animation in milliseconds
  };
  return (
    <>
      <div
        style={{ height: "90vh", overflow: isMobile ? "hidden" : "visible" }}
      >
        {isMobile ? (
          <div
            style={{
              backgroundColor: "#CE0035",
              height: "83vh",
              width: "100vw",
            }}
          >
            <svg
              viewBox="0 0 255 280"
              style={{
                height: "60%",
                margin: "auto",
                display: "block",
                paddingTop: "10%",
                paddingBottom: "5%",
              }}
              fill="white"
            >
              <g xmlns="http://www.w3.org/2000/svg">
                <path d="M139.52,105.27c-9.63,9.37-19.93,18.1-30.65,26.16-1.27.93-3.01-.38-2.46-1.87l3.05-8.01c2.29-6.06,7.08-10.81,13.14-13.14l15.22-5.76c1.61-.6,2.92,1.44,1.69,2.63" />
                <path d="M213.29,208.41c-18.01,21.45-45.61,36.81-69.55,54.59-14.14,10.5-32.5,14.14-49.18,8.48C37.03,251.94-3.63,195.83.26,130.86,4.53,59.47,63.62,2.23,135.1.07c29.49-.89,56.95,7.36,79.85,22.16,2.11,1.36,2.27,4.42.36,6.05-4.68,3.99-9.44,7.9-14.28,11.7-16.91,13.35-34.63,25.69-53.24,37.05-.76.47-1.68-.3-1.36-1.14,2.08-5.55,3.64-11.27,4.62-17.34.25-1.65-1.69-2.71-2.92-1.57-11.11,10.09-22.13,20.01-33.11,30.14-11.4,10.43-16.7,24.8-23.15,35.61-12.85,21.49-38.07,45.49-41.76,19.63-.21-1.48-2.12-1.86-2.84-.59-22.94,41.33-14.71,58.84,17.85,57.44,1.74-.08,2.54-2.21,1.27-3.39-7.42-6.99-9.03-18.7,1.78-20.81,13.69-2.54,22.94,9.92,38.49,6.82,1.48-.3,2.12-2.12,1.1-3.26-16.58-18.11,6.19-27.9,39.98-26.97,1.23.04,1.7,1.61.72,2.37-8.52,6.87-8.48,18.36-8.95,29.76v.04c-.63,15.05-2.21,29.97-25.9,33.66-1.78.25-2.29,2.59-.81,3.56,18.87,12.46,37.56,11.87,56.09-3.48,1.44-1.19.55-3.52-1.36-3.48-13.86.43-11.7-10,1.53-16.62,6.91-3.43,14.03-6.99,19.88-11.78,1.4-1.19.55-3.44-1.23-3.48-14.29-.42-16.79-5.89-10.98-12.76,5.6-6.61,14.37-9.62,23.02-8.95,22.51,1.7,35.7,21.41,13.53,47.95" />
                <path d="M251.31,62.39c-10.04-.19-20.22.53-30.57,2.4-2.01.37-3.42-1.84-2.23-3.49,5.06-7.01,9.79-14.25,14.18-21.72.73-1.24,2.43-1.51,3.47-.51,6.29,6.02,12,12.65,17.07,19.82,1.06,1.5-.08,3.54-1.92,3.51" />
              </g>
            </svg>
            <p
              style={{
                textAlign: "center",
                color: "white",
                paddingBottom: "4%",
                fontSize: "1.7em",
              }}
            >
              Audio made fantastic.
            </p>
            <h2
              onClick={() => navigate("/about-us")}
              style={{ textAlign: "center", color: "white" }}
            >
              About Us
            </h2>
            <h2
              onClick={() => navigate("/services")}
              style={{ textAlign: "center", color: "white" }}
            >
              Services
            </h2>
            <h2
              onClick={() => navigate("/portfolio")}
              style={{ textAlign: "center", color: "white" }}
            >
              Portfolio
            </h2>
            <h2
              onClick={() => navigate("/contact")}
              style={{ textAlign: "center", color: "white" }}
            >
              Contact
            </h2>
          </div>
        ) : (
          <>
            <img
              src={bg}
              style={{
                width: "100%",
              }}
              className={animateImg ? "animateImg" : ""}
              onClick={handleClick}
              onAnimationEnd={handleAnimationEnd}
            />

            <h1
              style={{
                zIndex: 200,
                position: "absolute",
                top: isMobile ? "17vh" : "40vh",
                paddingLeft: "5%",
                fontSize: isMobile ? "6vw" : "5vw",
                color: "white",
                textAlign: "left",
                fontWeight: "SemiBold",
              }}
              onClick={handleClick}
              className={animateTxt ? "animateTxt" : ""}
            >
              Audio made <span style={{ fontStyle: "italic" }}>fantastic.</span>{" "}
              <br />
              <span
                style={{
                  fontSize: ".7em",
                  fontWeight: "lighter",
                  display: "inline-block",
                }}
              >
                <i>Learn more</i>
                {"  "}
                <svg
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill="white"
                  height={isMobile ? "30px" : "80px"}
                  width="50px"
                  viewBox="0 0 24 24"
                  xml:space="preserve"
                >
                  <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                </svg>
              </span>
            </h1>
          </>
        )}
        <footer
          style={{
            backgroundColor: "black",
            bottom: 0,
            left: 0,
            right: 0,
            height: "7vh", // Adjust height as needed
          }}
        >
          <p
            style={{ color: "white", textAlign: "center", lineHeight: "50px" }}
          >
            ©️2024 Wavyrn • All Rights Reserved
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;
