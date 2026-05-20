import React from 'react';

export default function EngineArchitectureIllustration() {
  return (
    <svg viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="engGrad" x1="0" y1="0" x2="500" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B3FD4" stopOpacity="0.04"/>
          <stop offset="1" stopColor="#5B3FD4" stopOpacity="0.01"/>
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="120" x2="500" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B3FD4" stopOpacity="0.1"/>
          <stop offset="0.5" stopColor="#5B3FD4" strokeOpacity="0.5"/>
          <stop offset="1" stopColor="#0D9E6E" stopOpacity="0.2"/>
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.04"/>
        </filter>
      </defs>

      {/* Background container */}
      <rect width="500" height="240" rx="16" fill="url(#engGrad)"/>
      <rect width="500" height="240" rx="16" stroke="#E5E8F0" strokeWidth="1"/>

      {/* Grid Pattern */}
      {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="240" stroke="#5B3FD4" strokeOpacity="0.02" strokeWidth="1"/>
      ))}
      {[40, 80, 120, 160, 200].map(y => (
        <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#5B3FD4" strokeOpacity="0.02" strokeWidth="1"/>
      ))}

      {/* Main engine bus bar */}
      <path d="M60 120 Q 150 70 250 120 T 440 120" stroke="url(#lineGrad)" strokeWidth="2.5" fill="none" strokeDasharray="6 3"/>

      {/* Nodes mapping */}
      {/* Node 1: State Machine */}
      <g filter="url(#shadow)" transform="translate(40, 75)">
        <rect width="110" height="90" rx="12" fill="#fff" stroke="#E5E8F0" strokeWidth="1"/>
        <rect width="110" height="4" rx="2" fill="#5B3FD4"/>
        <text x="55" y="24" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">ENGINE LAYER</text>
        <text x="55" y="48" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0F172A" fontFamily="'Syne',sans-serif">State Machine</text>
        <text x="55" y="66" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#5B3FD4" fontFamily="'Plus Jakarta Sans',sans-serif">Deterministic transitions</text>
      </g>

      {/* Node 2: Async Services */}
      <g filter="url(#shadow)" transform="translate(195, 75)">
        <rect width="110" height="90" rx="12" fill="#fff" stroke="#E5E8F0" strokeWidth="1"/>
        <rect width="110" height="4" rx="2" fill="#7B5FEA"/>
        <text x="55" y="24" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">SIMULATION</text>
        <text x="55" y="48" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0F172A" fontFamily="'Syne',sans-serif">Async Router</text>
        <text x="55" y="66" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#7B5FEA" fontFamily="'Plus Jakarta Sans',sans-serif">Queued notifications</text>
      </g>

      {/* Node 3: Verification */}
      <g filter="url(#shadow)" transform="translate(350, 75)">
        <rect width="110" height="90" rx="12" fill="#fff" stroke="#E5E8F0" strokeWidth="1"/>
        <rect width="110" height="4" rx="2" fill="#0D9E6E"/>
        <text x="55" y="24" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">QUALITY ASSURED</text>
        <text x="55" y="48" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0F172A" fontFamily="'Syne',sans-serif">Full Test Suite</text>
        <text x="55" y="66" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#0D9E6E" fontFamily="'Plus Jakarta Sans',sans-serif">140+ unit checks</text>
      </g>

      {/* Floating particles */}
      <circle r="3.5" fill="#5B3FD4">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M60 120 Q 150 70 250 120 T 440 120"/>
      </circle>
    </svg>
  );
}
