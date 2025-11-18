import React from 'react';

const SkinExportImportPanel: React.FC = () => {
    const handleExport = () => {
        const theme = localStorage.getItem('djStudioTheme');
        if (theme) {
            const blob = new Blob([theme], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'djStudioSkin.json';
            a.click();
            URL.revokeObjectURL(url);
        } else {
            alert('No skin data found!');
        }
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                localStorage.setItem('djStudioTheme', reader.result);
                window.location.reload();
            }
        };
        reader.readAsText(file);
    };

    return (
        <div style={{ padding: '10px', background: '#222', borderRadius: '8px', marginTop: '10px' }}>
            <h4 style={{ color: 'white' }}>Skins Export / Import</h4>
            <button onClick={handleExport} style={{ marginRight: '10px' }}>Export Skin</button>
            <input type="file" accept="application/json" onChange={handleImport} />
        </div>
    );
};

export default SkinExportImportPanel;
