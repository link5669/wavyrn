import { useState, useEffect, useRef } from "react";
import Jobs from "../components/Jobs";
import SelectBoxes from "../components/SelectBoxes";
import AudioDirecting from "../components/services/AudioDirecting";
import Dialogue from "../components/services/Dialogue";
import Music from "../components/services/Music";
import Production from "../components/services/Production";
import SoundDesign from "../components/services/SoundDesign";
import "./Services.css";
import ExpandableHeading from "../components/ExpandableHeading";
import WavNavbar from "../components/Navbar";
import autoAnimate from "@formkit/auto-animate";
import ProfilePic from "../components/ProfilePic";
import { Container, Col, Row } from "react-bootstrap";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { allUsers, categories } from "../utilities/users";
import UserCategory from "../components/UserCategory";
import { X_svg } from "../utilities/svgs";
import HRDiv from "../components/HRDiv";
import "./AboutUs.css";
import {
  Ananta,
  Angelica,
  AustinB,
  AustinL,
  Marc,
  Gret,
  Max,
  Sam,
  Zionna,
  Caleb,
  Julian,
} from "../components/UserProfiles";
import { useLocation } from "react-router-dom";
import Overlay from "../components/Overlay/Overlay";
import { getPfpImage } from "../utilities/utilities";

