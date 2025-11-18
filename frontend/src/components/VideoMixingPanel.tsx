import React, { useState } from 'react';

const VideoMixingPanel: React.FC = () => {
    const [videoA, setVideoA] = useState<string | null>(null);
    const [videoB, setVideoB] = useState<string | null>(null);

    return (
        <div style={{ color: 'white', background: '#222', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
            <h3>í¾¥ Video Mixing</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                    <label>Load Video A:</label>
                    <input type="file" accept="video/*" onChange={e => e.target.files && setVideoA(URL.createObjectURL(e.target.files[0]))} />
                </div>
                <div>
                    <label>Load Video B:</label>
                    <input type="file" accept="video/*" onChange={e => e.target.files && setVideoB(URL.createObjectURL(e.target.files[0]))} />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                {videoA && <video src={videoA} width="150" controls />}
                {videoB && <video src={videoB} width="150" controls />}
            </div>
        </div>
    );
};

export default VideoMixingPanel;
