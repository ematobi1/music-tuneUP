import React from 'react';
import { useAudioEngine } from '../audio-engine/AudioEngineContext';

const EffectsControls: React.FC = () => {
    const { addEffect } = useAudioEngine();

    return (
        <div style={{ color: 'white', marginTop: '20px' }}>
            <h3>Effects</h3>
            <button onClick={() => addEffect('Echo')}>Echo</button>
            <button onClick={() => addEffect('Reverb')}>Reverb</button>
            <button onClick={() => addEffect('Flanger')}>Flanger</button>
            <button onClick={() => addEffect('AutoGainLimiter')}>Auto Gain</button>
        </div>
    );
};

export default EffectsControls;
