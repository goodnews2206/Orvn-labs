import React from 'react';

export default function Logo({ size = 32, color = '#5B3FD4' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="ORVN Labs"
    >
      <rect x="0" y="0" width="40" height="40" rx="9" fill={color} />
      <circle cx="20" cy="22" r="10" stroke="#fff" strokeWidth="3.5" fill="none" />
      <line x1="6" y1="22" x2="34" y2="22" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="20" y1="8" x2="20" y2="12" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
