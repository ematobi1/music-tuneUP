import React from "react";

const TransportBar: React.FC = () => {
  return (
    <div className="p-4 bg-zinc-800 rounded text-white text-center">
      <h2 className="font-bold mb-2">Transport</h2>
      <button className="bg-green-500 px-3 py-1 mr-2 rounded">Play</button>
      <button className="bg-red-500 px-3 py-1 rounded">Stop</button>
    </div>
  );
};

export default TransportBar;
