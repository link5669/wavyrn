import WavNavbar from "../components/Navbar";
import ProfilePic from "../components/ProfilePic";
import { Container, Col } from "react-bootstrap";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { allUsers, categories } from "../utilities/users";
import UserCategory from "../components/UserCategory";
import { X_svg } from "../utilities/svgs";

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
          <>
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
                >
                  <X_svg />
                </svg>
              </Col>
            </Container>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              pharetra erat leo. Suspendisse nec magna ac massa pellentesque
              mollis. Nullam nec lectus enim. Curabitur dictum justo quis quam
              mollis tempus. Morbi viverra, ligula id porttitor interdum, turpis
              nunc porta dui, eget malesuada augue lacus non sem. Nulla ac
              accumsan justo. Nulla facilisi. Suspendisse potenti. Mauris nec
              tincidunt dui. Nunc semper ac eros ut tincidunt. Mauris vitae
              porttitor diam. Phasellus augue odio, tincidunt vel gravida sit
              amet, egestas non ante. Suspendisse faucibus erat sit amet nisi
              vehicula suscipit. Nullam convallis leo nec nisi interdum
              condimentum. Donec auctor nulla pellentesque, tempor nisl
              lobortis, mollis arcu. Aenean purus tortor, vulputate in lobortis
              vitae, convallis ut sem. Quisque malesuada sit amet nisl sit amet
              tempus. Praesent malesuada magna non metus tristique eleifend.
              Pellentesque imperdiet pulvinar purus. Curabitur et felis quis
              nunc sodales sodales. Vestibulum sodales metus velit, eu pulvinar
              ex malesuada ut. Vivamus dui elit, commodo vitae vehicula quis,
              consectetur at ligula. Etiam accumsan nibh ipsum, a dignissim
              augue efficitur eget. Nunc vehicula dolor leo, pretium sodales
              lorem mollis vel. Cras lorem tortor, ultrices nec euismod eu,
              accumsan at diam. Donec tincidunt lectus ut tortor finibus, a
              sagittis eros maximus. Quisque dolor turpis, commodo ut est
              fermentum, pretium sagittis quam. Nullam euismod ullamcorper nisl
              vel mollis. Suspendisse potenti. Etiam elementum quis est quis
              suscipit.{" "}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
