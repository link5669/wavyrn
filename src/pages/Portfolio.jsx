import React from "react";
import SoundEffects from "../components/SoundEffects";
import MusicCarousel from "../components/Carousel/MusicCarousel";
import ScrollingThing from "../components/ScrollingThing/ScrollingThing";
import "./App.css";
import VoiceoverPhotos from "../components/VoiceoverPhotos";
import WavNavbar from "../components/Navbar";

function Portfolio({ title, audioData, dividerStyle, albums, voiceoverData }) {
  return (
    <div
      style={{
        backgroundSize: "cover",
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        backgroundAttachment: "fixed",
        backgroundColor: "black",
      }}
    >
      <WavNavbar />
      <div
        style={{
          position: "relative",
          width: "70%",
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // translucent white
          paddingLeft: "20px",
          paddingRight: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          minHeight: "100vh",
        }}
      >
        <br />
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
            A blurb of words that describe what we do, stylized in the genre
          </p>
        </section>

        <div className="description">{/* Add your blurb here */}</div>
        <hr style={dividerStyle} />
        <section style={{ backgroundColor: title === "Arcade" && "#F4A02B" }}>
          <h2 style={{ fontFamily: "Montserrat" }}>Sound Design</h2>
          <SoundEffects
            style={{
              backgroundColor: "#98EE9B",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "15px",
              cursor: "pointer",
            }}
            audioData={audioData}
          />
        </section>
        <hr style={dividerStyle} />
        <section style={{ backgroundColor: title === "Arcade" && "#3FD49B" }}>
          <h2 style={{ fontFamily: "Montserrat" }}>Music</h2>
          <div className="2xl:container 2xl:mx-auto 2xl:px-0 py-3 px-10">
            <MusicCarousel
              albums={albums}
              buttonStyle={{
                backgroundColor: "#98EE9B",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "15px",
                cursor: "pointer",
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Portfolio;
