import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, Zap, CheckCircle, ArrowRight, Mic } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const buildScript = name => [
  { role: 'ai', text: `Hey ${name}! Quick one — are you currently looking to buy, or are you also open to selling a property?` },
  { role: 'user', text: 'Mostly looking to buy in the next couple of months.' },
  { role: 'ai', text: 'Good timing. Are you pre-approved for financing, or is that still in progress?' },
  { role: 'user', text: "We're working on it — should be sorted in a few weeks." },
  { role: 'ai', text: 'That actually gives us a nice window to work with. Rough price range? Ballpark is totally fine.' },
  { role: 'user', text: 'Somewhere between $400K and $500K.' },
  { role: 'ai', text: "Got it. Any specific neighbourhoods you're focused on, or are you open on location?" },
  { role: 'user', text: 'A few in mind — mainly the north side.' },
  { role: 'ai', text: "I have a couple of listings on the north side that just came in — they tend to move fast. I'd love to get you in front of one of our agents this week. Thursday or Friday — which works better?" },
  { role: 'user', text: 'Thursday works great.' },
  { role: 'ai', text: "Locking that in now. You'll get a confirmation shortly with the agent's details. Anything specific you'd like them to know before you meet?" },
];

function TextDemo() {
  const [phase, setPhase] = useState('form');
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState(0);
  const convoRef = useRef(null);

  useEffect(() => {
    if (convoRef.current) convoRef.current.scrollTop = convoRef.current.scrollHeight;
  }, [messages, typing]);

  const runScript = async n => {
    const script = buildScript(n);
    for (let i = 0; i < script.length; i++) {
      const s = script[i];
      if (s.role === 'ai') {
        setTyping(true);
        await sleep(1200 + Math.random() * 600);
        setTyping(false);
        setMessages(prev => [...prev, s]);
        setStep(i + 1);
        await sleep(1800 + Math.random() * 400);
      } else {
        setMessages(prev => [...prev, s]);
        setStep(i + 1);
        await sleep(500);
      }
    }
    setPhase('done');
  };

  const handleStart = () => {
    if (!name.trim()) return;
    setPhase('running');
    setMessages([]);
    runScript(name.trim());
  };

  const phaseIdx = Math.min(Math.floor((step / 11) * 3), 2);

  return (
    <div style={{ background: 'white', border: '1px solid #E2E6F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 20px 48px rgba(27,37,89,0.08)', maxWidth: 580, width: '100%' }}>
      {/* Header */}
      <div style={{ background: '#F8F9FC', borderBottom: '1px solid #E2E6F0', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white' }}>A</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#5B3FD4' }}>Alex — Premier Realty</div>
            <div style={{ fontSize: 11, color: '#0D9E6E' }}>● ORVN PAS Active</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F0FDF7', border: '1px solid #BBF7D0', borderRadius: 100, padding: '4px 10px' }}>
          <span className="animate-blink" style={{ width: 5, height: 5, borderRadius: '50%', background: '#0D9E6E', display: 'block' }} />
          <span style={{ fontSize: 10, color: '#0D9E6E', fontWeight: 600, letterSpacing: '0.06em', fontFamily: "'JetBrains Mono', monospace" }}>LIVE</span>
        </div>
      </div>

      <div style={{ padding: 24 }}>
        {/* Phase bar */}
        {phase !== 'form' && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            {['Engage', 'Qualify', 'Book'].map((label, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ height: 3, borderRadius: 2, background: i < phaseIdx ? '#5B3FD4' : i === phaseIdx ? '#2D3A7C' : '#E2E6F0', transition: 'background .4s', marginBottom: 4 }} />
                <span style={{ fontSize: 10, color: i <= phaseIdx ? '#5B3FD4' : '#8E97B5', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Conversation */}
        <div ref={convoRef} style={{ background: '#FAFBFD', border: '1px solid #F1F3F9', borderRadius: 12, padding: 16, minHeight: 240, maxHeight: 320, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {messages.length === 0 && phase === 'form' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: '#8E97B5', fontSize: 13, textAlign: 'center' }}>
              Enter your name below to start the live AI simulation
            </div>
          )}
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', gap: 8, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
              {msg.role === 'ai' && (
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white', flexShrink: 0, marginTop: 2 }}>AI</div>
              )}
              <div style={{ maxWidth: '80%', padding: '9px 13px', fontSize: 13, lineHeight: 1.55, borderRadius: msg.role === 'ai' ? '12px 12px 12px 4px' : '12px 12px 4px 12px', background: msg.role === 'ai' ? 'white' : '#5B3FD4', color: msg.role === 'ai' ? '#5B3FD4' : 'white', boxShadow: msg.role === 'ai' ? '0 1px 3px rgba(0,0,0,0.07)' : 'none', border: msg.role === 'ai' ? '1px solid #F1F3F9' : 'none', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {typing && (
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white', flexShrink: 0, marginTop: 2 }}>AI</div>
              <div style={{ display: 'flex', gap: 3, padding: '9px 13px', background: 'white', border: '1px solid #F1F3F9', borderRadius: '12px 12px 12px 4px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', alignItems: 'center' }}>
                {[0, 0.18, 0.36].map((d, i) => (
                  <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#C8CEDF', display: 'block', animation: `typing 1.2s ${d}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          {phase === 'done' && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#0D9E6E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <CheckCircle size={14} color="white" />
              </div>
              <div style={{ maxWidth: '80%', padding: '9px 13px', fontSize: 13, lineHeight: 1.55, borderRadius: '12px 12px 12px 4px', background: '#F0FDF7', border: '1px solid #BBF7D0', color: '#5B3FD4' }}>
                ✓ Appointment booked for Thursday. Confirmation sent. — That's the ORVN PAS: first contact to booked appointment, fully autonomous, zero humans involved.
              </div>
            </motion.div>
          )}
        </div>

        {phase === 'form' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              value={name} onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStart()}
              placeholder="Your first name"
              style={{ background: '#F8F9FC', border: '1px solid #E2E6F0', borderRadius: 8, padding: '12px 15px', color: '#5B3FD4', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none' }}
              onFocus={e => e.target.style.borderColor = '#5B3FD4'}
              onBlur={e => e.target.style.borderColor = '#E2E6F0'}
            />
            <motion.button onClick={handleStart} whileHover={{ background: '#2D3A7C', y: -1 }} whileTap={{ scale: 0.97 }}
              style={{ width: '100%', background: '#5B3FD4', color: 'white', border: 'none', borderRadius: 8, padding: '14px', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: "'Inter', sans-serif" }}>
              <Zap size={15} /> Start the AI Demo
            </motion.button>
            <p style={{ textAlign: 'center', fontSize: 11, color: '#8E97B5' }}>No signup required — 90 seconds to see the full flow</p>
          </div>
        )}
        {phase === 'done' && (
          <a href="mailto:daniel@orvnlabs.com?subject=ORVN%20Labs%20%E2%80%94%20Interested" style={{ textDecoration: 'none' }}>
            <motion.button whileHover={{ background: '#2D3A7C', y: -1, boxShadow: '0 10px 28px rgba(27,37,89,0.2)' }} whileTap={{ scale: 0.97 }}
              style={{ width: '100%', background: '#5B3FD4', color: 'white', border: 'none', borderRadius: 8, padding: '14px', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: "'Inter', sans-serif", marginTop: 8 }}>
              → Implement This in Your Brokerage
            </motion.button>
          </a>
        )}
      </div>
    </div>
  );
}

function VoiceDemo() {
  return (
    <div style={{ background: 'white', border: '1px solid #E2E6F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 20px 48px rgba(27,37,89,0.08)', maxWidth: 580, width: '100%' }}>
      <div style={{ background: '#F8F9FC', borderBottom: '1px solid #E2E6F0', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: '#5B3FD4' }}>ORVN PAS — Voice Call</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 100, padding: '4px 10px' }}>
          <Mic size={10} color="#2563EB" />
          <span style={{ fontSize: 10, color: '#2563EB', fontWeight: 600, letterSpacing: '0.06em', fontFamily: "'JetBrains Mono', monospace" }}>VOICE</span>
        </div>
      </div>
      <div style={{ padding: 48, textAlign: 'center' }}>
        <div style={{ width: 90, height: 90, borderRadius: '50%', background: '#F1F3F9', border: '2px solid #E2E6F0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Phone size={32} color="#5B3FD4" />
        </div>
        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, fontWeight: 400, color: '#5B3FD4', marginBottom: 12 }}>Live Voice Demo</h3>
        <p style={{ color: '#5A6480', fontSize: 15, lineHeight: 1.75, marginBottom: 32, maxWidth: 360, margin: '0 auto 32px' }}>
          Call the ORVN PAS directly and experience the voice qualification flow in real time. Powered by Vapi AI.
        </p>
        <a href="tel:+1-800-ORVN-AI" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#5B3FD4', color: 'white', padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>
          <Phone size={15} /> Start Voice Demo
        </a>
        <p style={{ color: '#8E97B5', fontSize: 12, marginTop: 16 }}>Powered by Vapi AI — no app download required</p>
      </div>
    </div>
  );
}

export default function Demo() {
  const [activeTab, setActiveTab] = useState('text');

  return (
    <PageWrapper>
      <div style={{ paddingTop: 68, minHeight: '100vh', background: '#F8F9FC' }}>
        <div style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 64px) 0', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'white', border: '1px solid #E2E6F0', borderRadius: 100, padding: '5px 13px', marginBottom: 24 }}>
              <span className="animate-blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#0D9E6E', display: 'block' }} />
              <span style={{ fontSize: 12, color: '#5B3FD4', fontWeight: 500, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>Live Demo Environment</span>
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, color: '#5B3FD4', lineHeight: 1.08, marginBottom: 16 }}>
              Test the AI.<br /><em style={{ fontStyle: 'italic', color: '#2D3A7C' }}>Live. Right Now.</em>
            </h1>
            <p style={{ color: '#5A6480', fontSize: 17, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.75 }}>
              No scripts. No demos. A real simulation of the ORVN PAS working a lead from first contact to booked appointment.
            </p>
          </motion.div>

          {/* Tab switcher */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: 'inline-flex', gap: 0, background: 'white', border: '1px solid #E2E6F0', borderRadius: 12, padding: 4, marginBottom: 48 }}>
            {[
              { id: 'text', label: 'Text Simulation', icon: <MessageSquare size={14} /> },
              { id: 'voice', label: 'Voice Call', icon: <Phone size={14} /> },
            ].map(tab => (
              <motion.button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ padding: '10px 20px', border: 'none', background: activeTab === tab.id ? '#5B3FD4' : 'transparent', color: activeTab === tab.id ? 'white' : '#5A6480', fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, cursor: 'pointer', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}>
                {tab.icon} {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div style={{ padding: '0 clamp(20px, 5vw, 64px) clamp(72px, 8vw, 112px)', display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {activeTab === 'text' && <TextDemo />}
              {activeTab === 'voice' && <VoiceDemo />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}