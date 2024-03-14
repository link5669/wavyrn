import ProfilePic from "../components/ProfilePic";
import { Container, Col, Row } from "react-bootstrap";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState, useRef, useEffect } from "react";
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
} from "../components/UserProfiles";
import { useLocation } from "react-router-dom";

const AboutUs = ({ isMobile, animate }) => {
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 400,
    easing: "ease-in-out",
    disrespectUserMotionPreference: false,
  });
  const { state } = useLocation();
  const { useAnimate } = state;

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCat, setSelectedCat] = useState("All");
  const [visibleUsers, setVisibleUsers] = useState(allUsers);

  const [transition, setTransition] = useState(!useAnimate || animate);

  const whiteRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (whiteRef.current) whiteRef.current.display = 'none';
    }, 1500);
  });

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 100000,
          transition: "opacity ease-in-out 1.5s",
          opacity: transition ? 1 : 0,
          pointerEvents: 'none'
        }}
        className={transition ? "animate" : ""}
        ref={whiteRef}
      />
      <div style={{ minHeight: "100vh", paddingBottom: "2%" }}>
        {!isMobile && (
          <div
            style={{
              backgroundImage: isMobile
                ? "none"
                : "url('/images/About Us - Banner.jpg?url')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%",
              height: "15em",
              width: "100vw",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                marginBottom: ".5em",
                marginTop: "1em",
                color: "white",
              }}
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
                malesuada facilisis tellus, aliquam molestie purus consequat
                nec. Fusce arcu sapien, fringilla eu arcu volutpat, consequat
                dignissim est.
              </b>
            </p>
          </div>
        )}
        {isMobile ? (
          <h2 style={{ textAlign: "center" }}>Our Team</h2>
        ) : (
          <div
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "1.2%",
              paddingRight: "3.5%",
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
        <HRDiv />
        {selectedUser == null ? (
          <div
            ref={parent}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: isMobile? 'center' :"flex-start",
              paddingLeft: isMobile ? "5%" : "18%",
              paddingRight: "18%",
              width: "100vw",
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
                          justifyContent: "space-between",
                          marginBottom: isMobile ? "10px" : "0",
                        }}
                      >
                        <ProfilePic
                          name={user.name}
                          title={user.title}
                          setSelectedUser={setSelectedUser}
                        />
                        {index + 1 < visibleUsers.length && (
                          <ProfilePic
                            name={visibleUsers[index + 1].name}
                            title={visibleUsers[index + 1].title}
                            setSelectedUser={setSelectedUser}
                          />
                        )}
                      </div>
                    )
                )
              : visibleUsers.map((user, index) => (
                  <div key={user.name} className="users">
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
              paddingLeft: isMobile ? "4%" : "15%",
              paddingRight: isMobile ? "4%" : "15%",
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
                  style={{
                    borderStyle: "solid",
                    borderWidth: "thin",
                    cursor: "pointer",
                  }}
                >
                  <X_svg />
                </svg>
              </Col>
            </Container>
            {selectedUser.name == "Sam Leigh" ? (
              <Sam />
            ) : selectedUser.name == "Max Jaime" ? (
              <Max />
            ) : selectedUser.name == "Marc Yu" ? (
              <Marc />
            ) : selectedUser.name == "Austin Leshock" ? (
              <AustinL />
            ) : selectedUser.name == "Austin Burkett" ? (
              <AustinB />
            ) : selectedUser.name == "Ananta Arora" ? (
              <Ananta />
            ) : selectedUser.name == "Gret Price" ? (
              <Gret />
            ) : selectedUser.name == "Angelica Ramos" ? (
              <Angelica />
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
