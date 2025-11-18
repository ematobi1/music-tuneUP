import React, { useState } from 'react';

const AudioRoutingPanel: React.FC = () => {
    const [inputDevice, setInputDevice] = useState("Default Input");
    const [outputDevice, setOutputDevice] = useState("Default Output");

    return (
        <div style={{ padding: '10px', border: '1px solid #555', borderRadius: '8px', backgroundColor: '#222', color: '#fff', minWidth: '200px' }}>
            <h4>Audio Routing</h4>
            <div>
                <label>Input:</label><br />
                <select value={inputDevice} onChange={(e) => setInputDevice(e.target.value)}>
                    <option>Default Input</option>
                    <option>Microphone</option>
                    <option>Line In</option>
                </select>
            </div>
            <div>
                <label>Output:</label><br />
                <select value={outputDevice} onChange={(e) => setOutputDevice(e.target.value)}>
                    <option>Default Output</option>
                    <option>Speakers</option>
                    <option>Headphones</option>
                </select>
            </div>
        </div>
    );
}

export default AudioRoutingPanel;
