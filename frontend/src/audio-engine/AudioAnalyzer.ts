export const analyzeAudio = async (file: File): Promise<{ bpm: number }> => {
    // Placeholder mock: Random BPM between 80 and 140
    return new Promise((resolve) => {
        setTimeout(() => resolve({ bpm: Math.floor(Math.random() * 60) + 80 }), 500);
    });
};
