import React, { useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const BPMAnalyzer: React.FC = () => {
    const [bpm, setBpm] = useState<number | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const arrayBuffer = await file.arrayBuffer();
            const audioContext = new AudioContext();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            // Basic naive BPM detection (for demo purposes)
            const duration = audioBuffer.duration;
            const numberOfBeats = Math.floor(duration / 0.5); // naive estimate of beats every 0.5 sec
            const calculatedBpm = Math.floor((numberOfBeats / duration) * 60);

            setBpm(calculatedBpm);
        }
    };

    return (
        <div style={{ background: '#111', color: '#fff', padding: '10px', borderRadius: '8px' }}>
            <h3>BPM Analyzer</h3>
            <input type="file" accept="audio/*" onChange={handleFileUpload} />
            {bpm && <p>Estimated BPM: {bpm}</p>}
        </div>
    );
};

export default BPMAnalyzer;
