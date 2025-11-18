import React from "react";

const SidePanel: React.FC = () => {
    return (
        <div style={{
            width: '180px',
            background: '#111',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            boxShadow: '0 0 10px #0ff',
            animation: 'pulseGlow 2s infinite'
        }}>
            <h3>Navigation</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>Deck A</li>
                <li>Deck B</li>
                <li>Effects</li>
                <li>Settings</li>
            </ul>
        </div>
    );
};

export default SidePanel;
