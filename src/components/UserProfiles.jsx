import { Col, Row } from "react-bootstrap";
import {
    FacebookLink,
    InstaLink,
    MailLink,
    ThreadsLink,
    TikTokLink,
    TwitterLink,
    WebsiteLink,
    BlueskyLink,
    LinkedinLink,
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
import zionna1 from "/Team Profiles/Zionna/Media/1690409008380.png";
import zionna2 from "/Team Profiles/Zionna/Media/DSC06913.jpg";
import zionna3 from "/Team Profiles/Zionna/Media/Friendly_Headshot.jpg";

const Angelica = () => {
    return (
        <div style={{ display: "block", paddingBottom: "5%" }}>
            <p>
                Angelica Ramos is a Filipino-American composer, lyricist, and
                flutist, currently working as a film composer and music copyist.
                She specializes in classical and contemporary musical theatre,
                but firmly believes in working with—and listening to—as many
                music genres as possible. Outside of composition and project
                management, she is a music director for youth community theater.
                Angelica is a current student at Berklee College of Music,
                double-majoring in Composition and Film Scoring with a minor in
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
                Gret is a Boston flute maker, sound designer, flute
                performer/teacher, and foley artist. She studied Performance and
                Game and Interactive Media Scoring at Berklee College of Music.
                She enjoys working with her hands and playing random objects as
                if they were symphony instruments. She can be heard on
                soundtracks for games and film, both as a flutist and as the
                source of sound effects. Her favorite sounds to make are
                footsteps, as they bring a character’s personality to life. She
                also loves making the viewer feel as if they were there with her
                sound effects, adding mood and realism to media. Her hobbies
                include illustration, sculpting, sewing, and of course, gaming.
                Her favorite franchise is Pokemon, for the cute monster friends
                you make. She especially loves Snorlax because you need to play
                flute to capture him in older games. When not at her bench or in
                her studio, she can be found selling ocarinas at local festivals
                and events.
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
                Ananta Arora graduated from Berklee College of Music in 2021,
                where she studied Music Business/Management and Film Scoring.
                She then obtained a Master’s in Business Administration and a
                Master of Science in Business Analytics from Suffolk University
                in 2023. While at Berklee, she was on the staff of Berklee
                College of Music’s Music Business Journal for 4 years and was
                Editor-in-Chief for the paper for 1.5 years. She has experience
                consulting with several businesses and startups in various
                fields, and has participated in several video game music jams
                and other game projects as a composer and sound designer. In her
                free time, she enjoys playing electric guitar, attending
                concerts, watching anime, and playing video games.
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
                Surrounded by forests while growing up in her hometown in
                Oregon, Zionna Brown has always had an affinity for nature.
                Paired with her early love of video games and folk stories, it's
                easy to connect the background behind her love of the fantasy
                genre, vibrant theatrics, and just a few spooky stories. Zionna
                has years of experience in vocal work in recording and on-stage
                performances, as well as teaching others acting and voice.
                Notable performances include Disney World's Candlelight
                Concerts, National Concert Youth Chorus' Reflections on Unity at
                Carnegie Hall, as well as many ensemble and band recitals and
                gigs. She produced and coached at The Broward County Center for
                the Performing Arts and PBS's Kid Stew, along with private
                lessons in her spare time. Always delighted to learn a new
                dialect or language, Zionna has recorded and performed in over
                15 different languages, including Japanese, Hebrew, and even Old
                Norse! Her passion for learning, creating, and collaborating
                shines through as she researches and performs, always making for
                a fun day in the booth.
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
                Austin Burkett (he/him) is a sound designer/composer pursuing
                Electronic Production and Jazz Composition at Berklee College of
                Music in Boston. He specializes in weaving out of this world
                evocative sound tapestries, and works to capture the unique
                voice of every project. Along with his studies, Austin most
                recently has worked as a sound designer and composer on the game
                Starweave. Austin is passionate about the teams that he works
                with, experimentation as innovation, and creating incredible
                experiences, and hopes to bring a spirit of exploration to
                everything he touches. He believes that every story deserves to
                be told, and is always working towards bringing more to life.
                When he isn't in his studio surrounded by synths and dark mood
                lighting, Austin enjoys ttrpg's, volleyball, and history.
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
                Wilmington, Delaware. As a graduate in Film Scoring and Music
                Production and Engineering at Berklee, and a lifelong
                multiinstrumentalist, he brings the creativity of a musician
                along with the technical expertise of an audio professional to
                every track he touches. He currently works part-time as a
                recording and mixing engineer at The Mix Loft Recording Studio
                in Quincy, MA where he regularly records and produces local
                Hip-Hop, R&B, and pop artists, helping to bring their songs to
                life. What excites Austin most about his work is the process of
                creative collaboration; brainstorming ideas, sharing different
                perspectives, and delving into complex emotions, to help realize
                the full potential of every project and best connect with the
                listener. In his spare time, he enjoys noodling on the piano,
                going to the gym, trying new foods, and watching YouTube videos.
            </p>
        </div>
    );
};

const Marc = (isMobile) => {
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
                    <BlueskyLink address="https://bsky.app/profile/marcyumusic.bsky.social" />
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
                Geographic's My Brilliant Brain, and is the subject of multiple
                books: NY Times Best Seller Far From The Tree by Andrew Solomon
                and Off the Charts by Ann Hulbert. Marc has also performed with
                acclaimed pianist Lang Lang at the GRAMMY Salute To Classical
                Music at Walt Disney Concert Hall, the BBC Proms at the Royal
                Albert Hall, and Carnegie Hall. Since graduating from Berklee
                College of Music, Marc has acted as composer, arranger,
                orchestrator, music editor, copyist, and coordinator on a number
                of projects, notably assisting on Netflix’s Ridley Jones,
                Marvel’s Avengers Campus, and Hallmark’s An American in Austen,
                and also arranging music for Nightingale’s Piano Bar on Disney’s
                Wish cruise and Disneyland’s new Zootopia attraction. In 2020,
                Marc co-founded Game Audio Workshop, an organization dedicated
                to bringing educational game development opportunities to game
                audio students, co-organizing the annual Game/Music Jam with
                participants from 50+ colleges.
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
                                1. A Bard's Tale (Library Music : Viking Metal,
                                Action)
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
                Maximiliano Jaime Biography February 2025 Maximiliano Jaime is a
                freelance Composer, Sound Designer, Audio Editor, and
                Mixing/Mastering Engineer currently working remotely at Wavyrn,
                a post-production audio studio based in Boston. Additionally, he
                is a faculty member at EMMAT a Berklee Global Partner School,
                where he teaches in the Composition for Visual Media Department.
                Maximiliano also continues his education by pursuing a graduate
                certificate in Mixing, Mastering, and Production for Visual
                Media at Berklee Online. <br />
                <br />
                Originally from Bogotá, Colombia, Maximiliano began his music
                career at the age of 11 playing the drum set. His passion for
                music led him to study a diploma program in contemporary music
                at EMMAT, graduating in 2019. He furthered his studies at
                Berklee College of Music, where he earned a bachelor's degree in
                Film Scoring with a specialization in Video Game Scoring,
                graduating Magna Cum Laude in 2023. During this time, he also
                earned the Tuition Assistance Scholarship (2022) from the Latin
                Grammy Cultural Foundation. <br />
                <br />
                Maximiliano describes himself as versatile, continuously
                exploring various musical styles, and persistent, driven by a
                desire to push the boundaries of his creativity. His consistency
                in pursuing excellence in both composition and audio engineering
                are reflected in his work and achievements. <br />
                <br />
                In addition to his professional endeavors, Maximiliano has an
                alter-ego called NoiMeGa, under which he produces electronic
                music, mainly in the genres of House, Minimal House, and Deep
                House.
            </p>
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
                Sam Rindfuss (aka Sam Leigh) is a vocalist and voice actor
                working out of the Boston area. They are passionate about
                bringing the artistic visions of others to life and would love
                to be involved with your next project! Sam’s favorite video game
                is Baldur’s Gate 3.
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
                                Good Riddance - Sam Leigh
                            </p>
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

const Caleb = () => {
    return (
        <div style={{ display: "block" }}>
            <br />
            <p>
                Caleb is a jack-of-all-trades and an avid lover of all things
                shiny. He has worked on games such as Ethereal: Clash of Souls
                and OMENRITE as the lead sound designer, as well as fan-driven
                projects like Resurgence of the Storm. He enjoys working with
                vocal synthethis systems and is skilled in technical sound
                programming.He has a Bachelor in Biomedical Science from Troy
                University, and is currently working on acquiring a degree in
                Veterinarian Science. He is a certified professional tutor and
                animal handler. In his downtime, he likes to polish rocks and
                crochet baby octopi.
            </p>
        </div>
    );
};

const Julian = (isMobile) => {
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
                    {/* <WebsiteLink link="https://youtu.be/1O9VpsFrXjI?si=SClror6ZFeKL0FuO" /> */}
                    <WebsiteLink link="https://www.juliancabreraaudio.com/" />
                </div>
                <div style={{ paddingInline: "2%" }}>
                    <InstaLink handle="super_monzee" />
                </div>
                <div style={{ paddingInline: "2%" }}>
                    <TwitterLink handle="@Super_MonZee" />
                </div>
            </div>
            <br />
            <p>
                In the world of visual and interactive media, Julian Cabrera is
                a Composer and Sound Designer. Julian's repertoire showcases a
                multitude of musical styles including epic and powerful
                orchestral works, synthetic and hybrid electronic compositions,
                intense and dirty metal tracks, and 16-bit retro-style music
                akin to the 90s. Julian has served as the role of Composer,
                Sound Designer, Audio Director, and Audio Producer for various
                student games developed at University of Southern California,
                University of Utah, and University of Wisconsin-Stout. These
                games include Delfini (USC), Tavern Crawl (EAE), Splat Cat
                (USC), Garden (USC), BiFrost (EAE), Divining Rods (Stout) and
                many others. Of these games, Defini was nominated for an audio
                design award at IndieCade in 2022. When he’s not working on
                Audio, he’s playing Sonic Adventure 2 Battle.
            </p>
            <iframe
                width="100%"
                height="300"
                scrolling="no"
                frameborder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1607737900&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
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
                    href="https://soundcloud.com/supermonzee"
                    title="Super MonZee"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                >
                    Super MonZee
                </a>{" "}
                ·{" "}
                <a
                    href="https://soundcloud.com/supermonzee/sets/portfolio"
                    title="Portfolio"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                >
                    Portfolio
                </a>
            </div>
            <div
                style={{
                    width: "100%",
                }}
            >
                {isMobile ? (
                    <video
                        style={{ margin: "auto", maxWidth: "80vw" }}
                        src="Julian Cabrera Sound Design Demo Reel.mov"
                        width="750"
                        height="300"
                        controls
                    ></video>
                ) : (
                    <ReactPlayer
                        style={{ margin: "auto", maxWidth: "80vw" }}
                        playing={false}
                        controls={true}
                        url={"Julian Cabrera Sound Design Demo Reel.mov"}
                        isMobile={isMobile}
                    />
                )}
            </div>
        </div>
    );
};

