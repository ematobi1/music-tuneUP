export const applyAutoGain = (audioContext: AudioContext, source: AudioNode) => {
    const gainNode = audioContext.createGain();
    const dynamicsCompressor = audioContext.createDynamicsCompressor();

    dynamicsCompressor.threshold.setValueAtTime(-24, audioContext.currentTime);
    dynamicsCompressor.knee.setValueAtTime(30, audioContext.currentTime);
    dynamicsCompressor.ratio.setValueAtTime(12, audioContext.currentTime);
    dynamicsCompressor.attack.setValueAtTime(0.003, audioContext.currentTime);
    dynamicsCompressor.release.setValueAtTime(0.25, audioContext.currentTime);

    source.connect(dynamicsCompressor);
    dynamicsCompressor.connect(gainNode);
    gainNode.connect(audioContext.destination);

    return { gainNode, dynamicsCompressor };
};
