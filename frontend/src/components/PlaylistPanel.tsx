import React, { useState } from 'react';
import './PlaylistPanel.css';

interface Track {
    id: number;
    title: string;
    artist: string;
    bpm: number;
    duration: string;
}

const dummyTracks: Track[] = [
    { id: 1, title: 'Song One', artist: 'Artist A', bpm: 128, duration: '3:45' },
    { id: 2, title: 'Track Two', artist: 'Artist B', bpm: 122, duration: '4:12' },
    { id: 3, title: 'Mix Three', artist: 'DJ C', bpm: 130, duration: '5:03' },
    { id: 4, title: 'Hit Four', artist: 'Band D', bpm: 125, duration: '3:58' }
];

const PlaylistPanel: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <div className="playlist">
            <h3>🎶 Playlist Library</h3>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>BPM</th>
                        <th>Length</th>
                    </tr>
                </thead>
                <tbody>
                    {dummyTracks.map((track) => (
                        <tr
                            key={track.id}
                            className={selectedId === track.id ? 'selected' : ''}
                            onClick={() => setSelectedId(track.id)}
                        >
                            <td>{track.id}</td>
                            <td>{track.title}</td>
                            <td>{track.artist}</td>
                            <td>{track.bpm}</td>
                            <td>{track.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlaylistPanel;
