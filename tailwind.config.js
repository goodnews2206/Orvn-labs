/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B2559",
          light: "#2D3A7C",
          dark: "#111840",
        },
        slate: {
          50: "#F8F9FC",
          100: "#F1F3F9",
          200: "#E2E6F0",
          300: "#C8CEDF",
          400: "#8E97B5",
          500: "#5A6480",
          600: "#3D4560",
        },
        accent: {
          DEFAULT: "#1B2559",
          green: "#0D9E6E",
          red: "#DC2626",
          amber: "#D97706",
        },
      },
      fontFamily: {
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 6px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.1)",
        "navy-glow": "0 8px 32px rgba(27,37,89,0.2)",
      },
    },
  },
  plugins: [],
};