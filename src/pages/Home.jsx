import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, ArrowRight, CheckCircle, Clock, BrainCircuit, Calendar, ChevronRight, Play } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'clamp(100px, 12vw, 140px) clamp(20px, 6vw, 80px) 90px',
      overflow: 'hidden',
    }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div className="animate-orb" style={{
        position: 'absolute', width: 680, height: 680, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(91,63,212,.3) 0%,rgba(91,63,212,.06) 52%,transparent 72%)',
        top: -180, right: -160, pointerEvents: 'none',
      }} />
      <div className="animate-orb-rev" style={{
        position: 'absolute', width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(91,63,212,.17) 0%,transparent 68%)',
        bottom: -80, left: '8%', pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 9,
          background: 'rgba(91,63,212,.12)', border: '1px solid rgba(91,63,212,.26)',
          borderRadius: 100, padding: '5px 15px', marginBottom: 28, width: 'fit-content',
        }}
      >
        <span className="animate-blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#7B5FEA', display: 'block' }} />
        <span style={{ fontSize: 12, color: '#7B5FEA', letterSpacing: '.09em', fontWeight: 500 }}>
          Performative AI Infrastructure — Real Estate
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        style={{
          fontFamily: "'Clash Display', sans-serif", fontWeight: 700,
          fontSize: 'clamp(44px, 6.5vw, 90px)', letterSpacing: '-.026em',
          lineHeight: .97, marginBottom: 24, maxWidth: 860,
        }}
      >
        Your Pipeline.<br />
        <em style={{ color: '#7B5FEA', fontStyle: 'normal' }}>Runs Itself.</em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        style={{ fontSize: 18, color: '#68607F', maxWidth: 540, marginBottom: 44, fontWeight: 300, lineHeight: 1.82 }}
      >
        ORVN deploys AI that intercepts every real estate lead in under 3 seconds — qualifies them, handles objections, and books appointments directly onto your agents' calendars. Zero humans involved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ display: 'flex', gap: 13, flexWrap: 'wrap' }}
      >
        <Link to="/demo">
          <motion.button
            whileHover={{ background: '#7B5FEA', y: -2, boxShadow: '0 14px 44px rgba(91,63,212,0.42)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              background: '#5B3FD4', color: '#F2EEFF', padding: '14px 28px',
              borderRadius: 8, fontWeight: 600, fontSize: 15,
              border: 'none', cursor: 'pointer', fontFamily: "'Epilogue', sans-serif",
            }}
          >
            <Zap size={16} /> Test the AI — Free
          </motion.button>
        </Link>
        <Link to="/product">
          <motion.button
            whileHover={{ borderColor: '#5B3FD4', background: 'rgba(91,63,212,0.1)' }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              background: 'transparent', color: '#F2EEFF', padding: '14px 28px',
              borderRadius: 8, fontWeight: 500, fontSize: 15,
              border: '1px solid rgba(91,63,212,0.2)', cursor: 'pointer',
              fontFamily: "'Epilogue', sans-serif", transition: 'all 0.2s',
            }}
          >
            See How It Works <ArrowRight size={15} />
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        style={{
          display: 'flex', gap: 48, marginTop: 72, paddingTop: 46,
          flexWrap: 'wrap', borderTop: '1px solid rgba(91,63,212,0.2)',
        }}
      >
        {[
          { num: '3s', label: 'Lead intercept — every time' },
          { num: '8,760', suffix: 'hrs', label: 'Operational per year' },
          { num: '90%', label: 'of brokerages miss speed-to-lead' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 34, fontWeight: 700, letterSpacing: '-.02em', color: '#F2EEFF' }}>
              {s.num}<span style={{ color: '#7B5FEA' }}>{s.suffix || ''}</span>
            </div>
            <div style={{ fontSize: 13, color: '#68607F', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function TrustBar() {
  const items = [
    'No new apps — lives in your CRM',
    'Live from Day 7 of engagement',
    'Under 3-second lead response',
    'Zero manual data entry',
    'Unlimited lead capacity',
    '12-month graveyard reactivation',
  ];
  return (
    <div style={{
      background: 'var(--bg2)', padding: '16px clamp(20px, 6vw, 80px)',
      borderTop: '1px solid rgba(91,63,212,0.2)',
      borderBottom: '1px solid rgba(91,63,212,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 40, flexWrap: 'wrap',
    }}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#68607F' }}
        >
          <CheckCircle size={13} color="#22C55E" strokeWidth={2.5} />
          {item}
        </motion.div>
      ))}
    </div>
  );
}

