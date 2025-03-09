import React, { useState } from "react";
import "./styles.css"; // Add the CSS below to this file
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRef, useEffect } from "react";

const MusicCarousel = ({ buttonStyle, albums, portfolio = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? albums.length - 1 : prevIndex - 1,
        );
        if (isPlaying) {
            let volume = audioRef.current.volume;
            const fadeOutInterval = setInterval(() => {
                if (volume > 0.1) {
                    volume -= 0.1;
                    audioRef.current.volume = volume;
                } else {
                    clearInterval(fadeOutInterval);
                    audioRef.current = new Audio(
                        albums[
                            currentIndex === 0
                                ? albums.length - 1
                                : currentIndex - 1
                        ].track,
                    );
                    audioRef.current.addEventListener("ended", () => {
                        setIsPlaying(false);
                    });
                    audioRef.current.play();
                    audioRef.current.volume = 1;
                }
            }, 50);
        }
    };

    const handleRightClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === albums.length - 1 ? 0 : prevIndex + 1,
        );
        if (isPlaying) {
            let volume = audioRef.current.volume;
            const fadeOutInterval = setInterval(() => {
                if (volume > 0.1) {
                    volume -= 0.1;
                    audioRef.current.volume = volume;
                } else {
                    clearInterval(fadeOutInterval);
                    audioRef.current = new Audio(
                        albums[
                            currentIndex === albums.length - 1
                                ? 0
                                : currentIndex + 1
                        ].track,
                    );
                    audioRef.current.addEventListener("ended", () => {
                        setIsPlaying(false);
                    });
                    audioRef.current.play();
                    audioRef.current.volume = 1;
                }
            }, 50);
        }
    };

    const getVisibleAlbums = () => {
        const prevIndex = (currentIndex - 1 + albums.length) % albums.length;
        const nextIndex = (currentIndex + 1) % albums.length;
        return [albums[prevIndex], albums[currentIndex], albums[nextIndex]];
    };

    const [parent, enableAnimations] = useAutoAnimate({
        duration: 200,
        easing: "ease-in",
        disrespectUserMotionPreference: false,
    });

    const handlePlayPause = (playState) => {
        if (isPlaying) {
            let volume = audioRef.current.volume;
            const fadeOutInterval = setInterval(() => {
                if (volume > 0.1) {
                    volume -= 0.1;
                    audioRef.current.volume = volume;
                } else {
                    clearInterval(fadeOutInterval);
                    audioRef.current.pause();
                    audioRef.current.volume = 0;
                    setIsPlaying(false);
                }
            }, 50);
        }
        console.log(playState !== currentIndex);
        if (!isPlaying || playState !== currentIndex) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            console.log(currentIndex);
            audioRef.current = new Audio(albums[playState].track);
            audioRef.current.addEventListener("ended", () => {
                setIsPlaying(false);
            });
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("ended", () => {
                    setIsPlaying(false);
                });
                let volume = audioRef.current.volume;
                const fadeOutInterval = setInterval(() => {
                    if (volume > 0.1) {
                        volume -= 0.1;
                        audioRef.current.volume = volume;
                    } else {
                        clearInterval(fadeOutInterval);
                        audioRef.current.pause();
                    }
                }, 50);
            }
        };
    }, []);

    return (
        <div className="carousel-container">
            <div className="carousel">
                <button className="arrow left" onClick={handleRightClick}>
                    ‹
                </button>
                <div className="carousel-track" ref={parent}>
                    {getVisibleAlbums().map((album, index) => (
                        <div
                            style={{
                                filter:
                                    index !== 1
                                        ? "brightness(60%)"
                                        : "brightness(100%)",
                            }}
                            key={album.id}
                        >
                            <div
                                className={`carousel-item: ${index === 1 ? "center" : "side"}`}
                                style={{
                                    display: "flex",
                                    width: "200px",
                                    height: "200px",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (index !== 1) {
                                        if (index === 0) handleLeftClick();
                                        if (index === 2) handleRightClick();
                                    }
                                }}
                            >
                                <img src={album.coverUrl} />
                            </div>
                            <div
                                style={{
                                    ...buttonStyle,
                                    padding: "10px",
                                    marginTop: "10px",
                                    borderRadius: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    width: "200px",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (index !== 1) {
                                        if (index === 0) handleLeftClick();
                                        if (index === 2) handleRightClick();
                                    }
                                }}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (index !== 1) {
                                            if (index === 0) handleLeftClick();
                                            if (index === 2) handleRightClick();
                                            setTimeout(() => {
                                                handlePlayPause(
                                                    currentIndex + index - 1,
                                                );
                                            }, 300);
                                        } else {
                                            handlePlayPause(
                                                currentIndex + index - 1,
                                            );
                                        }
                                    }}
                                    style={{
                                        padding: "7px",
                                        borderRadius: "50%",
                                        border: "none",
                                        backgroundColor: "#333",
                                        color: "white",
                                        cursor: "pointer",
                                        width: "30px",
                                        height: "30px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "15px",
                                    }}
                                >
                                    {isPlaying && index === 1 ? "❚❚" : "▶"}
                                </button>
                                <span
                                    style={{
                                        fontSize: "14px",
                                        color: portfolio ? "white" : "black",
                                    }}
                                >
                                    {album.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="arrow right" onClick={handleLeftClick}>
                    ›
                </button>
            </div>
        </div>
    );
};

export default MusicCarousel;
