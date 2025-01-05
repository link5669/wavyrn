import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import { useState, useEffect } from "react";
import Services from "./Services";
import Portfolio from "./Portfolio";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import WavNavbar from "../components/Navbar";
import ZoomRedirect from "./ZoomRedirect";
import DiscordRedirect from "./Discord";
import Blog from "./blog/blog";
import Post from "./blog/post";
import ScrollToTop from "../components/ScrollToTop";
import GeneralUseRedirect from "./GeneralUseRedirect";
import PatreonRedirect from "./PatreonCatalogRedirect";
import { Player } from "react-simple-player";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          <WavNavbar isMobile={isMobile} />
          <Routes>
            <Route path="/" element={<Home isMobile={isMobile} />} />

            {/* subpages */}
            <Route
              path="/services"
              element={<Services isMobile={isMobile} />}
            />
            <Route
              path="/portfolio"
              element={<Portfolio isMobile={isMobile} />}
            />
            <Route
              path="/about-us"
              element={<AboutUs animate={false} isMobile={isMobile} />}
            />
            <Route path="/contact" element={<Contact isMobile={isMobile} />} />
            <Route path="/blog" element={<Blog isMobile={isMobile} />} />

            {/* blog pages */}
            <Route
              path="/blog/240811-the-sound-design-of-delta-emblock"
              element={
                <Post
                  title={
                    "The Sound Design of Delta Emblock, An Original Character from Resurgence of the Storm"
                  }
                  byline={
                    <>
                      by Caleb Skelly
                      <br />
                      August 11th, 2024
                    </>
                  }
                  image={
                    "https://www.dl.dropboxusercontent.com/scl/fi/ax771z19zz57mkuoornrq/ROTS-_FullBanner.png?rlkey=57o4zwids4p6ha96uvwxzb5qx&e=1&dl=0"
                  }
                  content={
                    <>
                      I'm Caleb Skelly, and I'm the Lead Sound Designer for
                      Delta Emblock in Resurgence of the Storm.
                      <br />
                      <br />
                      This is a behind-the-scenes look at how I created her
                      identity as a brand new character in the Resurgence
                      environment. While I’m familiar with Heroes of the Storm,
                      I didn't really get to play a whole lot of it, but I
                      really love how there are a lot of different characters
                      from a lot of different properties coming together. Delta
                      specifically is from StarCraft and I’ve played a little
                      bit of StarCraft. I think Delta is a bit of a deep-cut
                      character, so we had a lot of freedom when it came to
                      designing her both gameplay-wise and sound-wise.
                      <br />
                      <br />
                      StarCraft has a really strong set of sounds they use to
                      identify specific groups or factions. The Protoss have a
                      shimmery, glassy sort of feel, and the Zerg are more
                      organic and squishy. Humans, like Delta, have a neutral
                      presence in that their equipment is technologically
                      advanced, but they're not really harnessing raw psychic
                      power or biological power like the other two groups are.
                      But Delta's main characteristic is that she's psionic and
                      that makes her different from a lot of other characters.
                      It sets her apart in both StarCraft and Resurgence, so
                      while her core sounds are based on military audio—like
                      rifle shots and reloads and handling magazines and bullets
                      and stuff you would see in war and battle—they're
                      augmented by her own psychic ability and they take on a
                      more unique and otherworldly quality, especially when
                      sound gets involved.
                      <br />
                      <br />
                      She also has a weapon-swapping mechanic built into her
                      kit, which is kind of what she's based around as a
                      character in-game. This made her palette a lot more
                      interesting and honestly a pretty fun challenge.
                      <br />
                      <br />
                      <video controls width="400vw">
                        <source
                          src="https://www.dl.dropboxusercontent.com/scl/fi/yuvidf97uuilabd7l6gbw/CLIP-1.mp4?rlkey=83yo6wwywwjhcdcgvolfdrusb&dl=0"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                      <br />
                      <br />
                      Her weapons each have a distinct core sound that is used
                      in their shot, impact, and swap sounds, so her rifle is
                      booming and resonant like a sniper usually is…
                      <br />
                      <br />
                      <video
                        controls
                        width="400vw"
                        preload="metadata"
                        crossOrigin="anonymous"
                      >
                        <source
                          src="https://www.dl.dropboxusercontent.com/scl/fi/93jmerneqtx53xfuvpcm5/CLIP-2.mp4?rlkey=ppe0lmz78jc3v90dvcb83m52b&dl=0"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                      <br />
                      <br />
                      And her railgun uses electrical crackling and sparking…
                      <br />
                      <br />
                      <video
                        type="video/mp4"
                        src="https://www.dl.dropboxusercontent.com/scl/fi/nr6ldpmh4jros3vyh19fl/CLIP-3.mp4?rlkey=kaon7gvpncnit6f13vnhtw237&dl=1"
                        controls
                        width="400vw"
                      />
                      <br />
                      <br />
                      But her rocket launcher is more of a liquid plasma,
                      pneumatic hissing kind of weapon. It's not all junky, but
                      it makes a lot of noise. It's not exactly quiet equipment.
                      Her Q ability, which is her long shot for lack of a better
                      phrase, changes. The sound changes depending on which
                      weapon she currently has in play, so taking into account
                      those core characteristics of each of the three weapons
                      above, her Q ability will change depending on what weapon
                      she has in hand.
                      <br />
                      <br />
                      <video
                        type="video/mp4"
                        src="https://www.dl.dropboxusercontent.com/scl/fi/ccn6pjaehloumbb76q8uo/CLIP-4.mp4?rlkey=e1j881ptu6sz7dplaru329r82&dl=1"
                        controls
                        width="400vw"
                      />
                      <br />
                      <br />
                      Her E ability is her primary escape and stealth option,
                      and that was made by swinging a plastic PVC pipe and
                      adding a lot of heavy flanging effects and ring modulation
                      to create a fast fading shimmering effect, almost like a
                      ghost. Her first ultimate was made using various clinking
                      and clanging sounds. I was inspired by the LEGO building
                      sound from the LEGO games. Some were foley, some were
                      sourced, some were synthesized, to create that rapid
                      building up and then breaking down effect of her pylons as
                      they come in and out.
                      <br />
                      <br />
                      <Player
                        grey={[206, 0, 54]}
                        accent={[255, 0, 0]}
                        src={
                          "https://www.dl.dropboxusercontent.com/scl/fi/qcoehhyzfpr209itpet1s/CLIP-5.wav?rlkey=jc6zxrrdmywaxwm9ldl2rhetx&dl=1"
                        }
                        height={30}
                        style={{ width: "30vw" }}
                      />
                      <br />
                      <br />
                      Delta in all is supposed to sort of represent humanity on
                      another level, and I was given a lot of parameters to work
                      in, specifically references to previous StarCraft
                      properties and other kinds of references to keep her
                      unique and distinct, but also in line with what they
                      imagined her to be.
                      <br />
                      <br />
                      So making her was a fun and interesting challenge, and I
                      love that I got the opportunity to do it.
                    </>
                  }
                  isMobile={isMobile}
                />
              }
            />
            <Route
              path="/blog/250104-bts-vo-delta-emblock"
              element={
                <Post
                  title={
                    "Behind the Dialogue: Writing Delta Emblock’s Voice Lines for Resurgence of the Storm"
                  }
                  byline={
                    <>
                      By Subsourian
                      <br />
                      January 3rd, 2025
                    </>
                  }
                  content={
                    <>
                      I’m Subsourian, admin of the Starcraft Wiki, and I wrote
                      and helped direct Delta’s lines for Resurgence of the
                      Storm.
                      <br />
                      <br />
                      Delta Emblock is a more obscure character, hailing from
                      the Ghost Academy manga as one of the psionic trainees
                      that trained alongside Nova. Her thing is a strong power
                      of precognition, and she would team up with Nova during
                      the events of Nova Covert Ops, which is where I expect
                      most people know her from. And at the end of that
                      campaign, she goes AWOL from the Dominion.
                      <br />
                      <br />
                      Delta is supposed to represent the professional side of
                      the Ghost, mixed with the tech advantage you get from
                      Nova’s forces in Nova Covert Ops and co-op missions. She’s
                      focused on the high tech Covert Ops crew.
                      <br />
                      <br />
                      We really pulled more from the traditional Ghost unit,
                      especially the female skin that’s based off Delta. And
                      when it came to the lines, we wanted to focus more on the
                      idea of a professional killer, like an elite agent. The
                      vibe we were going for is someone who’d be bubbly and
                      personable off-duty but when she’s on the clock, she’d
                      slit your neck without a second thought if she was ordered
                      to.
                      <br />
                      <br />
                      And I know some people were asking, “Why do a Ghost and
                      not Tosh?,” but this is a case where a kit would not have
                      matched Tosh’s character. He’s more of a psionic
                      powerhouse, using terrazine to augment his powers. Whereas
                      with Delta, we really wanted to dive into the Dominion
                      Special Forces fantasy where you have the best of the
                      best—Dominion’s tech being brought against your enemies.
                      <br />
                      <br />
                      Delta’s a friendly and personable gal if she’s on your
                      team, but heaven help you if you’re her mission objective
                      <br />
                      <br />
                      <video controls width="400vw">
                        <source
                          src="https://www.dl.dropboxusercontent.com/scl/fi/z383xcakbz68p2cpatbp5/20250103-ROTS-DELTA-VO-BTS.mp4?rlkey=yvybmur15j8slvzp7r2nrv587&e=3&st=milmvzi7&dl=0"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </>
                  }
                  isMobile={isMobile}
                />
              }
            />
            {/* redirects */}
            <Route path="/zoom" element={<ZoomRedirect />} />
            <Route path="/discord" element={<DiscordRedirect />} />
            <Route path="/GeneralUse" element={<GeneralUseRedirect />} />
            <Route path="/PatreonCatalogue" element={<PatreonRedirect />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
