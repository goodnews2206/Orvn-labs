import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, MessageSquare, Phone, Mic } from 'lucide-react';

import PageWrapper from '../components/PageWrapper';
import Eyebrow from '../components/ui/Eyebrow';
import { useDocumentMeta } from '../lib/seo';
import { PAS_LINKS } from '../lib/pas';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const buildScript = (name) => [
  { role: 'pas', text: `Hey ${name} — thanks for reaching out about that listing. Are you currently looking to buy, also open to selling, or just gathering information?` },
  { role: 'lead', text: 'Mostly looking to buy in the next couple of months.' },
  { role: 'pas', text: 'Got it. Are you already working with another agent, or is this your first conversation?' },
  { role: 'lead', text: 'First conversation.' },
  { role: 'pas', text: 'Roughly what price range works, and is financing already in place or still in progress?' },
  { role: 'lead', text: 'Around $450k. Pre-approval should be done in about two weeks.' },
  { role: 'pas', text: 'Helpful timing. Any specific neighborhoods, or are you open on location?' },
  { role: 'lead', text: 'A few in mind — mainly the north side.' },
  { role: 'pas', text: "I’ve got two listings on the north side that just came up. I can put you on Jordan’s calendar — they cover that area. Thursday 2pm or Friday 10am?" },
  { role: 'lead', text: 'Thursday works.' },
  { role: 'pas', text: 'Locking that in. You’ll get a confirmation shortly. Anything specific you’d like Jordan to know in advance?' },
];

