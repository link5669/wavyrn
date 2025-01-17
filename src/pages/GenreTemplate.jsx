import React from "react";
import SoundEffects from "../components/SoundEffects";
import MusicCarousel from "../components/Carousel/MusicCarousel";
import ScrollingThing from "../components/ScrollingThing/ScrollingThing";
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

  function removeItemPrimary(item) {
    const index = primary.indexOf(item);
    primary.splice(index, 1);
    if (primary.length == 0) {
      primary.push("Film      ", "TV        ", "Video Game", "Animation ");
    }
  }

  function removeItemSecondary(item) {
    const index = secondary.indexOf(item);
    secondary.splice(index, 1);
    if (secondary.length == 0) {
      secondary.push(
        "Interactive    ",
        "Theme Park     ",
        "Multimedia     ",
        "Multi-Genre    ",
        "Library        ",
        "Musical Theater",
        "J-Pop & Anime  ",
      );
    }
  }

  return (
    <div style={containerStyle}>
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
          <div style={headerStyle}>
            <h1 style={titleStyle}>{title}</h1>
          </div>
        </section>

        <div className="description">{/* Add your blurb here */}</div>
        <hr style={dividerStyle} />
        <section style={{ backgroundColor: title === "Arcade" && "#F4A02B" }}>
          <h2 style={subheadStyle}>Sound Design</h2>
          <SoundEffects style={buttonStyle} audioData={audioData} />
        </section>
        <hr style={dividerStyle} />
        <section style={{ backgroundColor: title === "Arcade" && "#3FD49B" }}>
          <h2 style={subheadStyle}>Music</h2>
          <div className="2xl:container 2xl:mx-auto 2xl:px-0 py-3 px-10">
            <MusicCarousel albums={albums} buttonStyle={buttonStyle} />
          </div>
        </section>
        <hr style={dividerStyle} />
        <section style={{ backgroundColor: title === "Arcade" && "#4E78F7" }}>
          <h2 style={subheadStyle}>Voiceover Production</h2>
          <VoiceoverPhotos voiceoverData={voiceoverData} />
        </section>
      </div>
    </div>
  );
}

export default GenreTemplate;
