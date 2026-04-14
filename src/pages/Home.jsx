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

gsap.registerPlugin(ScrollTrigger);

const SEC = {
  padding: 'clamp(72px, 8vw, 112px) clamp(20px, 5vw, 64px)',
};
const INNER = { maxWidth: 1160, margin: '0 auto' };

const EyeBrow = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
    <div style={{ width: 20, height: 1.5, background: '#1B2559' }} />
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1B2559', fontFamily: "'JetBrains Mono', monospace" }}>
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
            <span style={{ fontSize: 12, color: '#1B2559', fontWeight: 500, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>
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
              letterSpacing: '-0.02em', color: '#1B2559',
              marginBottom: 24,
            }}
          >
            Your Leads Die<br />
            While Your<br />
            <em style={{ fontStyle: 'italic', color: '#2D3A7C' }}>Agents Sleep.</em>
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
                whileHover={{ background: '#2D3A7C', y: -2, boxShadow: '0 12px 32px rgba(27,37,89,0.25)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#1B2559', color: 'white',
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
                  background: 'white', color: '#1B2559',
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
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#1B2559', lineHeight: 1 }}>
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
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1B2559', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'white', flexShrink: 0 }}>A</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: '#1B2559' }}>Alex — Premier Realty</div>
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
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1B2559', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white', flexShrink: 0, marginTop: 2 }}>AI</div>
            )}
            <div style={{
              maxWidth: '78%', padding: '9px 13px', fontSize: 12.5, lineHeight: 1.55,
              borderRadius: msg.role === 'ai' ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
              background: msg.role === 'ai' ? 'white' : '#1B2559',
              color: msg.role === 'ai' ? '#1B2559' : 'white',
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
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1B2559', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white', flexShrink: 0, marginTop: 2 }}>AI</div>
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
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1B2559', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <div style={{ fontSize: 12, fontWeight: 600, color: '#1B2559' }}>Appointment Booked — Thursday 2PM</div>
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

