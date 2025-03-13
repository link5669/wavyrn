import React, { useState, useRef, useEffect } from "react";
import "./mobilecarousel.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
    FaPlay,
    FaPause,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa6";

const MusicCarousel = ({ buttonStyle, albums, portfolio = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [lastSwipeDirection, setLastSwipeDirection] = useState("right");
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
            // Swiped left (moves right)
            setLastSwipeDirection("right");
            handleRightClick();
        }

        if (touchStart - touchEnd < -75) {
            // Swiped right (moves left)
            setLastSwipeDirection("left");
            handleLeftClick();
        }
    };

    const [parent, enableAnimations] = useAutoAnimate({
        duration: 100,
        easing: "ease-in",
        disrespectUserMotionPreference: false,
    });

    const playTrack = (index) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        audioRef.current = new Audio(albums[index].track);
        audioRef.current.addEventListener("ended", () => {
            // if (isPlaying) {
            // Auto-advance based on last swipe direction
            if (lastSwipeDirection === "right") {
                // Move to next track
                setCurrentIndex((prevIndex) => {
                    const next = (prevIndex + 1) % albums.length;
                    const newAudio = new Audio(albums[next].track);
                    audioRef.current = newAudio;
                    newAudio.play();
                    return next;
                });
            } else {
                // Move to previous track
                setCurrentIndex((prevIndex) => {
                    const prev =
                        prevIndex === 0 ? albums.length - 1 : prevIndex - 1;
                    const newAudio = new Audio(albums[prev].track);
                    audioRef.current = newAudio;
                    newAudio.play();
                    return prev;
                });
            }
            // Keep isPlaying true when track changes automatically
            setIsPlaying(true);
            // }
        });
        if (isPlaying) {
            audioRef.current.play();
        }
    };

    // Handle left click (previous track)
    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) => {
            const prev = prevIndex === 0 ? albums.length - 1 : prevIndex - 1;
            playTrack(prev);
            return prev;
        });
    };

    // Handle right click (next track)
    const handleRightClick = () => {
        setCurrentIndex((prevIndex) => {
            const next = (prevIndex + 1) % albums.length;
            playTrack(next);
            return next;
        });
    };

    // Handle play/pause button click
    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            if (!audioRef.current) {
                playTrack(currentIndex);
            } else {
                audioRef.current.play();
            }
        }
        setIsPlaying(!isPlaying);
    };

    // Cleanup audio on component unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener("ended", () => {});
            }
        };
    }, []);

    const getVisibleAlbums = () => {
        const prevIndex = (currentIndex - 1 + albums.length) % albums.length;
        const nextIndex = (currentIndex + 1) % albums.length;
        return [albums[prevIndex], albums[currentIndex], albums[nextIndex]];
    };

    return (
        <div className="mobile-carousel-container" ref={carouselRef}>
            <div className="mobile-carousel" style={{ position: "relative" }}>
                <div
                    className="carousel-arrow left-arrow"
                    onClick={handleLeftClick}
                    style={{
                        position: "absolute",
                        // left: "-20px",
                        top: "100px", // Position at the center of album cover which is 200px height
                        zIndex: 10,
                        background: "rgba(0,0,0,0.5)",
                        color: "white",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                >
                    <FaChevronLeft />
                </div>

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
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (index !== 1) {
                                            if (index === 0) {
                                                setLastSwipeDirection("left");
                                                handleLeftClick();
                                            }
                                            if (index === 2) {
                                                setLastSwipeDirection("right");
                                                handleRightClick();
                                            }
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
                                            if (index === 0) {
                                                setLastSwipeDirection("left");
                                                handleLeftClick();
                                            }
                                            if (index === 2) {
                                                setLastSwipeDirection("right");
                                                handleRightClick();
                                            }
                                        } else {
                                            handlePlayPause();
                                        }
                                    }}
                                >
                                    <button
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

                <div
                    className="carousel-arrow right-arrow"
                    onClick={handleRightClick}
                    style={{
                        position: "absolute",
                        right: "0px",
                        top: "100px", // Position at the center of album cover which is 200px height
                        zIndex: 10,
                        background: "rgba(0,0,0,0.5)",
                        color: "white",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                >
                    <FaChevronRight />
                </div>
            </div>
        </div>
    );
};

export default MusicCarousel;
