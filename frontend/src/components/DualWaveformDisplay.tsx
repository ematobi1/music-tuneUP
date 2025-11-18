import React, { useEffect, useRef } from "react";

interface DualWaveformDisplayProps {
  deckABuffer: AudioBuffer | null;
  deckBBuffer: AudioBuffer | null;
  deckAProgress?: number;
  deckBProgress?: number;
}

const DualWaveformDisplay: React.FC<DualWaveformDisplayProps> = ({
  deckABuffer,
  deckBBuffer,
  deckAProgress = 0,
  deckBProgress = 0,
}) => {
  const canvasARef = useRef<HTMLCanvasElement>(null);
  const canvasBRef = useRef<HTMLCanvasElement>(null);

  const drawWaveform = (
    canvas: HTMLCanvasElement,
    buffer: AudioBuffer | null,
    progress: number,
    color: string
  ) => {
    if (!buffer) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const data = buffer.getChannelData(0);
    const step = Math.ceil(data.length / width);
    const amp = height / 2;

    ctx.fillStyle = "#0a0e27";
    ctx.fillRect(0, 0, width, height);

    // Draw beat grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += width / 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }

    // Draw waveform
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color;
    ctx.beginPath();

    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;

      for (let j = 0; j < step; j++) {
        const datum = data[i * step + j] || 0;
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }

      ctx.lineTo(i, (1 + min) * amp);
    }

    for (let i = width - 1; i >= 0; i--) {
      let min = 1.0;
      let max = -1.0;

      for (let j = 0; j < step; j++) {
        const datum = data[i * step + j] || 0;
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }

      ctx.lineTo(i, (1 + max) * amp);
    }

    ctx.closePath();
    ctx.fillStyle = color.replace(")", ", 0.3)").replace("rgb", "rgba");
    ctx.fill();
    ctx.stroke();

    // Draw playhead
    const playheadX = (progress / 100) * width;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(playheadX, 0);
    ctx.lineTo(playheadX, height);
    ctx.stroke();

    // Draw center line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
  };

  useEffect(() => {
    if (canvasARef.current) {
      drawWaveform(canvasARef.current, deckABuffer, deckAProgress, "rgb(0, 200, 255)");
    }
  }, [deckABuffer, deckAProgress]);

  useEffect(() => {
    if (canvasBRef.current) {
      drawWaveform(canvasBRef.current, deckBBuffer, deckBProgress, "rgb(255, 100, 100)");
    }
  }, [deckBBuffer, deckBProgress]);

  return (
    <div className="dual-waveform-display">
      <div className="waveform-deck deck-a">
        <div className="deck-label">DECK A</div>
        <canvas ref={canvasARef} width={800} height={120} className="waveform-canvas" />
      </div>
      <div className="waveform-deck deck-b">
        <div className="deck-label">DECK B</div>
        <canvas ref={canvasBRef} width={800} height={120} className="waveform-canvas" />
      </div>
    </div>
  );
};

export default DualWaveformDisplay;
