// frontend/src/components/AdvancedPlayerDeck.tsx
import { useState, useEffect } from 'react';
import WaveSurferPlayer from '@wavesurfer/react';
import DeckControls from './DeckControls';

interface AdvancedPlayerDeckProps {
    deck: string;
}

const AdvancedPlayerDeck: React.FC<AdvancedPlayerDeckProps> = ({ deck }) => {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [wavesurfer, setWavesurfer] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (wavesurfer) {
            wavesurfer.on('audioprocess', () => {
                setCurrentTime(wavesurfer.getCurrentTime());
            });
            wavesurfer.on('ready', () => {
                setDuration(wavesurfer.getDuration());
            });
            return () => {
                wavesurfer.unAll();
            };
        }
    }, [wavesurfer]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileUrl = URL.createObjectURL(e.target.files[0]);
            setAudioUrl(fileUrl);
        }
    };

    const playPause = () => {
        if (wavesurfer) {
            wavesurfer.playPause();
            setIsPlaying(!isPlaying);
        }
    };

    const stop = () => {
        if (wavesurfer) {
            wavesurfer.stop();
            setIsPlaying(false);
        }
    };

    return (
        <div style={{
            width: '400px',
            backgroundColor: '#111',
            borderRadius: '12px',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            padding: '15px',
            margin: '10px',
            color: 'white'
        }}>
            <h3 style={{ textAlign: 'center', color: '#0f0' }}>Deck {deck}</h3>
            <input type="file" accept="audio/*" onChange={handleFileUpload} style={{ marginBottom: '10px' }} />
            {audioUrl && (
                <>
                    <WaveSurferPlayer
                        height={80}
                        waveColor="#888"
                        progressColor="#0f0"
                        url={audioUrl}
                        onReady={(ws) => setWavesurfer(ws)}
                        normalize
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <button onClick={playPause} style={{ marginRight: '10px' }}>{isPlaying ? 'Pause' : 'Play'}</button>
                        <button onClick={stop}>Stop</button>
                    </div>
                    <DeckControls deck={deck} />
                    <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
                        {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
                    </div>
                </>
            )}
        </div>
    );
};

export default AdvancedPlayerDeck;

