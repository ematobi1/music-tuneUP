import React, { useState } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
}

const PlaylistManager: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);

  const addTrack = () => {
    const title = prompt('Enter track title:');
    const artist = prompt('Enter artist name:');
    const url = prompt('Enter track URL:');
    if (title && artist && url) {
      const newTrack: Track = {
        id: Date.now(),
        title,
        artist,
        url,
      };
      setTracks([...tracks, newTrack]);
    }
  };

  const removeTrack = (id: number) => {
    setTracks(tracks.filter((track) => track.id !== id));
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    // Implement playback logic here, e.g., load and play the selected track
  };

  return (
    <div style={{ color: 'white', marginTop: '20px' }}>
      <h3>Playlist Manager</h3>
      <button onClick={addTrack}>Add Track</button>
      <ul>
        {tracks.map((track, index) => (
          <li key={track.id}>
            {track.title} - {track.artist}
            <button onClick={() => selectTrack(index)}>Play</button>
            <button onClick={() => removeTrack(track.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistManager;
