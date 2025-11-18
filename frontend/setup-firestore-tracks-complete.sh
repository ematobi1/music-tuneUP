#!/bin/bash

echo "í³ Setting up Firestore metadata support and access rules..."

# === Step 1: Create TrackMetadata type ===
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

# === Step 2: Create Firestore metadata utility ===
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

# === Step 3: Generate Firestore security rules ===
cat > firestore.rules <<'EOF'
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow only authenticated users to read/write track metadata
    match /tracks/{trackId} {
      allow read, write: if request.auth != null;
    }

    // Optional: deny everything else by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
EOF
echo "âœ… Created: firestore.rules (tracks collection secure access)"

# === Step 4: Reminder to deploy rules ===
echo "íº€ To apply Firestore rules, run: firebase deploy --only firestore:rules"
