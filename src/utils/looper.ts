import { createRef } from "react";
import { SoundPaths, Sounds } from "../types/looper";
import { getRandomColor } from "./general";

export const getSoundsState = (soundsPaths: string[]) => {
    const sounds: Sounds = {};
    let counter = 0;
    for (let sound of soundsPaths) {
        const name = sound.split("/").pop()!.split(".")[0];
        sounds[counter] = {
            ref: createRef<HTMLAudioElement>(),
            sound,
            name,
            isMuted: false,
            color: getRandomColor(),
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
        sound?.ref?.current?.pause();
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
export const syncOffsets = async (sounds: Sounds, offset: number,setIsPlaying:Function) => {
    for (const sound of Object.values(sounds)) {
        const currentTime = getCurrentTime(0, sounds);
        const soundCurrentTime = sound?.ref?.current?.currentTime;
        if (soundCurrentTime) {
            if (Math.abs(currentTime - soundCurrentTime) > offset) {
                 pause(sounds, setIsPlaying);
                sound.ref.current.currentTime = currentTime;
                 play(sounds,setIsPlaying);
            }
        }
    }
};

export const toggleMute = (id: number, sounds: Sounds, setSounds: Function) => {
    setSounds({
        ...sounds,
        [id]: { ...sounds[id], isMuted: !sounds[id].isMuted },
    });
};
export const getCurrentTime = (id: number, sounds: Sounds) => {
    const currentTime = sounds[id]?.ref?.current?.currentTime;
    if (currentTime) {
        return currentTime;
    }
    return 0;
};

export const getCurrentDuration = (id: number, sounds: Sounds) => {
    const duration = sounds[id]?.ref?.current?.duration;
    if (duration) {
        return duration;
    }
    return 0;
};
