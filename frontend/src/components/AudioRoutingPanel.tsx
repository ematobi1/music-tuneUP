import React from 'react';

const AudioRoutingPanel: React.FC = () => {
    return (
        <div style={{
            backgroundColor: '#222',
            color: '#fff',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            textAlign: 'center'
        }}>
            <h3>Audio Routing</h3>
            <p>Route audio between decks, mic, and output devices.</p>
            <button style={{
                backgroundColor: '#444',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
            }}>Configure Routing</button>
        </div>
    );
};

export default AudioRoutingPanel;
