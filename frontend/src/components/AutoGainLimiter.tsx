import React, { useState } from 'react';

const AutoGainLimiter: React.FC = () => {
    const [enabled, setEnabled] = useState(false);

    const toggleLimiter = () => {
        setEnabled(!enabled);
        console.log(`Auto Gain Limiter ${!enabled ? "Enabled" : "Disabled"}`);
    };

    return (
        <div style={{ color: 'white', marginTop: '20px' }}>
            <h3>Auto Gain & Limiter</h3>
            <button onClick={toggleLimiter} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: enabled ? '#4caf50' : '#f44336', color: 'white' }}>
                {enabled ? "Disable Limiter" : "Enable Limiter"}
            </button>
        </div>
    );
};

export default AutoGainLimiter;
