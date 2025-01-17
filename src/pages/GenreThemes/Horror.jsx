import "../../index.css";
const horrorAudioData = [
  {
    title: "Acid",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Acid.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Anvil",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Anvil.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Aura",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Aura.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Blast",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Blast.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Bow",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Bow.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Cage",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Cage.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Hiss",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Hiss.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Ignite",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Ignite.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Skitter",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Skitter.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Slice",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Slice.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Spook",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Spook.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Summon",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Summon.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Whir",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Whir.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Whir",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/horror%20and%20RPGs/Sound%20Effects/Whir.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Whisper",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Whisper.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Wob",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Sound%20Effects/Wob.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
];

const horrorAlbumData = [
  {
    id: 1,
    title: "Annie",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Music/ANNIE%20Annie's%20Asylum/ANNIE%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Music/ANNIE%20Annie's%20Asylum/ANNIE%20Delivery_241114%20QTRef%20MX%20ONLY.m4a?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 2,
    title: "Lily",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Music/BXR%20Alistair/BXR%20Album%20Cover.jpg?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Music/BXR%20Alistair/BXR%20T03v1%20M22v5%20Lily.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 3,
    title: "Into the Void Again",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Music/BXR%20Alistair/BXR%20Album%20Cover.jpg?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Music/BXR%20Alistair/BXR%20T05v1%20M02v2%20Into%20the%20Void%20Again.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 4,
    title: "A Bard's Tale",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Music/DND%20Tales%20of%20the%20Plane%20of%20Chaos/DND%20ELM%20Album%20Cover.JPG?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track: "",
  },
  {
    id: 5,
    title: "Here Tate, Gone Tomorrow",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Music/SHP%20Shpilkes/SHP%20Album%20Cover.jpg?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Music/SHP%20Shpilkes/SHP-T03v1%20M03v3%20Here%20Tate%2C%20Gone%20Tomorrow.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 6,
    title: "Shpilkes",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Music/SHP%20Shpilkes/SHP%20Album%20Cover.jpg?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Music/SHP%20Shpilkes/SHP-T05v1%20M05v3%20Shpilkes.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
];

const horrorContainerStyle = {
  backgroundImage: `url(/src/pages/GenreThemes/horrorbg.png)`,
  backgroundColor: "#40613A",
  backgroundSize: "cover",
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  backgroundAttachment: "fixed",
};
const horrorTitleStyle = { fontSize: "12vh" };

const horrorHeaderStyle = {
  fontFamily: "Original Surfer",
  backgroundColor: "#883537",
  height: "15vh",
  color: "#000000",
  marginLeft: "20vw",
  marginRight: "20vw",
};
const horrorButtonStyle = {
  backgroundColor: "#8D7474",
  padding: "10px",
  // border: "1px solid #ccc",
  borderRadius: "15px",
  cursor: "pointer",
};
const horrorSubheadStyle = { fontFamily: "Montserrat", color: "#FFF7E3" };
const horrorWrapperStyle = {
  position: "relative",
  width: "70%",
  margin: "0 auto",
  backgroundColor: "#1C211E", // translucent white
  padding: "20px",
  minHeight: "100vh",
};

const horrorDividerStyle = {
  color: "#C0AE80",
  height: "3px",
};

const horrorLeftImage =
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/ANNIE%20Annie's%20Asylum/_Annie.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";
const horrorLeftAudioFiles = [
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/ANNIE%20Annie's%20Asylum/ANNIE%20VO%20241214%20Line16.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/ANNIE%20Annie's%20Asylum/ANNIE%20VO%20241214%20Line18.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/ANNIE%20Annie's%20Asylum/ANNIE%20VO%20241214%20Line23.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/ANNIE%20Annie's%20Asylum/ANNIE%20VO%20241214%20Line24.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/ANNIE%20Annie's%20Asylum/ANNIE%20VO%20241214%20Line25.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/ANNIE%20Annie's%20Asylum/ANNIE%20VO%20241214%20Line4a.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/ANNIE%20Annie's%20Asylum/ANNIE%20VO%20241214%20Line5.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/ANNIE%20Annie's%20Asylum/ANNIE%20VO%20241214%20Line6.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/ANNIE%20Annie's%20Asylum/ANNIE%20VO%20241215%20Line31.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
];

const horrorRightImage =
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Voiceover/COSMIC%20Cosmic/_Chaser.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";
const horrorRightAudioFiles = [
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Voiceover/COSMIC%20Cosmic/Mob.Banshee.Spawn.1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Voiceover/COSMIC%20Cosmic/Mob.Banshee.Spawn.2.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Voiceover/COSMIC%20Cosmic/Mob.Chaser.Hurt.1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Voiceover/COSMIC%20Cosmic/Mob.Chaser.Hurt.5.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Voiceover/COSMIC%20Cosmic/Mob.Chaser.Run.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Voiceover/COSMIC%20Cosmic/Mob.Chaser.Spawn.1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Horror/Voiceover/COSMIC%20Cosmic/Mob.Chaser.Spawn.2.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
];

const horrorVoiceoverData = {
  leftImage: horrorLeftImage,
  leftAudioFiles: horrorLeftAudioFiles,
  rightImage: horrorRightImage,
  rightAudioFiles: horrorRightAudioFiles,
};

export {
  horrorAudioData,
  horrorHeaderStyle,
  horrorSubheadStyle,
  horrorTitleStyle,
  horrorContainerStyle,
  horrorButtonStyle,
  horrorWrapperStyle,
  horrorDividerStyle,
  horrorAlbumData,
  horrorVoiceoverData,
};
