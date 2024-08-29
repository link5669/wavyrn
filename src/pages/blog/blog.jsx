import Preview from "./preview"
import React from 'react';

const Blog = ({ isMobile }) => {
    console.log(isMobile)
    return (
        <div style={{ backgroundColor: "RGB(1,1,1)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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
                            fontSize: '4em',
                            fontWeight: "bold"
                        }}
                    >
                        Blog
                    </h1>
                )}
            </div>
            <div style={{ display: "flex", flex: 1 }}>
                <div style={{ flex: isMobile ? 1 : 0.8, backgroundColor: "RGB(1,1,1)" }}>
                    <Preview isMobile={isMobile}/>
                </div>
                {!isMobile && (
                    <div style={{ flex: 0.2, color: "white", padding: "7vh 2vw 0", backgroundColor: "RGB(160,60,60)" }}>
                        <h2>Tags</h2>
                        <ul>
                            <li>Video Game (1)</li>
                            <li>MOBA (1)</li>
                            <li>Sound Design (1)</li>
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
                <p style={{ color: "white", textAlign: "center", lineHeight: "50px" }}>
                    ©️2024 Wavyrn • All Rights Reserved
                </p>
            </footer>
        </div>
    )
}

export default Blog