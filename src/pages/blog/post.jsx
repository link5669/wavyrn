import WavNavbar from "../../components/Navbar/Navbar";

const Post = ({ isMobile, title, byline, image, content }) => {
    return (
        <>
            <WavNavbar showLogo={true} />
            <div
                style={{
                    float: "left",
                    backgroundColor: "RGB(1,1,1)",
                    paddingBottom: "45px",
                }}
            >
                <div
                    style={{
                        margin: !isMobile && "7vh",
                        padding: isMobile ? "3%" : "2vw",
                        backgroundColor: "white",
                        borderRadius: !isMobile && "30px",
                    }}
                >
                    <h2 style={{ textAlign: "left" }}>{title}</h2>
                    <h4 style={{ color: "grey", fontSize: "1.4em" }}>
                        {byline}
                    </h4>
                    <img
                        style={{
                            paddingTop: "1vw",
                            paddingBottom: "1vw",
                            width: "40vw",
                        }}
                        src={image}
                    />
                    <p>{content}</p>
                </div>
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
                    style={{
                        color: "white",
                        textAlign: "center",
                        lineHeight: "50px",
                    }}
                >
                    ©️2025 Wavyrn • All Rights Reserved
                </p>
            </footer>
        </>
    );
};

export default Post;
