import React from 'react';

interface PlayStutterButtonProps {
    onStutter: () => void;
}

const PlayStutterButton: React.FC<PlayStutterButtonProps> = ({ onStutter }) => {
    return (
        <button onClick={onStutter} style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: '1px solid #333',
            backgroundColor: '#222',
            color: '#fff',
            cursor: 'pointer',
            margin: '5px'
        }}>
            Stutter
        </button>
    );
};

export default PlayStutterButton;
