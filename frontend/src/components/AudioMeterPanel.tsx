import React, { useEffect, useRef } from 'react';

const AudioMeterPanel: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !navigator.mediaDevices) return;

        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const source = audioCtx.createMediaStreamSource(stream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const draw = () => {
                requestAnimationFrame(draw);
                analyser.getByteFrequencyData(dataArray);

                if (!canvas) return;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const barWidth = (canvas.width / bufferLength) * 2.5;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    const barHeight = dataArray[i] / 2;
                    ctx.fillStyle = `rgb(${barHeight + 100},50,50)`;
                    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                    x += barWidth + 1;
                }
            };
            draw();
        });
    }, []);

    return (
        <div style={{ padding: '10px', backgroundColor: '#222', borderRadius: '8px' }}>
            <h4 style={{ color: '#fff' }}>Audio Meter</h4>
            <canvas ref={canvasRef} width={300} height={100} style={{ background: '#000' }} />
        </div>
    );
};

export default AudioMeterPanel;
