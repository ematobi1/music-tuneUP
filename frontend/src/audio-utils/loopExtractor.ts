export function extractLoops(
  buffer: AudioBuffer,
  beatGrid: number[],
  loopLengthInBeats = 8
): AudioBuffer[] {
  const loops: AudioBuffer[] = [];
  const sampleRate = buffer.sampleRate;

  for (let i = 0; i + loopLengthInBeats < beatGrid.length; i += loopLengthInBeats) {
    const startSec = beatGrid[i];
    const endSec = beatGrid[i + loopLengthInBeats];
    const startSample = Math.floor(startSec * sampleRate);
    const endSample = Math.floor(endSec * sampleRate);
    const length = endSample - startSample;

    const loopBuffer = new AudioBuffer({
      length,
      numberOfChannels: buffer.numberOfChannels,
      sampleRate,
    });

    for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
      const source = buffer.getChannelData(ch);
      const target = loopBuffer.getChannelData(ch);
      for (let j = 0; j < length; j++) {
        target[j] = source[startSample + j];
      }
    }

    loops.push(loopBuffer);
  }

  return loops;
}
