import { ReactNode } from 'react';
interface Props {
    tracks: string[];
    startIndex?: number;
    children?: ((props: PlayerType) => ReactNode) | ReactNode;
}
/**
 * Reaplay
 * @param {string[]} tracks
 * @param {number} startIndex
 * @param {any} children
 * @property {object}  player
 * @property {function} player.Logger
 * @property {boolean}  player.isLoading
 * @property {boolean}  player.isHaveError
 * @property {number}  player.trackIndex
 * @property {number}  player.setTrackIndex
 * @property {number}  player.duration
 * @property {string}  player.durationText
 * @property {number}  player.trackProgress
 * @property {string}  player.trackProgressText
 * @property {string}  player.trackStyling
 * @property {function}  player.onScrub
 * @property {function}  player.onScrubEnd
 * @property {boolean}  player.isPlaying
 * @property {function}  player.setIsPlaying
 * @property {function}  player.play
 * @property {function}  player.pause
 * @property {function}  player.toNextTrack
 * @property {function}  player.toPrevTrack
 * @property {boolean}  player.isRepeat
 * @property {function}  player.repeat
 * @property {number}  player.volume
 * @property {function}  player.setVolume
 * @property {number}  player.speed
 * @property {function}  player.playSlow
 * @property {function}  player.playNormal
 * @property {function}  player.playFast
 * @property {boolean}  player.isStopPlayMoreSong
 * @property {function}  player.StopPlayMoreSong
 * @property {boolean}  player.isShuffle
 * @property {function}  player.playShuffle
 * @property {function}  player.playRandom
 * @property {boolean}  player.isMute
 * @property {function}  player.mute
 * @property {function}  player.unmute
 * @property {number | string}  player.buffered
 * @property {string}  player.bufferedText
 * @property {function}  player.forward
 * @property {function}  player.backward
 * @property {function}  player.forceUpdatePlayer
 */
export declare const Reaplay: ({ tracks, startIndex, children }: Props) => any;
export interface PlayerType {
    Logger: Function;
    isLoading: boolean;
    isHaveError: boolean;
    trackIndex: number;
    setTrackIndex: (index: number) => void;
    duration: number;
    durationText: string;
    trackProgress: number;
    trackProgressText: string;
    trackStyling: string;
    onScrub: Function;
    onScrubEnd: Function;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    play: Function;
    pause: Function;
    toNextTrack: Function;
    toPrevTrack: Function;
    isRepeat: boolean;
    repeat: (setOnrepeat: boolean) => void;
    volume: number;
    setVolume: (volume: number) => void;
    speed: number;
    playSlow: Function;
    playNormal: Function;
    playFast: Function;
    isStopPlayMoreSong: boolean;
    StopPlayMoreSong: Function;
    playShuffle: (isShuffle: boolean) => void;
    isShuffle: boolean;
    playRandom: Function;
    isMute: boolean;
    mute: Function;
    unmute: Function;
    buffered: number | string;
    bufferedText: string;
    forward: Function;
    backward: Function;
    forceUpdatePlayer: Function;
    update: Function;
}
export {};
