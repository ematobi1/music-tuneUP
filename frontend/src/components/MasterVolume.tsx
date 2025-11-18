import React from "react";
import { setMasterVolume } from "../audio-engine/audioRouting";

const MasterVolume: React.FC = () => {
  return (
    <div className="p-2">
      <label className="block text-sm mb-1">Master Volume</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.8}
        onChange={(e) => setMasterVolume(Number(e.target.value))}
      />
    </div>
  );
};

export default MasterVolume;
