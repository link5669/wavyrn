import { useEffect } from "react";
import Preview from "./preview";
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import WavNavbar from "../../components/Navbar/Navbar";
import TrapezoidFrame from "../../components/TrapezoidFrame/TrapezoidFrame";
import DarkOverlay from "../../components/DarkOverlay/DarkOverlay";
import "./blog.css";
import Footer from "../../components/Footer";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTranslation } from "../../hooks/useTranslation";

const POSTS_PER_PAGE = 5;

const BLOG_HERO_IMAGE =
    "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Website%20Assets/Blog/20260221%20Blog.jpg?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";

function getFirstImageFromPost(post) {
    if (post.previewImage && post.previewImage.trim() !== "") return post.previewImage;
    if (post.image && post.image.trim() !== "") return post.image;
    const contentStr = typeof post.content === "string" ? post.content : "";
    const previewStr = typeof post.preview === "string" ? post.preview : "";
    const sources = [contentStr, previewStr].filter(Boolean);
    for (const raw of sources) {
        // Custom editor syntax: {image:URL}
        const customImg = raw.match(/\{image:([^}]+)\}/);
        if (customImg && customImg[1]) return customImg[1].trim();
        // HTML img
        const htmlImg = raw.match(/<img[^>]+src\s*=\s*["']([^"']+)["']/i);
        if (htmlImg && htmlImg[1]) return htmlImg[1];
        // Markdown image: ![alt](url)
        const mdImg = raw.match(/!\[[^\]]*\]\s*\(\s*([^)]+)\s*\)/);
        if (mdImg && mdImg[1]) return mdImg[1].trim();
    }
    return BLOG_HERO_IMAGE;
}

function getPageNumbers(totalPages, currentPage) {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
    const result = [];
    let prev = 0;
    for (const p of sorted) {
        if (p > prev + 1) result.push("…");
        result.push(p);
        prev = p;
    }
    return result;
}

