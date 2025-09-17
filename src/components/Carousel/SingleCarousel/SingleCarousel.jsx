import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";
import "./SingleCarousel.css";

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlers = useSwipeable({
        onSwipedLeft: () => goToNext(),
        onSwipedRight: () => goToPrevious(),
        swipeDuration: 500,
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1,
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - 1 ? 0 : prevIndex + 1,
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

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
                      transition: "transform 0.5s ease-in-out",
                      transform: `translateX(calc(-${currentIndex * 100}%))`, // Center the active item
                  }}
              >
                  {items.map((item, index) => (
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
                            index === currentIndex ? "active" : ""
                        }`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
