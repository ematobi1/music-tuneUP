import React, { useState } from 'react';

const RecordControls: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);

    const toggleRecording = () => {
        setIsRecording(!isRecording);
        alert(isRecording ? 'Recording stopped' : 'Recording started (mock)');
    };

    return (
        <div style={{ color: 'white', marginTop: '20px' }}>
            <h3>Record / Broadcast</h3>
            <button onClick={toggleRecording} style={{ backgroundColor: isRecording ? 'red' : 'green' }}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
        </div>
    );
};

export default RecordControls;
