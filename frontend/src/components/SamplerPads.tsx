import React, { useState, useRef } from "react";
import { getAudioContext } from "../audio-engine/audioRouting";

interface SampleSlot {
  name: string;
  buffer: AudioBuffer | null;
  color: string;
}

const SamplerPads: React.FC = () => {
  const ctx = getAudioContext();
  const [samples, setSamples] = useState<SampleSlot[]>([
    { name: "Pad 1", buffer: null, color: "#ff6b6b" },
    { name: "Pad 2", buffer: null, color: "#4ecdc4" },
    { name: "Pad 3", buffer: null, color: "#45b7d1" },
    { name: "Pad 4", buffer: null, color: "#f9ca24" },
    { name: "Pad 5", buffer: null, color: "#6c5ce7" },
    { name: "Pad 6", buffer: null, color: "#a29bfe" },
    { name: "Pad 7", buffer: null, color: "#fd79a8" },
    { name: "Pad 8", buffer: null, color: "#00b894" },
  ]);
  const [activePads, setActivePads] = useState<Set<number>>(new Set());

  const loadSample = async (index: number, file: File) => {
    const data = await file.arrayBuffer();
    const buffer = await ctx.decodeAudioData(data);
    const newSamples = [...samples];
    newSamples[index] = { ...newSamples[index], buffer, name: file.name };
    setSamples(newSamples);
  };

  const playSample = (index: number) => {
    const sample = samples[index];
    if (!sample.buffer) return;

    const source = ctx.createBufferSource();
    source.buffer = sample.buffer;
    source.connect(ctx.destination);
    source.start();

    setActivePads((prev) => new Set(prev).add(index));
    setTimeout(() => {
      setActivePads((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    }, 150);
  };

  return (
    <div className="sampler-pads">
      <div className="sampler-header">
        <h3>SAMPLER PADS</h3>
        <div className="sampler-controls">
          <button className="sampler-btn">BANK 1</button>
          <button className="sampler-btn">BANK 2</button>
          <button className="sampler-btn">CLEAR ALL</button>
        </div>
      </div>
      <div className="pads-grid">
        {samples.map((sample, index) => (
          <div
            key={index}
            className={`sample-pad ${activePads.has(index) ? "active" : ""} ${
              sample.buffer ? "loaded" : "empty"
            }`}
            style={{
              backgroundColor: sample.buffer
                ? sample.color
                : "rgba(255,255,255,0.1)",
            }}
            onClick={() => sample.buffer && playSample(index)}
          >
            <div className="pad-number">{index + 1}</div>
            <div className="pad-name">{sample.buffer ? sample.name : "Empty"}</div>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) loadSample(index, file);
              }}
              className="pad-file-input"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SamplerPads;
