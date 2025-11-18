import React, { useState } from "react";

type Mix = {
  id: string;
  title: string;
  score: number;
};

const ABMixTestingPanel: React.FC = () => {
  const [mixA, setMixA] = useState<Mix | null>(null);
  const [mixB, setMixB] = useState<Mix | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const generateRandomScore = () => Math.floor(Math.random() * 100);

  const handleCompare = () => {
    if (!mixA || !mixB) return;
    const result = mixA.score > mixB.score ? "Mix A" : "Mix B";
    setWinner(result);
  };

  const handleGenerate = () => {
    setWinner(null);
    setMixA({ id: "A", title: "Mix A", score: generateRandomScore() });
    setMixB({ id: "B", title: "Mix B", score: generateRandomScore() });
  };

  return (
    <div style={{ background: "#222", color: "#fff", padding: "1rem", borderRadius: "8px" }}>
      <h3>Ì∑™ A/B Testing: AI Mix Scoring</h3>
      <button onClick={handleGenerate} style={{ marginBottom: "1rem", padding: "8px 16px" }}>
        Ìæ≤ Generate Mixes
      </button>
      {mixA && mixB && (
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "1rem" }}>
          <div>
            <h4>{mixA.title}</h4>
            <p>Score: {mixA.score}</p>
          </div>
          <div>
            <h4>{mixB.title}</h4>
            <p>Score: {mixB.score}</p>
          </div>
        </div>
      )}
      {mixA && mixB && (
        <button onClick={handleCompare} style={{ padding: "8px 16px" }}>
          ‚öñÔ∏è Compare
        </button>
      )}
      {winner && <p style={{ marginTop: "1rem" }}>ÌøÜ Winner: <strong>{winner}</strong></p>}
    </div>
  );
};

export default ABMixTestingPanel;
