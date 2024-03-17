import { Col, Row } from "react-bootstrap";
import {
  FacebookLink,
  InstaLink,
  MailLink,
  ThreadsLink,
  TikTokLink,
  TwitterLink,
  WebsiteLink,
} from "./SocialLinks";
import ReactPlayer from "react-player";
import NewAudioPlayer from "../components/NewAudioPlayer";
import bg from "/images/About Us - Banner.jpg";
import goodriddance from "/Team Profiles/Sam Leigh/Sam Leigh Media/Good Riddance.mp3";
import gret1 from "/Team Profiles/Gret Price/Bio Pictures/Bio Picture 1.jpg";
import gret2 from "/Team Profiles/Gret Price/Bio Pictures/Bio Picture 2.jpg";
import gret3 from "/Team Profiles/Gret Price/Bio Pictures/Bio Picture 3.jpg";
import gret4 from "/Team Profiles/Gret Price/Bio Pictures/Bio Picture 4.jpg";
import marc1 from "/Team Profiles/Marc Yu/Marc Yu Media/Alistair.jpg";
import marc2 from "/Team Profiles/Marc Yu/Marc Yu Media/Avengers Campus.jpg";
import { Player } from "react-simple-player";
import marcAudio1 from "/Team Profiles/Marc Yu/Marc Yu Media/1. A Bard's Tale (Library Music : Viking Metal, Action).wav";
import marcAudio2 from "/Team Profiles/Marc Yu/Marc Yu Media/2. Moonstruck (Feature Film : Romantic Comedy).wav";
import marcAudio3 from "/Team Profiles/Marc Yu/Marc Yu Media/3. Butterfly (Short Film : Coming-of-Age Montage).mp3";
import marcAudio4 from "/Team Profiles/Marc Yu/Marc Yu Media/4. Stalling (Musical Theater : Folk Cabaret).wav";
import zionna1 from "/Team Profiles/Zionna/Media/1690409008380.png"
import zionna2 from "/Team Profiles/Zionna/Media/DSC06913.jpg"
import zionna3 from "/Team Profiles/Zionna/Media/Friendly_Headshot.jpg"

const Angelica = () => {
  return (
    <div style={{ display: "block", paddingBottom: "5%" }}>
      <p>
        Angelica Ramos is a Filipino-American composer, lyricist, and flutist,
        currently working as a film composer and music copyist. She specializes
        in classical and contemporary musical theatre, but firmly believes in
        working with—and listening to—as many music genres as possible. Outside
        of composition and project management, she is a music director for youth
        community theater. Angelica is a current student at Berklee College of
        Music, double-majoring in Composition and Film Scoring with a minor in
        Musical Theatre Writing.
      </p>
    </div>
  );
};

const Gret = () => {
  return (
    <div style={{ display: "block", paddingBottom: "5%" }}>
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ paddingInline: "2%" }}>
          <InstaLink handle="gretplaysallflutes" />
        </div>
      </div>
      <br />
      <p>
        Gret is a Boston flute maker, sound designer, flute performer/teacher,
        and foley artist. She studied Performance and Game and Interactive Media
        Scoring at Berklee College of Music. She enjoys working with her hands
        and playing random objects as if they were symphony instruments. She can
        be heard on soundtracks for games and film, both as a flutist and as the
        source of sound effects. Her favorite sounds to make are footsteps, as
        they bring a character’s personality to life. She also loves making the
        viewer feel as if they were there with her sound effects, adding mood
        and realism to media. Her hobbies include illustration, sculpting,
        sewing, and of course, gaming. Her favorite franchise is Pokemon, for
        the cute monster friends you make. She especially loves Snorlax because
        you need to play flute to capture him in older games. When not at her
        bench or in her studio, she can be found selling ocarinas at local
        festivals and events.
      </p>
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
  );
};

const Ananta = () => {
  return (
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
          <InstaLink handle="rxcktara" />
        </div>
        <div style={{ paddingInline: "2%" }}>
          <TwitterLink handle="@rxcktara" />
        </div>
        <div style={{ paddingInline: "2%" }}>
          <TikTokLink handle="@rxcktara" />
        </div>
      </div>
      <br />
      <p>
        Ananta Arora graduated from Berklee College of Music in 2021, where she
        studied Music Business/Management and Film Scoring. She then obtained a
        Master’s in Business Administration and a Master of Science in Business
        Analytics from Suffolk University in 2023. While at Berklee, she was on
        the staff of Berklee College of Music’s Music Business Journal for 4
        years and was Editor-in-Chief for the paper for 1.5 years. She has
        experience consulting with several businesses and startups in various
        fields, and has participated in several video game music jams and other
        game projects as a composer and sound designer. In her free time, she
        enjoys playing electric guitar, attending concerts, watching anime, and
        playing video games.
      </p>
    </div>
  );
};

