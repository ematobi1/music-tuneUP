import { setCrossfade } from "../audio-engine/audioRouting";

export function autoFade(from: "A" | "B", to: "A" | "B", duration = 4000) {
  const start = performance.now();
  const fromValue = from === "A" ? 1 : 0;
  const toValue = to === "A" ? 1 : 0;

  function step(time: number) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = fromValue + (toValue - fromValue) * progress;
    setCrossfade(value);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
