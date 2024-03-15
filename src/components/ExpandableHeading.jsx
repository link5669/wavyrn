import { useState } from "react";
import { Arrow_svg } from "../utilities/svgs";

const ExpandableHeading = ({ title, subtitle, bg, body }) => {
  const [toggled, setToggled] = useState(true);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "19vh",
        backgroundImage: bg,
        backgroundPositionX: "center",
        backgroundPositionY: "bottom",
        backgroundSize: "cover",
      }}
      onClick={() => setToggled(!toggled)}
    >
      <div
        style={{
          paddingLeft: "5px",
          paddingRight: "5px",
          color: "white",
          paddingBottom: toggled ? "3%" : 0,
        }}
      >
        <div style={{ paddingTop: "2%" }}>
          <h2>{title}</h2>
          <p>{subtitle}</p>
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
            transform: `translateY(-80px) ${toggled ? "" : "rotate(180deg)"}`,
          }}
        >
          <Arrow_svg />
        </svg>
        <div style={{ display: toggled ? "none" : "initial" }}>
          <div style={{ paddingBottom: "20px" }}>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandableHeading;
