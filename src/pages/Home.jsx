import WavNavbar from "../components/Navbar";

const Home = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <WavNavbar />
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

export default Home;
