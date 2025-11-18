import React, { useEffect, useState } from "react";
import { extractLoops } from "../audio-utils/loopExtractor";
import { RemixPad } from "../ui/RemixPad";
import { getNextBeatTime } from "../audio-utils/quantizer";

interface Props {
  trackBuffer: AudioBuffer | null;
  beatGrid: number[] | null;
  bpm?: number;
}

export const LiveRemixPanel: React.FC<Props> = ({ trackBuffer, beatGrid, bpm = 128 }) => {
  const [loops, setLoops] = useState<AudioBuffer[]>([]);
  const [audioCtx] = useState(() => new AudioContext());
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (trackBuffer && beatGrid) {
      const extracted = extractLoops(trackBuffer, beatGrid, 8);
      setLoops(extracted);
    }
  }, [trackBuffer, beatGrid]);

  const triggerQuantized = (loopBuffer: AudioBuffer, index: number) => {
    const launchTime = getNextBeatTime(audioCtx, bpm);
    const source = audioCtx.createBufferSource();
    source.buffer = loopBuffer;
    source.connect(audioCtx.destination);
    source.start(launchTime);

    setPendingIndex(index);
    setTimeout(() => {
      setPendingIndex(null);
    }, (launchTime - audioCtx.currentTime) * 1000); // Reset pending state
  };

  return (
    <div className="p-4 bg-zinc-800 text-white">
      <h2 className="text-lg font-bold mb-2">ÌæõÔ∏è Live Remix Grid (Quantized)</h2>
      <div className="grid grid-cols-4 gap-2">
        {loops.map((loop, idx) => (
          <RemixPad
            key={idx}
            label={`Loop ${idx + 1}`}
            isPending={pendingIndex === idx}
            onTrigger={() => triggerQuantized(loop, idx)}
            color="#5a67d8"
          />
        ))}
      </div>
    </div>
  );
};
