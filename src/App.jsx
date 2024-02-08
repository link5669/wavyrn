import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WavNavbar from "./components/Navbar";
import Jobs from "./components/Jobs";
import { Container, Form, Row } from "react-bootstrap";
import SelectBoxes from "./components/SelectBoxes";

function App() {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <WavNavbar />
      <Jobs selected={selected} />
      <SelectBoxes selected={selected} setSelected={setSelected} style={{paddingTop: '1%'}}/>
    </>
  );
}

export default App;
