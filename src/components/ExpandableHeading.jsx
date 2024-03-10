import { useState } from "react";
import { Arrow_svg } from "../utilities/svgs";

const ExpandableHeading = ({ title, subtitle, bg }) => {
  const [toggled, setToggled] = useState(true);
  return (
    <div
      style={{ position: "relative", width: "100%", backgroundImage: bg, backgroundPositionX: 'center',
      backgroundPositionY: 'bottom', backgroundSize: 'auto' }}
      onClick={() => setToggled(!toggled)}
    >
      <div
        style={{
          paddingLeft: "5px",
          paddingRight: "5px",
          color: 'white'
        }}
      >
        <div style={{paddingBlock: '3%'}}>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          convallis ultricies turpis id vestibulum. In sit amet metus id nunc
          hendrerit luctus ut eget orci. Sed hendrerit ante eu ornare ornare.
          Nulla nec lectus at turpis pulvinar blandit sit amet at velit. Proin
          vel metus sapien. Aenean ac tristique neque. Nulla eu fermentum odio,
          vel ullamcorper nisi. Aenean vestibulum lectus nec fermentum molestie.
          Aliquam varius pretium ex, at malesuada ante sodales ac. Sed sit amet
          hendrerit est, a molestie sapien.
        </div>
      </div>
    </div>
  );
};

export default ExpandableHeading;
