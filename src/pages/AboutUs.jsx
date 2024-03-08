import WavNavbar from "../components/Navbar";
import ProfilePic from "../components/ProfilePic";
import { Container, Col } from "react-bootstrap";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { allUsers, categories } from "../utilities/users";
import UserCategory from "../components/UserCategory";
import { X_svg } from "../utilities/svgs";
import HRDiv from "../components/HRDiv";
import "./AboutUs.css";
import NewAudioPlayer from "../components/NewAudioPlayer";

const AboutUs = ({ isMobile }) => {
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 400,
    easing: "ease-in-out",
    disrespectUserMotionPreference: false,
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCat, setSelectedCat] = useState("All");
  const [visibleUsers, setVisibleUsers] = useState(allUsers);

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <div
          style={{
            backgroundImage:
              "url('../../assets/images/About Us - Banner.JPG?url')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            height: "15em",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{ marginBottom: ".5em", marginTop: "1em", color: "white" }}
          >
            WE MAKE AUDIO
          </h2>
          <p
            style={{
              paddingLeft: "12em",
              paddingRight: "12em",
              paddingBottom: "3em",
              color: "white",
            }}
          >
            <b>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              malesuada facilisis tellus, aliquam molestie purus consequat nec.
              Fusce arcu sapien, fringilla eu arcu volutpat, consequat dignissim
              est.
            </b>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "1.2%",
            paddingRight: "3.5%",
          }}
        >
          {categories.map((category) => {
            return (
              <UserCategory
                key={category.category}
                setVisibleUsers={setVisibleUsers}
                setSelectedCat={setSelectedCat}
                categoryList={category.categoryList}
                category={category.category}
                selectedCat={selectedCat}
              />
            );
          })}
        </div>
        <HRDiv />
        {selectedUser == null ? (
          <div
            ref={parent}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              paddingLeft: "15%",
              paddingRight: "15%",
            }}
          >
            {visibleUsers.map((user, index) => (
              <div
                key={user.name}
                style={{
                  flexShrink: "1" /* Allow items to shrink */,
                }}
                className="users"
              >
                <ProfilePic
                  name={user.name}
                  title={user.title}
                  setSelectedUser={setSelectedUser}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={parent}
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "flex-start",
              paddingLeft: "15%",
              paddingRight: "15%",
            }}
          >
            <Container
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Col xs={2}></Col>
              <Col xs={3}>
                <ProfilePic
                  key={selectedUser.name}
                  name={selectedUser.name}
                  title={selectedUser.title}
                />
              </Col>
              <Col xs={2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                  onClick={() => setSelectedUser(null)}
                  style={{ borderStyle: "solid", borderWidth: "thin" }}
                >
                  <X_svg />
                </svg>
              </Col>
            </Container>
            {selectedUser.name == "Sam Leigh" ? (
              <div style={{ display: "block" }}>
                <p>
                  Sam Rindfuss (aka Sam Leigh) is an actor, vocalist,
                  percussionist, and pianist working out of the Boston area.
                  They are passionate about helping to bring the creative
                  visions of others to life.
                </p>
                <div>
                  <a href="https://www.samleighstudio.com/">Website</a>
                </div>
                <div>
                  <a href="https://tiktok.com/@samleighsings/">TikTok</a>
                </div>
                <a href="https://instagram.com/samleighsings">Instagram</a>
                <NewAudioPlayer
                  trackName={"Good Riddance"}
                  trackInfo={[
                    {
                      title: "Tokhter's Visit",
                      index: "1",
                      length: "0:44",
                    },
                  ]}
                  songs={[
                    "url('../../assets/Team Profiles/Sam Leigh/Sam Leigh Media/Good Riddance.m4a?url')",
                  ]}
                />
              </div>
            ) : selectedUser.name == "Max Jaime" ? (
              <div style={{ display: "block" }}>
                <p>
                  Maximiliano Jaime is a composer, sound designer, producer,
                  music editor, mixing and mastering engineer from Bogotá,
                  Colombia. Inspired by versatility and curiosity, Max enjoys
                  learning all kinds of new resources in the music spectrum,
                  allowing him to create his own voice as an artist. Max’s
                  journey started with playing drums at the age of 11. At 17, he
                  started his music career studying Contemporary Music at EMMAT,
                  a Berklee Global Partner in Bogotá. At 19, Max was granted the
                  Berklee World Tour Scholarship and the opportunity to move to
                  Boston to study Film Scoring with a specialization in Video
                  Game Scoring at Berklee College of Music. During his time in
                  the United States, he was also awarded a scholarship by the
                  Latin Grammy Cultural Foundation to complete his degree.
                  Currently living in his hometown of Bogotá, Max Jaime work as
                  a music editor, composer, mixing and mastering engineer for
                  post-production audio, and teaches film and video game scoring
                  at EMMAT.
                </p>
                <a href="https://soundcloud.com/maxjaime101">SoundCloud</a>
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameborder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1675702488&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                ></iframe>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#cccccc",
                    lineBreak: "anywhere",
                    wordBreak: "normal",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontFamily:
                      "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
                    fontWeight: 100,
                  }}
                >
                  <a
                    href="https://soundcloud.com/maxjaime101"
                    title="NoiMeGa"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    NoiMeGa
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://soundcloud.com/maxjaime101/minimal-house-dj-set-november-2023-max-jaime"
                    title="DJ Set - Tegmentals with Max Jaime (Minimal House)"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    DJ Set - Tegmentals with Max Jaime (Minimal House)
                  </a>
                </div>
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameborder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1667937009&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                ></iframe>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#cccccc",
                    lineBreak: "anywhere",
                    wordBreak: "normal",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontFamily:
                      "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
                    fontWeight: 100,
                  }}
                >
                  <a
                    href="https://soundcloud.com/maxjaime101"
                    title="NoiMeGa"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    NoiMeGa
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://soundcloud.com/maxjaime101/galactic-groove"
                    title="Galactic Groove"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    Galactic Groove
                  </a>
                </div>
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameborder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1622749656&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                ></iframe>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#cccccc",
                    lineBreak: "anywhere",
                    wordBreak: "normal",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontFamily:
                      "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
                    fontWeight: 100,
                  }}
                >
                  <a
                    href="https://soundcloud.com/maxjaime101"
                    title="NoiMeGa"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    NoiMeGa
                  </a>{" "}
                  ·{" "}
                  <a
                    href="https://soundcloud.com/maxjaime101/a-new-funky-way"
                    title="A New Funky Way"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                  >
                    A New Funky Way
                  </a>
                </div>
              </div>
            ) : selectedUser.name == "Marc Yu" ? (
              <div style={{ display: "block" }}>
                <p>
                  Born in California, Marc has toured as a concert pianist and
                  made media appearances including The Tonight Show, The Oprah
                  Winfrey Show, and The Ellen DeGeneres Show, becoming the focus
                  of print media worldwide including cover stories for both The
                  L.A. Times and The New York Times Magazine. Marc has performed
                  at festivals and on television internationally, has been
                  featured in multiple documentaries, including National
                  Geographic's My Brilliant Brain, and is the subject of
                  multiple books: NY Times Best Seller Far From The Tree by
                  Andrew Solomon and Off the Charts by Ann Hulbert. Marc has
                  also performed with acclaimed pianist Lang Lang at the GRAMMY
                  Salute To Classical Music at Walt Disney Concert Hall, the BBC
                  Proms at the Royal Albert Hall, and Carnegie Hall. Since
                  graduating from Berklee College of Music, Marc has acted as
                  composer, arranger, orchestrator, music editor, copyist, and
                  coordinator on a number of projects, notably assisting on
                  Netflix’s Ridley Jones, Marvel’s Avengers Campus, and
                  Hallmark’s An American in Austen, and also arranging music for
                  Nightingale’s Piano Bar on Disney’s Wish cruise and
                  Disneyland’s new Zootopia attraction. In 2020, Marc co-founded
                  Game Audio Workshop, an organization dedicated to bringing
                  educational game development opportunities to game audio
                  students, co-organizing the annual Game/Music Jam with
                  participants from 50+ colleges.
                </p>
                <div>
                  <a href="https://marcyumusic.com">Website</a>
                </div>
                <div>
                  <a href="https://www.instagram.com/MarcYuMusic/">Instagram</a>
                </div>
                <div>
                  <a href="https://twitter.com/MarcYuMusic">Twitter</a>
                </div>
                <div>
                  <a href="http://facebook.com/MarcYuMusic">Facebook</a>
                </div>
                <div>
                  <a href="http://threads.net/MarcYuMusic">Threads</a>
                </div>
                <div>
                  <a href="mailto:marcyu@marcyumusic.com">Email</a>
                </div>
              </div>
            ) : selectedUser.name == "Austin Leshock" ? (
              <div style={{ display: "block" }}>
                <p>
                  Austin Leshock is a mix engineer, producer, and composer from
                  Wilmington, Delaware. As a graduate in Film Scoring and Music
                  Production and Engineering at Berklee, and a lifelong
                  multiinstrumentalist, he brings the creativity of a musician
                  along with the technical expertise of an audio professional to
                  every track he touches. He currently works part-time as a
                  recording and mixing engineer at The Mix Loft Recording Studio
                  in Quincy, MA where he regularly records and produces local
                  Hip-Hop, R&B, and pop artists, helping to bring their songs to
                  life. What excites Austin most about his work is the process
                  of creative collaboration; brainstorming ideas, sharing
                  different perspectives, and delving into complex emotions, to
                  help realize the full potential of every project and best
                  connect with the listener. In his spare time, he enjoys
                  noodling on the piano, going to the gym, trying new foods, and
                  watching YouTube videos.
                </p>
                <div>
                  <a href="https://www.instagram.com/au_shock/">Instagram</a>
                </div>
                <div>
                  <a href="https://www.facebook.com/profile.php?id=100008654137201">
                    Facebook
                  </a>
                </div>
              </div>
            ) : selectedUser.name == "Austin Burkett" ? (
              <div style={{ display: "block", textAlign: "left" }}>
                <p>
                  Austin Burkett (he/him) is a sound designer/composer pursuing
                  Electronic Production and Jazz Composition at Berklee College
                  of Music in Boston. He specializes in weaving out of this
                  world evocative sound tapestries, and works to capture the
                  unique voice of every project. Along with his studies, Austin
                  most recently has worked as a sound designer and composer on
                  the game Starweave. Austin is passionate about the teams that
                  he works with, experimentation as innovation, and creating
                  incredible experiences, and hopes to bring a spirit of
                  exploration to everything he touches. He believes that every
                  story deserves to be told, and is always working towards
                  bringing more to life. When he isn't in his studio surrounded
                  by synths and dark mood lighting, Austin enjoys ttrpg's,
                  volleyball, and history.
                </p>
                <div style={{ display: "inline-block" }}>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/YGM_oAsjs6A?si=_IPPd3AuVMgRjD5_"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            ) : selectedUser.name == "Ananta Arora" ? (
              <div style={{ display: "block" }}>
                <p>
                  Socials: @rxcktara (Please grab all links) Bio: Ananta Arora
                  graduated from Berklee College of Music in 2021, where she
                  studied Music Business/Management and Film Scoring. She then
                  obtained a Master’s in Business Administration and a Master of
                  Science in Business Analytics from Suffolk University in 2023.
                  While at Berklee, she was on the staff of Berklee College of
                  Music’s Music Business Journal for 4 years and was
                  Editor-in-Chief for the paper for 1.5 years. She has
                  experience consulting with several businesses and startups in
                  various fields, and has participated in several video game
                  music jams and other game projects as a composer and sound
                  designer. In her free time, she enjoys playing electric
                  guitar, attending concerts, watching anime, and playing video
                  games.
                </p>
                <div>
                  <a href="https://www.instagram.com/rxcktara/">Instagram</a>
                </div>
                <div>
                  <a href="https://www.tiktok.com/@rxcktara/">TikTok</a>
                </div>
                <div>
                  <a href="https://www.twitter.com/@rxcktara/">Twitter</a>
                </div>
              </div>
            ) : (
              <p>No bio yet!</p>
            )}
          </div>
        )}
      </div>
      <footer
        style={{
          backgroundColor: "black",
          height: "50px", // Adjust height as needed
        }}
      >
        <p style={{ color: "white", textAlign: "center", lineHeight: "50px" }}>
          ©️2024 .wavyrn • All Rights Reserved
        </p>
      </footer>
    </>
  );
};

export default AboutUs;
