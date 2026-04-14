import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const links = [
  { label: 'The Problem', to: '/product' },
  { label: 'How It Works', to: '/product#how' },
  { label: 'Why ORVN Labs', to: '/why-orvn' },
  { label: 'Test the AI', to: '/demo' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
          height: 68,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(20px, 5vw, 64px)',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid #E2E6F0' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: '#1B2559',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="58" r="35" stroke="white" strokeWidth="12" fill="none"/>
              <line x1="15" y1="58" x2="85" y2="58" stroke="white" strokeWidth="12" strokeLinecap="round"/>
              <line x1="50" y1="22" x2="50" y2="30" stroke="white" strokeWidth="10" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 700,
            fontSize: 17, letterSpacing: '-0.01em', color: '#1B2559',
          }}>
            ORVN Labs
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden md:flex">
          {links.slice(0, 3).map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontSize: 14, fontWeight: 500,
                color: location.pathname === link.to.split('#')[0] ? '#1B2559' : '#5A6480',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#1B2559'}
              onMouseLeave={e => e.target.style.color = location.pathname === link.to.split('#')[0] ? '#1B2559' : '#5A6480'}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/login">
              <motion.button
                whileHover={{ background: '#F1F3F9' }}
                style={{
                  padding: '9px 18px', borderRadius: 8,
                  background: 'transparent', border: '1px solid #E2E6F0',
                  fontWeight: 500, fontSize: 14, cursor: 'pointer',
                  color: '#1B2559', fontFamily: "'Inter', sans-serif",
                  transition: 'background 0.2s',
                }}
              >
                Client Login
              </motion.button>
            </Link>
            <Link to="/demo">
              <motion.button
                whileHover={{ background: '#2D3A7C', y: -1, boxShadow: '0 8px 24px rgba(27,37,89,0.25)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '9px 18px', borderRadius: 8,
                  background: '#1B2559', color: 'white',
                  border: 'none', fontWeight: 600, fontSize: 14,
                  cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                  display: 'flex', alignItems: 'center', gap: 7,
                }}
              >
                <Zap size={13} /> Test the AI
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1B2559', padding: 4 }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 68, left: 0, right: 0, zIndex: 899,
              background: 'white', borderBottom: '1px solid #E2E6F0',
              padding: '16px clamp(20px, 5vw, 64px) 24px',
              display: 'flex', flexDirection: 'column', gap: 0,
            }}
          >
            {links.map(link => (
              <Link
                key={link.to} to={link.to}
                style={{
                  padding: '13px 0', fontSize: 15, fontWeight: 500,
                  color: '#1B2559', textDecoration: 'none',
                  borderBottom: '1px solid #F1F3F9',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <Link to="/login" style={{ flex: 1 }}>
                <button style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #E2E6F0', background: 'white', fontWeight: 500, fontSize: 14, cursor: 'pointer', color: '#1B2559' }}>
                  Client Login
                </button>
              </Link>
              <Link to="/demo" style={{ flex: 1 }}>
                <button style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#1B2559', border: 'none', color: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                  Test the AI
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}