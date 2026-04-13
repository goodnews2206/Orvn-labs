/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#5B3FD4",
          lt: "#7B5FEA",
          dk: "#3A2899",
        },
        bg: {
          DEFAULT: "#090612",
          2: "#0E0A1C",
          3: "#141026",
          4: "#1A1530",
        },
        orvn: {
          white: "#F2EEFF",
          off: "#D0C8EC",
          muted: "#68607F",
          dim: "#221D38",
          green: "#22C55E",
          amber: "#F59E0B",
          red: "#EF4444",
          teal: "#06B6D4",
        },
      },
      fontFamily: {
        clash: ["'Clash Display'", "sans-serif"],
        epilogue: ["'Epilogue'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-purple":
          "linear-gradient(rgba(91,63,212,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(91,63,212,.055) 1px,transparent 1px)",
      },
      backgroundSize: {
        grid: "56px 56px",
      },
      boxShadow: {
        glow: "0 14px 44px rgba(91,63,212,0.42)",
        "glow-sm": "0 8px 30px rgba(91,63,212,0.3)",
        card: "0 0 80px rgba(91,63,212,.15), 0 40px 80px rgba(0,0,0,.4)",
      },
    },
  },
  plugins: [],
};