const About = ({ isMobile }) => {
  const [selected, setSelected] = useState(0);
  const [prevSelected, setPrevSelected] = useState(-1);
  const serviceRefs = useRef({});
  const footerRef = useRef(null);
  const [expanded, setExpanded] = useState(-1);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const setSelectedWrapper = (val) => {
    if (selected === prevSelected || val === selected) return;

    const previousServiceElement = serviceRefs.current[selected];
    if (previousServiceElement) {
      previousServiceElement.classList.add("exiting");
      setTimeout(() => {
        previousServiceElement.classList.remove("exiting");
        setPrevSelected(selected);
        setSelected(val);
      }, 100);
    }
  };

  useEffect(() => {
    const currentServiceRef = serviceRefs.current[selected];
    if (currentServiceRef) {
      currentServiceRef.classList.add("entering");

      setTimeout(() => {
        currentServiceRef.classList.remove("entering");
        updateFooterMargin();
      }, 10);
    }
  }, [selected]);

  const [pfpParent, enableAnimations] = useAutoAnimate({
    duration: 400,
    easing: "ease-in-out",
    disrespectUserMotionPreference: false,
  });
  const { state } = useLocation();

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCat, setSelectedCat] = useState("All");
  const [visibleUsers, setVisibleUsers] = useState(allUsers);

  const [transition, setTransition] = useState(
    state != null ? !state.useAnimate : false,
  );

  const whiteRef = useRef(null);

  const onBackButtonEvent = (e) => {
    if (selectedUser != null) {
      e.preventDefault();
      setSelectedUser(null);
    } else {
      window.history.pushState(null, null, window.location.pathname);
    }
  };

  useEffect(() => {
    if (selectedUser != null) {
      window.history.pushState(null, null, window.location.pathname);
      window.addEventListener("popstate", onBackButtonEvent);
    } else {
      window.removeEventListener("popstate", onBackButtonEvent);
    }
  }, [selectedUser]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (whiteRef.current) whiteRef.current.display = "none";
  //   }, 1500);
  // });

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // In the ProfilePic onClick handler:
  const handleProfileClick = (user) => {
    setSelectedUser(user);
    setIsOverlayVisible(true);
  };

  return (
    <>
      <WavNavbar />
      <div
        style={{
          // minHeight: "87vh",
          backgroundColor: "black",
        }}
      >
        {isMobile ? (
          <>
            <ExpandableHeading
              title="Audio Directing"
              subtitle={"Project Management & Coordination"}
              bg={"url('/images/Services_AudioDirecting.jpg?url')"}
              isMobile={isMobile}
              body={<AudioDirecting isMobile={isMobile} />}
              onClick={() => setExpanded(0)}
              expanded={expanded}
              index={0}
            />
            <ExpandableHeading
              title="Production"
              subtitle={"Mixing, Mastering, & Music Editing"}
              bg={"url('/images/Services_Production.png?url')"}
              isMobile={isMobile}
              body={<Production isMobile={isMobile} />}
              onClick={() => setExpanded(1)}
              expanded={expanded}
              index={1}
            />
            <ExpandableHeading
              title="Sound Design"
              subtitle={"Sound Effects, Ambiences, Foley, & Sonic Branding"}
              bg={"url('/images/Services_SoundDesign.jpg?url')"}
              isMobile={isMobile}
              body={<SoundDesign isMobile={isMobile} />}
              onClick={() => setExpanded(2)}
              expanded={expanded}
              index={2}
            />
            <ExpandableHeading
              title="Music"
              subtitle={"Film, Games, Theme Parks, & Interactive Media"}
              bg={"url('/images/Services_Music.png?url')"}
              isMobile={isMobile}
              body={<Music isMobile={isMobile} />}
              onClick={() => setExpanded(3)}
              expanded={expanded}
              index={3}
            />
            <ExpandableHeading
              title="Voiceover"
              subtitle={"Writing, Casting & Editing"}
              bg={"url('/images/Services_Dialogue.jpg?url')"}
              isMobile={isMobile}
              body={<Dialogue isMobile={isMobile} />}
              onClick={() => setExpanded(4)}
              expanded={expanded}
              index={4}
            />
          </>
        ) : (
          <div>
            <Jobs selected={selected} setSelected={setSelectedWrapper} />
            <SelectBoxes
              selected={selected}
              setSelected={setSelectedWrapper}
              style={{ paddingTop: "1%", paddingBottom: "1%" }}
            />
            <div
              style={{
                width: "100vw",
                alignContent: "center",
                display: "grid",
              }}
            >
              <b
                style={{ fontSize: "2em", textAlign: "center", color: "white" }}
              >
                Audio made fantastic.
              </b>
            </div>
            <br />
            <br />
            <div
              className="services-wrapper"
              style={{ color: "white" }}
              ref={parent}
            >
              {selected === 0 && (
                <span ref={(e) => (serviceRefs.current[0] = e)}>
                  <AudioDirecting data-selected={0} />
                </span>
              )}
              {selected === 1 && (
                <span ref={(e) => (serviceRefs.current[1] = e)}>
                  <Production data-selected={1} />
                </span>
              )}
              {selected === 2 && (
                <span ref={(e) => (serviceRefs.current[2] = e)}>
                  <SoundDesign data-selected={2} />
                </span>
              )}
              {selected === 3 && (
                <span ref={(e) => (serviceRefs.current[3] = e)}>
                  <Music data-selected={3} />
                </span>
              )}
              {selected === 4 && (
                <span ref={(e) => (serviceRefs.current[4] = e)}>
                  <Dialogue data-selected={4} />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      {isMobile ? (
        <>
          <p
            style={{
              paddingLeft: isMobile ? "2em" : "12em",
              paddingRight: isMobile ? "2em" : "12em",
              paddingBottom: ".3em",
              paddingTop: "2%",
              textAlign: "center",
              backgroundColor: "black",
            }}
          >
            Wavyrn is a full-service audio production studio that specializes in
            multimedia audio production. With experience in games, film, and
            other media, we provide services in audio directing, project
            management, sound design, music, voice acting, and more.
          </p>
          <HRDiv />
          <h2 style={{ textAlign: "center" }}>Our Team</h2>
        </>
      ) : (
        <div
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "1.2%",
            paddingRight: "3.5%",
            color: "white",
          }}
        >
          {categories.map((category, index) => {
            return (
              <>
                <UserCategory
                  key={category.category}
                  setVisibleUsers={setVisibleUsers}
                  setSelectedCat={setSelectedCat}
                  categoryList={category.categoryList}
                  category={category.category}
                  selectedCat={selectedCat}
                />
              </>
            );
          })}
        </div>
      )}
      {!isMobile && <HRDiv />}
      {/* {selectedUser == null ? ( */}
      <div
        ref={pfpParent}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: isMobile ? "center" : "flex-start",
          paddingLeft: isMobile ? "5%" : "25%",
          paddingRight: isMobile ? "5%" : "27%",
          width: "100vw",
          color: "white",
        }}
      >
        {isMobile
          ? visibleUsers.map(
              (user, index) =>
                index % 2 === 0 && (
                  <div
                    key={user.name}
                    style={{
                      display: "flex",
                      marginBottom: isMobile ? "10px" : "0",
                    }}
                  >
                    <ProfilePic
                      name={user.name}
                      title={user.title}
                      setSelectedUser={() =>
                        handleProfileClick({
                          name: user.name,
                          title: user.title,
                        })
                      }
                      isMobile={isMobile}
                    />
                    {index + 1 < visibleUsers.length && (
                      <ProfilePic
                        name={visibleUsers[index + 1].name}
                        title={visibleUsers[index + 1].title}
                        setSelectedUser={() =>
                          handleProfileClick({
                            name: visibleUsers[index + 1].name,
                            title: visibleUsers[index + 1].title,
                          })
                        }
                        isMobile={isMobile}
                      />
                    )}
                  </div>
                ),
            )
          : visibleUsers.map((user, index) => (
              <div key={user.name} className="users">
                <ProfilePic
                  name={user.name}
                  title={user.title}
                  setSelectedUser={() =>
                    handleProfileClick({
                      name: user.name,
                      title: user.title,
                    })
                  }
                  isMobile={isMobile}
                />
              </div>
            ))}
      </div>
      {selectedUser && (
        <Overlay
          isVisible={isOverlayVisible}
          onClose={() => {
            setIsOverlayVisible(false);
            setTimeout(() => setSelectedUser(null), 300); // Wait for fade out
          }}
          profileInfo={{
            name: selectedUser.name,
            title: selectedUser.title,
            image: getPfpImage(selectedUser.name),
          }}
        >
          {selectedUser.name == "Sam Leigh" ? (
            <Sam />
          ) : selectedUser.name == "Max Jaime" ? (
            <Max />
          ) : selectedUser.name == "Marc Yu" ? (
            <Marc isMobile={isMobile} />
          ) : selectedUser.name == "Austin Leshock" ? (
            <AustinL />
          ) : selectedUser.name == "Austin Burkett" ? (
            <AustinB isMobile={isMobile} />
          ) : selectedUser.name == "Ananta Arora" ? (
            <Ananta />
          ) : selectedUser.name == "Gret Price" ? (
            <Gret />
          ) : selectedUser.name == "Angelica Ramos" ? (
            <Angelica />
          ) : selectedUser.name == "Zionna Brown" ? (
            <Zionna />
          ) : selectedUser.name == "Caleb Skelly" ? (
            <Caleb />
          ) : selectedUser.name == "Julian Cabrera" ? (
            <Julian isMobile={isMobile} />
          ) : (
            <p>No bio yet!</p>
          )}
        </Overlay>
      )}
      <div ref={footerRef} style={{ backgroundColor: "black", height: "50px" }}>
        <p
          style={{
            color: "white",
            textAlign: "center",
            lineHeight: "50px",
          }}
        >
          ©️2024 Wavyrn • All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default About;
