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

    const audioCache = useRef({});

    // Preload all audio files on component mount
    useEffect(() => {
        const preloadAllTracks = async () => {
            try {
                // Create promises for all audio tracks
                const preloadPromises = albums.map((album) => {
                    return loadAudio(album.track)
                        .then((audio) => {
                            audioCache.current[album.track] = audio;
                            console.log(`Preloaded: ${album.title}`);
                        })
                        .catch((err) => {
                            console.error(
                                `Failed to preload ${album.title}:`,
                                err,
                            );
                        });
                });

                // Wait for all tracks to be preloaded
                await Promise.all(preloadPromises);
                console.log("All tracks preloaded");
            } catch (error) {
                console.error("Error preloading tracks:", error);
            }
        };

        preloadAllTracks();

        // Initialize with first track
        loadAudio(albums[currentIndex].track).then((audio) => {
            audioRef.current = audio;
        });

        // Cleanup on unmount
        return () => {
            // Clean up all cached audio elements
            Object.values(audioCache.current).forEach((audio) => {
                audio.pause();
                audio.src = "";
            });
            audioCache.current = {};
        };
    }, []);

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

    const loadAudio = (src) => {
        // If already in cache, return it
        if (audioCache.current[src]) {
            return Promise.resolve(audioCache.current[src]);
        }

        // Otherwise load it and add to cache
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.addEventListener(
                "canplaythrough",
                () => {
                    audioCache.current[src] = audio;
                    resolve(audio);
                },
                { once: true },
            );
            audio.addEventListener(
                "error",
                (e) => {
                    console.error(`Error loading audio ${src}:`, e);
                    reject(e);
                },
                { once: true },
            );
            audio.preload = "auto";
            audio.src = src;
            audio.load();
        });
    };

    const playTrack = async (index, shouldPlay = isPlaying) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;

            // Remove event listeners from previous track
            audioRef.current.onended = null;
        }

        try {
            const trackSrc = albums[index].track;

            // Get from cache or load
            audioRef.current = await loadAudio(trackSrc);

            // Reset to beginning
            audioRef.current.currentTime = 0;

            // Set up ended event
            audioRef.current.onended = () => {
                // Auto-advance based on last swipe direction
                if (lastSwipeDirection === "right") {
                    // Move to next track
                    setCurrentIndex((prevIndex) => {
                        const next = (prevIndex + 1) % albums.length;
                        playTrack(next, true); // Always play next track
                        return next;
                    });
                } else {
                    // Move to previous track
                    setCurrentIndex((prevIndex) => {
                        const prev =
                            prevIndex === 0 ? albums.length - 1 : prevIndex - 1;
                        playTrack(prev, true); // Always play previous track
                        return prev;
                    });
                }
            };

            // Play the audio based on the shouldPlay parameter
            if (shouldPlay) {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (playError) {
                    console.error("Failed to play audio:", playError);

                    // iOS Safari workaround - try playing on next tick
                    setTimeout(async () => {
                        try {
                            await audioRef.current.play();
                            setIsPlaying(true);
                        } catch (retryError) {
                            console.error("Retry play failed:", retryError);
                            setIsPlaying(false);
                        }
                    }, 100);
                }
            } else {
                setIsPlaying(false);
            }
        } catch (e) {
            console.error("Audio loading/playing error:", e);
            setIsPlaying(false);
        }
    };

    const handleLeftClick = () => {
        const wasPlaying = isPlaying;
        setCurrentIndex((prevIndex) => {
            const prev = prevIndex === 0 ? albums.length - 1 : prevIndex - 1;
            playTrack(prev, wasPlaying); // Pass the current playing state
            return prev;
        });
    };

    const handleRightClick = () => {
        const wasPlaying = isPlaying;
        setCurrentIndex((prevIndex) => {
            const next = (prevIndex + 1) % albums.length;
            playTrack(next, wasPlaying); // Pass the current playing state
            return next;
        });
    };

    const handlePlayPause = async () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (e) {
                console.error("PlayPause error:", e);

                // iOS Safari specific fix - try again after a small delay
                setTimeout(async () => {
                    try {
                        await audioRef.current.play();
                        setIsPlaying(true);
                    } catch (retryError) {
                        console.error("Retry play failed:", retryError);
                    }
                }, 100);
            }
        }
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
