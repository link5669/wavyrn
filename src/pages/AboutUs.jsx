import WavNavbar from "../components/Navbar";
import ProfilePic from "../components/ProfilePic";
import { Container, Col, Row } from "react-bootstrap";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { allUsers, categories } from "../utilities/users";
import UserCategory from "../components/UserCategory";
import { X_svg } from "../utilities/svgs";
import HRDiv from "../components/HRDiv";
import "./AboutUs.css";
import NewAudioPlayer from "../components/NewAudioPlayer";
import bg from "/images/About Us - Banner.jpg";
import goodriddance from "/Team Profiles/Sam Leigh/Sam Leigh Media/Good Riddance.mp3";
import gret1 from "/Team Profiles/Gret Price/Bio Pictures/Bio Picture 1.jpg";
import gret2 from "/Team Profiles/Gret Price/Bio Pictures/Bio Picture 2.jpg";
import gret3 from "/Team Profiles/Gret Price/Bio Pictures/Bio Picture 3.jpg";
import gret4 from "/Team Profiles/Gret Price/Bio Pictures/Bio Picture 4.jpg";
import marc1 from "/Team Profiles/Marc Yu/Marc Yu Media/Alistair.jpg";
import marc2 from "/Team Profiles/Marc Yu/Marc Yu Media/Avengers Campus.jpg";

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
            backgroundImage: "url('/images/About Us - Banner.jpg?url')",
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
                      length: "0:03",
                    },
                  ]}
                  songs={[
                    "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
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
                <br />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ paddingInline: "2%" }}>
                    <a href="https://marcyumusic.com">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="gray"
                        class="bi bi-link-45deg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                      </svg>
                    </a>
                  </div>
                  <div style={{ paddingInline: "2%" }}>
                    <a href="https://www.instagram.com/MarcYuMusic/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-instagram"
                        viewBox="0 0 16 16"
                        style={{ color: "gray" }}
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                      </svg>
                    </a>
                  </div>
                  <div style={{ paddingInline: "2%" }}>
                    <a href="https://twitter.com/MarcYuMusic">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-twitter"
                        viewBox="0 0 16 16"
                        style={{ color: "gray" }}
                      >
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                    </a>
                  </div>
                  <div style={{ paddingInline: "2%" }}>
                    <a href="http://facebook.com/MarcYuMusic">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-facebook"
                        viewBox="0 0 16 16"
                        style={{ color: "gray" }}
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                    </a>
                  </div>
                  <div style={{ paddingInline: "2%" }}>
                    <a href="http://threads.net/MarcYuMusic">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-threads"
                        viewBox="0 0 16 16"
                        style={{ color: "gray" }}
                      >
                        <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948.591.621.928 1.509 1.005 2.644.328.138.63.299.905.484 1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.217 6.217 0 0 0-1.528-.161Z" />
                      </svg>
                    </a>
                  </div>
                  <div style={{ paddingInline: "2%" }}>
                    <a href="mailto:marcyu@marcyumusic.com">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-envelope"
                        viewBox="0 0 16 16"
                        style={{ color: "gray" }}
                      >
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <br />
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
                <Row>
                  <Col style={{ maxWidth: "50%" }}>
                    <img
                      style={{
                        width: "100%",
                        paddingRight: "15%",
                        paddingLeft: "15%",
                      }}
                      src={marc1}
                    />
                  </Col>
                  <Col style={{ maxWidth: "50%" }}>
                    <img
                      style={{
                        width: "100%",
                        paddingLeft: "15%",
                        paddingRight: "15%",
                      }}
                      src={marc2}
                    />
                  </Col>
                </Row>
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
            ) : selectedUser.name == "Gret Price" ? (
              <div style={{ display: "block", paddingBottom: "5%" }}>
                <p>
                  Gret is a Boston flute maker, sound designer, flute
                  performer/teacher, and foley artist. She studied Performance
                  and Game and Interactive Media Scoring at Berklee College of
                  Music. She enjoys working with her hands and playing random
                  objects as if they were symphony instruments. She can be heard
                  on soundtracks for games and film, both as a flutist and as
                  the source of sound effects. Her favorite sounds to make are
                  footsteps, as they bring a character’s personality to life.
                  She also loves making the viewer feel as if they were there
                  with her sound effects, adding mood and realism to media. Her
                  hobbies include illustration, sculpting, sewing, and of
                  course, gaming. Her favorite franchise is Pokemon, for the
                  cute monster friends you make. She especially loves Snorlax
                  because you need to play flute to capture him in older games.
                  When not at her bench or in her studio, she can be found
                  selling ocarinas at local festivals and events.
                </p>
                <a href="https://instagram.com/gretplaysallflutes">Instagram</a>
                <Row>
                  <Col style={{ maxWidth: "25%" }}>
                    <img style={{ width: "100%" }} src={gret1} />
                  </Col>
                  <Col style={{ maxWidth: "25%" }}>
                    <img style={{ width: "100%" }} src={gret2} />
                  </Col>
                  <Col style={{ maxWidth: "25%" }}>
                    <img style={{ width: "100%" }} src={gret3} />
                  </Col>
                  <Col style={{ maxWidth: "25%" }}>
                    <img style={{ width: "100%" }} src={gret4} />
                  </Col>
                </Row>
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
