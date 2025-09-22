import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import MobileHome from "./mobile/Home";
import MobileAbout from "./mobile/About";
import MobilePortfolio from "./mobile/Portfolio";
import MobileContact from "./mobile/Contact";
import "./App.css";
import { useState, useEffect } from "react";
import { LanguageProvider } from "../contexts/LanguageContext";
import Services from "./Services";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import ZoomRedirect from "./ZoomRedirect";
import DiscordRedirect from "./Discord";
import Blog from "./blog/blog";
import MobileBlog from "./mobile/blog/blog";
import Post from "./blog/post";
import MobilePost from "./mobile/blog/post";
import ScrollToTop from "../components/ScrollToTop";
import GeneralUseRedirect from "./GeneralUseRedirect";
import PatreonRedirect from "./PatreonCatalogRedirect";
import NewsletterRedirect from "./NewsletterRedirect";
import ShortUrlRedirect from "../components/ShortUrlRedirect";
import BLOG_PAGES from "./blog/pages";
import MOBILE_BLOG_PAGES from "./mobile/blog/pages";
import GenreTemplate from "./GenreTemplate";
import {
  animationAlbumData,
  animationAudioData,
  animationButtonStyle,
  animationContainerStyle,
  animationHeaderStyle,
  animationSubheadStyle,
  animationTitleStyle,
  animationVoiceoverData,
  animationWrapperStyle,
} from "./GenreThemes/Animation";
import {
  fantasyAlbumData,
  fantasyAudioData,
  fantasyButtonStyle,
  fantasyContainerStyle,
  fantasyDividerStyle,
  fantasyHeaderStyle,
  fantasySubheadStyle,
  fantasyTitleStyle,
  fantasyVoiceoverData,
  fantasyWrapperStyle,
} from "./GenreThemes/Fantasy";
import {
  arcadeAlbumData,
  arcadeAudioData,
  arcadeButtonStyle,
  arcadeContainerStyle,
  arcadeDividerStyle,
  arcadeHeaderStyle,
  arcadeSubheadStyle,
  arcadeTitleStyle,
  arcadeVoiceoverData,
  arcadeWrapperStyle,
} from "./GenreThemes/Arcade";
import {
  horrorAlbumData,
  horrorAudioData,
  horrorButtonStyle,
  horrorContainerStyle,
  horrorDividerStyle,
  horrorHeaderStyle,
  horrorSubheadStyle,
  horrorTitleStyle,
  horrorVoiceoverData,
  horrorWrapperStyle,
} from "./GenreThemes/Horror";
import {
  animeAlbumData,
  animeAudioData,
  animeButtonStyle,
  animeContainerStyle,
  animeDividerStyle,
  animeHeaderStyle,
  animeSubheadStyle,
  animeTitleStyle,
  animeVoiceoverData,
  animeWrapperStyle,
} from "./GenreThemes/Anime";
import Editor from "./Editor/Editor";
import About from "./About";

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
    <BrowserRouter>
      <LanguageProvider>
      <ScrollToTop>
        <Routes>
          <Route
            path="/"
            element={isMobile ? <MobileHome /> : <Home isMobile={isMobile} />}
          />

          {/* Japanese route */}
          <Route
            path="/jp"
            element={isMobile ? <MobileHome /> : <Home isMobile={isMobile} />}
          />

          {/* subpages */}
          <Route path="/services" element={<Services isMobile={isMobile} />} />
          <Route
            path="/portfolio"
            element={
              isMobile ? (
                <MobilePortfolio
                  albums={animationAlbumData}
                  audioData={arcadeAudioData}
                  isMobile={isMobile}
                />
              ) : (
                <Portfolio
                  albums={animationAlbumData}
                  audioData={arcadeAudioData}
                  isMobile={isMobile}
                />
              )
            }
          />
          <Route
            path="/about"
            element={
              isMobile ? (
                <MobileAbout isMobile={isMobile} />
              ) : (
                <About animate={false} isMobile={isMobile} />
              )
            }
          />
          <Route
            path="/contact"
            element={
              isMobile ? (
                <MobileContact isMobile={isMobile} />
              ) : (
                <Contact isMobile={isMobile} />
              )
            }
          />
          <Route
            path="/blog"
            element={
              isMobile ? (
                <MobileBlog isMobile={isMobile} />
              ) : (
                <Blog isMobile={isMobile} />
              )
            }
          />
          <Route
            path="/genres/animation"
            element={
              <GenreTemplate
                title="ANIMATION"
                audioData={animationAudioData}
                albums={animationAlbumData}
                containerStyle={animationContainerStyle}
                headerStyle={animationHeaderStyle}
                titleStyle={animationTitleStyle}
                subheadStyle={animationSubheadStyle}
                buttonStyle={animationButtonStyle}
                contentWrapperStyle={animationWrapperStyle}
                voiceoverData={animationVoiceoverData}
                isMobile={isMobile}
              />
            }
          />
          <Route
            path="/genres/fantasy"
            element={
              <GenreTemplate
                title="FANTASY"
                audioData={fantasyAudioData}
                albums={fantasyAlbumData}
                containerStyle={fantasyContainerStyle}
                headerStyle={fantasyHeaderStyle}
                subheadStyle={fantasySubheadStyle}
                titleStyle={fantasyTitleStyle}
                buttonStyle={fantasyButtonStyle}
                contentWrapperStyle={fantasyWrapperStyle}
                dividerStyle={fantasyDividerStyle}
                voiceoverData={fantasyVoiceoverData}
                isMobile={isMobile}
              />
            }
          />

          <Route
            path="/genres/arcade"
            element={
              <GenreTemplate
                title="Arcade"
                audioData={arcadeAudioData}
                albums={arcadeAlbumData}
                containerStyle={arcadeContainerStyle}
                titleStyle={arcadeTitleStyle}
                headerStyle={arcadeHeaderStyle}
                subheadStyle={arcadeSubheadStyle}
                buttonStyle={arcadeButtonStyle}
                contentWrapperStyle={arcadeWrapperStyle}
                dividerStyle={arcadeDividerStyle}
                voiceoverData={arcadeVoiceoverData}
                isMobile={isMobile}
              />
            }
          />
          <Route
            path="/genres/horror"
            element={
              <GenreTemplate
                title="HORROR"
                audioData={horrorAudioData}
                albums={horrorAlbumData}
                containerStyle={horrorContainerStyle}
                headerStyle={horrorHeaderStyle}
                titleStyle={horrorTitleStyle}
                subheadStyle={horrorSubheadStyle}
                buttonStyle={horrorButtonStyle}
                contentWrapperStyle={horrorWrapperStyle}
                dividerStyle={horrorDividerStyle}
                voiceoverData={horrorVoiceoverData}
                isMobile={isMobile}
              />
            }
          />
          <Route
            path="/genres/anime"
            element={
              <GenreTemplate
                title="Anime"
                audioData={animeAudioData}
                albums={animeAlbumData}
                containerStyle={animeContainerStyle}
                headerStyle={animeHeaderStyle}
                titleStyle={animeTitleStyle}
                subheadStyle={animeSubheadStyle}
                buttonStyle={animeButtonStyle}
                contentWrapperStyle={animeWrapperStyle}
                dividerStyle={animeDividerStyle}
                voiceoverData={animeVoiceoverData}
                isMobile={isMobile}
              />
            }
          />

          {/* Dynamic blog posts by slug or docId */}
          <Route
            path="/blog/:identifier"
            element={
              isMobile ? (
                <MobilePost isMobile={isMobile} />
              ) : (
                <Post isMobile={isMobile} />
              )
            }
          />

          {/* Legacy blog pages */}
          {!isMobile ? BLOG_PAGES.map((e) => (
            <Route
              path={e.path}
              key={e.title}
              element={
                <Post e={e} isMobile={isMobile} />
              }
            />
          )) : MOBILE_BLOG_PAGES.map((e) => (
            <Route
              path={e.path}
              key={e.title}
              element={<MobilePost e={e} isMobile={isMobile} />}
            />
          ))}

          {/* redirects */}
          <Route path="/zoom" element={<ZoomRedirect />} />
          <Route path="/discord" element={<DiscordRedirect />} />
          <Route path="/newsletter" element={<NewsletterRedirect />} />
          <Route path="/GeneralUse" element={<GeneralUseRedirect />} />
          <Route path="/PatreonCatalogue" element={<PatreonRedirect />} />
          <Route path="/editor" element={<Editor />} />
          
          {/* Catch-all route for potential short URLs at root level */}
          <Route path="/:slug" element={<ShortUrlRedirect />} />
        </Routes>
      </ScrollToTop>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
