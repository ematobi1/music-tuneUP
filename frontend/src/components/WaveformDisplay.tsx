import React, { useEffect, useRef } from "react";

interface Props {
  audioBuffer: AudioBuffer | null;
}

const WaveformDisplay: React.FC<Props> = ({ audioBuffer }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!audioBuffer || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const data = audioBuffer.getChannelData(0);
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    const step = Math.ceil(data.length / width);
    for (let i = 0; i < width; i++) {
      const min = Math.min(...data.slice(i * step, (i + 1) * step));
      const max = Math.max(...data.slice(i * step, (i + 1) * step));
      ctx.moveTo(i, (1 + min) * height / 2);
      ctx.lineTo(i, (1 + max) * height / 2);
    }
    ctx.strokeStyle = "#4ADE80";
    ctx.stroke();
  }, [audioBuffer]);

  return <canvas ref={canvasRef} width={300} height={80} className="mt-2" />;
};

export default WaveformDisplay;
