import React from "react";

const AudioMixerPanel: React.FC = () => {
    return (
        <div style={{ backgroundColor: "#111", color: "#fff", padding: "12px", borderRadius: "10px", textAlign: "center", minWidth: "250px" }}>
            <h3>Audio Mixer Panel</h3>
            <p>Master EQ and channel mixer will appear here.</p>
        </div>
    );
};

export default AudioMixerPanel;
