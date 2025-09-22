import React, { useState } from "react";
import "./styles.css"; // Add the CSS below to this file
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRef, useEffect } from "react";

const MusicCarousel = ({ buttonStyle, albums, portfolio = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [arrowPositions, setArrowPositions] = useState({ left: 220, right: 220 });
    const audioRef = useRef(null);
    const carouselRef = useRef(null);
    const albumRefs = useRef([]);

    // Function to calculate arrow positions based on center album
    const calculateArrowPositions = () => {
        if (albumRefs.current.length >= 3) {
            const centerAlbum = albumRefs.current[1];
            
            if (centerAlbum && carouselRef.current) {
                const carouselRect = carouselRef.current.getBoundingClientRect();
                const centerAlbumRect = centerAlbum.getBoundingClientRect();
                
                // Calculate center album position relative to carousel
                const centerLeft = centerAlbumRect.left - carouselRect.left;
                const centerRight = centerAlbumRect.right - carouselRect.left;
                const centerWidth = centerRight - centerLeft;
                
                // Calculate arrow positions to be equidistant from center
                const arrowWidth = 50; // Arrow width (including padding)
                
                // Responsive buffer distance based on screen width
                const screenWidth = window.innerWidth;
                let bufferDistance = 180; // Default buffer
                
                if (screenWidth >= 900 && screenWidth <= 1300) {
                    bufferDistance = 250; // Larger buffer for medium screens
                }
                
                const distanceFromCenter = centerWidth / 2 + bufferDistance;
                
                let leftPosition = centerLeft - distanceFromCenter - arrowWidth;
                let rightPosition = centerRight + distanceFromCenter;
                
                // Ensure arrows don't go outside carousel bounds
                const carouselWidth = carouselRect.width;
                leftPosition = Math.max(leftPosition, 10); // At least 10px from left edge
                rightPosition = Math.min(rightPosition, carouselWidth - arrowWidth - 10); // At least 10px from right edge
                
                setArrowPositions({ left: leftPosition, right: rightPosition });
            }
        }
    };

    // Update arrow positions when component mounts or albums change
    useEffect(() => {
        const timer = setTimeout(calculateArrowPositions, 100);
        return () => clearTimeout(timer);
    }, [currentIndex, albums]);

    // Update arrow positions on window resize
    useEffect(() => {
        const handleResize = () => {
            calculateArrowPositions();
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLeftClick = () => {
        const newIndex = currentIndex === 0 ? albums.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        
        if (isPlaying) {
            let volume = audioRef.current.volume;
            const fadeOutInterval = setInterval(() => {
                if (volume > 0.1) {
                    volume -= 0.1;
                    audioRef.current.volume = volume;
                } else {
                    clearInterval(fadeOutInterval);
                    audioRef.current = new Audio(albums[newIndex].track);
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
        const newIndex = currentIndex === albums.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        
        if (isPlaying) {
            let volume = audioRef.current.volume;
            const fadeOutInterval = setInterval(() => {
                if (volume > 0.1) {
                    volume -= 0.1;
                    audioRef.current.volume = volume;
                } else {
                    clearInterval(fadeOutInterval);
                    audioRef.current = new Audio(albums[newIndex].track);
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
            <div className="carousel" ref={carouselRef}>
                <button 
                    className="arrow left" 
                    onClick={handleLeftClick}
                    style={{
                        left: `${arrowPositions.left}px`
                    }}
                >
                    ‹
                </button>
                <div className="carousel-track" ref={parent}>
                    {getVisibleAlbums().map((album, index) => (
                        <div
                            ref={(el) => {
                                if (el) albumRefs.current[index] = el;
                            }}
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
                                            if (index === 0) {
                                                const newIndex = currentIndex === 0 ? albums.length - 1 : currentIndex - 1;
                                                handleLeftClick();
                                                setTimeout(() => {
                                                    handlePlayPause(newIndex);
                                                }, 300);
                                            }
                                            if (index === 2) {
                                                const newIndex = currentIndex === albums.length - 1 ? 0 : currentIndex + 1;
                                                handleRightClick();
                                                setTimeout(() => {
                                                    handlePlayPause(newIndex);
                                                }, 300);
                                            }
                                        } else {
                                            handlePlayPause(currentIndex);
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
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxWidth: "100%",
                                        display: "block",
                                    }}
                                >
                                    {album.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <button 
                    className="arrow right" 
                    onClick={handleRightClick}
                    style={{
                        left: `${arrowPositions.right}px`,
                        right: 'auto'
                    }}
                >
                    ›
                </button>
            </div>
        </div>
    );
};

export default MusicCarousel;
