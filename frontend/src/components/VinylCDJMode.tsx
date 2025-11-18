import React, { useState } from "react";

interface VinylCDJModeProps {
  deck: "A" | "B";
}

const VinylCDJMode: React.FC<VinylCDJModeProps> = ({ deck }) => {
  const [mode, setMode] = useState<"vinyl" | "cdj">("cdj");
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [pitchBend, setPitchBend] = useState(0);

  const handleScratch = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode === "vinyl") {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      setRotation((angle * 180) / Math.PI);
      console.log(`Deck ${deck} Scratching at ${angle.toFixed(2)} rad`);
    }
  };

  return (
    <div className={`vinyl-cdj-mode deck-${deck.toLowerCase()}`}>
      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === "vinyl" ? "active" : ""}`}
          onClick={() => setMode("vinyl")}
        >
          VINYL
        </button>
        <button
          className={`mode-btn ${mode === "cdj" ? "active" : ""}`}
          onClick={() => setMode("cdj")}
        >
          CDJ
        </button>
      </div>

      <div
        className={`platter ${mode} ${isSpinning ? "spinning" : ""}`}
        style={{ transform: `rotate(${rotation}deg)` }}
        onMouseMove={handleScratch}
        onMouseDown={() => setIsSpinning(true)}
        onMouseUp={() => setIsSpinning(false)}
        onMouseLeave={() => setIsSpinning(false)}
      >
        <div className="platter-center">
          <div className="platter-logo">DECK {deck}</div>
        </div>
        <div className="platter-sticker"></div>
        <div className="platter-dots">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="platter-dot"
              style={{ transform: `rotate(${i * 6}deg) translateY(-90px)` }}
            />
          ))}
        </div>
      </div>

      <div className="pitch-controls">
        <div className="pitch-label">PITCH</div>
        <div className="pitch-display">{pitchBend > 0 ? "+" : ""}{pitchBend.toFixed(1)}%</div>
        <input
          type="range"
          min={-8}
          max={8}
          step={0.1}
          value={pitchBend}
          onChange={(e) => setPitchBend(Number(e.target.value))}
          className="pitch-slider vertical-slider"
          orient="vertical"
        />
        <div className="pitch-buttons">
          <button className="pitch-btn" onClick={() => setPitchBend(0)}>
            RESET
          </button>
          <button className="pitch-btn">SYNC</button>
          <button className="pitch-btn">MASTER</button>
        </div>
      </div>

      <div className="transport-controls">
        <button className="transport-btn cue-btn">CUE</button>
        <button className="transport-btn play-btn">PLAY</button>
        <button className="transport-btn sync-btn">SYNC</button>
      </div>
    </div>
  );
};

export default VinylCDJMode;
