// src/components/PlaylistCrateManager.tsx
import React, { useState } from 'react';

const PlaylistCrateManager: React.FC = () => {
    const [crateName, setCrateName] = useState('');
    const [crates, setCrates] = useState<string[]>([]);

    const saveCrate = () => {
        if (crateName) {
            localStorage.setItem(crateName, JSON.stringify({ saved: true }));
            setCrates([...crates, crateName]);
            setCrateName('');
            alert(`Crate "${crateName}" saved!`);
        }
    };

    const loadCrate = (name: string) => {
        const loaded = localStorage.getItem(name);
        if (loaded) {
            alert(`Loaded crate: ${name}`);
            console.log(JSON.parse(loaded));
        }
    };

    return (
        <div style={{ padding: '10px', background: '#222', borderRadius: '8px', marginTop: '10px' }}>
            <h4 style={{ color: 'white' }}>🎚️ Playlist Crate Manager</h4>
            <input
                type="text"
                placeholder="Enter crate name"
                value={crateName}
                onChange={(e) => setCrateName(e.target.value)}
                style={{ marginRight: '10px', padding: '5px' }}
            />
            <button onClick={saveCrate}>Save Crate</button>

            <div style={{ marginTop: '10px' }}>
                <h5 style={{ color: 'white' }}>Saved Crates:</h5>
                {crates.length === 0 && <p style={{ color: 'white' }}>No crates saved yet.</p>}
                <ul>
                    {crates.map((crate, index) => (
                        <li key={index} style={{ color: 'white' }}>
                            {crate}{' '}
                            <button onClick={() => loadCrate(crate)} style={{ marginLeft: '5px' }}>
                                Load
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlaylistCrateManager;
