import React, { useEffect, useState } from 'react';

type DeckMeterProps = {
    deck: string;
};

const DeckMeter: React.FC<DeckMeterProps> = ({ deck }) => {
    const [level, setLevel] = useState(0);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLevel(Math.random()); // Simulate random levels
            setTime((prev) => (prev >= 300 ? 0 : prev + 1));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginBottom: '10px', color: 'white' }}>
            <h4>Deck {deck}</h4>
            <div style={{ background: '#333', width: '30px', height: '100px', margin: '0 auto', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: `${level * 100}%`, background: 'lime', transition: 'height 0.2s ease' }}></div>
            </div>
            <span style={{ fontSize: '14px' }}>Time: {Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}</span>
        </div>
    );
};

export default DeckMeter;
