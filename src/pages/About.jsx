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
    Grace
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
            icon: "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Website%20Assets/About/icon_waveform_white.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
            checklist: t('about.services.soundDesign.checklist'),
            description: t('about.services.soundDesign.description')
        },
        {
            title: t('about.services.voiceOver.title'),
            icon: "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Website%20Assets/About/icon_microphone_white.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
            checklist: t('about.services.voiceOver.checklist'),
            description: t('about.services.voiceOver.description')
        },
        {
            title: t('about.services.music.title'),
            icon: "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Website%20Assets/About/icon_semiquaver_white.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
            checklist: t('about.services.music.checklist'),
            description: t('about.services.music.description')
        },
        {
            title: t('about.services.production.title'),
            icon: "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Website%20Assets/About/icon_headphones_white.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
            checklist: t('about.services.production.checklist'),
            description: t('about.services.production.description')
        }
    ];

    return (
        <>
            <WavNavbar showLogo={true} />
            <div
                className="about-page"
                style={{
                    backgroundColor: "white",
                    paddingTop: "65px",
                    minHeight: "100vh",
                    width: "100vw",
                    overflowX: "hidden",
                }}
            >
                {/* Hero + Services – shared background with overlay */}
                <div className="about-hero-and-services">
                    {/* Hero Section – two-line headline with red accent */}
                    <div className="about-hero" style={{ textAlign: "center", padding: "60px 0", maxWidth: "800px", margin: "0 auto" }}>
                        <span className="about-hero-line1">{t('about.heroSubtitle2Line1')}</span>
                        <span className="about-hero-line2">
                            {(() => {
                                const line2 = t('about.heroSubtitle2Line2');
                                if (line2.includes('entire')) {
                                    const [before, after] = line2.split('entire');
                                    return <>{before}<span className="about-hero-accent">entire</span>{after}</>;
                                }
                                return line2;
                            })()}
                        </span>
                        <hr className="about-hero-hr" />
                    </div>

                    {/* Services Section */}
                    <div className="about-services-wrap" style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "0 0 120px 0",
                        width: "100%",
                        gap: "30px"
                    }}>
                    {/* Top Row - 3 services */}
                    <div className="about-services-grid about-services-grid--top" style={{
                        display: "grid",
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
                                                        <span className="checkbox">✔</span>
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
                    <div className="about-services-grid about-services-grid--bottom" style={{
                        display: "grid",
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
                                                        <span className="checkbox">✔</span>
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
                </div>

                {/* Team Section */}
                <div className="about-team-section" style={{ padding: "60px 0 100px 0" }}>
                    <h1 className="about-team-heading">
                        {t('about.ourTeam')}
                        <span className="about-team-heading-line" />
                    </h1>

                    {/* Filter Navigation */}
                    <div className="about-team-filters-wrap">
                        <div className="about-team-filters">
                        {categories.map((category, index) => (
                            <UserCategory
                                key={category.category}
                                setVisibleUsers={setVisibleUsers}
                                setSelectedCat={setSelectedCat}
                                categoryList={category.categoryList}
                                category={category.category}
                                selectedCat={selectedCat}
                                buttonClassName="about-filter-btn"
                                isActive={selectedCat === category.category}
                            />
                        ))}
                        </div>
                    </div>

                    {/* Team Grid */}
                    <div className="team-grid-wrapper">
                        <div ref={pfpParent} className="team-grid">
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
                        userKey: selectedUser.name,
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
                    ) : selectedUser.name == "Miguel Meneses" ? (
                        <Miguel />
                    ) : selectedUser.name == "Grace Pehrman" ? (
                        <Grace />
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
