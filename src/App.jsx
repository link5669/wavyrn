import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import WavNavbar from "./components/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <WavNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
