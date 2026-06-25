import React from 'react';

export default function ProblemIllustration() {
  return (
    <svg viewBox="0 0 520 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="bgGradProb" x1="0" y1="0" x2="520" y2="380">
          <stop stopColor="#FFF5F5" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#F8F9FA" stopOpacity="0.3"/>
        </linearGradient>
        <linearGradient id="leakGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#EF4444" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#FCA5A5" stopOpacity="0.1"/>
        </linearGradient>
        <linearGradient id="successGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0D9E6E"/>
          <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0.5"/>
        </linearGradient>
        <filter id="shadow-sm">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.08"/>
        </filter>
      </defs>

      {/* Background */}
      <rect width="520" height="380" fill="url(#bgGradProb)" rx="24"/>

      {/* Grid pattern */}
      <g opacity="0.06" stroke="#DC2626">
        {[40, 100, 160, 220, 280, 340, 400, 460].map(x => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="380" strokeWidth="0.8"/>
        ))}
        {[60, 120, 180, 240, 300].map(y => (
          <line key={`h${y}`} x1="0" y1={y} x2="520" y2={y} strokeWidth="0.8"/>
        ))}
      </g>

      {/* INCOMING LEADS - top */}
      <g>
        {/* Phone waves coming in */}
        <path d="M 40 80 Q 80 50 120 80" stroke="#5B3FD4" strokeWidth="2" fill="none" opacity="0.5" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite"/>
        </path>
        <path d="M 50 100 Q 90 70 130 100" stroke="#5B3FD4" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="3 3">
          <animate attributeName="stroke-dashoffset" from="6" to="0" dur="2.5s" repeatCount="indefinite"/>
        </path>
      </g>

      {/* LEAD HOUSE/CRM Box */}
      <g filter="url(#shadow-sm)">
        <rect x="110" y="140" width="160" height="150" rx="16" fill="#fff" stroke="#E5E8F0" strokeWidth="1.5"/>

        {/* Roof */}
        <path d="M 110 155 L 190 100 L 270 155 Z" fill="#F0EEFF" stroke="#5B3FD4" strokeWidth="2"/>

        {/* Door */}
        <rect x="160" y="220" width="60" height="70" rx="4" fill="#E5E8F0" stroke="#5B3FD4" strokeWidth="1.5"/>
        <circle cx="210" cy="260" r="2.5" fill="#5B3FD4"/>

        {/* CRM label */}
        <text x="190" y="185" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A" fontFamily="'Plus Jakarta Sans'">Your CRM</text>
        <text x="190" y="200" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono'">LEADS STORED</text>
      </g>

      {/* THE PROBLEM: Leads leaking away */}
      <g>
        {/* Leak path 1 - curving down to graveyard */}
        <path
          d="M 275 190 Q 330 200, 380 280"
          stroke="url(#leakGrad)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="8 4"
          opacity="0.8">
          <animate attributeName="stroke-dashoffset" from="0" to="12" dur="2s" repeatCount="indefinite"/>
        </path>

        {/* Leak path 2 - second leak */}
        <path
          d="M 270 210 Q 320 240, 360 300"
          stroke="url(#leakGrad)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="6 4"
          opacity="0.6">
          <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2.5s" repeatCount="indefinite"/>
        </path>

        {/* Leaking particles */}
        <circle r="4" fill="#DC2626" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 275 190 Q 330 200, 380 280"/>
        </circle>
        <circle r="3" fill="#EF4444" opacity="0.6">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.6s" path="M 270 210 Q 320 240, 360 300"/>
        </circle>
      </g>

      {/* GRAVEYARD - where leads go to die */}
      <g filter="url(#shadow-sm)">
        <rect x="340" y="250" width="140" height="100" rx="12" fill="#FFF5F5" stroke="#FCA5A5" strokeWidth="2"/>

        {/* Tombstones inside */}
        <g opacity="0.4">
          <rect x="358" y="285" width="8" height="20" rx="2" fill="#DC2626"/>
          <rect x="375" y="280" width="8" height="25" rx="2" fill="#DC2626"/>
          <rect x="392" y="283" width="8" height="22" rx="2" fill="#DC2626"/>
          <rect x="409" y="286" width="8" height="19" rx="2" fill="#DC2626"/>
        </g>

        {/* Warning indicator */}
        <circle cx="358" cy="268" r="4" fill="#DC2626">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite"/>
        </circle>

        <text x="410" y="265" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991B1B" fontFamily="'Plus Jakarta Sans'">CRM</text>
        <text x="410" y="278" textAnchor="middle" fontSize="10" fontWeight="800" fill="#DC2626" fontFamily="'Plus Jakarta Sans'">80%</text>
        <text x="410" y="290" textAnchor="middle" fontSize="8" fill="#DC2626" fontFamily="'JetBrains Mono'" fontWeight="600">LOST</text>
      </g>

      {/* THE SOLUTION: Qualified path to booking */}
      <g>
        {/* Success path - fast route */}
        <path
          d="M 275 160 Q 340 120, 390 80"
          stroke="url(#successGrad)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="8 4"
          opacity="0.8">
          <animate attributeName="stroke-dashoffset" from="0" to="12" dur="3s" repeatCount="indefinite"/>
        </path>

        {/* Success particle */}
        <circle r="4" fill="#0D9E6E" opacity="0.9">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 275 160 Q 340 120, 390 80"/>
        </circle>
      </g>

      {/* SUCCESS BOX - instant booking */}
      <g filter="url(#shadow-sm)">
        <rect x="365" y="40" width="130" height="70" rx="12" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="2"/>

        {/* Calendar with checkmark */}
        <g>
          <rect x="385" y="52" width="20" height="20" rx="2" fill="none" stroke="#0D9E6E" strokeWidth="1.5"/>
          <line x1="385" y1="58" x2="405" y2="58" stroke="#0D9E6E" strokeWidth="1"/>
          <path d="M 388 62 L 390 65 L 395 58" stroke="#0D9E6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </g>

        <text x="410" y="70" textAnchor="start" fontSize="10" fontWeight="700" fill="#065F46" fontFamily="'Plus Jakarta Sans'">Booked</text>
        <text x="410" y="85" textAnchor="start" fontSize="8" fill="#0D9E6E" fontFamily="'JetBrains Mono'" fontWeight="600">PAS ROUTE ✓</text>

        {/* Clock showing speed */}
        <g transform="translate(425, 58)">
          <circle cx="0" cy="0" r="6" fill="none" stroke="#0D9E6E" strokeWidth="1"/>
          <line x1="0" y1="-4" x2="0" y2="-1" stroke="#0D9E6E" strokeWidth="1.2"/>
          <line x1="3" y1="-2" x2="4" y2="-1" stroke="#0D9E6E" strokeWidth="1.2"/>
        </g>
      </g>

      {/* Time indicators */}
      <g>
        {/* Bad case - slow */}
        <g>
          <circle cx="80" cy="300" r="3" fill="#DC2626"/>
          <text x="90" y="305" fontSize="9" fill="#DC2626" fontFamily="'Plus Jakarta Sans'" fontWeight="600">42m avg</text>
          <text x="90" y="318" fontSize="7" fill="#94A3B8" fontFamily="'JetBrains Mono'">TOO SLOW</text>
        </g>

        {/* Good case - fast */}
        <g>
          <circle cx="450" cy="100" r="3" fill="#0D9E6E"/>
          <text x="460" y="105" fontSize="9" fill="#0D9E6E" fontFamily="'Plus Jakarta Sans'" fontWeight="600">&lt; 30s</text>
          <text x="460" y="118" fontSize="7" fill="#0D9E6E" fontFamily="'JetBrains Mono'">INSTANT</text>
        </g>
      </g>

      {/* Problem label */}
      <g>
        <rect x="40" y="25" width="160" height="32" rx="16" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1.5"/>
        <circle cx="58" cy="41" r="3" fill="#DC2626"/>
        <text x="70" y="47" fontSize="10" fontWeight="700" fill="#991B1B" fontFamily="'Plus Jakarta Sans'">Delayed response kills conversion</text>
      </g>
    </svg>
  );
}
