import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'The Problem', to: '/product' },
  { label: 'How It Works', to: '/product#how' },
  { label: 'Why ORVN', to: '/why-orvn' },
  { label: 'Test the AI', to: '/demo' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Detect scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Disable scroll when menu is open (pro UX)
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'auto';
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px', // mobile-first
          background: scrolled ? 'rgba(9,6,18,0.97)' : 'rgba(9,6,18,0.88)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(91,63,212,0.2)',
        }}
        className="md:px-12"
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            textDecoration: 'none',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="58" r="35" stroke="#5B3FD4" strokeWidth="10" fill="none"/>
            <line x1="15" y1="58" x2="85" y2="58" stroke="#5B3FD4" strokeWidth="10" strokeLinecap="round"/>
            <line x1="4" y1="58" x2="18" y2="50" stroke="#5B3FD4" strokeWidth="8" strokeLinecap="round"/>
            <line x1="96" y1="58" x2="82" y2="50" stroke="#5B3FD4" strokeWidth="8" strokeLinecap="round"/>
            <line x1="50" y1="22" x2="50" y2="30" stroke="#5B3FD4" strokeWidth="8" strokeLinecap="round"/>
          </svg>
          <span
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: 21,
              letterSpacing: '.06em',
              color: '#F2EEFF',
            }}
          >
            ORVN
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul
          className="hidden md:flex"
          style={{
            gap: 28,
            listStyle: 'none',
            margin: 0,
            padding: 0,
            alignItems: 'center',
          }}
        >
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                style={{
                  color:
                    location.pathname === link.to.split('#')[0]
                      ? '#F2EEFF'
                      : '#68607F',
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'color .2s',
                }}
                onMouseEnter={e => (e.target.style.color = '#F2EEFF')}
                onMouseLeave={e =>
                  (e.target.style.color =
                    location.pathname === link.to.split('#')[0]
                      ? '#F2EEFF'
                      : '#68607F')
                }
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li>
            <Link to="/demo">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: '#5B3FD4',
                  color: '#F2EEFF',
                  padding: '9px 22px',
                  borderRadius: 6,
                  fontWeight: 600,
                  fontSize: 14,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  fontFamily: "'Epilogue', sans-serif",
                }}
              >
                <Zap size={14} /> Test the AI
              </motion.button>
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 6,
          }}
        >
          <motion.div
            animate={{ rotate: mobileOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: '#F2EEFF' }}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </motion.div>
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 70,
              left: 0,
              right: 0,
              zIndex: 899,
              background: '#0E0A1C',
              borderBottom: '1px solid rgba(91,63,212,0.2)',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  color: '#D0C8EC',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 500,
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(91,63,212,0.1)',
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link to="/demo" style={{ marginTop: 12 }}>
              <button
                style={{
                  width: '100%',
                  background: '#5B3FD4',
                  color: '#F2EEFF',
                  padding: 12,
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 15,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ⚡ Test the AI Free
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}