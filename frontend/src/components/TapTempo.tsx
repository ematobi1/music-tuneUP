import React, { useState, useRef } from "react";

const TapTempo: React.FC = () => {
  const [bpm, setBpm] = useState<number | null>(null);
  const [taps, setTaps] = useState<number[]>([]);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTap = () => {
    const now = Date.now();
    const newTaps = [...taps, now];

    // Clear existing reset timeout
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    // Reset if no tap for 2 seconds
    resetTimeoutRef.current = setTimeout(() => {
      setTaps([]);
      setBpm(null);
    }, 2000);

    // Need at least 2 taps to calculate BPM
    if (newTaps.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      setBpm(calculatedBpm);
    }

    // Keep only last 8 taps
    setTaps(newTaps.slice(-8));
  };

  const reset = () => {
    setTaps([]);
    setBpm(null);
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-br from-purple-900 to-indigo-900 rounded text-white">
      <h3 className="font-bold mb-2">Tap Tempo</h3>
      <div className="text-center">
        <button
          onClick={handleTap}
          className="bg-purple-500 hover:bg-purple-600 active:bg-purple-700 px-8 py-6 rounded-lg text-2xl font-bold mb-3 w-full transition-all transform hover:scale-105 active:scale-95"
        >
          TAP
        </button>
        <div className="text-3xl font-bold mb-2">
          {bpm ? `${bpm} BPM` : "- - - BPM"}
        </div>
        <div className="text-sm text-purple-300 mb-2">
          Taps: {taps.length} / 8
        </div>
        <button
          onClick={reset}
          className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TapTempo;