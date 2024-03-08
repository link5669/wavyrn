var react = require('react');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var ConvertTimeToText = function ConvertTimeToText(time) {
  if (!time) time = 0;
  var minutes = "0" + Math.floor(time / 60);
  var seconds = "0" + Math.floor(time - parseInt(minutes) * 60);
  var result = minutes.substr(-2) + ":" + seconds.substr(-2);
  return result;
};

var Reaplay = function Reaplay(_ref) {
  var tracks = _ref.tracks,
      _ref$startIndex = _ref.startIndex,
      startIndex = _ref$startIndex === void 0 ? 0 : _ref$startIndex,
      children = _ref.children;

  if (startIndex < 0 || startIndex > tracks.length) {
    startIndex = 0;
  }

  var _useState = react.useState(startIndex),
      trackIndex = _useState[0],
      setTrackIndex = _useState[1];

  var _useState2 = react.useState(0),
      trackProgress = _useState2[0],
      setTrackProgress = _useState2[1];

  var _useState3 = react.useState(100),
      volume = _useState3[0],
      setVolume = _useState3[1];

  var _useState4 = react.useState(1),
      speed = _useState4[0],
      setSpeed = _useState4[1];

  var _useState5 = react.useState(false),
      isPlaying = _useState5[0],
      setIsPlaying = _useState5[1];

  var _useState6 = react.useState(false),
      isRepeat = _useState6[0],
      setIsRepeat = _useState6[1];

  var _useState7 = react.useState(false),
      isStopPlayMoreSong = _useState7[0],
      StopPlayMoreSong = _useState7[1];

  var _useState8 = react.useState(false),
      isShuffleList = _useState8[0],
      setIsShuffleList = _useState8[1];

  var _useState9 = react.useState(false),
      isMute = _useState9[0],
      setIsMute = _useState9[1];

  var _useState10 = react.useState(0),
      buffered = _useState10[0],
      setBuffered = _useState10[1];

  var _useState11 = react.useState(true),
      isLoading = _useState11[0],
      setIsLoading = _useState11[1];

  var _useState12 = react.useState(false),
      isHaveError = _useState12[0],
      setIsHaveError = _useState12[1];

  var _useState13 = react.useState(0),
      forcePlayerUpdate = _useState13[0],
      setForcePlayerUpdate = _useState13[1];

  var audioRef = react.useRef(new Audio(tracks[trackIndex]));
  audioRef.current.autoplay = false;
  audioRef.current.volume = volume / 100;
  audioRef.current.muted = isMute;
  audioRef.current.playbackRate = speed;

  audioRef.current.onloadeddata = function () {
    return setIsLoading(false);
  };

  audioRef.current.onerror = function () {
    return setIsHaveError(true);
  };

  var intervalRef = react.useRef(null);
  var isReady = react.useRef(false);
  var duration = audioRef.current.duration;
  var currentPercentage = duration ? trackProgress / duration * 100 + "%" : '0%';
  var trackStyling = "\n      -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(" + currentPercentage + ", #fff), color-stop(" + currentPercentage + ", #777))\n    ";

  var startTimer = function startTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(function () {
      if (audioRef.current.ended) {
        if (!isStopPlayMoreSong) {
          if (isShuffleList) {
            playRandom();
          } else {
            if (isRepeat) {
              onScrub(0);
              audioRef.current.play();
            } else {
              toNextTrack();
            }
          }
        }
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  var onScrub = function onScrub(value) {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  var play = function play() {
    setIsPlaying(true);
  };

  var pause = function pause() {
    setIsPlaying(false);
  };

  var onScrubEnd = function onScrubEnd() {
    if (!isPlaying) {
      setIsPlaying(true);
    }

    startTimer();
  };

  var toPrevTrack = function toPrevTrack() {
    if (isShuffleList) {
      playRandom();
    } else {
      if (trackIndex - 1 < 0) {
        setTrackIndex(tracks.length - 1);
      } else {
        setTrackIndex(trackIndex - 1);
      }
    }
  };

  var toNextTrack = function toNextTrack() {
    if (isShuffleList) {
      playRandom();
    } else {
      if (trackIndex < tracks.length - 1) {
        setTrackIndex(trackIndex + 1);
      } else {
        setTrackIndex(0);
      }
    }
  };

  var forward = function forward() {
    audioRef.current.currentTime += 5;
  };

  var backward = function backward() {
    audioRef.current.currentTime -= 5;
  };

  var playSlow = function playSlow() {
    setSpeed(0.5);
  };

  var playNormal = function playNormal() {
    setSpeed(1);
  };

  var playFast = function playFast() {
    setSpeed(2);
  };

  var repeat = function repeat(SetOnRepeat) {
    if (SetOnRepeat) {
      setIsRepeat(true);
    } else {
      setIsRepeat(false);
    }
  };

  var mute = function mute() {
    setIsMute(true);
  };

  var unmute = function unmute() {
    setIsMute(false);
  };

  var playShuffle = function playShuffle(shuffle) {
    if (shuffle) {
      setIsShuffleList(true);
    } else {
      setIsShuffleList(false);
    }
  };

  var playRandom = function playRandom() {
    var songsLength = tracks.length - 1;
    var random = Math.floor(Math.random() * songsLength);
    setTrackIndex(random);
  };

  var forceUpdatePlayer = function forceUpdatePlayer() {
    setForcePlayerUpdate(function (prev) {
      return prev + 1;
    });
  };

  var update = function update() {
    onScrubEnd();
  };

  react.useEffect(function () {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  react.useEffect(function () {
    onScrubEnd();
  }, [isRepeat]);
  react.useEffect(function () {
    if (duration > 0) {
      var i;

      for (i = 0; i < audioRef.current.buffered.length; i++) {
        setBuffered(audioRef.current.buffered.end(audioRef.current.buffered.length - 1 - i) / duration * 100);
      }
    }
  }, [trackProgress]);
  react.useEffect(function () {
    audioRef.current.pause();
    setIsPlaying(false);
    setIsLoading(true);
    setBuffered(0);
    audioRef.current = new Audio(tracks[trackIndex]);
    setTrackProgress(audioRef.current.currentTime);

    audioRef.current.onloadeddata = function () {
      return setIsLoading(false);
    };

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIndex, forcePlayerUpdate]);
  react.useEffect(function () {
    return function () {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  var Logger = function Logger() {
    console.log({
      trackIndex: trackIndex,
      duration: ConvertTimeToText(duration),
      trackProgress: ConvertTimeToText(trackProgress),
      isPlaying: isPlaying,
      isRepeat: isRepeat,
      isShuffleList: isShuffleList,
      isStopPlayMoreSong: isStopPlayMoreSong,
      volume: volume,
      isLoading: isLoading,
      isHaveError: isHaveError,
      speed: speed
    });
  };

  var data = {
    Logger: Logger,
    isLoading: isLoading,
    isHaveError: isHaveError,
    trackIndex: trackIndex,
    setTrackIndex: setTrackIndex,
    duration: duration,
    durationText: ConvertTimeToText(audioRef.current.duration),
    trackProgress: trackProgress,
    trackProgressText: ConvertTimeToText(trackProgress),
    trackStyling: trackStyling,
    onScrub: onScrub,
    onScrubEnd: onScrubEnd,
    isPlaying: isPlaying,
    setIsPlaying: setIsPlaying,
    play: play,
    pause: pause,
    toNextTrack: toNextTrack,
    toPrevTrack: toPrevTrack,
    isRepeat: isRepeat,
    repeat: repeat,
    volume: volume,
    setVolume: setVolume,
    isStopPlayMoreSong: isStopPlayMoreSong,
    StopPlayMoreSong: StopPlayMoreSong,
    playShuffle: playShuffle,
    isShuffle: isShuffleList,
    playRandom: playRandom,
    isMute: isMute,
    mute: mute,
    unmute: unmute,
    buffered: buffered,
    bufferedText: buffered + "%",
    backward: backward,
    forward: forward,
    speed: speed,
    playSlow: playSlow,
    playNormal: playNormal,
    playFast: playFast,
    forceUpdatePlayer: forceUpdatePlayer,
    update: update
  };
  return children(_extends({}, data));
};

exports.Reaplay = Reaplay;
//# sourceMappingURL=index.js.map
