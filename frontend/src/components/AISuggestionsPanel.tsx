import React from "react";

const AISuggestionsPanel: React.FC = () => {
    return (
        <div style={{
            padding: "10px",
            border: "1px solid #444",
            borderRadius: "8px",
            backgroundColor: "#111",
            color: "#fff",
            minWidth: "220px"
        }}>
            <h4 style={{ marginBottom: "8px" }}>í¾µ AI Suggestions</h4>
            <ul>
                <li>Next Track: "Midnight Funk"</li>
                <li>Recommended BPM Match: 125</li>
                <li>Mix Suggestion: Crossfade with Echo</li>
            </ul>
        </div>
    );
};

export default AISuggestionsPanel;
