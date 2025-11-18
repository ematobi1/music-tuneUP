// src/components/DeckPresetPanel.tsx
import React from "react";
import { useDeckPresets } from "../hooks/useDeckPresets";
import { useDeckStore } from "../contexts/useDeckStore";

const DeckPresetPanel: React.FC<{ deck: "A" | "B" }> = ({ deck }) => {
  const { slot, setSlot, savePreset, loadPreset } = useDeckPresets(deck);
  const { gain, fx, setGain, setFX } = useDeckStore(deck);

  const collectFn = () => ({ gain, fx });
  const applyFn = (data: any) => {
    if (data.gain !== undefined) setGain(data.gain);
    if (data.fx !== undefined) setFX(data.fx);
  };

  return (
    <div className="p-2 bg-zinc-800 text-white rounded">
      <h4 className="font-bold">Presets - Deck {deck}</h4>
      <label>Slot:</label>
      <select
        value={slot}
        onChange={(e) => setSlot(+e.target.value)}
        className="ml-2 bg-zinc-700 rounded p-1"
      >
        {[1, 2, 3, 4, 5].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => loadPreset(applyFn)}
          className="bg-blue-600 px-2 py-1 rounded text-xs"
        >
          Load
        </button>
        <button
          onClick={() => savePreset(collectFn())}
          className="bg-green-600 px-2 py-1 rounded text-xs"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DeckPresetPanel;
