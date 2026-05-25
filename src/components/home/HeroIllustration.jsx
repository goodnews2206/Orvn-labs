import React from 'react';

// Custom SVG illustration showing lead flowing through PAS system —
// a real-estate brokerage AI pipeline: phone ring → AI brain → routed agent → booked calendar
export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 520 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="heroGrad" x1="0" y1="0" x2="520" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B3FD4" stopOpacity="0.06"/>
          <stop offset="1" stopColor="#0D9E6E" stopOpacity="0.04"/>
        </linearGradient>
        <linearGradient id="pipeGrad" x1="60" y1="200" x2="460" y2="200">
          <stop stopColor="#5B3FD4" stopOpacity="0.15"/>
          <stop offset="0.5" stopColor="#5B3FD4" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#0D9E6E" stopOpacity="0.2"/>
        </linearGradient>
        <filter id="glow1"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="cardShadow"><feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.06"/></filter>
      </defs>

      {/* Background */}
      <rect width="520" height="400" rx="24" fill="url(#heroGrad)"/>

      {/* Grid lines */}
      {[80,160,240,320,400].map(x=><line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" stroke="#5B3FD4" strokeOpacity="0.04" strokeWidth="1"/>)}
      {[80,160,240,320].map(y=><line key={`h${y}`} x1="0" y1={y} x2="520" y2={y} stroke="#5B3FD4" strokeOpacity="0.04" strokeWidth="1"/>)}

      {/* Connection pipeline */}
      <path d="M100 200 C160 200, 160 140, 220 140 S320 200, 340 200 S400 160, 420 160" stroke="url(#pipeGrad)" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="8 4">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2s" repeatCount="indefinite"/>
      </path>

      {/* Node 1: Lead Inquiry — Phone icon */}
      <g filter="url(#cardShadow)">
        <rect x="40" y="155" width="110" height="90" rx="16" fill="#fff"/>
        <rect x="40" y="155" width="110" height="90" rx="16" stroke="#E5E8F0" strokeWidth="1"/>
        <circle cx="95" cy="185" r="16" fill="#F0EEFF"/>
        <path d="M89 179 a6 6 0 0 1 12 0v2a2 2 0 0 1-2 2h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1m-8 0h-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 0 2-2v-2" stroke="#5B3FD4" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="95" cy="185" r="20" stroke="#5B3FD4" strokeOpacity="0.15" strokeWidth="1" fill="none">
          <animate attributeName="r" values="20;24;20" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="stroke-opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite"/>
        </circle>
        <text x="95" y="222" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0F172A" fontFamily="'Plus Jakarta Sans',sans-serif">Lead Inquiry</text>
        <text x="95" y="235" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">INBOUND</text>
      </g>

      {/* Node 2: PAS AI Brain */}
      <g filter="url(#cardShadow)">
        <rect x="195" y="95" width="130" height="110" rx="18" fill="#fff"/>
        <rect x="195" y="95" width="130" height="110" rx="18" stroke="#D4CBF9" strokeWidth="1.5"/>
        <rect x="195" y="95" width="130" height="4" rx="2" fill="#5B3FD4"/>
        <circle cx="260" cy="135" r="20" fill="#F0EEFF"/>
        <text x="260" y="139" textAnchor="middle" fontSize="16" fill="#5B3FD4" fontWeight="700" fontFamily="'Plus Jakarta Sans',sans-serif">⚡</text>
        <circle cx="260" cy="135" r="24" stroke="#5B3FD4" strokeOpacity="0.1" fill="none" strokeWidth="1" strokeDasharray="4 3">
          <animateTransform attributeName="transform" type="rotate" from="0 260 135" to="360 260 135" dur="12s" repeatCount="indefinite"/>
        </circle>
        <text x="260" y="172" textAnchor="middle" fontSize="11" fontWeight="800" fill="#3A2899" fontFamily="'Plus Jakarta Sans',sans-serif">PAS ENGINE</text>
        <text x="260" y="186" textAnchor="middle" fontSize="8" fill="#7B5FEA" fontFamily="'JetBrains Mono',monospace">QUALIFY · ROUTE · BOOK</text>
      </g>

      {/* Node 3: Routed Agent — Person icon */}
      <g filter="url(#cardShadow)">
        <rect x="370" y="115" width="110" height="90" rx="16" fill="#fff"/>
        <rect x="370" y="115" width="110" height="90" rx="16" stroke="#A7F3D0" strokeWidth="1"/>
        <circle cx="425" cy="145" r="14" fill="#ECFDF5"/>
        <circle cx="425" cy="141" r="5" fill="#0D9E6E"/>
        <path d="M415 153 a10 8 0 0 1 20 0" fill="#0D9E6E" opacity="0.3"/>
        <text x="425" y="177" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065F46" fontFamily="'Plus Jakarta Sans',sans-serif">Routed</text>
        <text x="425" y="190" textAnchor="middle" fontSize="8" fill="#0D9E6E" fontFamily="'JetBrains Mono',monospace">BOOKED ✓</text>
      </g>

      {/* Status badges floating */}
      <g>
        <rect x="320" y="55" width="88" height="26" rx="13" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1">
          <animate attributeName="y" values="55;50;55" dur="4s" repeatCount="indefinite"/>
        </rect>
        <circle cx="334" cy="68" r="3" fill="#0D9E6E">
          <animate attributeName="y" values="55;50;55" dur="4s" repeatCount="indefinite"/>
        </circle>
        <text x="364" y="72" textAnchor="middle" fontSize="8" fontWeight="600" fill="#065F46" fontFamily="'JetBrains Mono',monospace">
          <animate attributeName="y" values="72;67;72" dur="4s" repeatCount="indefinite"/>
          &lt; 30s
        </text>
      </g>

      {/* Bottom metrics row */}
      <g filter="url(#cardShadow)">
        <rect x="60" y="290" width="400" height="70" rx="16" fill="#fff"/>
        <rect x="60" y="290" width="400" height="70" rx="16" stroke="#E5E8F0" strokeWidth="1"/>
        {/* Metric 1 */}
        <text x="130" y="318" textAnchor="middle" fontSize="18" fontWeight="800" fill="#0F172A" fontFamily="'Plus Jakarta Sans',sans-serif">94%</text>
        <text x="130" y="334" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">CONTACT RATE</text>
        {/* Divider */}
        <line x1="200" y1="300" x2="200" y2="350" stroke="#F1F5F9" strokeWidth="1"/>
        {/* Metric 2 */}
        <text x="260" y="318" textAnchor="middle" fontSize="18" fontWeight="800" fill="#5B3FD4" fontFamily="'Plus Jakarta Sans',sans-serif">24/7</text>
        <text x="260" y="334" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">AVAILABILITY</text>
        {/* Divider */}
        <line x1="320" y1="300" x2="320" y2="350" stroke="#F1F5F9" strokeWidth="1"/>
        {/* Metric 3 */}
        <text x="390" y="318" textAnchor="middle" fontSize="18" fontWeight="800" fill="#0D9E6E" fontFamily="'Plus Jakarta Sans',sans-serif">0</text>
        <text x="390" y="334" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono',monospace">LEADS MISSED</text>
      </g>

      {/* Data particles flowing */}
      {[0,1,2].map(i => (
        <circle key={i} r="3" fill="#5B3FD4" opacity="0.4">
          <animateMotion dur={`${2+i*0.5}s`} repeatCount="indefinite" begin={`${i*0.6}s`}>
            <mpath href="#flowPath"/>
          </animateMotion>
        </circle>
      ))}
      <path id="flowPath" d="M100 200 C160 200, 160 140, 220 140 S320 200, 340 200 S400 160, 420 160" fill="none" stroke="none"/>
    </svg>
  );
}
