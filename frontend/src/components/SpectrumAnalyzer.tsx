import React, { useEffect, useRef } from "react";

interface SpectrumAnalyzerProps {
  analyserNode: AnalyserNode | null;
  width?: number;
  height?: number;
}

const SpectrumAnalyzer: React.FC<SpectrumAnalyzerProps> = ({
  analyserNode,
  width = 400,
  height = 150,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!analyserNode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    analyserNode.fftSize = 256;
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      analyserNode.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgb(20, 20, 30)";
      ctx.fillRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height;

        const r = barHeight + 25 * (i / bufferLength);
        const g = 250 * (i / bufferLength);
        const b = 50;

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  }, [analyserNode, width, height]);

  return (
    <div className="p-2 bg-zinc-900 rounded">
      <h4 className="text-white text-sm mb-2 font-semibold">Spectrum Analyzer</h4>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded border border-zinc-700"
      />
    </div>
  );
};

export default SpectrumAnalyzer;