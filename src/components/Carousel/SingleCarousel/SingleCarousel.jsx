import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import "./SingleCarousel.css";

const Carousel = ({ items }) => {
    // Start at index 1 because we'll add clones (clone of last item will be at index 0)
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);

    // Create extended items array with clones for seamless looping
    const extendedItems = [
        items[items.length - 1], // Clone of last item at the beginning
        ...items,                // Original items
        items[0]                 // Clone of first item at the end
    ];

    const handlers = useSwipeable({
        onSwipedLeft: () => goToNext(),
        onSwipedRight: () => goToPrevious(),
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    const goToPrevious = () => {
        if (!isTransitioning || currentIndex <= 0) return;
        setCurrentIndex(currentIndex - 1);
    };

    const goToNext = () => {
        if (!isTransitioning || currentIndex >= extendedItems.length - 1) return;
        setCurrentIndex(currentIndex + 1);
    };

    const goToSlide = (index) => {
        if (!isTransitioning) return;
        setCurrentIndex(index + 1); // Add 1 because of the clone at the beginning
    };

    // Handle seamless looping with useEffect for better reliability
    useEffect(() => {
        if (!isTransitioning) return;
        
        let timeout;
        if (currentIndex === 0) {
            // We're at the clone of the last item, jump to the real last item
            timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(items.length);
                setTimeout(() => setIsTransitioning(true), 50);
            }, 500); // Wait for transition to complete
        } else if (currentIndex === extendedItems.length - 1) {
            // We're at the clone of the first item, jump to the real first item
            timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(1);
                setTimeout(() => setIsTransitioning(true), 50);
            }, 500); // Wait for transition to complete
        }
        
        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [currentIndex, items.length, extendedItems.length, isTransitioning]);

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "100vw", // Ensure it doesn't exceed viewport width
                overflow: "hidden",
                margin: "0 auto", // Center the carousel

            }}
            {...handlers}
        >
          {/* Left Arrow */}
          <button
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
          >
              <FaChevronLeft />
          </button>
          {/* Carousel Track */}
          <div
              style={{
                  width: "100%",
                  overflow: "hidden",
              }}
          >
              <div
                  style={{
                      display: "flex",
                      transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
                      transform: `translateX(calc(-${currentIndex * 100}%))`, // Center the active item
                      // iOS Safari text rendering fixes
                      WebkitFontSmoothing: "antialiased",
                      WebkitBackfaceVisibility: "hidden",
                      WebkitTransform: "translateZ(0)",
                      backfaceVisibility: "hidden",
                      willChange: "transform",
                  }}
              >
                  {extendedItems.map((item, index) => (
                      <div
                          key={index}
                          style={{
                              flex: "0 0 100%",
                              boxSizing: "border-box",
                              paddingTop: "2%",
                              paddingInline: "15%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "none",
                              minHeight: "300px",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              width: "70%",
                              borderRadius: "12px",
                              opacity: 1,
                              color: "white",
                              transition: "opacity 0.1s ease-in-out",
                              // iOS Safari text rendering fixes
                              WebkitFontSmoothing: "none",
                              WebkitBackfaceVisibility: "hidden",
                              backfaceVisibility: "hidden",
                              WebkitTransform: "translateZ(0)",

                          }}
                      >
                          {item}
                      </div>
                  ))}
              </div>
          </div>
          {/* Right Arrow */}
          <button
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
          >
              <FaChevronRight />
          </button>

            {/* Dots */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px", // Add margin for spacing
                }}
            >
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-dot ${
                            index === currentIndex - 1 ? "active" : ""
                        }`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
