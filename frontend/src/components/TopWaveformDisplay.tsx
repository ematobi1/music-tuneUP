import React from 'react';

const TopWaveformDisplay: React.FC = () => {
    return (
        <div style={{
            height: '80px',
            width: '100%',
            background: 'linear-gradient(to right, #4a90e2, #9013fe)',
            borderRadius: '8px',
            marginBottom: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
            <p style={{
                color: 'white',
                textAlign: 'center',
                lineHeight: '80px',
                fontWeight: 'bold',
                fontSize: '1.2rem'
            }}>
                í¾µ Waveform Timeline (Deck Master)
            </p>
        </div>
    );
};

export default TopWaveformDisplay;
