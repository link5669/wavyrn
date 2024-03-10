import ProfilePic from "../components/ProfilePic";
import { Container, Col, Row } from "react-bootstrap";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
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
      <div style={{ minHeight: "100vh", paddingBottom: "2%" }}>
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
