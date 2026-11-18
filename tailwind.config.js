/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#E8D48A',
          DEFAULT: '#C9A227',
          deep: '#9A7B1C',
          dark: '#8A6D12',
          band: '#F4EBCF',
          muted: 'rgba(201, 162, 39, 0.15)',
          glow: 'rgba(201, 162, 39, 0.35)',
        },
        navy: {
          DEFAULT: '#0B1F3A',
          dark: '#071527',
          light: '#1E3A5F',
          muted: '#2C4A6F',
          border: 'rgba(11, 31, 58, 0.12)',
        },
        surface: {
          base: '#FBF8F1',
          white: '#FFFFFF',
          band: '#F4EBCF',
        },
        accent: {
          light: '#E8D48A',
          DEFAULT: '#C9A227',
          deep: '#9A7B1C',
          dark: '#8A6D12',
          band: '#F4EBCF',
          muted: 'rgba(201, 162, 39, 0.15)',
          glow: 'rgba(201, 162, 39, 0.35)',
        },
        dark: {
          bg: '#FBF8F1',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: 'rgba(201, 162, 39, 0.25)',
          muted: '#1E3A5F',
        }
      },
      fontFamily: {
        serif: ['"Libre Baskerville"', 'Georgia', 'serif'],
        sans: ['"Libre Baskerville"', 'Georgia', 'serif'],
        display: ['"Libre Baskerville"', 'Georgia', 'serif'],
        mono: ['"Libre Baskerville"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 4px 20px -2px rgba(201, 162, 39, 0.35)',
        'gold-glow-lg': '0 8px 30px -4px rgba(201, 162, 39, 0.45)',
        'accent-glow': '0 4px 20px -2px rgba(201, 162, 39, 0.35)',
        'accent-glow-lg': '0 8px 30px -4px rgba(201, 162, 39, 0.45)',
        'card': '0 4px 24px -2px rgba(11, 31, 58, 0.05), 0 2px 6px -1px rgba(201, 162, 39, 0.08)',
        'card-hover': '0 14px 34px -4px rgba(201, 162, 39, 0.22), 0 4px 12px -2px rgba(11, 31, 58, 0.08)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}

