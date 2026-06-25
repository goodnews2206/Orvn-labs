import React from 'react';

export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 560 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="bgGradHero" x1="0" y1="0" x2="560" y2="420">
          <stop stopColor="#F3F0FF" stopOpacity="0.4"/>
          <stop offset="1" stopColor="#F0FFFE" stopOpacity="0.4"/>
        </linearGradient>
        <linearGradient id="flowGrad" x1="50" y1="200" x2="510" y2="200">
          <stop stopColor="#5B3FD4" stopOpacity="0.8"/>
          <stop offset="0.5" stopColor="#7B5FEA" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#0D9E6E" stopOpacity="0.8"/>
        </linearGradient>
        <filter id="shadow-lg">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#5B3FD4" floodOpacity="0.15"/>
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="560" height="420" fill="url(#bgGradHero)" rx="28"/>

      {/* Subtle grid pattern */}
      <g opacity="0.08" stroke="#5B3FD4" strokeWidth="1">
        {[0, 70, 140, 210, 280, 350, 420, 490].map(x => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="420"/>
        ))}
        {[0, 70, 140, 210, 280, 350].map(y => (
          <line key={`h${y}`} x1="0" y1={y} x2="560" y2={y}/>
        ))}
      </g>

      {/* Main flow pipeline - curved path */}
      <path
        d="M 80 210 Q 140 140, 210 140 T 350 210 T 480 150"
        stroke="url(#flowGrad)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="12 6"
        opacity="0.7">
        <animate attributeName="stroke-dashoffset" from="0" to="18" dur="3s" repeatCount="indefinite"/>
      </path>

      {/* PHASE 1: Phone/Lead Input */}
      <g filter="url(#shadow-lg)">
        <rect x="35" y="165" width="90" height="90" rx="16" fill="#fff" stroke="#E5E8F0" strokeWidth="1.5"/>
        <circle cx="80" cy="195" r="20" fill="#F0EEFF"/>
        {/* Phone icon */}
        <path d="M 75 185 Q 75 182 77 182 L 83 182 Q 85 182 85 185 L 85 210 Q 85 213 83 213 L 77 213 Q 75 213 75 210 Z"
              fill="none" stroke="#5B3FD4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="80" cy="200" r="1" fill="#5B3FD4"/>

        {/* Animated pulse ring */}
        <circle cx="80" cy="195" r="24" fill="none" stroke="#5B3FD4" strokeWidth="2" opacity="0.4">
          <animate attributeName="r" values="24;32" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite"/>
        </circle>

        <text x="80" y="232" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A" fontFamily="'Plus Jakarta Sans'">Inbound</text>
        <text x="80" y="244" textAnchor="middle" fontSize="9" fill="#94A3B8" fontFamily="'JetBrains Mono'">LEAD</text>
      </g>

      {/* PHASE 2: AI Brain/Engine */}
      <g filter="url(#shadow-lg)">
        <rect x="165" y="115" width="90" height="90" rx="16" fill="#fff" stroke="#D4CBF9" strokeWidth="2"/>
        <rect x="165" y="115" width="90" height="6" rx="3" fill="#5B3FD4"/>

        {/* Brain-like icon with dual circles */}
        <circle cx="204" cy="155" r="12" fill="none" stroke="#5B3FD4" strokeWidth="2"/>
        <circle cx="216" cy="155" r="12" fill="none" stroke="#7B5FEA" strokeWidth="2"/>
        <rect x="200" y="151" width="20" height="8" fill="#5B3FD4" opacity="0.15" rx="2"/>

        {/* Rotating elements inside */}
        <g opacity="0.6">
          <circle cx="210" cy="155" r="18" fill="none" stroke="#5B3FD4" strokeWidth="1" strokeDasharray="4 3">
            <animateTransform attributeName="transform" type="rotate" from="0 210 155" to="360 210 155" dur="8s" repeatCount="indefinite"/>
          </circle>
        </g>

        <text x="210" y="178" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3A2899" fontFamily="'Plus Jakarta Sans'">PAS</text>
        <text x="210" y="190" textAnchor="middle" fontSize="8" fill="#7B5FEA" fontFamily="'JetBrains Mono'">QUALIFY</text>
      </g>

      {/* PHASE 3: Agent/Booking */}
      <g filter="url(#shadow-lg)">
        <rect x="295" y="140" width="90" height="90" rx="16" fill="#fff" stroke="#A7F3D0" strokeWidth="1.5"/>

        {/* Person icon */}
        <circle cx="340" cy="165" r="8" fill="#0D9E6E" opacity="0.7"/>
        <path d="M 340 174 Q 334 180 334 185 L 334 195 Q 334 197 336 197 L 344 197 Q 346 197 346 195 L 346 185 Q 346 180 340 174 Z"
              fill="#0D9E6E" opacity="0.5"/>

        {/* Calendar checkmark */}
        <rect x="335" y="182" width="10" height="10" rx="2" fill="none" stroke="#0D9E6E" strokeWidth="1.2"/>
        <path d="M 337 186 L 339 188 L 343 184" stroke="#0D9E6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

        <text x="340" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065F46" fontFamily="'Plus Jakarta Sans'">Booked</text>
        <text x="340" y="230" textAnchor="middle" fontSize="9" fill="#0D9E6E" fontFamily="'JetBrains Mono'">✓ ROUTE</text>
      </g>

      {/* PHASE 4: Success/Metrics */}
      <g filter="url(#shadow-lg)">
        <rect x="425" y="110" width="90" height="90" rx="16" fill="#fff" stroke="#FEE2E2" strokeWidth="1.5"/>

        {/* Upward arrow with growth indicator */}
        <path d="M 455 175 L 455 155 M 445 165 L 455 155 L 465 165"
              stroke="#0D9E6E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Percentage symbol */}
        <circle cx="475" cy="160" r="3" fill="#0D9E6E"/>
        <text x="482" y="165" fontSize="14" fontWeight="800" fill="#0D9E6E" fontFamily="'Plus Jakarta Sans'">94</text>

        <text x="470" y="198" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065F46" fontFamily="'Plus Jakarta Sans'">Contact</text>
        <text x="470" y="210" textAnchor="middle" fontSize="8" fill="#0D9E6E" fontFamily="'JetBrains Mono'">RATE</text>
      </g>

      {/* Data particles flowing along path - 3 particles with different timing */}
      {[0, 1, 2].map((i) => (
        <g key={i} filter="url(#glow)">
          <animateMotion dur={`${3 + i * 0.6}s`} repeatCount="indefinite" begin={`${i * 0.8}s`}>
            <path d="M 80 210 Q 140 140, 210 140 T 350 210 T 480 150" fill="none"/>
            <circle r="5" fill="#5B3FD4" opacity="0.7"/>
          </animateMotion>
        </g>
      ))}

      {/* Bottom metric bar */}
      <g filter="url(#shadow-lg)">
        <rect x="60" y="320" width="440" height="70" rx="16" fill="#fff" stroke="#E5E8F0" strokeWidth="1.5"/>

        {/* Metric 1 */}
        <g>
          <text x="140" y="345" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0F172A" fontFamily="'Plus Jakarta Sans'">94%</text>
          <text x="140" y="363" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono'" fontWeight="600">CONTACT RATE</text>
        </g>

        {/* Divider */}
        <line x1="210" y1="330" x2="210" y2="385" stroke="#E5E8F0" strokeWidth="1.5"/>

        {/* Metric 2 */}
        <g>
          <text x="280" y="345" textAnchor="middle" fontSize="20" fontWeight="800" fill="#5B3FD4" fontFamily="'Plus Jakarta Sans'">24/7</text>
          <text x="280" y="363" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono'" fontWeight="600">AVAILABILITY</text>
        </g>

        {/* Divider */}
        <line x1="350" y1="330" x2="350" y2="385" stroke="#E5E8F0" strokeWidth="1.5"/>

        {/* Metric 3 */}
        <g>
          <text x="420" y="345" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0D9E6E" fontFamily="'Plus Jakarta Sans'">0</text>
          <text x="420" y="363" textAnchor="middle" fontSize="8" fill="#94A3B8" fontFamily="'JetBrains Mono'" fontWeight="600">LEADS LOST</text>
        </g>
      </g>

      {/* Corner accent lines */}
      <g stroke="#5B3FD4" strokeWidth="2" opacity="0.2">
        <line x1="60" y1="20" x2="100" y2="20"/>
        <line x1="60" y1="20" x2="60" y2="60"/>
        <line x1="500" y1="400" x2="460" y2="400"/>
        <line x1="500" y1="400" x2="500" y2="360"/>
      </g>
    </svg>
  );
}
