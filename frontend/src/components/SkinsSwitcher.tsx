import React from 'react';

interface SkinsSwitcherProps {
    onSkinChange: (skin: string) => void;
}

const SkinsSwitcher: React.FC<SkinsSwitcherProps> = ({ onSkinChange }) => {
    return (
        <div style={{ color: 'white', background: '#222', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
            <h3>Skins</h3>
            <button onClick={() => onSkinChange('default')} style={{ margin: '5px', padding: '6px 12px' }}>Default</button>
            <button onClick={() => onSkinChange('neon')} style={{ margin: '5px', padding: '6px 12px' }}>Neon</button>
            <button onClick={() => onSkinChange('vinyl')} style={{ margin: '5px', padding: '6px 12px' }}>Vinyl</button>
        </div>
    );
};

export default SkinsSwitcher;
