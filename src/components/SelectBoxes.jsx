import { useState } from "react";

const SelectBoxes = ({style, selected, setSelected}) => {
  
  return (
    <div style={style}>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <div onClick={() => setSelected(0)}
          style={{
            height: "20px",
            marginRight: "10px",
            width: "20px",
            border: "2px solid black",
            backgroundColor: selected == 0 ? "red" : "white",
          }}
        ></div>
        <div onClick={() => setSelected(1)}
          style={{
            height: "20px",
            marginRight: "10px",
            width: "20px",
            border: "2px solid black",
            backgroundColor: selected == 1 ? "red" : "white",
          }}
        ></div>
        <div onClick={() => setSelected(2)}
          style={{
            height: "20px",
            marginRight: "10px",
            width: "20px",
            border: "2px solid black",
            backgroundColor: selected == 2 ? "red" : "white",
          }}
        ></div>
        <div onClick={() => setSelected(3)}
          style={{
            height: "20px",
            marginRight: "10px",
            width: "20px",
            border: "2px solid black",
            backgroundColor: selected == 3 ? "red" : "white",
          }}
        ></div>
        <div onClick={() => setSelected(4)}
          style={{
            height: "20px",
            marginRight: "10px",
            width: "20px",
            border: "2px solid black",
            backgroundColor: selected == 4 ? "red" : "white",
          }}
        ></div>
      </div>
    </div>
  );
};

export default SelectBoxes;
