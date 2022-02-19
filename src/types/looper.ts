export interface Sounds {
    [key: number]: {
        ref: React.MutableRefObject<HTMLAudioElement | null>;
        sound: string;
        name: string;
        isMuted: boolean;
        color: string;
        currentTime: number;
    };
}
export interface SoundPaths {
    [key: string]: string[];
}
