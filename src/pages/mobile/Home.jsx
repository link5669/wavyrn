import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@obinesto/react-infinite-scroll-carousel/dist/index.css";
import { Carousel } from "@obinesto/react-infinite-scroll-carousel";
import "../Home.css";

const TESTIMONIALS = [
    {
        quote: "Hexany Audio is the ultimate example of a truly reliable partner... the quality level that they're consistently able to hit, their ability to very quickly iterate on feedback, their deep knowledge of every single aspect of game audio, and their willingness to consistently go the extra mile. All those aspects make working with Hexany a real pleasure.",
        name: "Michael Tanner",
        company: "Hidden Cat Games",
    },
];

const CAROUSEL_ITEMS = [
    { id: 1, src: "https://placehold.co/400x400/2a2520/5c4a3d?text=1" },
    { id: 2, src: "https://placehold.co/400x400/3d2c29/6b4a45?text=2" },
    { id: 3, src: "https://placehold.co/400x400/1e3a2f/3d6b5a?text=3" },
    { id: 4, src: "https://placehold.co/400x400/2d2a1e/5c5840?text=4" },
    { id: 5, src: "https://placehold.co/400x400/3d2a3a/6b4a5a?text=5" },
    { id: 6, src: "https://placehold.co/400x400/1a2a2a/3d5a5a?text=6" },
];

function MobileHome() {
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [swapDirection, setSwapDirection] = useState("next");
    const currentTestimonial = TESTIMONIALS[testimonialIndex];
    const goPrev = () => {
        setSwapDirection("prev");
        setTestimonialIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };
    const goNext = () => {
        setSwapDirection("next");
        setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length);
    };

    return (
        <div className="home-page-wrap">
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

            <section className="home-carousel-section">
                <Carousel
                    items={CAROUSEL_ITEMS}
                    keyExtractor={(item, index) => index}
                    renderItem={(item) => (
                        <img
                            src={item.src}
                            alt=""
                            className="home-carousel-img"
                        />
                    )}
                    itemClassName="home-carousel-item"
                    containerClassName="home-carousel-container"
                    scrollInterval={16}
                    scrollAmount={1}
                    loadMoreThreshold={5}
                />
            </section>

            <section className="home-testimonials">
                <div className="home-testimonials-bg" aria-hidden="true" />
                <h2 className="home-testimonials-heading">TESTIMONIALS</h2>
                <div className="home-testimonials-stack">
                    <div className="home-testimonial-card-wrap home-testimonial-card-wrap-back">
                        <div className="home-testimonial-card home-testimonial-card-back" aria-hidden="true" />
                        <div className="home-testimonial-card-outline home-testimonial-card-outline-gray" aria-hidden="true" />
                    </div>
                    <div className="home-testimonial-card-wrap home-testimonial-card-wrap-mid">
                        <div className="home-testimonial-card home-testimonial-card-mid" aria-hidden="true" />
                        <div className="home-testimonial-card-outline home-testimonial-card-outline-gray" aria-hidden="true" />
                    </div>
                    <div className="home-testimonial-card-wrap home-testimonial-card-wrap-front">
                        <div className="home-testimonial-card home-testimonial-card-front">
                            <div
                                key={testimonialIndex}
                                className={`home-testimonial-content home-testimonial-swap-${swapDirection}`}
                            >
                                <blockquote className="home-testimonial-quote">
                                    {currentTestimonial.quote}
                                </blockquote>
                                <footer className="home-testimonial-attribution">
                                    <span className="home-testimonial-name">{currentTestimonial.name}</span>
                                    <span className="home-testimonial-company">{currentTestimonial.company}</span>
                                </footer>
                                <div className="home-testimonial-nav">
                                    <button type="button" className="home-testimonial-arrow" aria-label="Previous testimonial" onClick={goPrev}>‹</button>
                                    <button type="button" className="home-testimonial-arrow" aria-label="Next testimonial" onClick={goNext}>›</button>
                                </div>
                            </div>
                        </div>
                        <div className="home-testimonial-card-outline home-testimonial-card-outline-red" aria-hidden="true" />
                    </div>
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
                            <div className="home-vision-video-wrap">
                                <iframe
                                    src="https://www.youtube.com/embed/GuOGbvwdMWk?si=f0lxC3rxtVjBykuK"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    className="home-vision-video"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MobileHome;
