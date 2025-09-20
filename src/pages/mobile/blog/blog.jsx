import { useEffect } from "react";
import Preview from "./preview";
import React, { useState } from "react";
import DesktopNav from "../../../components/Navbar/Navbar";
import MobileNav from "../../../components/Navbar/MobileNavbar/MobileNavbar";
import BottomSection from "../../../components/BottomSection/BottomSection";
import "./blog.css";
import { useTranslation } from "../../../hooks/useTranslation";

const STORAGE_KEY = "blogSelectedTags";

const Blog = ({ isMobile }) => {
    const { t } = useTranslation();
    const [selectedTags, setSelectedTags] = useState(() => {
        const savedTags = localStorage.getItem(STORAGE_KEY);
        return savedTags ? JSON.parse(savedTags) : ["View All"];
    });

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [tags, setTags] = useState({
        TOPIC: [],
        PROJECT: [],
        GENRE: []
    });
    const [tagsWithCounts, setTagsWithCounts] = useState({
        TOPIC: [],
        PROJECT: [],
        GENRE: []
    });
    const [animatingPosts, setAnimatingPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

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
        if (selectedTags.includes("View All")) return true;
        return post.topics.some((topic) => {
            const topicName = typeof topic === 'string' ? topic : topic.name;
            return selectedTags.includes(topicName);
        });
    });

    // Save to localStorage whenever selectedTags changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedTags));
    }, [selectedTags]);

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

    // Calculate tag counts from posts
    const calculateTagCounts = (posts) => {
        const tagCounts = {};
        
        posts.forEach(post => {
            if (post.topics && Array.isArray(post.topics)) {
                post.topics.forEach(topic => {
                    const topicName = typeof topic === 'string' ? topic : topic.name;
                    if (!tagCounts[topicName]) {
                        tagCounts[topicName] = 0;
                    }
                    tagCounts[topicName]++;
                });
            }
        });

        // Convert to the expected format with name and count
        const tagsWithCounts = {
            TOPIC: [],
            PROJECT: [],
            GENRE: []
        };

        // Get the tag categories from the API response
        Object.keys(tags).forEach(category => {
            if (tags[category] && Array.isArray(tags[category])) {
                tags[category].forEach(tag => {
                    const tagName = typeof tag === 'string' ? tag : tag.name;
                    const count = tagCounts[tagName] || 0;
                    tagsWithCounts[category].push({
                        name: tagName,
                        count: count
                    });
                });
            }
        });

        return tagsWithCounts;
    };

    useEffect(() => {
        fetchPosts();
        fetchTags();
    }, []);

    // Calculate tag counts when posts or tags change
    useEffect(() => {
        if (posts.length > 0 && Object.keys(tags).length > 0) {
            const calculatedTags = calculateTagCounts(posts);
            setTagsWithCounts(calculatedTags);
        }
    }, [posts, tags]);

    // Handle tag selection with animation
    const toggleTag = (tagName) => {
        // Animate posts out first
        setAnimatingPosts(filteredPosts.map(post => post.docId));

        setTimeout(() => {
            if (tagName === "View All") {
                // Toggle "View All" - if it's currently selected, uncheck it, otherwise check it
                if (selectedTags.includes("View All")) {
                    setSelectedTags([]); // Uncheck "View All", show no filters
                } else {
                    setSelectedTags(["View All"]); // Check "View All", clear other filters
                }
            } else {
                let newSelectedTags = [...selectedTags];

                if (newSelectedTags.includes("View All")) {
                    newSelectedTags = newSelectedTags.filter(tag => tag !== "View All");
                }

                if (newSelectedTags.includes(tagName)) {
                    newSelectedTags = newSelectedTags.filter(tag => tag !== tagName);
                } else {
                    newSelectedTags.push(tagName);
                }

                if (newSelectedTags.length === 0) {
                    newSelectedTags = ["View All"];
                }

                setSelectedTags(newSelectedTags);
            }

            // Clear animating posts after a short delay
            setTimeout(() => setAnimatingPosts([]), 50);
        }, 200);
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    return (
        <>
            {isMobile ? (
                <MobileNav showLogo={true} />
            ) : (
                <DesktopNav showLogo={true} />
            )}

            <div
                className="mobile-page-container"
                style={{
                    backgroundColor: "#ce0036",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    width: "100vw",
                }}
            >
                {/* Fixed Header */}
                <div
                    style={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#ce0036",
                        zIndex: 100,
                        paddingTop: isMobile ? "10px" : "9vh",
                        paddingBottom: "20px",
                    }}
                >
                    <h1 style={{ color: "white", fontSize: "2em", margin: "0 0 20px 0" }}>
                        {t('nav.blog')}
                    </h1>

                    {/* Filter Controls */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {/* Open Filter Button */}
                        <button
                            onClick={toggleFilter}
                            style={{
                                padding: "12px 24px",
                                backgroundColor: "white",
                                border: "none",
                                borderRadius: "25px",
                                color: "black",
                                cursor: "pointer",
                                fontSize: "1em",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "10px",
                            }}
                        >
                            {t('blog.openFilter')}
                            <span style={{
                                transform: isFilterOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.3s ease"
                            }}>
                                ▼
                            </span>
                        </button>

                        {/* Sliding Filter Menu */}
                        <div
                            style={{
                                maxHeight: isFilterOpen ? "400px" : "0",
                                overflow: "hidden",
                                transition: "max-height 0.3s ease-in-out",
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            {/* View All Button */}
                            <button
                                onClick={() => toggleTag("View All")}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: selectedTags.includes("View All") ? "#ddd" : "white",
                                    border: "none",
                                    borderRadius: "20px",
                                    color: "black",
                                    cursor: "pointer",
                                    fontSize: "1em",
                                    margin: "10px 0",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                <span style={{
                                    width: "16px",
                                    height: "16px",
                                    border: "2px solid black",
                                    borderRadius: "3px",
                                    display: "inline-block",
                                    position: "relative",
                                }}>
                                    {selectedTags.includes("View All") && (
                                        <span style={{
                                            position: "absolute",
                                            top: "1px",
                                            left: "4px",
                                            fontSize: "10px",
                                        }}>✓</span>
                                    )}
                                </span>
                                {t('blog.closeFilter')}
                            </button>

                            {/* Filter Categories */}
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "20px",
                                width: "90%",
                                maxWidth: "600px",
                                alignItems: "start",
                            }}>
                                {/* TOPIC Column */}
                                <div style={{ textAlign: "left" }}>
                                    <h3 style={{ color: "white", fontSize: "1.1em", marginBottom: "10px" }}>
                                        {t('blog.topic')}
                                    </h3>
                                    {tagsWithCounts.TOPIC?.map((tag) => {
                                        const displayName = getTagDisplayName(tag);
                                        return (
                                            <button
                                                key={tag.name}
                                                onClick={() => toggleTag(tag.name)}
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    padding: "6px 12px",
                                                    backgroundColor: selectedTags.includes(tag.name) ? "#ddd" : "white",
                                                    border: "none",
                                                    borderRadius: "15px",
                                                    color: "black",
                                                    cursor: "pointer",
                                                    fontSize: "0.9em",
                                                    margin: "4px 0",
                                                    textAlign: "left",
                                                }}
                                            >
                                                {displayName} ({tag.count})
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* PROJECT Column */}
                                <div style={{ textAlign: "left" }}>
                                    <h3 style={{ color: "white", fontSize: "1.1em", marginBottom: "10px" }}>
                                        {t('blog.project')}
                                    </h3>
                                    {tagsWithCounts.PROJECT?.map((tag) => {
                                        const displayName = getTagDisplayName(tag);
                                        return (
                                            <button
                                                key={tag.name}
                                                onClick={() => toggleTag(tag.name)}
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    padding: "6px 12px",
                                                    backgroundColor: selectedTags.includes(tag.name) ? "#ddd" : "white",
                                                    border: "none",
                                                    borderRadius: "15px",
                                                    color: "black",
                                                    cursor: "pointer",
                                                    fontSize: "0.9em",
                                                    margin: "4px 0",
                                                    textAlign: "left",
                                                }}
                                            >
                                                {displayName} ({tag.count})
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* GENRE Column */}
                                <div style={{ textAlign: "left" }}>
                                    <h3 style={{ color: "white", fontSize: "1.1em", marginBottom: "10px" }}>
                                        {t('blog.genre')}
                                    </h3>
                                    {tagsWithCounts.GENRE?.map((tag) => {
                                        const displayName = getTagDisplayName(tag);
                                        return (
                                            <button
                                                key={tag.name}
                                                onClick={() => toggleTag(tag.name)}
                                                style={{
                                                    display: "block",
                                                    width: "100%",
                                                    padding: "6px 12px",
                                                    backgroundColor: selectedTags.includes(tag.name) ? "#ddd" : "white",
                                                    border: "none",
                                                    borderRadius: "15px",
                                                    color: "black",
                                                    cursor: "pointer",
                                                    fontSize: "0.9em",
                                                    margin: "4px 0",
                                                    textAlign: "left",
                                                }}
                                            >
                                                {displayName} ({tag.count})
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <hr
                            style={{
                                border: "solid white 1px",
                                opacity: 1,
                                width: isMobile ? "80%" : "60%",
                                margin: "20px 0 0 0",
                            }}
                        />
                    </div>
                </div>

                {/* Posts Section */}
                <div className="posts-section" style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div>
                            {loading ? (
                                <div style={{ textAlign: "center", padding: "40px", color: "white" }}>
                                    Loading blog posts...
                                </div>
                            ) : filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    <div
                                        key={post.docId}
                                        style={{
                                            opacity: animatingPosts.includes(post.docId) ? 0 : 1,
                                            transform: animatingPosts.includes(post.docId)
                                                ? "translateY(20px)" : "translateY(0)",
                                            transition: "opacity 0.2s ease, transform 0.2s ease",
                                        }}
                                    >
                                        <Preview
                                            title={post.title}
                                            author={post.author}
                                            date={post.date}
                                            subtitle={post.byline}
                                            image={post.image}
                                            content={post.preview || post.content.substring(0, 200) + "..."}
                                            link={`/blog/${post.docId}`}
                                            isMobile={isMobile}
                                            tags={post.topics || []}
                                            allTags={tags}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div style={{ textAlign: "center", padding: "40px", color: "white" }}>
                                    No blog posts found. {selectedTags.length > 1 ? "Try removing some filters." : "Check back later for new content!"}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <BottomSection />
            </div>
        </>
    );
};

export default Blog;
