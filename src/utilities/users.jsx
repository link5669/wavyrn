const projectManagement = [
    { name: `Marc Yu`, title: `Co-Founder,\n Audio Director` },
    { name: `Ananta Arora`, title: `Co-Founder, \nStudio Manager` },
    {
        name: `Max Jaime`,
        title: `Sound Designer, Composer, Mixer`,
    },
    { name: `Angelica Ramos`, title: `Technical Assistant` },
];

const production = [
    {
        name: `Caleb Skelly`,
        title: `Sound Designer, VO Producer`,
    },
    {
        name: `Max Jaime`,
        title: `Sound Designer, Composer, Mixer`,
    },
    { name: `Austin Leshock`, title: `Composer, Mixer` },
    { name: `Angelica Ramos`, title: `Technical Assistant` },
];

const soundDesign = [
    // { name: `Ela Morana`, title: `Technical Sound Designer, Composer` },
    {
        name: `Caleb Skelly`,
        title: `Sound Designer, VO Producer`,
    },
    { name: `Austin Burkett`, title: `Sound Designer, Composer` },
    { name: `Julian Cabrera`, title: `Sound Designer, Composer` },
    { name: "Neil Small", title: "Sound Designer, Technical Assistant" },

    // { name: `Gret Price`, title: `Sound Designer, Foley Artist` },
    // { name: `Paul Edward May`, title: `Sound Designer, Voice Actor` },
];

const music = [
    { name: `Marc Yu`, title: `Co-Founder,\n Audio Director` },
    // { name: `Ela Morana`, title: `Technical Sound Designer, Composer` },
    { name: `Michelle Lai`, title: `Audio Director, Composer` },
    {
        name: `Max Jaime`,
        title: `Sound Designer, Composer, Mixer`,
    },
    { name: `Austin Burkett`, title: `Sound Designer, Composer` },
    { name: `Austin Leshock`, title: `Composer, Mixer` },
    { name: `Julian Cabrera`, title: `Sound Designer, Composer` },
    { name: "Neil Small", title: "Sound Designer, Technical Assistant" },
];
const dialogue = [
    {
        name: `Caleb Skelly`,
        title: `Sound Designer, VO Producer`,
    },
    // { name: `Paul Edward May`, title: `Sound Designer, Voice Actor` },
    { name: `Zionna Brown`, title: `VO Producer, Voice Actor` },
    { name: `Josh Trochet`, title: `Voice Actor` },
    { name: `Sam Leigh`, title: `Voice Actor` },
];
const allUsers = [
    { name: `Marc Yu`, title: `Co-Founder,\n Audio Director` },
    { name: `Ananta Arora`, title: `Co-Founder, \nStudio Manager` },
    {
        name: `Max Jaime`,
        title: `Sound Designer, Composer, Mixer`,
    },
    {
        name: `Caleb Skelly`,
        title: `Sound Designer, VO Producer`,
    },
    { name: `Austin Burkett`, title: `Sound Designer, Composer` },
    { name: `Julian Cabrera`, title: `Sound Designer, Composer` },

    // { name: `Gret Price`, title: `Sound Designer, Foley Artist` },
    // { name: `Paul Edward May`, title: `Sound Designer, Voice Actor` },
    { name: `Michelle Lai`, title: `Audio Director, Composer` },
    { name: "Neil Small", title: "Sound Designer, Technical Assistant" },
    { name: `Austin Leshock`, title: `Composer, Mixer` },
    { name: `Angelica Ramos`, title: `Technical Assistant` },
    { name: `Zionna Brown`, title: `VO Producer, Voice Actor` },
    { name: `Josh Trochet`, title: `Voice Actor` },
    { name: `Sam Leigh`, title: `Voice Actor` },
    { name: `Miles Acquaviva`, title: `Web Developer` },

    // { name: `Ela Morana`, title: `Technical Sound Designer, Composer` },
];

const categories = [
    { categoryList: allUsers, category: `All` },
    // { categoryList: projectManagement, category: `Project Management` },
    { categoryList: production, category: `Production` },
    { categoryList: soundDesign, category: `Sound Design` },
    { categoryList: music, category: `Music` },
    { categoryList: dialogue, category: `Voiceover` },
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
