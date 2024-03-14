import { useState } from "react";

const UserCategory = ({
  setVisibleUsers,
  setSelectedCat,
  categoryList,
  category,
  selectedCat,
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <p
      onClick={() => {
        setVisibleUsers(categoryList);
        setSelectedCat(category);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        paddingRight: "1.5em",
        paddingLeft: "1.5em",
        cursor: 'pointer',
        transition: 'color 500ms',
        color: selectedCat == category || hovered ? "#CE0036" : "black",
        textDecoration: selectedCat == category ? "underline" : "none",
        fontWeight: selectedCat == category ? "bold" : "initial",
      }}
    >
      {category}
    </p>
  );
};

export default UserCategory;
