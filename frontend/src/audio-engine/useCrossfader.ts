import { useState } from "react";
import { useMasterVolume } from "./useMasterVolume";

let leftGain: GainNode | null = null;
let rightGain: GainNode | null = null;

export function initCrossfader() {
  const { getAudioContext, getMasterGain } = useMasterVolume();
  const ctx = getAudioContext();
  const master = getMasterGain();

  leftGain = ctx.createGain();
  rightGain = ctx.createGain();

  leftGain.connect(master);
  rightGain.connect(master);

  return { left: leftGain, right: rightGain };
}

export function getCrossfadeNodes() {
  return { left: leftGain, right: rightGain };
}

export function useCrossfader() {
  const [position, setPosition] = useState(0.5);

  const setCrossfade = (value: number) => {
    setPosition(value);
    if (leftGain && rightGain) {
      leftGain.gain.value = 1 - value;
      rightGain.gain.value = value;
    }
  };

  return { position, setCrossfade };
}