function DemoTeaser() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.demo-teaser-left', {
        x: -50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from('.demo-teaser-right', {
        x: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)',
      background: 'var(--bg2)', borderBottom: '1px solid rgba(91,63,212,0.2)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'center' }}>
        <div className="demo-teaser-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
            <div style={{ width: 24, height: 2, background: '#5B3FD4' }} />
            <span style={{ color: '#7B5FEA', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 500 }}>Live Demo</span>
          </div>
          <h2 style={{
            fontFamily: "'Clash Display', sans-serif", fontWeight: 700,
            fontSize: 'clamp(28px, 3.8vw, 50px)', letterSpacing: '-.022em',
            lineHeight: 1.08, marginBottom: 16, maxWidth: 480,
          }}>
            Watch the AI Close a Lead in Real Time
          </h2>
          <p style={{ color: '#68607F', fontSize: 17, lineHeight: 1.82, marginBottom: 32, maxWidth: 440 }}>
            Not a scripted video. A live simulation of the ORVN PAS — from first contact to booked appointment. Text or voice. Try it yourself.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
            {[
              { icon: <Clock size={15} />, text: 'First response in under 3 seconds' },
              { icon: <BrainCircuit size={15} />, text: 'Psychological qualification — not a chatbot' },
              { icon: <Calendar size={15} />, text: "Books directly onto your agent's calendar" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#D0C8EC' }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(91,63,212,.2)', border: '1px solid rgba(91,63,212,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#7B5FEA', flexShrink: 0,
                }}>{item.icon}</div>
                {item.text}
              </motion.div>
            ))}
          </div>
          <Link to="/demo">
            <motion.button
              whileHover={{ background: '#7B5FEA', y: -2, boxShadow: '0 14px 44px rgba(91,63,212,0.42)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: '#5B3FD4', color: '#F2EEFF', padding: '14px 28px',
                borderRadius: 8, fontWeight: 600, fontSize: 15,
                border: 'none', cursor: 'pointer', fontFamily: "'Epilogue', sans-serif",
              }}
            >
              <Play size={15} fill="#F2EEFF" /> Run the Full Demo
            </motion.button>
          </Link>
        </div>

        <div className="demo-teaser-right">
          <motion.div
            whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}
            style={{
              background: 'var(--bg3)', border: '1px solid rgba(91,63,212,0.2)',
              borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 0 80px rgba(91,63,212,.15), 0 40px 80px rgba(0,0,0,.4)',
            }}
          >
            <div style={{
              background: 'rgba(91,63,212,.12)', borderBottom: '1px solid rgba(91,63,212,0.2)',
              padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 16, fontWeight: 600, letterSpacing: '.05em' }}>ORVN PAS — Live</span>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(34,197,94,.15)', border: '1px solid rgba(34,197,94,.3)',
                borderRadius: 100, padding: '4px 12px',
              }}>
                <span className="animate-blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'block' }} />
                <span style={{ fontSize: 11, color: '#22C55E', fontWeight: 600, letterSpacing: '.06em' }}>LIVE</span>
              </div>
            </div>
            <div style={{ padding: 28 }}>
              <div style={{
                background: 'var(--bg)', border: '1px solid rgba(91,63,212,0.2)',
                borderRadius: 10, padding: 16, minHeight: 220,
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                {[
                  { role: 'ai', text: "Hey! Quick one — are you currently looking to buy, or also open to selling?" },
                  { role: 'user', text: "Mostly looking to buy in the next couple of months." },
                  { role: 'ai', text: "Good timing. Are you pre-approved for financing, or still in progress?" },
                  { role: 'user', text: "Working on it — sorted in a few weeks." },
                ].map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.15 }}
                    style={{ display: 'flex', gap: 10, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: msg.role === 'ai' ? '#5B3FD4' : '#221D38',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: msg.role === 'ai' ? 'white' : '#68607F',
                    }}>{msg.role === 'ai' ? 'AI' : 'You'}</div>
                    <div style={{
                      maxWidth: '82%', padding: '9px 13px', fontSize: 13, lineHeight: 1.6,
                      borderRadius: msg.role === 'ai' ? '12px 12px 12px 4px' : '12px 12px 4px 12px',
                      background: msg.role === 'ai' ? 'rgba(91,63,212,.15)' : '#221D38',
                      border: msg.role === 'ai' ? '1px solid rgba(91,63,212,.2)' : 'none',
                      color: msg.role === 'ai' ? '#D0C8EC' : '#68607F',
                      textAlign: msg.role === 'user' ? 'right' : 'left',
                    }}>{msg.text}</div>
                  </motion.div>
                ))}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', background: '#5B3FD4',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, color: 'white', flexShrink: 0,
                  }}>AI</div>
                  <div style={{
                    display: 'flex', gap: 4, padding: '10px 14px',
                    background: 'rgba(91,63,212,.15)', border: '1px solid rgba(91,63,212,.2)',
                    borderRadius: '12px 12px 12px 4px',
                  }}>
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <span key={i} style={{
                        width: 6, height: 6, borderRadius: '50%', background: '#7B5FEA', display: 'block',
                        animation: `typingBounce 1.2s ${delay}s infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
              <Link to="/demo" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ background: 'rgba(91,63,212,.25)' }}
                  style={{
                    marginTop: 16, padding: '14px 20px',
                    background: 'rgba(91,63,212,.15)', border: '1px solid rgba(91,63,212,0.2)',
                    borderRadius: 8, cursor: 'pointer', transition: 'background 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: 14, color: '#F2EEFF', fontWeight: 500 }}>Try the full demo — text or voice</span>
                  <ChevronRight size={16} color="#7B5FEA" />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HomeCTA() {
  return (
    <section style={{ background: 'var(--bg)', padding: 'clamp(60px, 8vw, 96px) clamp(20px, 6vw, 80px)', textAlign: 'center' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            padding: 'clamp(40px, 6vw, 72px) clamp(24px, 4vw, 40px)',
            background: 'var(--bg2)', border: '1px solid rgba(91,63,212,0.2)',
            borderRadius: 20, position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top,rgba(91,63,212,.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 24, height: 2, background: '#5B3FD4' }} />
            <span style={{ color: '#7B5FEA', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 500 }}>Ready?</span>
            <div style={{ width: 24, height: 2, background: '#5B3FD4' }} />
          </div>
          <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 3.5vw, 42px)', marginBottom: 14, letterSpacing: '-.02em', position: 'relative' }}>
            Your Brokerage.<br />Our Infrastructure.
          </h2>
          <p style={{ color: '#68607F', fontSize: 16, marginBottom: 36, lineHeight: 1.8, position: 'relative' }}>
            Test the AI in 90 seconds with no commitment — or book a 20-minute call to see the full AGS deployment for your specific operation.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <Link to="/demo">
              <motion.button
                whileHover={{ background: '#7B5FEA', y: -2, boxShadow: '0 14px 44px rgba(91,63,212,0.42)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  background: '#5B3FD4', color: '#F2EEFF', padding: '14px 28px',
                  borderRadius: 8, fontWeight: 600, fontSize: 15,
                  border: 'none', cursor: 'pointer', fontFamily: "'Epilogue', sans-serif",
                }}
              >
                <Zap size={16} /> Test the AI — Free
              </motion.button>
            </Link>
            <a href="mailto:daniel@orvnlabs.com?subject=ORVN%20Labs%20%E2%80%94%20Book%20a%20Call" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ borderColor: '#5B3FD4', background: 'rgba(91,63,212,0.1)' }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  background: 'transparent', color: '#F2EEFF', padding: '14px 28px',
                  borderRadius: 8, fontWeight: 500, fontSize: 15,
                  border: '1px solid rgba(91,63,212,0.2)', cursor: 'pointer',
                  fontFamily: "'Epilogue', sans-serif", transition: 'all 0.2s',
                }}
              >
                Book a Call <ArrowRight size={15} />
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
      <DemoTeaser />
      <HomeCTA />
    </PageWrapper>
  );
}