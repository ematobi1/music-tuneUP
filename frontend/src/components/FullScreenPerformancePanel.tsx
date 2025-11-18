import React, { useEffect } from "react";

const FullScreenPerformancePanel: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onExit]);

  return (
    <div className="fixed inset-0 bg-black text-white z-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl mb-4">í¾› Performance Mode</h1>
      <div className="flex gap-4">
        <div>
          <h2 className="font-bold">Deck A</h2>
          {/* Live waveform or deck info */}
        </div>
        <div>
          <h2 className="font-bold">Deck B</h2>
          {/* Live waveform or deck info */}
        </div>
      </div>
      <p className="text-sm mt-4">Press Esc to exit full-screen</p>
    </div>
  );
};

export default FullScreenPerformancePanel;
