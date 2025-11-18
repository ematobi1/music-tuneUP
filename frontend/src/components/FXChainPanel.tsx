import React, { useState } from "react";

const FXChainPanel: React.FC = () => {
  const [fxList, setFxList] = useState<string[]>([]);
  const [newFx, setNewFx] = useState("");

  const addFx = () => {
    if (newFx.trim()) {
      setFxList((prev) => [...prev, newFx.trim()]);
      setNewFx("");
    }
  };

  const removeFx = (index: number) => {
    setFxList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 bg-zinc-800 text-white rounded">
      <h3 className="font-bold mb-2">🎚 FX Chain</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newFx}
          onChange={(e) => setNewFx(e.target.value)}
          className="p-1 rounded text-black"
          placeholder="Add FX (e.g., Reverb)"
        />
        <button
          onClick={addFx}
          className="bg-green-600 px-3 py-1 rounded text-sm"
        >
          Add
        </button>
      </div>
      <ul className="space-y-1">
        {fxList.map((fx, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-zinc-700 px-2 py-1 rounded"
          >
            <span>{fx}</span>
            <button
              onClick={() => removeFx(idx)}
              className="bg-red-600 px-2 py-0.5 rounded text-xs"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FXChainPanel;
