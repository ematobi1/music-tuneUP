import React from 'react';

const FullscreenButton: React.FC = () => {
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <button 
            onClick={toggleFullscreen} 
            style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', background: '#333', color: 'white', cursor: 'pointer', fontSize: '14px' }}>
            Ì∂•Ô∏è Fullscreen
        </button>
    );
};

export default FullscreenButton;
