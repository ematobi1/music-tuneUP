import React, { useState, useEffect } from "react";

type Theme = "default" | "neon" | "vinyl";

const ThemingPanel: React.FC = () => {
    const [theme, setTheme] = useState<Theme>("default");

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div style={{ color: "white", background: "#222", padding: "15px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.5)" }}>
            <h3>Theme Settings</h3>
            <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)} style={{ padding: "8px", borderRadius: "5px" }}>
                <option value="default">Default (Dark)</option>
                <option value="neon">Neon Mode</option>
                <option value="vinyl">Classic Vinyl</option>
            </select>
        </div>
    );
};

export default ThemingPanel;
