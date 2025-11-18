import React, { useRef, useEffect } from 'react';

const AudioAnalysisPanel: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                const source = audioCtx.createMediaStreamSource(stream);
                source.connect(analyser);

                const canvas = canvasRef.current;
                if (!canvas) return;
                const canvasCtx = canvas.getContext("2d");
                if (!canvasCtx) return;

                const draw = () => {
                    requestAnimationFrame(draw);
                    analyser.getByteFrequencyData(dataArray);

                    canvasCtx.fillStyle = '#222';
                    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

                    const barWidth = (canvas.width / bufferLength) * 2.5;
                    let x = 0;

                    for (let i = 0; i < bufferLength; i++) {
                        const barHeight = dataArray[i];
                        canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
                        canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
                        x += barWidth + 1;
                    }
                };

                draw();
            })
            .catch((err) => console.error("Microphone access denied: ", err));

        return () => audioCtx.close();
    }, []);

    return (
        <div style={{ padding: '10px', background: '#222', borderRadius: '8px', marginTop: '10px' }}>
            <h4 style={{ color: 'white' }}>í¾µ Live Audio Visualizer</h4>
            <canvas ref={canvasRef} width={300} height={100} style={{ border: '1px solid white' }} />
        </div>
    );
};

export default AudioAnalysisPanel;
