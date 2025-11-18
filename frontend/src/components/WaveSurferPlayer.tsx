import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveSurferPlayerProps {
    audioUrl: string;
}

const WaveSurferPlayer: React.FC<WaveSurferPlayerProps> = ({ audioUrl }) => {
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);

    useEffect(() => {
        if (waveformRef.current) {
            wavesurferRef.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#888',
                progressColor: '#4CAF50',
                cursorColor: '#4CAF50',
                height: 100,
                barWidth: 2
            });

            wavesurferRef.current.load(audioUrl);

            return () => wavesurferRef.current?.destroy();
        }
    }, [audioUrl]);

    return <div ref={waveformRef} style={{ width: '100%', marginTop: '10px' }} />;
};

export default WaveSurferPlayer;
