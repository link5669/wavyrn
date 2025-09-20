import { useState, useEffect, useRef } from "react";
import WavNavbar from "../components/Navbar/Navbar";
import ProfilePic from "../components/ProfilePic/ProfilePic";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { allUsers, categories } from "../utilities/users";
import UserCategory from "../components/UserCategory";
import "./AboutUs.css";
import { useTranslation } from "../hooks/useTranslation";
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
    Miguel,
} from "../components/UserProfiles";
import { useLocation } from "react-router-dom";
import Overlay from "../components/Overlay/Overlay";
import { getPfpImage } from "../utilities/utilities";
import Footer from "../components/Footer";

const About = ({ isMobile }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCat, setSelectedCat] = useState("All");
    const [visibleUsers, setVisibleUsers] = useState(allUsers);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const { state } = useLocation();
    const { t } = useTranslation();

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

    const handleProfileClick = (user) => {
        setSelectedUser(user);
        setIsOverlayVisible(true);
    };

    // Service data with checklist and descriptive text
    const services = [
        {
            title: t('about.services.audioDirection.title'),
            icon: "https://www.dl.dropboxusercontent.com/scl/fi/ttxnaayqifzxvmuw472ow/Asset-6-4x-8.png?rlkey=3im1plyj5z0225vcg2nsgh0pt&e=1&dl=0",
            checklist: t('about.services.audioDirection.checklist'),
            description: t('about.services.audioDirection.description')
        },
        {
            title: t('about.services.soundDesign.title'),
            icon: "https://www.dl.dropboxusercontent.com/scl/fo/dmpml0cjyyu0yef8s934a/AA0AEMcKF11NgdtOdI0RUu8/icon_waveform_red.png?rlkey=oxxt37u5hacydqej14j8eq235&e=1&dl=0",
            checklist: t('about.services.soundDesign.checklist'),
            description: t('about.services.soundDesign.description')
        },
        {
            title: t('about.services.voiceOver.title'),
            icon: "https://www.dl.dropboxusercontent.com/scl/fo/dmpml0cjyyu0yef8s934a/ABL84ZQNHZV0BcftDVrhgYo/icon_microphone_red.png?rlkey=oxxt37u5hacydqej14j8eq235&e=1&dl=0",
            checklist: t('about.services.voiceOver.checklist'),
            description: t('about.services.voiceOver.description')
        },
        {
            title: t('about.services.music.title'),
            icon: "https://www.dl.dropboxusercontent.com/scl/fo/dmpml0cjyyu0yef8s934a/AHW3rkoVBxJgBaohhKQKDSA/icon_semiquaver_red.png?rlkey=oxxt37u5hacydqej14j8eq235&e=1&dl=0",
            checklist: t('about.services.music.checklist'),
            description: t('about.services.music.description')
        },
        {
            title: t('about.services.production.title'),
            icon: "https://www.dl.dropboxusercontent.com/scl/fo/dmpml0cjyyu0yef8s934a/AAeX50rU6qw3deUT5QL6e-Y/icon_headphones_red.png?rlkey=oxxt37u5hacydqej14j8eq235&e=1&dl=0",
            checklist: t('about.services.production.checklist'),
            description: t('about.services.production.description')
        }
    ];

    return (
        <>
            <WavNavbar showLogo={true} />
            <div
                style={{
                    backgroundColor: "white",
                    paddingTop: "45px",
                    minHeight: "100vh",
                    width: "100vw",
                }}
            >
                {/* Hero Section */}
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <h1 style={{ 
                        fontSize: "3.5em", 
                        color: "#CE0036", 
                        margin: "0 0 20px 0",
                        fontWeight: "bold"
                    }}>
                        {t('about.heroTitle')}
                    </h1>
                    <p style={{ 
                        fontSize: "1.1em", 
                        color: "black", 
                        maxWidth: "800px",
                        margin: "0 auto 15px auto"
                    }}>
                        {t('about.heroSubtitle1')}
                    </p>
                    <p style={{ 
                        fontSize: "1.1em", 
                        color: "black",
                        maxWidth: "800px",
                        margin: "0 auto"
                    }}>
                        {t('about.heroSubtitle2').includes('entire process') ? 
                            t('about.heroSubtitle2').split('entire process').map((part, index) => 
                                index === 0 ? part : (
                                    <span key={index}>
                                        <strong style={{ color: "#CE0036" }}>entire process</strong>
                                        {part}
                                    </span>
                                )
                            ) : t('about.heroSubtitle2')
                        }
                    </p>
                </div>

                {/* Services Section */}
                <div style={{ 
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0",
                    width: "100%",
                    gap: "30px"
                }}>
                    {/* Top Row - 3 services */}
                    <div style={{
                        display: "grid", 
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "30px",
                        maxWidth: "1200px",
                        width: "100%"
                    }}>
                        {services.slice(0, 3).map((service, index) => (
                            <div key={index} className="service-card">
                                {/* Static header with icon and title */}
                                <div className="service-card-header">
                                    <div className="service-icon">
                                        <img src={service.icon} alt={service.title} />
                                    </div>
                                    <h3 className="service-title">{service.title}</h3>
                                </div>
                                
                                {/* Flipping content area */}
                                <div className="service-card-content">
                                    <div className="service-card-content-inner">
                                        <div className="service-card-front">
                                            <ul className="service-checklist">
                                                {service.checklist.map((item, idx) => (
                                                    <li key={idx}>
                                                        <span className="checkbox">☐</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="service-card-back">
                                            <p className="service-description">{service.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Bottom Row - 2 services */}
                    <div style={{
                        display: "grid", 
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "30px",
                        maxWidth: "800px",
                        width: "100%"
                    }}>
                        {services.slice(3, 5).map((service, index) => (
                            <div key={index + 3} className="service-card">
                                {/* Static header with icon and title */}
                                <div className="service-card-header">
                                    <div className="service-icon">
                                        <img src={service.icon} alt={service.title} />
                                    </div>
                                    <h3 className="service-title">{service.title}</h3>
                                </div>
                                
                                {/* Flipping content area */}
                                <div className="service-card-content">
                                    <div className="service-card-content-inner">
                                        <div className="service-card-front">
                                            <ul className="service-checklist">
                                                {service.checklist.map((item, idx) => (
                                                    <li key={idx}>
                                                        <span className="checkbox">☐</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="service-card-back">
                                            <p className="service-description">{service.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div style={{ padding: "80px 0" }}>
                    <h1 style={{ 
                        textAlign: "center", 
                        color: "black", 
                        fontSize: "2.5em",
                        margin: "0 0 20px 0",
                        position: "relative",
                        marginLeft: "15%",
                        marginRight: "15%",
                    }}>
                        {t('about.ourTeam')}
                        <div style={{
                            width: "100px",
                            height: "2px",
                            backgroundColor: "black",
                            margin: "10px auto 0 auto"
                        }}></div>
                    </h1>

                    {/* Filter Navigation */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        margin: "40px 0",
                        flexWrap: "wrap"
                    }}>
                        {categories.map((category, index) => (
                            <UserCategory
                                key={category.category}
                                setVisibleUsers={setVisibleUsers}
                                setSelectedCat={setSelectedCat}
                                categoryList={category.categoryList}
                                category={category.category}
                                selectedCat={selectedCat}
                            />
                        ))}
                    </div>

                    {/* Team Grid */}
                    <div
                        ref={pfpParent}
                        className="team-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 18%)",
                            gap: "2px",
                            padding: "0",
                            width: "100%",
                            paddingLeft: "15%",
                            paddingRight: "15%",
                        }}
                    >
                        {visibleUsers.map((user, index) => (
                            <ProfilePic
                                key={user.name}
                                name={user.name}
                                title={user.title}
                                setSelectedUser={setSelectedUser}
                                isMobile={isMobile}
                                pfpImage={getPfpImage(user.name)}
                                onClick={() => {
                                    setSelectedUser(user);
                                    setIsOverlayVisible(true);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {selectedUser && (
                <Overlay
                    isVisible={isOverlayVisible}
                    onClose={() => {
                        setIsOverlayVisible(false);
                        setTimeout(() => setSelectedUser(null), 300);
                    }}
                    profileInfo={{
                        name: t(`team.members.${selectedUser.name}.name`) || selectedUser.name,
                        title: t(`team.members.${selectedUser.name}.title`) || selectedUser.title,
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
                    ) : selectedUser.name == "Miguel Manness" ? (
                        <Miguel />
                    ) : (
                        <p>No bio yet!</p>
                    )}
                </Overlay>
            )}
            <Footer />
        </>
    );
};

export default About;
