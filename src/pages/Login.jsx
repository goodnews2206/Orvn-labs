import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    alert('Auth integration coming soon — connect your backend here.');
  };

  const inputStyle = {
    width: '100%', background: 'var(--bg)',
    border: '1px solid rgba(91,63,212,0.2)',
    borderRadius: 8, padding: '13px 16px 13px 44px',
    color: '#F2EEFF', fontFamily: "'Epilogue', sans-serif",
    fontSize: 14, outline: 'none',
  };

  return (
    <PageWrapper>
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px clamp(20px, 6vw, 40px) 60px', position: 'relative' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }} />
        <div className="animate-orb" style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(91,63,212,.2) 0%,transparent 70%)', top: -100, right: -100, pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: 420, background: 'var(--bg2)', border: '1px solid rgba(91,63,212,0.2)', borderRadius: 20, padding: 'clamp(32px, 5vw, 48px)', position: 'relative', zIndex: 1 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 32, justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="58" r="35" stroke="#5B3FD4" strokeWidth="10" fill="none"/>
              <line x1="15" y1="58" x2="85" y2="58" stroke="#5B3FD4" strokeWidth="10" strokeLinecap="round"/>
              <line x1="4" y1="58" x2="18" y2="50" stroke="#5B3FD4" strokeWidth="8" strokeLinecap="round"/>
              <line x1="96" y1="58" x2="82" y2="50" stroke="#5B3FD4" strokeWidth="8" strokeLinecap="round"/>
              <line x1="50" y1="22" x2="50" y2="30" stroke="#5B3FD4" strokeWidth="8" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: '.06em', color: '#F2EEFF' }}>ORVN</span>
          </Link>

          <h1 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: '-.02em', marginBottom: 8, textAlign: 'center', color: '#F2EEFF' }}>Client Portal</h1>
          <p style={{ color: '#68607F', fontSize: 14, textAlign: 'center', marginBottom: 32, lineHeight: 1.7 }}>Sign in to view your pipeline analytics and lead performance.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Email */}
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#68607F" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#5B3FD4'}
                onBlur={e => e.target.style.borderColor = 'rgba(91,63,212,0.2)'} />
            </div>

            {/* Password */}
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#68607F" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input type={showPass ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ ...inputStyle, paddingRight: 44 }}
                onFocus={e => e.target.style.borderColor = '#5B3FD4'}
                onBlur={e => e.target.style.borderColor = 'rgba(91,63,212,0.2)'} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#68607F' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <motion.button type="submit" disabled={loading}
              whileHover={!loading ? { background: '#7B5FEA', boxShadow: '0 14px 44px rgba(91,63,212,0.42)' } : {}}
              whileTap={!loading ? { scale: 0.97 } : {}}
              style={{ width: '100%', background: loading ? '#3A2899' : '#5B3FD4', color: '#F2EEFF', border: 'none', borderRadius: 8, padding: '14px', fontFamily: "'Clash Display', sans-serif", fontSize: 16, fontWeight: 600, letterSpacing: '.04em', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'background 0.2s', marginTop: 4 }}>
              {loading ? (
                <span style={{ display: 'flex', gap: 4 }}>
                  {[0, 0.15, 0.3].map((d, i) => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#F2EEFF', display: 'block', animation: `typingBounce 1.2s ${d}s infinite` }} />
                  ))}
                </span>
              ) : (
                <><LogIn size={16} /> Sign In</>
              )}
            </motion.button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center', color: '#68607F', fontSize: 13 }}>
            Not a client yet?{' '}
            <a href="mailto:daniel@orvnlabs.com" style={{ color: '#7B5FEA', textDecoration: 'none', fontWeight: 500 }}>
              Contact ORVN Labs <ArrowRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </a>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
} 