import React from "react";
import { autoFade } from "../utils/autoFade";

const AutoFadeButton: React.FC = () => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => autoFade("A", "B", 5000)}
        className="bg-blue-600 px-4 py-1 rounded text-white"
      >
        Auto-Fade A → B
      </button>
      <button
        onClick={() => autoFade("B", "A", 5000)}
        className="bg-purple-600 px-4 py-1 rounded text-white"
      >
        Auto-Fade B → A
      </button>
    </div>
  );
};

export default AutoFadeButton;
