import React from 'react';

export default function ProblemIllustration() {
  return (
    <svg viewBox="0 0 500 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="probGrad" x1="0" y1="0" x2="500" y2="340" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DC2626" stopOpacity="0.05"/>
          <stop offset="1" stopColor="#5B3FD4" stopOpacity="0.02"/>
        </linearGradient>
        <linearGradient id="lineLeak" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0.1"/>
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.05"/>
        </filter>
      </defs>

      {/* Background card */}
      <rect width="500" height="340" rx="20" fill="url(#probGrad)"/>
      <rect width="500" height="340" rx="20" stroke="#E5E8F0" strokeWidth="1"/>

      {/* Grid pattern */}
      {[50, 100, 150, 200, 250, 300, 350, 400, 450].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="340" stroke="#0F172A" strokeOpacity="0.02" strokeWidth="1"/>
      ))}
      {[50, 100, 150, 200, 250, 300].map(y => (
        <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#0F172A" strokeOpacity="0.02" strokeWidth="1"/>
      ))}

      {/* House outline (Real estate theme) */}
      <path d="M120 180 L200 110 L280 180 V260 H120 Z" fill="#fff" stroke="#E5E8F0" strokeWidth="2" filter="url(#shadow)"/>
      <path d="M200 110 L120 180 H280 Z" fill="#F0EEFF" stroke="#5B3FD4" strokeWidth="1.5" strokeOpacity="0.6"/>
      {/* Front door */}
      <rect x="180" y="210" width="40" height="50" rx="4" fill="#5B3FD4" fillOpacity="0.15" stroke="#5B3FD4" strokeWidth="1.5"/>
      <circle cx="210" cy="235" r="2" fill="#5B3FD4"/>

      {/* Leads leaking away (CRM graveyard) */}
      <g>
        {/* Leaking connection beams */}
        <path d="M260 210 C 310 210, 310 280, 380 280" stroke="url(#lineLeak)" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite"/>
        </path>
        <path d="M240 230 C 290 230, 290 300, 360 300" stroke="url(#lineLeak)" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2.5s" repeatCount="indefinite"/>
        </path>

        {/* Leaked lead dots falling into a graveyard */}
        <circle r="4" fill="#DC2626">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M260 210 C 310 210, 310 280, 380 280"/>
        </circle>
        <circle r="3" fill="#EF4444">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.8s" path="M240 230 C 290 230, 290 300, 360 300"/>
        </circle>

        {/* Grave / CRM storage unit representation */}
        <g filter="url(#shadow)" transform="translate(350, 240)">
          <rect width="110" height="70" rx="12" fill="#FFF1F1" stroke="#FCA5A5" strokeWidth="1.5"/>
          <text x="55" y="25" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991B1B" fontFamily="'Plus Jakarta Sans',sans-serif">CRM Graveyard</text>
          <text x="55" y="42" textAnchor="middle" fontSize="8" fill="#DC2626" fontFamily="'JetBrains Mono',monospace">leads turn cold</text>
          <text x="55" y="55" textAnchor="middle" fontSize="11" fontWeight="800" fill="#991B1B" fontFamily="'Plus Jakarta Sans',sans-serif">Lost revenue</text>
          <circle cx="12" cy="12" r="3" fill="#DC2626">
            <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite"/>
          </circle>
        </g>
      </g>

      {/* The Qualified Route (What should happen) */}
      <g>
        <path d="M260 150 C 320 150, 340 70, 390 70" stroke="#0D9E6E" strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" fill="none" strokeDasharray="5 3"/>
        
        <circle r="4.5" fill="#0D9E6E">
          <animateMotion dur="3s" repeatCount="indefinite" path="M260 150 C 320 150, 340 70, 390 70"/>
        </circle>

        {/* Calendar booked badge */}
        <g filter="url(#shadow)" transform="translate(360, 35)">
          <rect width="110" height="60" rx="12" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1.5"/>
          <text x="55" y="22" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065F46" fontFamily="'Plus Jakarta Sans',sans-serif">Instant Booking</text>
          <text x="55" y="38" textAnchor="middle" fontSize="8" fill="#0D9E6E" fontFamily="'JetBrains Mono',monospace">PAS ROUTE ✓</text>
          <path d="M12 12 l3 3 l6 -6" stroke="#0D9E6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </g>
      </g>

      {/* Phone call signal lines coming into the house */}
      <g stroke="#5B3FD4" strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M40 180 Q 75 160 110 180" strokeDasharray="3 3">
          <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1.5s" repeatCount="indefinite"/>
        </path>
        <path d="M50 160 Q 80 145 110 165" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="16" to="0" dur="2s" repeatCount="indefinite"/>
        </path>
      </g>

      {/* Floating alert badge */}
      <g transform="translate(30, 40)">
        <rect width="130" height="36" rx="18" fill="#FFF1F1" stroke="#FEE2E2" strokeWidth="1" filter="url(#shadow)"/>
        <circle cx="20" cy="18" r="4" fill="#DC2626">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
        </circle>
        <text x="32" y="22" fontSize="9" fontWeight="700" fill="#991B1B" fontFamily="'Plus Jakarta Sans',sans-serif">Slow first response</text>
      </g>
    </svg>
  );
}
