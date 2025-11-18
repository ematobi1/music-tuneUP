import React, { useState } from "react";

type FXOptions = "Echo" | "Reverb" | "Phaser";

const CustomFxPanel = () => {
  const [fxA, setFxA] = useState<Record<FXOptions, boolean>>({
    Echo: false,
    Reverb: false,
    Phaser: false,
  });

  const [fxB, setFxB] = useState<Record<FXOptions, boolean>>({
    Echo: false,
    Reverb: false,
    Phaser: false,
  });

  const toggleFx = (
    deck: "A" | "B",
    effect: FXOptions
  ) => {
    const update = (state: Record<FXOptions, boolean>) => ({
      ...state,
      [effect]: !state[effect],
    });
    deck === "A"
      ? setFxA(update(fxA))
      : setFxB(update(fxB));
  };

  const renderFxButtons = (
    deck: "A" | "B",
    fxState: Record<FXOptions, boolean>
  ) =>
    (["Echo", "Reverb", "Phaser"] as FXOptions[]).map((fx) => (
      <button
        key={fx}
        onClick={() => toggleFx(deck, fx)}
        style={{
          backgroundColor: fxState[fx] ? "#0f0" : "#333",
          color: "#fff",
          margin: "5px",
          padding: "8px 12px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        {fx}
      </button>
    ));

  return (
    <div
      style={{
        background: "#111",
        color: "#fff",
        padding: "1rem",
        border: "1px solid #444",
        borderRadius: "8px",
        minWidth: "240px",
      }}
    >
      <h3>ÌæõÔ∏è Custom FX Rack</h3>
      <div>
        <h4>Deck A</h4>
        <div>{renderFxButtons("A", fxA)}</div>
      </div>
      <div>
        <h4>Deck B</h4>
        <div>{renderFxButtons("B", fxB)}</div>
      </div>
    </div>
  );
};

export default CustomFxPanel;
