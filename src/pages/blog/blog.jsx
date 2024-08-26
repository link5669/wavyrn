import Post from "./post"
import Preview from "./preview"

const Blog = () => {
    var isMobile = false
    return (
        <>
            <div
                style={{
                    backgroundImage: "url('/images/dnd.jpg?url')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: isMobile ? "150%" : "100%",
                    height: "11em",
                    width: "100vw",
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
                            paddingTop: isMobile && "3%",
                            marginBottom: ".5em",
                            marginTop: isMobile ? "0em" : "1em",
                            color: "white",
                            fontSize: "2.5em",
                            textAlign: "center",
                        }}
                    >
                        <b>
                            Blog
                        </b>
                    </p>
                ) : (
                    <>
                        <h1
                            style={{
                                paddingTop: isMobile ? "5%" : "0%",
                                marginBottom: ".5em",
                                marginTop: isMobile ? "0em" : "1em",
                                color: "white",
                                fontSize: '5em',
                                fontWeight: "bold"
                            }}
                        >
                            Blog
                        </h1>
                    </>
                )}
            </div>
            {/* width: "80vw", */}
            <div style={{ float: "left", backgroundColor: "RGB(1,1,1)" }}>
                <Preview />
            </div>
            {/* <div style={{ width: "20vw", height: "100%", float: "right", color: "white", padding: "7vh", backgroundColor: "RGB(160,60,60)" }}>
                <h2>Tags</h2>
                <ul>
                    <li>
                        fantasy (6)
                    </li>
                    <li>sci-fi (5)</li>
                    <li>western (12)</li>
                    <li>
                        podcast (24)
                    </li>
                    <li>mystery (3)</li>
                    <li>drama (43)</li>
                    <li>television (11)</li>
                    <li>drama (23)</li>
                    <li>fiction (17)</li>
                    <li>music (31)</li>
                </ul>
            </div> */}
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
        </>
    )
}

export default Blog