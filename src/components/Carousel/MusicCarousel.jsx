import React, { useState, useRef, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import "./styles.css";

const SLIDE_DURATION_MS = 420;
const SLIDE_EASING = "cubic-bezier(0.33, 1, 0.68, 1)";
const SLOT_WIDTH = 240;
const GAP = 12;
const STEP_PX = SLOT_WIDTH + GAP; // one slot + gap for consistent slide distance
/** Center of slot 2 in track coords (slot 2 = index 2: 2*(240+12) + 120 = 624). */
const CENTER_SLOT_2_PX = 624;

const SIZE_CENTER = 250;
const SIZE_SIDE = 205;

/** During slide: current center shrinks, next/prev grows. Returns size for (slotIndex, slideOffset). */
function getVisualCenterSlot(slideOffset, isMobile) {
    const baseCenter = isMobile ? 3 : 2;
    if (slideOffset === 1) return baseCenter + 1;
    if (slideOffset === -1) return baseCenter - 1;
    return baseCenter;
}

function getSlotSize(slotIndex, slideOffset, isMobile) {
    const centerSize = SIZE_CENTER;
    const sideSize = SIZE_SIDE;
    const centerSlot = getVisualCenterSlot(slideOffset, isMobile);
    return slotIndex === centerSlot ? centerSize : sideSize;
}

/** Which slot is the "center" for styling (play row, brightness). During slide, the incoming album is center. */
function isEffectiveCenter(slotIndex, slideOffset, isMobile) {
    return slotIndex === getVisualCenterSlot(slideOffset, isMobile);
}

const MusicCarousel = ({ buttonStyle, albums, portfolio = false, isMobile = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [slideOffset, setSlideOffset] = useState(0); // 0 = show slots 1,2,3; 1 = show 2,3,4 (after next)
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [skipTransition, setSkipTransition] = useState(false);
    const audioRef = useRef(null);
    const carouselRef = useRef(null);
    const albumRefs = useRef([]);

    /** Five albums for the sliding track: [prev-prev, prev, current, next, next-next] */
    const getFiveAlbums = () => {
        const n = albums.length;
        const idx = (i) => ((currentIndex + i) % n + n) % n;
        return [idx(-2), idx(-1), idx(0), idx(1), idx(2)].map((i) => albums[i]);
    };

    const getPlayIndex = () => {
        const n = albums.length;
        const baseIndex =
            slideOffset === 0
                ? currentIndex
                : slideOffset === 1
                  ? (currentIndex + 1) % n
                  : (currentIndex - 1 + n) % n;
        return isMobile ? (baseIndex + 1) % n : baseIndex;
    };

    const handleLeftClick = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setSlideOffset(-1); // show slots 0,1,2 (slide right)
    };

    const handleRightClick = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setSlideOffset(1); // show slots 2,3,4 (slide left)
    };

    const handleTransitionEnd = (e) => {
        if (e.target !== e.currentTarget || !isTransitioning) return;
        const n = albums.length;
        const nextIndex = slideOffset === 1
            ? (currentIndex + 1) % n
            : (currentIndex - 1 + n) % n;
        setSkipTransition(true);
        setCurrentIndex(nextIndex);
        setSlideOffset(0);
        setIsTransitioning(false);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => setSkipTransition(false));
        });
    };

    useEffect(() => {
        if (slideOffset === 0) return;
        const newIndex = getPlayIndex();
        if (isPlaying && audioRef.current) {
            let volume = audioRef.current.volume;
            const fadeOutInterval = setInterval(() => {
                if (volume > 0.1) {
                    volume -= 0.1;
                    if (audioRef.current) audioRef.current.volume = volume;
                } else {
                    clearInterval(fadeOutInterval);
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                    }
                    const next = new Audio(albums[newIndex].track);
                    next.addEventListener("ended", () => setIsPlaying(false));
                    next.play();
                    next.volume = 1;
                    audioRef.current = next;
                }
            }, 50);
        }
    }, [slideOffset]);

    const fiveAlbums = getFiveAlbums();
    const stepPx = STEP_PX;
    const slotWidth = SLOT_WIDTH;
    const mobileCenterNudgePx = 0;
    const translateX = -(1 + slideOffset) * stepPx + mobileCenterNudgePx;

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleRightClick(),
        onSwipedRight: () => handleLeftClick(),
        preventScrollOnSwipe: true,
        trackMouse: false,
        delta: 50,
        swipeDuration: 500,
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
        if (!isPlaying || playState !== currentIndex) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            audioRef.current = new Audio(albums[playState].track);
            audioRef.current.addEventListener("ended", () => {
                setIsPlaying(false);
            });
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

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
                    aria-label="Previous"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <div className="carousel-viewport" {...(isMobile ? swipeHandlers : {})}>
                    <div className="carousel-edge-fade carousel-edge-fade--left" aria-hidden="true" />
                    <div className="carousel-edge-fade carousel-edge-fade--right" aria-hidden="true" />
                    <div className="carousel-track-scaler">
                    <div
                        className="carousel-track"
                        style={{
                            transform: `translateX(${translateX}px)`,
                            transition: skipTransition ? "none" : `transform ${SLIDE_DURATION_MS}ms ${SLIDE_EASING}`,
                            gap:  GAP,
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {fiveAlbums.map((album, slotIndex) => {
                            const size = getSlotSize(slotIndex, slideOffset, isMobile);
                            const isCenter = isEffectiveCenter(slotIndex, slideOffset, isMobile);
                            const visualCenterSlot = getVisualCenterSlot(slideOffset, isMobile);
                            const centerSize = SIZE_CENTER;
                            const centeredOffsetY = (centerSize - size) / 2;
                            const transitionStyle = skipTransition
                                ? {}
                                : { transition: `width ${SLIDE_DURATION_MS}ms ${SLIDE_EASING}, height ${SLIDE_DURATION_MS}ms ${SLIDE_EASING}, margin-top ${SLIDE_DURATION_MS}ms ${SLIDE_EASING}, filter ${SLIDE_DURATION_MS}ms ${SLIDE_EASING}` };
                            return (
                                <div
                                    key={`${album.id}-${slotIndex}`}
                                    className={`carousel-album-wrap carousel-slot ${isCenter ? "carousel-album-wrap--center" : ""}`}
                                    ref={(el) => {
                                        if (el) albumRefs.current[slotIndex] = el;
                                    }}
                                    style={{
                                        width: slotWidth,
                                        minWidth: slotWidth,
                                        filter: isCenter ? "brightness(100%)" : "brightness(60%)",
                                        marginTop: centeredOffsetY,
                                        ...transitionStyle,
                                    }}
                                >
                                    <div
                                        className="carousel-item__cover"
                                        style={{
                                            width: size,
                                            height: size,
                                            backgroundImage: album.coverUrl ? `url(${album.coverUrl})` : undefined,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundColor: "#222",
                                            borderRadius: isCenter ? 6 : 4,
                                            flexShrink: 0,
                                            cursor: "pointer",
                                            ...transitionStyle,
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (!isCenter) {
                                                if (slotIndex < visualCenterSlot) handleLeftClick();
                                                if (slotIndex > visualCenterSlot) handleRightClick();
                                            }
                                        }}
                                    />
                                    {isCenter && (() => {
                                        const playIndex = getPlayIndex();
                                        return (
                                        <div
                                            className="carousel-item__play-row"
                                            style={{
                                                width: isMobile ? 330 : size,
                                                maxWidth: isMobile ? "none" : "100%",
                                                ...transitionStyle,
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                type="button"
                                                className="carousel-item__play-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePlayPause(playIndex);
                                                }}
                                            >
                                                {isPlaying ? (
                                                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                                                ) : (
                                                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M8 5v14l11-7z" /></svg>
                                                )}
                                            </button>
                                            <span className="carousel-item__play-title">{album.title}</span>
                                        </div>
                                        );
                                    })()}
                                </div>
                            );
                        })}
                    </div>
                    </div>
                </div>
                <button 
                    className="arrow right" 
                    onClick={handleRightClick}
                    aria-label="Next"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default MusicCarousel;
