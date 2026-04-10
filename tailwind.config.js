/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core
        "background":   "#FFFFFF",
        "surface":      "#F7F5FF",
        "surface-mid":  "#EDE8FF",
        "surface-dark": "#0A0A1A",

        // Purple system
        "primary":      "#7B2FFF",
        "primary-light":"#A96EFF",
        "primary-pale": "#F0EAFF",

        // Text
        "ink":          "#0A0A1A",
        "ink-mid":      "#3D3D5C",
        "ink-dim":      "#8888AA",

        // Borders
        "line":         "#E8E4F4",
        "line-strong":  "#C8BEEE",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "1rem",
        full: "9999px",
      },
      fontFamily: {
        "headline": ["Manrope", "sans-serif"],
        "body":     ["Inter", "sans-serif"],
        "label":    ["Space Grotesk", "sans-serif"],
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, #C8BEEE 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "draw-line": {
          "0%":   { width: "0%" },
          "100%": { width: "100%" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%":      { opacity: 0.4 },
        },
      },
      animation: {
        "fade-up":   "fade-up 0.6s ease forwards",
        "draw-line": "draw-line 1s ease forwards",
        marquee:     "marquee 28s linear infinite",
        pulse:       "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
