#!/bin/bash

echo "Ì¥ß Fixing App.tsx and AutoMixTimelinePanel.tsx issues..."

# --- Fix 1: AutoMixTimelinePanel import issue ---
echo "‚úÖ Patching App.tsx for named import..."
sed -i 's/import AutoMixTimelinePanel/import { AutoMixTimelinePanel }/' src/App.tsx

# --- Fix 2: Declare decodedBuffer and trackMetadata state ---
echo "‚úÖ Injecting decodedBuffer and trackMetadata state..."
sed -i '/function App()/a\
  const [decodedBuffer, setDecodedBuffer] = useState<AudioBuffer | null>(null);\
  const [trackMetadata, setTrackMetadata] = useState<{ beatGrid: number[] } | null>(null);\
' src/App.tsx

# --- Fix 3: Ensure beatAnalyzer exists ---
echo "‚úÖ Creating beatAnalyzer with proper type annotations..."
mkdir -p src/audio-utils
cat > src/audio-utils/beatAnalyzer.ts <<'EOF'
export async function analyzeTrack(buffer: AudioBuffer): Promise<{
  bpm: number;
  key: string;
  beats: number[];
}> {
  // Replace this stub with actual analysis logic using a real library or backend.
  return {
    bpm: 128,
    key: "C Minor",
    beats: Array.from({ length: 32 }, (_, i) => i * 0.5)
  };
}
EOF

# --- Fix 4: Ensure firestore/tracks.ts exists ---
echo "‚úÖ Creating firestore tracks utility..."
mkdir -p src/firebase/firestore
cat > src/firebase/firestore/tracks.ts <<'EOF'
import { db } from "../config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { TrackMetadata } from "../../types/TrackMetadata";

export async function saveTrackMetadata(trackId: string, metadata: TrackMetadata) {
  const ref = doc(db, "tracks", trackId);
  await setDoc(ref, metadata, { merge: true });
}

export async function fetchTrackMetadata(trackId: string): Promise<TrackMetadata | null> {
  const ref = doc(db, "tracks", trackId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as TrackMetadata) : null;
}
EOF

# --- Fix 5: Ensure types/TrackMetadata.ts exists ---
echo "‚úÖ Creating types/TrackMetadata.ts..."
mkdir -p src/types
cat > src/types/TrackMetadata.ts <<'EOF'
export interface TrackMetadata {
  id: string;
  title: string;
  artist: string;
  bpm?: number;
  key?: string;
  beatGrid?: number[];
}
EOF

# --- Fix 6: Patch AutoMixTimelinePanel.tsx to use correct types and remove unused vars ---
echo "‚úÖ Updating AutoMixTimelinePanel.tsx..."
cat > src/components/AutoMixTimelinePanel.tsx <<'EOF'
import React, { useEffect, useState } from "react";
import { analyzeTrack } from "../audio-utils/beatAnalyzer";
import { SmartTransitionDropdown } from "../ui/SmartTransitionDropdown";
import { saveTrackMetadata } from "../firebase/firestore/tracks";
import { TrackMetadata } from "../types/TrackMetadata";

export const AutoMixTimelinePanel: React.FC = () => {
  const [trackBuffer, setTrackBuffer] = useState<AudioBuffer | null>(null);
  const [metadata, setMetadata] = useState<TrackMetadata | null>(null);
  const [transitionMode, setTransitionMode] = useState("Auto");

  useEffect(() => {
    if (trackBuffer) {
      analyzeTrack(trackBuffer).then((analysis: { bpm: number; key: string; beats: number[] }) => {
        const meta: TrackMetadata = {
          id: "track1",
          title: "Track 1",
          artist: "Unknown",
          bpm: analysis.bpm,
          key: analysis.key,
          beatGrid: analysis.beats,
        };
        saveTrackMetadata("track1", meta);
        setMetadata(meta);
      });
    }
  }, [trackBuffer]);

  return (
    <div className="p-4 bg-slate-900 text-white">
      <h2 className="text-xl font-bold mb-2">ÌæöÔ∏è AutoMix Timeline Panel</h2>
      <div className="mb-2">
        Transition Mode:{" "}
        <SmartTransitionDropdown value={transitionMode} onChange={setTransitionMode} />
      </div>
      {metadata && (
        <div className="text-sm text-green-300">
          BPM: {metadata.bpm}, Key: {metadata.key}
        </div>
      )}
    </div>
  );
};
EOF

echo "‚úÖ All fixes applied."
echo "Ì∑º You can now run: npm run dev or npm run build to confirm everything compiles cleanly."
