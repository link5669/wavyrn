import "./Scrolling.scss";
import { useState } from "react";
import { useTimer } from "react-timer-hook";
const ScrollingThing = (props) => {
  let timestamp = props.time;
  timestamp.setSeconds(timestamp.getSeconds() + 0.5);
  const [currWord, setCurrWord] = useState("");
  let primary = ["Film      ", "TV        ", "Video Game", "Animation "];
  const [words, setWords] = useState([
    "Video Gaame",
    "Animaaation",
    "Interactive",
    "Theme Paark",
    "Multimediaa",
    "Multi-Genre",
  ]);

  const allWords = [
    "Video Game   ",
    "Animation    ",
    "Interactive  ",
    "Theme Park   ",
    "Multimedia   ",
    "Multi-Genre  ",
    "J-Pop & Anime",
    "Film         ",
    "TV           ",
    "Video Game   ",
    "Animation    ",
  ];
  const { isRunning, restart } = useTimer({
    autoStart: true,
    expiryTimestamp: timestamp,
    onExpire: () => {
      let nextWord;
      if (primary.includes(currWord)) {
        nextWord =
          props.secondary[Math.floor(Math.random() * props.secondary.length)];
        props.removeItemSecondary(nextWord);
      } else {
        nextWord =
          props.primary[Math.floor(Math.random() * props.primary.length)];
        props.removeItemPrimary(nextWord);
      }
      setWords([nextWord, ...words]);
      setCurrWord(nextWord);
      const time = new Date();
      time.setSeconds(time.getSeconds() + 5);
      restartSecond(time);
    },
  });

  const { restart: restartSecond } = useTimer({
    autoStart: false,
    expiryTimestamp: timestamp,
    onExpire: () => {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 0.5);
      timestamp += 2000;
      restart(time);
    },
  });
  return (
    <span class="content">
      <i>
        {isRunning ? (
          <div class="content__container">
            <ul class="content__container__list">
              <li class="content__container__list__item">
                {allWords[0].toUpperCase()}
              </li>
              <li class="content__container__list__item">
                {allWords[1].toUpperCase()}
              </li>
              <li class="content__container__list__item">
                {allWords[2].toUpperCase()}
              </li>
              <li class="content__container__list__item">
                {allWords[3].toUpperCase()}
              </li>
              <li class="content__container__list__item">
                {allWords[4].toUpperCase()}
              </li>
              <li class="content__container__list__item">
                {allWords[5].toUpperCase()}
              </li>
              <li class="content__container__list__item">
                {allWords[6].toUpperCase()}
              </li>
              <li class="content__container__list__item">
                {allWords[7].toUpperCase()}
              </li>
              <li class="content__container__list__item">
                {allWords[8].toUpperCase()}
              </li>
              <li class="content__container__list__item">
                {allWords[9].toUpperCase()}
              </li>
            </ul>
          </div>
        ) : (
          <p style={{ color: "#000000" }}>{currWord.toUpperCase()}</p>
        )}
      </i>
    </span>
  );
};
export default ScrollingThing;