const Blog = ({ isMobile }) => {
    const { t } = useTranslation();
    const [selectedTags, setSelectedTags] = useState(new Set());
    const [viewAll, setViewAll] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [tags, setTags] = useState({
        TOPIC: [],
        PROJECT: [],
        GENRE: []
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // AutoAnimate hook for smooth transitions
    const [postsParent, enableAnimations] = useAutoAnimate({
        duration: 400,
        easing: "ease-in-out",
        disrespectUserMotionPreference: false,
    });

    // Helper function to get display name for tags
    const getTagDisplayName = (tag) => {
        if (typeof tag === 'string') {
            // If it's a string, find the corresponding tag object from the tags collection
            const currentLang = localStorage.getItem('selectedLanguage') || 'en';
            const allTags = [...(tags.TOPIC || []), ...(tags.PROJECT || []), ...(tags.GENRE || [])];
            const tagObj = allTags.find(t => t.name === tag);
            if (tagObj && currentLang === 'jp' && tagObj.nameJP) {
                return tagObj.nameJP;
            }
            return tag;
        }
        const currentLang = localStorage.getItem('selectedLanguage') || 'en';
        if (currentLang === 'jp' && tag.nameJP) {
            return tag.nameJP;
        }
        return tag.name;
    };

    const filteredPosts = posts.filter((post) => {
        if (viewAll || selectedTags.size === 0) return true;
        return post.topics.some((topic) => selectedTags.has(topic));
    });

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
    const paginatedPosts = useMemo(
        () =>
            filteredPosts.slice(
                (currentPage - 1) * POSTS_PER_PAGE,
                currentPage * POSTS_PER_PAGE
            ),
        [filteredPosts, currentPage]
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTags, viewAll]);

    const handleTagToggle = (tagName) => {
        setViewAll(false); // Uncheck "View all" when any filter is selected
        setSelectedTags((prev) => {
            const newTags = new Set(prev);
            if (newTags.has(tagName)) {
                newTags.delete(tagName);
            } else {
                newTags.add(tagName);
            }
            
            // If no tags are selected after this toggle, automatically check "View All"
            if (newTags.size === 0) {
                setViewAll(true);
            }
            
            return newTags;
        });
    };

    const handleViewAllToggle = () => {
        setViewAll((prev) => {
            const newViewAll = !prev;
            if (newViewAll) {
                setSelectedTags(new Set()); // Clear all selected tags when "View all" is checked
            }
            return newViewAll;
        });
    };

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/blog`);
            const data = await response.json();
            if (response.ok) {
                setPosts(data.posts || []);
            } else {
                console.error("Failed to fetch posts:", data.error);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/filters/tags`);
            const data = await response.json();
            if (response.ok) {
                setTags(data.tags || { TOPIC: [], PROJECT: [], GENRE: [] });
            } else {
                console.error("Failed to fetch tags:", data.error);
            }
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchTags();
    }, []);

    const featuredPost = useMemo(() => {
        if (!posts.length) return null;
        const sorted = [...posts].sort((a, b) => {
            const timeA = a.date ? new Date(a.date).getTime() : 0;
            const timeB = b.date ? new Date(b.date).getTime() : 0;
            return Number.isNaN(timeB) ? 0 : timeB - timeA;
        });
        return sorted[0];
    }, [posts]);

    const featuredExcerpt = useMemo(() => {
        if (!featuredPost) return "";
        const raw = typeof featuredPost.preview === "string"
            ? featuredPost.preview
            : typeof featuredPost.content === "string"
                ? featuredPost.content
                : "";
        return raw ? raw.replace(/<[^>]+>/g, "").substring(0, 280).trim() + (raw.length > 280 ? "..." : "") : "";
    }, [featuredPost]);

    return (
        <>
            <WavNavbar showLogo={true} />
            <div className="blog-page-wrap"
                style={{
                    minHeight: "100vh",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "65px",
                }}
            >
                {/* Featured Stories banner */}
                <section className="blog-featured-banner">
                    <DarkOverlay className="blog-featured-banner-overlay" opacity={1} />
                    <TrapezoidFrame className="blog-featured-trapezoid" />
                    <div className="blog-featured-banner-inner">
                        <h1 className="blog-featured-title">{t("blog.featuredStories")}</h1>
                        <div className="blog-featured-title-line" aria-hidden="true" />
                        {featuredPost && (
                            <Link
                                to={featuredPost.slug ? `/blog/${featuredPost.slug}` : `/blog/${featuredPost.docId}`}
                                className="blog-featured-card"
                            >
                                <h2 className="blog-featured-card-title">{featuredPost.title}</h2>
                                {featuredPost.topics && featuredPost.topics.length > 0 && (
                                    <div className="blog-featured-tags">
                                        {featuredPost.topics.slice(0, 3).map((tagName) => (
                                            <span key={tagName} className="blog-featured-tag">
                                                {getTagDisplayName(tagName)}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {featuredExcerpt && (
                                    <p className="blog-featured-excerpt">{featuredExcerpt}</p>
                                )}
                                <span className="blog-featured-play" aria-label="Read story">
                                    {/* <span className="blog-featured-play-icon" /> */}
                                    →
                                </span>
                            </Link>
                        )}
                    </div>
                </section>

                <div className="blog-main">
                    <div className="posts-section" ref={postsParent}>
                        {loading ? (
                            <div className="blog-loading-state">
                                Loading blog posts...
                            </div>
                        ) : filteredPosts.length > 0 ? (
                            <>
                                {paginatedPosts.map((post) => (
                                    <Preview
                                        key={post.docId}
                                        title={post.title}
                                        author={post.author}
                                        date={post.date}
                                        tags={post.topics || []}
                                        image={getFirstImageFromPost(post)}
                                        content={typeof post.preview === "string" ? post.preview : (post.content && typeof post.content === "string" ? post.content.substring(0, 400) : "")}
                                        link={post.slug ? `/blog/${post.slug}` : `/blog/${post.docId}`}
                                        isMobile={isMobile}
                                        allTags={tags}
                                    />
                                ))}
                                {totalPages > 1 && (
                                    <nav className="blog-pagination" aria-label="Blog pagination">
                                        <button
                                            type="button"
                                            className="blog-pagination-btn blog-pagination-prev"
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            aria-label="Previous page"
                                        >
                                            &lt;
                                        </button>
                                        {getPageNumbers(totalPages, currentPage).map((item, i) =>
                                            item === "…" ? (
                                                <span key={`ellipsis-${i}`} className="blog-pagination-ellipsis">
                                                    …
                                                </span>
                                            ) : (
                                                <button
                                                    key={item}
                                                    type="button"
                                                    className={`blog-pagination-btn blog-pagination-num ${currentPage === item ? "blog-pagination-btn--active" : ""}`}
                                                    onClick={() => setCurrentPage(item)}
                                                    aria-label={`Page ${item}`}
                                                    aria-current={currentPage === item ? "page" : undefined}
                                                >
                                                    {item}
                                                </button>
                                            )
                                        )}
                                        <button
                                            type="button"
                                            className="blog-pagination-btn blog-pagination-next"
                                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            aria-label="Next page"
                                        >
                                            &gt;
                                        </button>
                                    </nav>
                                )}
                            </>
                        ) : (
                            <div className="blog-empty-state">
                                No blog posts found. {selectedTags.size > 0 ? "Try removing some filters." : "Check back later for new content!"}
                            </div>
                        )}
                    </div>

                    <aside className="tags-section" aria-label="Filter posts">
                        <h2 style={{ color: "#CE0036", fontSize: "1.5em", marginTop: "0", textAlign: "left" }}>{t('blog.filter')}</h2>
                        
                        {/* View All Checkbox */}
                        <div style={{ marginBottom: "10px" }}>
                            <label
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    fontSize: "1.1em",
                                    fontWeight: "600",
                                    color: "#CE0036"
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={viewAll}
                                    onChange={handleViewAllToggle}
                                    style={{ 
                                        marginRight: "10px",
                                        transform: "scale(1.2)"
                                    }}
                                />
                                {t('blog.viewAll')}
                            </label>
                        </div>
                        
                        {/* TOPIC Category */}
                        <div className="blog-filter-category" style={{ marginBottom: "30px" }}>
                            <h3 style={{ 
                                color: "#CE0036", 
                                fontSize: "1.5em", 
                                marginBottom: "8px",
                                fontWeight: "600"
                            }}>
                                {t('blog.topic')}
                            </h3>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {tags.TOPIC?.map((tag) => {
                                    const tagName = typeof tag === 'string' ? tag : tag.name;
                                    const displayName = getTagDisplayName(tag);
                                    return (
                                        <li key={tagName} style={{ marginBottom: "8px" }}>
                                            <label
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    fontSize: "0.95em"
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTags.has(tagName)}
                                                    onChange={() => handleTagToggle(tagName)}
                                                    style={{ 
                                                        marginRight: "10px",
                                                        transform: "scale(1.1)"
                                                    }}
                                                />
                                                {displayName} ({posts.filter(post => post.topics && post.topics.includes(tagName)).length})
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* PROJECT Category */}
                        <div className="blog-filter-category" style={{ marginBottom: "30px" }}>
                            <h3 style={{ 
                                color: "#CE0036", 
                                fontSize: "1.2em", 
                                marginBottom: "15px",
                                fontWeight: "600"
                            }}>
                                {t('blog.project')}
                            </h3>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {tags.PROJECT?.map((tag) => {
                                    const tagName = typeof tag === 'string' ? tag : tag.name;
                                    const displayName = getTagDisplayName(tag);
                                    return (
                                        <li key={tagName} style={{ marginBottom: "8px" }}>
                                            <label
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    fontSize: "0.95em"
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTags.has(tagName)}
                                                    onChange={() => handleTagToggle(tagName)}
                                                    style={{ 
                                                        marginRight: "10px",
                                                        transform: "scale(1.1)"
                                                    }}
                                                />
                                                {displayName} ({posts.filter(post => post.topics && post.topics.includes(tagName)).length})
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* GENRE Category */}
                        <div className="blog-filter-category" style={{ marginBottom: "30px" }}>
                            <h3 style={{ 
                                color: "#CE0036", 
                                fontSize: "1.2em", 
                                marginBottom: "15px",
                                fontWeight: "600"
                            }}>
                                {t('blog.genre')}
                            </h3>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {tags.GENRE?.map((tag) => {
                                    const tagName = typeof tag === 'string' ? tag : tag.name;
                                    const displayName = getTagDisplayName(tag);
                                    return (
                                        <li key={tagName} style={{ marginBottom: "8px" }}>
                                            <label
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    fontSize: "0.95em"
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTags.has(tagName)}
                                                    onChange={() => handleTagToggle(tagName)}
                                                    style={{ 
                                                        marginRight: "10px",
                                                        transform: "scale(1.1)"
                                                    }}
                                                />
                                                {displayName} ({posts.filter(post => post.topics && post.topics.includes(tagName)).length})
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </aside>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Blog;
