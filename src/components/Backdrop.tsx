import { useEffect } from "react";

const Backdrop = ({ activeColor,  isPlaying }: {activeColor:string,  isPlaying:boolean}) => {
    useEffect(() => {
        document.documentElement.style.setProperty(
            "--active-color",
            activeColor
        );
    }, [activeColor]);

    return (
        <div className={`color-backdrop ${isPlaying ? "playing" : "idle"}`} />
    );
};

export default Backdrop;
