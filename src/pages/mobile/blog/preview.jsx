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
                {content && typeof content === 'string' && (
                    <div style={{ 
                        marginTop: "1rem", 
                        zIndex: 100, 
                        position: "relative",
                        lineHeight: "1.5",
                        wordBreak: "break-word"
                    }}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({ children }) => <p style={{ marginBottom: "8px", fontSize: "0.9em", lineHeight: "1.4" }}>{children}</p>,
                                h1: ({ children }) => <h1 style={{ fontSize: "1em", marginBottom: "6px" }}>{children}</h1>,
                                h2: ({ children }) => <h2 style={{ fontSize: "0.95em", marginBottom: "4px" }}>{children}</h2>,
                                h3: ({ children }) => <h3 style={{ fontSize: "0.9em", marginBottom: "3px" }}>{children}</h3>,
                                h4: ({ children }) => <h4 style={{ fontSize: "0.85em", marginBottom: "2px" }}>{children}</h4>,
                                h5: ({ children }) => <h5 style={{ fontSize: "0.8em", marginBottom: "2px" }}>{children}</h5>,
                                h6: ({ children }) => <h6 style={{ fontSize: "0.75em", marginBottom: "2px" }}>{children}</h6>,
                                ul: ({ children }) => <ul style={{ marginBottom: "6px", paddingLeft: "12px", fontSize: "0.85em" }}>{children}</ul>,
                                ol: ({ children }) => <ol style={{ marginBottom: "6px", paddingLeft: "12px", fontSize: "0.85em" }}>{children}</ol>,
                                li: ({ children }) => <li style={{ marginBottom: "2px" }}>{children}</li>,
                                blockquote: ({ children }) => (
                                    <blockquote style={{ 
                                        borderLeft: "3px solid #CE0036", 
                                        paddingLeft: "8px", 
                                        margin: "6px 0", 
                                        fontStyle: "italic",
                                        fontSize: "0.85em"
                                    }}>
                                        {children}
                                    </blockquote>
                                ),
                                code: ({ children }) => (
                                    <code style={{ 
                                        backgroundColor: "rgba(255,255,255,0.2)", 
                                        padding: "1px 3px", 
                                        borderRadius: "2px",
                                        fontSize: "0.8em",
                                        fontFamily: "monospace"
                                    }}>
                                        {typeof children === 'string' ? children : 
                                         Array.isArray(children) ? children.join('') : 
                                         children}
                                    </code>
                                ),
                                pre: ({ children }) => (
                                    <pre style={{ 
                                        backgroundColor: "rgba(0,0,0,0.1)", 
                                        padding: "6px", 
                                        borderRadius: "4px",
                                        overflow: "auto",
                                        margin: "4px 0",
                                        fontSize: "0.75em",
                                        fontFamily: "monospace"
                                    }}>
                                        {children}
                                    </pre>
                                ),
                                a: ({ href, children }) => (
                                    <a 
                                        href={href} 
                                        style={{ 
                                            color: "#CE0036", 
                                            textDecoration: "underline",
                                            fontSize: "0.9em"
                                        }}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        {children}
                                    </a>
                                ),
                                table: ({ children }) => (
                                    <table style={{ 
                                        borderCollapse: "collapse", 
                                        width: "100%", 
                                        fontSize: "0.8em",
                                        margin: "4px 0"
                                    }}>
                                        {children}
                                    </table>
                                ),
                                th: ({ children }) => (
                                    <th style={{ 
                                        border: "1px solid rgba(255,255,255,0.3)", 
                                        padding: "4px", 
                                        backgroundColor: "rgba(255,255,255,0.1)",
                                        fontWeight: "bold"
                                    }}>
                                        {children}
                                    </th>
                                ),
                                td: ({ children }) => (
                                    <td style={{ 
                                        border: "1px solid rgba(255,255,255,0.3)", 
                                        padding: "4px"
                                    }}>
                                        {children}
                                    </td>
                                ),
                                strong: ({ children }) => <strong>{children}</strong>,
                                em: ({ children }) => <em>{children}</em>,
                                del: ({ children }) => <del style={{ textDecoration: "line-through", opacity: 0.7 }}>{children}</del>,
                                hr: () => <hr style={{ border: "1px solid rgba(255,255,255,0.3)", margin: "8px 0" }} />,
                                text: ({ children }) => {
                                    // Handle raw text that might contain asterisks
                                    if (typeof children === 'string') {
                                        return children;
                                    }
                                    return children;
                                },
                            }}
                        >
                            {(() => {
                                // Preprocess content to handle any markdown issues
                                let processedContent = content.length > 200 ? content.substring(0, 200) + '...' : content;
                                
                                // Clean up any problematic patterns that might cause asterisks to appear
                                processedContent = processedContent
                                    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>') // Handle bold+italic
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Handle bold
                                    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Handle italic
                                    .replace(/^\*\s/gm, '• ') // Convert list asterisks to bullets
                                    .replace(/^\d+\.\s/gm, '• ') // Convert numbered lists to bullets for preview
                                    .replace(/\n\*\s/g, '\n• ') // Convert line-start asterisks to bullets
                                    .replace(/\*\s/g, '• '); // Convert remaining asterisks to bullets
                                
                                return processedContent;
                            })()}
                        </ReactMarkdown>
                    </div>
                )}
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
