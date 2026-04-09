/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ make sure jsx/tsx are included
  ],
  theme: {
    extend: {
      colors: {
        "background": "#0e0e0e",
        "surface": "#0e0e0e",
        "surface-container-highest": "#262626",
        "surface-container-high": "#201f1f",
        "surface-container-low": "#131313",
        "primary": "#cc97ff",
        "primary-dim": "#9c48ea",
        "primary-container": "#c284ff",
        "secondary": "#e197fc",
        "on-surface": "#ffffff",
        "on-surface-variant": "#adaaaa",
        "outline-variant": "#494847",
        "orvn-accent": "#cc97ff",
        "orvn-border": "#262626",
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem",
      },
      fontFamily: {
        "headline": ["Manrope", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Space Grotesk", "monospace"],
      },
      backgroundImage: {
        'obsidian-grid': "linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)",
      },
      keyframes: {
        moveRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" }
        },
        moveLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" }
        }
      },
      animation: {
        moveRight: "moveRight 2s linear infinite",
        moveLeft: "moveLeft 2s linear infinite"
      }
    },
  },
  plugins: [],
} 