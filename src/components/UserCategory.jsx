import { useEffect } from "react";

const UserCategory = ({
  setVisibleUsers,
  setSelectedCat,
  categoryList,
  category,
  selectedCat,
}) => {
  return (
    <p
      onClick={() => {
        setVisibleUsers(categoryList);
        setSelectedCat(category);
      }}
      style={{
        paddingRight:  "1em",
        paddingLeft:  "1em",
        color: selectedCat == category ? "red" : "black",
        textDecoration: selectedCat == category ? "underline" : "none",
      }}
    >
      {category}
    </p>
  );
};

export default UserCategory;
