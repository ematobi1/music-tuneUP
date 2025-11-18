const audioCtx = new AudioContext();
const masterGain = audioCtx.createGain();
masterGain.connect(audioCtx.destination);
masterGain.gain.value = 0.8;

export function useMasterVolume() {
  return {
    getAudioContext: () => audioCtx,
    getMasterGain: () => masterGain,
    setVolume: (value: number) => {
      masterGain.gain.value = value;
    },
  };
}
