import React, { useState } from 'react';
import DeckMeter from './DeckMeter';

type PlayerDeckProps = {
    deck: string;
};

const PlayerDeck: React.FC<PlayerDeckProps> = ({ deck }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div style={{ background: '#111', padding: '10px', borderRadius: '10px', width: '200px', boxShadow: '0 0 10px #222', color: 'white' }}>
            <DeckMeter deck={deck} />
            <h3 style={{ textAlign: 'center' }}>Deck {deck}</h3>
            <button style={{ margin: '5px' }} onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button style={{ margin: '5px' }} onClick={() => setIsPlaying(false)}>
                Stop
            </button>
        </div>
    );
};

export default PlayerDeck;
