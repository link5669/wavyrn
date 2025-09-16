import React from "react";
import MusicCarousel from "../components/Carousel/MusicCarousel";
import WavNavbar from "../components/Navbar/Navbar";
import "./Portfolio.css";
import ProjectImage from "../components/ProjectImage";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "../hooks/useTranslation";

function Portfolio({ title, dividerStyle, isMobile }) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [allSfx, setAllSfx] = useState([]);
  const [loadingSfx, setLoadingSfx] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);

  const getUniqueRandomSfx = (existingNames = [], sfx) => {
    const availableSfx = sfx.filter((s) => !existingNames.includes(s.name));
    if (availableSfx.length === 0)
      throw new Error("No more unique SFX available");
    return availableSfx[Math.floor(Math.random() * availableSfx.length)];
  };

  const initializeButtons = () => {
    if (allSfx.length === 0) return;
    const buttons = [];
    const usedNames = new Set();

    for (let i = 1; i <= 8; i++) {
      const sfx = getUniqueRandomSfx([...usedNames], allSfx);
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

  const getRandomSfx = () => {
    const usedNames = buttons.map((btn) => btn.text);
    return getUniqueRandomSfx(usedNames, allSfx);
  };

  useEffect(() => {
    if (allSfx.length > 0) setButtons(initializeButtons());
  }, [allSfx]);

  const handleButtonClick = (id) => {
    if (allSfx.length === 0) return;
    const button = buttons.find((btn) => btn.id === id);

    const sfxItem = allSfx.find((item) => item.name === button.text);
    if (sfxItem) {
      const audio = new Audio(sfxItem.link);
      audio.play();
    }

    setButtons((prevButtons) =>
      prevButtons.map((btn) =>
        btn.id === id ? { ...btn, visible: false } : btn,
      ),
    );

    setTimeout(() => {
      setButtons((prevButtons) =>
        prevButtons.map((btn) =>
          btn.id === id
            ? {
                ...btn,
                text: getRandomSfx().name,
                visible: true,
              }
            : btn,
        ),
      );
    }, 1000);
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
    }, 3000); // Shake every 3 seconds

    return () => clearInterval(shakeInterval);
  }, [buttons.length]);

  useEffect(() => {
    setIsVisible(true);
    setLoadingAlbums(true);
    try {
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/albums`).then((r) => {
        r.json().then((d) => {
          console.log(r.ok);
          if (r.ok) {
            setAlbums(d.albums);
            console.log(d.albums);
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

    setLoadingSfx(true);
    try {
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/soundEffects`).then((r) => {
        r.json().then((d) => {
          console.log(d);
          if (r.ok) {
            setAllSfx(d.soundEffects);
          } else {
            console.error("Failed to fetch sfx:", d.error);
          }
        });
      });
    } catch (error) {
      console.error("Error fetching sfx:", error);
    } finally {
      setLoadingSfx(false);
    }

    setLoadingSfx(true);
    try {
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/soundEffects`).then((r) => {
        r.json().then((d) => {
          console.log(d);
          if (r.ok) {
            setAllSfx(d.soundEffects);
          } else {
            console.error("Failed to fetch sfx:", d.error);
          }
        });
      });
    } catch (error) {
      console.error("Error fetching sfx:", error);
    } finally {
      setLoadingSfx(false);
    }

    setLoadingPortfolio(true);
    try {
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/portfolio`).then((r) => {
        r.json().then((d) => {
          console.log(d);
          if (r.ok) {
            setPortfolioImages(d.portfolioImages);
          } else {
            console.error("Failed to fetch portfolio images:", d.error);
          }
        });
      });
    } catch (error) {
      console.error("Error fetching portfolio images:", error);
    } finally {
      setLoadingPortfolio(false);
    }
  }, []);

  useEffect(() => {
    console.log(albums[0]);
  }, [albums]);

  return (
    <div
      className={`portfolio-container ${isVisible ? "fade-in" : "fade-in-initial"}`}
    >
      <div className={`navbar-fade-in ${isVisible ? "visible" : ""}`}>
        <WavNavbar showLogo={true} />
      </div>
      
      <div
        className={`content-wrapper ${isVisible ? "fade-in" : ""}`}
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          paddingTop: "80px",
          backgroundColor: "#2a2a2a",
        }}
      >
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">{t('portfolio.heroTitle')}</h1>
            {/* <p className="hero-subtitle">Showcasing creative audio work across games, films, and media</p> */}
            <br/>
            <div className="video-container">
            <iframe
              width="450"
              height="270"
              src="https://www.youtube.com/embed/GuOGbvwdMWk?si=f0lxC3rxtVjBykuK"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="portfolio-video"
            ></iframe>
          </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="video-section">
          <div className="section-header">
          <div className="music-container">
            {albums.length > 0 && (
              <MusicCarousel
                albums={albums}
                buttonStyle={{
                  backgroundColor: "#CE0036",
                  padding: "10px",
                  borderRadius: "15px",
                  cursor: "pointer",
                }}
                portfolio={true}
              />
            )}
          </div>
          <div className="sfx-grid">
            {allSfx.length > 0 &&
              buttons.slice(0, 4).map((button) => (
                <button
                  key={button.id}
                  className={`sfx-button ${button.visible ? "" : "fade-out"} ${button.shake ? "shake" : ""}`}
                  data-text={button.text}
                  onClick={() => handleButtonClick(button.id)}
                >
                  <span>{button.text}</span>
                </button>
              ))}
          </div>
          
          <div className="sfx-grid">
            {allSfx.length > 0 &&
              buttons.slice(4, 8).map((button) => (
                <button
                  key={button.id}
                  className={`sfx-button ${button.visible ? "" : "fade-out"} ${button.shake ? "shake" : ""}`}
                  data-text={button.text}
                  onClick={() => handleButtonClick(button.id)}
                >
                  <span>{button.text}</span>
                </button>
              ))}
          </div>
          </div>
          
        </section>

        {/* Portfolio Section */}
        <section className="portfolio-section">
          <div className="section-header">
            <h2 className="section-title">{t('portfolio.ourWork')}</h2>
            {/* <p className="section-subtitle">Explore our diverse portfolio of audio projects</p> */}
            <div className="section-divider"></div>
          </div>
          
          <div className="portfolio-grid">
            {loadingPortfolio ? (
              <div className="loading-skeleton">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="skeleton-item"></div>
                ))}
              </div>
            ) : (
              portfolioImages.length > 0 &&
              portfolioImages.map((project, index) => (
                <div key={index} className="portfolio-item">
                  <ProjectImage
                    subtitle={project.subtitle}
                    imgSrc={project.imgSrc}
                    title={project.title}
                  />
                </div>
              ))
            )}
          </div>
        </section>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 150px 1fr",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "20px",
            paddingBottom: "30px",
            paddingLeft: isMobile ? "5%" : "10%",
            paddingRight: isMobile ? "5%" : "10%",
            maxWidth: "100vw",
            backgroundColor: "black",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifySelf: "end" }}>
            <img
              style={{
                maxHeight: "45px",
                flexShrink: 1,
              }}
              src="/images/logo_red.png"
            />
            <span style={{
              color: "white",
              fontSize: "0.5em",
              marginLeft: "3px",
              marginTop: "-8px",
              verticalAlign: "top",
              lineHeight: "1"
            }}>™</span>
          </div>
          <div></div>
          <p
            style={{
              color: "white",
              margin: 0,
              lineHeight: "50px",
              whiteSpace: "nowrap",
              justifySelf: "start",
            }}
          >
{t('portfolio.copyright')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
