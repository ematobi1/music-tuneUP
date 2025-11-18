import { useState } from "react";
// import { updateFX } from "../audio/FXEngine";

interface FXSlot {
  id: string;
  name: string;
  enabled: boolean;
  value: number;
}

export const DeckFXPanel = ({ deck }: { deck: string }) => {
  const [fxChain, setFxChain] = useState<FXSlot[]>([
    { id: "1", name: "Reverb", enabled: true, value: 1 },
    { id: "2", name: "Delay", enabled: false, value: 0.2 },
  ]);

  const handleSlider = (id: string, value: number) => {
    setFxChain(prev =>
      prev.map(fx =>
        fx.id === id ? { ...fx, value } : fx
      )
    );

    const fxName = fxChain.find(fx => fx.id === id)?.name.toLowerCase();
    if (fxName === "delay" || fxName === "gain") {
      updateFX(deck, fxName, value);
    }
  };

  return (
    <div className="bg-black bg-opacity-40 p-3 rounded-xl mb-2">
      <h3 className="text-sm text-white font-bold mb-2">🎛 FX Chain - Deck {deck}</h3>
      {fxChain.map(fx => (
        <div key={fx.id} className="mb-3">
          <div className="flex justify-between text-white text-sm mb-1">
            <span>{fx.name}</span>
            <span>{(fx.value).toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={fx.value}
            onChange={(e) => handleSlider(fx.id, parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
};

export function updateFX(deck: string, fxName: string, value: number) {
  // implementation here
}

