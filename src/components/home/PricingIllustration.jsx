import React from 'react';

export default function PricingIllustration() {
  return (
    <svg viewBox="0 0 520 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="bgGradPrice" x1="0" y1="0" x2="520" y2="340">
          <stop stopColor="#F3F0FF" stopOpacity="0.2"/>
          <stop offset="1" stopColor="#FAFBFC" stopOpacity="0.2"/>
        </linearGradient>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#7B5FEA"/>
          <stop offset="1" stopColor="#5B3FD4"/>
        </linearGradient>
        <linearGradient id="pulseGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#5B3FD4" stopOpacity="0.8"/>
          <stop offset="1" stopColor="#0D9E6E" stopOpacity="0.8"/>
        </linearGradient>
        <filter id="shadow-md">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#5B3FD4" floodOpacity="0.1"/>
        </filter>
      </defs>

      {/* Background */}
      <rect width="520" height="340" fill="url(#bgGradPrice)" rx="24"/>

      {/* Grid pattern - very subtle */}
      <g opacity="0.04" stroke="#5B3FD4">
        {[40, 100, 160, 220, 280, 340, 400, 460].map(x => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="340" strokeWidth="0.8"/>
        ))}
        {[50, 110, 170, 230, 290].map(y => (
          <line key={`h${y}`} x1="0" y1={y} x2="520" y2={y} strokeWidth="0.8"/>
        ))}
      </g>

      {/* Connection lines - infrastructure topology */}
      <g stroke="#5B3FD4" strokeWidth="1.5" opacity="0.15" strokeDasharray="4 4">
        <path d="M 100 150 Q 140 100, 200 150"/>
        <path d="M 100 200 Q 140 250, 200 200"/>
        <path d="M 320 150 Q 360 100, 420 150"/>
        <path d="M 320 200 Q 360 250, 420 200"/>
      </g>

      {/* LEFT SCALE: Volume/Lead Input */}
      <g filter="url(#shadow-md)">
        <rect x="40" y="120" width="110" height="110" rx="14" fill="#fff" stroke="#E5E8F0" strokeWidth="1.5"/>

        {/* Nested squares for "volume" concept */}
        <g opacity="0.3">
          <rect x="55" y="145" width="25" height="25" rx="3" fill="#5B3FD4"/>
          <rect x="70" y="155" width="25" height="25" rx="3" fill="#5B3FD4"/>
          <rect x="55" y="170" width="25" height="25" rx="3" fill="#5B3FD4"/>
          <rect x="70" y="180" width="25" height="25" rx="3" fill="#5B3FD4"/>
        </g>

        <text x="95" y="150" textAnchor="middle" fontSize="9" fill="#94A3B8" fontFamily="'JetBrains Mono'" fontWeight="600">VOLUME</text>
        <text x="95" y="175" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0F172A" fontFamily="'Plus Jakarta Sans'">Flex</text>
        <text x="95" y="194" textAnchor="middle" fontSize="8" fill="#5B3FD4" fontFamily="'Plus Jakarta Sans'" fontWeight="600">Per lead</text>
      </g>

      {/* CENTER: Central Shield - Core Infrastructure */}
      <g filter="url(#shadow-md)">
        <rect x="205" y="80" width="110" height="180" rx="16" fill="#fff" stroke="#E5E8F0" strokeWidth="1.5"/>

        {/* Top accent bar */}
        <rect x="205" y="80" width="110" height="5" rx="3" fill="#5B3FD4"/>

        {/* Shield icon */}
        <g transform="translate(260, 135)">
          <defs>
            <linearGradient id="shieldInner" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#7B5FEA"/>
              <stop offset="1" stopColor="#5B3FD4"/>
            </linearGradient>
          </defs>
          <path
            d="M 0 -18 C -12 -10 -18 0 -18 12 C -18 28 0 38 0 38 C 0 38 18 28 18 12 C 18 0 12 -10 0 -18 Z"
            fill="url(#shieldInner)"
            stroke="#5B3FD4"
            strokeWidth="1"
            opacity="0.9"/>

          {/* Checkmark inside shield */}
          <path d="M -5 5 L 0 10 L 8 0" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
        </g>

        {/* Core label */}
        <text x="260" y="200" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0F172A" fontFamily="'Plus Jakarta Sans'">Custom</text>
        <text x="260" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0F172A" fontFamily="'Plus Jakarta Sans'">Pricing</text>
        <text x="260" y="228" textAnchor="middle" fontSize="8" fill="#7B5FEA" fontFamily="'JetBrains Mono'" fontWeight="600">SECURE</text>
      </g>

      {/* RIGHT SCALE: Complexity/Routing */}
      <g filter="url(#shadow-md)">
        <rect x="370" y="120" width="110" height="110" rx="14" fill="#fff" stroke="#A7F3D0" strokeWidth="1.5"/>

        {/* Connected nodes for "routing" concept */}
        <g opacity="0.5">
          <circle cx="405" cy="155" r="6" fill="#0D9E6E"/>
          <circle cx="420" cy="165" r="6" fill="#0D9E6E"/>
          <circle cx="405" cy="175" r="6" fill="#0D9E6E"/>
          <line x1="405" y1="155" x2="420" y2="165" stroke="#0D9E6E" strokeWidth="1.5"/>
          <line x1="420" y1="165" x2="405" y2="175" stroke="#0D9E6E" strokeWidth="1.5"/>
        </g>

        <text x="425" y="150" textAnchor="middle" fontSize="9" fill="#0D9E6E" fontFamily="'JetBrains Mono'" fontWeight="600">ROUTING</text>
        <text x="425" y="175" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0D9E6E" fontFamily="'Plus Jakarta Sans'">CRM</text>
        <text x="425" y="194" textAnchor="middle" fontSize="8" fill="#0D9E6E" fontFamily="'Plus Jakarta Sans'" fontWeight="600">Tailored</text>
      </g>

      {/* Animated pulse particles flowing between components */}
      {[0, 1].map((i) => (
        <g key={i} opacity="0.6">
          <circle r="3" fill="url(#pulseGrad)">
            <animateMotion dur={`${4 + i * 1}s`} repeatCount="indefinite" begin={`${i * 1.2}s`}>
              <mpath href="#flowPath1"/>
            </animateMotion>
          </circle>
          <circle r="2.5" fill="url(#pulseGrad)">
            <animateMotion dur={`${4 + i * 1}s`} repeatCount="indefinite" begin={`${i * 1.2}s`}>
              <mpath href="#flowPath2"/>
            </animateMotion>
          </circle>
        </g>
      ))}

      {/* Flow paths */}
      <path id="flowPath1" d="M 150 160 Q 180 120 205 140" fill="none"/>
      <path id="flowPath2" d="M 315 160 Q 340 120 370 140" fill="none"/>

      {/* Bottom pricing table/matrix */}
      <g>
        <rect x="40" y="260" width="440" height="60" rx="12" fill="#fff" stroke="#E5E8F0" strokeWidth="1.5"/>

        {/* Column headers */}
        <line x1="40" y1="290" x2="480" y2="290" stroke="#E5E8F0" strokeWidth="1"/>

        {/* Left column */}
        <g>
          <text x="60" y="278" fontSize="9" fill="#94A3B8" fontFamily="'JetBrains Mono'" fontWeight="600">VOLUME</text>
          <text x="60" y="310" fontSize="13" fontWeight="700" fill="#0F172A" fontFamily="'Plus Jakarta Sans'">50-500 leads</text>
        </g>

        {/* Divider */}
        <line x1="180" y1="260" x2="180" y2="320" stroke="#E5E8F0" strokeWidth="1.5"/>

        {/* Middle column */}
        <g>
          <text x="260" y="278" fontSize="9" fill="#5B3FD4" fontFamily="'JetBrains Mono'" fontWeight="600">INTEGRATION</text>
          <text x="260" y="310" fontSize="13" fontWeight="700" fill="#5B3FD4" fontFamily="'Plus Jakarta Sans'">CRM + Routes</text>
        </g>

        {/* Divider */}
        <line x1="340" y1="260" x2="340" y2="320" stroke="#E5E8F0" strokeWidth="1.5"/>

        {/* Right column */}
        <g>
          <text x="420" y="278" fontSize="9" fill="#0D9E6E" fontFamily="'JetBrains Mono'" fontWeight="600">DEPLOYMENT</text>
          <text x="420" y="310" fontSize="13" fontWeight="700" fill="#0D9E6E" fontFamily="'Plus Jakarta Sans'">1-2 weeks</text>
        </g>
      </g>

      {/* Corner accents */}
      <g stroke="#5B3FD4" strokeWidth="1.5" opacity="0.2">
        <line x1="40" y1="30" x2="70" y2="30"/>
        <line x1="40" y1="30" x2="40" y2="60"/>
        <line x1="480" y1="310" x2="450" y2="310"/>
        <line x1="480" y1="310" x2="480" y2="280"/>
      </g>

      {/* Flexibility note */}
      <g>
        <circle cx="490" cy="155" r="6" fill="#5B3FD4" opacity="0.2"/>
        <text x="495" y="160" fontSize="7" fill="#5B3FD4" fontFamily="'JetBrains Mono'" fontWeight="600">Scales</text>
        <text x="495" y="170" fontSize="7" fill="#5B3FD4" fontFamily="'JetBrains Mono'" fontWeight="600">with you</text>
      </g>
    </svg>
  );
}
