/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        "ink-mid": "#475569",
        "ink-dim": "#94A3B8",
        background: "#FFFFFF",
        surface: "#F7F8FB",
        line: "#E5E8F0",
        "line-strong": "#CFD4E2",
        primary: {
          DEFAULT: "#5B3FD4",
          light: "#7B5FEA",
          dark: "#3A2899",
          pale: "#EEEAFB",
        },
        signal: {
          risk: "#DC2626",
          "risk-pale": "#FEF2F2",
          ok: "#0D9E6E",
          "ok-pale": "#ECFDF5",
          warn: "#D97706",
          "warn-pale": "#FFFBEB",
        },
      },
      fontFamily: {
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.05)",
        "card-hover": "0 2px 4px rgba(15,23,42,0.06), 0 12px 28px rgba(15,23,42,0.08)",
        ring: "0 0 0 4px rgba(91,63,212,0.12)",
      },
      maxWidth: {
        page: "1160px",
        prose: "680px",
      },
    },
  },
  plugins: [],
};
