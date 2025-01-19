import "../../index.css";
const animationAudioData = [
  {
    title: "Alarm",
    audio: [
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Alarm.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Aura",
    audio:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Aura.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    title: "Blast",
    audio: [
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Blast%201.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Blast%202.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Blast%203.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Bubble",
    audio:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Bubble.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    title: "Clink",
    audio:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Clink.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    title: "Conjure",
    audio:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Conjure.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    title: "Crackle",
    audio:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Crackle.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    title: "Creak",
    audio:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Creak.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    title: "Flip",
    audio:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Flip.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    title: "Lock",
    audio: [
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Lock%201.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Lock%202.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Lock%203.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Scribble",
    audio: [
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Scribble%201.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Scribble%202.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Shimmer",
    audio:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Shimmer.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    title: "Thud",
    audio: [
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Thud%201.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Thud%202.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Thunder",
    audio:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Thunder.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    title: "Whoop",
    audio:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Sound%20Effects/Whoop.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
];

const animationAlbumData = [
  {
    id: 1,
    title: "It Takes A Village",
    coverUrl:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo Reels/Animation/Music/ASTB A Spell to Break/ASTB Album Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Music/ASTB%20A%20Spell%20to%20Break/ASTB-T02v1%20M02%20It%20Takes%20A%20Village.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 2,
    title: "Apocalypse Country",
    coverUrl:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Music/BTRP%20Beach%20Trip!/BTRP%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Music/BTRP%20Beach%20Trip!/BTRP-T06v1%20M06%20Apocalypse%20Country%20(End%20Titles)%20(ft.%20G%20Rockwell).wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 3,
    title: "Like It's A Dream",
    coverUrl:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Music/BWBL%20Broadway%20Blues/BWBL%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Music/BWBL%20Broadway%20Blues/BWBL%20T01v1%20S01%20Like%20It's%20A%20Dream.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 4,
    title: "A Good Day to Pie",
    coverUrl:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Music/CLA%20Claws%20%26%20Order/CLA%20Album%20Cover.jpg?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Music/CLA%20Claws%20%26%20Order/CLA%20T02v1%20M03-M04%20A%20Good%20Day%20To%20Pie.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 5,
    title: "Growth Spurt",
    coverUrl:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Music/SPRT%20Sprout/SPRT%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Music/SPRT%20Sprout/SPRT-T01v1%20M01%20Growth%20Spurt.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 6,
    title: "The Dream Factory",
    coverUrl:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Music/TDF%20The%20Dream%20Factory/TDF%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Music/TDF%20The%20Dream%20Factory/TDF%20Social%20Media%20Preview.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
];

const animationContainerStyle = {
  backgroundImage: `url(/src/pages/GenreThemes/animationbg.png)`,
  backgroundSize: "cover",
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  backgroundAttachment: "fixed",
};
const animationTitleStyle = {
  fontSize: "13vh",
  fontFamily: "Nanum Pen Script",
};

const animationHeaderStyle = {
  backgroundColor: "#FFF6B1",
  height: "100%",
  color: "#436DBB",
  marginLeft: "20vw",
  marginRight: "20vw",
};
const animationButtonStyle = {
  backgroundColor: "#98EE9B",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "15px",
  cursor: "pointer",
};
const animationSubheadStyle = { fontFamily: "Montserrat" };

const animationWrapperStyle = {
  position: "relative",
  width: "70%",
  margin: "0 auto",
  backgroundColor: "rgba(255, 255, 255, 0.8)", // translucent white
  paddingLeft: "20px",
  paddingRight: "20px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  minHeight: "100vh",
};

const animationLeftImage =
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/ANNIE%20Annie's%20Asylum/_Annie.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";

const animationLeftAudioFiles = [
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

const animationRightImage =
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/UPST%20Upstream/_Harvey.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";

const animationRightAudioFiles = [
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/UPST%20Upstream/UPST%20VO%20241121%20Line17.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/UPST%20Upstream/UPST%20VO%20241122%20Line26.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/UPST%20Upstream/UPST%20VO%20241122%20Line28.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/UPST%20Upstream/UPST%20VO%20241122%20Line30.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/UPST%20Upstream/UPST%20VO%20241122%20Line31.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Animation/Voiceover/UPST%20Upstream/UPST%20VO%20241122%20Line32.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
];

const animationVoiceoverData = {
  leftImage: animationLeftImage,
  leftAudioFiles: animationLeftAudioFiles,
  rightImage: animationRightImage,
  rightAudioFiles: animationRightAudioFiles,
};

export {
  animationAudioData,
  animationHeaderStyle,
  animationSubheadStyle,
  animationTitleStyle,
  animationContainerStyle,
  animationButtonStyle,
  animationWrapperStyle,
  animationAlbumData,
  animationVoiceoverData,
};
