import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div style={{ color: "white", marginBottom: "10px" }}>
            <h4>Skin: {theme}</h4>
            <button onClick={() => setTheme("dark")}>Dark</button>{" "}
            <button onClick={() => setTheme("neon")}>Neon</button>{" "}
            <button onClick={() => setTheme("vinyl")}>Vinyl</button>
        </div>
    );
};

export default ThemeSwitcher;
