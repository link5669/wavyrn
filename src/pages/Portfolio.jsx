import React from "react";
import MusicCarousel from "../components/Carousel/MusicCarousel";
import WavNavbar from "../components/Navbar/Navbar";
import "./Portfolio.css";
import ProjectImage from "../components/ProjectImage";
import { useState, useEffect, useRef } from "react";
import projects from "../utilities/projects";
import albums from "../utilities/albums";
import sfx from "../utilities/SFX";

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
    const [isVisible, setIsVisible] = useState(false);
    const [buttons, setButtons] = useState(initializeButtons());

    const getRandomSfx = () => {
        const usedNames = buttons.map((btn) => btn.text);
        return getUniqueRandomSfx(usedNames);
    };

    const handleButtonClick = (id) => {
        const button = buttons.find((btn) => btn.id === id);

        const sfxItem = sfx.find((item) => item.name === button.text);
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
    }, []);

    return (
        <div
            className={`portfolio-container  ${isVisible ? "fade-in" : "fade-in-initial"}`}
        >
            <div className={`navbar-fade-in ${isVisible ? "visible" : ""}`}>
                <WavNavbar showLogo={true} />
            </div>{" "}
            <div
                className={`content-wrapper ${isVisible ? "fade-in" : ""}`}
                style={{
                    position: "relative",
                    margin: "0 auto",
                    minHeight: "100vh",
                    paddingTop: "80px",
                }}
            >
                <br />
                <br />
                <section
                    style={{
                        height: title === "Arcade" && "20vh",
                        alignContent: "center",
                    }}
                >
                    <div
                        style={{
                            marginBottom: "2vh",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <iframe
                            width="450"
                            height="270"
                            src="https://www.youtube.com/embed/ScMzIvxBSi4?si=G86GQMe5uwhv60k5"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                            style={{ padding: "2vh" }}
                        ></iframe>
                    </div>
                </section>
                <br />
                <section
                    style={{ backgroundColor: title === "Arcade" && "#3FD49B" }}
                >
                    <div style={{ width: "60vw", margin: "auto" }}>
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
                    </div>
                </section>
                <br />
                <br />
                <section style={{ color: "white" }}>
                    <div className="sfx-container">
                        {buttons.slice(0, 4).map((button) => (
                            <span
                                key={button.id}
                                className={`sfx-button ${button.visible ? "" : "fade-out"} ${button.shake ? "shake" : ""}`}
                                data-text={button.text}
                                onClick={() => handleButtonClick(button.id)}
                            >
                                <b data-text={button.name}>{button.text}</b>
                            </span>
                        ))}
                    </div>
                </section>
                <br />
                <section style={{ color: "white" }}>
                    <div className="sfx-container">
                        {buttons.slice(4, 8).map((button) => (
                            <span
                                key={button.id}
                                className={`sfx-button ${button.visible ? "" : "fade-out"} ${button.shake ? "shake" : ""}`}
                                data-text={button.text}
                                onClick={() => handleButtonClick(button.id)}
                            >
                                <b>{button.text}</b>
                            </span>
                        ))}
                    </div>
                </section>
                <br />
                <br />
                <h2 style={{ fontFamily: "Montserrat", color: "white" }}>
                    Portfolio
                </h2>
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
                            {!isMobile && (index + 1) % 6 === 0 && (
                                <div
                                    style={{ flexBasis: "100%", height: 0 }}
                                ></div>
                            )}
                            {isMobile && (index + 1) % 2 === 0 && (
                                <div
                                    style={{ flexBasis: "100%", height: 0 }}
                                ></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <hr style={dividerStyle} />
            </div>
        </div>
    );
}

export default Portfolio;
