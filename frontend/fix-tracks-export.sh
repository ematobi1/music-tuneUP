#!/bin/bash

echo "í´§ Fixing missing export in firestore/tracks.ts..."

cat > src/firebase/firestore/tracks.ts <<'EOF'
import { db } from "../config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type { TrackMetadata } from "../../types/TrackMetadata";

export async function saveTrackMetadata(trackId: string, metadata: TrackMetadata) {
  const ref = doc(db, "tracks", trackId);
  await setDoc(ref, metadata, { merge: true });
}

export async function fetchTrackMetadata(trackId: string): Promise<TrackMetadata | null> {
  const ref = doc(db, "tracks", trackId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as TrackMetadata) : null;
}

// âœ… EXPORT everything in a named object if needed
export const trackStore = {
  saveTrackMetadata,
  fetchTrackMetadata
};
EOF

echo "âœ… Fixed: firestore/tracks.ts now has valid named exports."
