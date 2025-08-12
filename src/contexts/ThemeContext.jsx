import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

    useEffect(() => {

        const root = document.documentElement;
        const body = document.body;

        const applyTheme = () => {
            root.classList.toggle('dark', theme === 'dark');
            body.classList.toggle('dark', theme === 'dark');
        };

        applyTheme();
        localStorage.setItem('theme', theme);

    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);