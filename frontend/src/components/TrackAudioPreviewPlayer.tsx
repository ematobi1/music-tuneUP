import React, { useEffect, useRef } from "react";
import { useTransport } from "../contexts/TransportContext";

interface Track {
  id: string;
  startTime: number;
  duration: number;
  audioUrl: string;
}

const TrackAudioPreviewPlayer = ({ tracks }: { tracks: Track[] }) => {
  const { position, status } = useTransport();
  const playingRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    if (status !== "playing") {
      Object.values(playingRefs.current).forEach((audio) => audio.pause());
      return;
    }

    tracks.forEach((track) => {
      if (
        position >= track.startTime &&
        position <= track.startTime + track.duration &&
        !playingRefs.current[track.id]
      ) {
        const audio = new Audio(track.audioUrl);
        audio.currentTime = Math.max(0, position - track.startTime);
        audio.play();
        playingRefs.current[track.id] = audio;
      }
    });
  }, [position, status, tracks]);

  return null;
};

export default TrackAudioPreviewPlayer;
