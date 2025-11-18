import React, { useRef, useState, useEffect } from "react";
import { getAudioContext, getDeckGain } from "../audio-engine/audioRouting";
import WaveformDisplay from "./WaveformDisplay";

interface Props {
  deck: "A" | "B";
}

const AdvancedPlayerDeck: React.FC<Props> = ({ deck }) => {
  const [trackName, setTrackName] = useState("");
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const ctx = getAudioContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [offset, setOffset] = useState(0);
  const [cuePoint, setCuePoint] = useState<number | null>(null);
  const [hotCues, setHotCues] = useState<(number | null)[]>([null, null, null, null]);
  const [loopStart, setLoopStart] = useState<number | null>(null);
  const [loopEnd, setLoopEnd] = useState<number | null>(null);
  const [isLooping, setIsLooping] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [eqLow, setEqLow] = useState(0);
  const [eqMid, setEqMid] = useState(0);
  const [eqHigh, setEqHigh] = useState(0);
  const [vuLevel, setVuLevel] = useState(0);
  const [jogRotation, setJogRotation] = useState(0);
  const lowShelfRef = useRef<BiquadFilterNode | null>(null);
  const midPeakRef = useRef<BiquadFilterNode | null>(null);
  const highShelfRef = useRef<BiquadFilterNode | null>(null);
  const loopTimeoutRef = useRef<number | null>(null);

  const deckColor = deck === "A" ? "#00d4ff" : "#ff6b00";
  const deckColorDark = deck === "A" ? "#0099cc" : "#cc5500";

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const loadTrack = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTrackName(file.name.replace(/\.[^/.]+$/, ""));
    const data = await file.arrayBuffer();
    const decoded = await ctx.decodeAudioData(data);
    setBuffer(decoded);
    setDuration(decoded.duration);
    setOffset(0);
    setHotCues([null, null, null, null]);
    setCuePoint(0);
    playFrom(0, decoded);
  };

  const playFrom = (offsetSec: number, decodedBuffer?: AudioBuffer) => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current = null;
    }

    const source = ctx.createBufferSource();
    const analyserNode = ctx.createAnalyser();
    analyserNode.fftSize = 256;
    setAnalyser(analyserNode);

    const lowShelf = ctx.createBiquadFilter();
    const midPeak = ctx.createBiquadFilter();
    const highShelf = ctx.createBiquadFilter();

    lowShelf.type = "lowshelf";
    lowShelf.frequency.value = 320;
    lowShelf.gain.value = eqLow;

    midPeak.type = "peaking";
    midPeak.frequency.value = 1000;
    midPeak.Q.value = 0.5;
    midPeak.gain.value = eqMid;

    highShelf.type = "highshelf";
    highShelf.frequency.value = 3200;
    highShelf.gain.value = eqHigh;

    lowShelfRef.current = lowShelf;
    midPeakRef.current = midPeak;
    highShelfRef.current = highShelf;

    source.buffer = decodedBuffer || buffer;
    if (!source.buffer) return;

    source.playbackRate.value = playbackRate;

    source.connect(lowShelf);
    lowShelf.connect(midPeak);
    midPeak.connect(highShelf);
    highShelf.connect(analyserNode);
    analyserNode.connect(getDeckGain(deck));
    source.start(0, offsetSec);

    sourceRef.current = source;
    setStartTime(ctx.currentTime - offsetSec / playbackRate);
    setIsPlaying(true);
  };

  const stopTrack = () => {
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
    sourceRef.current?.stop();
    sourceRef.current = null;
    setIsPlaying(false);
    setIsLooping(false);
    setOffset(0);
    setProgress(0);
    setElapsed(0);
  };

  const togglePause = () => {
    if (!buffer) return;
    if (!isPlaying) {
      playFrom(offset);
    } else {
      const currentElapsed = (ctx.currentTime - startTime) * playbackRate;
      setOffset(currentElapsed);
      sourceRef.current?.stop();
      sourceRef.current = null;
      setIsPlaying(false);
    }
  };

  const setCue = () => setCuePoint(elapsed);
  const jumpToCue = () => {
    if (cuePoint !== null) {
      setOffset(cuePoint);
      if (isPlaying) {
        playFrom(cuePoint);
      } else {
        setElapsed(cuePoint);
        setProgress((cuePoint / duration) * 100);
      }
    }
  };

  const setHotCue = (index: number) => {
    const newCues = [...hotCues];
    newCues[index] = elapsed;
    setHotCues(newCues);
  };

  const jumpToHotCue = (index: number) => {
    const cue = hotCues[index];
    if (cue !== null) {
      setOffset(cue);
      playFrom(cue);
    }
  };

  const toggleLoop = (loopLength: number) => {
    if (isLooping) {
      setIsLooping(false);
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
        loopTimeoutRef.current = null;
      }
    } else {
      setLoopStart(elapsed);
      setLoopEnd(elapsed + loopLength);
      setIsLooping(true);
    }
  };

  useEffect(() => {
    if (isLooping && loopStart !== null && loopEnd !== null && isPlaying) {
      const checkLoop = () => {
        if (elapsed >= loopEnd) {
          playFrom(loopStart);
        }
        loopTimeoutRef.current = window.setTimeout(checkLoop, 50);
      };
      checkLoop();
      return () => {
        if (loopTimeoutRef.current) {
          clearTimeout(loopTimeoutRef.current);
        }
      };
    }
  }, [isLooping, loopStart, loopEnd, isPlaying, elapsed]);

  useEffect(() => {
    let raf: number;
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    const updateProgress = () => {
      if (isPlaying) {
        const elapsedTime = (ctx.currentTime - startTime) * playbackRate;
        setElapsed(elapsedTime);
        setProgress((elapsedTime / duration) * 100);
        setJogRotation((prev) => prev + 2);

        if (analyser && dataArray) {
          analyser.getByteFrequencyData(dataArray);
          const max = Math.max(...dataArray);
          setVuLevel(max / 255);
        }
      }
      raf = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, startTime, duration, playbackRate, analyser]);

  const renderVUMeter = () => {
    const segments = 12;
    return (
      <div className="flex flex-col gap-0.5 h-32">
        {Array.from({ length: segments }).map((_, i) => {
          const segmentLevel = 1 - i / segments;
          const isActive = vuLevel >= segmentLevel;
          let bgColor = "#333";
          if (isActive) {
            if (segmentLevel > 0.8) bgColor = "#ff3838";
            else if (segmentLevel > 0.6) bgColor = "#ffaa00";
            else bgColor = "#00ff88";
          }
          return (
            <div
              key={i}
              className="w-3 h-2 rounded-sm"
              style={{ backgroundColor: bgColor }}
            />
          );
        })}
      </div>
    );
  };

  const renderEQKnob = (
    label: string,
    value: number,
    onChange: (val: number) => void
  ) => (
    <div className="flex flex-col items-center">
      <span className="text-xs text-gray-400 mb-1">{label}</span>
      <div className="relative w-10 h-10">
        <div
          className="w-full h-full rounded-full border-2 flex items-center justify-center cursor-pointer"
          style={{ borderColor: deckColor, background: "#1a1a1a" }}
        >
          <div
            className="w-1 h-3 rounded"
            style={{
              backgroundColor: deckColor,
              transform: `rotate(${value * 12}deg)`,
              transformOrigin: "bottom center",
            }}
          />
        </div>
      </div>
      <input
        type="range"
        min={-12}
        max={12}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-12 h-1 mt-1 opacity-0 cursor-pointer"
        style={{ position: "absolute" }}
      />
      <span className="text-xs mt-1" style={{ color: deckColor }}>
        {value > 0 ? `+${value}` : value}
      </span>
    </div>
  );

  return (
    <div
      className="p-4 rounded-lg text-white w-full"
      style={{
        background: "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)",
        border: `1px solid ${deckColorDark}`,
        boxShadow: `0 0 20px ${deckColor}22`,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
            style={{ backgroundColor: deckColor }}
          >
            {deck}
          </div>
          <span className="text-sm font-semibold">DECK {deck}</span>
        </div>
        <div className="text-right">
          <div className="text-lg font-mono" style={{ color: deckColor }}>
            {formatTime(elapsed)}
          </div>
          <div className="text-xs text-gray-500">
            -{formatTime(Math.max(0, duration - elapsed))}
          </div>
        </div>
      </div>

      {/* Track Info */}
      <div className="mb-3 p-2 bg-black rounded">
        <input
          type="file"
          accept="audio/*"
          onChange={loadTrack}
          className="hidden"
          id={`track-input-${deck}`}
        />
        <label
          htmlFor={`track-input-${deck}`}
          className="cursor-pointer block text-center text-sm py-1 rounded"
          style={{ border: `1px dashed ${deckColor}`, color: deckColor }}
        >
          {trackName || "Load Track"}
        </label>
      </div>

      {/* Waveform */}
      <div className="mb-3 bg-black rounded overflow-hidden">
        <WaveformDisplay audioBuffer={buffer} />
        <div className="h-1 bg-gray-800">
          <div
            style={{ width: `${progress}%`, backgroundColor: deckColor }}
            className="h-full transition-all duration-75"
          />
        </div>
      </div>

      {/* Main Controls Area */}
      <div className="flex gap-3 mb-3">
        {/* Jog Wheel */}
        <div className="flex-shrink-0">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: `conic-gradient(from ${jogRotation}deg, ${deckColor}, #333, ${deckColor})`,
              boxShadow: `0 0 15px ${deckColor}44`,
            }}
          >
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: deckColor }}
              />
            </div>
          </div>
        </div>

        {/* EQ and VU */}
        <div className="flex gap-2 flex-1">
          <div className="flex gap-1">
            {renderEQKnob("HI", eqHigh, (val) => {
              setEqHigh(val);
              if (highShelfRef.current) highShelfRef.current.gain.value = val;
            })}
            {renderEQKnob("MID", eqMid, (val) => {
              setEqMid(val);
              if (midPeakRef.current) midPeakRef.current.gain.value = val;
            })}
            {renderEQKnob("LOW", eqLow, (val) => {
              setEqLow(val);
              if (lowShelfRef.current) lowShelfRef.current.gain.value = val;
            })}
          </div>
          {renderVUMeter()}
        </div>
      </div>

      {/* Transport Controls */}
      <div className="flex gap-2 mb-3 justify-center">
        <button
          onClick={togglePause}
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
          style={{
            backgroundColor: isPlaying ? deckColor : "#333",
            color: isPlaying ? "#000" : "#fff",
          }}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
        <button
          onClick={stopTrack}
          className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl"
        >
          ■
        </button>
        <button
          onClick={jumpToCue}
          className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: "#ff3838" }}
        >
          CUE
        </button>
        <button
          onClick={setCue}
          className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xs"
        >
          SET
        </button>
      </div>

      {/* Hot Cues */}
      <div className="flex gap-1 mb-3">
        {hotCues.map((cue, i) => (
          <button
            key={i}
            onClick={() => (cue !== null ? jumpToHotCue(i) : setHotCue(i))}
            className="flex-1 py-2 rounded text-xs font-bold"
            style={{
              backgroundColor: cue !== null ? deckColor : "#333",
              color: cue !== null ? "#000" : "#888",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Loop Controls */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 4, 8].map((beats) => (
          <button
            key={beats}
            onClick={() => toggleLoop(beats)}
            className="flex-1 py-1.5 rounded text-xs"
            style={{
              backgroundColor:
                isLooping && loopEnd !== null && loopEnd - (loopStart || 0) === beats
                  ? deckColor
                  : "#333",
              color:
                isLooping && loopEnd !== null && loopEnd - (loopStart || 0) === beats
                  ? "#000"
                  : "#888",
            }}
          >
            {beats}
          </button>
        ))}
        <button
          onClick={() => setIsLooping(false)}
          className="flex-1 py-1.5 rounded text-xs bg-gray-700"
        >
          OUT
        </button>
      </div>

      {/* Pitch/Tempo Slider */}
      <div className="p-2 bg-black rounded">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">TEMPO</span>
          <span style={{ color: deckColor }}>
            {((playbackRate - 1) * 100).toFixed(1)}%
          </span>
        </div>
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
          value={playbackRate}
          onChange={(e) => {
            const newRate = Number(e.target.value);
            setPlaybackRate(newRate);
            if (sourceRef.current) {
              sourceRef.current.playbackRate.value = newRate;
            }
          }}
          className="w-full h-2 rounded appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${deckColor} 0%, ${deckColor} ${
              ((playbackRate - 0.5) / 1) * 100
            }%, #333 ${((playbackRate - 0.5) / 1) * 100}%, #333 100%)`,
          }}
        />
      </div>
    </div>
  );
};

export default AdvancedPlayerDeck;
