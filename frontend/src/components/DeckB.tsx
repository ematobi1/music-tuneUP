import React, { useRef, useState } from "react";
import { getAudioContext, getDeckGain } from "../audio-engine/audioRouting";

const DeckB: React.FC = () => {
  const [trackName, setTrackName] = useState("");
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const handleLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTrackName(file.name);

    const buffer = await file.arrayBuffer();
    const ctx = getAudioContext();
    const decoded = await ctx.decodeAudioData(buffer);

    const source = ctx.createBufferSource();
    source.buffer = decoded;
    source.connect(getDeckGain("B"));
    source.start();
    sourceRef.current = source;
  };

  return (
    <div className="p-4 bg-zinc-800 rounded text-white">
      <h2 className="font-bold mb-2">Deck B</h2>
      <input type="file" accept="audio/*" onChange={handleLoad} className="mb-2" />
      <div className="text-sm italic">{trackName && `Playing: ${trackName}`}</div>
    </div>
  );
};

export default DeckB;
