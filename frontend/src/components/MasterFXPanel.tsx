import React, { useEffect, useRef, useState } from "react";
import { getAudioContext } from "../audio-engine/audioRouting";

const MasterFXPanel: React.FC = () => {
  const ctx = getAudioContext();
  const [type, setType] = useState<BiquadFilterType>("lowpass");
  const filterRef = useRef<BiquadFilterNode>(ctx.createBiquadFilter());
  const gainRef = useRef<GainNode>(ctx.createGain());

  useEffect(() => {
    const filter = filterRef.current;
    const gain = gainRef.current;
    filter.type = type;
    filter.frequency.value = 10000;
    gain.gain.value = 1;
    ctx.destination.disconnect();
    filter.connect(gain).connect(ctx.destination);
  }, [type]);

  return (
    <div className="p-2 bg-zinc-700 rounded text-white">
      <h3 className="font-bold">Master FX</h3>
      <label className="text-sm block">Effect Type</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value as BiquadFilterType)}
        className="bg-zinc-800 p-1 rounded text-white"
      >
        <option value="lowpass">Lowpass</option>
        <option value="highpass">Highpass</option>
        <option value="bandpass">Bandpass</option>
        <option value="notch">Notch</option>
      </select>
      <label className="block text-sm mt-2">Cutoff</label>
      <input
        type="range"
        min="100"
        max="15000"
        step="100"
        defaultValue={10000}
        onChange={(e) => (filterRef.current.frequency.value = +e.target.value)}
      />
    </div>
  );
};

export default MasterFXPanel;
