import React from "react";

export const DeckEQPanel = ({ deck }: { deck: string }) => {
  return (
    <div className="bg-gray-900 text-white p-2 rounded-xl mb-2">
      <h3 className="text-sm font-bold mb-2">í´Š EQ - Deck {deck}</h3>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <label>Bass</label>
          <input type="range" min="0" max="1" step="0.01" />
        </div>
        <div>
          <label>Mid</label>
          <input type="range" min="0" max="1" step="0.01" />
        </div>
        <div>
          <label>Treble</label>
          <input type="range" min="0" max="1" step="0.01" />
        </div>
      </div>
    </div>
  );
};
