import React, { useState } from 'react';
import { useAudioEngine } from "../audio-engine/AudioEngineContext";

const BeatSyncControls: React.FC = () => {
    const engine = useAudioEngine();
    const [bpm, setBpm] = useState<number | null>(null);
    const [isSynced, setIsSynced] = useState(false);

    const detectBPM = () => {
        // Simulate BPM detection
        const detectedBpm = Math.floor(100 + Math.random() * 60);
        setBpm(detectedBpm);
        console.log(`Detected BPM: ${detectedBpm}`);
    };

    const syncBeats = () => {
        setIsSynced(true);
        console.log('Decks Synced!');
    };

    return (
        <div style={{ color: 'white', background: '#111', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
            <h3>Beat Sync</h3>
            <button onClick={detectBPM} style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#2196f3', color: 'white', cursor: 'pointer', marginBottom: '10px' }}>
                Detect BPM
            </button>
            <div style={{ marginBottom: '10px' }}>Current BPM: {bpm ?? 'N/A'}</div>
            <button onClick={syncBeats} style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#4caf50', color: 'white', cursor: 'pointer' }}>
                Sync Decks
            </button>
        </div>
    );
};

export default BeatSyncControls;
