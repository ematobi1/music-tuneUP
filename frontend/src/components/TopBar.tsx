import React from "react";

const TopBar: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(6px)',
            padding: '10px 20px',
            color: 'white',
            boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
            borderBottom: '1px solid #222'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: 'lime',
                    marginRight: '10px',
                    boxShadow: '0 0 8px lime'
                }}></div>
                <h2 style={{ margin: 0, fontSize: '20px' }}>í¾§ MusicTuneUp DJ Studio</h2>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{
                    width: '18px',
                    height: '18px',
                    border: '1px solid #555',
                    borderRadius: '3px',
                    textAlign: 'center',
                    lineHeight: '18px',
                    cursor: 'pointer'
                }}>â€”</div>
                <div style={{
                    width: '18px',
                    height: '18px',
                    border: '1px solid #555',
                    borderRadius: '3px',
                    textAlign: 'center',
                    lineHeight: '18px',
                    cursor: 'pointer'
                }}>â–¢</div>
            </div>
        </div>
    );
};

export default TopBar;