// ─── CALCULATOR (Revenue Audit) ────────────────────────────────────────────────
function Calculator() {
  const [leads, setLeads] = useState(150);
  const [commission, setCommission] = useState(12000);
  const [closeRate, setCloseRate] = useState(8);
  const [responseTime, setResponseTime] = useState(45);
  const [isaCost, setIsaCost] = useState('');
  const [crmLeads, setCrmLeads] = useState('');
  const [results, setResults] = useState(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.calc-inner', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const formatMoney = (n) => '$' + Math.round(n).toLocaleString();
  const formatResp = (v) => {
    if (v <= 5) return v + ' min';
    if (v <= 60) return v + ' min';
    if (v <= 480) return Math.round(v / 60 * 10) / 10 + ' hrs';
    return '8+ hrs';
  };

  const calculate = () => {
    const r = parseInt(responseTime);
    let penalty;
    if (r <= 5) penalty = 0;
    else if (r <= 30) penalty = 0.40;
    else if (r <= 60) penalty = 0.60;
    else if (r <= 240) penalty = 0.72;
    else penalty = 0.82;

    const cr = closeRate / 100;
    const idealDeals = leads * cr;
    const actualDeals = idealDeals * (1 - penalty);
    const dealsDelta = idealDeals - actualDeals;
    const monthlyLost = dealsDelta * commission;
    const annualLost = monthlyLost * 12;
    const crm = parseFloat(crmLeads) || 0;
    const graveyardLeads = crm * 0.12;
    const graveyardRev = graveyardLeads * cr * commission * 0.4;
    const total = annualLost + graveyardRev;

    let insight = '';
    if (r > 60) {
      insight = `With a <strong>${formatResp(r)} average response time</strong>, you're losing approximately <strong>${Math.round(penalty * 100)}% of your lead conversion potential</strong> before your agents even pick up the phone. At <strong>${leads} leads/month</strong> and a <strong>${formatMoney(commission)} average commission</strong>, that gap compounds to <strong>${formatMoney(monthlyLost)} every month</strong> — revenue leaving through the front door.`;
    } else if (r > 10) {
      insight = `Responding in <strong>${formatResp(r)}</strong> puts you ahead of most brokerages, but you're still losing an estimated <strong>${Math.round(penalty * 100)}% of lead conversion potential</strong>. That's <strong>${formatMoney(monthlyLost)}/month</strong> in avoidable leakage. The gap between good and automated is where ORVN Labs operates.`;
    } else {
      insight = `Your response time of <strong>${formatResp(r)}</strong> is in the top 10% of the industry. Your primary opportunity is <strong>graveyard CRM reactivation</strong> — with <strong>${formatMoney(graveyardRev)} in recoverable revenue</strong> sitting dormant in your database.`;
    }
    if (crm > 500) {
      insight += ` Your CRM database of <strong>${crm.toLocaleString()} leads</strong> represents your most underutilised asset — an estimated <strong>${Math.round(graveyardLeads)} leads</strong> are likely to transact within 12 months if systematically re-engaged.`;
    }
    if (parseFloat(isaCost) > 0) {
      insight += ` Your ISA investment of <strong>${formatMoney(parseFloat(isaCost))}/year</strong> represents your current infrastructure ceiling. ORVN Labs operates at a fraction of that cost while removing the biological constraints entirely.`;
    }

    setResults({
      total, annualLost, graveyardRev,
      monthlyLost, leadsLost: Math.round(dealsDelta),
      insight, penalty,
    });
    setTimeout(() => {
      document.getElementById('calc-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section ref={ref} style={{ ...SEC, background: '#F8F9FC', borderTop: '1px solid #E2E6F0' }}>
      <div style={INNER}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <EyeBrow text="Free Revenue Audit" />
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 400, color: '#1B2559', lineHeight: 1.1, marginBottom: 14, maxWidth: 640 }}>
            How Much Revenue Is Your Brokerage Bleeding Monthly?
          </h2>
          <p style={{ color: '#5A6480', fontSize: 16, lineHeight: 1.75, marginBottom: 48, maxWidth: 540 }}>
            Your numbers. Your personalised result. See exactly what slow response times and CRM decay are costing you.
          </p>
        </motion.div>

        <div className="calc-inner" style={{ background: 'white', border: '1px solid #E2E6F0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.06)' }}>
          {/* Card header */}
          <div style={{ padding: '20px 32px', borderBottom: '1px solid #F1F3F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAFBFD' }}>
            <span style={{ fontWeight: 600, fontSize: 15, color: '#1B2559' }}>Speed-to-Lead Revenue Audit</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8E97B5' }}>60 seconds</span>
          </div>

          <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
            {/* Input grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 28 }}>
              {[
                { label: 'Monthly Inbound Leads', id: 'leads', value: leads, setter: setLeads, prefix: null, hint: 'All new inquiries across all sources', required: true },
                { label: 'Avg Commission Per Deal', id: 'comm', value: commission, setter: setCommission, prefix: '$', hint: 'Your average take-home per closed deal', required: true },
                { label: 'Annual ISA Cost (if any)', id: 'isa', value: isaCost, setter: setIsaCost, prefix: '$', hint: 'Salary + benefits. Leave blank if none.', required: false },
                { label: 'Total CRM Database Size', id: 'crm', value: crmLeads, setter: setCrmLeads, prefix: null, hint: 'All historical leads ever captured', required: false },
              ].map(f => (
                <div key={f.id}>
                  <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8E97B5', marginBottom: 8 }}>
                    {f.label}{f.required && <span style={{ color: '#1B2559', marginLeft: 4 }}>*</span>}
                  </label>
                  <div style={{ position: 'relative' }}>
                    {f.prefix && <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#8E97B5' }}>{f.prefix}</span>}
                    <input
                      type="number"
                      value={f.value}
                      onChange={e => f.setter(e.target.value)}
                      placeholder={f.id === 'leads' ? '150' : f.id === 'comm' ? '12000' : f.id === 'isa' ? '85000' : '2500'}
                      style={{
                        width: '100%', background: '#F8F9FC', border: '1px solid #E2E6F0',
                        borderRadius: 8, padding: `12px ${f.prefix ? '40px' : '14px'} 12px ${f.prefix ? '28px' : '14px'}`,
                        fontSize: 15, color: '#1B2559', fontFamily: "'JetBrains Mono', monospace",
                        outline: 'none', transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = '#1B2559'}
                      onBlur={e => e.target.style.borderColor = '#E2E6F0'}
                    />
                  </div>
                  <p style={{ fontSize: 11, color: '#8E97B5', marginTop: 5, fontStyle: 'italic' }}>{f.hint}</p>
                </div>
              ))}
            </div>

            {/* Sliders */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28, marginBottom: 36 }}>
              <div>
                <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8E97B5', marginBottom: 8 }}>
                  Lead-to-Close Rate <span style={{ color: '#1B2559' }}>*</span>
                </label>
                <input type="range" min="1" max="30" value={closeRate} onChange={e => setCloseRate(e.target.value)} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8E97B5' }}>1%</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: '#1B2559' }}>{closeRate}%</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8E97B5' }}>30%</span>
                </div>
                <p style={{ fontSize: 11, color: '#8E97B5', textAlign: 'center', marginTop: 3 }}>Industry avg ~8%</p>
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8E97B5', marginBottom: 8 }}>
                  Avg Lead Response Time <span style={{ color: '#1B2559' }}>*</span>
                </label>
                <input type="range" min="1" max="480" value={responseTime} onChange={e => setResponseTime(e.target.value)} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8E97B5' }}>&lt;1 min</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: responseTime > 60 ? '#DC2626' : responseTime > 15 ? '#D97706' : '#0D9E6E' }}>{formatResp(responseTime)}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8E97B5' }}>8 hrs+</span>
                </div>
                <p style={{ fontSize: 11, color: '#8E97B5', textAlign: 'center', marginTop: 3 }}>Ideal: under 5 minutes</p>
              </div>
            </div>

            <motion.button
              onClick={calculate}
              whileHover={{ background: '#2D3A7C', y: -1, boxShadow: '0 12px 32px rgba(27,37,89,0.25)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%', background: '#1B2559', color: 'white', border: 'none',
                borderRadius: 10, padding: '16px', fontWeight: 700, fontSize: 16,
                cursor: 'pointer', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em',
              }}
            >
              → Calculate My Revenue Loss
            </motion.button>
          </div>

          {/* Results */}
          <AnimatePresence>
            {results && (
              <motion.div
                id="calc-results"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ borderTop: '1px solid #F1F3F9', padding: 'clamp(24px, 4vw, 40px)' }}
              >
                {/* Hero result */}
                <div style={{
                  background: 'linear-gradient(135deg, #FEF2F2, #FFF7F7)',
                  border: '1px solid #FECACA',
                  borderRadius: 14, padding: 36, textAlign: 'center', marginBottom: 24,
                }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.15em', color: '#DC2626', textTransform: 'uppercase', marginBottom: 12 }}>
                    Estimated Annual Revenue Being Lost
                  </div>
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(48px, 8vw, 80px)', color: '#DC2626', lineHeight: 1, marginBottom: 8 }}>
                    {formatMoney(results.total)}
                  </div>
                  <p style={{ fontSize: 14, color: '#5A6480' }}>What your current system costs you every year in missed opportunities</p>
                </div>

                {/* Breakdown cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
                  {[
                    { label: 'Leads Lost to Response Time', value: results.leadsLost + '/mo', color: '#DC2626' },
                    { label: 'Monthly Commission Lost', value: formatMoney(results.monthlyLost), color: '#D97706' },
                    { label: 'Graveyard Opportunity', value: formatMoney(results.graveyardRev), color: '#1B2559' },
                  ].map((card, i) => (
                    <div key={i} style={{ background: '#F8F9FC', border: '1px solid #E2E6F0', borderRadius: 10, padding: '20px', textAlign: 'center' }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.1em', color: '#8E97B5', textTransform: 'uppercase', marginBottom: 8 }}>{card.label}</div>
                      <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, color: card.color, marginBottom: 4 }}>{card.value}</div>
                    </div>
                  ))}
                </div>

                {/* Insight */}
                <div style={{ background: '#F8F9FC', border: '1px solid #E2E6F0', borderLeft: '3px solid #1B2559', borderRadius: 10, padding: 24, marginBottom: 24 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', color: '#1B2559', textTransform: 'uppercase', marginBottom: 10 }}>ORVN Labs Analysis</div>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: '#5A6480' }} dangerouslySetInnerHTML={{ __html: results.insight }} />
                </div>

                {/* Lead capture */}
                <div style={{ background: 'linear-gradient(135deg, #EEF2FF, #F0FDF7)', border: '1px solid #C7D2FE', borderRadius: 14, padding: 36, textAlign: 'center' }}>
                  <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#1B2559', marginBottom: 8 }}>Get Your Full Revenue Recovery Report</h3>
                  <p style={{ color: '#5A6480', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>We'll send you a personalised breakdown with exact recovery projections for your brokerage.</p>
                  {!submitted ? (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto 12px' }}>
                      <input
                        type="email" value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="your@brokerage.com" required
                        style={{ flex: 1, background: 'white', border: '1px solid #E2E6F0', borderRadius: 8, padding: '13px 16px', fontSize: 14, color: '#1B2559', outline: 'none' }}
                        onFocus={e => e.target.style.borderColor = '#1B2559'}
                        onBlur={e => e.target.style.borderColor = '#E2E6F0'}
                      />
                      <button type="submit" style={{ background: '#0D9E6E', color: 'white', border: 'none', borderRadius: 8, padding: '13px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        Send Report
                      </button>
                    </form>
                  ) : (
                    <div style={{ background: '#F0FDF7', border: '1px solid #BBF7D0', borderRadius: 8, padding: 16, fontSize: 14, color: '#0D9E6E', maxWidth: 440, margin: '0 auto' }}>
                      ✓ Report on its way — check your inbox within 5 minutes.
                    </div>
                  )}
                  <p style={{ fontSize: 11, color: '#8E97B5' }}>No spam. One email. Your data stays private.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
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
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 400, color: '#1B2559', lineHeight: 1.1, marginBottom: 16 }}>
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
                <div style={{ width: 34, height: 34, borderRadius: 8, background: '#F1F3F9', border: '1px solid #E2E6F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1B2559', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1B2559', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#8E97B5' }}>{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <Link to="/demo">
            <motion.button
              whileHover={{ background: '#2D3A7C', y: -1, boxShadow: '0 10px 28px rgba(27,37,89,0.2)' }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1B2559', color: 'white', padding: '14px 24px', borderRadius: 10, fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
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
              <span style={{ fontWeight: 600, fontSize: 14, color: '#1B2559' }}>ORVN PAS — Live</span>
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
                  {msg.role === 'ai' && <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1B2559', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: 'white', flexShrink: 0, marginTop: 2 }}>AI</div>}
                  <div style={{ maxWidth: '80%', padding: '9px 13px', fontSize: 12.5, lineHeight: 1.55, borderRadius: msg.role === 'ai' ? '12px 12px 12px 4px' : '12px 12px 4px 12px', background: msg.role === 'ai' ? 'white' : '#1B2559', color: msg.role === 'ai' ? '#1B2559' : 'white', boxShadow: msg.role === 'ai' ? '0 1px 3px rgba(0,0,0,0.07)' : 'none', border: msg.role === 'ai' ? '1px solid #F1F3F9' : 'none' }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1B2559', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: 'white', flexShrink: 0, marginTop: 2 }}>AI</div>
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
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1B2559' }}>Try the full demo — text or voice</span>
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
    <section style={{ ...SEC, background: '#1B2559', textAlign: 'center' }}>
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
                whileHover={{ background: 'white', color: '#1B2559', y: -2 }}
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
