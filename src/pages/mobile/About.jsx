import { useState, useEffect, useRef } from "react";
import AudioDirecting from "../../components/services/AudioDirecting";
import Dialogue from "../../components/services/Dialogue";
import Music from "../../components/services/Music";
import Production from "../../components/services/Production";
import SoundDesign from "../../components/services/SoundDesign";
import Carousel from "../../components/Carousel/SingleCarousel/SingleCarousel";
import BottomSection from "../../components/BottomSection/BottomSection";
import "../Services.css";
import DesktopNav from "../../components/Navbar/Navbar";
import MobileNav from "../../components/Navbar/MobileNavbar/MobileNavbar";
import autoAnimate from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { allUsers } from "../../utilities/users";
import "../AboutUs.css";
import {
    Ananta,
    Angelica,
    AustinB,
    AustinL,
    Marc,
    Gret,
    Max,
    Sam,
    Zionna,
    Caleb,
    Julian,
    Michelle,
    Neil,
} from "../../components/UserProfiles";
import Overlay from "../../components/Overlay/Overlay";
import { getPfpImage } from "../../utilities/utilities";

const About = ({ isMobile }) => {
    const [selected, setSelected] = useState(0);
    const [prevSelected, setPrevSelected] = useState(-1);
    const serviceRefs = useRef({});
    const parent = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [visibleUsers, setVisibleUsers] = useState(allUsers);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("Services"); // State for active tab

    const carouselItems = [
        <AudioDirecting isMobile={true} />,
        <Production isMobile={true} />,
        <SoundDesign isMobile={true} />,
        <Music isMobile={true} />,
        <Dialogue isMobile={true} />,
    ];

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    useEffect(() => {
        const currentServiceRef = serviceRefs.current[selected];
        if (currentServiceRef) {
            currentServiceRef.classList.add("entering");

            setTimeout(() => {
                currentServiceRef.classList.remove("entering");
                updateFooterMargin();
            }, 10);
        }
    }, [selected]);

    const [pfpParent, enableAnimations] = useAutoAnimate({
        duration: 400,
        easing: "ease-in-out",
        disrespectUserMotionPreference: false,
    });

    const onBackButtonEvent = (e) => {
        if (selectedUser != null) {
            e.preventDefault();
            setSelectedUser(null);
        } else {
            window.history.pushState(null, null, window.location.pathname);
        }
    };

    useEffect(() => {
        if (selectedUser != null) {
            window.history.pushState(null, null, window.location.pathname);
            window.addEventListener("popstate", onBackButtonEvent);
        } else {
            window.removeEventListener("popstate", onBackButtonEvent);
        }
    }, [selectedUser]);

    return (
        <div
            style={{
                backgroundColor: "#ce0036",
                minHeight: "100vh",
            }}
        >
            {isMobile ? (
                <MobileNav showLogo={true} />
            ) : (
                <DesktopNav showLogo={true} />
            )}

            {/* Mobile Tabs */}
            <div
                style={{
                    paddingLeft: isMobile ? 0 : "30vw",
                    paddingRight: isMobile ? 0 : "30vw",
                    paddingTop: isMobile ? 0 : "9vh",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "0 5px 0 5px",
                        width: "95%",
                        margin: "0 auto",
                    }}
                >
                    <button
                        onClick={() => setActiveTab("Services")}
                        style={{
                            flex: 1,
                            backgroundColor:
                                activeTab === "Services" ? "white" : "#ce0036",
                            color:
                                activeTab === "Services" ? "#ce0036" : "white",
                            border: "solid white",
                            fontSize: "1.6em",
                            cursor: "pointer",
                            padding: "2px",
                        }}
                    >
                        Services
                    </button>
                    <button
                        onClick={() => setActiveTab("Our Team")}
                        style={{
                            flex: 1,
                            backgroundColor:
                                activeTab === "Our Team" ? "white" : "#ce0036",
                            color:
                                activeTab === "Our Team" ? "#ce0036" : "white",
                            border: "solid white",
                            fontSize: "1.6em",
                            cursor: "pointer",
                            padding: "2px",
                        }}
                    >
                        Our Team
                    </button>
                </div>

                {/* Content Based on Active Tab */}
                <div
                    style={{
                        paddingTop: "20px",
                    }}
                >
                    {activeTab === "Services" && (
                        <div>
                            <h1
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                    fontSize: "2em",
                                    marginBottom: "20px",
                                }}
                            >
                                What We Do
                            </h1>
                            <Carousel items={carouselItems} />
                        </div>
                    )}

                    {activeTab === "Our Team" && (
                        <div style={{ paddingBottom: "10vh" }}>
                            <h1 style={{ color: "white", textAlign: "center" }}>
                                Our Team
                            </h1>
                            <div
                                ref={pfpParent}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gap: "10px",
                                    padding: "10px",
                                    width: "95%",
                                    margin: "0 auto",
                                }}
                            >
                                {visibleUsers.map((user, index) => (
                                    <div
                                        key={user.name}
                                        style={{
                                            position: "relative",
                                            border: "2px solid white",
                                            borderRadius: "5px",
                                            overflow: "hidden",
                                        }}
                                        onClick={() => {
                                            setIsOverlayVisible(true);
                                            setSelectedUser(user);
                                        }}
                                    >
                                        <img
                                            src={getPfpImage(user.name)}
                                            alt={user.name}
                                            style={{
                                                width: "45vw",
                                                height: isMobile
                                                    ? "20vh"
                                                    : "30vh",
                                                display: "block",
                                                objectFit: "cover",
                                                objectPosition: "0% 15%",
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                background:
                                                    "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)",
                                                padding: "10px",
                                                color: "white",
                                            }}
                                        >
                                            <b>{user.name}</b>
                                            <p style={{ margin: 0 }}>
                                                {user.title}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {selectedUser && (
                    <Overlay
                        isVisible={isOverlayVisible}
                        onClose={() => {
                            setIsOverlayVisible(false);
                            setTimeout(() => setSelectedUser(null), 300); // Wait for fade out
                        }}
                        profileInfo={{
                            name: selectedUser.name,
                            title: selectedUser.title,
                            image: getPfpImage(selectedUser.name),
                        }}
                    >
                        {selectedUser.name == "Sam Leigh" ? (
                            <Sam />
                        ) : selectedUser.name == "Max Jaime" ? (
                            <Max />
                        ) : selectedUser.name == "Marc Yu" ? (
                            <Marc isMobile={isMobile} />
                        ) : selectedUser.name == "Austin Leshock" ? (
                            <AustinL />
                        ) : selectedUser.name == "Austin Burkett" ? (
                            <AustinB isMobile={isMobile} />
                        ) : selectedUser.name == "Ananta Arora" ? (
                            <Ananta />
                        ) : selectedUser.name == "Gret Price" ? (
                            <Gret />
                        ) : selectedUser.name == "Angelica Ramos" ? (
                            <Angelica />
                        ) : selectedUser.name == "Zionna Brown" ? (
                            <Zionna />
                        ) : selectedUser.name == "Caleb Skelly" ? (
                            <Caleb />
                        ) : selectedUser.name == "Michelle Lai" ? (
                            <Michelle />
                        ) : selectedUser.name == "Neil Small" ? (
                            <Neil />
                        ) : selectedUser.name == "Julian Cabrera" ? (
                            <Julian isMobile={isMobile} />
                        ) : (
                            <p>No bio yet!</p>
                        )}
                    </Overlay>
                )}
            </div>
            <BottomSection />
        </div>
    );
};

export default About;
