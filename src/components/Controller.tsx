export default function Controller({
    audioRef,
    sound,
    name,
    loop,
    isMuted,
    toggleMute,
    id,
    color
}: any) {
    return (
        <div style={{backgroundColor:color,}}>
            <div
                className="_4"
                onClick={() => {
                    toggleMute(id);
                }}
            >
                {isMuted ? "unmute" : "mute"} {name}
            </div>
            <audio ref={audioRef} muted={isMuted} loop={loop} src={sound}>
                <source type="audio/mpeg" />
            </audio>
        </div>
    );
}
