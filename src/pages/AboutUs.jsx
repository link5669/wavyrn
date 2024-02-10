import WavNavbar from "../components/Navbar";
import ProfilePic from "../components/ProfilePic";
import { Container, Row, Col } from "react-bootstrap";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import {
  projectManagement,
  audioDirecting,
  production,
  soundDesign,
  music,
  dialogue,
  allUsers,
} from "../utilities/users";
import UserCategory from "../components/UserCategory";

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
          backgroundImage: "url('../../assets/images/temp_background.png?url')",
          height: "10em",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: ".5em", marginTop: "1em" }}>
          Stuff we've made
        </h2>
        <p
          style={{
            paddingLeft: "10em",
            paddingRight: "10em",
            paddingBottom: "3em",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          malesuada facilisis tellus, aliquam molestie purus consequat nec.
          Fusce arcu sapien, fringilla eu arcu volutpat, consequat dignissim
          est.
        </p>
      </div>
      <hr style={{ width: "33%", marginLeft: "33%" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserCategory
          setVisibleUsers={setVisibleUsers}
          setSelectedCat={setSelectedCat}
          categoryList={allUsers}
          category={"All"}
          selectedCat={selectedCat}
        />
        <UserCategory
          setVisibleUsers={setVisibleUsers}
          setSelectedCat={setSelectedCat}
          categoryList={projectManagement}
          category={"Project Management"}
          selectedCat={selectedCat}
        />
        <UserCategory
          setVisibleUsers={setVisibleUsers}
          setSelectedCat={setSelectedCat}
          categoryList={audioDirecting}
          category={"Audio Directing"}
          selectedCat={selectedCat}
        />
        <UserCategory
          setVisibleUsers={setVisibleUsers}
          setSelectedCat={setSelectedCat}
          categoryList={production}
          category={"Production"}
          selectedCat={selectedCat}
        />
        <UserCategory
          setVisibleUsers={setVisibleUsers}
          setSelectedCat={setSelectedCat}
          categoryList={soundDesign}
          category={"Sound Design"}
          selectedCat={selectedCat}
        />
        <UserCategory
          setVisibleUsers={setVisibleUsers}
          setSelectedCat={setSelectedCat}
          categoryList={music}
          category={"Music"}
          selectedCat={selectedCat}
        />
        <UserCategory
          setVisibleUsers={setVisibleUsers}
          setSelectedCat={setSelectedCat}
          categoryList={dialogue}
          category={"Dialogue"}
          selectedCat={selectedCat}
        />
      </div>
      <div
        ref={parent}
        style={{
          display: "flex",
          flexFlow: "row wrap",
          paddingLeft: "15%",
          paddingRight: "15%",
        }}
      >
        {selectedUser == null ? (
          visibleUsers.map((user) => (
            <ProfilePic
              key={user.name}
              name={user.name}
              title={user.title}
              setSelectedUser={setSelectedUser}
            />
          ))
        ) : (
          <ProfilePic
            key={selectedUser.name}
            name={selectedUser.name}
            title={selectedUser.title}
          />
          // <p>{selectedUser.bio}</p>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
