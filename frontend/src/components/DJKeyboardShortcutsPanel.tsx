import React, { useEffect, useState } from "react";

const DJKeyboardShortcutsPanel: React.FC = () => {
    const [lastKey, setLastKey] = useState<string>("");

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setLastKey(event.key);

            switch (event.key.toLowerCase()) {
                case "a":
                    console.log("Play Deck A");
                    break;
                case "s":
                    console.log("Stop Deck A");
                    break;
                case "k":
                    console.log("Play Deck B");
                    break;
                case "l":
                    console.log("Stop Deck B");
                    break;
                case "m":
                    console.log("Mute Master");
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div style={{ background: "#222", color: "white", padding: "10px", borderRadius: "8px" }}>
            <h3>í¾¹ DJ Keyboard Shortcuts</h3>
            <p>Last key pressed: {lastKey || "None"}</p>
            <ul style={{ fontSize: "0.9em" }}>
                <li>A = Play Deck A</li>
                <li>S = Stop Deck A</li>
                <li>K = Play Deck B</li>
                <li>L = Stop Deck B</li>
                <li>M = Mute Master</li>
            </ul>
        </div>
    );
};

export default DJKeyboardShortcutsPanel;
