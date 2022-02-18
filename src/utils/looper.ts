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
        };
        counter++;
    }
    return sounds;
};
export const chooseSong = (SongName: string,soundPaths:SoundPaths,setSong:Function) => {
    if (soundPaths[SongName]) {
        console.log(SongName);
        setSong(soundPaths[SongName]);
    }
};
export const toggleLoop = (setLoop:Function,loop:boolean) => {
    setLoop(!loop);
};

export const play = (sounds:Sounds) => {
    for (const sound of Object.values(sounds)) {
        sound.ref.current.play();
    }
};
export const pause = (sounds:Sounds) => {
    for (const sound of Object.values(sounds)) {
        sound.ref.current.pause();
    }
};
export const setStartOver = (setProgress: Function,sounds:Sounds) => {
    for (const sound of Object.values(sounds)) {
        sound.ref.current.currentTime = 0;
    }
    setProgress(0);
};

export const setAlmostEnd = (sounds:Sounds) => {
    for (const sound of Object.values(sounds)) {
        sound.ref.current.currentTime = 15;
    }
};
export const toggleMute = (id: number,sounds:Sounds,setSounds:Function) => {
    setSounds({
        ...sounds,
        [id]: { ...sounds[id], isMuted: !sounds[id].isMuted },
    });
};
export const getCurrentTime = (id: number,sounds:Sounds) => {
    if (sounds[id].ref.current) {
        return sounds[id]?.ref?.current?.currentTime;
    }
    return 0;
};
export const getCurrentDuration = (id: number,sounds:Sounds) => {
    if (sounds[id].ref.current) {
        return sounds[id]?.ref?.current?.duration;
    }
    return 0;
};
