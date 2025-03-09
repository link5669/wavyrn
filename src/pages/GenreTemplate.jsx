import React from "react";
import SoundEffects from "../components/SoundEffects";
import MusicCarousel from "../components/Carousel/MusicCarousel";
import "./App.css";
import VoiceoverPhotos from "../components/VoiceoverPhotos";

function GenreTemplate({
    title,
    containerStyle,
    headerStyle,
    buttonStyle,
    titleStyle,
    subheadStyle,
    audioData,
    contentWrapperStyle,
    dividerStyle,
    albums,
    voiceoverData,
}) {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 0.5);
    let primary = ["Film", "TV", "Video Game", "Animation"];
    let secondary = [
        "Interactive",
        "Theme Park",
        "Multimedia",
        "Multi-Genre",
        "Library",
        "Musical Theater",
        "J-Pop & Anime",
    ];

    return (
        <div style={{ ...containerStyle }}>
            <div
                style={{
                    width: "100vw",
                    height: "15vh",
                    backgroundColor: "#CE1E36",
                    display: "flex",
                    alignItems: "center",
                    position: "relative", // Added this
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        textAlign: "center",
                    }}
                >
                    <h1 style={titleStyle}>{title}</h1>
                </div>
                <img
                    src="/public/images/Home.png"
                    alt="description"
                    style={{
                        height: "100%",
                        objectFit: "contain",
                        marginLeft: "auto", // This pushes the image to the right
                    }}
                />
            </div>
            <div style={contentWrapperStyle}>
                <br />
                {/* <div className="heading-container">
          <h1>{title}</h1>
          <h2
            style={{
              display: "flex",
              width: "100%",
              margin: 0,
              padding: 0,
            }}
          >
            <span
              style={{
                flex: "0 0 50%",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              Audio made
            </span>
            <ScrollingThing
              style={{
                flex: "0 0 50%",
                textAlign: "left",
              }}
              removeItemPrimary={removeItemPrimary}
              removeItemSecondary={removeItemSecondary}
              primary={primary}
              secondary={secondary}
              time={new Date()}
            />
          </h2>
        </div> */}
                <br />

                <section
                    style={{
                        backgroundColor: title === "Arcade" && "#E72626",
                        height: title === "Arcade" && "20vh",
                        alignContent: "center",
                    }}
                >
                    <div
                        style={{
                            ...headerStyle,
                            marginBottom: "2vh",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/ScMzIvxBSi4?si=G86GQMe5uwhv60k5"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                            style={{ padding: "2vh" }}
                        ></iframe>
                    </div>
                    <p style={{ textAlign: "center" }}>
                        A blurb of words that describe what we do, stylized in
                        the genre
                    </p>
                </section>

                <div className="description">{/* Add your blurb here */}</div>
                <hr style={dividerStyle} />
                <section
                    style={{ backgroundColor: title === "Arcade" && "#F4A02B" }}
                >
                    <h2 style={subheadStyle}>Sound Design</h2>
                    <SoundEffects style={buttonStyle} audioData={audioData} />
                </section>
                <hr style={dividerStyle} />
                <section
                    style={{ backgroundColor: title === "Arcade" && "#3FD49B" }}
                >
                    <h2 style={subheadStyle}>Music</h2>
                    <div className="2xl:container 2xl:mx-auto 2xl:px-0 py-3 px-10">
                        <MusicCarousel
                            albums={albums}
                            buttonStyle={buttonStyle}
                        />
                    </div>
                </section>
                <hr style={dividerStyle} />
                <section
                    style={{ backgroundColor: title === "Arcade" && "#4E78F7" }}
                >
                    <h2 style={subheadStyle}>Voiceover Production</h2>
                    <VoiceoverPhotos voiceoverData={voiceoverData} />
                </section>
            </div>
        </div>
    );
}

export default GenreTemplate;
