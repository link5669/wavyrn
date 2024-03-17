import { useEffect, useState } from "react";
import { Arrow_svg } from "../utilities/svgs";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const ExpandableHeading = ({ title, bg, body, onClick, expanded, index }) => {
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    if (expanded === index) {
      setToggled(false);
    } else {
      setToggled(true);
    }
  }, [expanded]);

  const onClickFunc = () => {
    console.log(expanded, index);
    if (expanded == index) {
      setToggled(true);
    }
    onClick();
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "8vh",
        backgroundColor: "rgb(67,67,67)",
      }}
      onClick={onClickFunc}
    >
      <div
        style={{
          paddingLeft: "5px",
          paddingRight: "5px",
          color: "white",
          paddingBottom: "3%",
          backgroundImage: bg,
          backgroundPositionX: "center",
          backgroundPositionY: "bottom",
          backgroundSize: "cover",
        }}
      >
        <div style={{ paddingTop: "2%" }}>
          <h1 style={{ textAlign: "left" }}>
            <b>{title}</b>
          </h1>
        </div>
        <svg
          width="16"
          height="16"
          fill="white"
          viewBox="0 0 24 24"
          style={{
            color: "gray",
            marginRight: "10px",
            float: "right",
            transform: `translateY(-40px) ${toggled ? "" : "rotate(180deg)"}`,
          }}
        >
          <Arrow_svg />
        </svg>
      </div>
      <div
        style={{
          display: toggled ? "none" : "initial",
          paddingBottom: toggled ? "20px" : "0px",
          color: "white",
          transition: "opacity ease-in-out 1.5s",
          opacity: !toggled ? 1 : 0,
        }}
        className={!toggled ? "animate" : ""}
      >
        {body}
      </div>
    </div>
  );
};

export default ExpandableHeading;
