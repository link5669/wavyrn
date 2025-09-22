import { useEffect } from "react";
import Preview from "./preview";
import React, { useState } from "react";
import WavNavbar from "../../components/Navbar/Navbar";
import "./blog.css";
import Footer from "../../components/Footer";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTranslation } from "../../hooks/useTranslation";

const Blog = ({ isMobile }) => {
    const { t } = useTranslation();
    const [selectedTags, setSelectedTags] = useState(new Set());
    const [viewAll, setViewAll] = useState(true); // New state for "View all" checkbox
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
        if (viewAll || selectedTags.size === 0) return true; // Show all when "View all" is checked or no tags selected
        return post.topics.some((topic) => selectedTags.has(topic)); // topics is an array of strings
    });

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

    return (
        <>
            <WavNavbar showLogo={true} />
            <div
                style={{
                    backgroundColor: "white !important",
                    minHeight: "100vh",
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "45px",
                }}
            >
                <div style={{ display: "flex", flex: 1 }}>
                    <div className="posts-section" ref={postsParent}>
                        {loading ? (
                            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                                Loading blog posts...
                            </div>
                        ) : filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <Preview
                                    key={post.docId}
                                    title={post.title}
                                    author={post.author}
                                    date={post.date}
                                    tags={post.topics || []}
                                    image=""
                                    content={post.preview || post.content.substring(0, 200) + "..."}
                                    link={post.slug ? `/blog/${post.slug}` : `/blog/${post.docId}`}
                                    isMobile={isMobile}
                                    allTags={tags}
                                />
                            ))
                        ) : (
                            <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                                No blog posts found. {selectedTags.size > 0 ? "Try removing some filters." : "Check back later for new content!"}
                            </div>
                        )}
                    </div>


                    <div className="tags-section">
                        <h2 style={{ color: "#CE0036", marginTop: "0", textAlign: "left" }}>{t('blog.filter')}</h2>
                        
                        {/* View All Checkbox */}
                        <div style={{ marginBottom: "20px" }}>
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
                        <div style={{ marginBottom: "30px" }}>
                            <h3 style={{ 
                                color: "#CE0036", 
                                fontSize: "1.2em", 
                                marginBottom: "15px",
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
                        <div style={{ marginBottom: "30px" }}>
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
                        <div style={{ marginBottom: "30px" }}>
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
                    </div>

                </div>
                <Footer />
            </div>
        </>
    );
};

export default Blog;
