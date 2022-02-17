import React from "react";

export default function Cursor({ precentage }: any) {
    return (
        <div
            style={{
                zIndex: 30,
                width: "1px",
                backgroundColor: "black",
                height: "144px",
                position: "absolute",
                left: `${precentage}%`,
            }}
        ></div>
    );
}
