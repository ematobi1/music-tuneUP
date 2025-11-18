import React, { useState } from "react";

type PadMode = "hotcue" | "loop" | "slicer" | "sampler";

const PerformancePads: React.FC = () => {
  const [mode, setMode] = useState<PadMode>("hotcue");
  const [activePads, setActivePads] = useState<Set<number>>(new Set());

  const padColors = [
    "#ff3838", "#ff6b35", "#f7b731", "#5f27cd",
    "#00d2d3", "#1dd1a1", "#10ac84", "#ee5a6f"
  ];

  const padLabels: Record<PadMode, string[]> = {
    hotcue: ["CUE 1", "CUE 2", "CUE 3", "CUE 4", "CUE 5", "CUE 6", "CUE 7", "CUE 8"],
    loop: ["1 BAR", "2 BAR", "4 BAR", "8 BAR", "ROLL", "HALF", "DOUBLE", "EXIT"],
    slicer: ["SLC 1", "SLC 2", "SLC 3", "SLC 4", "SLC 5", "SLC 6", "SLC 7", "SLC 8"],
    sampler: ["SMP 1", "SMP 2", "SMP 3", "SMP 4", "SMP 5", "SMP 6", "SMP 7", "SMP 8"],
  };

  const handlePadClick = (index: number) => {
    setActivePads((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });

    console.log(`${mode.toUpperCase()} Pad ${index + 1} triggered`);
  };

  return (
    <div className="performance-pads">
      <div className="performance-header">
        <div className="mode-selector">
          <button
            className={`mode-btn ${mode === "hotcue" ? "active" : ""}`}
            onClick={() => setMode("hotcue")}
          >
            HOT CUE
          </button>
          <button
            className={`mode-btn ${mode === "loop" ? "active" : ""}`}
            onClick={() => setMode("loop")}
          >
            LOOP
          </button>
          <button
            className={`mode-btn ${mode === "slicer" ? "active" : ""}`}
            onClick={() => setMode("slicer")}
          >
            SLICER
          </button>
          <button
            className={`mode-btn ${mode === "sampler" ? "active" : ""}`}
            onClick={() => setMode("sampler")}
          >
            SAMPLER
          </button>
        </div>
      </div>
      <div className="pads-grid performance-grid">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <button
            key={index}
            className={`performance-pad ${activePads.has(index) ? "active" : ""}`}
            style={{
              backgroundColor: activePads.has(index) ? padColors[index] : "rgba(255,255,255,0.15)",
              borderColor: padColors[index],
            }}
            onClick={() => handlePadClick(index)}
          >
            <span className="pad-label">{padLabels[mode][index]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PerformancePads;
