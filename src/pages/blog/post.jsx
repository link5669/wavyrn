import WavNavbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import ReactPlayer from "react-player";
import { Player } from "react-simple-player";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "highlight.js/styles/github.css";

const Post = ({ isMobile, e }) => {
    const [tags, setTags] = useState({ TOPIC: [], PROJECT: [], GENRE: [] });
    
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
    const { identifier } = useParams();
    const [post, setPost] = useState(e || null);
    const [loading, setLoading] = useState(!e);
    const [error, setError] = useState(null);

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
        // If we have a static post (e), use it directly
        if (e) {
            setPost(e);
            setLoading(false);
            return;
        }

        // Otherwise, fetch from database
        const fetchPost = async () => {
            try {
                if (!identifier) {
                    setError("No post identifier provided");
                    setLoading(false);
                    return;
                }

                // Determine if identifier is a slug (URL-friendly) or docId (contains special chars)
                const isSlug = /^[a-z0-9-]+$/.test(identifier);
                let url;
                
                if (isSlug) {
                    // Try slug first
                    url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/blog/slug/${identifier}`;
                } else {
                    // Try docId
                    url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/blog/${identifier}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                
                if (response.ok) {
                    setPost(data);
                } else {
                    // If slug failed and identifier looks like a slug, try docId as fallback
                    if (isSlug) {
                        const fallbackResponse = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/blog/${identifier}`);
                        const fallbackData = await fallbackResponse.json();
                        if (fallbackResponse.ok) {
                            setPost(fallbackData);
                        } else {
                            setError(data.error || "Post not found");
                        }
                    } else {
                        setError(data.error || "Post not found");
                    }
                }
            } catch (error) {
                setError("Failed to load post");
            } finally {
                setLoading(false);
            }
        };

        if (identifier) {
            fetchPost();
        }
        fetchTags();
    }, [identifier, e]);

    if (loading) {
        return (
            <>
                <WavNavbar showLogo={true} />
                <div style={{ 
                    textAlign: "center", 
                    padding: "40px", 
                    color: "#666",
                    minHeight: "100vh",
                    backgroundColor: "RGB(1,1,1)"
                }}>
                    <div style={{
                        margin: "7vh",
                        padding: "2vw",
                        backgroundColor: "white",
                        borderRadius: "30px",
                    }}>
                        Loading post...
                    </div>
                </div>
            </>
        );
    }

    if (error || !post) {
        return (
            <>
                <WavNavbar showLogo={true} />
                <div style={{ 
                    textAlign: "center", 
                    padding: "40px", 
                    color: "#666",
                    minHeight: "100vh",
                    backgroundColor: "RGB(1,1,1)"
                }}>
                    <div style={{
                        margin: "7vh",
                        padding: "2vw",
                        backgroundColor: "white",
                        borderRadius: "30px",
                    }}>
                        {error || "Post not found"}
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <WavNavbar showLogo={true} />
            <div
                style={{
                    float: "left",
                    backgroundColor: "RGB(1,1,1)",
                    paddingTop: "55px",
                    width: "100vw",
                    minHeight: "100vh",
                }}
            >
                <div
                    style={{
                        margin: "7vh",
                        padding: "2vw",
                        paddingBottom: "10px",
                        backgroundColor: "white",
                        borderRadius: "30px",
                    }}
                >
                    <h2 style={{ textAlign: "left" }}>{post.title}</h2>
                    <h4 style={{ color: "grey", fontSize: "1.4em" }}>
                        {e ? (
                            // Static post byline (legacy)
                            post.byline
                        ) : (
                            // Dynamic post byline
                            <>
                                by {post.author}
                                <br />
                                {post.date}
                            </>
                        )}
                    </h4>
                    
                    {post.topics && post.topics.length > 0 && (
                        <div style={{ marginBottom: "20px" }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {post.topics.map(topic => (
                                    <span
                                        key={topic}
                                        style={{
                                            backgroundColor: "#CE0036",
                                            color: "white",
                                            padding: "4px 12px",
                                            borderRadius: "16px",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {getTagDisplayName(topic)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {post.image !== "" && post.image !== undefined && (
                        <img
                            style={{
                                paddingTop: "1vw",
                                paddingBottom: "1vw",
                                width: "40vw",
                            }}
                            src={post.image}
                        />
                    )}
                    
                    {e ? (
                        // Static content (legacy posts) - render as JSX
                        <div style={{ minHeight: "100vh" }}>{post.content}</div>
                    ) : (
                        // Dynamic content with markdown rendering
                        <div style={{ minHeight: "100vh" }}>
                            {/* Process content for inline color styling */}
                            {(() => {
                                // Custom function to process inline styling syntax
                                const processInlineStyles = (content) => {
                                    // Replace {color:#FF5733}text{/color} with styled spans
                                    let processed = content.replace(
                                        /\{color:#([A-Fa-f0-9]{6})\}(.*?)\{\/color\}/g,
                                        '<span style="color: #$1;">$2</span>'
                                    );
                                    
                                    // Replace {indent:20}text{/indent} with indented spans
                                    processed = processed.replace(
                                        /\{indent:(\d+)\}(.*?)\{\/indent\}/g,
                                        '<div style="padding-left: $1px; margin: 5px 0;">$2</div>'
                                    );
                                    
                                    // Replace {youtube:VIDEO_ID} with YouTube iframe
                                    processed = processed.replace(
                                        /\{youtube:([a-zA-Z0-9_-]+)\}/g,
                                        '<iframe style="width: 100%; max-width: 560px; height: 315px; margin: 20px 0; border: none;" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                                    );
                                    
                                    // Replace {player:URL} with ReactPlayer component
                                    processed = processed.replace(
                                        /\{player:([^}]+)\}/g,
                                        '<div style="margin: 20px 0; text-align: center;"><div style="display: inline-block; width: 100%; max-width: 560px;">PLAYER_COMPONENT_PLACEHOLDER_$1</div></div>'
                                    );
                                    
                                    // Replace {video:URL} with HTML video element
                                    processed = processed.replace(
                                        /\{video:([^}]+)\}/g,
                                        '<video style="width: 100%; max-width: 560px; height: auto; margin: 20px 0;" controls><source src="$1" type="video/mp4">Your browser does not support the video tag.</video>'
                                    );
                                    
                                    // Replace {image:URL} with HTML img element
                                    processed = processed.replace(
                                        /\{image:([^}]+)\}/g,
                                        '<img style="width: 100%; max-width: 560px; height: auto; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" src="$1" alt="Embedded image" />'
                                    );
                                    
                                    return processed;
                                };
                                
                                const processedContent = processInlineStyles(post.content);
                                
                                return (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeHighlight, rehypeRaw]}
                                        components={{
                                            // Custom components for better styling
                                            h1: ({ children }) => <h1 style={{ color: post.fontColor || "#333", marginTop: "30px", marginBottom: "15px" }}>{children}</h1>,
                                            h2: ({ children }) => <h2 style={{ color: post.fontColor || "#333", marginTop: "25px", marginBottom: "12px" }}>{children}</h2>,
                                            h3: ({ children }) => <h3 style={{ color: post.fontColor || "#333", marginTop: "20px", marginBottom: "10px" }}>{children}</h3>,
                                            p: ({ children }) => <p style={{ marginBottom: "15px", color: post.fontColor || "#444" }}>{children}</p>,
                                            div: ({ children, ...props }) => {
                                                // Handle Player component placeholders
                                                if (typeof children === 'string' && children.includes('PLAYER_COMPONENT_PLACEHOLDER_')) {
                                                    const url = children.replace('PLAYER_COMPONENT_PLACEHOLDER_', '');
                                                    return (
                                                        <div style={{ margin: "20px 0", textAlign: "center" }}>
                                                            <div style={{ display: "inline-block", width: "100%", maxWidth: "560px" }}>
                                                                <ReactPlayer 
                                                                    url={url} 
                                                                    width="100%" 
                                                                    height="315px"
                                                                    controls={true}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return <div {...props}>{children}</div>;
                                            },
                                    a: ({ href, children }) => (
                                        <a 
                                            href={href} 
                                            style={{ color: "#007bff", textDecoration: "underline" }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {children}
                                        </a>
                                    ),
                                    img: ({ src, alt }) => (
                                        <img 
                                            src={src} 
                                            alt={alt}
                                            style={{ 
                                                maxWidth: "100%", 
                                                height: "auto", 
                                                margin: "15px 0",
                                                borderRadius: "8px",
                                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                            }}
                                        />
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote style={{ 
                                            borderLeft: "4px solid #007bff", 
                                            paddingLeft: "20px", 
                                            margin: "20px 0",
                                            fontStyle: "italic",
                                            color: post.fontColor || "#666"
                                        }}>
                                            {children}
                                        </blockquote>
                                    ),
                                    code: ({ children }) => (
                                        <code style={{ 
                                            backgroundColor: "#f4f4f4", 
                                            padding: "2px 6px", 
                                            borderRadius: "4px",
                                            fontFamily: "monospace",
                                            fontSize: "14px"
                                        }}>
                                            {children}
                                        </code>
                                    ),
                                    pre: ({ children }) => (
                                        <pre style={{ 
                                            backgroundColor: "#f8f8f8", 
                                            padding: "15px", 
                                            borderRadius: "8px",
                                            overflow: "auto",
                                            margin: "15px 0"
                                        }}>
                                            {children}
                                        </pre>
                                    ),
                                    ul: ({ children }) => <ul style={{ marginBottom: "15px", paddingLeft: "20px" }}>{children}</ul>,
                                    ol: ({ children }) => <ol style={{ marginBottom: "15px", paddingLeft: "20px" }}>{children}</ol>,
                                    li: ({ children }) => <li style={{ marginBottom: "5px" }}>{children}</li>,
                                        }}
                                    >
                                        {processedContent}
                                    </ReactMarkdown>
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div>
            {post && post.content && !loading && (
            <Footer />)}
        </>
    );
};

export default Post;
