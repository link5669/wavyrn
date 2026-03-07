import React from "react";
import MusicCarousel from "../../components/Carousel/MobileCarousel/MobileCarousel";
import WavNavbar from "../../components/Navbar/MobileNavbar/MobileNavbar";
import "./MobilePortfolio.css";
import ProjectImage from "../../components/ProjectImageMobile";
import { MdDownloading } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import BottomSection from "../../components/BottomSection/BottomSection";
import sfx from "../../utilities/SFX";
import projects from "../../utilities/projects";
import { useTranslation } from "../../hooks/useTranslation";

const getUniqueRandomSfx = (existingNames = []) => {
  const availableSfx = sfx.filter((s) => !existingNames.includes(s.name));
  if (availableSfx.length === 0)
    throw new Error("No more unique SFX available");
  return availableSfx[Math.floor(Math.random() * availableSfx.length)];
};

const initializeButtons = () => {
  const buttons = [];
  const usedNames = new Set();

  for (let i = 1; i <= 8; i++) {
    const sfx = getUniqueRandomSfx([...usedNames]);
    usedNames.add(sfx.name);
    buttons.push({
      id: i,
      text: sfx.name,
      visible: true,
      shake: false,
    });
  }

  return buttons;
};

function Portfolio({ title, dividerStyle, isMobile }) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [buttons, setButtons] = useState(initializeButtons());
  const [scrollY, setScrollY] = useState(0);
  const [albums, setAlbums] = useState([]);
  const [loadingAlbums, setLoadingAlbums] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate the font size based on scroll position
  const initialFontSize = 1.5; // Smaller initial size (e.g., 1.5em)
  const targetFontSize = 2.3; // Same size as Portfolio (e.g., 2.3em)
  const fontSize = Math.min(
    initialFontSize + (scrollY / 100) * (targetFontSize - initialFontSize),
    targetFontSize,
  );

  const initialFontWeight = 400; // Normal weight
  const targetFontWeight = 700; // Bold weight
  const fontWeight = Math.min(
    initialFontWeight +
      (scrollY / 100) * (targetFontWeight - initialFontWeight),
    targetFontWeight,
  );

  const getRandomSfx = () => {
    const usedNames = buttons.map((btn) => btn.text);
    return getUniqueRandomSfx(usedNames);
  };
  const [preloadedAudio, setPreloadedAudio] = useState({});

  // Add this useEffect to preload all sounds when the component mounts
  useEffect(() => {
    const audioMap = {};
    sfx.forEach((item) => {
      const audio = new Audio(item.link);
      // Setting preload attribute to auto encourages the browser to load the audio immediately
      audio.preload = "auto";
      audioMap[item.name] = audio;
    });
    setPreloadedAudio(audioMap);
  }, []);

  // Then modify your handleButtonClick function to use the preloaded audio
  const handleButtonClick = (id) => {
    const button = buttons.find((btn) => btn.id === id);

    // Use the preloaded audio instance instead of creating a new one
    if (preloadedAudio[button.text]) {
      // Reset the audio to the beginning in case it was played before
      preloadedAudio[button.text].currentTime = 0;
      preloadedAudio[button.text].play();
    }

    setButtons((prevButtons) =>
      prevButtons.map((btn) =>
        btn.id === id ? { ...btn, visible: false } : btn,
      ),
    );

    setTimeout(() => {
      const newSfx = getRandomSfx();
      setButtons((prevButtons) =>
        prevButtons.map((btn) =>
          btn.id === id
            ? {
                ...btn,
                text: newSfx.name,
                visible: true,
              }
            : btn,
        ),
      );
    }, 2000);
  };
  useEffect(() => {
    const shakeInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * buttons.length);
      setButtons((prevButtons) =>
        prevButtons.map((btn, index) =>
          index === randomIndex ? { ...btn, shake: true } : btn,
        ),
      );

      // Reset the shake after the animation duration
      setTimeout(() => {
        setButtons((prevButtons) =>
          prevButtons.map((btn) => ({ ...btn, shake: false })),
        );
      }, 500); // Shake duration
    }, 2000); // Shake every 3 seconds

    return () => clearInterval(shakeInterval);
  }, [buttons.length]);

  useEffect(() => {
    setIsVisible(true);
    let contactVal = searchParams.get("contact");
    if (contactVal == null) return;
    setShowPopup(true);
    setFile(contactVal.toLowerCase());
    switch (contactVal) {
      case "Marc":
        setName("Marc Yu");
        break;
      case "Ananta":
        setName("Ananta Arora");
        break;
      case "Zionna":
        setName("Zionna Brown");
        break;
      case "Neil":
        setName("Neil Small");
        break;
      case "Michelle":
        setName("Michelle Lai");
        break;
      case "Quinne":
        setName("Quinne Houck");
        break;
      case "Caleb":
        setName("Caleb Skelly");
        break;
      case "Angelica":
        setName("Angelica Ramos");
        break;
      case "Austinl":
        setName("Austin Leshock");
        break;
      case "Josh":
        setName("Josh Trochet");
        break;
      case "Julian":
        setName("Julian Cabrera");
        break;
      case "Max":
        setName("Max Jaime");
        break;
      case "Sam":
        setName("Sam Rindfuss");
        break;
    }
  }, []);

  useEffect(() => {
    setIsVisible(true);
    setLoadingAlbums(true);
    try {
      const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL || "https://wavyrn-backend-6f7b3a192f6c.herokuapp.com";
      console.log("Fetching albums from:", backendUrl + "/api/albums");
      fetch(backendUrl + "/api/albums").then((r) => {
        r.json().then((d) => {
          console.log("Albums response:", r.ok, d);
          if (r.ok) {
            setAlbums(d.albums);
            console.log("Albums set:", d.albums);
          } else {
            console.error("Failed to fetch albums:", d.error);
          }
        });
      });
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoadingAlbums(false);
    }
  }, []);

  return (
    <div
      className={`portfolio-container mobile-page-container ${isVisible ? "fade-in" : "fade-in-initial"}`}
      style={{ backgroundColor: "#CE0036" }}
    >
      <div className={`navbar-fade-in ${isVisible ? "visible" : ""}`}>
        <WavNavbar showLogo={true} />
      </div>
      <div
        className={`content-wrapper ${isVisible ? "fade-in" : ""}`}
        style={{
          position: "relative",
          margin: "0 auto",
          minHeight: "100vh",
          // paddingBottom: "50px",
        }}
      >
        {/* <br /> */}
        <h1
          style={{
            color: "white",
            fontSize: "2em",
            paddingBottom: "0%",
            paddingTop: "20px",
          }}
        >
          <p>{t('portfolio.ourWork')}</p>
        </h1>
        <section
          style={{
            height: title === "Arcade" && "20vh",
            alignContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <iframe
              width="300"
              height="200"
              src="https://www.youtube.com/embed/GuOGbvwdMWk?si=f0lxC3rxtVjBykuK"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ padding: "1vh" }}
            ></iframe>
          </div>
        </section>
        <br />
        {/* <h2
          style={{
            fontFamily: "Quicksand",
            color: "white",
            fontSize: `${fontSize}em`, // Dynamic font size
            fontWeight: fontWeight, // Dynamic font weight
            transition:
              "font-size 0.3s ease-in-out, font-weight 0.3s ease-in-out", // Smooth transition
          }}
        >
          Our WorkOu
        </h2>*/}
        {/* <hr
          style={{
            display: "block",
            height: "3px",
            border: 0,
            borderTop: "1px solid #ffffff",
            margin: "1em 0",
            marginLeft: "35%",
            marginRight: "35%",
            opacity: 100,
          }}
        />*/}
        <section style={{ backgroundColor: title === "Arcade" && "#3FD49B" }}>
          {console.log("Albums length:", albums?.length, "Albums:", albums)}
          {albums && albums.length > 0 && (
            <MusicCarousel
              albums={albums}
              buttonStyle={{
                backgroundColor: "white",
                padding: "10px",
                color: "black",
                borderRadius: "15px",
                cursor: "pointer",
              }}
              portfolio={true}
            />
          )}
          {loadingAlbums && (
            <div style={{ color: "white", textAlign: "center", padding: "20px" }}>
              Loading albums...
            </div>
          )}
          {!loadingAlbums && (!albums || albums.length === 0) && (
            <div style={{ color: "white", textAlign: "center", padding: "20px" }}>
              {/* No albums available */}
            </div>
          )}
        </section>
        <br />
        <br />
        <section style={{ color: "white" }}>
          <div className="sfx-containera">
            {buttons.slice(0, 4).map((button) => (
              <span
                key={button.id}
                className={`sfx-buttona ${button.visible ? "" : "fade-out"} ${button.shake ? "shake" : ""}`}
                data-text={button.dataText}
                onClick={() => handleButtonClick(button.id)}
              >
                <b>{button.text}</b>
              </span>
            ))}
          </div>
        </section>
        <section style={{ color: "white" }}>
          <div className="sfx-containera">
            {buttons.slice(4, 8).map((button) => (
              <span
                key={button.id}
                className={`sfx-buttona ${button.visible ? "" : "fade-out"} ${button.shake ? "shake" : ""}`}
                // data-text={button.text}
                onClick={() => handleButtonClick(button.id)}
              >
                <b>{button.text}</b>
              </span>
            ))}
          </div>
        </section>
        <br />
        <h2 style={{ fontFamily: "Quicksand", color: "white" }}>{t('nav.portfolio')}</h2>
        <hr
          style={{
            display: "block",
            height: "3px",
            border: 0,
            borderTop: "1px solid #ffffff",
            margin: "1em 0",
            marginLeft: "35%",
            marginRight: "35%",
            opacity: 100,
          }}
        />
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
            paddingTop: isMobile ? "4%" : "2%",
            paddingLeft: isMobile ? "5%" : "10%",
            paddingRight: isMobile ? "5%" : "10%",
            paddingBottom: "2%",
          }}
        >
          {projects.map((project, index) => (
            <React.Fragment key={index}>
              <ProjectImage
                subtitle={project.subtitle}
                imgSrc={project.imgSrc}
                title={project.title}
              />
              {isMobile && (index + 1) % 3 === 0 && (
                <div style={{ flexBasis: "100%", height: 0 }}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <hr style={dividerStyle} />
        {showPopup && (
          <>
            {/* Gray Overlay */}
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent gray
                zIndex: 999, // Below the popup but above everything else
              }}
              onClick={handleClosePopup} // Close popup when overlay is clicked
            ></div>

            {/* Popup */}
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "20px",
                width: "300px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 1000, // Above the overlay
              }}
            >
              <button
                onClick={handleClosePopup}
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "0px",
                  background: "none",
                  border: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                X
              </button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5%",
                }}
              >
                <a
                  href={`https://link5669.github.io/wavyrn-media/contacts/${file}.vcf`}
                  download
                >
                  <MdDownloading
                    style={{
                      width: "45px",
                      height: "45px",
                      viewBox: "0 0 24 24",
                    }}
                  />
                </a>
                <span>Download {name}'s contact!</span>
              </div>
            </div>
          </>
        )}
      </div>
      <BottomSection />
    </div>
  );
}

export default Portfolio;
