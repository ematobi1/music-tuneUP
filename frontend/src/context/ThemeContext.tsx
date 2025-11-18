import React, { createContext, useContext, useState, ReactNode } from "react";

type Theme = "dark" | "neon" | "vinyl";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("dark");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={`theme-${theme}`} style={{ height: "100%", width: "100%" }}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
};
