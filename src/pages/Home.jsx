import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "@obinesto/react-infinite-scroll-carousel/dist/index.css";
import { Carousel } from "@obinesto/react-infinite-scroll-carousel";
import Footer from "../components/Footer";
import TrapezoidFrame from "../components/TrapezoidFrame/TrapezoidFrame";
import "./Home.css";
import Navbar from "../components/Navbar/Navbar";

const DEFAULT_ALBUM_COVER = "https://placehold.co/400x400/2a2520/5c4a3d?text=Album";

const TESTIMONIALS = [
    {
        quote: "Working with Wavyrn has been nothing short of a phenomenal experience. They are a group of great people and professionals. Their deep knowledge of all things audio has been a great asset to our game and our studio. They are more than just a group of contractors they are truly equal partners. I'd recommend them to anyone in need of audio expertise at any budget and any level.",
        name: "Carlos Ortiz",
        company: "Towering Stairway",
    },
    {
        quote: "I hired Wavyrn Audio to make a few tracks for my horror game lily's world XD. I appreciated their professionalism and receptiveness to feedback; they care a lot about their songs fitting the tone of your game well. Because of their clear communication and quality of work, I came back to them for even more work.",
        name: "Emily Pitcher",
        company: "Sondering Studio",
    },
    {
        quote: "Their composer (Austin) is a remarkably bright and cheerful collaborator who truly went above and beyond to ensure every one of my ideas was perfectly implemented. He took all the time in the world to provide me with a result I loved, responding to every question or take almost instantly. What stood out most was his genuine understanding and patience, making the entire process feel supportive and stress-free.",
        name: "Ethan Kim",
        company: "ethanpiefan",
    },
    {
        quote: "I've had an incredibly positive and insightful experience working with Wavyrn. Their team maintains exceptional professionalism and consistently provides thoughtful, high-quality feedback. Through their expertise and guidance, they significantly elevate every aspect of the production quality, offering invaluable advice and creative support at any stage of development!",
        name: "Parama B.",
        company: "",
    },
    {
        quote: "Working with Wavyrn was an absolute delight. Talented and professional, my music composition and audio editing needs were expedient and exceptional. I didn't have to compromise my vision because Wavyrn captured it and brought it to life with their expert sound design and truly incredible music.",
        name: "Hunter Kea",
        company: "",
    },
    {
        quote: "Working with the amazingly talented folks at Wavyrn, I have had nothing but positive experiences. They breathed so much life to my projects, all of which would not have been the same without Wavyrn!",
        name: "Addison Fujimoto",
        company: "tortietoons",
    },
    {
        quote: "Wavyrn worked with me to refine and realize those ideas, offering revisions and suggestions while taking my reviews and making an audio product that fit the theme perfectly. Audio really brings a film together, especially one that relies so heavily on musical cues-- and having such a professional team that could work on my level made the finished product better than I could've hoped for!",
        name: "Sam Holovacs",
        company: "Puddle",
    },
];

/* Carousel uses album art from the same API as Portfolio Projects section (api/albums) */

const HOME_HERO_VIDEO =
    "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Website%20Assets/Home%20Page/WAV%20Website%20Video%20v3.mov?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=1";

const HOME_VISION_VIDEO =
    "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Misc.%20Media/TEKHA%20T01%20Full%20Character%20Showcase.mp4?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=1";
const HERO_TRAPEZOID_WIDTH = 62;

const CARD_OFFSET = 12;
const SLOT_POSITIONS = [
    { x: 0, y: 2 * CARD_OFFSET },           /* front: down-left */
    { x: CARD_OFFSET, y: CARD_OFFSET },     /* mid */
    { x: 2 * CARD_OFFSET, y: 0 },          /* back: up-right */
];

