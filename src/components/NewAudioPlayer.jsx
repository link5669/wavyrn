import "./AudioPlayer.css";
import React, { useEffect } from "react";
import { Reaplay } from "../components/reaplay/dist/index.modern.js";
import PlayPause from "./PlayPause";
import { useTimer } from "react-timer-hook";

const 


NewAudioPlayer = ({
  trackName,
  songs,
  trackInfo,
  playingTrackIndex,
  setPlayingTrackIndex,
}) => {
  let globalPlayer;
  let trackIndex = 0;
  console.log(trackName, songs);

  let timestamp = new Date();
  timestamp.setSeconds(timestamp.getSeconds() + 1);

  const { restart } = useTimer({
    autoStart: true,
    expiryTimestamp: timestamp,
    onExpire: () => {
      if (
        globalPlayer.trackIndex != playingTrackIndex &&
        setPlayingTrackIndex
      ) {
        setPlayingTrackIndex(globalPlayer.trackIndex);
      }
      const time = new Date();
      time.setSeconds(time.getSeconds() + 0.2);
      restartSecond(time);
    },
  });

  const { restart: restartSecond } = useTimer({
    autoStart: false,
    expiryTimestamp: timestamp,
    onExpire: () => {
      if (
        globalPlayer.trackIndex != playingTrackIndex &&
        setPlayingTrackIndex
      ) {
        setPlayingTrackIndex(globalPlayer.trackIndex);
      }
      const time = new Date();
      time.setSeconds(time.getSeconds() + 0.2);
      timestamp += 2000;
      restart(time);
    },
  });

  useEffect(() => {
    let trackIndex = -1;
    for (let i = 0; i < trackInfo.length; i++) {
      if (trackName == trackInfo[i].title) {
        trackIndex = i;
      }
    }
    globalPlayer.setTrackIndex(trackIndex);
  }, [trackName]);

  return (
    <Reaplay tracks={songs} startIndex={0} isPlaying={false}>
      {(player) => {
        globalPlayer = player;
        trackIndex = player.trackIndex;
        return (
          <>
            <div className="audio-player">
              <div style={{ alignItems: "center", width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    paddingBottom: "8px",
                    paddingTop: "8px",
                  }}
                >
                  <div
                    className={`circular-play-pause-button ${
                      player.isPlaying ? "playing" : ""
                    }`}
                    onClick={() => {
                      player.setIsPlaying(player.isPlaying ? false : true);
                    }}
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    <PlayPause isPlaying={player.isPlaying} />
                  </div>
                  <input
                    type="range"
                    value={player.trackProgress}
                    step=".01"
                    min="0"
                    max={
                      player.duration ? player.duration : `${player.duration}`
                    }
                    className="progress"
                    onChange={(e) => player.onScrub(e.target.value)}
                    onMouseUp={(e) => player.onScrubEnd(e)}
                    onKeyUp={(e) => player.onScrubEnd(e)}
                    style={{
                      background: `linear-gradient(to right, #DEE2E6 0%, #DEE2E6 ${
                        (player.trackProgress / player.duration) * 100
                      }%, gray ${
                        (player.trackProgress / player.duration) * 100
                      }%, gray 100%)`,
                      alignSelf: "center",
                      maxWidth: "60%",
                    }}
                  />
                  <p
                    style={{
                      alignSelf: "center",
                      marginBottom: "0",
                      color: "white",
                      fontSize: ".96rem",
                      fontFamily: "Georgia",
                      paddingLeft: "5px",
                    }}
                  >
                    <span>{player.trackProgressText.substring(1)}</span>/
                    {player.durationText.substring(1)}
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      }}
    </Reaplay>
  );
};

export default NewAudioPlayer;
