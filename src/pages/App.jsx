import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import { useState, useEffect } from "react";
import Services from "./Services";
import Portfolio from "./Portfolio";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import WavNavbar from "../components/Navbar";
import ZoomRedirect from "./ZoomRedirect";
import DiscordRedirect from "./Discord";
import Blog from "./blog/blog";
import Post from "./blog/post";
import ScrollToTop from "../components/ScrollToTop";
import GeneralUseRedirect from "./GeneralUseRedirect";
import PatreonRedirect from "./PatreonCatalogRedirect";

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
        <ScrollToTop>
          <WavNavbar isMobile={isMobile} />
          <Routes>
            <Route path="/" element={<Home isMobile={isMobile} />} />

            {/* subpages */}
            <Route path="/services" element={<Services isMobile={isMobile} />} />
            <Route path="/portfolio" element={<Portfolio isMobile={isMobile} />} />
            <Route path="/about-us" element={<AboutUs animate={false} isMobile={isMobile} />} />
            <Route path="/contact" element={<Contact isMobile={isMobile} />} />
            <Route path="/blog" element={<Blog isMobile={isMobile} />} />

            {/* blog pages */}
            <Route path="/blog/240811-the-sound-design-of-delta-emblock" element={<Post isMobile={isMobile} />} />

            {/* redirects */}
            <Route path="/zoom" element={<ZoomRedirect />} />
            <Route path="/discord" element={<DiscordRedirect />} />
            <Route path="/GeneralUse" element={<GeneralUseRedirect />} />
            <Route path="/PatreonCatalogue" element={<PatreonRedirect />} />

          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
