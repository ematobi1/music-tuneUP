import React, { useEffect } from "react";

interface KeyboardShortcutsProps {
  onPlayPauseDeckA: () => void;
  onPlayPauseDeckB: () => void;
  onStopDeckA: () => void;
  onStopDeckB: () => void;
  onCuePointDeckA: () => void;
  onCuePointDeckB: () => void;
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  onPlayPauseDeckA,
  onPlayPauseDeckB,
  onStopDeckA,
  onStopDeckB,
  onCuePointDeckA,
  onCuePointDeckB,
}) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Deck A controls
      if (e.key === "q" || e.key === "Q") {
        onPlayPauseDeckA();
      } else if (e.key === "a" || e.key === "A") {
        onStopDeckA();
      } else if (e.key === "z" || e.key === "Z") {
        onCuePointDeckA();
      }
      // Deck B controls
      else if (e.key === "p" || e.key === "P") {
        onPlayPauseDeckB();
      } else if (e.key === "l" || e.key === "L") {
        onStopDeckB();
      } else if (e.key === "m" || e.key === "M") {
        onCuePointDeckB();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    onPlayPauseDeckA,
    onPlayPauseDeckB,
    onStopDeckA,
    onStopDeckB,
    onCuePointDeckA,
    onCuePointDeckB,
  ]);

  return (
    <div className="p-4 bg-zinc-900 rounded text-white text-xs">
      <h3 className="font-bold mb-2">Keyboard Shortcuts</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-yellow-400 mb-1">Deck A</h4>
          <div>Q - Play/Pause</div>
          <div>A - Stop</div>
          <div>Z - Set Cue</div>
        </div>
        <div>
          <h4 className="font-semibold text-blue-400 mb-1">Deck B</h4>
          <div>P - Play/Pause</div>
          <div>L - Stop</div>
          <div>M - Set Cue</div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;