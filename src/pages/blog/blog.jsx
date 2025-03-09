import { useEffect } from "react";
import BLOG_PAGES from "./pages";
import Preview from "./preview";
import React, { useState } from "react";
import WavNavbar from "../../components/Navbar/Navbar";
import "./blog.css";
const Blog = ({ isMobile }) => {
    const [selectedTags, setSelectedTags] = useState(new Set());
    const [tags, setTags] = useState([]);

    const filteredPosts = BLOG_PAGES.filter((post) => {
        if (selectedTags.size === 0) return true; // Show all when no tags selected
        return post.tags.some((tag) => selectedTags.has(tag));
    });

    const handleTagToggle = (tag) => {
        setSelectedTags((prev) => {
            const newTags = new Set(prev);
            if (newTags.has(tag)) {
                newTags.delete(tag);
            } else {
                newTags.add(tag);
            }
            return newTags;
        });
    };

    useEffect(() => {
        let tagCollector = [];
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
            <WavNavbar showLogo={true} />
            <div
                style={{
                    backgroundColor: "RGB(1,1,1)",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "45px",
                }}
            >
                <div style={{ display: "flex", flex: 1 }}>
                    <div className="posts-section">
                        {filteredPosts.map((e) => (
                            <Preview
                                key={e.path}
                                title={e.title}
                                subtitle={e.byline}
                                image={e.image}
                                content={e.preview}
                                link={e.path}
                                isMobile={isMobile}
                            />
                        ))}
                    </div>

                    {!isMobile && (
                        <div className="tags-section">
                            <br />
                            <h2>Filter by Tags</h2>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {tags.map((tag) => (
                                    <li
                                        key={tag.tag}
                                        style={{ marginBottom: "10px" }}
                                    >
                                        <label
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedTags.has(
                                                    tag.tag,
                                                )}
                                                onChange={() =>
                                                    handleTagToggle(tag.tag)
                                                }
                                                style={{ marginRight: "8px" }}
                                            />
                                            {tag.tag} ({tag.count})
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <footer
                    style={{
                        backgroundColor: "black",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "50px",
                    }}
                >
                    <p
                        style={{
                            color: "white",
                            textAlign: "center",
                            lineHeight: "50px",
                        }}
                    >
                        ©️2025 Wavyrn • All Rights Reserved
                    </p>
                </footer>
            </div>
        </>
    );
};

export default Blog;
