import "./ProfilePic.css";
import { getPfpImage } from "../../utilities/utilities";
import { useTranslation } from "../../hooks/useTranslation";

const ProfilePic = ({ name, title, setSelectedUser, isMobile, pfpImage, onClick }) => {
  const { t } = useTranslation();
  const handleClick = () => {
    if (
      name == "Josh Trochet" ||
      name == "Paul Edward May" ||
      name == "Miles Acquaviva"
    )
      return;
    
    // Use the onClick prop if provided, otherwise use the default behavior
    if (onClick) {
      onClick();
    } else {
      setSelectedUser({ name: name, title: title });
    }
  };

  return (
    <div className="profile-pic-container">
      <div className="profile-pic-wrapper" onClick={handleClick}>
        <img
          src={getPfpImage(name)}
          alt={name}
          className="profile-pic-image"
          style={{
            objectPosition: "center",
            transform: name === "Miguel Manness" ? "scale(1.2)" : "none",
            transformOrigin: "center center"
          }}
        />
        <div className="profile-pic-overlay">
          <span className="overlay-text">Learn more...</span>
        </div>
      </div>
      <div className="profile-pic-info">
        <h4 className="profile-pic-name">{t(`team.members.${name}.name`) || name}</h4>
        <p className="profile-pic-title">{t(`team.members.${name}.title`) || title}</p>
      </div>
    </div>
  );
};

export default ProfilePic;