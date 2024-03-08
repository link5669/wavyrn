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

  const setSelectedWrapper = (val) => {
    console.log(selected, prevSelected);
    if (selected == prevSelected || val == selected) return;

    const previousServiceElement = serviceRefs.current[selected];
    console.log(val, previousServiceElement, serviceRefs);

    if (previousServiceElement) {
      previousServiceElement.classList.add("exiting");
      console.log(previousServiceElement);
      setTimeout(() => {
        previousServiceElement.classList.remove("exiting");
        setPrevSelected(selected);
        setSelected(val);
      }, 100); // Adjust delay based on animation duration
    }
  };

  useEffect(() => {
    console.log("aksjd");
    if (selected == prevSelected) return;
    const currentServiceRef = serviceRefs.current[selected];

    if (currentServiceRef) {
      currentServiceRef.classList.add("entering");

      setTimeout(() => {
        currentServiceRef.classList.remove("entering");
      }, 10); // Slightly longer delay for entering
    }
  }, [selected]);

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          height: "fit-content",
          overflowX: "hidden",
        }}
      >
        {isMobile ? (
          <>
            <ExpandableHeading
              title="Audio Directing"
              subtitle={"Project Management & Coordination"}
            />
            <ExpandableHeading
              title="Production"
              subtitle={"Mixing, Mastering, & Music Editing"}
            />
            <ExpandableHeading
              title="Sound Design"
              subtitle={"Sound Effects, Ambiences, Foley, & Sonic Branding"}
            />
            <ExpandableHeading
              title="Music"
              subtitle={
                "Film, Games, Theme Parks, Trailers, & Interactive Media"
              }
            />
            <ExpandableHeading
              title="Dialogue"
              subtitle={"Writing, Casting, Editing & Voice Acting"}
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
    </>
  );
};

export default Services;
