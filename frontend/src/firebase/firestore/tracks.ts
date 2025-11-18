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
