import { useState, useEffect, useRef } from "react";
import Jobs from "../components/Jobs";
import SelectBoxes from "../components/SelectBoxes";
import AudioDirecting from "../components/services/AudioDirecting";
import Dialogue from "../components/services/Dialogue";
import Music from "../components/services/Music";
import Production from "../components/services/Production";
import SoundDesign from "../components/services/SoundDesign";
import "./Services.css";
import ExpandableHeading from "../components/ExpandableHeading";

const Services = ({ isMobile }) => {
  const [selected, setSelected] = useState(0);
  const [prevSelected, setPrevSelected] = useState(-1);
  const serviceRefs = useRef({});
  const footerRef = useRef(null);

  const setSelectedWrapper = (val) => {
    if (selected === prevSelected || val === selected) return;

    const previousServiceElement = serviceRefs.current[selected];
    if (previousServiceElement) {
      previousServiceElement.classList.add("exiting");
      setTimeout(() => {
        previousServiceElement.classList.remove("exiting");
        setPrevSelected(selected);
        setSelected(val);
      }, 100);
    }
  };

  useEffect(() => {
    const currentServiceRef = serviceRefs.current[selected];
    if (currentServiceRef) {
      currentServiceRef.classList.add("entering");

      setTimeout(() => {
        currentServiceRef.classList.remove("entering");
        updateFooterMargin();
      }, 10); // Slightly longer delay for entering
    }
  }, [selected]);

  useEffect(() => {
    updateFooterMargin();
  }, [isMobile]);

  const updateFooterMargin = () => {
    const selectedService = serviceRefs.current[selected];
    if (selectedService && footerRef.current) {
      const footerHeight = footerRef.current.offsetHeight;
      footerRef.current.style.marginTop = `${selectedService.offsetHeight}px`;
      // document.body.style.paddingBottom = `${footerHeight}px`;
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          height: "fit-content",
        }}
      >
        {isMobile ? (
          <>
            <ExpandableHeading
              title="Audio Directing"
              subtitle={"Project Management & Coordination"}
              bg={"url('/images/Services_AudioDirecting.jpg?url')"}
            />
            <ExpandableHeading
              title="Production"
              subtitle={"Mixing, Mastering, & Music Editing"}
              bg={"url('/images/Services_Production.png?url')"}
            />
            <ExpandableHeading
              title="Sound Design"
              subtitle={"Sound Effects, Ambiences, Foley, & Sonic Branding"}
              bg={"url('/images/Services_SoundDesign.jpg?url')"}
            />
            <ExpandableHeading
              title="Music"
              subtitle={"Film, Games, Theme Parks, & Interactive Media"}
              bg={"url('/images/Services_Music.png?url')"}
            />
            <ExpandableHeading
              title="Dialogue"
              subtitle={"Writing, Casting, Editing & Voice Acting"}
              bg={"url('/images/Services_Dialogue.jpg?url')"}
            />
          </>
        ) : (
          <>
            <Jobs selected={selected} setSelected={setSelectedWrapper} />
            <SelectBoxes
              selected={selected}
              setSelected={setSelectedWrapper}
              style={{ paddingTop: "1%", paddingBottom: "1%" }}
            />
            <div className="services-wrapper">
              {selected === 0 && (
                <span ref={(e) => (serviceRefs.current[0] = e)}>
                  <AudioDirecting data-selected={0} />
                </span>
              )}
              {selected === 1 && (
                <span ref={(e) => (serviceRefs.current[1] = e)}>
                  <Production data-selected={1} />
                </span>
              )}
              {selected === 2 && (
                <span ref={(e) => (serviceRefs.current[2] = e)}>
                  <SoundDesign data-selected={2} />
                </span>
              )}
              {selected === 3 && (
                <span ref={(e) => (serviceRefs.current[3] = e)}>
                  <Music data-selected={3} />
                </span>
              )}
              {selected === 4 && (
                <span ref={(e) => (serviceRefs.current[4] = e)}>
                  <Dialogue data-selected={4} />
                </span>
              )}
            </div>
            <div ref={footerRef} style={{backgroundColor: "black",
                height: "50px"}}>
              <p style={{
                  color: "white",
                  textAlign: "center",
                  lineHeight: "50px",
                }}>©️2024 .wavyrn • All Rights Reserved</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Services;
