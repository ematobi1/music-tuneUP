const audioCtx = new AudioContext();

const masterGain = audioCtx.createGain();
const leftGain = audioCtx.createGain();
const rightGain = audioCtx.createGain();

leftGain.connect(masterGain);
rightGain.connect(masterGain);
masterGain.connect(audioCtx.destination);

masterGain.gain.value = 0.8;
leftGain.gain.value = 1;
rightGain.gain.value = 1;

export function getAudioContext() {
  return audioCtx;
}

export function getMasterGain() {
  return masterGain;
}

export function getDeckGain(deck: "A" | "B") {
  return deck === "A" ? leftGain : rightGain;
}

export function setCrossfade(value: number) {
  leftGain.gain.value = 1 - value;
  rightGain.gain.value = value;
}

export function setMasterVolume(value: number) {
  masterGain.gain.value = value;
}
