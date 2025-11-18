import React, { useEffect, useRef } from "react";

const AudioVisualizationPanel: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const bars = 50;
            const barWidth = canvas.width / bars;
            for (let i = 0; i < bars; i++) {
                const height = Math.random() * canvas.height;
                ctx.fillStyle = `hsl(${(i / bars) * 360}, 100%, 50%)`;
                ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 2, height);
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div style={{ width: "300px", height: "150px", border: "1px solid #666", backgroundColor: "#111", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <canvas ref={canvasRef} width={280} height={120} />
        </div>
    );
};

export default AudioVisualizationPanel;
