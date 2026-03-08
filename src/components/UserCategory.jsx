import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

const UserCategory = ({
  setVisibleUsers,
  setSelectedCat,
  categoryList,
  category,
  selectedCat,
  buttonClassName,
  isActive,
}) => {
  const { t } = useTranslation();

  // Map category names to translation keys
  const getCategoryTranslation = (categoryName) => {
    const categoryMap = {
      "All": "team.categories.all",
      "Production": "team.categories.production",
      "Sound Design": "team.categories.soundDesign",
      "Music": "team.categories.music",
      "Voice-Over": "team.categories.voiceover"
    };
    return categoryMap[categoryName] || categoryName;
  };
  const [hovered, setHovered] = useState(false);

  const isSelected = selectedCat === category;
  const baseStyle = !buttonClassName ? {
    paddingRight: "1.5em",
    paddingLeft: "1.5em",
    cursor: "pointer",
    transition: "color 500ms",
    color: isSelected ? "#CE0036" : hovered ? "#A0002A" : "#CE0036",
    textDecoration: isSelected ? "underline" : "none",
    fontWeight: isSelected ? "bold" : "initial",
  } : undefined;

  return (
    <p
      className={buttonClassName ? `${buttonClassName}${isActive ? ` ${buttonClassName}--active` : ''}`.trim() : undefined}
      onClick={() => {
        setVisibleUsers(categoryList);
        setSelectedCat(category);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={baseStyle}
    >
      <b>
      {t(getCategoryTranslation(category))}
      </b>
    </p>
  );
};

export default UserCategory;
