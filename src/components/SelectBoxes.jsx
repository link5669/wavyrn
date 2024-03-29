import { useState } from "react";

const SelectBoxes = ({ style, selected, setSelected }) => {
  const getStyle = (index) => {
    return {
      height: "15px",
      marginRight: "10px",
      width: "15px",
      border: "2px solid black",
      backgroundColor: selected == index ? "#CE0036" : "white",
      transition: "background-color 0.5s ease",
    };
  };
  return (
    <div style={style}>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <div
          onClick={() => {

            setSelected(0);
          }}
          style={getStyle(0)}
        ></div>
        <div
          onClick={() => {

            setSelected(1);
          }}
          style={getStyle(1)}
        ></div>
        <div
          onClick={() => {
            setSelected(2);
          }}
          style={getStyle(2)}
        ></div>
        <div
          onClick={() => {
            setSelected(3);
          }}
          style={getStyle(3)}
        ></div>
        <div
          onClick={() => {
            setSelected(4);
          }}
          style={getStyle(4)}
        ></div>
      </div>
    </div>
  );
};

export default SelectBoxes;
