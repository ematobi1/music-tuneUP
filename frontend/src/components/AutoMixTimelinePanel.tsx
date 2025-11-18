import React, { useEffect, useState } from "react";
import { analyzeTrack } from "../audio-utils/beatAnalyzer";
import { SmartTransitionDropdown } from "../ui/SmartTransitionDropdown";
import { saveTrackMetadata } from "../firebase/firestore/tracks";
import type { TrackMetadata } from "../types/TrackMetadata";

export const AutoMixTimelinePanel: React.FC = () => {
  const [trackBuffer] = useState<AudioBuffer | null>(null);
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
      <h2 className="text-xl font-bold mb-2">���️ AutoMix Timeline Panel</h2>
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

export default AutoMixTimelinePanel;
