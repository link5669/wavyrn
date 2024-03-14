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
      <div style={{ minHeight: "100vh" }}>
        {isMobile ? (
          <div style={{ backgroundColor: "#CE0035", height: '50vh' }} />
        ) : (
          <img
            src={bg}
            style={{
              width: "100%",
            }}
            className={animateImg ? "animateImg" : ""}
            onClick={handleClick}
            onAnimationEnd={handleAnimationEnd}
          />
        )}

        <h1
          style={{
            zIndex: 200,
            position: "absolute",
            top: isMobile ? "17vh" : "30vh",
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
            <i>Learn more</i>{" "}
            <svg
              fill="white"
              height={isMobile ? "30px" : "80px"}
              width="80px"
              viewBox="0 0 330 330"
              xml:space="preserve"
              transform="scale(-1, 1)"
            >
              <path
                id="XMLID_18_"
                d="M315,150l-247.5,0.001V127.5c0-6.067-3.655-11.537-9.26-13.858c-5.607-2.322-12.058-1.038-16.347,3.252  l-37.5,37.5c-5.858,5.858-5.858,15.355,0,21.213l37.5,37.5c2.87,2.87,6.706,4.394,10.61,4.394c1.932,0,3.881-0.374,5.737-1.142  c5.605-2.322,9.26-7.791,9.26-13.858v-22.499L315,180c8.284,0,15-6.716,15-15C330,156.716,323.284,150,315,150z"
              />
            </svg>
          </span>
        </h1>
        {isMobile && (
          <img
            src={bg}
            style={{
              height: '50%',
              width: "100%",
            }}
            className={animateImg ? "animateImg" : ""}
            onClick={handleClick}
            onAnimationEnd={handleAnimationEnd}
          />
        )}
        <footer
          style={{
            backgroundColor: "black",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50px", // Adjust height as needed
          }}
        >
          <p
            style={{ color: "white", textAlign: "center", lineHeight: "50px" }}
          >
            ©️2024 .wavyrn • All Rights Reserved
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;
