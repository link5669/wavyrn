import WavNavbar from "../components/Navbar";
import ProfilePic from "../components/ProfilePic";
import { Container, Col } from "react-bootstrap";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { allUsers, categories } from "../utilities/users";
import UserCategory from "../components/UserCategory";
import { X_svg } from "../utilities/svgs";
import HRDiv from "../components/HRDiv";

const AboutUs = () => {
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 400,
    easing: "ease-in-out",
    disrespectUserMotionPreference: false,
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCat, setSelectedCat] = useState("All");
  const [visibleUsers, setVisibleUsers] = useState(allUsers);

  return (
    <div style={{ minHeight: "100vh" }}>
      <WavNavbar />
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
        <h2 style={{ marginBottom: ".5em", marginTop: "1em", color: "white" }}>
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
          paddingRight: '3.5%'
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
            flexFlow: "row wrap",
            justifyContent: "flex-start",
            paddingLeft: "15%",
            paddingRight: "15%",
          }}
        >
          {visibleUsers.map((user) => (
            <ProfilePic
              key={user.name}
              name={user.name}
              title={user.title}
              setSelectedUser={setSelectedUser}
            />
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
            <Col xs={2}>
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
            <p>
              Sam Rindfuss (aka Sam Leigh) is an actor, vocalist, percussionist,
              and pianist working out of the Boston area. They are passionate
              about helping to bring the creative visions of others to life.
            </p>
          ) : selectedUser.name == "Max Jaime" ? (
            <p>
              Social Media Link: https://soundcloud.com/maxjaime101 Bio:
              Maximiliano Jaime is a composer, sound designer, producer, music
              editor, mixing and mastering engineer from Bogotá, Colombia.
              Inspired by versatility and curiosity, Max enjoys learning all
              kinds of new resources in the music spectrum, allowing him to
              create his own voice as an artist. Max’s journey started with
              playing drums at the age of 11. At 17, he started his music career
              studying Contemporary Music at EMMAT, a Berklee Global Partner in
              Bogotá. At 19, Max was granted the Berklee World Tour Scholarship
              and the opportunity to move to Boston to study Film Scoring with a
              specialization in Video Game Scoring at Berklee College of Music.
              During his time in the United States, he was also awarded a
              scholarship by the Latin Grammy Cultural Foundation to complete
              his degree. Currently living in his hometown of Bogotá, Max Jaime
              work as a music editor, composer, mixing and mastering engineer
              for post-production audio, and teaches film and video game scoring
              at EMMAT. Media: Include several tracks using the Soundcloud
              player from Max’s Soundcloud: https://soundcloud.com/maxjaime101
            </p>
          ) : selectedUser.name == "Marc Yu" ? (
            <p>
              Website: marcyumusic.com Social Media: Copy everything from
              marcyumusic.com Bio: Born in California, Marc has toured as a
              concert pianist and made media appearances including The Tonight
              Show, The Oprah Winfrey Show, and The Ellen DeGeneres Show,
              becoming the focus of print media worldwide including cover
              stories for both The L.A. Times and The New York Times Magazine.
              Marc has performed at festivals and on television internationally,
              has been featured in multiple documentaries, including National
              Geographic's My Brilliant Brain, and is the subject of multiple
              books: NY Times Best Seller Far From The Tree by Andrew Solomon
              and Off the Charts by Ann Hulbert. Marc has also performed with
              acclaimed pianist Lang Lang at the GRAMMY Salute To Classical
              Music at Walt Disney Concert Hall, the BBC Proms at the Royal
              Albert Hall, and Carnegie Hall. Since graduating from Berklee
              College of Music, Marc has acted as composer, arranger,
              orchestrator, music editor, copyist, and coordinator on a number
              of projects, notably assisting on Netflix’s Ridley Jones, Marvel’s
              Avengers Campus, and Hallmark’s An American in Austen, and also
              arranging music for Nightingale’s Piano Bar on Disney’s Wish
              cruise and Disneyland’s new Zootopia attraction. In 2020, Marc
              co-founded Game Audio Workshop, an organization dedicated to
              bringing educational game development opportunities to game audio
              students, co-organizing the annual Game/Music Jam with
              participants from 50+ colleges.
            </p>
          ) : selectedUser.name == "Austin Leshock" ? (
            <p>
              Social Media Links: https://www.instagram.com/au_shock/
              https://www.facebook.com/profile.php?id=100008654137201
            </p>
          ) : selectedUser.name == "Austin Burkett" ? (
            <p>
              Austin Burkett (he/him) is a sound designer/composer pursuing
              Electronic Production and Jazz Composition at Berklee College of
              Music in Boston. He specializes in weaving out of this world
              evocative sound tapestries, and works to capture the unique voice
              of every project. Along with his studies, Austin most recently has
              worked as a sound designer and composer on the game Starweave.
              Austin is passionate about the teams that he works with,
              experimentation as innovation, and creating incredible
              experiences, and hopes to bring a spirit of exploration to
              everything he touches. He believes that every story deserves to be
              told, and is always working towards bringing more to life. When he
              isn't in his studio surrounded by synths and dark mood lighting,
              Austin enjoys ttrpg's, volleyball, and history.
            </p>
          ) : selectedUser.name == "Ananta Arora" ? (
            <p>
              Socials: @rxcktara (Please grab all links) Bio: Ananta Arora
              graduated from Berklee College of Music in 2021, where she studied
              Music Business/Management and Film Scoring. She then obtained a
              Master’s in Business Administration and a Master of Science in
              Business Analytics from Suffolk University in 2023. While at
              Berklee, she was on the staff of Berklee College of Music’s Music
              Business Journal for 4 years and was Editor-in-Chief for the paper
              for 1.5 years. She has experience consulting with several
              businesses and startups in various fields, and has participated in
              several video game music jams and other game projects as a
              composer and sound designer. In her free time, she enjoys playing
              electric guitar, attending concerts, watching anime, and playing
              video games.
            </p>
          ) : (
            <p>No bio yet!</p>
          )}
        </div>
      )}
      <footer
        style={{
          backgroundColor: "black",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50px", // Adjust height as needed
        }}
      >
        <p style={{ color: "white", textAlign: "center", lineHeight: "50px" }}>
          ©️2024 .wavyrn • All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
