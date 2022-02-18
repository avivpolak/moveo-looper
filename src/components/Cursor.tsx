import React from "react";

export default function Cursor({ precentage,numberOfChannels }: any) {
    return (
        <div
            style={{
                zIndex: 30,
                width: "1px",
                backgroundColor: "black",
                height: `${numberOfChannels * 30+numberOfChannels*20-20}px`,
                position: "absolute",
                left: `${precentage}%`,
            }}
        ></div>
    );
}
