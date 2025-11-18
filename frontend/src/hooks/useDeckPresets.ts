import { useState } from "react";

export function useDeckPresets(deck: string) {
  const [slot, setSlot] = useState(1);

  const storageKey = (n: number) => `deck-${deck}-preset-${n}`;

  const savePreset = (data: any) => {
    localStorage.setItem(storageKey(slot), JSON.stringify(data));
  };

  const loadPreset = (apply: (data: any) => void) => {
    const raw = localStorage.getItem(storageKey(slot));
    if (raw) {
      apply(JSON.parse(raw));
    }
  };

  return { slot, setSlot, savePreset, loadPreset };
}
