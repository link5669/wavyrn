import Preview from "./preview";
import React from "react";

const Blog = ({ isMobile }) => {
  console.log(isMobile);
  return (
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
          <Preview
            title={
              <>
                The Sound Design of Delta Emblock, An Original Character from
                Resurgence of the Storm
              </>
            }
            subtitle={
              <>
                by Caleb Skelly <br /> August 11th, 2024
              </>
            }
            image={
              "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Blog%20Posts/20240810%20ROTS-DELTA%20SFX%20BTS/Logo%20New%20Fix%203840x2160.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0"
            }
            content={
              <>
                I'm Caleb Skelly, and I'm the Lead Sound Designer for Delta
                Emblock in Resurgence of the Storm.
                <br />
                <br />
                This is a behind-the-scenes look at how I created her identity
                as a brand new character in the Resurgence environment. While
                I’m familiar with Heroes of the Storm, I didn't really get to
                play a whole lot of it, but I really love how there are a lot of
                different characters from a lot of different properties coming
                together. Delta specifically is from StarCraft and I’ve played a
                little bit of StarCraft. I think Delta is a bit of a deep-cut
                character, so we had a lot of freedom when it came to designing
                her both gameplay-wise and sound-wise.
                <br />
                <br />
                StarCraft has a really strong set of sounds they use to identify
                specific groups or factions. The Protoss have a shimmery, glassy
                sort of feel, and the Zerg are more organic and squishy. Humans,
                like Delta, have a neutral presence in that their equipment is
                technologically advanced, but they're not really harnessing raw
                psychic power or biological power like the other two groups are.
                But Delta's main characteristic is that she's psionic and that
                makes her different from a lot of other characters. It sets her
                apart in both StarCraft and Resurgence, so while her core sounds
                are based on military audio—like rifle shots and reloads and
                handling magazines and bullets and stuff you would see in war
                and battle—they're augmented by her own psychic ability and they
                take on a more unique and otherworldly quality, especially when
                sound gets involved...
              </>
            }
            link={"/blog/240811-the-sound-design-of-delta-emblock"}
            isMobile={isMobile}
          />
          <hr />
          <Preview
            title={
              <>
                Behind the Dialogue: Writing Delta Emblock’s Voice Lines for
                Resurgence of the Storm
              </>
            }
            subtitle={
              <>
                By Subsourian
                <br />
                January 3rd, 2025
              </>
            }
            image={""}
            content={
              <>
                I’m Subsourian, admin of the Starcraft Wiki, and I wrote and
                helped direct Delta’s lines for Resurgence of the Storm. <br />
                <br />
                Delta Emblock is a more obscure character, hailing from the
                Ghost Academy manga as one of the psionic trainees that trained
                alongside Nova. Her thing is a strong power of precognition, and
                she would team up with Nova during the events of Nova Covert
                Ops, which is where I expect most people know her from. And at
                the end of that campaign, she goes AWOL from the Dominion.{" "}
                <br />
                <br />
                Delta is supposed to represent the professional side of the
                Ghost, mixed with the tech advantage you get from Nova’s forces
                in Nova Covert Ops and co-op missions. She’s focused on the high
                tech Covert Ops crew <br />
                <br />
                We really pulled more from the traditional Ghost unit,
                especially the female skin that’s based off Delta. And when it
                came to the lines, we wanted to focus more on the idea of a
                professional killer, like an elite agent. The vibe we were going
                for is someone who’d be bubbly and personable off-duty but when
                she’s on the clock, she’d slit your neck without a second
                thought if she was ordered to... <br />
              </>
            }
            link={"/blog/250104-bts-vo-delta-emblock"}
            isMobile={isMobile}
          />
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
            <h2>Tags</h2>
            <ul>
              <li>Video Game (2)</li>
              <li>MOBA (2)</li>
              <li>Sound Design (1)</li>
              <li>Voice Over (1)</li>
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
  );
};

export default Blog;
