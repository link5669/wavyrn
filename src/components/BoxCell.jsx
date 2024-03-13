import { useEffect, useState } from "react";

const BoxCell = ({
  title,
  subtitle,
  selected,
  imageName,
  isUnderlined,
  onMouseOver,
}) => {
  const [scale, setScale] = useState(100);
const [underlineAnimation, setUnderlineAnimation] = useState(false);

  // useEffect(() => {
  //   setUnderlineAnimation(selected);
  // },[selected])

  // const handleMouseOver = () => {
  //   setUnderlineAnimation(true);
  // };

  // const handleMouseOut = () => {
  //   setUnderlineAnimation(false);
  // };

  const underlineStyle = {
    textDecoration: "none",
    background: `linear-gradient(currentColor, currentColor) bottom / 0 0.1em no-repeat`,
    transition: "1s background-size",
    backgroundSize: isUnderlined ? "100% 0.1em" : "0% 0.1em",
    marginTop: "0px",
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/" + imageName + "?url')",
        backgroundSize: `${scale}%`,
        transition: '0.4s',
        backgroundPosition: 'center'
      }}
      id="animate-area"

      onMouseOver={() => setScale(120)}
      onMouseOut={() => setScale(100)}
    >
      <div style={{ display: "block", textAlign: "center" }}>
        {" "}
        <h2 style={{ marginBottom: "0" }}>{title}</h2>
        <p style={underlineStyle} className="underline-target">
          {subtitle}
        </p>
        <div className="underline"></div>
      </div>
    </div>
  );
};

export default BoxCell;
