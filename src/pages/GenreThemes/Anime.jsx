import "../../index.css";
const animeAudioData = [
  {
    title: "Bang",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Sound%20Effects/Bang.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Crumble",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Sound%20Effects/Crumble.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Disappear",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Sound%20Effects/Disappear.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Freeze",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Sound%20Effects/Freeze.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Hiss",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Sound%20Effects/Hiss.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Klang",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Sound%20Effects/Klang.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Pew",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Sound%20Effects/Pew.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Pow",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Sound%20Effects/Pow.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Shimmer",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Sound%20Effects/Shimmer.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&dl=0",
    ],
  },
  {
    title: "Shing",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Sound%20Effects/Shing.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Splosh",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h?rlkey=rgp43tzu84ovmy10j9gni62q5&dl=0",
    ],
  },
  {
    title: "Swoosh",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Sound%20Effects/Swoosh.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Whoop",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Sound%20Effects/Whoop.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Zap",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Sound%20Effects/Zap.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
];

const animeAlbumData = [
  {
    id: 1,
    title: "Ordinary Student Life",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Music/ARNC%20Arena%20Crunch/ARNC%20Album%20Cover.jpg?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Music/ARNC%20Arena%20Crunch/ARNC%20T02v1%202.%20Ordinary%20Student%20Life.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 2,
    title: "Notice Me, Accounting Senpai",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Music/ARNC%20Arena%20Crunch/ARNC%20Album%20Cover.jpg?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Music/ARNC%20Arena%20Crunch/ARNC%20T03v1%203.%20Notice%20Me%2C%20Accounting%20Senpai.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 3,
    title: "Tekha (Instrumental)",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Music/ATAS-TEKHA%20Across%20the%20Astral%20Sea%20-%20Tekha/ATAS-TEKHA%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Music/ATAS-TEKHA%20Across%20the%20Astral%20Sea%20-%20Tekha/TEKHA%20T02%20Tekha%20(Instrumental).wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 4,
    title: "Indigo Nights",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Music/BTND%20Beat%20Tender/BTND%20Album%20Cover.jpg?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Music/BTND%20Beat%20Tender/Track%20%232%20-%20%22Indigo%20Nights%22.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 5,
    title: "Gladwell",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Music/GLAD%20Gladwell/GLAD%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Music/GLAD%20Gladwell/GLAD-MX%20M04v2%20160BPM.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 6,
    title: "Gladwell",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Music/GLAD%20Gladwell/GLAD%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Music/GLAD%20Gladwell/GLAD-OP%20Full.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
];

const animeContainerStyle = {
  backgroundImage: `url(/src/pages/GenreThemes/animebg.png)`,
  backgroundColor: "#40613A",
  backgroundSize: "cover",
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  // backgroundAttachment: "fixed",
};
const animeHeaderStyle = {
  fontFamily: "Otomanopee",
  backgroundColor: "#F18F90",
  height: "16vh",
  color: "#FFFFFF",
  marginLeft: "20vw",
  marginRight: "20vw",
};
const animeTitleStyle = {
  fontSize: "15vh",
};
const animeButtonStyle = {
  backgroundColor: "#FFFFFF",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "15px",
  cursor: "pointer",
};
const animeSubheadStyle = { fontFamily: "Montserrat", color: "#000000" };
const animeWrapperStyle = {
  position: "relative",
  width: "70%",
  margin: "0 auto",
  backgroundColor: "#FFEBEB", // translucent white
  padding: "20px",
  // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  minHeight: "100vh",
};

const animeDividerStyle = {
  color: "#000000",
  // border: "none",
  height: "3px",
};

const animeLeftImage =
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/_Gloria.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";
const animeLeftAudioFiles = [
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.01.Introduction.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.05.Happy2.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.06.Praise.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.15.Taunt1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.21.Disappointment.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.22C.Annoyed.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.25C.CommandDefense.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.26.No1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.27.No2.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.28A.HurtLight.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.36.LaughSmall.2.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.36.LaughSmall.3.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.36.LaughSmall.4.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.39.Cheer.3.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.40.Grunt.1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ARNC%20Arena%20Crunch/DND-NRS-02.VO.GloriaThePriest.41.Hmm.1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
];

const animeRightImage =
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Anime%20and%20JRPGs/Voiceover/ATAS-TEKHA%20Across%20the%20Astral%20Sea%20-%20Tekha/_Tekha.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";
const animeRightAudioFiles = [""];

const animeVoiceoverData = {
  leftImage: animeLeftImage,
  leftAudioFiles: animeLeftAudioFiles,
  rightImage: animeRightImage,
  rightAudioFiles: animeRightAudioFiles,
};

export {
  animeAudioData,
  animeHeaderStyle,
  animeSubheadStyle,
  animeTitleStyle,
  animeContainerStyle,
  animeButtonStyle,
  animeWrapperStyle,
  animeDividerStyle,
  animeAlbumData,
  animeVoiceoverData,
};
