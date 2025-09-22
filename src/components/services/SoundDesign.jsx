import "./Service.css";
import HRDiv from "../HRDiv";
import { Col, Row } from "react-bootstrap";
import { useRef, useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";

const SoundDesign = ({ isMobile }) => {
    const { t } = useTranslation();
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
                    backgroundImage: isMobile
                        ? "url(https://link5669.github.io/wavyrn-media/services/Services%20-%20Sound%20Design.webp?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0?url)"
                        : "",
                    height: "100%", // Ensure the div takes full height
                    minHeight: "500px", // Increased height to fill more vertical space
                    position: "relative", // For absolute positioning of overlay
                    borderRadius: "12px", // Add rounded corners
                    overflow: "hidden"
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
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: 102,
                        position: "relative",
                        paddingTop: "4vh",
                    }}
                >
                    <img
                        src="https://www.dl.dropboxusercontent.com/scl/fo/dmpml0cjyyu0yef8s934a/AA0AEMcKF11NgdtOdI0RUu8/icon_waveform_red.png?rlkey=oxxt37u5hacydqej14j8eq235&e=1&dl=0"
                        alt="Sound Design"
                        style={{
                            width: "45px",
                            height: "45px",
                            marginBottom: "15px",
                            filter: "brightness(0) invert(1)", // Make icon white
                        }}
                    />
                    <h2
                        style={{
                            color: "white",
                            margin: 0,
                        }}
                    >
                        {t('about.services.soundDesign.title')}
                    </h2>
                </div>
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
                  {t('about.services.soundDesign.description')}
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
                    {t('about.services.soundDesign.checklist').map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
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
                        borderRadius: "12px", // Add rounded corners
                        backgroundColor: "rgba(255, 255, 255, 0.05)", // Optional: add subtle background
                        padding: "20px", // Add some padding
                        margin: "10px 0", // Add some margin
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
                          <li>Custom Palettes</li>
                          <li>UI & Sonic Branding</li>
                          <li>On-Site Recording</li>
                          <li>Technical Implementation</li>
                          <li>Post-Production & Cinematics</li>
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
                          Even the smallest footstep can describe your surroundings. Whether it’s a sonic logo or the cackle of a tavern fireplace, every sound is made unique.

                        </h5>
                    </Col>
                </Row>
            </>
        );
    }
};

export default SoundDesign;
