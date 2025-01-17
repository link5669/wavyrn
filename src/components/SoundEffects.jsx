import React, { useState } from "react";

const SoundEffects = ({ audioData, style }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [clickCounts, setClickCounts] = useState({});

  const handleClick = (audio, index) => {
    // Stop currently playing audio if exists
    if (currentlyPlaying) {
      currentlyPlaying.pause();
      currentlyPlaying.currentTime = 0;
    }

    // Handle array of audio files
    let audioToPlay;
    if (Array.isArray(audio)) {
      const currentCount = clickCounts[index] || 0;
      const nextCount = (currentCount + 1) % audio.length;

      setClickCounts((prev) => ({
        ...prev,
        [index]: nextCount,
      }));

      audioToPlay = audio[currentCount];
    } else {
      audioToPlay = audio;
    }

    // Play new audio
    const newAudio = new Audio(audioToPlay);
    newAudio.play();
    setCurrentlyPlaying(newAudio);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10px",
        padding: "20px",
      }}
    >
      {audioData.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(item.audio, index)}
          style={style}
        >
          <span style={{ minWidth: "100%" }}>
            <span style={{ width: "50%", textAlign: "left" }}>▶ </span>
            {item.title}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SoundEffects;