const Michelle = () => {
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
                    <WebsiteLink link="michellelaimusic.com" />
                </div>
                <div style={{ paddingInline: "2%" }}>
                    <InstaLink handle="michellelaimusic" />
                </div>
                <div style={{ paddingInline: "2%" }}>
                    <MailLink address="michellelaimusic@gmail.com" />
                </div>
                <div style={{ paddingInline: "2%" }}>
                    <LinkedinLink handle="michellelaimusic" />
                </div>
            </div>
            <br />
            <p>
                Michelle is a composer for film, TV, and video games. Born in
                Singapore and currently based in Boston, Massachusetts, Michelle
                is a big believer in the transformative power of music and
                storytelling. She was introduced to music early in her life,
                from picking up the piano and trumpet, to joining school bands
                and community orchestras. Her primary sources of musical
                inspiration are the soundtracks to movies, TV shows, and video
                games, particularly those featuring hybrid orchestral
                instrumentations, simple and memorable melodies, colorful but
                “inevitable” harmonies, as well as highly episodic forms.
                Michelle graduated summa cum laude from Berklee College of Music
                in 2023 with a Bachelor’s in Film and Media Scoring, as well as
                Games and Interactive Media Scoring. She now works as a special
                music educator and media composer, venturing into composing
                music from cultures all over the world and exploring unfamiliar
                genres on the side.
            </p>
            <Row>
                <Col style={{ maxWidth: "33%" }}>
                    <img
                        style={{ width: "100%" }}
                        src={
                            "https://www.dl.dropboxusercontent.com/scl/fo/7de9q581pxdwcvcvu4qep/ADxYI2mAEloptkdeBKjq9lE/Michelle%20Lai/Media/IMG_9489.jpg?rlkey=pdazvtkk2j75glkyqgsj4m7oz&e=1&dl=0"
                        }
                    />
                </Col>
                <Col style={{ maxWidth: "33%" }}>
                    <img
                        style={{ width: "100%" }}
                        src={
                            "https://www.dl.dropboxusercontent.com/scl/fo/7de9q581pxdwcvcvu4qep/APK0W3jhydONlrj0feevPoE/Michelle%20Lai/Media/IMG_9490.jpg?rlkey=pdazvtkk2j75glkyqgsj4m7oz&e=1&dl=0"
                        }
                    />
                </Col>
                <Col style={{ maxWidth: "33%" }}>
                    <img
                        style={{ width: "100%" }}
                        src={
                            "https://www.dl.dropboxusercontent.com/scl/fo/7de9q581pxdwcvcvu4qep/AEIk1Bhe27D9iLUUnvDWWN4/Michelle%20Lai/Media/IMG_9492.jpg?rlkey=pdazvtkk2j75glkyqgsj4m7oz&e=1&dl=0"
                        }
                    />
                </Col>
            </Row>
            <iframe
                width="100%"
                height="300"
                scrolling="no"
                frameborder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1970890404&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
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
                    href="https://soundcloud.com/michelle-lai-969628187"
                    title="Michelle Lai"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                >
                    Michelle Lai
                </a>{" "}
                ·{" "}
                <a
                    href="https://soundcloud.com/michelle-lai-969628187/sets/the-burrow-original-video-game-soundtrack"
                    title="The Burrow (Original Video Game Soundtrack)"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                >
                    The Burrow (Original Video Game Soundtrack)
                </a>
            </div>
            <iframe
                width="100%"
                height="300"
                scrolling="no"
                frameborder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1970888500&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
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
                    href="https://soundcloud.com/michelle-lai-969628187"
                    title="Michelle Lai"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                >
                    Michelle Lai
                </a>{" "}
                ·{" "}
                <a
                    href="https://soundcloud.com/michelle-lai-969628187/sets/arena-crunch-original-video-game-soundtrack"
                    title="Arena Crunch (Original Video Game Soundtrack)"
                    target="_blank"
                    style={{ color: "#cccccc", textDecoration: "none" }}
                >
                    Arena Crunch (Original Video Game Soundtrack)
                </a>
            </div>
        </div>
    );
};

