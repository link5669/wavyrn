import ReactPlayer from "react-player";
import { Player } from "react-simple-player";
import WavNavbar from "../../../components/Navbar/MobileNavbar/MobileNavbar";
import BottomSection from "../../../components/BottomSection/BottomSection";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github.css";

const Post = ({ isMobile, e }) => {
    const { docId } = useParams();
    const [post, setPost] = useState(e || null);
    const [loading, setLoading] = useState(!e);
    const [error, setError] = useState(null);

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
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/blog/${docId}`);
                const data = await response.json();
                if (response.ok) {
                    setPost(data);
                } else {
                    setError(data.error || "Post not found");
                }
            } catch (error) {
                setError("Failed to load post");
            } finally {
                setLoading(false);
            }
        };

        if (docId) {
            fetchPost();
        }
    }, [docId, e]);

    if (loading) {
        return (
            <>
                <WavNavbar showLogo={true} />
                <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                    Loading post...
                </div>
                <BottomSection />
            </>
        );
    }

    if (error || !post) {
        return (
            <>
                <WavNavbar showLogo={true} />
                <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                    {error || "Post not found"}
                </div>
                <BottomSection />
            </>
        );
    }
  return (
    <>
      <WavNavbar showLogo={true} />
      <div
        style={{
          backgroundColor: "#CE0036",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* Top navigation section - keeps red background */}
        <div
          style={{
            backgroundColor: "#CE0036",
            width: "100%",
            textAlign: "center",
            color: "white",
            padding: "20px 0",
          }}
        >
          <Link to="/blog" style={{ color: "white", textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: "transparent",
                border: "2px solid white",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ← Return to Blogs
            </button>
          </Link>
        </div>

        {/* Main content section - white background */}
        <div
          className="mobile-page-container"
          style={{
            backgroundColor: "white",
            minHeight: "calc(100vh - 140px)", // Adjust for navbar and button area
            width: "100%",
            paddingBottom: "50px",
          }}
        >
          <Container
            style={{
              maxWidth: isMobile ? "95%" : "800px",
              margin: "0 auto",
              padding: isMobile ? "20px" : "40px",
            }}
          >
            <h2
              style={{
                textAlign: "left",
                color: "black",
                marginBottom: "20px",
                fontSize: isMobile ? "1.5em" : "2em",
              }}
            >
              {post.title}
            </h2>

            <Row
              style={{
                justifyContent: "space-between",
                fontSize: "1em",
                marginBottom: "2rem",
                color: "black",
              }}
            >
              <Col style={{ textAlign: "left" }}>by {post.author}</Col>
              <Col style={{ textAlign: "right" }}>{post.date}</Col>
            </Row>

            {post.topics && post.topics.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {post.topics.map(topic => (
                    <span
                      key={topic}
                      style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "4px 12px",
                        borderRadius: "16px",
                        fontSize: "14px",
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {post.image && post.image !== "" && (
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <img
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                  src={post.image}
                  alt={post.title}
                />
              </div>
            )}

            <div
              style={{
                color: "black",
                lineHeight: "1.6",
                fontSize: "1.1em",
                textAlign: "left",
              }}
            >
              {e ? (
                // Static content (legacy posts)
                post.content
              ) : (
                // Dynamic content with markdown rendering
                (() => {
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
                      '<iframe style="width: 100%; max-width: 100%; height: 200px; margin: 15px 0; border: none;" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                    );
                    
                    // Replace {player:URL} with ReactPlayer component
                    processed = processed.replace(
                      /\{player:([^}]+)\}/g,
                      '<div style="margin: 15px 0; text-align: center;"><div style="display: inline-block; width: 100%;">PLAYER_COMPONENT_PLACEHOLDER_$1</div></div>'
                    );
                    
                    // Replace {video:URL} with HTML video element
                    processed = processed.replace(
                      /\{video:([^}]+)\}/g,
                      '<video style="width: 100%; height: auto; margin: 15px 0;" controls><source src="$1" type="video/mp4">Your browser does not support the video tag.</video>'
                    );
                    
                    // Replace {image:URL} with HTML img element
                    processed = processed.replace(
                      /\{image:([^}]+)\}/g,
                      '<img style="width: 100%; height: auto; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" src="$1" alt="Embedded image" />'
                    );
                    
                    return processed;
                  };
                  
                  const processedContent = processInlineStyles(post.content);
                  
                  return (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight, rehypeRaw]}
                      components={{
                        h1: ({ children }) => <h1 style={{ color: post.fontColor || "#333", marginTop: "20px", marginBottom: "10px" }}>{children}</h1>,
                        h2: ({ children }) => <h2 style={{ color: post.fontColor || "#333", marginTop: "18px", marginBottom: "8px" }}>{children}</h2>,
                        h3: ({ children }) => <h3 style={{ color: post.fontColor || "#333", marginTop: "15px", marginBottom: "6px" }}>{children}</h3>,
                        p: ({ children }) => <p style={{ marginBottom: "12px", color: post.fontColor || "#444" }}>{children}</p>,
                        div: ({ children, ...props }) => {
                          // Handle Player component placeholders
                          if (typeof children === 'string' && children.includes('PLAYER_COMPONENT_PLACEHOLDER_')) {
                            const url = children.replace('PLAYER_COMPONENT_PLACEHOLDER_', '');
                            return (
                              <div style={{ margin: "15px 0", textAlign: "center" }}>
                                <div style={{ display: "inline-block", width: "100%" }}>
                                  <ReactPlayer 
                                    url={url} 
                                    width="100%" 
                                    height="200px"
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
                          margin: "12px 0",
                          borderRadius: "6px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                        }}
                      />
                    ),
                    blockquote: ({ children }) => (
                      <blockquote style={{ 
                        borderLeft: "3px solid #007bff", 
                        paddingLeft: "15px", 
                        margin: "15px 0",
                        fontStyle: "italic",
                        color: post.fontColor || "#666"
                      }}>
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code style={{ 
                        backgroundColor: "#f4f4f4", 
                        padding: "2px 4px", 
                        borderRadius: "3px",
                        fontFamily: "monospace",
                        fontSize: "13px"
                      }}>
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre style={{ 
                        backgroundColor: "#f8f8f8", 
                        padding: "12px", 
                        borderRadius: "6px",
                        overflow: "auto",
                        margin: "12px 0"
                      }}>
                        {children}
                      </pre>
                    ),
                    ul: ({ children }) => <ul style={{ marginBottom: "12px", paddingLeft: "18px" }}>{children}</ul>,
                    ol: ({ children }) => <ol style={{ marginBottom: "12px", paddingLeft: "18px" }}>{children}</ol>,
                    li: ({ children }) => <li style={{ marginBottom: "4px" }}>{children}</li>,
                      }}
                    >
                      {processedContent}
                    </ReactMarkdown>
                  );
                })()
              )}
            </div>
            {/* Wavyrn Logo and Trademark */}
          </Container>
        </div>
      </div>
      <BottomSection />
    </>
  );
};

export default Post;
