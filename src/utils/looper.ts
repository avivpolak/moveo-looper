import { createRef } from "react";
import { SoundPaths, Sounds } from "../types/looper";
import { getRandomColor } from "./general";

export const getSoundsState = (soundsPaths: string[]) => {
    const sounds: Sounds = {};
    let counter = 0;
    for (let sound of soundsPaths) {
        const name = sound.split("/").pop()!.split(".")[0];
        sounds[counter] = {
            ref: createRef<any>(),
            sound,
            name,
            isMuted: false,
            color: getRandomColor(),
            currentTime: 0,
        };
        counter++;
    }
    return sounds;
};
export const chooseSong = (
    SongName: string,
    soundPaths: SoundPaths,
    setSong: Function,
    setIsPlaying: Function,
    setProgress: Function,
    sounds: Sounds
) => {
    if (soundPaths[SongName]) {
        setSong(soundPaths[SongName]);
        setIsPlaying(false);
        setStartOver(setProgress, sounds);
    }
};
export const toggleLoop = (setLoop: Function, loop: boolean) => {
    setLoop(!loop);
};

export const play = (sounds: Sounds, setIsPlaying: Function) => {
    for (const sound of Object.values(sounds)) {
        sound.ref.current.play();
    }
    setIsPlaying(true);
};
export const pause = (sounds: Sounds, setIsPlaying: Function) => {
    for (const sound of Object.values(sounds)) {
        sound.ref.current.pause();
    }
    setIsPlaying(false);
};
export const setStartOver = (setProgress: Function, sounds: Sounds) => {
    for (const sound of Object.values(sounds)) {
        sound.ref.current.currentTime = 0;
    }
    setProgress(0);
};

export const setSoundsProgress = (
    sounds: Sounds,
    value: number,
    setProgress: Function
) => {
    for (const sound of Object.values(sounds)) {
        sound.ref.current.currentTime = value;
    }
    setProgress(value);
};

export const isOffset = (
    sounds: Sounds,
    offset:number
) => {
    const currentTimes=Object.values(sounds).map(sound=>sound.ref.current.currentTime);
    const averageTime = currentTimes.reduce((a, b) => a + b, 0) / currentTimes.length;
    for (const time of currentTimes) {
        if(Math.abs(time-averageTime)>offset){
            return true;
        }
    }
    return false;
};
export const toggleMute = (id: number, sounds: Sounds, setSounds: Function) => {
    setSounds({
        ...sounds,
        [id]: { ...sounds[id], isMuted: !sounds[id].isMuted },
    });
};
export const getCurrentTime = (id: number, sounds: Sounds) => {
    if (sounds[id].ref.current) {
        return sounds[id]?.ref?.current?.currentTime;
    }
    return 0;
};

export const getCurrentDuration = (id: number, sounds: Sounds) => {
    if (sounds[id].ref.current) {
        return sounds[id]?.ref?.current?.duration;
    }
    return 0;
};
