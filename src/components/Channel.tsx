export default function Channel({
    audioRef,
    sound,
    name,
    loop,
    isMuted,
    toggleMute,
    id,
    color,
}: any) {
    return (
        <div className="channel">
            <div
                className="control"
                onClick={() => {
                    toggleMute(id);
                }}
            >
                {isMuted ? "🔈" : "🔊"} {name}
            </div>
            <div className="bar" style={{ backgroundColor: color ,opacity:0.7 }}>
                <audio ref={audioRef} muted={isMuted} loop={loop} src={sound}>
                    <source type="audio/mpeg" />
                </audio>
            </div>
        </div>
    );
}
