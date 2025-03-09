import { useEffect } from "react";
import BLOG_PAGES from "./pages";
import Preview from "./preview";
import React, { useState } from "react";
import DesktopNav from "../../../components/Navbar/Navbar";
import MobileNav from "../../../components/Navbar/MobileNavbar/MobileNavbar";
import BottomSection from "../../../components/BottomSection/BottomSection";
import "./blog.css";
const Blog = ({ isMobile }) => {
    const [selectedTag, setSelectedTag] = useState("View All"); // Track the selected tag
    const [tags, setTags] = useState([]); // List of all tags

    const filteredPosts = BLOG_PAGES.filter((post) => {
        if (!selectedTag || selectedTag == "View All") return true; // Show all posts if no tag is selected
        return post.tags.includes(selectedTag); // Show only posts with the selected tag
    });

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
                            justifyContent: "center",
                        }}
                    >
                        {/* Tag Buttons */}
                        {tags.map((tag) => (
                            <button
                                key={tag.tag}
                                style={{
                                    flexShrink: 0, // Prevent buttons from shrinking
                                    padding: "8px 16px",
                                    backgroundColor:
                                        selectedTag === tag.tag ||
                                        (selectedTag == null &&
                                            tag.tag == "View All")
                                            ? "#ddd"
                                            : "white", // Highlight selected tag
                                    border: "none",
                                    borderRadius: "20px", // Rounded corners
                                    color: "black",
                                    cursor: "pointer",
                                    fontSize: "1em",
                                }}
                                onClick={() =>
                                    tag.tag == "View All"
                                        ? setSelectedTag(null)
                                        : setSelectedTag(tag.tag)
                                } // Filter posts by this tag
                            >
                                {tag.tag == "View All" ? (
                                    <>#{tag.tag}</>
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
