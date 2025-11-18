import React from 'react';

const AudioExportPanel: React.FC = () => {
    const handleExport = () => {
        // Replace with actual export logic
        alert("í¾µ Audio exported as file! (mocked)");
    };

    return (
        <div style={{ border: '1px solid #555', padding: '8px', borderRadius: '6px', background: '#111', color: '#fff', textAlign: 'center' }}>
            <h4>í¾§ Export Audio</h4>
            <button onClick={handleExport} style={{ padding: '6px 12px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}>Download Mix</button>
        </div>
    );
};

export default AudioExportPanel;
