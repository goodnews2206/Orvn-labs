import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Phone, Mic, Send, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const buildScript = (name) => [
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

  const runScript = async (n) => {
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
    <div style={{ background: 'var(--bg3)', border: '1px solid rgba(91,63,212,0.2)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 0 80px rgba(91,63,212,.15), 0 40px 80px rgba(0,0,0,.4)', maxWidth: 560, width: '100%' }}>
      {/* Card header */}
      <div style={{ background: 'rgba(91,63,212,.12)', borderBottom: '1px solid rgba(91,63,212,0.2)', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 16, fontWeight: 600, letterSpacing: '.05em' }}>ORVN PAS — Text Simulation</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,.15)', border: '1px solid rgba(34,197,94,.3)', borderRadius: 100, padding: '4px 12px' }}>
          <span className="animate-blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'block' }} />
          <span style={{ fontSize: 11, color: '#22C55E', fontWeight: 600, letterSpacing: '.06em' }}>LIVE</span>
        </div>
      </div>

      <div style={{ padding: 28 }}>
        {/* Phase progress */}
        {phase !== 'form' && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            {['Engage', 'Qualify', 'Book'].map((label, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ height: 3, borderRadius: 2, background: i < phaseIdx ? '#7B5FEA' : i === phaseIdx ? '#5B3FD4' : '#221D38', transition: 'background .4s', marginBottom: 4 }} />
                <span style={{ fontSize: 10, color: i <= phaseIdx ? '#7B5FEA' : '#68607F', letterSpacing: '.06em', textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Conversation */}
        <div ref={convoRef} style={{ background: 'var(--bg)', border: '1px solid rgba(91,63,212,0.2)', borderRadius: 10, padding: 16, minHeight: 220, maxHeight: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {messages.length === 0 && phase === 'form' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#68607F', fontSize: 14, textAlign: 'center', padding: 20 }}>
              Enter your name below to start the live AI simulation
            </div>
          )}
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', gap: 10, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: msg.role === 'ai' ? '#5B3FD4' : '#221D38', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: msg.role === 'ai' ? 'white' : '#68607F' }}>
                {msg.role === 'ai' ? 'AI' : 'You'}
              </div>
              <div style={{ maxWidth: '82%', padding: '9px 13px', fontSize: 13, lineHeight: 1.6, borderRadius: msg.role === 'ai' ? '12px 12px 12px 4px' : '12px 12px 4px 12px', background: msg.role === 'ai' ? 'rgba(91,63,212,.15)' : '#221D38', border: msg.role === 'ai' ? '1px solid rgba(91,63,212,.2)' : 'none', color: msg.role === 'ai' ? '#D0C8EC' : '#68607F', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {typing && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white', flexShrink: 0 }}>AI</div>
              <div style={{ display: 'flex', gap: 4, padding: '10px 14px', background: 'rgba(91,63,212,.15)', border: '1px solid rgba(91,63,212,.2)', borderRadius: '12px 12px 12px 4px' }}>
                {[0, 0.2, 0.4].map((d, i) => (
                  <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#7B5FEA', display: 'block', animation: `typingBounce 1.2s ${d}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          {phase === 'done' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white', flexShrink: 0 }}>AI</div>
              <div style={{ maxWidth: '82%', padding: '9px 13px', fontSize: 13, lineHeight: 1.6, borderRadius: '12px 12px 12px 4px', background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.25)', color: '#D0C8EC' }}>
                ✅ Appointment booked for Thursday. Confirmation sent. — That's the ORVN PAS: first contact to booked appointment, fully autonomous, zero humans involved.
              </div>
            </motion.div>
          )}
        </div>

        {/* Form or done CTA */}
        {phase === 'form' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              value={name} onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStart()}
              placeholder="Your first name"
              style={{ background: 'var(--bg)', border: '1px solid rgba(91,63,212,0.2)', borderRadius: 8, padding: '12px 15px', color: '#F2EEFF', fontFamily: "'Epilogue', sans-serif", fontSize: 14, outline: 'none', width: '100%' }}
              onFocus={e => e.target.style.borderColor = '#5B3FD4'}
              onBlur={e => e.target.style.borderColor = 'rgba(91,63,212,0.2)'}
            />
            <motion.button onClick={handleStart} whileHover={{ background: '#7B5FEA', y: -1, boxShadow: '0 8px 30px rgba(91,63,212,.4)' }} whileTap={{ scale: 0.97 }}
              style={{ width: '100%', background: '#5B3FD4', color: 'white', border: 'none', borderRadius: 8, padding: '14px 24px', fontFamily: "'Clash Display', sans-serif", fontSize: 16, fontWeight: 600, letterSpacing: '.04em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <Zap size={16} /> Start the AI Demo
            </motion.button>
            <p style={{ textAlign: 'center', fontSize: 11, color: '#68607F', marginTop: 4 }}>No signup required — 90 seconds to see the full flow</p>
          </div>
        )}
        {phase === 'done' && (
          <a href="mailto:daniel@orvnlabs.com?subject=ORVN%20Labs%20%E2%80%94%20Interested" style={{ textDecoration: 'none' }}>
            <motion.button whileHover={{ background: '#7B5FEA', y: -1, boxShadow: '0 8px 30px rgba(91,63,212,.4)' }} whileTap={{ scale: 0.97 }}
              style={{ width: '100%', background: '#5B3FD4', color: 'white', border: 'none', borderRadius: 8, padding: '14px 24px', fontFamily: "'Clash Display', sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: '.04em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 8 }}>
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
    <div style={{ background: 'var(--bg3)', border: '1px solid rgba(91,63,212,0.2)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 0 80px rgba(91,63,212,.15), 0 40px 80px rgba(0,0,0,.4)', maxWidth: 560, width: '100%' }}>
      <div style={{ background: 'rgba(91,63,212,.12)', borderBottom: '1px solid rgba(91,63,212,0.2)', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 16, fontWeight: 600, letterSpacing: '.05em' }}>ORVN PAS — Voice Call</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(6,182,212,.15)', border: '1px solid rgba(6,182,212,.3)', borderRadius: 100, padding: '4px 12px' }}>
          <Mic size={10} color="#06B6D4" />
          <span style={{ fontSize: 11, color: '#06B6D4', fontWeight: 600, letterSpacing: '.06em' }}>VOICE</span>
        </div>
      </div>
      <div style={{ padding: 40, textAlign: 'center' }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(91,63,212,.15)', border: '2px solid rgba(91,63,212,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', position: 'relative' }}>
          <Phone size={36} color="#7B5FEA" />
          <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '1px solid rgba(91,63,212,0.2)', animation: 'orbPulse 2s ease-in-out infinite' }} />
        </div>
        <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 12, color: '#F2EEFF' }}>Live Voice Demo</h3>
        <p style={{ color: '#68607F', fontSize: 15, lineHeight: 1.8, marginBottom: 32, maxWidth: 360, margin: '0 auto 32px' }}>
          Call the ORVN PAS directly and experience the voice qualification flow in real time. Powered by Vapi.
        </p>
        <motion.a href="tel:+1-800-ORVN-AI" whileHover={{ background: '#0891b2' }} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#06B6D4', color: '#001A1A', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', fontFamily: "'Epilogue', sans-serif" }}>
          <Phone size={16} /> Start Voice Demo
        </motion.a>
        <p style={{ color: '#68607F', fontSize: 12, marginTop: 16 }}>Powered by Vapi AI — no app download required</p>
      </div>
    </div>
  );
}

const tabs = [
  { id: 'text', label: 'Text Simulation', icon: <MessageSquare size={15} /> },
  { id: 'voice', label: 'Voice Call', icon: <Phone size={15} /> },
];

export default function Demo() {
  const [activeTab, setActiveTab] = useState('text');

  return (
    <PageWrapper>
      <div style={{ paddingTop: 70, minHeight: '100vh', background: 'var(--bg)' }}>
        {/* Header */}
        <div style={{ padding: 'clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px) 0', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(91,63,212,.12)', border: '1px solid rgba(91,63,212,.26)', borderRadius: 100, padding: '5px 15px', marginBottom: 24 }}>
              <span className="animate-blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#7B5FEA', display: 'block' }} />
              <span style={{ fontSize: 12, color: '#7B5FEA', letterSpacing: '.09em', fontWeight: 500 }}>Live Demo Environment</span>
            </div>
            <h1 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 'clamp(36px, 5vw, 68px)', letterSpacing: '-.026em', lineHeight: .97, marginBottom: 18 }}>
              Test the AI.<br /><em style={{ color: '#7B5FEA', fontStyle: 'normal' }}>Live. Right Now.</em>
            </h1>
            <p style={{ color: '#68607F', fontSize: 17, maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.82, fontWeight: 300 }}>
              No scripts. No demos. A real simulation of the ORVN PAS working a lead from first contact to booked appointment.
            </p>
          </motion.div>

          {/* Tab switcher */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: 'flex', gap: 0, background: 'var(--bg3)', border: '1px solid rgba(91,63,212,0.2)', borderRadius: 12, padding: 5, maxWidth: 380, margin: '0 auto 48px', width: '100%' }}>
            {tabs.map(tab => (
              <motion.button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ flex: 1, padding: '11px 14px', border: 'none', background: activeTab === tab.id ? '#5B3FD4' : 'transparent', color: activeTab === tab.id ? '#F2EEFF' : '#68607F', fontFamily: "'Epilogue', sans-serif", fontSize: 14, fontWeight: 500, cursor: 'pointer', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all .22s', boxShadow: activeTab === tab.id ? '0 4px 16px rgba(91,63,212,.4)' : 'none' }}>
                {tab.icon} {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Demo area */}
        <div style={{ padding: '0 clamp(20px, 6vw, 80px) clamp(60px, 8vw, 96px)', display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {activeTab === 'text' && <TextDemo />}
              {activeTab === 'voice' && <VoiceDemo />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}