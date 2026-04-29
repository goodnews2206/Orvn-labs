import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, CheckCircle, Zap, Clock, BrainCircuit,
  Calendar, ChevronRight, TrendingDown, AlertCircle, Users
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Calculator from './Calculator';

gsap.registerPlugin(ScrollTrigger);

const SEC = {
  padding: 'clamp(72px, 8vw, 112px) clamp(20px, 5vw, 64px)',
};
const INNER = { maxWidth: 1160, margin: '0 auto' };

const EyeBrow = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
    <div style={{ width: 20, height: 1.5, background: '#5B3FD4' }} />
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B3FD4', fontFamily: "'JetBrains Mono', monospace" }}>
      {text}
    </span>
  </div>
);

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: 'clamp(100px, 12vw, 140px) clamp(20px, 5vw, 64px) clamp(60px, 8vw, 100px)',
      background: 'white', position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #C8CEDF 1px, transparent 1px)',
        backgroundSize: '32px 32px', opacity: 0.4,
      }} />
      {/* Gradient fade bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, background: 'linear-gradient(to bottom, transparent, white)', pointerEvents: 'none' }} />

      <div style={{ ...INNER, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'clamp(40px, 6vw, 100px)', alignItems: 'center', position: 'relative' }}>
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: '#F1F3F9', border: '1px solid #E2E6F0',
              borderRadius: 100, padding: '5px 13px', marginBottom: 28,
            }}
          >
            <span className="animate-blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#0D9E6E', display: 'block' }} />
            <span style={{ fontSize: 12, color: '#5B3FD4', fontWeight: 500, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>
              Performative AI Infrastructure — Real Estate
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(42px, 5.5vw, 76px)',
              fontWeight: 400, lineHeight: 1.08,
              letterSpacing: '-0.02em', color: '#5B3FD4',
              marginBottom: 24,
            }}
          >
            Your Leads <span style={{ color: '#E11D48', fontWeight: 500 }}>Die</span><br />
            While Your<br />
            <em style={{ fontStyle: 'italic', color: '#7B5FEA' }}>Agents Sleep.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{ fontSize: 17, color: '#5A6480', maxWidth: 480, lineHeight: 1.78, marginBottom: 40, fontWeight: 400 }}
          >
            ORVN Labs deploys AI that intercepts, qualifies, and books appointments from 100% of your leads — in under 3 seconds, 24/7, without a human involved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.5 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 52 }}
          >
            <Link to="/demo">
              <motion.button
                whileHover={{ background: '#7B5FEA', y: -2, boxShadow: '0 12px 32px rgba(27,37,89,0.25)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#5B3FD4', color: 'white',
                  padding: '14px 26px', borderRadius: 10,
                  fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <Zap size={15} /> Test the AI Live — Free
              </motion.button>
            </Link>
            <Link to="/product">
              <motion.button
                whileHover={{ background: '#F1F3F9', borderColor: '#C8CEDF' }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'white', color: '#5B3FD4',
                  padding: '14px 26px', borderRadius: 10,
                  fontWeight: 500, fontSize: 15,
                  border: '1px solid #E2E6F0', cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif", transition: 'all 0.2s',
                }}
              >
                Calculate Your Revenue Loss <ArrowRight size={14} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            style={{ display: 'flex', gap: 36, flexWrap: 'wrap', paddingTop: 28, borderTop: '1px solid #E2E6F0' }}
          >
            {[
              { num: '3', suf: 'sec', label: 'Lead response time' },
              { num: '24', suf: '/7', label: 'Always operating' },
              { num: '90', suf: '%', label: 'Brokerages failing speed-to-lead' },
              { num: '$90', suf: 'k', label: 'Avg human ISA annual cost' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#10B981', lineHeight: 1 }}>
                  {s.num}<span style={{ fontSize: 18, color: '#5A6480' }}>{s.suf}</span>
                </div>
                <div style={{ fontSize: 12, color: '#8E97B5', marginTop: 4, maxWidth: 120 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Chat mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        >
          <HeroMockup />
        </motion.div>
      </div>
    </section>
  );
}

function HeroMockup() {
  const messages = [
    { role: 'ai', text: "Hey Sarah! Quick one — are you currently looking to buy, or are you also open to selling a property?" },
    { role: 'user', text: "Mostly looking to buy in the next couple of months." },
    { role: 'ai', text: "Good timing. Are you pre-approved for financing, or is that still in progress?" },
    { role: 'user', text: "Working on it — sorted in a few weeks." },
    { role: 'ai', text: "That gives us a great window. Rough price range? Ballpark is fine." },
    { role: 'user', text: "Somewhere between $400K and $500K." },
  ];
  return (
    <div style={{
      background: 'white', borderRadius: 20,
      border: '1px solid #E2E6F0',
      boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 20px 48px rgba(27,37,89,0.1)',
      overflow: 'hidden',
    }}>
      {/* Browser chrome */}
      <div style={{ background: '#F8F9FC', borderBottom: '1px solid #E2E6F0', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FC5F57', '#FCBC2E', '#29C940'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, background: '#F1F3F9', borderRadius: 6, padding: '5px 12px', fontSize: 11, color: '#8E97B5', fontFamily: "'JetBrains Mono', monospace" }}>
          orvnlabs.com/demo
        </div>
      </div>

      {/* Chat header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F3F9', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0 }}>A</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: '#5B3FD4' }}>Alex — Premier Realty</div>
          <div style={{ fontSize: 11, color: '#0D9E6E', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0D9E6E', display: 'inline-block' }} />
            Online · ORVN PAS Active
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10, background: '#FAFBFD' }}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.18 }}
            style={{ display: 'flex', gap: 8, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}
          >
            {msg.role === 'ai' && (
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white', flexShrink: 0, marginTop: 2 }}>AI</div>
            )}
            <div style={{
              maxWidth: '78%', padding: '9px 13px', fontSize: 12.5, lineHeight: 1.55,
              borderRadius: msg.role === 'ai' ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
              background: msg.role === 'ai' ? 'white' : '#5B3FD4',
              color: msg.role === 'ai' ? '#5B3FD4' : 'white',
              boxShadow: msg.role === 'ai' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              border: msg.role === 'ai' ? '1px solid #F1F3F9' : 'none',
            }}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {/* Typing */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
          style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white', flexShrink: 0, marginTop: 2 }}>AI</div>
          <div style={{ display: 'flex', gap: 3, padding: '10px 14px', background: 'white', border: '1px solid #F1F3F9', borderRadius: '14px 14px 14px 4px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', alignItems: 'center' }}>
            {[0, 0.18, 0.36].map((d, i) => (
              <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#C8CEDF', display: 'block', animation: `typing 1.2s ${d}s infinite` }} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #F1F3F9', background: 'white', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, background: '#F8F9FC', border: '1px solid #E2E6F0', borderRadius: 20, padding: '8px 14px', fontSize: 12, color: '#8E97B5' }}>
          Reply to Alex...
        </div>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowRight size={14} color="white" />
        </div>
      </div>

      {/* Booked badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        style={{ margin: '0 16px 16px', padding: '12px 16px', background: '#F0FDF7', border: '1px solid #BBF7D0', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <CheckCircle size={16} color="#0D9E6E" />
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#5B3FD4' }}>Appointment Booked — Thursday 2PM</div>
          <div style={{ fontSize: 11, color: '#5A6480' }}>Confirmation sent · Agent notified · CRM updated</div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── TRUST BAR ─────────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    '3-second lead intercept',
    'Native CRM integration — no new apps',
    'Fair Housing Act compliant',
    'TCPA compliant',
    'Cancel anytime',
  ];
  return (
    <div style={{ background: '#F8F9FC', borderTop: '1px solid #E2E6F0', borderBottom: '1px solid #E2E6F0', padding: '14px clamp(20px, 5vw, 64px)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(20px, 4vw, 48px)', flexWrap: 'wrap' }}>
        {items.map((item, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#5A6480', whiteSpace: 'nowrap' }}
          >
            <CheckCircle size={13} color="#0D9E6E" strokeWidth={2.5} />
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}



// ─── DEMO TEASER ───────────────────────────────────────────────────────────────
function DemoTeaser() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dt-left', { x: -40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
      gsap.from('.dt-right', { x: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ ...SEC, background: 'white', borderTop: '1px solid #E2E6F0' }}>
      <div style={{ ...INNER, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
        <div className="dt-left">
          <EyeBrow text="Live Demo" />
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 400, color: '#5B3FD4', lineHeight: 1.1, marginBottom: 16 }}>
            Watch the AI Close a Lead. Right Now.
          </h2>
          <p style={{ color: '#5A6480', fontSize: 16, lineHeight: 1.75, marginBottom: 32, maxWidth: 420 }}>
            Not a scripted video. A live simulation of the ORVN PAS — from first contact to booked appointment. Text or voice. No signup required.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
            {[
              { icon: <Clock size={15} />, title: 'First response in under 3 seconds', sub: 'Every single time. No exceptions.' },
              { icon: <BrainCircuit size={15} />, title: 'Psychological qualification', sub: 'Not a chatbot — handles real objections.' },
              { icon: <Calendar size={15} />, title: 'Autonomous appointment booking', sub: 'Books directly onto your agent\'s calendar.' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}
                style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}
              >
                <div style={{ width: 34, height: 34, borderRadius: 8, background: '#F1F3F9', border: '1px solid #E2E6F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5B3FD4', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#5B3FD4', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#8E97B5' }}>{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <Link to="/demo">
            <motion.button
              whileHover={{ background: '#7B5FEA', y: -1, boxShadow: '0 10px 28px rgba(27,37,89,0.2)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#5B3FD4', color: 'white', padding: '14px 24px', borderRadius: 10, fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
            >
              Run the Full Demo <ArrowRight size={15} />
            </motion.button>
          </Link>
        </div>

        {/* Right — mini preview card */}
        <div className="dt-right">
          <motion.div
            whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(27,37,89,0.12)' }}
            transition={{ duration: 0.3 }}
            style={{ background: 'white', border: '1px solid #E2E6F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 12px 28px rgba(0,0,0,0.07)' }}
          >
            <div style={{ background: '#F8F9FC', borderBottom: '1px solid #E2E6F0', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: '#5B3FD4' }}>ORVN PAS — Live</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F0FDF7', border: '1px solid #BBF7D0', borderRadius: 100, padding: '4px 10px' }}>
                <span className="animate-blink" style={{ width: 5, height: 5, borderRadius: '50%', background: '#0D9E6E', display: 'block' }} />
                <span style={{ fontSize: 10, color: '#0D9E6E', fontWeight: 600, letterSpacing: '0.06em', fontFamily: "'JetBrains Mono', monospace" }}>LIVE</span>
              </div>
            </div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10, background: '#FAFBFD', minHeight: 260 }}>
              {[
                { role: 'ai', text: "Hey! Quick one — are you looking to buy, or also open to selling?" },
                { role: 'user', text: "Mostly looking to buy in the next couple of months." },
                { role: 'ai', text: "Good timing. Are you pre-approved for financing?" },
                { role: 'user', text: "Working on it — sorted in a few weeks." },
              ].map((msg, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                  {msg.role === 'ai' && <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: 'white', flexShrink: 0, marginTop: 2 }}>AI</div>}
                  <div style={{ maxWidth: '80%', padding: '9px 13px', fontSize: 12.5, lineHeight: 1.55, borderRadius: msg.role === 'ai' ? '12px 12px 12px 4px' : '12px 12px 4px 12px', background: msg.role === 'ai' ? 'white' : '#5B3FD4', color: msg.role === 'ai' ? '#5B3FD4' : 'white', boxShadow: msg.role === 'ai' ? '0 1px 3px rgba(0,0,0,0.07)' : 'none', border: msg.role === 'ai' ? '1px solid #F1F3F9' : 'none' }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: 'white', flexShrink: 0, marginTop: 2 }}>AI</div>
                <div style={{ display: 'flex', gap: 3, padding: '9px 13px', background: 'white', border: '1px solid #F1F3F9', borderRadius: '12px 12px 12px 4px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', alignItems: 'center' }}>
                  {[0, 0.18, 0.36].map((d, i) => (
                    <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#C8CEDF', display: 'block', animation: `typing 1.2s ${d}s infinite` }} />
                  ))}
                </div>
              </div>
            </div>
            <Link to="/demo" style={{ textDecoration: 'none', display: 'block' }}>
              <motion.div
                whileHover={{ background: '#F1F3F9' }}
                style={{ padding: '14px 20px', borderTop: '1px solid #F1F3F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'white', transition: 'background 0.2s' }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: '#5B3FD4' }}>Try the full demo — text or voice</span>
                <ChevronRight size={15} color="#8E97B5" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── HOME CTA ──────────────────────────────────────────────────────────────────
function HomeCTA() {
  return (
    <section style={{ ...SEC, background: '#5B3FD4', textAlign: 'center' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace" }}>Ready?</span>
            <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 400, color: 'white', lineHeight: 1.1, marginBottom: 16 }}>
            Your Brokerage.<br />Our Infrastructure.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.75, marginBottom: 36 }}>
            Test the AI in 90 seconds with no commitment — or book a 20-minute call to see the full AGS deployment for your specific operation.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/demo">
              <motion.button
                whileHover={{ background: 'white', color: '#5B3FD4', y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', color: 'white', padding: '14px 26px', borderRadius: 10, fontWeight: 600, fontSize: 15, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }}
              >
                <Zap size={15} /> Test the AI — Free
              </motion.button>
            </Link>
            <a href="mailto:daniel@orvnlabs.com?subject=ORVN%20Labs%20%E2%80%94%20Book%20a%20Call" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ background: 'rgba(255,255,255,0.1)', y: -2 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'rgba(255,255,255,0.7)', padding: '14px 26px', borderRadius: 10, fontWeight: 500, fontSize: 15, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }}
              >
                Book a Call <ArrowRight size={14} />
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <TrustBar />
      <Calculator />
      <DemoTeaser />
      <HomeCTA />
    </PageWrapper>
  );
}
