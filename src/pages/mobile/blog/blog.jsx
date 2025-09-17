import { useEffect } from "react";
import BLOG_PAGES from "./pages";
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
    const [tags, setTags] = useState([]); // Will store grouped tags
    const [animatingPosts, setAnimatingPosts] = useState([]);

    const filteredPosts = BLOG_PAGES.filter((post) => {
        if (selectedTags.includes("View All")) return true;
        return post.tags.some((tag) => selectedTags.includes(tag[0])); // tag[0] is the name
    });

    // Save to localStorage whenever selectedTags changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedTags));
    }, [selectedTags]);

    useEffect(() => {
        // Group tags by sort category
        const groupedTags = {
            TOPIC: [],
            PROJECT: [],
            GENRE: []
        };

        // Collect all unique tags from all posts
        const tagCounts = {};

        BLOG_PAGES.forEach(post => {
            post.tags.forEach(tag => {
                const tagName = tag[0]; // First element is the name
                const sortCategory = tag[1]; // Second element is the sort category

                if (!tagCounts[tagName]) {
                    tagCounts[tagName] = { count: 0, sort: sortCategory };
                }
                tagCounts[tagName].count++;
            });
        });

        // Organize tags by category
        Object.keys(tagCounts).forEach(tagName => {
            const tagInfo = tagCounts[tagName];
            if (groupedTags[tagInfo.sort]) {
                groupedTags[tagInfo.sort].push({
                    name: tagName,
                    count: tagInfo.count,
                    sort: tagInfo.sort
                });
            }
        });

        setTags(groupedTags);
    }, []);

    // Handle tag selection with animation
    const toggleTag = (tagName) => {
        // Animate posts out first
        setAnimatingPosts(filteredPosts.map(post => post.path));

        setTimeout(() => {
            if (tagName === "View All") {
                setSelectedTags(["View All"]);
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
                                    {tags.TOPIC?.map((tag) => (
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
                                            {tag.name} ({tag.count})
                                        </button>
                                    ))}
                                </div>

                                {/* PROJECT Column */}
                                <div style={{ textAlign: "left" }}>
                                    <h3 style={{ color: "white", fontSize: "1.1em", marginBottom: "10px" }}>
                                        {t('blog.project')}
                                    </h3>
                                    {tags.PROJECT?.map((tag) => (
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
                                            {tag.name} ({tag.count})
                                        </button>
                                    ))}
                                </div>

                                {/* GENRE Column */}
                                <div style={{ textAlign: "left" }}>
                                    <h3 style={{ color: "white", fontSize: "1.1em", marginBottom: "10px" }}>
                                        {t('blog.genre')}
                                    </h3>
                                    {tags.GENRE?.map((tag) => (
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
                                            {tag.name} ({tag.count})
                                        </button>
                                    ))}
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
                            {filteredPosts.map((post) => (
                                <div
                                    key={post.path}
                                    style={{
                                        opacity: animatingPosts.includes(post.path) ? 0 : 1,
                                        transform: animatingPosts.includes(post.path)
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
                                        content={post.preview}
                                        link={post.path}
                                        isMobile={isMobile}
                                        tags={post.tags}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <BottomSection />
            </div>
        </>
    );
};

export default Blog;
