# Music TuneUp Pro - Professional DJ Application

A professional-grade DJ application inspired by Virtual DJ, built with React, TypeScript, and the Web Audio API. Features a complete DJ mixing interface with dual decks, professional mixer, performance pads, sampler, and advanced effects.

![Music TuneUp Pro](https://img.shields.io/badge/Music-TuneUp%20Pro-00d4ff?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.0.0-00ff88?style=for-the-badge)
![Status](https://img.shields.io/badge/status-Production-ff3838?style=for-the-badge)

## Features

### 🎛️ Professional DJ Mixer
- **Dual Channel Strips** - Independent controls for Deck A and Deck B
- **3-Band EQ** - High/Mid/Low frequency control (-12dB to +12dB)
- **Volume Faders** - Professional vertical faders for each deck
- **Crossfader** - Smooth transitions between decks with visual indicators
- **Master Volume** - Global output control
- **VU Meters** - Real-time audio level monitoring with animated effects

### 🎵 Vinyl/CDJ Mode
- **Vinyl Emulation** - Interactive spinning platter with scratch capability
- **CDJ Mode** - Digital deck control
- **Pitch Control** - Fine-tune playback speed (-8% to +8%)
- **Transport Controls** - Cue, Play, and Sync buttons
- **Beat Visualization** - 60 LED dots around the platter
- **Tempo Sync** - Automatic BPM matching between decks

### 📊 Dual Waveform Display
- **Side-by-Side Waveforms** - Visual representation for both decks
- **Beat Grid Overlay** - Precise beat matching guides
- **Playhead Indicator** - Real-time position tracking
- **Color Coding** - Blue for Deck A, Red for Deck B
- **Zoom Controls** - Detailed waveform viewing

### 🎹 Performance Pads
**4 Modes with 8 Pads Each:**
- **Hot Cue Mode** - Set and trigger 8 cue points instantly
- **Loop Mode** - 1/2/4/8 bar loops, roll, half, double, exit
- **Slicer Mode** - Slice and rearrange beats on-the-fly
- **Sampler Mode** - Trigger loaded samples

### 🔊 Advanced Sampler
- **8 Sample Slots** - Drag-and-drop audio file loading
- **Bank Switching** - Access up to 16 samples (2 banks)
- **Color-Coded Pads** - Unique visual identity per slot
- **One-Shot Playback** - Instant sample triggering
- **Visual Feedback** - Active pad animations

### 🎚️ Professional Effects Rack
**6 Built-In Effects:**
1. **Filter** - Cutoff and resonance control
2. **Delay** - Time, feedback, and mix parameters
3. **Reverb** - Room size, damping, and mix
4. **Phaser** - Rate, depth, and feedback
5. **Flanger** - Rate, depth, and mix
6. **Bitcrusher** - Bit reduction and sample rate

**Effect Features:**
- Real-time parameter adjustment
- Enable/Disable toggle
- Visual effect state indicators
- Effect preset management
- Parameter value display

### 🎶 Advanced Player Decks
- **Audio File Loading** - Support for MP3, WAV, OGG, and more
- **Pitch/Tempo Control** - -50% to +50% playback speed
- **3-Band EQ** - Built-in equalizer per deck
- **Play/Pause/Stop** - Standard transport controls
- **Cue Points** - Set and jump to cue points
- **Looping** - 4-second auto-loop with manual loop points
- **Progress Display** - Visual playback progress
- **VU Meters** - Per-deck audio level monitoring

### 🎼 Additional Features
- **Tap Tempo** - Manual BPM detection by tapping
- **BPM Analyzer** - Automatic beat detection
- **Spectrum Analyzer** - Real-time frequency visualization
- **Music Library** - Collapsible track browser
- **Record Panel** - Mix recording functionality
- **Keyboard Shortcuts** - Quick access controls
- **Status Bar** - CPU, latency, sample rate, buffer, and MIDI monitoring

## Installation

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with Web Audio API support

### Quick Start

```bash
# Clone the repository
git clone https://github.com/ematobi1/music-tuneUP.git

# Navigate to the project
cd music-tuneUP

# Install frontend dependencies
cd frontend
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173`

### Production Build

```bash
cd frontend
npm run build
```

Build output will be in `frontend/dist/`

## Usage

### Loading Tracks
1. Click the file input on either Deck A or Deck B
2. Select an audio file from your computer
3. The track will load and display waveform
4. Press Play to start playback

### Mixing Basics
1. Load tracks on both decks
2. Use the crossfader to transition between decks
3. Adjust EQ to blend frequencies
4. Use Sync to match BPM automatically
5. Add effects for creative mixing

### Performance Pads
1. Select a mode (Hot Cue, Loop, Slicer, Sampler)
2. Click pads to trigger functions
3. Pads light up when active
4. Double-click effect slots to enable/disable

### Sampler
1. Click on empty pads to load audio files
2. Click loaded pads to play samples
3. Use Bank 1/2 buttons to switch banks
4. Click "Clear All" to reset all samples

### Effects
1. Click an effect slot to select it
2. Adjust parameters using sliders
3. Click "Enable" to activate the effect
4. Click "Reset" to return to default values

## Keyboard Shortcuts

### Deck A
- **Q** - Play/Pause
- **A** - Stop
- **Z** - Set Cue Point

### Deck B
- **P** - Play/Pause
- **L** - Stop
- **M** - Set Cue Point

## Architecture

### Frontend Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Web Audio API** - Audio processing
- **Canvas API** - Waveform visualization

### Project Structure
```
frontend/
├── src/
│   ├── components/         # React components
│   │   ├── AdvancedPlayerDeck.tsx
│   │   ├── ProfessionalMixer.tsx
│   │   ├── VinylCDJMode.tsx
│   │   ├── DualWaveformDisplay.tsx
│   │   ├── PerformancePads.tsx
│   │   ├── SamplerPads.tsx
│   │   ├── ProfessionalEffectsRack.tsx
│   │   └── ...
│   ├── audio-engine/       # Audio routing and processing
│   │   ├── audioRouting.ts
│   │   └── AudioEngineContext.tsx
│   ├── styles/             # CSS styling
│   │   ├── global.css
│   │   └── virtualdj.css
│   └── App.tsx             # Main app component
├── public/                 # Static assets
└── package.json
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Tips

1. **Use Chrome** - Best Web Audio API performance
2. **Low Latency** - Adjust buffer size in browser settings
3. **Close Other Tabs** - Free up CPU resources
4. **Use Headphones** - Prevent audio feedback
5. **Modern Hardware** - Multi-core CPU recommended

## Roadmap

- [ ] MIDI controller support
- [ ] VST plugin integration
- [ ] Cloud library sync
- [ ] Collaborative DJ sessions
- [ ] Auto-mix AI
- [ ] Video mixing
- [ ] Recording with metadata
- [ ] Playlist management
- [ ] Track analysis and tagging

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

Built with Claude Code by Anthropic
- **Author**: Music TuneUp Development Team
- **Inspired By**: Virtual DJ, Serato DJ, Traktor Pro
- **Audio Engine**: Web Audio API
- **UI Framework**: React + TypeScript

## Support

For issues, questions, or feature requests:
- GitHub Issues: https://github.com/ematobi1/music-tuneUP/issues
- Documentation: https://github.com/ematobi1/music-tuneUP/wiki

---

**Made with ❤️ and Claude Code**

Generated with [Claude Code](https://claude.com/claude-code)
