#!/bin/bash

echo "í¾š Fixing crossfader and master volume routing..."

# 1. useMasterVolume.ts
cat > src/audio-engine/useMasterVolume.ts <<'EOF'
const audioCtx = new AudioContext();
const masterGain = audioCtx.createGain();
masterGain.connect(audioCtx.destination);
masterGain.gain.value = 0.8;

export function useMasterVolume() {
  return {
    getAudioContext: () => audioCtx,
    getMasterGain: () => masterGain,
    setVolume: (value: number) => {
      masterGain.gain.value = value;
    },
  };
}
EOF

# 2. useCrossfader.ts
cat > src/audio-engine/useCrossfader.ts <<'EOF'
import { useState } from "react";
import { useMasterVolume } from "./useMasterVolume";

let leftGain: GainNode | null = null;
let rightGain: GainNode | null = null;

export function initCrossfader() {
  const { getAudioContext, getMasterGain } = useMasterVolume();
  const ctx = getAudioContext();
  const master = getMasterGain();

  leftGain = ctx.createGain();
  rightGain = ctx.createGain();

  leftGain.connect(master);
  rightGain.connect(master);

  return { left: leftGain, right: rightGain };
}

export function getCrossfadeNodes() {
  return { left: leftGain, right: rightGain };
}

export function useCrossfader() {
  const [position, setPosition] = useState(0.5);

  const setCrossfade = (value: number) => {
    setPosition(value);
    if (leftGain && rightGain) {
      leftGain.gain.value = 1 - value;
      rightGain.gain.value = value;
    }
  };

  return { position, setCrossfade };
}
EOF

# 3. DeckA.tsx
cat > src/components/DeckA.tsx <<'EOF'
import React, { useState, useRef } from "react";
import { useMasterVolume } from "../audio-engine/useMasterVolume";
import { getCrossfadeNodes } from "../audio-engine/useCrossfader";

const DeckA: React.FC = () => {
  const { getAudioContext } = useMasterVolume();
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

    const { left } = getCrossfadeNodes();
    if (left) {
      source.connect(left);
    } else {
      source.connect(ctx.destination);
    }

    source.start();
    sourceRef.current = source;
  };

  return (
    <div className="p-4 bg-zinc-800 rounded text-white">
      <h2 className="font-bold mb-2">Deck A</h2>
      <input type="file" accept="audio/*" onChange={handleLoad} className="mb-2" />
      <div className="text-sm italic">{trackName && `Playing: ${trackName}`}</div>
    </div>
  );
};

export default DeckA;
EOF

# 4. DeckB.tsx
cat > src/components/DeckB.tsx <<'EOF'
import React, { useState, useRef } from "react";
import { useMasterVolume } from "../audio-engine/useMasterVolume";
import { getCrossfadeNodes } from "../audio-engine/useCrossfader";

const DeckB: React.FC = () => {
  const { getAudioContext } = useMasterVolume();
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

    const { right } = getCrossfadeNodes();
    if (right) {
      source.connect(right);
    } else {
      source.connect(ctx.destination);
    }

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
EOF

# 5. Add initCrossfader to App.tsx
if ! grep -q "initCrossfader()" src/App.tsx; then
  sed -i '1i import { initCrossfader } from "./audio-engine/useCrossfader";\ninitCrossfader();' src/App.tsx
fi

echo "âœ… Crossfader + Master Volume fully wired and initialized!"
