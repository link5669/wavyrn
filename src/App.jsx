import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import { useState, useEffect } from "react";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import WavNavbar from "./components/Navbar";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  return (
    <div>
      <BrowserRouter>
        <WavNavbar isMobile={isMobile}/>
        <Routes>
          <Route path="/" element={<Home isMobile={isMobile}/>} />
          <Route path="/services" element={<Services isMobile={isMobile}/>} />
          <Route path="/portfolio" element={<Portfolio isMobile={isMobile}/>} />
          <Route path="/about-us" element={<AboutUs isMobile={isMobile}/>} />
          <Route path="/contact" element={<Contact isMobile={isMobile}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
