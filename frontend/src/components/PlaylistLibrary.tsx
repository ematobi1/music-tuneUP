import React from 'react';

const PlaylistLibrary: React.FC = () => {
    return (
        <div style={{ color: 'white', padding: '20px' }}>
            <h3>í¾µ Playlist Library</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>#</th>
                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Title</th>
                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Artist</th>
                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>BPM</th>
                        <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Length</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>1</td><td>Song One</td><td>Artist A</td><td>128</td><td>3:45</td></tr>
                    <tr><td>2</td><td>Track Two</td><td>Artist B</td><td>122</td><td>4:12</td></tr>
                    <tr><td>3</td><td>Mix Three</td><td>DJ C</td><td>130</td><td>5:03</td></tr>
                    <tr><td>4</td><td>Hit Four</td><td>Band D</td><td>125</td><td>3:58</td></tr>
                </tbody>
            </table>
        </div>
    );
};

export default PlaylistLibrary;
