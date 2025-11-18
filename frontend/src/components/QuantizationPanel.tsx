import React from "react";
import { useQuantization } from "../contexts/QuantizationContext";

const options = ["1/8", "1/4", "1/2", "1", "2", "4"] as const;

const QuantizationPanel: React.FC = () => {
  const { quantization, setQuantization } = useQuantization();

  return (
    <div className="p-3 bg-zinc-700 rounded text-white">
      <label className="mr-2 font-semibold">Quantization:</label>
      <select
        value={quantization}
        onChange={(e) => setQuantization(e.target.value as typeof options[number])}
        className="bg-zinc-900 border px-2 py-1 rounded"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt} beat</option>
        ))}
      </select>
    </div>
  );
};

export default QuantizationPanel;
