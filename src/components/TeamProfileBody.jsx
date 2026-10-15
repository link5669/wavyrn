import { Col, Row } from "react-bootstrap";
import { Player } from "react-simple-player";
import { getEmbedInfo } from "../utilities/embeds";
import { toDirectDropboxUrl } from "../utilities/dropbox";

const captionStyle = { fontSize: ".8em", margin: "0 0 4px" };

// Consecutive media items of the same type are laid out together (an image row, an audio grid)
const groupMedia = (media) => {
  const groups = [];
  for (const item of media) {
    const last = groups[groups.length - 1];
    if (last && last.type === item.type && (item.type === "image" || item.type === "audio")) {
      last.items.push(item);
    } else {
      groups.push({ type: item.type, items: [item] });
    }
  }
  return groups;
};

const ImageRow = ({ items }) => {
  const perRow = Math.min(items.length, 4);
  return (
    <Row style={{ margin: "16px 0", rowGap: "12px" }}>
      {items.map((item, i) => (
        <Col key={i} style={{ maxWidth: `${100 / perRow}%`, flexBasis: `${100 / perRow}%` }}>
          <img style={{ width: "100%" }} src={toDirectDropboxUrl(item.url)} alt={item.title || ""} />
        </Col>
      ))}
    </Row>
  );
};

const AudioGrid = ({ items, isMobile }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "16px",
      margin: "16px 0",
    }}
  >
    {items.map((item, i) => (
      <div key={i}>
        {item.title && <p style={captionStyle}>{item.title}</p>}
        <Player grey={[206, 0, 54]} accent={[255, 0, 0]} src={toDirectDropboxUrl(item.url)} height={30} />
      </div>
    ))}
  </div>
);

const Video = ({ item }) => (
  <div style={{ margin: "16px 0" }}>
    {item.title && <p style={captionStyle}>{item.title}</p>}
    <video
      style={{ display: "block", margin: "auto", width: "100%", maxWidth: "750px" }}
      src={toDirectDropboxUrl(item.url)}
      controls
      playsInline
      preload="metadata"
      controlsList="nodownload noplaybackrate noremoteplayback"
      disablePictureInPicture
      onContextMenu={(e) => e.preventDefault()}
    />
  </div>
);

// YouTube, Spotify or SoundCloud player, using each service's embed attributes
const Embed = ({ item }) => {
  const info = getEmbedInfo(item.url);
  if (!info) return null;
  const iframe = (
    <iframe
      src={info.src}
      title={info.title}
      allow={info.allow}
      allowFullScreen
      loading="lazy"
      frameBorder="0"
      scrolling="no"
      style={
        info.aspectRatio
          ? { width: "100%", aspectRatio: info.aspectRatio, border: 0 }
          : { width: "100%", height: info.height, border: 0, borderRadius: info.borderRadius }
      }
    />
  );
  return (
    <div style={{ margin: "16px 0" }}>
      {iframe}
      {item.title && <p style={{ fontSize: "10px", color: "#cccccc", margin: "2px 0 0" }}>{item.title}</p>}
    </div>
  );
};

// Bio and media shown in a team member's overlay
const TeamProfileBody = ({ profile, isMobile }) => {
  const paragraphs = (profile.bio || "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <div style={{ display: "block" }}>
      {paragraphs.map((text, i) => (
        <p key={i} style={{ whiteSpace: "pre-line" }}>{text}</p>
      ))}
      {groupMedia(profile.media || []).map((group, i) => {
        if (group.type === "image") return <ImageRow key={i} items={group.items} />;
        if (group.type === "audio") return <AudioGrid key={i} items={group.items} isMobile={isMobile} />;
        if (group.type === "video") return <Video key={i} item={group.items[0]} />;
        return <Embed key={i} item={group.items[0]} />;
      })}
    </div>
  );
};

export default TeamProfileBody;
