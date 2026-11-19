/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic theme tokens mapped to CSS variables
        bg: 'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        heading: 'var(--heading)',
        'gold-text': 'var(--gold-text)',
        'tag-bg': 'var(--tag-bg)',
        'tag-border': 'var(--tag-border)',
        'tag-text': 'var(--tag-text)',
        'contrib-bg': 'var(--contrib-bg)',
        'contrib-border': 'var(--contrib-border)',
        'contrib-text': 'var(--contrib-text)',
        'btn-outline-border': 'var(--btn-outline-border)',
        'btn-outline-text': 'var(--btn-outline-text)',

        // Contact and Footer Band Tokens
        band: {
          bg: 'var(--band-bg)',
          surface: 'var(--band-surface)',
          border: 'var(--band-border)',
          heading: 'var(--band-heading)',
          text: 'var(--band-text)',
          gold: 'var(--band-gold)',
        },

        // Original Gold Palette Tokens (from pre-editorial state)
        gold: {
          light: '#E8D48A',
          DEFAULT: '#C9A227',
          deep: '#9A7B1C',
          dark: '#8A6D12',
          text: '#8A6D12',
          band: '#F4EBCF',
          muted: 'rgba(201, 162, 39, 0.15)',
          glow: 'rgba(201, 162, 39, 0.35)',
        },
        navy: {
          DEFAULT: '#0B1F3A',
          dark: '#071527',
          light: '#1E3A5F',
          card: '#12294A',
          muted: '#2C4A6F',
          border: 'rgba(11, 31, 58, 0.12)',
        },
        page: {
          bg: 'var(--bg)',
          alt: 'var(--bg-alt)',
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
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E8D48A 0%, #C9A227 50%, #9A7B1C 100%)',
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
        'card': 'var(--card-shadow)',
        'card-hover': 'var(--card-shadow-hover)',
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
