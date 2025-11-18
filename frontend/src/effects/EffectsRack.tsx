import React from 'react';
import { useAudioEngine } from '../audio-engine/AudioEngineContext';

const EffectsRack: React.FC = () => {
    const { effects, addEffect } = useAudioEngine();

    return (
        <div style={{ padding: '10px', color: 'white' }}>
            <h3>Effects Rack</h3>
            <button onClick={() => addEffect('Echo')}>Add Echo</button>
            <button onClick={() => addEffect('Reverb')}>Add Reverb</button>
            <ul>
                {effects.map((effect, idx) => (
                    <li key={idx}>{effect}</li>
                ))}
            </ul>
        </div>
    );
};

export default EffectsRack;
