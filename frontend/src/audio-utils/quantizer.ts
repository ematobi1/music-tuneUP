export function getNextBeatTime(audioCtx: AudioContext, bpm: number): number {
  const secondsPerBeat = 60 / bpm;
  const now = audioCtx.currentTime;
  const nextBeat = now + (secondsPerBeat - (now % secondsPerBeat));
  return nextBeat;
}
