#!/bin/bash

echo "íº€ Generating working App.tsx with AutoMixTimelinePanel + LiveRemixPanel integration..."

cat > src/App.tsx <<'EOF'
import React, { useState } from "react";
import { AutoMixTimelinePanel } from "./components/AutoMixTimelinePanel";
import { LiveRemixPanel } from "./components/LiveRemixPanel";
import "./App.css";

const App: React.FC = () => {
  const [decodedBuffer, setDecodedBuffer] = useState<AudioBuffer | null>(null);
  const [trackMetadata, setTrackMetadata] = useState<{ beatGrid: number[] } | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const audioContext = new AudioContext();
    const buffer = await audioContext.decodeAudioData(arrayBuffer);
    setDecodedBuffer(buffer);

    // Fake beat grid for demonstration
    const bpm = 128;
    const secondsPerBeat = 60 / bpm;
    const duration = buffer.duration;
    const beatCount = Math.floor(duration / secondsPerBeat);
    const beatGrid = Array.from({ length: beatCount }, (_, i) => i * secondsPerBeat);
    setTrackMetadata({ beatGrid });
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">í¾¶ MusicTuneUp DJ Studio</h1>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="mb-4 block p-2 bg-gray-800 text-white rounded"
      />

      <div className="mb-8">
        <AutoMixTimelinePanel />
      </div>

      {decodedBuffer && trackMetadata && (
        <div>
          <LiveRemixPanel trackBuffer={decodedBuffer} beatGrid={trackMetadata.beatGrid} />
        </div>
      )}
    </div>
  );
};

export default App;
EOF

echo "âœ… src/App.tsx generated successfully."
echo "í·ª You can now run 'npm run dev' and test audio upload, analysis, and remix grid!"
