import { Link } from "react-router-dom";
import "./blog.css";
import { Col, Container, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Preview = ({ isMobile, title, author, date, tags, link, content, allTags }) => {
    // Helper function to get display name for tags
    const getTagDisplayName = (tag) => {
        if (typeof tag === 'string') {
            // If it's a string, find the corresponding tag object from the tags collection
            const currentLang = localStorage.getItem('selectedLanguage') || 'en';
            const allTagsArray = [...(allTags?.TOPIC || []), ...(allTags?.PROJECT || []), ...(allTags?.GENRE || [])];
            const tagObj = allTagsArray.find(t => t.name === tag);
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
    return (
        <Link to={link} style={{ textDecoration: "none" }}>
            <div
                style={{
                    position: "relative", // Required for pseudo-element positioning
                    padding: "5vw",
                    left: "15px",
                    backgroundColor: "black",
                    color: "black", // Black text for contrast
                    width: isMobile ? "90%" : "40vw", // Responsive width
                    maxWidth: "600px", // Max width for larger screens
                    textAlign: "left", // Center align text
                    margin: "15px",
                    textDecoration: "none",
                }}
            >
                {/* Drop Shadow Box (Pseudo-Element) */}
                <div
                    style={{
                        position: "absolute",
                        top: "-8px", // Slight offset below
                        left: "-8px", // Slight offset to the right
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        borderRadius: isMobile ? "0px" : "10px", // Match main box
                        zIndex: 0, // Place behind the main box
                        padding: "2vw",
                    }}
                />

                <h2
                    style={{
                        margin: "0 0 1rem 0",
                        fontSize: "1.2em",
                        textAlign: "left",
                        zIndex: 100,
                        position: "relative",
                    }}
                >
                    {title}
                </h2>

                {/* Author/Byline */}
                <div style={{
                    fontSize: "1em",
                    marginBottom: "8px",
                    zIndex: 100,
                    position: "relative",
                    textAlign: "left"
                }}>
                    by {author}
                </div>

                {/* Date */}
                <div style={{
                    fontSize: "0.9em",
                    marginBottom: "15px",
                    zIndex: 100,
                    position: "relative",
                    textAlign: "left",
                    color: "rgba(0, 0, 0, 0.6)"
                }}>
                    {date}
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div style={{ 
                        marginBottom: "15px", 
                        zIndex: 100, 
                        position: "relative" 
                    }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    style={{
                                        backgroundColor: "#CE0036",
                                        color: "white",
                                        padding: "3px 10px",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        border: "1px solid #CE0036"
                                    }}
                                >
                                    #{getTagDisplayName(tag)}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content Preview */}
                {/* {content && typeof content === 'string' && (
                    <div style={{ marginTop: "1rem", zIndex: 100, position: "relative" }}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({ children }) => <p style={{ marginBottom: "8px", fontSize: "0.9em", lineHeight: "1.4" }}>{children}</p>,
                                h1: ({ children }) => <h1 style={{ fontSize: "1em", marginBottom: "6px" }}>{children}</h1>,
                                h2: ({ children }) => <h2 style={{ fontSize: "0.95em", marginBottom: "4px" }}>{children}</h2>,
                                h3: ({ children }) => <h3 style={{ fontSize: "0.9em", marginBottom: "3px" }}>{children}</h3>,
                                ul: ({ children }) => <ul style={{ marginBottom: "6px", paddingLeft: "12px", fontSize: "0.85em" }}>{children}</ul>,
                                ol: ({ children }) => <ol style={{ marginBottom: "6px", paddingLeft: "12px", fontSize: "0.85em" }}>{children}</ol>,
                                li: ({ children }) => <li style={{ marginBottom: "2px" }}>{children}</li>,
                                code: ({ children }) => (
                                    <code style={{ 
                                        backgroundColor: "rgba(255,255,255,0.2)", 
                                        padding: "1px 3px", 
                                        borderRadius: "2px",
                                        fontSize: "0.8em"
                                    }}>
                                        {Array.isArray(children) ? children.join('') : children}
                                    </code>
                                ),
                                strong: ({ children }) => <strong>{children}</strong>,
                                em: ({ children }) => <em>{children}</em>,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )} */}
            </div>
            <hr
                style={{
                    border: "solid white 1px",
                    opacity: 1,
                    margin: "auto 10%",
                    marginTop:"7vw", // Further increased to account for drop shadow visual extension
                    marginBottom:  "9vw" , // Increased bottom margin for even spacing
                }}
            />
        </Link>
    );
};

export default Preview;
