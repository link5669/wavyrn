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
import "../AboutUs.css";
import TeamProfileBody from "../../components/TeamProfileBody";
import { useTeamProfiles } from "../../hooks/useTeamProfiles";
import Overlay from "../../components/Overlay/Overlay";
import { useTranslation } from "../../hooks/useTranslation";

const About = ({ isMobile }) => {
    const { t } = useTranslation();
    const [selected, setSelected] = useState(0);
    const [prevSelected, setPrevSelected] = useState(-1);
    const serviceRefs = useRef({});
    const parent = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const { profiles: visibleUsers } = useTeamProfiles();
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("Services"); // State for active tab

    const carouselItems = [
        <AudioDirecting isMobile={true} />,
        <SoundDesign isMobile={true} />,
        <Dialogue isMobile={true} />,
        <Music isMobile={true} />,
        <Production isMobile={true} />,
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

    const teamGridPlugin = (el, action, oldCoords, newCoords) => {
        if (action === "remain") {
            const deltaX = (oldCoords?.left ?? 0) - (newCoords?.left ?? 0);
            const deltaY = (oldCoords?.top ?? 0) - (newCoords?.top ?? 0);
            return new KeyframeEffect(
                el,
                [
                    { transform: `translate(${deltaX}px, ${deltaY}px)` },
                    { transform: "translate(0, 0)" },
                ],
                { duration: 400, easing: "ease-in-out" }
            );
        }
        if (action === "add") {
            return new KeyframeEffect(
                el,
                [
                    { transform: "scale(0.98)", opacity: 0 },
                    { transform: "scale(0.98)", opacity: 0, offset: 0.5 },
                    { transform: "scale(1)", opacity: 1 },
                ],
                { duration: 600, easing: "ease-in" }
            );
        }
        if (action === "remove") {
            return new KeyframeEffect(
                el,
                [
                    { transform: "scale(1)", opacity: 1 },
                    { transform: "scale(0.98)", opacity: 0 },
                ],
                { duration: 400, easing: "ease-out" }
            );
        }
    };

    const [pfpParent, enableAnimations] = useAutoAnimate(teamGridPlugin);

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
            className="mobile-page-container"
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
                        {t('nav.services')}
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
                        {t('about.ourTeam')}
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
                                    marginBottom: "10px",
                                }}
                            >
                                {t('about.heroTitle')}
                            </h1>
                            <Carousel items={carouselItems} />
                        </div>
                    )}

                    {activeTab === "Our Team" && (
                        <div style={{ paddingBottom: "10vh" }}>
                            <h1
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                    fontSize: "2em",
                                }}
                            >
                                {t('about.ourTeam')}
                            </h1>
                            <div
                                ref={pfpParent}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gap: "12px", // Increased gap for wider center margin (was 10px)
                                    padding: "10px",
                                    width: "95%",
                                    margin: "0 auto",
                                }}
                            >
                                {visibleUsers.map((user, index) => (
                                    <div
                                        key={user.docId}
                                        style={{
                                            position: "relative",
                                            border: "2px solid white",
                                            borderRadius: "5px",
                                            overflow: "hidden",
                                        }}
                                        onClick={() => {
                                            if (!user.hasDetails) return;
                                            setIsOverlayVisible(true);
                                            setSelectedUser(user);
                                        }}
                                    >
                                        <img
                                            src={user.headshot || "https://via.placeholder.com/150"}
                                            alt={user.displayName}
                                            style={{
                                                width: "45vw",
                                                height: isMobile
                                                    ? "25vh" // Increased height (was 20vh)
                                                    : "35vh", // Increased height (was 30vh)
                                                display: "block",
                                                objectFit: "cover",
                                                objectPosition: user.headshotPosition || "0% 15%",
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
                                                fontSize: ".75em", // Made smaller (was .9em)
                                            }}
                                        >
                                            <b>{user.displayName}</b>
                                            <p style={{ margin: 0 }}>{user.displayTitle}</p>
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
                            name: selectedUser.displayName,
                            title: selectedUser.displayTitle,
                            image: selectedUser.headshot,
                            imagePosition: selectedUser.headshotPosition,
                            socials: selectedUser.socials,
                        }}
                    >
                        <TeamProfileBody profile={selectedUser} isMobile={isMobile} />
                    </Overlay>
                )}
            </div>
            <BottomSection />
        </div>
    );
};

export default About;
