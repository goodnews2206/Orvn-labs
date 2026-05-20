import React from 'react';

export default function PasHeroIllustration() {
  return (
    <svg viewBox="0 0 500 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="pasHeroGrad" x1="0" y1="0" x2="500" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B3FD4" stopOpacity="0.06"/>
          <stop offset="1" stopColor="#5B3FD4" stopOpacity="0.01"/>
        </linearGradient>
        <linearGradient id="pulseGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5B3FD4"/>
          <stop offset="100%" stopColor="#7B5FEA"/>
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.04"/>
        </filter>
        <filter id="purpleGlow">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Frame background */}
      <rect width="500" height="360" rx="20" fill="url(#pasHeroGrad)"/>
      <rect width="500" height="360" rx="20" stroke="#E5E8F0" strokeWidth="1"/>

      {/* Grid Pattern */}
      {[50, 100, 150, 200, 250, 300, 350, 400, 450].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="360" stroke="#5B3FD4" strokeOpacity="0.02" strokeWidth="1"/>
      ))}
      {[50, 100, 150, 200, 250, 300].map(y => (
        <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#5B3FD4" strokeOpacity="0.02" strokeWidth="1"/>
      ))}

      {/* Connection rails */}
      <path d="M100 180 H 400" stroke="#5B3FD4" strokeWidth="2" strokeOpacity="0.15" strokeLinecap="round"/>
      <path d="M250 180 V 270" stroke="#5B3FD4" strokeWidth="2" strokeOpacity="0.15" strokeLinecap="round"/>

      {/* Left Input Node: Inbound Lead */}
      <g filter="url(#shadow)" transform="translate(40, 135)">
        <rect width="110" height="90" rx="16" fill="#fff" stroke="#E5E8F0" strokeWidth="1"/>
        <circle cx="55" cy="35" r="16" fill="#F0EEFF"/>
        
        {/* Calling wave lines */}
        <path d="M50 30 a6 6 0 0 1 10 0" stroke="#5B3FD4" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M47 27 a10 10 0 0 1 16 0" stroke="#5B3FD4" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" fill="none"/>
        
        <text x="55" y="68" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0F172A" fontFamily="'Plus Jakarta Sans',sans-serif">Inbound Lead</text>
        <text x="55" y="80" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">UNFILTERED</text>
      </g>

      {/* Central Super Engine Node */}
      <g filter="url(#shadow)" transform="translate(195, 115)">
        <rect width="110" height="130" rx="18" fill="#fff" stroke="#5B3FD4" strokeWidth="1.5"/>
        <rect width="110" height="5" rx="2" fill="#5B3FD4"/>
        
        <circle cx="55" cy="50" r="22" fill="url(#pulseGlow)" filter="url(#purpleGlow)">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
        </circle>
        <text x="55" y="55" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="700">⚡</text>

        <text x="55" y="94" textAnchor="middle" fontSize="11" fontWeight="800" fill="#3A2899" fontFamily="'Syne',sans-serif">PAS Engine</text>
        <text x="55" y="108" textAnchor="middle" fontSize="7.5" fill="#5B3FD4" fontWeight="700" fontFamily="'JetBrains Mono',monospace">STATE MACHINE</text>
      </g>

      {/* Right Node: Booked Agent Calendar */}
      <g filter="url(#shadow)" transform="translate(350, 135)">
        <rect width="110" height="90" rx="16" fill="#fff" stroke="#E5E8F0" strokeWidth="1"/>
        <circle cx="55" cy="35" r="16" fill="#ECFDF5"/>
        
        {/* Calendar checkmark representation */}
        <path d="M48 35 l4 4 l10 -10" stroke="#0D9E6E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

        <text x="55" y="68" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#065F46" fontFamily="'Plus Jakarta Sans',sans-serif">Booked Agent</text>
        <text x="55" y="80" textAnchor="middle" fontSize="8" fill="#0D9E6E" fontFamily="'JetBrains Mono',monospace">CALENDAR ✓</text>
      </g>

      {/* Bottom Node: CRM & Slack logging */}
      <g filter="url(#shadow)" transform="translate(195, 270)">
        <rect width="110" height="64" rx="14" fill="#F8FAFC" stroke="#E5E8F0" strokeWidth="1"/>
        <text x="55" y="28" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#475569" fontFamily="'Plus Jakarta Sans',sans-serif">Logged Clean</text>
        <text x="55" y="44" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">CRM + SLACK</text>
        <circle cx="16" cy="16" r="3" fill="#0D9E6E"/>
      </g>

      {/* Particles traversing */}
      <circle r="4.5" fill="#5B3FD4" filter="url(#purpleGlow)">
        <animateMotion dur="3s" repeatCount="indefinite" path="M150 180 H 195"/>
      </circle>
      <circle r="4" fill="#0D9E6E">
        <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.5s" path="M305 180 H 350"/>
      </circle>
      <circle r="3.5" fill="#5B3FD4">
        <animateMotion dur="2s" repeatCount="indefinite" begin="1s" path="M250 245 V 270"/>
      </circle>

      {/* Speed response floating tag */}
      <g transform="translate(130, 60)">
        <rect width="84" height="28" rx="14" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1" filter="url(#shadow)"/>
        <text x="42" y="17" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#92400E" fontFamily="'Plus Jakarta Sans',sans-serif">Delay deleted</text>
      </g>
    </svg>
  );
}
