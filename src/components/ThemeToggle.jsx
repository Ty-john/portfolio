import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`theme-toggle-btn min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
        isDark
          ? 'bg-[#112A4D] border-[rgba(232,212,138,0.25)] text-[#E8D48A] hover:bg-[#1A3860] hover:border-[#E8D48A] shadow-sm'
          : 'bg-white/80 border-[#C9A227]/30 text-navy hover:text-gold hover:border-gold shadow-sm'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-[#E8D48A] transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-navy transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}