const Zionna = () => {
  return (
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
          <InstaLink handle="zionnavee" />
        </div>
      </div>
      <br />
      <p>
        Surrounded by forests while growing up in her hometown in Oregon, Zionna
        Brown has always had an affinity for nature. Paired with her early love
        of video games and folk stories, it's easy to connect the background
        behind her love of the fantasy genre, vibranttheatrics, and just a few
        spooky stories. Zionna has years of experience in vocal work inrecording
        and on-stage performances, as well as teaching others acting and voice.
        Notable performances include Disney World's Candlelight Concerts,
        National Concert Youth Chorus' Reflections on Unityat Carnegie Hall, as
        well as many ensemble and band recitals and gigs. She produced and
        coached at The Broward County Center for the Performing Arts and PBS's
        Kid Stew, along with private lessons in her spare time.Always delighted
        to learn a new dialect or language, Zionna has recorded and performed in
        over 15 different languages, including Japanese, Hebrew, and even Old
        Norse! Her passion for learning, creating, and collaborating shines
        through as she researches and performs, always making for a fun day in
        the booth.
      </p>
      <Row>
        <Col style={{ maxWidth: "33%" }}>
          <img style={{ width: "100%" }} src={zionna1} />
        </Col>
        <Col style={{ maxWidth: "33%" }}>
          <img style={{ width: "100%" }} src={zionna2} />
        </Col>
        <Col style={{ maxWidth: "33%" }}>
          <img style={{ width: "100%" }} src={zionna3} />
        </Col>
      </Row>
    </div>
  );
};

