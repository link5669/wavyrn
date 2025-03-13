import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "../Home.css";
import Navbar from "../../components/Navbar/MobileNavbar/MobileNavbar";
import BottomSection from "../../components/BottomSection/BottomSection"; // Imp{ort the BottomSection component
import { Link } from "react-router-dom";
function App() {
    const [isAnimating, setIsAnimating] = useState(false);
    const [moveLogo, setMoveLogo] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const navigate = useNavigate();
    const [parent] = useAutoAnimate({ duration: 1500 });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 100); // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isAnimating) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isAnimating]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden"; // This affects the html element

        return () => {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        };
    }, []);

    return (
        <div
            style={{
                overflow: "hidden",
                Maxheight: "100vh",
                width: "100%",
            }}
        >
            <Navbar />
            <div
                className={`home-container ${isAnimating ? "animating" : ""} ${fadeOut ? "fade-out" : ""}`}
            >
                <div className="content-wrapper-home" ref={parent}>
                    <div
                        className={`image-container ${moveLogo ? "move-logo" : ""}`}
                    >
                        <Link to="/portfolio">
                            <img
                                key={
                                    isAnimating ? "animating" : "not-animating"
                                }
                                src="/images/no_text_white.png"
                                alt="Website Logo"
                                className={`logo-image`}
                                style={{
                                    margin: "auto",
                                    width: "90%",
                                }}
                            />
                        </Link>
                        <br />
                        <div style={{ textAlign: "center", color: "white" }}>
                            <Link
                                to="/about"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                <h3>About</h3>
                            </Link>
                            <Link
                                to="/portfolio"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                <h3>Portfolio</h3>
                            </Link>
                            <Link
                                to="/blog"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                <h3>Blog</h3>
                            </Link>
                            <Link
                                to="/contact"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                <h3>Contact</h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <BottomSection />
        </div>
    );
}

export default App;
