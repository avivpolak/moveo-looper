import React, { useRef, useState } from "react";

export default function Controller({ audioRef, sound, name,loop }: any) {
    const toggleMute = () => {
        if (audioRef.current.volume) {
            audioRef.current.volume = 0;
        } else {
            audioRef.current.volume = 1;
        }
    };
    return (
        <div >
            <div onClick={toggleMute}> mute/unmute {name}</div>
            <audio ref={audioRef}  loop={loop} src={sound}>
                <source type="audio/mpeg" />
            </audio>
        </div>
    );
}
