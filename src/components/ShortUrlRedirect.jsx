import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShortUrlRedirect = () => {
  const { slug } = useParams();

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        // Instead of calling the redirect endpoint, we need a new endpoint that returns the URL data
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/urls/redirect/${slug}`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.originalUrl) {
            // Redirect to the original URL
            window.location.href = data.originalUrl;
          } else {
            window.location.href = "/";
          }
        } else if (response.status === 404) {
          // URL not found
          window.location.href = "/";
        } else {
          // Other error
          console.error("Error fetching redirect URL:", response.status);
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error fetching redirect URL:", error);
        window.location.href = "/";
      }
    };

    if (slug) {
      redirectToOriginalUrl();
    }
  }, [slug]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#ce0036",
      color: "white",
      fontSize: "1.2em"
    }}>
      <div style={{ textAlign: "center" }}>
        <div>Redirecting...</div>
        <div style={{ fontSize: "0.8em", marginTop: "10px", opacity: 0.8 }}>
          If you are not redirected automatically, <a href="/" style={{ color: "white" }}>click here</a>
        </div>
      </div>
    </div>
  );
};

export default ShortUrlRedirect;
