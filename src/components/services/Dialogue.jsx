import "./Service.css";
import { Col, Row } from "react-bootstrap";
import { useRef, useEffect } from "react";

const Dialogue = ({ isMobile }) => {
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
                    backgroundPosition: "bottom", // Center the image
                    backgroundImage:
                        "url(https://link5669.github.io/wavyrn-media/services/Services%20-%20Voiceover.webp?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0?url)",
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
                    Voiceover Production
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
                    Orcs, paladins, and space pirates. We’ll find the right
                    voice, produce the session, and deliver clean dialogue
                    (Tolkein dialect elvish included).
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
                    <li> Voice Acting</li>
                    <li> Session Production</li>
                    <li> Recording Engineering </li>
                    <li> Voice Effects & Sound Design</li>
                    <li> Mixing & Editing</li>
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
                                listStylePosition: "outside",
                            }}
                        >
                            <li> Voice Acting</li>
                            <li> Session Production</li>
                            <li> Recording Engineering </li>
                            <li> Voice Effects & Sound Design</li>
                            <li> Mixing & Editing</li>
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
                            Orcs, paladins, and space pirates. We’ll find the
                            right voice, produce the session, and deliver clean
                            dialogue (Tolkein dialect elvish included).
                        </h5>
                    </Col>
                </Row>
            </>
        );
    }
};

export default Dialogue;
