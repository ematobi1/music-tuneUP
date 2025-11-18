#!/bin/bash

echo "í³ Creating Firestore track metadata support..."

# Step 1: Create the TrackMetadata type
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
echo "âœ… Created: src/types/TrackMetadata.ts"

# Step 2: Create the firestore/tracks.ts file
mkdir -p src/firebase/firestore
cat > src/firebase/firestore/tracks.ts <<'EOF'
import { db } from "../config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type { TrackMetadata } from "../../types/TrackMetadata";

// Save metadata to Firestore
export async function saveTrackMetadata(trackId: string, metadata: TrackMetadata) {
  const ref = doc(db, "tracks", trackId);
  await setDoc(ref, metadata, { merge: true });
}

// Optional: Fetch metadata by ID
export async function fetchTrackMetadata(trackId: string): Promise<TrackMetadata | null> {
  const ref = doc(db, "tracks", trackId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as TrackMetadata) : null;
}
EOF
echo "âœ… Created: src/firebase/firestore/tracks.ts"

echo "âœ… All required files created. Restart your dev server with: npm run dev"
