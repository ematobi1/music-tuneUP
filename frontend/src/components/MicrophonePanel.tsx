import React, { useState } from 'react';

const MicrophonePanel: React.FC = () => {
    const [enabled, setEnabled] = useState(false);
    const [talkover, setTalkover] = useState(false);

    const toggleMic = () => {
        setEnabled(!enabled);
        console.log(`Microphone ${!enabled ? "Enabled Ìæ§" : "Disabled"}`);
    };

    const toggleTalkover = () => {
        setTalkover(!talkover);
        console.log(`Talkover ${!talkover ? "Enabled ÌæôÔ∏è" : "Disabled"}`);
    };

    return (
        <div style={{ padding: '10px', background: '#222', borderRadius: '8px', marginTop: '10px' }}>
            <h4 style={{ color: 'white' }}>Microphone Input</h4>
            <button onClick={toggleMic} style={{ marginRight: '10px' }}>
                {enabled ? 'Disable Mic' : 'Enable Mic'}
            </button>
            <button onClick={toggleTalkover}>
                {talkover ? 'Disable Talkover' : 'Enable Talkover'}
            </button>
        </div>
    );
};

export default MicrophonePanel;
