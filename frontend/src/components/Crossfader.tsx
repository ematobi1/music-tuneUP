import React from "react";
import { setCrossfade } from "../audio-engine/audioRouting";

const Crossfader: React.FC = () => {
  return (
    <div className="p-2">
      <label className="block text-sm mb-1">Crossfader</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.5}
        onChange={(e) => setCrossfade(Number(e.target.value))}
      />
    </div>
  );
};

export default Crossfader;
