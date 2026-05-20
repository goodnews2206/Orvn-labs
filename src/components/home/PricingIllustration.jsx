import React from 'react';

export default function PricingIllustration() {
  return (
    <svg viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="priceGrad" x1="0" y1="0" x2="500" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B3FD4" stopOpacity="0.04"/>
          <stop offset="1" stopColor="#0D9E6E" stopOpacity="0.02"/>
        </linearGradient>
        <linearGradient id="shieldGrad" x1="210" y1="90" x2="290" y2="190" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7B5FEA"/>
          <stop offset="1" stopColor="#5B3FD4"/>
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.04"/>
        </filter>
      </defs>

      {/* Card container */}
      <rect width="500" height="300" rx="20" fill="url(#priceGrad)"/>
      <rect width="500" height="300" rx="20" stroke="#E5E8F0" strokeWidth="1"/>

      {/* Grid background */}
      {[50, 100, 150, 200, 250, 300, 350, 400, 450].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="300" stroke="#5B3FD4" strokeOpacity="0.02" strokeWidth="1"/>
      ))}
      {[50, 100, 150, 200, 250].map(y => (
        <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#5B3FD4" strokeOpacity="0.02" strokeWidth="1"/>
      ))}

      {/* Connection paths */}
      <path d="M100 150 Q 175 90 250 150 T 400 150" stroke="#5B3FD4" strokeWidth="1.5" strokeOpacity="0.2" fill="none"/>
      <path d="M100 180 Q 175 240 250 180 T 400 180" stroke="#0D9E6E" strokeWidth="1.5" strokeOpacity="0.2" fill="none"/>

      {/* Central Shield/Core Node (Infrastructure Pricing Representation) */}
      <g filter="url(#shadow)">
        <rect x="200" y="80" width="100" height="110" rx="16" fill="#fff" stroke="#E5E8F0" strokeWidth="1.5"/>
        <rect x="200" y="80" width="100" height="110" rx="16" stroke="#5B3FD4" strokeOpacity="0.1" strokeWidth="3"/>
        
        {/* Shield icon */}
        <path d="M250 102 C250 102 230 110 230 125 C230 145 250 155 250 155 C250 155 270 145 270 125 C270 110 250 102 250 102 Z" fill="url(#shieldGrad)"/>
        
        <text x="250" y="222" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0F172A" fontFamily="'Plus Jakarta Sans',sans-serif">Custom Tier</text>
        <text x="250" y="235" textAnchor="middle" fontSize="7" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">SECURE INFRASTRUCTURE</text>
      </g>

      {/* Left scale card (Lead Volume node) */}
      <g filter="url(#shadow)" transform="translate(60, 100)">
        <rect width="90" height="70" rx="12" fill="#fff" stroke="#E5E8F0" strokeWidth="1"/>
        <text x="45" y="22" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">VOLUME</text>
        <text x="45" y="44" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0F172A" fontFamily="'Syne',sans-serif">Flexible</text>
        <text x="45" y="58" textAnchor="middle" fontSize="8" fill="#5B3FD4" fontFamily="'Plus Jakarta Sans',sans-serif">Per inbound lead</text>
      </g>

      {/* Right scale card (Complexity/Integration node) */}
      <g filter="url(#shadow)" transform="translate(350, 100)">
        <rect width="90" height="70" rx="12" fill="#fff" stroke="#E5E8F0" strokeWidth="1"/>
        <text x="45" y="22" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">ROUTING</text>
        <text x="45" y="44" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0D9E6E" fontFamily="'Syne',sans-serif">Tailored</text>
        <text x="45" y="58" textAnchor="middle" fontSize="8" fill="#0D9E6E" fontFamily="'Plus Jakarta Sans',sans-serif">CRM integrated</text>
      </g>

      {/* Intersecting rays / connection pulses */}
      <circle r="4" fill="#5B3FD4">
        <animateMotion dur="4s" repeatCount="indefinite" path="M100 150 Q 175 90 250 150"/>
      </circle>
      <circle r="3" fill="#0D9E6E">
        <animateMotion dur="3.5s" repeatCount="indefinite" begin="1s" path="M250 180 T 400 180"/>
      </circle>
    </svg>
  );
}
