import React, { useState } from 'react';

interface HotCuesAndLoopsProps {
  deck: 'A' | 'B';
}

const HotCuesAndLoops: React.FC<HotCuesAndLoopsProps> = ({ deck }) => {
  const [hotCues, setHotCues] = useState<number[]>([]);
  const [loops, setLoops] = useState<{ start: number; end: number }[]>([]);

  const addHotCue = () => {
    const time = prompt('Enter hot cue time in seconds:');
    if (time) {
      setHotCues([...hotCues, parseFloat(time)]);
    }
  };

  const addLoop = () => {
    const start = prompt('Enter loop start time in seconds:');
    const end = prompt('Enter loop end time in seconds:');
    if (start && end) {
      setLoops([...loops, { start: parseFloat(start), end: parseFloat(end) }]);
    }
  };

  return (
    <div style={{ color: 'white', marginTop: '20px' }}>
      <h3>Hot Cues & Loops - Deck {deck}</h3>
      <button onClick={addHotCue}>Add Hot Cue</button>
      <button onClick={addLoop}>Add Loop</button>
      <div>
        <h4>Hot Cues:</h4>
        <ul>
          {hotCues.map((cue, index) => (
            <li key={index}>Cue {index + 1}: {cue}s</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Loops:</h4>
        <ul>
          {loops.map((loop, index) => (
            <li key={index}>Loop {index + 1}: {loop.start}s - {loop.end}s</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HotCuesAndLoops;
