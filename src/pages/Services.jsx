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
  const [expanded, setExpanded] = useState(-1);

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
      }, 10);
    }
  }, [selected]);

  useEffect(() => {
    updateFooterMargin();
  }, [isMobile]);

  const updateFooterMargin = () => {
    // const selectedService = serviceRefs.current[selected];
    // if (selectedService && footerRef.current) {
    //   const footerHeight = footerRef.current.offsetHeight;
    //   footerRef.current.style.marginTop = `${selectedService.offsetHeight}px`;
    //   // document.body.style.paddingBottom = `${footerHeight}px`;
    // }
  };

  return (
    <>
      <div
        style={{
          minHeight: "87vh",
        }}
      >
        {isMobile ? (
          <>
            <ExpandableHeading
              title="Audio Directing"
              subtitle={"Project Management & Coordination"}
              bg={"url('/images/Services_AudioDirecting.jpg?url')"}
              isMobile={isMobile}
              body={<AudioDirecting isMobile={isMobile} />}
              onClick={() => setExpanded(0)}
              expanded={expanded}
              index={0}
            />
            <ExpandableHeading
              title="Production"
              subtitle={"Mixing, Mastering, & Music Editing"}
              bg={"url('/images/Services_Production.png?url')"}
              isMobile={isMobile}
              body={<Production isMobile={isMobile} />}
              onClick={() => setExpanded(1)}
              expanded={expanded}
              index={1}
            />
            <ExpandableHeading
              title="Sound Design"
              subtitle={"Sound Effects, Ambiences, Foley, & Sonic Branding"}
              bg={"url('/images/Services_SoundDesign.jpg?url')"}
              isMobile={isMobile}
              body={<SoundDesign isMobile={isMobile} />}
              onClick={() => setExpanded(2)}
              expanded={expanded}
              index={2}
            />
            <ExpandableHeading
              title="Music"
              subtitle={"Film, Games, Theme Parks, & Interactive Media"}
              bg={"url('/images/Services_Music.png?url')"}
              isMobile={isMobile}
              body={<Music isMobile={isMobile} />}
              onClick={() => setExpanded(3)}
              expanded={expanded}
              index={3}
            />
            <ExpandableHeading
              title="Voice Acting"
              subtitle={"Writing, Casting & Editing"}
              bg={"url('/images/Services_Dialogue.jpg?url')"}
              isMobile={isMobile}
              body={<Dialogue isMobile={isMobile} />}
              onClick={() => setExpanded(4)}
              expanded={expanded}
              index={4}
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
          </>
        )}
      </div>
      <div ref={footerRef} style={{ backgroundColor: "black", height: "50px" }}>
        <p
          style={{
            color: "white",
            textAlign: "center",
            lineHeight: "50px",
          }}
        >
          ©️2024 Wavyrn • All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default Services;
