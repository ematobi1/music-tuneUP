// frontend/src/components/SearchBar.tsx
import React, { useState } from 'react';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Searching for:', query);
        // TODO: connect to Spotify or internal track search later
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a track..."
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginRight: '10px',
                    width: '300px'
                }}
            />
            <button type="submit" style={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#4CAF50',
                color: 'white',
                cursor: 'pointer'
            }}>
                Search
            </button>
        </form>
    );
};

export default SearchBar;
