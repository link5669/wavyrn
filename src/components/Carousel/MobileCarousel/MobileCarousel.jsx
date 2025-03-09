import React, { useState, useRef, useEffect } from "react";
import "./mobilecarousel.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FaPlay, FaPause } from "react-icons/fa6";

const MusicCarousel = ({ buttonStyle, albums, portfolio = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const audioRef = useRef(null);
    const carouselRef = useRef(null);

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            handleRightClick();
        }

        if (touchStart - touchEnd < -75) {
            handleLeftClick();
        }
    };

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
    const getVisibleAlbums = () => {
        const prevIndex = (currentIndex - 1 + albums.length) % albums.length;
        const nextIndex = (currentIndex + 1) % albums.length;
        return [albums[prevIndex], albums[currentIndex], albums[nextIndex]];
    };

    return (
        <div
            className="mobile-carousel-container"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="mobile-carousel">
                <div className="mobile-carousel-track" ref={parent}>
                    {getVisibleAlbums().map((album, index) => {
                        let imageStyle = {};
                        let containerStyle = {
                            width: "200px",
                            height: "200px",
                            overflow: "hidden",
                        };

                        if (index === 0) {
                            imageStyle = {
                                marginLeft: "-50%",
                                width: "200%",
                            };
                        } else if (index === 2) {
                            imageStyle = {
                                marginRight: "-50%",
                                width: "200%",
                            };
                        }

                        return (
                            <div
                                key={album.id}
                                style={{
                                    filter:
                                        index !== 1
                                            ? "brightness(60%)"
                                            : "brightness(100%)",
                                }}
                            >
                                <div
                                    className={`mobile-carousel-item ${index === 1 ? "center" : "side"}`}
                                    style={containerStyle}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (index !== 1) {
                                            if (index === 0) handleLeftClick();
                                            if (index === 2) handleRightClick();
                                        }
                                    }}
                                >
                                    <img
                                        src={album.coverUrl}
                                        style={imageStyle}
                                    />
                                </div>

                                <div
                                    style={{
                                        ...buttonStyle,
                                        padding: "10px",
                                        marginTop: "10px",
                                        borderRadius: "5px",
                                        alignItems: "center",
                                        gap: "10px",
                                        width: "200px",
                                        display: "flex",
                                        opacity: index != 1 ? "0" : "1",
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
                                                if (index === 0)
                                                    handleLeftClick();
                                                if (index === 2)
                                                    handleRightClick();
                                                setTimeout(() => {
                                                    handlePlayPause(
                                                        currentIndex +
                                                            index -
                                                            1,
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
                                            backgroundColor: "#222",
                                            color: "#888",
                                            cursor: "pointer",
                                            width: "30px",
                                            height: "30px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: "15px",
                                        }}
                                    >
                                        {isPlaying && index === 1 ? (
                                            <FaPause />
                                        ) : (
                                            <FaPlay />
                                        )}
                                    </button>
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            color: "black",
                                        }}
                                    >
                                        {album.title}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MusicCarousel;
