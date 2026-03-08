import React from "react";
import MusicCarousel from "../components/Carousel/MusicCarousel";
import WavNavbar from "../components/Navbar/Navbar";
import DarkOverlay from "../components/DarkOverlay/DarkOverlay";
import TrapezoidFrame from "../components/TrapezoidFrame/TrapezoidFrame";
import "./Portfolio.css";
import ProjectImage from "../components/ProjectImage";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "../hooks/useTranslation";
import Footer from "../components/Footer";

const PORTFOLIO_DEMO_REEL_URL =
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Website%20Assets/Portfolio/Demo%20Reel/2026%20Reel%20v4.0%20MY.mp4?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";
const HERO_TRAPEZOID_WIDTH = 62;

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
  const [heroVideoOpen, setHeroVideoOpen] = useState(false);
  const [animatingSfxId, setAnimatingSfxId] = useState(null);
  const heroVideoRef = useRef(null);
  const heroVideoBackdropRef = useRef(null);
  const heroVideoWrapRef = useRef(null);
  const modalVideoKeyRef = useRef(0);
  const [videoMuted] = useState(true);

  const startModalVideoWithSound = () => {
    const el = heroVideoRef.current;
    if (!el) return;
    el.defaultMuted = false;
    el.muted = false;
    el.volume = 1;
    el.play().catch(() => {});
  };

  const openHeroVideo = () => {
    modalVideoKeyRef.current += 1;
    setHeroVideoOpen(true);
  };

  const closeHeroVideo = () => {
    if (heroVideoRef.current) heroVideoRef.current.pause();
    setHeroVideoOpen(false);
  };

  const SfxWaveformIcon = () => {
    const viewHeight = 14;
    const barWidth = 2.2;
    const gap = 1.4;
    const heights = [2, 5, 9, 6, 4, 7, 10, 7, 4, 6, 9, 5, 2];
    const totalWidth = heights.length * barWidth + (heights.length - 1) * gap;
    return (
      <svg className="sfx-waveform" viewBox={`0 0 ${totalWidth} ${viewHeight}`} fill="currentColor" aria-hidden>
        {heights.map((h, i) => {
          const y = (viewHeight - h) / 2;
          const x = i * (barWidth + gap);
          return (
            <rect
              key={i}
              className={`sfx-bar sfx-bar-${i}`}
              x={x}
              y={y}
              width={barWidth}
              height={h}
              rx="0.5"
            />
          );
        })}
      </svg>
    );
  };

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

    setAnimatingSfxId(id);
    setTimeout(() => setAnimatingSfxId(null), 1000);

    const sfxItem = allSfx.find((item) => item.name === button.text);
    if (sfxItem) {
      const audio = new Audio(sfxItem.link);
      audio.play();
    }

    setTimeout(() => {
      setButtons((prevButtons) =>
        prevButtons.map((btn) =>
          btn.id === id ? { ...btn, visible: false } : btn,
        ),
      );
    }, 1000);

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
    }, 2000);
  };

  useEffect(() => {
    setIsVisible(true);
    setLoadingAlbums(true);
    try {
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/albums`).then((r) => {
        r.json().then((d) => {
          console.log(r.ok);
          if (r.ok) {
            setAlbums(d.albums);
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
  }, []);  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Website%20Assets/Portfolio/Demo%20Reel/2026%20Reel%20v4.0%20MY.mov?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";


  useEffect(() => {
    if (heroVideoOpen) {
      const el = heroVideoBackdropRef.current;
      if (el) {
        requestAnimationFrame(() => {
          el.focus();
          startModalVideoWithSound();
        });
      }
    }
  }, [heroVideoOpen]);

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
          // paddingTop: "80px",
          backgroundColor: "#151515",
        }}
      >
        {/* Hero Section */}
        <section className="portfolio-hero">
          <video
            className="portfolio-hero-bg-video"
            src={PORTFOLIO_DEMO_REEL_URL}
            autoPlay
            loop
            muted={videoMuted}
            playsInlinehttps://www.dropbox.com/scl/fo/tmx340km7moqr280v7if3/h/Website%20Assets/Portfolio/Demo%20Reel/2026%20Reel%20v4.0%20MY.mov?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0
            aria-hidden
            onClick={openHeroVideo}
          />
          <DarkOverlay
            opacity={0.3}
            className="portfolio-hero-overlay"
            onClick={openHeroVideo}
          />
          <TrapezoidFrame
            className="portfolio-hero-trapezoid"
            widthPercent={HERO_TRAPEZOID_WIDTH}
            topWidthPercent={HERO_TRAPEZOID_WIDTH}
          />
          <div className="portfolio-hero-inner">
            <h1 className="portfolio-hero-title">
              {t("portfolio.heroTitleMain")}{" "}
              <span className="portfolio-hero-title-accent">{t("portfolio.heroTitleAccent")}</span>
            </h1>
            {/* Always play icon: opens fullscreen video with sound; independent of background video */}
            <button
              type="button"
              className="portfolio-hero-play"
              onClick={openHeroVideo}
              aria-label="Play video"
            >
              <span className="portfolio-hero-play-icon" aria-hidden />
            </button>
            <p className="portfolio-hero-subtitle"><i>{t("portfolio.heroSubtitle")}</i></p>
          </div>
        </section>

        {/* Separate video instance for modal only (not the hero video); new key each open to avoid autoplay rules. */}
        {heroVideoOpen && (
          <div
            ref={heroVideoBackdropRef}
            className="portfolio-hero-video-backdrop"
            style={{ display: "flex" }}
            onClick={(e) => {
              const wrap = heroVideoWrapRef.current;
              if (!wrap) {
                closeHeroVideo();
                return;
              }
              const path = e.nativeEvent.composedPath?.() ?? [];
              if (path.includes(wrap) || wrap.contains(e.target)) return;
              closeHeroVideo();
            }}
            onKeyDown={(e) => e.key === "Escape" && closeHeroVideo()}
            role="dialog"
            aria-modal="true"
            aria-label="Video"
            tabIndex={0}
          >
            <button
              type="button"
              className="portfolio-hero-video-close"
              onClick={(e) => {
                e.stopPropagation();
                closeHeroVideo();
              }}
              aria-label="Close video"
            >
              ×
            </button>
            <div
              ref={heroVideoWrapRef}
              className="portfolio-hero-video-wrap"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                key={`portfolio-modal-video-${modalVideoKeyRef.current}`}
                ref={heroVideoRef}
                className="portfolio-hero-video"
                src={PORTFOLIO_DEMO_REEL_URL}
                controls
                controlsList="nodownload noplaybackrate noremoteplayback"
                disablePictureInPicture
                autoPlay
                playsInline
                onContextMenu={(e) => e.preventDefault()}
                onCanPlay={startModalVideoWithSound}
                onEnded={() => heroVideoRef.current?.pause()}
              />
            </div>
          </div>
        )}

        {/* Video Section */}
        <section className="video-section">
          <div className="section-header">
            <div className="music-container">
              <div className="portfolio-carousel-header">
                <h2 className="portfolio-carousel-title">{t("portfolio.carouselTitle")}</h2>
                <p className="portfolio-carousel-subtitle">{t("portfolio.carouselSubtitle")}</p>
              </div>
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
                  isMobile={isMobile}
                />
              )}
            </div>
            <div className="sfx-grid">
              {allSfx.length > 0 &&
                buttons.slice(0, 4).map((button) => (
                  <button
                    key={button.id}
                    type="button"
                    className={`sfx-button ${button.visible ? "" : "fade-out"} ${button.shake ? "shake" : ""} ${animatingSfxId === button.id ? "waveform-animate" : ""}`}
                    data-text={button.text}
                    onClick={() => handleButtonClick(button.id)}
                  >
                    <span className="sfx-waveform-wrap">
                      <SfxWaveformIcon />
                    </span>
                    <span className="sfx-button-label">{button.text}</span>
                  </button>
                ))}
            </div>

            <div className="sfx-grid">
              {allSfx.length > 0 &&
                buttons.slice(4, 8).map((button) => (
                  <button
                    key={button.id}
                    type="button"
                    className={`sfx-button ${button.visible ? "" : "fade-out"} ${button.shake ? "shake" : ""} ${animatingSfxId === button.id ? "waveform-animate" : ""}`}
                    data-text={button.text}
                    onClick={() => handleButtonClick(button.id)}
                  >
                    <span className="sfx-waveform-wrap">
                      <SfxWaveformIcon />
                    </span>
                    <span className="sfx-button-label">{button.text}</span>
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
            {/* <div className="section-divider"></div> */}
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
        <Footer />
      </div>
    </div>
  );
}

export default Portfolio;
