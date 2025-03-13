import { useEffect } from "react";
import BLOG_PAGES from "./pages";
import Preview from "./preview";
import React, { useState } from "react";
import DesktopNav from "../../../components/Navbar/Navbar";
import MobileNav from "../../../components/Navbar/MobileNavbar/MobileNavbar";
import BottomSection from "../../../components/BottomSection/BottomSection";
import "./blog.css";

const STORAGE_KEY = "blogSelectedTags";

const Blog = ({ isMobile }) => {
    // Initialize selected tags from localStorage or default to ["View All"]
    const [selectedTags, setSelectedTags] = useState(() => {
        const savedTags = localStorage.getItem(STORAGE_KEY);
        return savedTags ? JSON.parse(savedTags) : ["View All"];
    });

    const [tags, setTags] = useState([]); // List of all tags

    const filteredPosts = BLOG_PAGES.filter((post) => {
        // If "View All" is selected, show all posts
        if (selectedTags.includes("View All")) return true;

        // If any of the post's tags are in the selected tags, show the post
        return post.tags.some((tag) => selectedTags.includes(tag));
    });

    // Save to localStorage whenever selectedTags changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedTags));
    }, [selectedTags]);

    useEffect(() => {
        let tagCollector = [{ tag: "View All", count: 1 }];
        for (let i = 0; i < BLOG_PAGES.length; i++) {
            for (let j = 0; j < BLOG_PAGES[i].tags.length; j++) {
                if (
                    tagCollector.filter((e) => e.tag == BLOG_PAGES[i].tags[j])
                        .length > 0
                ) {
                    for (let k = 0; k < tagCollector.length; k++) {
                        if (tagCollector[k].tag == BLOG_PAGES[i].tags[j])
                            tagCollector[k].count++;
                    }
                } else {
                    tagCollector.push({ tag: BLOG_PAGES[i].tags[j], count: 1 });
                }
            }
        }
        setTags(tagCollector);
    }, []);

    // Handle tag selection/deselection
    const toggleTag = (tagName) => {
        if (tagName === "View All") {
            // If "View All" is clicked, clear other selections
            setSelectedTags(["View All"]);
            return;
        }

        // Create a new array based on current selection
        let newSelectedTags = [...selectedTags];

        // If "View All" is currently selected, remove it
        if (newSelectedTags.includes("View All")) {
            newSelectedTags = newSelectedTags.filter(
                (tag) => tag !== "View All",
            );
        }

        // Toggle the clicked tag
        if (newSelectedTags.includes(tagName)) {
            // Remove tag if already selected
            newSelectedTags = newSelectedTags.filter((tag) => tag !== tagName);
        } else {
            // Add tag if not already selected
            newSelectedTags.push(tagName);
        }

        // If no tags are selected, default to "View All"
        if (newSelectedTags.length === 0) {
            newSelectedTags = ["View All"];
        }

        setSelectedTags(newSelectedTags);
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
                    paddingTop: "30px",
                    zIndex: 0,
                    width: "100vw",
                    justifyContent: "center",
                    paddingTop: isMobile ? 0 : "9vh",
                }}
            >
                <h1 style={{ color: "white" }}>Blog</h1>
                <div style={{ justifyContent: "center" }}>
                    <div
                        style={{
                            display: "flex",
                            overflowX: "scroll", // Enable horizontal scrolling
                            gap: "8px", // Space between buttons
                            padding: "8px 0", // Add some padding
                        }}
                    >
                        {/* Tag Buttons */}
                        {tags.map((tag) => (
                            <button
                                key={tag.tag}
                                style={{
                                    flexShrink: 0, // Prevent buttons from shrinking
                                    padding: "8px 16px",
                                    backgroundColor: selectedTags.includes(
                                        tag.tag,
                                    )
                                        ? "#ddd"
                                        : "white", // Highlight selected tags
                                    border: "none",
                                    borderRadius: "20px", // Rounded corners
                                    color: "black",
                                    cursor: "pointer",
                                    fontSize: "1em",
                                }}
                                onClick={() => toggleTag(tag.tag)}
                            >
                                {tag.tag === "View All" ? (
                                    <>{tag.tag}</>
                                ) : (
                                    <>
                                        #{tag.tag} ({tag.count})
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <div>
                        <hr
                            style={{
                                border: "solid white 1px",
                                opacity: 1,
                                margin: isMobile && "auto 10%",
                                marginTop: isMobile && "6vw",
                            }}
                        />
                        {filteredPosts.map((e) => (
                            <Preview
                                key={e.path}
                                title={e.title}
                                author={e.author}
                                date={e.date}
                                subtitle={e.byline}
                                image={e.image}
                                content={e.preview}
                                link={e.path}
                                isMobile={isMobile}
                                tags={e.tags}
                            />
                        ))}
                    </div>
                </div>
                <BottomSection />
            </div>
        </>
    );
};

export default Blog;
