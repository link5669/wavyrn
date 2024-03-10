import bg from '../../public/images/Home.png'

const Home = ({ isMobile }) => {
  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <img
          src={bg}
          style={{ width: "100%", paddingBottom: "2%" }}
        />
        <h1
          style={{
            zIndex: 200,
            position: "absolute",
            top: isMobile ? "17vh" : "45vh",
            paddingLeft: "5%",
            fontSize: isMobile ? "1.6em" : "4.7em",
            color: "white",
            textAlign: "left",
            fontWeight: "SemiBold",
          }}
        >
          Audio made <span style={{fontStyle: 'italic'}}>fantastic.</span> <br />
          <span style={{ fontSize: ".7em", fontWeight: "lighter" }}>
            <i>Learn more</i> ⟶
          </span>
        </h1>
        <h2 style={{textAlign: 'center'}}>Who are we?</h2>
        <p style={{padding: '2%'}}>
          Wavyrn Audio is an audio studio based out of lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Integer convallis ultricies turpis
          id vestibulum. In sit amet metus id nunc hendrerit luctus ut eget
          orci. Sed hendrerit ante eu ornare ornare. Nulla nec lectus at turpis
          pulvinar blandit sit amet at velit. Proin vel metus sapien. Aenean ac
          tristique neque. Nulla eu fermentum odio, vel ullamcorper nisi. Aenean
          vestibulum lectus nec fermentum molestie. Aliquam varius pretium ex,
          at malesuada ante sodales ac. Sed sit amet hendrerit est, a molestie
          sapien.
        </p>
      </div>
      <footer
        style={{
          backgroundColor: "black",
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
    </>
  );
};

export default Home;
