import React, { useState } from "react";
import { setCrossfade, setMasterVolume } from "../audio-engine/audioRouting";

const ProfessionalMixer: React.FC = () => {
  const [crossfaderPos, setCrossfaderPos] = useState(0.5);
  const [masterVol, setMasterVol] = useState(0.8);
  const [deckAVol, setDeckAVol] = useState(0.8);
  const [deckBVol, setDeckBVol] = useState(0.8);
  const [deckAEqLow, setDeckAEqLow] = useState(0);
  const [deckAEqMid, setDeckAEqMid] = useState(0);
  const [deckAEqHigh, setDeckAEqHigh] = useState(0);
  const [deckBEqLow, setDeckBEqLow] = useState(0);
  const [deckBEqMid, setDeckBEqMid] = useState(0);
  const [deckBEqHigh, setDeckBEqHigh] = useState(0);

  const handleCrossfader = (value: number) => {
    setCrossfaderPos(value);
    setCrossfade(value);
  };

  const handleMasterVolume = (value: number) => {
    setMasterVol(value);
    setMasterVolume(value);
  };

  return (
    <div className="professional-mixer">
      <div className="mixer-container">
        {/* Deck A Channel */}
        <div className="mixer-channel deck-a-channel">
          <div className="channel-header">DECK A</div>

          {/* EQ Knobs */}
          <div className="eq-section">
            <div className="eq-knob-container">
              <div className="knob-label">HIGH</div>
              <div className="knob-wrapper">
                <input
                  type="range"
                  min={-12}
                  max={12}
                  step={0.1}
                  value={deckAEqHigh}
                  onChange={(e) => setDeckAEqHigh(Number(e.target.value))}
                  className="eq-knob vertical-slider"
                />
                <div className="knob-value">{deckAEqHigh.toFixed(1)}dB</div>
              </div>
            </div>
            <div className="eq-knob-container">
              <div className="knob-label">MID</div>
              <div className="knob-wrapper">
                <input
                  type="range"
                  min={-12}
                  max={12}
                  step={0.1}
                  value={deckAEqMid}
                  onChange={(e) => setDeckAEqMid(Number(e.target.value))}
                  className="eq-knob vertical-slider"
                />
                <div className="knob-value">{deckAEqMid.toFixed(1)}dB</div>
              </div>
            </div>
            <div className="eq-knob-container">
              <div className="knob-label">LOW</div>
              <div className="knob-wrapper">
                <input
                  type="range"
                  min={-12}
                  max={12}
                  step={0.1}
                  value={deckAEqLow}
                  onChange={(e) => setDeckAEqLow(Number(e.target.value))}
                  className="eq-knob vertical-slider"
                />
                <div className="knob-value">{deckAEqLow.toFixed(1)}dB</div>
              </div>
            </div>
          </div>

          {/* Volume Fader */}
          <div className="volume-fader-section">
            <div className="fader-label">VOLUME</div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={deckAVol}
              onChange={(e) => setDeckAVol(Number(e.target.value))}
              className="volume-fader vertical-slider"
              orient="vertical"
            />
            <div className="fader-value">{Math.round(deckAVol * 100)}%</div>
          </div>

          {/* VU Meter */}
          <div className="vu-meter-container">
            <div className="vu-meter deck-a-meter"></div>
          </div>
        </div>

        {/* Center Section - Crossfader & Master */}
        <div className="mixer-center">
          <div className="master-section">
            <div className="master-label">MASTER</div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={masterVol}
              onChange={(e) => handleMasterVolume(Number(e.target.value))}
              className="master-volume vertical-slider"
              orient="vertical"
            />
            <div className="master-value">{Math.round(masterVol * 100)}%</div>
          </div>

          <div className="crossfader-section">
            <div className="crossfader-label">CROSSFADER</div>
            <div className="crossfader-track">
              <div className="crossfader-markers">
                <span className="marker-a">A</span>
                <span className="marker-center">⬤</span>
                <span className="marker-b">B</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={crossfaderPos}
                onChange={(e) => handleCrossfader(Number(e.target.value))}
                className="crossfader-slider"
              />
            </div>
            <div className="crossfader-position">
              {crossfaderPos < 0.4 ? "← A" : crossfaderPos > 0.6 ? "B →" : "CENTER"}
            </div>
          </div>

          {/* Effects Send/Return */}
          <div className="fx-section">
            <button className="fx-button fx-echo">ECHO</button>
            <button className="fx-button fx-reverb">REVERB</button>
            <button className="fx-button fx-filter">FILTER</button>
            <button className="fx-button fx-flanger">FLANGER</button>
          </div>
        </div>

        {/* Deck B Channel */}
        <div className="mixer-channel deck-b-channel">
          <div className="channel-header">DECK B</div>

          {/* EQ Knobs */}
          <div className="eq-section">
            <div className="eq-knob-container">
              <div className="knob-label">HIGH</div>
              <div className="knob-wrapper">
                <input
                  type="range"
                  min={-12}
                  max={12}
                  step={0.1}
                  value={deckBEqHigh}
                  onChange={(e) => setDeckBEqHigh(Number(e.target.value))}
                  className="eq-knob vertical-slider"
                />
                <div className="knob-value">{deckBEqHigh.toFixed(1)}dB</div>
              </div>
            </div>
            <div className="eq-knob-container">
              <div className="knob-label">MID</div>
              <div className="knob-wrapper">
                <input
                  type="range"
                  min={-12}
                  max={12}
                  step={0.1}
                  value={deckBEqMid}
                  onChange={(e) => setDeckBEqMid(Number(e.target.value))}
                  className="eq-knob vertical-slider"
                />
                <div className="knob-value">{deckBEqMid.toFixed(1)}dB</div>
              </div>
            </div>
            <div className="eq-knob-container">
              <div className="knob-label">LOW</div>
              <div className="knob-wrapper">
                <input
                  type="range"
                  min={-12}
                  max={12}
                  step={0.1}
                  value={deckBEqLow}
                  onChange={(e) => setDeckBEqLow(Number(e.target.value))}
                  className="eq-knob vertical-slider"
                />
                <div className="knob-value">{deckBEqLow.toFixed(1)}dB</div>
              </div>
            </div>
          </div>

          {/* Volume Fader */}
          <div className="volume-fader-section">
            <div className="fader-label">VOLUME</div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={deckBVol}
              onChange={(e) => setDeckBVol(Number(e.target.value))}
              className="volume-fader vertical-slider"
              orient="vertical"
            />
            <div className="fader-value">{Math.round(deckBVol * 100)}%</div>
          </div>

          {/* VU Meter */}
          <div className="vu-meter-container">
            <div className="vu-meter deck-b-meter"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalMixer;
