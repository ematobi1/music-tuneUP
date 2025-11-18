import React, { useState } from 'react';

const RecordBroadcastPanel: React.FC = () => {
    const [recording, setRecording] = useState(false);
    const [broadcasting, setBroadcasting] = useState(false);

    const toggleRecording = () => {
        setRecording(!recording);
        console.log(`Recording ${!recording ? "Started" : "Stopped"}`);
    };

    const toggleBroadcasting = () => {
        setBroadcasting(!broadcasting);
        console.log(`Broadcasting ${!broadcasting ? "Started" : "Stopped"}`);
    };

    return (
        <div style={{ color: 'white', padding: '10px' }}>
            <h3>Record & Broadcast</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={toggleRecording} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: recording ? '#4caf50' : '#f44336', color: 'white' }}>
                    {recording ? "Stop Recording" : "Start Recording"}
                </button>
                <button onClick={toggleBroadcasting} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: broadcasting ? '#2196f3' : '#f44336', color: 'white' }}>
                    {broadcasting ? "Stop Broadcast" : "Start Broadcast"}
                </button>
            </div>
        </div>
    );
};

export default RecordBroadcastPanel;
