import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#F8F9FC',
      borderTop: '1px solid #E2E6F0',
      padding: '40px clamp(20px, 5vw, 64px)',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: ' #5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="58" r="35" stroke="white" strokeWidth="12" fill="none"/>
              <line x1="15" y1="58" x2="85" y2="58" stroke="white" strokeWidth="12" strokeLinecap="round"/>
              <line x1="50" y1="22" x2="50" y2="30" stroke="white" strokeWidth="10" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: ' #5B3FD4', letterSpacing: '-0.01em' }}>ORVN Labs</span>
        </Link>

        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {[
            { label: 'The Problem', to: '/product' },
            { label: 'How It Works', to: '/product#how' },
            { label: 'Why ORVN Labs', to: '/why-orvn' },
            { label: 'Test the AI', to: '/demo' },
          ].map(l => (
            <Link key={l.to} to={l.to} style={{ fontSize: 13, color: '#5A6480', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = ' #5B3FD4'}
              onMouseLeave={e => e.target.style.color = '#5A6480'}
            >
              {l.label}
            </Link>
          ))}
          <a href="mailto:daniel@orvnlabs.com" style={{ fontSize: 13, color: '#5A6480', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}
            onMouseEnter={e => e.target.style.color = ' #5B3FD4'}
            onMouseLeave={e => e.target.style.color = '#5A6480'}
          >
            Contact <ArrowUpRight size={11} />
          </a>
        </div>

        <p style={{ fontSize: 12, color: '#8E97B5' }}>© 2026 ORVN Labs. Built for Real Estate.</p>
      </div>
    </footer>
  );
}