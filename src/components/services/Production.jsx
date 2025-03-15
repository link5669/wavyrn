import "./Service.css";
import HRDiv from "../HRDiv";
import { Col, Row } from "react-bootstrap";
import { useEffect, useRef } from "react";

const Production = ({ isMobile }) => {
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    const lineHeight = 20; // Fixed line height in pixels
    const numberOfLines = 5; // Number of lines
    const containerHeight = lineHeight * numberOfLines; // Total height for five lines

    useEffect(() => {
        const equalizeHeight = () => {
            if (leftColRef.current && rightColRef.current) {
                // Reset heights to auto to get natural heights
                leftColRef.current.style.height = "auto";
                rightColRef.current.style.height = "auto";

                // Get the natural heights
                const leftHeight = leftColRef.current.offsetHeight;
                const rightHeight = rightColRef.current.offsetHeight;

                // Set both columns to the larger height
                const maxHeight = Math.max(leftHeight, rightHeight);
                leftColRef.current.style.height = `${maxHeight}px`;
                rightColRef.current.style.height = `${maxHeight}px`;
            }
        };

        equalizeHeight();

        // Re-run on window resize
        window.addEventListener("resize", equalizeHeight);
        return () => window.removeEventListener("resize", equalizeHeight);
    }, []);

    if (isMobile) {
        return (
            <div
                style={{
                    backgroundSize: "cover", // Cover the entire div
                    backgroundPosition: "center", // Center the image
                    backgroundImage:
                        "url(http://dev.milesacq.com:3006/services/Services%20-%20Production.webp?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0?url)",
                    height: "100%", // Ensure the div takes full height
                    minHeight: "400px", // Set a minimum height (adjust as needed)
                    position: "relative", // For absolute positioning of overlay
                }}
            >
                {/* Overlay */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0, 0, 0, 0.7)",
                        backdropFilter: "blur(1px)",
                        zIndex: 1,
                    }}
                ></div>

                {/* Content */}
                <h2
                    style={{
                        color: "white",
                        zIndex: 102,
                        position: "relative",
                        paddingTop: "5vh",
                    }}
                >
                    Production
                </h2>
                <h5
                    style={{
                        textAlign: "left",
                        margin: 0,
                        lineHeight: `${lineHeight}px`, // Fixed line height
                        fontSize: "15px", // Fixed font size
                        zIndex: 101,
                        position: "relative",
                        padding: "15px", // Add padding for better readability
                        color: "white", // Ensure text is visible
                    }}
                >
                    Tell us about your audio vision and we’ll find the right
                    team to execute it. We’re here to mix, master, and take your
                    audio to the finish line.
                </h5>
                <ul
                    style={{
                        textAlign: "left",
                        listStyleType: "square",
                        listStylePosition: "outside",
                        margin: 0,
                        paddingLeft: "10%",
                        paddingRight: "3%",
                        lineHeight: `${lineHeight}px`, // Fixed line height
                        fontSize: "15px", // Fixed font size
                        overflow: "hidden", // Prevent overflow
                        zIndex: 101,
                        position: "relative",
                        color: "white", // Ensure text is visible
                    }}
                >
                    <li>Podcast & Long-Form Production</li>
                    <li>Vocal Production & Synthesis</li>
                    <li>MIDI & Synth Programming</li>
                    <li>Mixing, Mastering, & Editing</li>
                    <li>Custom Plugin Solutions</li>
                </ul>
            </div>
        );
    } else {
        return (
            <>
                <Row
                    style={{
                        paddingLeft: isMobile ? "0%" : "28%",
                        paddingRight: isMobile ? "5%" : "25%",
                        fontSize: isMobile && ".8em",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Col
                        ref={leftColRef}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <ul
                            style={{
                                listStyleType: "none",
                                margin: 0,
                                padding: 0,
                                lineHeight: `${lineHeight}px`, // Fixed line height
                                fontSize: "15px", // Fixed font size
                                height: `${containerHeight}px`, // Fixed container height
                                overflow: "hidden", // Prevent overflow
                            }}
                        >
                            <li>Podcast & Long-Form Production</li>
                            <li>Vocal Production & Synthesis</li>
                            <li>MIDI & Synth Programming</li>
                            <li>Mixing, Mastering, & Editing</li>
                            <li>Custom Plugin Solutions</li>
                        </ul>
                    </Col>
                    <Col
                        ref={rightColRef}
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <h5
                            style={{
                                textAlign: "left",
                                margin: 0,
                                lineHeight: `${lineHeight}px`, // Fixed line height
                                fontSize: "15px", // Fixed font size
                                height: `${containerHeight}px`, // Fixed container height
                                overflow: "hidden", // Prevent overflow
                                width: "20vw",
                            }}
                        >
                            Tell us about your audio vision and we’ll find the
                            right team to execute it. We’re here to mix, master,
                            and take your audio to the finish line.
                        </h5>
                    </Col>
                </Row>
            </>
        );
    }
};

export default Production;
