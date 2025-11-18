import React, { useState } from 'react';
import { useAudioEngine } from "../audio-engine/AudioEngineContext";

const HotCuesLoopsPanel: React.FC = () => {
const engine = useAudioEngine();
    const [hotCues, setHotCues] = useState<number[]>([]);
    const [isLooping, setIsLooping] = useState(false);

    const addHotCue = () => {
const engine = useAudioEngine();
        setHotCues([...hotCues, Math.floor(Math.random() * 100)]);
    };

    const toggleLoop = () => {
const engine = useAudioEngine();
        setIsLooping(!isLooping);
        console.log(`Looping ${!isLooping ? "Started" : "Stopped"}`);
    };

    return (
        <div style={{ color: 'white', background: '#222', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
            <h3>Hot Cues & Loops</h3>
            <button onClick={addHotCue} style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#2196f3', color: 'white', cursor: 'pointer', marginBottom: '10px' }}>
                Add Hot Cue
            </button>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {hotCues.map((cue, index) => (
                    <div key={index} style={{ background: '#555', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>Cue {cue}</div>
                ))}
            </div>
            <button onClick={toggleLoop} style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: isLooping ? '#4caf50' : '#f44336', color: 'white', cursor: 'pointer' }}>
                {isLooping ? "Stop Looping" : "Start Looping"}
            </button>
        </div>
    );
};

export default HotCuesLoopsPanel;
