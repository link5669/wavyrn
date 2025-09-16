import "./ProfilePic.css";
import { getPfpImage } from "../../utilities/utilities";
import { useTranslation } from "../../hooks/useTranslation";

const ProfilePic = ({ name, title, setSelectedUser, isMobile, pfpImage }) => {
  const { t } = useTranslation();
  const handleClick = () => {
    if (
      name == "Josh Trochet" ||
      name == "Paul Edward May" ||
      name == "Miles Acquaviva"
    )
      return;
    setSelectedUser({ name: name, title: title });
  };

  return (
    <div className="profile-pic-container">
      <div className="profile-pic-wrapper" onClick={handleClick}>
        <img
          src={getPfpImage(name)}
          alt={name}
          className="profile-pic-image"
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