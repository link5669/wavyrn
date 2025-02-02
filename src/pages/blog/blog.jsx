import { useEffect } from "react";
import BLOG_PAGES from "./pages";
import Preview from "./preview";
import React, { useState } from "react";
import WavNavbar from "../../components/Navbar";

const Blog = ({ isMobile }) => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [tags, setTags] = useState([]);
  useEffect(() => {
    let tagCollector = [];
    for (let i = 0; i < BLOG_PAGES.length; i++) {
      for (let j = 0; j < BLOG_PAGES[i].tags.length; j++) {
        if (
          tagCollector.filter((e) => e.tag == BLOG_PAGES[i].tags[j]).length > 0
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
      <WavNavbar />
      <div
        style={{
          backgroundColor: "RGB(1,1,1)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundImage: "url('/images/dnd.jpg?url')",
            backgroundRepeat: "no-repeat",
            backgroundSize: isMobile ? "150%" : "100%",
            height: "20vh",
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: isMobile ? ".5em" : "1em",
          }}
        >
          {isMobile ? (
            <p
              style={{
                paddingTop: "3vh",
                marginBottom: !isMobile && "2em",
                marginTop: "0em",
                color: "white",
                fontSize: "5em",
                textAlign: "center",
              }}
            >
              <b>Blog</b>
            </p>
          ) : (
            <h1
              style={{
                paddingTop: "0%",
                marginBottom: ".5em",
                marginTop: "1em",
                color: "white",
                fontSize: "4em",
                fontWeight: "bold",
              }}
            >
              Blog
            </h1>
          )}
        </div>
        <div style={{ display: "flex", flex: 1 }}>
          <div
            style={{ flex: isMobile ? 1 : 0.8, backgroundColor: "RGB(1,1,1)" }}
          >
            {BLOG_PAGES.filter(
              (e) =>
                selectedTag === "all" || (e.tags.includes(selectedTag) && e),
            ).map((e) => (
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
            <div
              style={{
                flex: 0.2,
                color: "white",
                padding: "7vh 2vw 0",
                backgroundColor: "RGB(160,60,60)",
              }}
            >
              <h2>Filter by Tags</h2>

              <ul>
                <li onClick={() => setSelectedTag("all")}>
                  All ({BLOG_PAGES.length})
                </li>
                {tags.map((e) => (
                  <li onClick={() => setSelectedTag(e.tag)}>
                    {e.tag} ({e.count})
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
            style={{ color: "white", textAlign: "center", lineHeight: "50px" }}
          >
            ©️2024 Wavyrn • All Rights Reserved
          </p>
        </footer>
      </div>
    </>
  );
};

export default Blog;
