import { useState } from "react";
import WavNavbar from "../components/Navbar";
import Jobs from "../components/Jobs";
import SelectBoxes from "../components/SelectBoxes";
import AudioDirecting from "../components/Services/AudioDirecting";
import Dialogue from "../components/Services/Dialogue";
import Music from "../components/Services/Music";
import Production from "../components/Services/Production";
import SoundDesign from "../components/Services/SoundDesign";

const Services = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div style={{ minHeight: "100vh" }}>
      <WavNavbar />
      <Jobs selected={selected} />
      <SelectBoxes
        selected={selected}
        setSelected={setSelected}
        style={{ paddingTop: "1%", paddingBottom: "1%" }}
      />
      {selected === 0 && <AudioDirecting />}
      {selected === 1 && <Production />}
      {selected === 2 && <SoundDesign />}
      {selected === 3 && <Music />}
      {selected === 4 && <Dialogue />}
    </div>
  );
};

export default Services;
