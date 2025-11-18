import React from "react";

const PlaylistCrate: React.FC = () => {
  return (
    <div className="p-4 bg-zinc-800 rounded text-white">
      <h2 className="font-bold mb-2">Playlist Crate</h2>
      <ul className="space-y-2">
        <li><button className="bg-zinc-700 px-3 py-1 w-full rounded">Track 1</button></li>
        <li><button className="bg-zinc-700 px-3 py-1 w-full rounded">Track 2</button></li>
        <li><button className="bg-zinc-700 px-3 py-1 w-full rounded">Track 3</button></li>
      </ul>
    </div>
  );
};

export default PlaylistCrate;
