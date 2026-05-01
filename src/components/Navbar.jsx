import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { PAS_LINKS } from '../lib/pas';

const NAV_LINKS = [
  { label: 'Product', to: '/pas' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Calculators', to: '/calculators' },
  { label: 'Intelligence', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
];

const linkStyle = ({ isActive }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: isActive ? '#5B3FD4' : '#475569',
  textDecoration: 'none',
  padding: '8px 0',
  transition: 'color 0.2s',
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Close the mobile drawer on route change. setState in effect is intentional here:
    // location is the external "system" we're synchronising the UI back to.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 90,
          height: 72,
          display: 'flex',
          alignItems: 'center',
          background: scrolled ? 'rgba(255,255,255,0.95)' : '#fff',
          backdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #E5E8F0' : '1px solid transparent',
          transition: 'background 0.2s, border-color 0.2s',
        }}
      >
        <div
          className="container-page"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo size={34} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '-0.01em',
                color: '#0F172A',
              }}
            >
              ORVN <span style={{ color: '#5B3FD4' }}>Labs</span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            style={{ display: 'none', alignItems: 'center', gap: 28 }}
            className="nav-desktop"
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} style={linkStyle}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-desktop" style={{ display: 'none', alignItems: 'center', gap: 10 }}>
            <a
              href={PAS_LINKS.login}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ padding: '9px 16px', fontSize: 14 }}
            >
              Login
            </a>
            <Link
              to="/calculators/leakage"
              className="btn-primary"
              style={{ padding: '9px 16px', fontSize: 14 }}
            >
              Run leakage score
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="nav-mobile-toggle"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              border: '1px solid #E5E8F0',
              borderRadius: 10,
              background: '#fff',
              cursor: 'pointer',
              color: '#0F172A',
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15,23,42,0.35)',
                zIndex: 88,
              }}
            />
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                top: 72,
                left: 0,
                right: 0,
                zIndex: 89,
                background: '#fff',
                borderBottom: '1px solid #E5E8F0',
                padding: '20px clamp(20px, 5vw, 64px) 28px',
              }}
            >
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      style={({ isActive }) => ({
                        display: 'block',
                        padding: '14px 0',
                        fontSize: 16,
                        fontWeight: 500,
                        color: isActive ? '#5B3FD4' : '#0F172A',
                        textDecoration: 'none',
                        borderBottom: '1px solid #F1F3F9',
                      })}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                <a
                  href={PAS_LINKS.login}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  Login
                </a>
                <Link to="/calculators/leakage" className="btn-primary" style={{ flex: 1 }}>
                  Run leakage score
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 860px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-toggle { display: none !important; }
        }
      `}</style>
    </>
  );
}
