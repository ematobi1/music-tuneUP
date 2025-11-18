import React, { useEffect, useState, useRef } from "react";

const AutoMixEnergyPanel: React.FC = () => {
  const [energy, setEnergy] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const analyzeEnergy = (audioCtx: AudioContext, source: AudioBufferSourceNode, buffer: AudioBuffer) => {
    const rawData = buffer.getChannelData(0); // Use first channel
    const samples = 512;
    const blockSize = Math.floor(rawData.length / samples);
    let total = 0;

    for (let i = 0; i < samples; i++) {
      const blockStart = blockSize * i;
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum += Math.abs(rawData[blockStart + j]);
      }
      total += sum / blockSize;
    }
    const avg = total / samples;
    setEnergy(avg);
  };

  useEffect(() => {
    const audioUrl = "/sample.mp3"; // Replace with actual audio path
    fetch(audioUrl)
      .then(response => response.arrayBuffer())
      .then(data => {
        const audioCtx = new AudioContext();
        return audioCtx.decodeAudioData(data).then(buffer => {
          const source = audioCtx.createBufferSource();
          source.buffer = buffer;
          source.connect(audioCtx.destination);
          analyzeEnergy(audioCtx, source, buffer);
        });
      })
      .catch(error => console.error("Audio load error:", error));
  }, []);

  const getColor = () => {
    if (energy === null) return "#666";
    if (energy < 0.01) return "#2ecc71";
    if (energy < 0.02) return "#f1c40f";
    return "#e74c3c";
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #444", borderRadius: "8px", background: "#111", color: "#fff" }}>
      <h3>ÌæöÔ∏è Auto-Mix Energy Level</h3>
      <div style={{ margin: "1rem 0", height: "20px", background: "#333", borderRadius: "4px" }}>
        <div style={{ width: `${energy ? Math.min(energy * 10000, 100) : 0}%`, background: getColor(), height: "100%", borderRadius: "4px" }}></div>
      </div>
      <p>Current energy: { energy?.toFixed(5) || "loading..." }</p>
    </div>
  );
};

export default AutoMixEnergyPanel;
