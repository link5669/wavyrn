import { Link } from "react-router-dom";
import "./blog.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Preview = ({ isMobile, title, image, author, date, tags, content, link, allTags }) => {
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
        <div
            style={{
                margin: "2vw 2vw",
                width: "70vw",
                padding: "2vw",
                backgroundColor: "#fef2f2",
                borderRadius: isMobile ? "0px" : "30px",
                border: "1px solid #fecaca",
                boxShadow: "0 2px 8px rgba(206, 0, 54, 0.1)",
            }}
        >
            <h2 style={{ textAlign: "left" }}>{title}</h2>
            <h4 style={{ color: "grey", fontSize: "1.2em", marginBottom: "10px" }}>by {author}</h4>
            <p style={{ color: "grey", fontSize: "1em", marginBottom: "15px" }}>{date}</p>
            
            {/* Tags */}
            {tags && tags.length > 0 && (
                <div style={{ marginBottom: "15px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                style={{
                                    backgroundColor: "#CE0036",
                                    color: "white",
                                    padding: "4px 12px",
                                    borderRadius: "16px",
                                    fontSize: "14px",
                                    fontWeight: "500"
                                }}
                            >
                                {getTagDisplayName(tag)}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            {image !== ""  && (
            <img
                style={{
                    paddingTop: "1vw",
                    paddingBottom: "1vw",
                    width: "40vw",
                }}
                src={image}
            />
            )}
            {content && typeof content === 'string' && (
                <div>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ children }) => <p style={{ marginBottom: "10px" }}>{children}</p>,
                            h1: ({ children }) => <h1 style={{ fontSize: "1.2em", marginBottom: "8px" }}>{children}</h1>,
                            h2: ({ children }) => <h2 style={{ fontSize: "1.1em", marginBottom: "6px" }}>{children}</h2>,
                            h3: ({ children }) => <h3 style={{ fontSize: "1em", marginBottom: "4px" }}>{children}</h3>,
                            ul: ({ children }) => <ul style={{ marginBottom: "8px", paddingLeft: "15px" }}>{children}</ul>,
                            ol: ({ children }) => <ol style={{ marginBottom: "8px", paddingLeft: "15px" }}>{children}</ol>,
                            li: ({ children }) => <li style={{ marginBottom: "2px" }}>{children}</li>,
                            code: ({ children }) => (
                                <code style={{ 
                                    backgroundColor: "#f4f4f4", 
                                    padding: "1px 4px", 
                                    borderRadius: "3px",
                                    fontSize: "12px"
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
            <Link to={link}>
                <button className="coolBeans">Learn more</button>
            </Link>
        </div>
    );
};

export default Preview;
