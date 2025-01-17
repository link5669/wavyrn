import React, { useState } from "react";
import { useEffect } from "react";

const VoiceoverPhotos = ({ voiceoverData }) => {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const leftImage = voiceoverData.leftImage;
  const rightImage = voiceoverData.rightImage;
  const leftAudioFiles = voiceoverData.leftAudioFiles;
  const rightAudioFiles = voiceoverData.rightAudioFiles;

  const playAudio = (audioPath) => {
    // Stop currently playing audio if exists
    if (currentlyPlaying) {
      currentlyPlaying.pause();
      currentlyPlaying.currentTime = 0;
    }

    // Play new audio
    const audio = new Audio(audioPath);
    audio.play();
    setCurrentlyPlaying(audio);
  };

  const handleLeftClick = () => {
    setLeftIndex((prevIndex) => (prevIndex + 1) % leftAudioFiles.length);
    playAudio(leftAudioFiles[leftIndex]);
  };

  const handleRightClick = () => {
    setRightIndex((prevIndex) => (prevIndex + 1) % rightAudioFiles.length);
    playAudio(rightAudioFiles[rightIndex]);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh",
        gap: "40px",
      }}
    >
      <div>
        <img
          src={leftImage}
          alt="Left"
          onClick={handleLeftClick}
          style={{
            paddingRight: "2vw",
            height: "20vh",
            objectFit: "scale-down",
            cursor: "pointer",
          }}
        />
      </div>

      <div>
        <img
          src={rightImage}
          alt="Right"
          onClick={handleRightClick}
          style={{
            paddingLeft: "2vw",
            height: "20vh",
            objectFit: "scale-down",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default VoiceoverPhotos;
