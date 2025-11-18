import React, { useEffect, useRef, useState } from "react";
import { getAudioContext } from "../audio-engine/audioRouting";

const AdvancedFXPanel: React.FC = () => {
  const ctx = getAudioContext();
  const [delayTime, setDelayTime] = useState(0.3);
  const [reverbAmount, setReverbAmount] = useState(0.2);
  const delayRef = useRef<DelayNode>(ctx.createDelay());
  const gainRef = useRef<GainNode>(ctx.createGain());

  useEffect(() => {
    delayRef.current.delayTime.value = delayTime;
    gainRef.current.gain.value = reverbAmount;
    delayRef.current.connect(gainRef.current).connect(ctx.destination);
  }, [delayTime, reverbAmount]);

  return (
    <div className="p-2 bg-purple-900 text-white rounded">
      <h3 className="font-bold mb-2">🎛️ Advanced FX Chain</h3>
      <label className="text-sm">Delay Time ({delayTime}s)</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={delayTime}
        onChange={(e) => setDelayTime(+e.target.value)}
        className="w-full"
      />
      <label className="text-sm mt-2">Reverb Amount</label>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={reverbAmount}
        onChange={(e) => setReverbAmount(+e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default AdvancedFXPanel;
