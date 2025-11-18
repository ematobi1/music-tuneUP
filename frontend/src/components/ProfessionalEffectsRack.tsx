import React, { useState } from "react";

interface Effect {
  name: string;
  active: boolean;
  params: { [key: string]: number };
}

const ProfessionalEffectsRack: React.FC = () => {
  const [effects, setEffects] = useState<Effect[]>([
    { name: "Filter", active: false, params: { cutoff: 50, resonance: 0 } },
    { name: "Delay", active: false, params: { time: 50, feedback: 30, mix: 50 } },
    { name: "Reverb", active: false, params: { room: 50, damp: 50, mix: 30 } },
    { name: "Phaser", active: false, params: { rate: 50, depth: 50, feedback: 30 } },
    { name: "Flanger", active: false, params: { rate: 40, depth: 60, mix: 50 } },
    { name: "Bitcrusher", active: false, params: { bits: 8, rate: 50 } },
  ]);

  const [selectedEffect, setSelectedEffect] = useState(0);

  const toggleEffect = (index: number) => {
    const newEffects = [...effects];
    newEffects[index].active = !newEffects[index].active;
    setEffects(newEffects);
    console.log(`${newEffects[index].name} ${newEffects[index].active ? "ON" : "OFF"}`);
  };

  const updateParam = (effectIndex: number, param: string, value: number) => {
    const newEffects = [...effects];
    newEffects[effectIndex].params[param] = value;
    setEffects(newEffects);
  };

  const currentEffect = effects[selectedEffect];

  return (
    <div className="professional-effects-rack">
      <div className="effects-header">
        <h3>EFFECTS RACK</h3>
        <button className="fx-rack-btn">PRESET</button>
      </div>

      <div className="effects-selector">
        {effects.map((effect, index) => (
          <button
            key={index}
            className={`effect-slot ${effect.active ? "active" : ""} ${
              selectedEffect === index ? "selected" : ""
            }`}
            onClick={() => setSelectedEffect(index)}
            onDoubleClick={() => toggleEffect(index)}
          >
            <div className="effect-name">{effect.name}</div>
            <div className={`effect-status ${effect.active ? "on" : "off"}`}>
              {effect.active ? "ON" : "OFF"}
            </div>
          </button>
        ))}
      </div>

      <div className="effect-controls">
        <div className="effect-title">{currentEffect.name.toUpperCase()} CONTROLS</div>
        <div className="effect-params">
          {Object.entries(currentEffect.params).map(([param, value]) => (
            <div key={param} className="param-control">
              <label className="param-label">{param.toUpperCase()}</label>
              <input
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={(e) =>
                  updateParam(selectedEffect, param, Number(e.target.value))
                }
                className="param-slider"
              />
              <span className="param-value">{value}%</span>
            </div>
          ))}
        </div>
        <div className="effect-actions">
          <button
            className={`fx-power-btn ${currentEffect.active ? "active" : ""}`}
            onClick={() => toggleEffect(selectedEffect)}
          >
            {currentEffect.active ? "DISABLE" : "ENABLE"}
          </button>
          <button className="fx-reset-btn">RESET</button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalEffectsRack;
