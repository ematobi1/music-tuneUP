// src/contexts/useDeckStore.ts
import { create } from "zustand";

type FX = {
  reverb?: number;
  delay?: number;
};

interface DeckState {
  gain: number;
  fx: FX;
  setGain: (value: number) => void;
  setFX: (fx: FX) => void;
}

export const useDeckStore = (deck: "A" | "B") =>
  create<DeckState>((set) => ({
    gain: 1,
    fx: {},
    setGain: (gain) => set({ gain }),
    setFX: (fx) => set({ fx }),
  }))();
