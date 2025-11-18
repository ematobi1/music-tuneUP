import { initCrossfader } from "./audio-engine/useCrossfader";
initCrossfader();
import "./styles/global.css";
import "./styles/virtualdj.css";
import React, { useState } from "react";
import AdvancedPlayerDeck from "./components/AdvancedPlayerDeck";
import ProfessionalMixer from "./components/ProfessionalMixer";
import SamplerPads from "./components/SamplerPads";
import PerformancePads from "./components/PerformancePads";
import DualWaveformDisplay from "./components/DualWaveformDisplay";
import VinylCDJMode from "./components/VinylCDJMode";
import ProfessionalEffectsRack from "./components/ProfessionalEffectsRack";
import SpectrumAnalyzer from "./components/SpectrumAnalyzer";
import TapTempo from "./components/TapTempo";
import PlaylistLibrary from "./components/PlaylistLibrary";
import RecordPanel from "./components/RecordPanel";
import BPMAnalyzer from "./components/BPMAnalyzer";

const App = () => {
  const [deckABuffer, setDeckABuffer] = useState<AudioBuffer | null>(null);
  const [deckBBuffer, setDeckBBuffer] = useState<AudioBuffer | null>(null);
  const [deckAProgress, setDeckAProgress] = useState(0);
  const [deckBProgress, setDeckBProgress] = useState(0);
  const [showLibrary, setShowLibrary] = useState(true);

  return (
    <div className="virtual-dj-app">
      {/* Top Header Bar */}
      <div className="vdj-header">
        <div className="vdj-logo">MUSIC TUNEUP PRO</div>
        <div className="vdj-menu">
          <button className="menu-btn">FILE</button>
          <button className="menu-btn">EDIT</button>
          <button className="menu-btn">VIEW</button>
          <button className="menu-btn">OPTIONS</button>
          <button className="menu-btn">HELP</button>
        </div>
        <div className="vdj-status">
          <RecordPanel />
          <button className="status-btn">BROADCAST</button>
          <button className="status-btn">SETTINGS</button>
        </div>
      </div>

      <div className="vdj-main">
        {/* Left Sidebar - Tools */}
        <div className="vdj-sidebar left">
          <div className="sidebar-section">
            <TapTempo />
            <BPMAnalyzer />
          </div>
          <div className="sidebar-section">
            <button className="tool-btn active">
              <span className="icon">🎵</span>
              LIBRARY
            </button>
            <button className="tool-btn">
              <span className="icon">🎛️</span>
              EFFECTS
            </button>
            <button className="tool-btn">
              <span className="icon">📊</span>
              ANALYZER
            </button>
            <button className="tool-btn">
              <span className="icon">⚙️</span>
              SETTINGS
            </button>
          </div>
        </div>

        {/* Center - Main DJ Interface */}
        <div className="vdj-center">
          {/* Top Section - Deck Platters & Waveforms */}
          <div className="vdj-decks-section">
            <div className="deck-container deck-a-container">
              <VinylCDJMode deck="A" />
              <div className="deck-info">
                <div className="track-info">No Track Loaded</div>
                <div className="deck-controls">
                  <AdvancedPlayerDeck deck="A" />
                </div>
              </div>
            </div>

            <div className="center-waveforms">
              <DualWaveformDisplay
                deckABuffer={deckABuffer}
                deckBBuffer={deckBBuffer}
                deckAProgress={deckAProgress}
                deckBProgress={deckBProgress}
              />
            </div>

            <div className="deck-container deck-b-container">
              <VinylCDJMode deck="B" />
              <div className="deck-info">
                <div className="track-info">No Track Loaded</div>
                <div className="deck-controls">
                  <AdvancedPlayerDeck deck="B" />
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Mixer */}
          <div className="vdj-mixer-section">
            <ProfessionalMixer />
          </div>

          {/* Bottom Section - Performance Pads & Effects */}
          <div className="vdj-performance-section">
            <div className="performance-left">
              <PerformancePads />
            </div>
            <div className="performance-center">
              <ProfessionalEffectsRack />
            </div>
            <div className="performance-right">
              <SamplerPads />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Library & Browser */}
        <div className={`vdj-sidebar right ${showLibrary ? "visible" : "hidden"}`}>
          <div className="sidebar-header">
            <h3>MUSIC LIBRARY</h3>
            <button
              className="close-btn"
              onClick={() => setShowLibrary(!showLibrary)}
            >
              {showLibrary ? "HIDE" : "SHOW"}
            </button>
          </div>
          <PlaylistLibrary />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="vdj-footer">
        <div className="footer-section">
          <span className="footer-label">CPU:</span>
          <span className="footer-value">12%</span>
        </div>
        <div className="footer-section">
          <span className="footer-label">LATENCY:</span>
          <span className="footer-value">5ms</span>
        </div>
        <div className="footer-section">
          <span className="footer-label">SAMPLE RATE:</span>
          <span className="footer-value">44.1kHz</span>
        </div>
        <div className="footer-section">
          <span className="footer-label">BUFFER:</span>
          <span className="footer-value">512</span>
        </div>
        <div className="footer-section">
          <span className="footer-label">MIDI:</span>
          <span className="footer-value status-ok">CONNECTED</span>
        </div>
      </div>
    </div>
  );
};

export default App;
