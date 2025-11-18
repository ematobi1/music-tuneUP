import React, { useState } from "react";

const STEMSPanel: React.FC = () => {
    const [track, setTrack] = useState<File | null>(null);
    const [status, setStatus] = useState("Idle");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setTrack(e.target.files[0]);
        }
    };

    const handleIsolate = async () => {
        if (!track) return;
        setStatus("Processing...");
        // í±‰ Replace this later with actual FastAPI POST request
        setTimeout(() => {
            setStatus("Vocal + Instrument separation complete! âœ…");
        }, 3000);
    };

    return (
        <div style={{
            background: "#333", color: "white", padding: "20px",
            borderRadius: "10px", marginTop: "20px", textAlign: "center"
        }}>
            <h3>í¾¼ STEMS AI Separation</h3>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <br /><br />
            <button
                onClick={handleIsolate}
                style={{
                    padding: "10px 20px", border: "none",
                    borderRadius: "8px", backgroundColor: "#39ff14", color: "black"
                }}
                disabled={!track}
            >
                Isolate Vocals + Instruments
            </button>
            <p>Status: {status}</p>
        </div>
    );
};

export default STEMSPanel;
