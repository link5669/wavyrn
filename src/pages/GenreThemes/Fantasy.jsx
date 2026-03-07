import "../../index.css";
const fantasyAudioData = [
  {
    title: "Arrow",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Arrow.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Blast",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Blast.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Blight",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Blight.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Blink",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Blink.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Cage",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Cage.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Cluster",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Cluster.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Firebolt",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Firebolt.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Fwoom",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Fwoom.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Heal",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Heal.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Pew",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Pew.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Plasma",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Plasma.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Thornwhip",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Thornwhip.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Thunk",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Thunk.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Whir",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Whir.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
  {
    title: "Whisper",
    audio: [
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Sound%20Effects/Whisper.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    ],
  },
];

const fantasyAlbumData = [
  {
    id: 1,
    title: "Ye Olde Adventure Quest",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Music/CLA%20Claws%20%26%20Order/CLA%20Album%20Cover.jpg?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Music/CLA%20Claws%20%26%20Order/CLA%20T03v1%20M05-M06%20Ye%20Olde%20Adventure%20Quest.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 2,
    title: "The Wild Hunt",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Music/DND%20Tales%20of%20the%20Norse/DND%20NRS%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Music/DND%20Tales%20of%20the%20Norse/Music.Norse.TheWildHunt.Original._FULL.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 3,
    title: "The High One",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Music/DND%20Tales%20of%20the%20Norse/DND%20NRS%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Music/DND%20Tales%20of%20the%20Norse/Music.Norse.WordsOfTheHighOne.Original._FULL.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 4,
    title: "Epic Fantasy Adventure",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Music/DND%20Tales%20of%20the%20Plane%20of%20Chaos/DND%20ELM%20Album%20Cover.JPG?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Music/DND%20Tales%20of%20the%20Plane%20of%20Chaos/7.%20How%20To%20Train%20Your%20Dragon%20(Re-Score%20%3A%20Epic%20Fantasy%20Adventure).mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 5,
    title: "Forest Level",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Music/FUGG%20Oh%20Fugg/FUGG%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Music/FUGG%20Oh%20Fugg/Music.Level.Forest.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
  {
    id: 6,
    title: "Resurgence of the Storm",
    coverUrl:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Music/ROTS%20Resurgence%20of%20the%20Storm/ROTS%20Album%20Cover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
    track:
      "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Music/ROTS%20Resurgence%20of%20the%20Storm/ROTS_MT_MASTER_REEL%20EDIT%2003_TAIL.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  },
];

const fantasyContainerStyle = {
  // backgroundImage: `url(/src/pages/GenreThemes/fantasybg.png)`,
  backgroundColor: "#40613A",
  backgroundSize: "cover",
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  backgroundAttachment: "fixed",
};
const fantasyTitleStyle = { fontSize: "12vh", fontFamily: "Namdhinggo" };

const fantasyHeaderStyle = {
  backgroundColor: "#40613A",
  height: "100%",
  color: "#FBAE43",
  marginLeft: "20vw",
  marginRight: "20vw",
};
const fantasyButtonStyle = {
  backgroundColor: "#98EE9B",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "15px",
  cursor: "pointer",
};
const fantasySubheadStyle = { fontFamily: "Quicksand", color: "#FFF7E3" };
const fantasyWrapperStyle = {
  position: "relative",
  width: "70%",
  margin: "0 auto",
  backgroundColor: "#1C211E", // translucent white
  paddingLeft: "20px",
  paddingRight: "20px", // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  minHeight: "100vh",
};

const fantasyDividerStyle = {
  color: "#C0AE80",
  // border: "none",
  height: "3px",
};

const fantasyLeftImage =
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/_Einar.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";
const fantasyLeftAudioFiles = [
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VO.EinarTheBartender.Advice1.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VO.EinarTheBartender.CommandDefense.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VO.EinarTheBartender.CommandOffense.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VO.EinarTheBartender.Hello0.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VO.EinarTheBartender.No.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VO.EinarTheBartender.Retreat.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VO.EinarTheBartender.Sad.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VO.EinarTheBartender.Taunt1.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VO.EinarTheBartender.Thanks1.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VO.EinarTheBartender.Yes1.mp3?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VOX.EinarTheSuaveBartender.AttackHeavy1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VOX.EinarTheSuaveBartender.Cheer1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VOX.EinarTheSuaveBartender.Death1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VOX.EinarTheSuaveBartender.Hmm1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VOX.EinarTheSuaveBartender.LaughBig1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VOX.EinarTheSuaveBartender.LaughSmall1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Einar%20the%20Bartender/VOX.EinarTheSuaveBartender.Scream1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
];

const fantasyRightImage =
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/_Morgaine.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";
const fantasyRightAudioFiles = [
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.01.Introduction.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.02.Yes1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.04.Happy1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.08.Celebration2.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.11.Curiosity1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.15.Taunt1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.17.Taunt3.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.19.Caution.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.21.Disappointment.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.25.CommandDefense.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.27.No2.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.28.HurtLight.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.29.HurtModerate.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.33.AttackLight.2.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.34.AttackHeavy.3.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.35.Death.1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.36.LaughSmall.1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.38.LaughBig.1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
  "https://dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Demo%20Reels/Fantasy%20and%20RPGs/Voiceover/DND%20Morgaine%20the%20Witch/DND-NRS-03.VO.MorgaineTheWitch.41.Hmm.1.wav?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0",
];

const fantasyVoiceoverData = {
  leftImage: fantasyLeftImage,
  leftAudioFiles: fantasyLeftAudioFiles,
  rightImage: fantasyRightImage,
  rightAudioFiles: fantasyRightAudioFiles,
};

export {
  fantasyAudioData,
  fantasyHeaderStyle,
  fantasySubheadStyle,
  fantasyTitleStyle,
  fantasyContainerStyle,
  fantasyButtonStyle,
  fantasyWrapperStyle,
  fantasyDividerStyle,
  fantasyAlbumData,
  fantasyVoiceoverData,
};
