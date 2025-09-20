import { Link } from "react-router-dom";
import "./blog.css";
import { Col, Container, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Preview = ({ isMobile, title, author, date, tags, link, content }) => {
    return (
        <Link to={link} style={{ textDecoration: "none" }}>
            <div
                style={{
                    position: "relative", // Required for pseudo-element positioning
                    padding: "5vw",
                    backgroundColor: "rgba(0,0,0,.8)",
                    color: "white", // White text for contrast
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
                        top: "8px", // Slight offset below
                        left: "8px", // Slight offset to the right
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,.5)",
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
                    color: "rgba(255, 255, 255, 0.8)"
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
                                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                                        color: "white",
                                        padding: "3px 10px",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        border: "1px solid rgba(255, 255, 255, 0.3)"
                                    }}
                                >
                                    #{tag[0] || tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content Preview */}
                {content && typeof content === 'string' && (
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
                )}
            </div>
            <hr
                style={{
                    border: "solid white 1px",
                    opacity: 1,
                    margin: "auto 10%",
                    marginTop: isMobile && "6vw",
                }}
            />
        </Link>
    );
};

export default Preview;
