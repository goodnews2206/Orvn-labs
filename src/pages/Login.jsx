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

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    alert('Auth integration — connect your backend here.');
  };

  const inputBase = {
    width: '100%', background: '#F8F9FC', border: '1px solid #E2E6F0',
    borderRadius: 8, fontSize: 14, color: ' #5B3FD4',
    fontFamily: "'Inter', sans-serif", outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <PageWrapper>
      <div style={{ minHeight: '100vh', background: '#F8F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px clamp(20px, 5vw, 40px) 60px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: 400, background: 'white', border: '1px solid #E2E6F0', borderRadius: 20, padding: 'clamp(32px, 5vw, 48px)', boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 16px 32px rgba(27,37,89,0.07)' }}>

          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', justifyContent: 'center', marginBottom: 32 }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: ' #5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="58" r="35" stroke="white" strokeWidth="12" fill="none"/>
                <line x1="15" y1="58" x2="85" y2="58" stroke="white" strokeWidth="12" strokeLinecap="round"/>
                <line x1="50" y1="22" x2="50" y2="30" stroke="white" strokeWidth="10" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: 17, color: ' #5B3FD4', letterSpacing: '-0.01em' }}>ORVN Labs</span>
          </Link>

          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, fontWeight: 400, color: ' #5B3FD4', textAlign: 'center', marginBottom: 6 }}>Client Portal</h1>
          <p style={{ color: '#8E97B5', fontSize: 14, textAlign: 'center', marginBottom: 32, lineHeight: 1.6 }}>
            Sign in to view your pipeline analytics and lead performance.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ position: 'relative' }}>
              <Mail size={15} color="#8E97B5" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }} />
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ ...inputBase, padding: '12px 14px 12px 40px' }}
                onFocus={e => e.target.style.borderColor = ' #5B3FD4'}
                onBlur={e => e.target.style.borderColor = '#E2E6F0'} />
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={15} color="#8E97B5" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }} />
              <input type={showPass ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
                style={{ ...inputBase, padding: '12px 40px 12px 40px' }}
                onFocus={e => e.target.style.borderColor = ' #5B3FD4'}
                onBlur={e => e.target.style.borderColor = '#E2E6F0'} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#8E97B5' }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <motion.button type="submit" disabled={loading}
              whileHover={!loading ? { background: '#7B5FEA', boxShadow: '0 10px 28px rgba(27,37,89,0.2)' } : {}}
              whileTap={!loading ? { scale: 0.97 } : {}}
              style={{ width: '100%', background: loading ? '#7B5FEA' : ' #5B3FD4', color: 'white', border: 'none', borderRadius: 8, padding: '13px', fontWeight: 600, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: "'Inter', sans-serif", marginTop: 4 }}>
              {loading ? (
                <span style={{ display: 'flex', gap: 4 }}>
                  {[0, 0.15, 0.3].map((d, i) => (
                    <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', display: 'block', animation: `typing 1.2s ${d}s infinite` }} />
                  ))}
                </span>
              ) : (
                <><LogIn size={15} /> Sign In</>
              )}
            </motion.button>
          </form>

          <p style={{ marginTop: 24, textAlign: 'center', color: '#8E97B5', fontSize: 13 }}>
            Not a client yet?{' '}
            <a href="mailto:daniel@orvnlabs.com" style={{ color: ' #5B3FD4', textDecoration: 'none', fontWeight: 600 }}>
              Contact ORVN Labs <ArrowRight size={11} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </a>
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
}