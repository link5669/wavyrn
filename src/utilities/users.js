const projectManagement = [
  { name: "Marc Yu", title: "Co-Founder, \nAudio Director" },
  { name: "Ananta Arora", title: "Co-Founder, \nBusiness Manager" },
  {
    name: "Max Jaime",
    title: "Technical Sound \nDesigner, Composer, \nMixer, Editor",
  },
  { name: "Angelica Ramos", title: "Technical \nAssistant" },
];

const production = [
  {
    name: "Caleb Skelly",
    title: "Technical Sound Designer, Foley Artist, Mixer, VO Producer",
  },
  {
    name: "Max Jaime",
    title: "Technical Sound \nDesigner, Composer, \nMixer, Editor",
  },
  { name: "Austin Leshock", title: "Composer, \nMixer" },
  { name: "Angelica Ramos", title: "Technical \nAssistant" },
];

const soundDesign = [
  // { name: "Ela Morana", title: "Technical Sound Designer, Composer" },
  {
    name: "Caleb Skelly",
    title: "Technical Sound Designer, Foley Artist, Mixer, VO Producer",
  },
  { name: "Austin Burkett", title: "Sound Designer, \nComposer" },

  { name: "Gret Price", title: "Sound Designer, \nFoley Artist" },
  { name: "Paul Edward May", title: "Sound Designer, \nVoice Actor" },
];

const music = [
  { name: "Marc Yu", title: "Co-Founder, \nAudio Director" },
  // { name: "Ela Morana", title: "Technical Sound Designer, Composer" },
  // { name: "Michelle Lai", title: "Composer, Voice Actor" },
  {
    name: "Max Jaime",
    title: "Technical Sound \nDesigner, Composer, \nMixer, Editor",
  },
  { name: "Austin Burkett", title: "Sound Designer, \nComposer" },
  { name: "Austin Leshock", title: "Composer, \nMixer" },
];
const dialogue = [
  {
    name: "Caleb Skelly",
    title: "Technical Sound Designer, Foley Artist, Mixer, VO Producer",
  },
  { name: "Paul Edward May", title: "Sound Designer, \nVoice Actor" },
  // { name: "Michelle Lai", title: "Composer, Voice Actor" },
  { name: "Josh Trochet", title: "Voice Actor" },
  // { name: "Zionna Brown", title: "Voice Actor" },
  { name: "Sam Leigh", title: "Voice Actor" },
];
const allUsers = [
  { name: "Marc Yu", title: "Co-Founder, Audio Director" },
  { name: "Ananta Arora", title: "Co-Founder, \nBusiness Manager" },
  { name: "Austin Burkett", title: "Sound Designer, \nComposer" },
  {
    name: "Caleb Skelly",
    title: "Technical Sound Designer, Foley Artist, Mixer, VO Producer",
  },
  { name: "Gret Price", title: "Sound Designer, \nFoley Artist" },
  { name: "Paul Edward May", title: "Sound Designer, Voice Actor" },
  // { name: "Michelle Lai", title: "Composer, Voice Actor" },
  {
    name: "Max Jaime",
    title: "Technical Sound \nDesigner, Composer, \nMixer, Editor",
  },
  { name: "Austin Leshock", title: "Composer, Mixer" },
  { name: "Angelica Ramos", title: "Technical Assistant" },
  { name: "Josh Trochet", title: "Voice Actor" },
  // { name: "Zionna Brown", title: "Voice Actor" },
  { name: "Sam Leigh", title: "Voice Actor" },
  // { name: "Ela Morana", title: "Technical Sound Designer, Composer" },
];

const categories = [
  { categoryList: allUsers, category: "All" },
  { categoryList: projectManagement, category: "Project Management" },
  { categoryList: production, category: "Production" },
  { categoryList: soundDesign, category: "Sound Design" },
  { categoryList: music, category: "Music" },
  { categoryList: dialogue, category: "Dialogue" },
];

export {
  projectManagement,
  production,
  soundDesign,
  music,
  dialogue,
  allUsers,
  categories,
};
