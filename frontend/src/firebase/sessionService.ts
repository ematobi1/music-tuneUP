import { doc, setDoc } from "firebase/firestore";
import { db } from "./config";

export async function saveFXState(sessionId: string, data: any) {
  await setDoc(doc(db, "sessions", sessionId), data, { merge: true });
}

export async function saveDeckFXPreset(deck: string, settings: any) {
  const docRef = doc(db, "deckPresets", deck);
  await setDoc(docRef, settings, { merge: true });
}

export async function loadDeckFXPreset(deck: string): Promise<any> {
  const docRef = doc(db, "deckPresets", deck);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
}

export async function loadPresetsForSession(sessionId: string) {
  const deckA = await loadDeckFXPreset("A");
  const deckB = await loadDeckFXPreset("B");
  const eqA = await loadDeckFXPreset("A-eq");
  const eqB = await loadDeckFXPreset("B-eq");
  return { deckA, deckB, eqA, eqB };
}

export async function saveDeckPresetSlot(deck: string, slot: number, data: any) {
  const id = `${deck}-slot-${slot}`;
  await setDoc(doc(db, "deckPresets", id), data, { merge: true });
}

export async function loadDeckPresetSlot(deck: string, slot: number): Promise<any> {
  const id = `${deck}-slot-${slot}`;
  const snapshot = await getDoc(doc(db, "deckPresets", id));
  return snapshot.exists() ? snapshot.data() : null;
}
