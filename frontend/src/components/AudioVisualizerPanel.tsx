import React, { useRef, useEffect } from 'react';

const AudioVisualizerPanel: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();
                source.connect(analyser);
                analyser.fftSize = 256;

                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const draw = () => {
                    requestAnimationFrame(draw);

                    analyser.getByteFrequencyData(dataArray);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    const barWidth = (canvas.width / bufferLength) * 2.5;
                    let x = 0;

                    for (let i = 0; i < bufferLength; i++) {
                        const barHeight = dataArray[i];
                        ctx.fillStyle = `rgb(${barHeight + 100},50,50)`;
                        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
                        x += barWidth + 1;
                    }
                };

                draw();
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ backgroundColor: '#111', padding: '10px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
            <h3 style={{ color: '#fff', textAlign: 'center' }}>Audio Visualizer</h3>
            <canvas ref={canvasRef} width={300} height={100} />
        </div>
    );
};

export default AudioVisualizerPanel;
