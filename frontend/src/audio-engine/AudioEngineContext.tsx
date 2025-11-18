import React, { createContext, useContext, useEffect, useState } from "react";

interface AudioEngineContextType {
    audioContext: AudioContext | null;
    addEffect: (effectName: string) => void;
}

const AudioEngineContext = createContext<AudioEngineContextType>({
    audioContext: null,
    addEffect: () => {}
});

export const AudioEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

    useEffect(() => {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(context);
        return () => {
            context.close();
        };
    }, []);

    const addEffect = (effectName: string) => {
        console.log(`Adding effect: ${effectName}`);
        applyEffect(effectName);
    };

    return (
        <AudioEngineContext.Provider value={{ audioContext, addEffect }}>
            {children}
        </AudioEngineContext.Provider>
    );
};

export const useAudioEngine = () => useContext(AudioEngineContext);

export const setMasterGain = (...args: any[]) => console.log("Stub: setMasterGain", args);

export const crossfade = (...args: any[]) => console.log("Stub: crossfade", args);

export const triggerHotCue = (...args: any[]) => console.log("Stub: triggerHotCue", args);

export const applyEffect = (...args: any[]) => console.log("Stub: applyEffect", args);

export const syncBeats = (...args: any[]) => console.log("Stub: syncBeats", args);
