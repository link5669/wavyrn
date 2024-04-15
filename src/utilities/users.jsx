const projectManagement = [
  { name: `Marc Yu`, title: `Co-Founder,\n Audio Director` },
  { name: `Ananta Arora`, title: `Co-Founder, \nBusiness Manager` },
  {
    name: `Max Jaime`,
    title: `Technical Sound Designer, Composer, Mixer, Editor`,
  },
  { name: `Angelica Ramos`, title: `Technical Assistant` },
];

const production = [
  {
    name: `Caleb Skelly`,
    title: `Technical Sound Designer, Foley Artist, Mixer, VO Producer`,
  },
  {
    name: `Max Jaime`,
    title: `Technical Sound Designer, Composer, Mixer, Editor`,
  },
  { name: `Austin Leshock`, title: `Composer, Mixer` },
  { name: `Angelica Ramos`, title: `Technical Assistant` },
];

const soundDesign = [
  // { name: `Ela Morana`, title: `Technical Sound Designer, Composer` },
  {
    name: `Caleb Skelly`,
    title: `Technical Sound Designer, Foley Artist, Mixer, VO Producer`,
  },
  { name: `Austin Burkett`, title: `Sound Designer, Composer` },

  // { name: `Gret Price`, title: `Sound Designer, Foley Artist` },
  // { name: `Paul Edward May`, title: `Sound Designer, Voice Actor` },
];

const music = [
  { name: `Marc Yu`, title: `Co-Founder,\n Audio Director` },
  // { name: `Ela Morana`, title: `Technical Sound Designer, Composer` },
  // { name: `Michelle Lai`, title: `Composer, Voice Actor` },
  {
    name: `Max Jaime`,
    title: `Technical Sound Designer, Composer, Mixer, Editor`,
  },
  { name: `Austin Burkett`, title: `Sound Designer, Composer` },
  { name: `Austin Leshock`, title: `Composer, Mixer` },
];
const dialogue = [
  {
    name: `Caleb Skelly`,
    title: `Technical Sound Designer, Foley Artist, Mixer, VO Producer`,
  },
  // { name: `Paul Edward May`, title: `Sound Designer, Voice Actor` },
  // { name: `Michelle Lai`, title: `Composer, Voice Actor` },
  { name: `Josh Trochet`, title: `Voice Actor` },
  { name: `Zionna Brown`, title: `Voice Actor` },
  { name: `Sam Leigh`, title: `Voice Actor` },
];
const allUsers = [
  { name: `Marc Yu`, title: `Co-Founder,\n Audio Director` },
  { name: `Ananta Arora`, title: `Co-Founder, \nBusiness Manager` },
  { name: `Austin Burkett`, title: `Sound Designer, Composer` },
  {
    name: `Caleb Skelly`,
    title: `Technical Sound Designer, Foley Artist, Mixer, VO Producer`,
  },
  // { name: `Gret Price`, title: `Sound Designer, Foley Artist` },
  // { name: `Paul Edward May`, title: `Sound Designer, Voice Actor` },
  // { name: `Michelle Lai`, title: `Composer, Voice Actor` },
  {
    name: `Max Jaime`,
    title: `Technical Sound Designer, Composer, Mixer, Editor`,
  },
  { name: `Austin Leshock`, title: `Composer, Mixer` },
  { name: `Angelica Ramos`, title: `Technical Assistant` },
  { name: `Josh Trochet`, title: `Voice Actor` },
  { name: `Zionna Brown`, title: `Voice Actor` },
  { name: `Sam Leigh`, title: `Voice Actor` },
  { name: `Lulu Ramirez`, title: `Social Media Manager` },
  { name: `Miles Acquaviva`, title: `Web Developer` },

  // { name: `Ela Morana`, title: `Technical Sound Designer, Composer` },
];

const categories = [
  { categoryList: allUsers, category: `All` },
  { categoryList: projectManagement, category: `Project Management` },
  { categoryList: production, category: `Production` },
  { categoryList: soundDesign, category: `Sound Design` },
  { categoryList: music, category: `Music` },
  { categoryList: dialogue, category: `Voice Acting` },
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
