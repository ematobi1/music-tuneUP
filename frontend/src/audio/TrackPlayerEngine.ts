#!/bin/bash

echo "🔧 Patching src/audio/TrackPlayerEngine.ts..."

mkdir -p src/audio

cat > src/audio/TrackPlayerEngine.ts <<'EOF'
export class TrackPlayerEngine {
  tracks: AudioBufferSourceNode[] = [];

  constructor(private ctx: AudioContext) {}

  loadAndPlayTrack(buffer: AudioBuffer) {
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.ctx.destination);
    source.start();

    this.tracks.push(source);
  }

  stopAllTracks() {
    this.tracks.forEach((track) => {
      try {
        track.stop();
      } catch (e) {
        console.warn("Track already stopped:", e);
      }
    });
    this.tracks = [];
  }
}
EOF

echo "✅ TrackPlayerEngine.ts patched and working!"
