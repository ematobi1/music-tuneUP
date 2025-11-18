import React, { useState } from 'react';

type DeckControlsProps = {
  deckName: string;
  onSync: () => void;
  onPitchChange: (value: number) => void;
};

const DeckControls: React.FC<DeckControlsProps> = ({ deckName, onSync, onPitchChange }) => {
  const [pitch, setPitch] = useState(0);

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPitch(value);
    onPitchChange(value);
  };

  return (
    <div style={{ margin: '10px', textAlign: 'center', color: 'white' }}>
      <h4>{deckName} Controls</h4>
      <button onClick={onSync}>SYNC</button>
      <div>
        <label>Pitch: {pitch}%</label>
        <input
          type="range"
          min="-10"
          max="10"
          step="0.1"
          value={pitch}
          onChange={handlePitchChange}
        />
      </div>
    </div>
  );
};

export default DeckControls;
