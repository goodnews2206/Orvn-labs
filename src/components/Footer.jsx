import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg2)',
      borderTop: '1px solid rgba(91,63,212,0.2)',
      padding: '36px clamp(20px, 6vw, 80px)',
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexWrap: 'wrap', gap: 16,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="58" r="35" stroke="#5B3FD4" strokeWidth="10" fill="none"/>
          <line x1="15" y1="58" x2="85" y2="58" stroke="#5B3FD4" strokeWidth="10" strokeLinecap="round"/>
          <line x1="4" y1="58" x2="18" y2="50" stroke="#5B3FD4" strokeWidth="8" strokeLinecap="round"/>
          <line x1="96" y1="58" x2="82" y2="50" stroke="#5B3FD4" strokeWidth="8" strokeLinecap="round"/>
          <line x1="50" y1="22" x2="50" y2="30" stroke="#5B3FD4" strokeWidth="8" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '.05em', color: '#F2EEFF' }}>
          ORVN
        </span>
      </Link>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'The Problem', to: '/product' },
          { label: 'How It Works', to: '/product#how' },
          { label: 'Why ORVN', to: '/why-orvn' },
          { label: 'Test the AI', to: '/demo' },
        ].map(link => (
          <Link
            key={link.to} to={link.to}
            style={{ color: '#68607F', textDecoration: 'none', fontSize: 13, transition: 'color .2s' }}
            onMouseEnter={e => e.target.style.color = '#F2EEFF'}
            onMouseLeave={e => e.target.style.color = '#68607F'}
          >
            {link.label}
          </Link>
        ))}
        <motion.a
          href="mailto:daniel@orvnlabs.com"
          whileHover={{ color: '#F2EEFF' }}
          style={{ color: '#68607F', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}
        >
          Contact <ArrowUpRight size={12} />
        </motion.a>
      </div>

      <div style={{ color: '#68607F', fontSize: 12 }}>© 2026 ORVN Labs. Built for Real Estate.</div>
    </footer>
  );
}