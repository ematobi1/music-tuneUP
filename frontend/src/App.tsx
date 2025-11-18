import { initCrossfader } from "./audio-engine/useCrossfader";
initCrossfader();
import "./styles/global.css";
import AdvancedFXPanel from "./components/AdvancedFXPanel";
import AudioAnalysisPanel from "./components/AudioAnalysisPanel";
import AudioEffectsPanel from "./components/AudioEffectsPanel";
import AudioExportPanel from "./components/AudioExportPanel";
import AudioMIDIMappingPanel from "./components/AudioMIDIMappingPanel";
import AudioMeterPanel from "./components/AudioMeterPanel";
import AudioRoutingPanel from "./components/AudioRoutingPanel";
import AudioMixerPanel from "./components/AudioMixerPanel";
import AutoGainLimiter from "./components/AutoGainLimiter";
import BeatSyncControls from "./components/BeatSyncControls";
import BPMAnalyzer from "./components/BPMAnalyzer";
import Crossfader from "./components/Crossfader";
import DJKeyboardShortcutsPanel from "./components/DJKeyboardShortcutsPanel";
import EffectsControls from "./components/EffectsControls";
import FullscreenButton from "./components/FullscreenButton";
import HotCuesLoopsPanel from "./components/HotCuesLoopsPanel";
import MasterVolume from "./components/MasterVolume";
import MicrophonePanel from "./components/MicrophonePanel";
import MidiOutputPanel from "./components/MidiOutputPanel";
import PlaylistCrateManager from "./components/PlaylistCrateManager";
import PlaylistLibrary from "./components/PlaylistLibrary";
import RecordBroadcastPanel from "./components/RecordBroadcastPanel";
import SearchBar from "./components/SearchBar";
import SidePanel from "./components/SidePanel";
import SkinExportImportPanel from "./components/SkinExportImportPanel";
import StemSeparationPanel from "./components/StemSeparationPanel";
import ThemingPanel from "./components/ThemingPanel";
import TopBar from "./components/TopBar";
import VideoMixingPanel from "./components/VideoMixingPanel";
import WaveformDisplay from "./components/WaveformDisplay";
import AdvancedPlayerDeck from "./components/AdvancedPlayerDeck";
import AISuggestionsPanel from "./components/AISuggestionsPanel";
import AutoMixTimelinePanel from "./components/AutoMixTimelinePanel";
import RecordPanel from "./components/RecordPanel";
import MasterFXPanel from "./components/MasterFXPanel";
import { DeckFXPanel } from "./components/DeckFXPanel";
import DeckPresetPanel from "./components/DeckPresetPanel";
import FXChainPanel from "./components/FXChainPanel";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import SpectrumAnalyzer from "./components/SpectrumAnalyzer";
import TapTempo from "./components/TapTempo";


const App = () => {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar />
      <div style={{ display: "flex", flex: 1 }}>
        <SidePanel />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <SearchBar />
          <div style={{ display: "flex", justifyContent: "space-around", padding: "10px" }}>
            <AdvancedPlayerDeck deck="A" />

<DeckPresetPanel deck="A" applyFn={() => {}} collectFn={() => ({})} />
            <AdvancedPlayerDeck deck="B" />
            <FXChainPanel />

<DeckPresetPanel deck="B" applyFn={() => {}} collectFn={() => ({})} />
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            <TapTempo />
            <MasterVolume />
            <Crossfader />
            <BeatSyncControls />
            <EffectsControls />
            <HotCuesLoopsPanel />
            <VideoMixingPanel />
            <MicrophonePanel />
            <RecordBroadcastPanel />
            <AutoGainLimiter />
            <BPMAnalyzer />
            <AudioAnalysisPanel />
            <StemSeparationPanel />
            <AudioRoutingPanel />
            <AudioMixerPanel />
            <AudioMeterPanel />
            <AudioEffectsPanel />
            <AudioMIDIMappingPanel />
            <AudioExportPanel />
            <SkinExportImportPanel />
            <DJKeyboardShortcutsPanel />
            <ThemingPanel />
            <FullscreenButton />
            <PlaylistCrateManager />
            <MidiOutputPanel />
            <AISuggestionsPanel />
            <AdvancedFXPanel />
            <MasterFXPanel />
            <DeckFXPanel deck="A" />
            <DeckFXPanel deck="B" />
            <RecordPanel />
          </div>

          <AutoMixTimelinePanel />
          <WaveformDisplay audioUrl="" />
          <PlaylistLibrary />
        </div>
      </div>
    </div>
  );
};

export default App;