const AustinB = (isMobile) => {
  return (
    <div style={{ display: "block", textAlign: "left" }}>
      <p>
        Austin Burkett (he/him) is a sound designer/composer pursuing Electronic
        Production and Jazz Composition at Berklee College of Music in Boston.
        He specializes in weaving out of this world evocative sound tapestries,
        and works to capture the unique voice of every project. Along with his
        studies, Austin most recently has worked as a sound designer and
        composer on the game Starweave. Austin is passionate about the teams
        that he works with, experimentation as innovation, and creating
        incredible experiences, and hopes to bring a spirit of exploration to
        everything he touches. He believes that every story deserves to be told,
        and is always working towards bringing more to life. When he isn't in
        his studio surrounded by synths and dark mood lighting, Austin enjoys
        ttrpg's, volleyball, and history.
      </p>
      <div
        style={{
          width: "100%",
        }}
      >
        {isMobile ? (
          <video
            style={{ margin: "auto", maxWidth: "80vw" }}
            src="Audio_Redesign_Reel_Austin_Burkett.mov"
            width="750"
            height="300"
            controls
          ></video>
        ) : (
          <ReactPlayer
            style={{ margin: "auto", maxWidth: "80vw" }}
            playing={false}
            controls={true}
            url={"Audio_Redesign_Reel_Austin_Burkett.mov"}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
};

const AustinL = () => {
  return (
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
          <InstaLink handle="au_shock" />
        </div>

        <div style={{ paddingInline: "2%" }}>
          <FacebookLink handle="profile.php?id=100008654137201" />
        </div>
      </div>
      <br />
      <p>
        Austin Leshock is a mix engineer, producer, and composer from
        Wilmington, Delaware. As a graduate in Film Scoring and Music Production
        and Engineering at Berklee, and a lifelong multiinstrumentalist, he
        brings the creativity of a musician along with the technical expertise
        of an audio professional to every track he touches. He currently works
        part-time as a recording and mixing engineer at The Mix Loft Recording
        Studio in Quincy, MA where he regularly records and produces local
        Hip-Hop, R&B, and pop artists, helping to bring their songs to life.
        What excites Austin most about his work is the process of creative
        collaboration; brainstorming ideas, sharing different perspectives, and
        delving into complex emotions, to help realize the full potential of
        every project and best connect with the listener. In his spare time, he
        enjoys noodling on the piano, going to the gym, trying new foods, and
        watching YouTube videos.
      </p>
    </div>
  );
};

const Marc = () => {
  return (
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
          <WebsiteLink link="https://marcyumusic.com" />
        </div>
        <div style={{ paddingInline: "2%" }}>
          <InstaLink handle="MarcYuMusic" />
        </div>
        <div style={{ paddingInline: "2%" }}>
          <TwitterLink handle="MarcYuMusic" />
        </div>
        <div style={{ paddingInline: "2%" }}>
          <FacebookLink handle="MarcYuMusic" />
        </div>
        <div style={{ paddingInline: "2%" }}>
          <ThreadsLink handle="MarcYuMusic" />
        </div>
        <div style={{ paddingInline: "2%" }}>
          <MailLink address="marcyu@marcyumusic.com" />
        </div>
      </div>
      <br />
      <p>
        Born in California, Marc has toured as a concert pianist and made media
        appearances including The Tonight Show, The Oprah Winfrey Show, and The
        Ellen DeGeneres Show, becoming the focus of print media worldwide
        including cover stories for both The L.A. Times and The New York Times
        Magazine. Marc has performed at festivals and on television
        internationally, has been featured in multiple documentaries, including
        National Geographic's My Brilliant Brain, and is the subject of multiple
        books: NY Times Best Seller Far From The Tree by Andrew Solomon and Off
        the Charts by Ann Hulbert. Marc has also performed with acclaimed
        pianist Lang Lang at the GRAMMY Salute To Classical Music at Walt Disney
        Concert Hall, the BBC Proms at the Royal Albert Hall, and Carnegie Hall.
        Since graduating from Berklee College of Music, Marc has acted as
        composer, arranger, orchestrator, music editor, copyist, and coordinator
        on a number of projects, notably assisting on Netflix’s Ridley Jones,
        Marvel’s Avengers Campus, and Hallmark’s An American in Austen, and also
        arranging music for Nightingale’s Piano Bar on Disney’s Wish cruise and
        Disneyland’s new Zootopia attraction. In 2020, Marc co-founded Game
        Audio Workshop, an organization dedicated to bringing educational game
        development opportunities to game audio students, co-organizing the
        annual Game/Music Jam with participants from 50+ colleges.
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <Row>
            <Col>
              <p style={{ fontSize: ".75em" }}>
                1. A Bard's Tale (Library Music : Viking Metal, Action)
              </p>
              <Player
                grey={[206, 0, 54]}
                accent={[255, 0, 0]}
                src={marcAudio1}
                height={30}
              />
            </Col>

            <Col>
              <p style={{ fontSize: ".8em" }}>
                {isMobile
                  ? "2. Moonstruck (Feature Film : Romantic Comedy)"
                  : "3. Butterfly (Short Film : Coming-of-Age Montage)"}
              </p>
              <Player
                grey={[206, 0, 54]}
                accent={[255, 0, 0]}
                src={isMobile ? marcAudio2 : marcAudio3}
                height={30}
              />
            </Col>
          </Row>
          <Row style={{ paddingTop: "2%" }}>
            <Col>
              <p style={{ fontSize: ".8em" }}>
                {!isMobile
                  ? "2. Moonstruck (Feature Film : Romantic Comedy)"
                  : "3. Butterfly (Short Film : Coming-of-Age Montage)"}
              </p>
              <Player
                grey={[206, 0, 54]}
                accent={[255, 0, 0]}
                src={isMobile ? marcAudio3 : marcAudio2}
                height={30}
              />
            </Col>
            <Col>
              <p style={{ fontSize: ".8em" }}>
                4. Stalling (Musical Theater : Folk Cabaret)
              </p>
              <Player
                grey={[206, 0, 54]}
                accent={[255, 0, 0]}
                src={marcAudio4}
                height={30}
              />
            </Col>
          </Row>
        </div>
      </div>
      <br />
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
  );
};

const Max = () => {
  return (
    <div style={{ display: "block" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ paddingInline: "2%" }}>
          <WebsiteLink link="https://www.maxjaimemusic.com/" />
        </div>
      </div>
      <p>
        Maximiliano Jaime is a composer, sound designer, producer, music editor,
        mixing and mastering engineer from Bogotá, Colombia. Inspired by
        versatility and curiosity, Max enjoys learning all kinds of new
        resources in the music spectrum, allowing him to create his own voice as
        an artist. Max’s journey started with playing drums at the age of 11. At
        17, he started his music career studying Contemporary Music at EMMAT, a
        Berklee Global Partner in Bogotá. At 19, Max was granted the Berklee
        World Tour Scholarship and the opportunity to move to Boston to study
        Film Scoring with a specialization in Video Game Scoring at Berklee
        College of Music. During his time in the United States, he was also
        awarded a scholarship by the Latin Grammy Cultural Foundation to
        complete his degree. Currently living in his hometown of Bogotá, Max
        Jaime work as a music editor, composer, mixing and mastering engineer
        for post-production audio, and teaches film and video game scoring at
        EMMAT.
      </p>
      {/* <a href="https://soundcloud.com/maxjaime101">SoundCloud</a> */}
      <iframe
        width="50%"
        height="200"
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
        width="50%"
        height="200"
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
        width="50%"
        height="200"
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
  );
};

const Sam = () => {
  return (
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
          <WebsiteLink link="https://www.samleighstudio.com/" />
        </div>
        <div style={{ paddingInline: "2%" }}>
          <InstaLink handle="@samleighsings" />
        </div>
        <div style={{ paddingInline: "2%" }}>
          <TikTokLink handle="@samleighsings" />
        </div>
      </div>
      <br />
      <p>
        Sam Rindfuss (aka Sam Leigh) is an actor, vocalist, percussionist, and
        pianist working out of the Boston area. They are passionate about
        helping to bring the creative visions of others to life.
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <Row>
            <Col>
              <p style={{ fontSize: ".75em" }}>Good Riddance - Sam Leigh</p>
              <Player
                grey={[206, 0, 54]}
                accent={[255, 0, 0]}
                src={goodriddance}
                height={30}
              />
            </Col>
            <Col></Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export { Sam, Max, Marc, Angelica, Ananta, Gret, AustinB, AustinL, Zionna };