function Home() {
    const n = TESTIMONIALS.length;
    const prefersReducedMotion = typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
    const lowDeviceMemory =
        typeof navigator !== "undefined" &&
        typeof navigator.deviceMemory === "number" &&
        navigator.deviceMemory <= 4;
    const isIOS =
        typeof navigator !== "undefined" &&
        (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

    const carouselScrollInterval = prefersReducedMotion || lowDeviceMemory ? 32 : isIOS ? 120 : 24;
    const carouselScrollAmount = prefersReducedMotion || lowDeviceMemory ? 4 : isIOS ? 24 : 8;
    const carouselSectionClassName = `home-carousel-section home-carousel-section--auto-only${isIOS ? " home-carousel-section--ios-fast" : ""}`;
    const [albums, setAlbums] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitionDir, setTransitionDir] = useState(null); // 'next' | 'prev' | null
    const [cards, setCards] = useState(() => [
        { slot: 0, contentIndex: 0 },
        { slot: 1, contentIndex: 1 % n },
        { slot: 2, contentIndex: 2 % n },
    ]);
    const testimonialsRef = useRef(null);
    const testimonialsBgRef = useRef(null);
    const [visionVideoOpen, setVisionVideoOpen] = useState(false);
    const visionVideoRef = useRef(null);
    const visionVideoBackdropRef = useRef(null);
    const parallaxRate = 0.80; /* background moves at 35% of scroll speed */

    /* Long-quote threshold for mobile: shrink quote font so it doesn't overlap name (mobile CSS only) */
    const LONG_QUOTE_CHARS = 260;

    useEffect(() => {
        const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/albums`;
        fetch(url)
            .then((r) => r.json())
            .then((d) => {
                if (d.albums && Array.isArray(d.albums)) setAlbums(d.albums);
            })
            .catch((err) => console.error("Failed to fetch albums:", err));
    }, []);

    useEffect(() => {
        const section = testimonialsRef.current;
        const bg = testimonialsBgRef.current;
        if (!section || !bg) return;

        const onScroll = () => {
            const rect = section.getBoundingClientRect();
            const top = rect.top;
            const y = -top * (1 - parallaxRate);
            bg.style.transform = `translate3d(0, ${y}px, 0)`;
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [parallaxRate]);

    const goNext = () => {
        setTransitionDir("next");
        setCurrentIndex((i) => (i + 1) % n);
        setCards((prev) =>
            prev.map((card) => {
                const newSlot = (card.slot - 1 + 3) % 3; /* front→back, mid→front, back→mid */
                return {
                    slot: newSlot,
                    contentIndex: (currentIndex + 1 + newSlot) % n,
                };
            })
        );
        setTimeout(() => setTransitionDir(null), 520);
    };

    const goPrev = () => {
        setTransitionDir("prev");
        setCurrentIndex((i) => (i - 1 + n) % n);
        setCards((prev) =>
            prev.map((card) => {
                const newSlot = (card.slot + 1) % 3; /* front→mid, mid→back, back→front */
                return {
                    slot: newSlot,
                    contentIndex: (currentIndex - 1 + newSlot + n) % n,
                };
            })
        );
        setTimeout(() => setTransitionDir(null), 520);
    };

    return (
        <div className="home-page-wrap">
            <Navbar showLogo={true}/>
            <section className="home-hero">
                <video
                    className="home-hero-video"
                    src={HOME_HERO_VIDEO}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden
                />
                <TrapezoidFrame className="home-hero-trapezoid" widthPercent={HERO_TRAPEZOID_WIDTH} topWidthPercent={HERO_TRAPEZOID_WIDTH} />
                <div className="home-hero-content">
                    <h1 className="home-hero-title">
                        <span className="home-hero-title-accent">Audio</span> made fantastic.
                    </h1>
                    <div className="home-hero-line" aria-hidden="true" />
                    <p className="home-hero-subtitle">
                        We are storytellers with
                        <br />
                        a passion for sound.
                    </p>
                    <Link to="/portfolio" className="home-hero-button">
                        See our interactive reel →
                    </Link>
                </div>
            </section>

            {albums.length > 0 && (
                <section className={carouselSectionClassName} aria-label="Project album art">
                    <Carousel
                        items={albums}
                        keyExtractor={(item, index) => item.docId || item.id || index}
                        renderItem={(album) => (
                            <img
                                src={album.coverUrl || DEFAULT_ALBUM_COVER}
                                alt=""
                                className="home-carousel-img"
                                loading="lazy"
                                decoding="async"
                            />
                        )}
                        itemClassName="home-carousel-item"
                        containerClassName="home-carousel-container"
                        scrollInterval={carouselScrollInterval}
                        scrollAmount={carouselScrollAmount}
                        loadMoreThreshold={5}
                    />
                </section>
            )}

            <section className="home-testimonials" ref={testimonialsRef}>
                <div
                    ref={testimonialsBgRef}
                    className="home-testimonials-bg"
                    aria-hidden="true"
                    style={{
                        backgroundImage: `url("https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Website%20Assets/Services/Services%20-%20Production.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=1")`,
                    }}
                />
                <div className="home-testimonials-bg-overlay" aria-hidden="true" />
                <h2 className="home-testimonials-heading">TESTIMONIALS</h2>
                <div className="home-testimonials-stack">
                    {cards.map((card, cardIndex) => {
                        const testimonial = TESTIMONIALS[card.contentIndex];
                        const isFront = card.slot === 0;
                        const isLongQuote = testimonial.quote.length > LONG_QUOTE_CHARS;
                        const pos = SLOT_POSITIONS[card.slot];
                        return (
                            <div
                                key={cardIndex}
                                className="home-testimonial-card-wrap"
                                style={{
                                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                                    zIndex: card.slot === 0 ? 2 : card.slot === 1 ? 1 : 0,
                                }}
                            >
                                <div className={`home-testimonial-card ${isFront ? "home-testimonial-card-front" : "home-testimonial-card-mid"}`}>
                                    <div className="home-testimonial-content">
                                        <blockquote
                                            className={`home-testimonial-quote ${isFront && isLongQuote ? "home-testimonial-quote--shrunk" : ""}`}
                                        >
                                            {testimonial.quote}
                                        </blockquote>
                                        <footer className="home-testimonial-attribution">
                                            <span className="home-testimonial-name">{testimonial.name}</span>
                                            <span className="home-testimonial-company">{testimonial.company}</span>
                                        </footer>
                                        {isFront && (
                                            <div className="home-testimonial-nav">
                                                <button
                                                    type="button"
                                                    className="home-testimonial-arrow"
                                                    aria-label="Previous testimonial"
                                                    onClick={goPrev}
                                                >
                                                    ‹
                                                </button>
                                                <button
                                                    type="button"
                                                    className="home-testimonial-arrow"
                                                    aria-label="Next testimonial"
                                                    onClick={goNext}
                                                >
                                                    ›
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={`home-testimonial-card-outline ${isFront ? "home-testimonial-card-outline-red" : "home-testimonial-card-outline-gray"}`} aria-hidden="true" />
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="home-vision">
                <div className="home-vision-inner">
                    <div className="home-vision-header">
                        <h2 className="home-vision-heading">
                            <span className="home-vision-heading-line1">Let's talk about </span>
                            <br className="home-vision-heading-break" />
                            <span className="home-vision-heading-line2">your vision.</span>
                        </h2>
                        <div className="home-vision-line" aria-hidden="true" />
                    </div>
                    <div className="home-vision-content">
                        <div className="home-vision-text">
                            <p className="home-vision-para">
                            Every project has its own sound—we’re here to help you find it. We work closely with you and your team to understand your project’s audio needs and craft a sound that brings it to life. Whether you’re just starting out or deep in production, we can step in wherever you need us. From shaping a signature sound early on to integrating seamlessly with your existing workflow, we stay with you from first conversation to final release. And if you’re still exploring ideas, that’s perfectly fine—no obligation.
                            </p>
                            <Link to="/contact" className="home-vision-link">
                                Let's chat.
                            </Link>
                        </div>
                        <div className="home-vision-media">
                            <button
                                type="button"
                                className="home-vision-video-wrap home-vision-video-trigger"
                                onClick={() => setVisionVideoOpen(true)}
                                aria-label="Play video"
                            >
                                <video
                                    className="home-vision-video-poster"
                                    src={HOME_VISION_VIDEO}
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    aria-hidden
                                />
                                <span className="home-vision-video-play-icon" aria-hidden />
                            </button>
                        </div>
                        {visionVideoOpen && (
                            <div
                                ref={visionVideoBackdropRef}
                                className="portfolio-hero-video-backdrop"
                                onClick={() => setVisionVideoOpen(false)}
                                onKeyDown={(e) => e.key === "Escape" && setVisionVideoOpen(false)}
                                role="dialog"
                                aria-modal="true"
                                aria-label="Video"
                                tabIndex={0}
                            >
                                <button
                                    type="button"
                                    className="portfolio-hero-video-close"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setVisionVideoOpen(false);
                                    }}
                                    aria-label="Close video"
                                >
                                    ×
                                </button>
                                <div
                                    className="portfolio-hero-video-wrap"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <video
                                        ref={visionVideoRef}
                                        className="portfolio-hero-video"
                                        src={HOME_VISION_VIDEO}
                                        controls
                                        controlsList="nodownload noplaybackrate noremoteplayback"
                                        disablePictureInPicture
                                        autoPlay
                                        playsInline
                                        onContextMenu={(e) => e.preventDefault()}
                                        onEnded={() => visionVideoRef.current?.pause()}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Home;
