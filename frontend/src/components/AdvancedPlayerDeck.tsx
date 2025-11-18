import React, { useRef, useState, useEffect } from "react";
import { getAudioContext, getDeckGain } from "../audio-engine/audioRouting";
import VUMeter from "./VUMeter";
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
  const [loopStart, setLoopStart] = useState<number | null>(null);
  const [loopEnd, setLoopEnd] = useState<number | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [eqLow, setEqLow] = useState(0);
  const [eqMid, setEqMid] = useState(0);
  const [eqHigh, setEqHigh] = useState(0);
  const lowShelfRef = useRef<BiquadFilterNode | null>(null);
  const midPeakRef = useRef<BiquadFilterNode | null>(null);
  const highShelfRef = useRef<BiquadFilterNode | null>(null);

  const loadTrack = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTrackName(file.name);
    const data = await file.arrayBuffer();
    const decoded = await ctx.decodeAudioData(data);
    setBuffer(decoded);
    setDuration(decoded.duration);
    setOffset(0);
    playFrom(0, decoded);
  };

  const playFrom = (offsetSec: number, decodedBuffer?: AudioBuffer) => {
    const source = ctx.createBufferSource();
    const analyserNode = ctx.createAnalyser();
    setAnalyser(analyserNode);

    // Create EQ filters
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

    // Connect audio chain: source -> EQ -> analyser -> gain
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
    sourceRef.current?.stop();
    sourceRef.current = null;
    setIsPlaying(false);
    setOffset(0);
    setProgress(0);
    setElapsed(0);
  };

  const togglePause = () => {
    if (!isPlaying) {
      playFrom(offset);
    } else {
      const elapsed = ctx.currentTime - startTime;
      setOffset(elapsed);
      sourceRef.current?.stop();
      sourceRef.current = null;
      setIsPlaying(false);
    }
  };

  const setCue = () => setCuePoint(elapsed);
  const jumpToCue = () => cuePoint !== null && playFrom(cuePoint);

  const triggerLoop = () => {
    if (!loopStart || !loopEnd) return;
    playFrom(loopStart);
    setTimeout(() => {
      stopTrack();
      triggerLoop();
    }, (loopEnd - loopStart) * 1000);
  };

  useEffect(() => {
    let raf: number;
    const updateProgress = () => {
      if (isPlaying) {
        const elapsedTime = ctx.currentTime - startTime;
        setElapsed(elapsedTime);
        setProgress((elapsedTime / duration) * 100);
      }
      raf = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, startTime, duration]);

  return (
    <div className="p-4 bg-zinc-800 rounded text-white w-full max-w-md">
      <h2 className="font-bold mb-2">Deck {deck}</h2>
      <input type="file" accept="audio/*" onChange={loadTrack} className="mb-2" />
      <div className="flex gap-2 flex-wrap">
        <button onClick={togglePause} className="bg-yellow-500 px-3 py-1 rounded">
          {isPlaying ? "Pause" : "Resume"}
        </button>
        <button onClick={stopTrack} className="bg-red-600 px-3 py-1 rounded">Stop</button>
        <button onClick={setCue} className="bg-green-500 px-3 py-1 rounded">Set Cue</button>
        <button onClick={jumpToCue} className="bg-blue-500 px-3 py-1 rounded">Go Cue</button>
        <button
          onClick={() => {
            setLoopStart(elapsed);
            setLoopEnd(elapsed + 4);
          }}
          className="bg-indigo-500 px-3 py-1 rounded"
        >
          4s Loop
        </button>
        <button
          onClick={triggerLoop}
          className="bg-pink-500 px-3 py-1 rounded"
        >
          Start Loop
        </button>
      </div>
      <div className="text-sm italic mt-1">{trackName && `Playing: ${trackName}`}</div>
      <div className="text-xs text-gray-300">Elapsed: {elapsed.toFixed(1)}s / {duration.toFixed(1)}s</div>
      <div className="h-2 bg-gray-700 w-full rounded overflow-hidden mt-1">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-blue-400 transition-all duration-50"
        />
      </div>

      {/* Pitch/Tempo Control */}
      <div className="mt-3 p-2 bg-zinc-700 rounded">
        <label className="block text-xs mb-1">
          Pitch/Tempo: {((playbackRate - 1) * 100).toFixed(1)}%
        </label>
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
          className="w-full"
        />
      </div>

      {/* EQ Controls */}
      <div className="mt-2 p-2 bg-zinc-700 rounded">
        <div className="text-xs font-semibold mb-2">EQ Controls</div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs mb-1">Low</label>
            <input
              type="range"
              min={-12}
              max={12}
              step={1}
              value={eqLow}
              onChange={(e) => {
                const val = Number(e.target.value);
                setEqLow(val);
                if (lowShelfRef.current) lowShelfRef.current.gain.value = val;
              }}
              className="w-full"
              style={{ writingMode: "bt-lr", WebkitAppearance: "slider-vertical" }}
            />
            <div className="text-xs text-center">{eqLow}dB</div>
          </div>
          <div>
            <label className="block text-xs mb-1">Mid</label>
            <input
              type="range"
              min={-12}
              max={12}
              step={1}
              value={eqMid}
              onChange={(e) => {
                const val = Number(e.target.value);
                setEqMid(val);
                if (midPeakRef.current) midPeakRef.current.gain.value = val;
              }}
              className="w-full"
            />
            <div className="text-xs text-center">{eqMid}dB</div>
          </div>
          <div>
            <label className="block text-xs mb-1">High</label>
            <input
              type="range"
              min={-12}
              max={12}
              step={1}
              value={eqHigh}
              onChange={(e) => {
                const val = Number(e.target.value);
                setEqHigh(val);
                if (highShelfRef.current) highShelfRef.current.gain.value = val;
              }}
              className="w-full"
            />
            <div className="text-xs text-center">{eqHigh}dB</div>
          </div>
        </div>
      </div>

      {analyser && <VUMeter analyserNode={analyser} />}
      <WaveformDisplay audioBuffer={buffer} />
    </div>
  );
};

export default AdvancedPlayerDeck;
