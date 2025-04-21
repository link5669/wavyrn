import { useState, useEffect, useRef } from "react";
import Jobs from "../components/Jobs/Jobs";
import AudioDirecting from "../components/services/AudioDirecting";
import Dialogue from "../components/services/Dialogue";
import Music from "../components/services/Music";
import Production from "../components/services/Production";
import SoundDesign from "../components/services/SoundDesign";
import "./Services.css";
import WavNavbar from "../components/Navbar/Navbar";
import autoAnimate from "@formkit/auto-animate";
import ProfilePic from "../components/ProfilePic/ProfilePic";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { allUsers, categories } from "../utilities/users";
import UserCategory from "../components/UserCategory";
import "./AboutUs.css";
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
    Quinne,
} from "../components/UserProfiles";
import { useLocation } from "react-router-dom";
import Overlay from "../components/Overlay/Overlay";
import { getPfpImage } from "../utilities/utilities";

const About = ({ isMobile }) => {
    const [selected, setSelected] = useState(0);
    const [prevSelected, setPrevSelected] = useState(-1);
    const serviceRefs = useRef({});
    const footerRef = useRef(null);
    const [expanded, setExpanded] = useState(-1);
    const parent = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCat, setSelectedCat] = useState("All");
    const [visibleUsers, setVisibleUsers] = useState(allUsers);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const { state } = useLocation();
    const whiteRef = useRef(null);

    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    const setSelectedWrapper = (val) => {
        if (selected === prevSelected || val === selected) return;

        const previousServiceElement = serviceRefs.current[selected];
        if (previousServiceElement) {
            previousServiceElement.classList.add("exiting");
            setTimeout(() => {
                previousServiceElement.classList.remove("exiting");
                setPrevSelected(selected);
                setSelected(val);
            }, 100);
        }
    };

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

    const [transition, setTransition] = useState(
        state != null ? !state.useAnimate : false,
    );

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

    const handleProfileClick = (user) => {
        setSelectedUser(user);
        setIsOverlayVisible(true);
    };

    return (
        <>
            <WavNavbar showLogo={true} />
            <div
                style={{
                    backgroundColor: "black",
                    paddingTop: "45px",
                }}
            >
                <div>
                    <Jobs
                        selected={selected}
                        setSelected={setSelectedWrapper}
                    />
                    <br />
                    <div
                        style={{
                            width: "100vw",
                            alignContent: "center",
                            display: "grid",
                        }}
                    >
                        <b
                            style={{
                                fontSize: "2em",
                                textAlign: "center",
                                color: "white",
                            }}
                        >
                            Audio made fantastic.
                        </b>
                    </div>
                    <br />
                    <br />
                    <div
                        className="services-wrapper"
                        style={{ color: "white" }}
                        ref={parent}
                    >
                        {selected === 0 && (
                            <span ref={(e) => (serviceRefs.current[0] = e)}>
                                <AudioDirecting data-selected={0} />
                            </span>
                        )}
                        {selected === 1 && (
                            <span ref={(e) => (serviceRefs.current[1] = e)}>
                                <Production data-selected={1} />
                            </span>
                        )}
                        {selected === 2 && (
                            <span ref={(e) => (serviceRefs.current[2] = e)}>
                                <SoundDesign data-selected={2} />
                            </span>
                        )}
                        {selected === 3 && (
                            <span ref={(e) => (serviceRefs.current[3] = e)}>
                                <Music data-selected={3} />
                            </span>
                        )}
                        {selected === 4 && (
                            <span ref={(e) => (serviceRefs.current[4] = e)}>
                                <Dialogue data-selected={4} />
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: "5%" }} />
            <h1 style={{ color: "white" }}>Our Team</h1>

            {!isMobile && (
                <hr
                    style={{
                        display: "block",
                        height: "3px",
                        border: 0,
                        borderTop: "1px solid #ffffff",
                        margin: "1em 0",
                        marginLeft: "30%",
                        marginRight: "30%",
                        opacity: 100,
                    }}
                />
            )}

            <div
                style={{
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "1%",
                    paddingBottom: "2.2%",
                    paddingRight: "3.5%",
                    color: "white",
                }}
            >
                {categories.map((category, index) => {
                    return (
                        <>
                            <UserCategory
                                key={category.category}
                                setVisibleUsers={setVisibleUsers}
                                setSelectedCat={setSelectedCat}
                                categoryList={category.categoryList}
                                category={category.category}
                                selectedCat={selectedCat}
                            />
                        </>
                    );
                })}
            </div>
            <div
                ref={pfpParent}
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: isMobile ? "center" : "flex-start",
                    paddingLeft: isMobile ? "5%" : "30%",
                    paddingRight: isMobile ? "5%" : "30%",
                    width: "100vw",
                    color: "white",
                    minHeight: "40vw",
                    gap: "5em 0",
                    paddingBottom: "40px",
                }}
            >
                {visibleUsers.map((user, index) => (
                    <div
                        key={user.name}
                        className="users"
                        style={{
                            justifyContent: "center",
                            display: "flex",
                        }}
                    >
                        <ProfilePic
                            name={user.name}
                            title={user.title}
                            setSelectedUser={() =>
                                handleProfileClick({
                                    name: user.name,
                                    title: user.title,
                                })
                            }
                            isMobile={isMobile}
                        />
                    </div>
                ))}
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
                    ) : selectedUser.name == "Quinne Houck" ? (
                        <Quinne isMobile={isMobile} />
                    ) : (
                        <p>No bio yet!</p>
                    )}
                </Overlay>
            )}
            <div
                ref={footerRef}
                style={{ backgroundColor: "black", height: "50px" }}
            >
                <p
                    style={{
                        color: "white",
                        textAlign: "center",
                        lineHeight: "50px",
                    }}
                >
                    ©️2025 Wavyrn • All Rights Reserved
                </p>
            </div>
        </>
    );
};

export default About;
