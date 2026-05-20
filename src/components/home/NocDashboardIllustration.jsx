import React from 'react';

export default function NocDashboardIllustration() {
  return (
    <svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="nocGrad" x1="0" y1="0" x2="500" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B3FD4" stopOpacity="0.05"/>
          <stop offset="1" stopColor="#0D9E6E" stopOpacity="0.02"/>
        </linearGradient>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5B3FD4" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#5B3FD4" stopOpacity="0.0"/>
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.15"/>
        </filter>
      </defs>

      {/* Frame background */}
      <rect width="500" height="280" rx="16" fill="url(#nocGrad)"/>
      <rect width="500" height="280" rx="16" stroke="#1E293B" strokeWidth="1"/>

      {/* Grid Pattern inside dashboard */}
      {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="280" stroke="#FFF" strokeOpacity="0.02" strokeWidth="1"/>
      ))}
      {[40, 80, 120, 160, 200, 240].map(y => (
        <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#FFF" strokeOpacity="0.02" strokeWidth="1"/>
      ))}

      {/* Sidebar navigation placeholder mock */}
      <g opacity="0.3">
        <rect x="0" y="0" width="60" height="280" fill="#1E293B" fillOpacity="0.4"/>
        <line x1="60" y1="0" x2="60" y2="280" stroke="#334155" strokeWidth="1"/>
        {[20, 50, 80, 110].map(y => (
          <circle key={y} cx="30" cy={y} r="6" fill="#FFF" opacity="0.4"/>
        ))}
      </g>

      {/* Top dashboard stats cards mockup */}
      <g filter="url(#shadow)" transform="translate(80, 20)">
        {/* Card 1 */}
        <g>
          <rect width="115" height="60" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="1"/>
          <text x="14" y="20" fontSize="7" fontWeight="700" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">ACTIVE RUNTIME</text>
          <text x="14" y="42" fontSize="18" fontWeight="800" fill="#A78BFA" fontFamily="'Syne',sans-serif">99.98%</text>
          <circle cx="100" cy="18" r="3" fill="#10B981"/>
        </g>

        {/* Card 2 */}
        <g transform="translate(130, 0)">
          <rect width="115" height="60" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="1"/>
          <text x="14" y="20" fontSize="7" fontWeight="700" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">ROUTED LEADS</text>
          <text x="14" y="42" fontSize="18" fontWeight="800" fill="#10B981" fontFamily="'Syne',sans-serif">842</text>
        </g>

        {/* Card 3 */}
        <g transform="translate(260, 0)">
          <rect width="125" height="60" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="1"/>
          <text x="14" y="20" fontSize="7" fontWeight="700" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">RESPONSE RATE</text>
          <text x="14" y="42" fontSize="18" fontWeight="800" fill="#FFF" fontFamily="'Syne',sans-serif">&lt; 3.2s</text>
        </g>
      </g>

      {/* Central Interactive Chart area mockup */}
      <g filter="url(#shadow)" transform="translate(80, 100)">
        <rect width="385" height="150" rx="12" fill="#1E293B" fillOpacity="0.6" stroke="#334155" strokeWidth="1"/>
        <text x="18" y="24" fontSize="8" fontWeight="700" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">CONVERSION SPIKE OVER TIME</text>
        
        {/* Real chart grid lines */}
        {[30, 60, 90, 120].map(y => (
          <line key={y} x1="18" y1={y} x2="367" y2={y} stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2"/>
        ))}

        {/* Chart fill path */}
        <path d="M 20 120 Q 80 80 140 100 T 260 50 T 360 40 L 360 140 L 20 140 Z" fill="url(#chartGrad)"/>
        
        {/* Chart line path */}
        <path d="M 20 120 Q 80 80 140 100 T 260 50 T 360 40" stroke="#7B5FEA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        
        {/* Glowing chart pulse dots */}
        <circle cx="260" cy="50" r="4.5" fill="#7B5FEA" stroke="#FFF" strokeWidth="1.5"/>
        <circle cx="360" cy="40" r="4.5" fill="#10B981" stroke="#FFF" strokeWidth="1.5"/>
      </g>
    </svg>
  );
}
