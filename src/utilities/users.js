const projectManagement = [
  { name: "Marc Yu", title: "Co-Founder, Audio Director" },
  { name: "Ananta Arora", title: "Co-Founder, Business Manager" },
  {
    name: "Max Jaime",
    title: "Technical Sound Designer, Composer, Mixer, Editor",
  },
  { name: "Angelica Ramos", title: "Technical Assistant" },
];

const audioDirecting = [
  { name: "Marc Yu", title: "Co-Founder, Audio Director" },
  { name: "Ananta Arora", title: "Co-Founder, Business Manager" },
  { name: "Angelica Ramos", title: "Technical Assistant" },
];

const production = [
  {
    name: "Max Jaime",
    title: "Technical Sound Designer, Composer, Mixer, Editor",
  },
  { name: "Austin Leshock", title: "Composer, Mixer" },
  { name: "Angelica Ramos", title: "Technical Assistant" },
];

const soundDesign = [
  { name: "Ela Morana", title: "Technical Sound Designer, Composer" },
  { name: "Austin Burkett", title: "Sound Designer, Composer" },
  { name: "Gret Price", title: "Sound Designer, Foley Artist" },
  { name: "Paul May", title: "Sound Designer, Voice Actor" },
  { name: "Caleb Skelly", title: "Sound Designer, VO Producer" },
];
const music = [
  { name: "Marc Yu", title: "Co-Founder, Audio Director" },
  { name: "Ela Morana", title: "Technical Sound Designer, Composer" },
  { name: "Michelle Lai", title: "Composer, Voice Actor" },
  {
    name: "Max Jaime",
    title: "Technical Sound Designer, Composer, Mixer, Editor",
  },

  { name: "Austin Burkett", title: "Sound Designer, Composer" },
];
const dialogue = [
  { name: "Caleb Skelly", title: "Sound Designer, VO Producer" },
  { name: "Paul May", title: "Sound Designer, Voice Actor" },
  { name: "Michelle Lai", title: "Composer, Voice Actor" },
  { name: "Josh Trochet", title: "Voice Actor" },
  { name: "Zionna Brown", title: "Voice Actor" },
  { name: "Sam Leigh", title: "Voice Actor" },
];
const allUsers = [
  { name: "Marc Yu", title: "Co-Founder, Audio Director" },
  { name: "Ananta Arora", title: "Co-Founder, Business Manager" },
  { name: "Austin Burkett", title: "Sound Designer, Composer" },
  { name: "Gret Price", title: "Sound Designer, Foley Artist" },
  { name: "Paul Edward May", title: "Sound Designer, Voice Actor" },
  { name: "Caleb Skelly", title: "Sound Designer, VO Producer" },
  { name: "Michelle Lai", title: "Composer, Voice Actor" },
  {
    name: "Max Jaime",
    title: "Technical Sound Designer, Composer, Mixer, Editor",
  },
  { name: "Austin Leshock", title: "Composer, Mixer" },
  { name: "Angelica Ramos", title: "Technical Assistant" },
  { name: "Josh Trochet", title: "Voice Actor" },
  { name: "Zionna Brown", title: "Voice Actor" },
  { name: "Sam Leigh", title: "Voice Actor" },
  { name: "Ela Morana", title: "Technical Sound Designer, Composer" },
];

const categories = [
    { categoryList: allUsers, category: "All" },
    { categoryList: projectManagement, category: "Project Management" },
    { categoryList: audioDirecting, category: "Audio Directing" },
    { categoryList: production, category: "Production" },
    { categoryList: soundDesign, category: "Sound Design" },
    { categoryList: music, category: "Music" },
    { categoryList: dialogue, category: "Dialogue" },
  ];

export {
  projectManagement,
  audioDirecting,
  production,
  soundDesign,
  music,
  dialogue,
  allUsers,
  categories
};
