import React from "react";
import { setMasterVolume, setCrossfade } from "../audio-engine/audioRouting";

const Mixer: React.FC = () => {
  return (
    <div className="p-4 bg-zinc-800 rounded text-white space-y-4">
      <div>
        <h2 className="font-bold mb-2">Master Volume</h2>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.8}
          onChange={(e) => setMasterVolume(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <h2 className="font-bold mb-2">Crossfader</h2>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.5}
          onChange={(e) => setCrossfade(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Mixer;
