import React from 'react';

// SVG icons used across the home page — replaces lucide icons with custom brand-colored SVGs
export function IconGauge({ size = 24, color = '#5B3FD4' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" opacity="0.15" fill={color} stroke="none"/>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="M12 6v2"/>
      <path d="M16.24 7.76l-1.42 1.42"/>
      <path d="M18 12h-2"/>
      <path d="M12 12l-3.5 3.5"/>
      <circle cx="12" cy="12" r="1.5" fill={color} stroke="none"/>
    </svg>
  );
}

export function IconCalculator({ size = 24, color = '#5B3FD4' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="3" opacity="0.1" fill={color} stroke="none"/>
      <rect x="4" y="2" width="16" height="20" rx="3"/>
      <rect x="8" y="6" width="8" height="4" rx="1" fill={color} opacity="0.2" stroke="none"/>
      <line x1="8" y1="14" x2="8" y2="14.01" strokeWidth="2.5"/>
      <line x1="12" y1="14" x2="12" y2="14.01" strokeWidth="2.5"/>
      <line x1="16" y1="14" x2="16" y2="14.01" strokeWidth="2.5"/>
      <line x1="8" y1="18" x2="8" y2="18.01" strokeWidth="2.5"/>
      <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2.5"/>
      <line x1="16" y1="18" x2="16" y2="18.01" strokeWidth="2.5"/>
    </svg>
  );
}

export function IconEye({ size = 20, color = '#475569' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3" fill={color} opacity="0.15"/>
    </svg>
  );
}

export function IconEyeOff({ size = 20, color = '#DC2626' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

export function IconArrowRight({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

export function IconCheck({ size = 18, color = '#0D9E6E' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

export function IconSend({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2" fill={color} opacity="0.1"/>
    </svg>
  );
}

export function IconSystems({ size = 24, color = '#5B3FD4' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="2" fill={color} opacity="0.12"/>
      <rect x="14" y="3" width="7" height="7" rx="2" fill={color} opacity="0.12"/>
      <rect x="3" y="14" width="7" height="7" rx="2" fill={color} opacity="0.12"/>
      <rect x="14" y="14" width="7" height="7" rx="2" fill={color} opacity="0.12"/>
      <rect x="3" y="3" width="7" height="7" rx="2"/>
      <rect x="14" y="3" width="7" height="7" rx="2"/>
      <rect x="3" y="14" width="7" height="7" rx="2"/>
      <rect x="14" y="14" width="7" height="7" rx="2"/>
    </svg>
  );
}

export function IconBook({ size = 24, color = '#5B3FD4' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill={color} opacity="0.1"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );
}
