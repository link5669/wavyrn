import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();
    const videoRef = useRef(null);

    useEffect(() => {
        // Hide scrollbars
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        };
    }, []);

    const handleVideoEnd = () => {
        navigate("/portfolio");
    };

    return (
        <div
            style={{
                overflow: "hidden",
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
            }}
        >
            <video
                ref={videoRef}
                src="https://www.dl.dropboxusercontent.com/scl/fi/ox42clcsriow0z74evdny/Wavyrn_AnimLogo-White-Short.mp4?rlkey=4hsikakf9c2sapmcq40cx0f40&e=1&dl=0"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                }}
            />
        </div>
    );
}

export default App;
