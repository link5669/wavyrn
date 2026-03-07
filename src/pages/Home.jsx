import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "@obinesto/react-infinite-scroll-carousel/dist/index.css";
import { Carousel } from "@obinesto/react-infinite-scroll-carousel";
import Footer from "../components/Footer";
import "./Home.css";
import Navbar from "../components/Navbar/Navbar";

const DEFAULT_ALBUM_COVER = "https://placehold.co/400x400/2a2520/5c4a3d?text=Album";

const TESTIMONIALS = [
    {
        quote: "Hexany Audio is the ultimate example of a truly reliable partner... the quality level that they're consistently able to hit, their ability to very quickly iterate on feedback, their deep knowledge of every single aspect of game audio, and their willingness to consistently go the extra mile. All those aspects make working with Hexany a real pleasure.",
        name: "Michael Tanner",
        company: "Hidden Cat Games",
    },
    {
        quote: "Cool audio studio",
        name: "Miles Acquaviva",
        company: "Everett Public Schools",
    },
     {
        quote: "beep boop",
        name: "Jenna Brown",
        company: "JP Licks",
    },
];

/* Carousel uses album art from the same API as Portfolio Projects section (api/albums) */

const HOME_VISION_VIDEO =
    "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Misc.%20Media/TEKHA%20T01%20Full%20Character%20Showcase.mp4?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=1";

const CARD_OFFSET = 12;
const SLOT_POSITIONS = [
    { x: 0, y: 2 * CARD_OFFSET },           /* front: down-left */
    { x: CARD_OFFSET, y: CARD_OFFSET },     /* mid */
    { x: 2 * CARD_OFFSET, y: 0 },          /* back: up-right */
];

function Home() {
    const n = TESTIMONIALS.length;
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
                <section className="home-carousel-section home-carousel-section--auto-only" aria-label="Project album art">
                    <Carousel
                        items={albums}
                        keyExtractor={(item, index) => item.docId || item.id || index}
                        renderItem={(album) => (
                            <img
                                src={album.coverUrl || DEFAULT_ALBUM_COVER}
                                alt=""
                                className="home-carousel-img"
                            />
                        )}
                        itemClassName="home-carousel-item"
                        containerClassName="home-carousel-container"
                        scrollInterval={20}
                        scrollAmount={8}
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
                                        <blockquote className="home-testimonial-quote">
                                            {testimonial.quote}
                                        </blockquote>
                                        <footer className="home-testimonial-attribution">
                                            <span className="home-testimonial-name">{testimonial.name}</span>
                                            <span className="home-testimonial-company"><i>{testimonial.company}</i></span>
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
                        <h2 className="home-vision-heading">Let's talk about your vision.</h2>
                        <div className="home-vision-line" aria-hidden="true" />
                    </div>
                    <div className="home-vision-content">
                        <div className="home-vision-text">
                            <p className="home-vision-para">
                                We partner with our clients to work as a true extension of their team. We help you develop your vision and strategy, design and build your team, manage budgets and schedules, and provide ongoing support throughout production. And then we stay in the trenches with you until it's time to celebrate.
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
                                        autoPlay
                                        playsInline
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