const Neil = () => {
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
                    <TwitterLink handle="@smallsoundss" />
                </div>
                <div style={{ paddingInline: "2%" }}>
                    <InstaLink handle="smallsoundss" />
                </div>
                <div style={{ paddingInline: "2%" }}>
                    <BlueskyLink address="https://bsky.app/profile/smallsoundss.bsky.social" />
                </div>
            </div>
            <br />
            <p>
                Neil Small is an award-winning audio director, technical audio
                designer, and sound designer from Boston, Massachusetts. His
                work has been featured at the Massachusetts Institute of
                Technology, Game Devs of Color Expo, Steam Next Fest, and Boston
                Festival of Indie Games. Neil recently graduated from Berklee
                College of Music where he studied Game and Interactive Media
                Scoring, Contemporary Writing and Production, and Creative
                Coding. This interdisciplinary education has given him a deep
                understanding of both the artistic and technical aspects of
                sound, including music composition, orchestration, adaptive
                music systems, procedural sound design, and programming for both
                games and general applications.
                <br />
                <br />
                Throughout his career, Neil has contributed to a variety of
                notable projects. In theater, he composed an original score for
                Marblehead High School’s production of Peter/Wendy, earning him
                the All-Star Award for Music Direction from the Massachusetts
                Educational Theater Guild. Shifting to game development, he
                servedas the audio director for Ripple and Frawg: The Seasonal
                Song, which was featured in Steam Next Fest (October 2024) and
                won the Excellence in Audio Award at the Boston Festival of
                Indie Games. His expertise in UI sound design was also showcased
                in Egregore, a game featured at the Game Devs of Color Expo.
                <br />
                <br />
                In his free time, Neil enjoys playing Final Fantasy games,
                completing all levels of Khan Academy math, and reading
                autobiographies.
            </p>
        </div>
    );
};

export {
    Sam,
    Max,
    Marc,
    Angelica,
    Ananta,
    Gret,
    AustinB,
    AustinL,
    Zionna,
    Caleb,
    Julian,
    Michelle,
    Neil,
};
