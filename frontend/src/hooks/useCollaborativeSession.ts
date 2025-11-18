import { db } from "../firebase/firebaseConfig";
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

export function useCollaborativeSession(sessionId: string, user: any) {
  const [tracks, setTracksState] = useState<any[]>([]);
  const [cursors, setCursors] = useState<any>({});
  const historyStack = useRef<any[]>([]);
  const redoStack = useRef<any[]>([]);

  const ref = doc(db, "sessions", sessionId || "default-session");

  useEffect(() => {
    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.data();
      if (data?.tracks) setTracksState(data.tracks);
      if (data?.cursors) setCursors(data.cursors);
    });
    return () => unsub();
  }, [sessionId]);

  const setTracks = async (newTracks: any[]) => {
    historyStack.current.push(tracks);
    redoStack.current = []; // clear redo
    setTracksState(newTracks);
    await updateDoc(ref, {
      tracks: newTracks,
      history: arrayUnion({
        timestamp: Date.now(),
        user: user?.uid,
        snapshot: newTracks
      })
    });
  };

  const undo = async () => {
    if (historyStack.current.length === 0) return;
    const prev = historyStack.current.pop();
    redoStack.current.push(tracks);
    setTracksState(prev);
    await updateDoc(ref, { tracks: prev });
  };

  const redo = async () => {
    if (redoStack.current.length === 0) return;
    const next = redoStack.current.pop();
    historyStack.current.push(tracks);
    setTracksState(next);
    await updateDoc(ref, { tracks: next });
  };

  const updateCursor = async (position: number) => {
    if (!user?.uid) return;
    await updateDoc(ref, {
      [`cursors.${user.uid}`]: {
        name: user.displayName || "Guest",
        position,
        lastSeen: Date.now(),
        color: user.uid.slice(-6)
      }
    });
  };

  return { tracks, setTracks, cursors, updateCursor, undo, redo };
}
