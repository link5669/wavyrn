const PERSON_BASE =
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Headshots/Person";
const BACKGROUND_BASE =
  "https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Headshots/Background";
const RLKEY = "rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0";

const getPfpImage = (name) => {
  if (name === "Michelle Lai") {
    return "https://www.dl.dropboxusercontent.com/scl/fo/7de9q581pxdwcvcvu4qep/ADv0rYvWSIqK3PVXpNuvhmU/Michelle%20Lai/2025%20Profile%20Picture.jpg?rlkey=pdazvtkk2j75glkyqgsj4m7oz&e=1&dl=0";
  }
  const map = {
    "Marc Yu": "marc_.png",
    "Austin Burkett": "austin_b_.png",
    "Austin Leshock": "austin_l_.png",
    "Max Jaime": "max_.png",
    "Sam Leigh": "sam_.png",
    "Ananta Arora": "ananta_.png",
    "Angelica Ramos": "angelica_.png",
    "Josh Trochet": "josh_.png",
    "Neil Small": "neil.png",
    "Miles Acquaviva": "miles_.png",
    "Zionna Brown": "zionna.png",
    "Quinne Houck": "quinne_.png",
    "Caleb Skelly": "caleb_.png",
    "Julian Cabrera": "julian_.png",
    "Miguel Meneses": "miguel.png",
    "Grace Pehrman": "grace_.png",
  };
  const file = map[name];
  return file ? `${PERSON_BASE}/${file}?${RLKEY}` : "https://via.placeholder.com/150";
};

const getPfpBackground = (name) => {
  const map = {
    "Ananta Arora": "ananta_.png",
    "Angelica Ramos": "angelica_.png",
    "Austin Burkett": "austin_b_.png",
    "Austin Leshock": "austin_l_.png",
    "Caleb Skelly": "caleb_.png",
    "Grace Pehrman": "grace_.png",
    "Josh Trochet": "josh_.png",
    "Julian Cabrera": "julian_.png",
    "Marc Yu": "marc_.png",
    "Max Jaime": "max_.png",
    "Miguel Meneses": "miguel.png",
    "Miles Acquaviva": "miles_.png",
    "Neil Small": "neil.png",
    "Quinne Houck": "quinne_.png",
    "Sam Leigh": "sam_.png",
    "Zionna Brown": "zionna.png",
  };
  const file = map[name];
  return file ? `${BACKGROUND_BASE}/${file}?${RLKEY}` : null;
};

export { getPfpImage, getPfpBackground };
