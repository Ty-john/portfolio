import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      if (typeof document !== 'undefined') {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      }
      return 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      const metaTheme = document.getElementById('meta-theme-color');
      if (theme === 'dark') {
        root.classList.add('dark');
        if (metaTheme) metaTheme.setAttribute('content', '#0B1F3A');
      } else {
        root.classList.remove('dark');
        if (metaTheme) metaTheme.setAttribute('content', '#FBF8F1');
      }
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