function TextDemo() {
  const [phase, setPhase] = useState('form');
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const convoRef = useRef(null);

  useEffect(() => {
    if (convoRef.current) convoRef.current.scrollTop = convoRef.current.scrollHeight;
  }, [messages, typing]);

  const run = async (n) => {
    const script = buildScript(n);
    for (let i = 0; i < script.length; i += 1) {
      const turn = script[i];
      if (turn.role === 'pas') {
        setTyping(true);
        await sleep(1100 + Math.random() * 600);
        setTyping(false);
        setMessages((prev) => [...prev, turn]);
        await sleep(1500 + Math.random() * 400);
      } else {
        setMessages((prev) => [...prev, turn]);
        await sleep(450);
      }
    }
    setPhase('done');
  };

  const start = () => {
    if (!name.trim()) return;
    setPhase('running');
    setMessages([]);
    run(name.trim());
  };

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E5E8F0',
        borderRadius: 16,
        overflow: 'hidden',
        maxWidth: 600,
        width: '100%',
        boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 12px 28px rgba(15,23,42,0.06)',
      }}
    >
      <div
        style={{
          background: '#F7F8FB',
          borderBottom: '1px solid #E5E8F0',
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="animate-blink" style={{ width: 8, height: 8, borderRadius: '50%', background: '#0D9E6E' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569' }}>
            PAS · live demo
          </span>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#94A3B8' }}>
          Sample brokerage · scripted
        </span>
      </div>

      <div style={{ padding: 22 }}>
        <div
          ref={convoRef}
          style={{
            background: '#FAFBFD',
            border: '1px solid #F1F3F9',
            borderRadius: 12,
            padding: 16,
            minHeight: 280,
            maxHeight: 380,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            marginBottom: 18,
          }}
        >
          {phase === 'form' && messages.length === 0 && (
            <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: 13, marginTop: 80 }}>
              Enter your first name below to start the demo.
            </p>
          )}
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', justifyContent: m.role === 'pas' ? 'flex-start' : 'flex-end' }}
            >
              <div
                style={{
                  maxWidth: '82%',
                  padding: '10px 14px',
                  borderRadius: m.role === 'pas' ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
                  background: m.role === 'pas' ? '#fff' : '#5B3FD4',
                  color: m.role === 'pas' ? '#0F172A' : '#fff',
                  border: m.role === 'pas' ? '1px solid #E5E8F0' : 'none',
                  fontSize: 13.5,
                  lineHeight: 1.55,
                }}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
          {typing && (
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  display: 'flex',
                  gap: 4,
                  padding: '10px 14px',
                  background: '#fff',
                  border: '1px solid #E5E8F0',
                  borderRadius: '14px 14px 14px 4px',
                  alignItems: 'center',
                }}
              >
                {[0, 0.2, 0.4].map((d, i) => (
                  <span
                    key={i}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#94A3B8',
                      animation: `typing 1.2s ${d}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {phase === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: 10,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 6,
                fontSize: 13.5,
                color: '#065F46',
              }}
            >
              <CheckCircle2 size={16} /> Appointment booked · Thursday 2pm · agent notified · CRM updated.
            </motion.div>
          )}
        </div>

        {phase === 'form' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && start()}
              placeholder="Your first name"
              style={{
                background: '#F7F8FB',
                border: '1px solid #E5E8F0',
                borderRadius: 10,
                padding: '12px 14px',
                fontSize: 14,
                color: '#0F172A',
                outline: 'none',
              }}
            />
            <button type="button" onClick={start} className="btn-primary">
              Start demo <ArrowRight size={15} />
            </button>
            <p style={{ textAlign: 'center', fontSize: 11.5, color: '#94A3B8', margin: 0 }}>
              No signup required. ~90 seconds to see the full flow.
            </p>
          </div>
        )}

        {phase === 'done' && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/calculators/leakage" className="btn-primary" style={{ flex: 1 }}>
              Run leakage scorecard <ArrowRight size={15} />
            </Link>
            <a href={PAS_LINKS.earlyAccess} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ flex: 1 }}>
              Apply for early access
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function VoiceDemo() {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E5E8F0',
        borderRadius: 16,
        overflow: 'hidden',
        maxWidth: 600,
        width: '100%',
        boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 12px 28px rgba(15,23,42,0.06)',
      }}
    >
      <div
        style={{
          background: '#F7F8FB',
          borderBottom: '1px solid #E5E8F0',
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Mic size={14} color="#5B3FD4" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569' }}>
            PAS · voice
          </span>
        </div>
      </div>
      <div style={{ padding: 'clamp(28px, 5vw, 48px)', textAlign: 'center' }}>
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: '50%',
            background: '#EEEAFB',
            border: '1px solid #C7BCF5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 22px',
          }}
        >
          <Phone size={28} color="#5B3FD4" />
        </div>
        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: '#0F172A', margin: '0 0 10px' }}>
          Voice demo
        </h3>
        <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.7, margin: '0 auto 24px', maxWidth: 380 }}>
          The voice number for the public PAS demo will be published when production telephony is
          finalized.
        </p>
        {/* TODO: replace with the real Twilio / telephony number once the PAS voice demo line is live. */}
        <a
          href={PAS_LINKS.earlyAccess}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Apply for early access <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}

export default function Demo() {
  useDocumentMeta({
    title: 'Test PAS',
    description:
      'Run a live PAS conversation. 90 seconds, no signup, no calendar booking. See first-contact infrastructure work end-to-end.',
    path: '/demo',
  });

  const [tab, setTab] = useState('text');

  return (
    <PageWrapper>
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(24px, 3vw, 40px)', background: '#fff', textAlign: 'center' }}>
        <div className="container-page" style={{ maxWidth: 720 }}>
          <Eyebrow>Test PAS</Eyebrow>
          <h1 className="h-display" style={{ fontSize: 'clamp(34px, 5vw, 56px)', margin: '14px 0 16px' }}>
            See PAS run on a real conversation.
          </h1>
          <p className="lead">
            Not a video. A live simulation of PAS — first contact to booked appointment. Text or
            voice. No signup.
          </p>
        </div>

        <div style={{ display: 'inline-flex', gap: 0, background: '#F7F8FB', border: '1px solid #E5E8F0', borderRadius: 12, padding: 4, marginTop: 32 }}>
          {[
            { id: 'text', label: 'Text', icon: <MessageSquare size={14} /> },
            { id: 'voice', label: 'Voice', icon: <Phone size={14} /> },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              style={{
                padding: '10px 18px',
                border: 'none',
                background: tab === t.id ? '#5B3FD4' : 'transparent',
                color: tab === t.id ? '#fff' : '#475569',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                borderRadius: 9,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </section>

      <section style={{ padding: 'clamp(8px, 2vw, 24px) 0 clamp(56px, 8vw, 96px)', background: '#F7F8FB', borderTop: '1px solid #E5E8F0' }}>
        <div className="container-page" style={{ display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              {tab === 'text' ? <TextDemo /> : <VoiceDemo />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </PageWrapper>
  );
}
