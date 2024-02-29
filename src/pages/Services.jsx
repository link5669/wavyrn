import { useState, useEffect, useRef } from "react";
import WavNavbar from "../components/Navbar";
import Jobs from "../components/Jobs";
import SelectBoxes from "../components/SelectBoxes";
import AudioDirecting from "../components/services/AudioDirecting";
import Dialogue from "../components/services/Dialogue";
import Music from "../components/services/Music";
import Production from "../components/services/Production";
import SoundDesign from "../components/services/SoundDesign";
import "./Services.css";

const Services = () => {
  const [selected, setSelected] = useState(0);
  const [prevSelected, setPrevSelected] = useState(-1);
  const serviceRefs = useRef({});
  useEffect(() => {
    const currentServiceRef = serviceRefs.current[selected];
    const previousServiceElement = serviceRefs.current[prevSelected];

    if (previousServiceElement) {
      return;
    }

    if (previousServiceElement) {
      previousServiceElement.classList.add("exiting");

      setTimeout(() => {
        previousServiceElement.classList.remove("exiting");
      }, 500); // Adjust delay based on animation duration
    }

    if (currentServiceRef) {
      currentServiceRef.classList.add("entering");
      setTimeout(() => {
        currentServiceRef.classList.remove("entering");
      }, 550); // Slightly longer delay for entering
    }

    setPrevSelected(selected); // Update prevSelected after animation
  }, [selected, prevSelected]);

  return (
    <>
      <div style={{ minHeight: "100vh", height: "fit-content" }}>
        <Jobs selected={selected} setSelected={setSelected} />
        <SelectBoxes
          selected={selected}
          setSelected={setSelected}
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
      </div>
      <div
        style={{
          backgroundColor: "black",
          height: "50px",
        }}
      >
        <p style={{ color: "white", textAlign: "center", lineHeight: "50px" }}>
          ©️2024 .wavyrn • All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default Services;
