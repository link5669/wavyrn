import "../../index.css";
const arcadeAudioData = [
  {
    title: "Bling",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Bling.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Boing",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Boing.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Coin Gun",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Coin%20Gun.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Dink",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Dink.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Fizzle",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Fizzle.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Plasma",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Plasma.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Punch",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Punch.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Ready",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Ready.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Shatter",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Shatter.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Squeeze",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Squeeze.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Swoosh",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Swoosh.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Tink",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Tink.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Warp Down",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Warp%20Down.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Warp Up",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Sound%20Effects/Warp%20Up.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
];

const arcadeAlbumData = [
  {
    id: 1,
    title: "Afterlife",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Music/AFTL%20Afterlife/AFTL%20Album%20Cover.jpg?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Music/AFTL%20Afterlife/AFTL%20T01v1%20M04v4%20Afterlife%20Redux.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 2,
    title: "Notice Me, Accounting Senpai",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Music/ARNC%20Arena%20Crunch/ARNC%20Album%20Cover.jpg?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Music/ARNC%20Arena%20Crunch/ARNC%20T03v1%203.%20Notice%20Me%2C%20Accounting%20Senpai.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 3,
    title: "Fast 'n' Easy",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Music/BTND%20Beat%20Tender/BTND%20Album%20Cover.jpg?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Music/BTND%20Beat%20Tender/Track%20%234%20-%20%22Fast%20n'%20Easy%22.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 4,
    title: "Main Menu",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Music/COSMIC%20Cosmic/COSMIC%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Music/COSMIC%20Cosmic/Music.MainMenu.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 5,
    title: "Forest Level",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Music/FUGG%20Oh%20Fugg/FUGG%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Music/FUGG%20Oh%20Fugg/Music.Level.Forest.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 6,
    title: "Swaplings",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Music/JPAL%20Swaplings/JPAL%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Music/JPAL%20Swaplings/MX.EDM.Electropop.JPAL.MX-ONLY.SET2-1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
];

const arcadeContainerStyle = {
  // backgroundImage: `url(/src/pages/GenreThemes/arcadebg.png)`,
  backgroundColor: "#000000",
  backgroundSize: "cover",
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  backgroundAttachment: "fixed",
};
const arcadeTitleStyle = { fontSize: "13vh", fontFamily: "Orbitron" };
const arcadeHeaderStyle = {
  backgroundColor: "#F4A02B",
  height: "100%",
  color: "#000000",
  marginLeft: "20vw",
  marginRight: "20vw",
};
const arcadeButtonStyle = {
  backgroundColor: "#98EE9B",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "15px",
  cursor: "pointer",
};
const arcadeSubheadStyle = { fontFamily: "Quicksand", color: "#FFF7E3" };
const arcadeWrapperStyle = {
  position: "relative",
  width: "70%",
  margin: "0 auto",
  backgroundColor: "#1C211E",
  paddingLeft: "20px",
  paddingRight: "20px",
  minHeight: "100vh",
};

const arcadeDividerStyle = {
  color: "#FFFFFF",
  // border: "none",
  height: "3px",
};

const arcadeLeftImage =
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/BARR%20Barrier/_Wizard.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";
const arcadeLeftAudioFiles = [
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/BARR%20Barrier/VOX.DXSpeak.BARR.SET1-1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/BARR%20Barrier/VOX.DXSpeak.BARR.SET1-2.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/BARR%20Barrier/VOX.DXSpeak.BARR.SET1-3.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/BARR%20Barrier/VOX.DXSpeak.BARR.SET1-4.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/BARR%20Barrier/VOX.DXSpeak.BARR.SET1-5.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/BARR%20Barrier/VOX.DXSpeak.BARR.SET2-1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/BARR%20Barrier/VOX.DXSpeak.BARR.SET2-2.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/BARR%20Barrier/VOX.DXSpeak.BARR.SET2-3.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/BARR%20Barrier/VOX.DXSpeak.BARR.SET2-4.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/BARR%20Barrier/VOX.DXSpeak.BARR.SET2-5.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
];

const arcadeRightImage =
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/_Delta%20Emblock.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";
const arcadeRightAudioFiles = [
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.AiAttack.SET1-1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.Attack.SET1-4.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.Attack.SET1-4.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.CastingQ.SET1-1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.Celebrate.SET1-1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.Celebrate.SET1-2.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.EndingBlue.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.EndingRed.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.FirstBloodBlue.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.GameStart.SET1-3.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.Healed.SET1-1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.HeroSelectObserver.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.IntroAgree.SET1-1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.IntroBoast.SET1-1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.IntroQuestionNegative.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.IntroResponseArrogant.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.IntroResponseInsult.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.No.SET1-1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.PingAssistMe.SET1-1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Arcade%20and%20Retro/Voiceover/ROTS-DELTA%20Resurgence%20of%20the%20Storm/VOX.VO.SciFi.EdgyAssassin.ROTS-DELTA.Spec.SET1-3.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
];

const arcadeVoiceoverData = {
  leftImage: arcadeLeftImage,
  leftAudioFiles: arcadeLeftAudioFiles,
  rightImage: arcadeRightImage,
  rightAudioFiles: arcadeRightAudioFiles,
};

export {
  arcadeAudioData,
  arcadeHeaderStyle,
  arcadeSubheadStyle,
  arcadeTitleStyle,
  arcadeContainerStyle,
  arcadeButtonStyle,
  arcadeWrapperStyle,
  arcadeDividerStyle,
  arcadeAlbumData,
  arcadeVoiceoverData,
};
