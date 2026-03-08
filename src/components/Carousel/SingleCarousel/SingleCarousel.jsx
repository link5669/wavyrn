import React, { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import "./SingleCarousel.css";

const TRANSITION_MS = 500;
const SWIPE_THROTTLE_MS = 700;

const Carousel = ({ items }) => {
    const n = items.length;
    const [currentIndex, setCurrentIndex] = useState(1);
    const [skipTransition, setSkipTransition] = useState(false);
    const lastSwipeTimeRef = useRef(0);

    const extendedItems = n > 0 ? [items[n - 1], ...items, items[0]] : [];

    const throttle = () => {
        const now = Date.now();
        if (now - lastSwipeTimeRef.current < SWIPE_THROTTLE_MS) return true;
        lastSwipeTimeRef.current = now;
        return false;
    };

    const handleTransitionEnd = (e) => {
        if (e.target !== e.currentTarget) return;
        if (currentIndex === 0) {
            setSkipTransition(true);
            setCurrentIndex(n);
            requestAnimationFrame(() => requestAnimationFrame(() => setSkipTransition(false)));
        } else if (currentIndex === extendedItems.length - 1) {
            setSkipTransition(true);
            setCurrentIndex(1);
            requestAnimationFrame(() => requestAnimationFrame(() => setSkipTransition(false)));
        }
    };

    const goToNext = () => {
        if (throttle() || n === 0) return;
        setCurrentIndex((prev) => prev + 1);
    };

    const goToPrevious = () => {
        if (throttle() || n === 0) return;
        setCurrentIndex((prev) => prev - 1);
    };

    const goToSlide = (index) => {
        if (Date.now() - lastSwipeTimeRef.current < SWIPE_THROTTLE_MS) return;
        lastSwipeTimeRef.current = Date.now();
        if (index >= 0 && index < n) setCurrentIndex(index + 1);
    };

    const logicalIndex = n > 0 ? (currentIndex - 1 + n) % n : 0;

    const handlers = useSwipeable({
        onSwipedLeft: () => goToNext(),
        onSwipedRight: () => goToPrevious(),
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackMouse: false,
    });

    if (extendedItems.length === 0) return null;

    return (
        <div
            className="single-carousel-root"
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "100vw",
                overflow: "hidden",
                margin: "0 auto",
            }}
            {...handlers}
        >
            <button
                type="button"
                className="single-carousel-arrow single-carousel-arrow-left"
                style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: "10px",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "none",
                    color: "white",
                    fontSize: "18px",
                    cursor: "pointer",
                    padding: "12px",
                    zIndex: 10,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
                onClick={goToPrevious}
                aria-label="Previous"
            >
                <FaChevronLeft />
            </button>
            <div className="single-carousel-viewport" style={{ width: "100%", overflow: "hidden" }}>
                <div
                    className="single-carousel-track"
                    style={{
                        display: "flex",
                        transition: skipTransition ? "none" : `transform ${TRANSITION_MS}ms ease-in-out`,
                        transform: `translateX(-${currentIndex * 100}%)`,
                        WebkitFontSmoothing: "antialiased",
                        WebkitBackfaceVisibility: "hidden",
                        backfaceVisibility: "hidden",
                        willChange: "transform",
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {extendedItems.map((item, index) => (
                        <div
                            key={index}
                            className="single-carousel-slide"
                            style={{
                                flex: "0 0 100%",
                                width: "100%",
                                boxSizing: "border-box",
                                paddingTop: "2%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                minHeight: "500px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                borderRadius: "12px",
                                color: "white",
                                WebkitFontSmoothing: "antialiased",
                                WebkitBackfaceVisibility: "hidden",
                                backfaceVisibility: "hidden",
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <button
                type="button"
                className="single-carousel-arrow single-carousel-arrow-right"
                style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    right: "10px",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "none",
                    color: "white",
                    fontSize: "18px",
                    cursor: "pointer",
                    padding: "12px",
                    zIndex: 10,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
                onClick={goToNext}
                aria-label="Next"
            >
                <FaChevronRight />
            </button>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                {items.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`carousel-dot ${index === logicalIndex ? "active" : ""}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
