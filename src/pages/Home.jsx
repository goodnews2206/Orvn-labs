import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Eye,
  EyeOff,
  BarChart3,
  Calculator,
  Gauge,
  CheckCircle2,
  Send,
} from 'lucide-react';

import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import FlowDiagram from '../components/FlowDiagram';
import { useDocumentMeta } from '../lib/seo';
import { PAS_LINKS } from '../lib/pas';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut', delay },
});

const BASELINE_CLOSE_RATE = 0.03;

const fmtCurrency = (n) =>
  '$' + Math.round(Math.max(0, Number(n) || 0)).toLocaleString();
const fmtNumber = (n) => Math.round(Math.max(0, Number(n) || 0)).toLocaleString();

// ─── 1. HERO ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        background: '#fff',
        paddingTop: 'clamp(80px, 12vw, 160px)',
        paddingBottom: 'clamp(60px, 8vw, 100px)',
        overflow: 'hidden',
      }}
    >
      <div
        className="container-page"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
          gap: 'clamp(48px, 6vw, 80px)',
          alignItems: 'center',
        }}
      >
        <div>
          <motion.div {...fadeUp(0)}>
            <span
              className="pill"
              style={{
                marginBottom: 28,
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                padding: '6px 12px',
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 500,
                color: '#475569',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0D9E6E' }} />
              ORVN Labs · real estate brokerage infrastructure
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.05)}
            className="h-display"
            style={{
              fontSize: 'clamp(44px, 6.2vw, 82px)',
              lineHeight: 1.05,
              marginBottom: 28,
              letterSpacing: '-0.02em',
              fontWeight: 600,
            }}
          >
            Control the first-contact layer{' '}
            <span style={{ color: '#5B3FD4' }}>before delay kills conversion.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            className="lead"
            style={{
              maxWidth: 600,
              marginBottom: 40,
              fontSize: 'clamp(17px, 1.8vw, 20px)',
              lineHeight: 1.6,
              color: '#475569',
            }}
          >
            ORVN Labs builds brokerage intelligence infrastructure.{' '}
            <strong style={{ color: '#0F172A', fontWeight: 600 }}>PAS</strong>, our flagship system,
            answers, qualifies, routes, books, and logs inbound leads — before human delay turns
            intent cold.
          </motion.p>

          <motion.div
            {...fadeUp(0.15)}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}
          >
            <Link to="/#calculate" className="btn-primary" style={{ padding: '14px 28px', fontSize: 15 }}>
              Run your lead leakage score <ArrowRight size={18} />
            </Link>
            <Link to="/pas" className="btn-secondary" style={{ padding: '14px 28px', fontSize: 15 }}>
              Explore PAS
            </Link>
          </motion.div>

          <motion.p
            {...fadeUp(0.2)}
            style={{
              fontSize: 13,
              color: '#94A3B8',
              maxWidth: 500,
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}
          >
            Built for brokerage owners, team leads, and operators who cannot afford CRM graveyards.
          </motion.p>
        </div>

        <motion.div
          {...fadeUp(0.25)}
          style={{
            position: 'relative',
            background: '#F8FAFC',
            padding: 'clamp(24px, 4vw, 40px)',
            borderRadius: 32,
            border: '1px solid #E2E8F0',
            boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.05)',
          }}
        >
          <FlowDiagram label="What PAS controls" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── 2. PROBLEM ──────────────────────────────────────────────────────────────
function Problem() {
  const blameVsReality = [
    { blame: 'Bad leads', reality: 'Delayed first response' },
    { blame: 'Lazy agents', reality: 'Generic follow-up' },
    { blame: 'Weak CRM', reality: 'No qualification' },
    { blame: 'Bad ad source', reality: 'No booked next step' },
    { blame: 'Rough market', reality: 'After-hours leakage' },
  ];

  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 840, marginBottom: 64 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>The problem</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            margin: '20px 0 24px',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          Most brokerages are measuring the wrong failure.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 19px)', color: '#475569' }}
        >
          The gap between inquiry and qualified appointment is usually where money dies — and it
          rarely shows up in the report you’re looking at.
        </motion.p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
          marginBottom: 64,
        }}
      >
        <CompareColumn
          icon={<Eye size={20} />}
          tone="neutral"
          title="What gets measured"
          items={['Lead volume', 'Lead spend', 'Closed deals', 'Agent count']}
        />
        <CompareColumn
          icon={<EyeOff size={20} />}
          tone="risk"
          title="What gets ignored"
          items={[
            'Time to first response',
            'Actual contact rate',
            'Qualification rate',
            'Routing quality',
            'Booking rate',
          ]}
        />
      </div>

      <motion.div
        {...fadeUp(0.1)}
        style={{
          background: '#fff',
          border: '1px solid #E2E8F0',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <div style={{ padding: '20px 32px' }}>
            <span style={mono('#64748B', 0)}>What brokerages blame</span>
          </div>
          <div style={{ padding: '20px 32px', borderLeft: '1px solid #E2E8F0' }}>
            <span style={mono('#5B3FD4', 0)}>What actually killed conversion</span>
          </div>
        </div>
        {blameVsReality.map((row, idx) => (
          <div
            key={row.blame}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderBottom: idx === blameVsReality.length - 1 ? 'none' : '1px solid #F1F5F9',
            }}
          >
            <div
              style={{
                padding: '18px 32px',
                color: '#94A3B8',
                fontSize: 15,
                textDecoration: 'line-through',
              }}
            >
              {row.blame}
            </div>
            <div
              style={{
                padding: '18px 32px',
                color: '#0F172A',
                fontSize: 15,
                fontWeight: 500,
                borderLeft: '1px solid #F1F5F9',
              }}
            >
              {row.reality}
            </div>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}

function CompareColumn({ icon, tone, title, items }) {
  const isRisk = tone === 'risk';
  const palette = isRisk
    ? { border: '#FEE2E2', bg: '#FFF1F1', label: '#DC2626', dot: '#EF4444' }
    : { border: '#E2E8F0', bg: '#F8FAFC', label: '#475569', dot: '#94A3B8' };

  return (
    <motion.div
      {...fadeUp(0.05)}
      style={{
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        borderRadius: 24,
        padding: 32,
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span
          style={{
            color: palette.label,
            display: 'inline-flex',
            padding: 8,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}
        >
          {icon}
        </span>
        <span style={mono(palette.label, 0)}>{title}</span>
      </div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {items.map((it) => (
          <li
            key={it}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 15,
              color: '#1E293B',
              fontWeight: isRisk ? 500 : 400,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: palette.dot,
                flexShrink: 0,
              }}
            />
            {it}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── 3. DIAGNOSTIC ───────────────────────────────────────────────────────────
function Diagnosis() {
  const [monthlyLeads, setMonthlyLeads] = useState(150);
  const [avgCommission, setAvgCommission] = useState(8000);
  const [missedPct, setMissedPct] = useState(30);

  const calc = useMemo(() => {
    const ml = Math.max(0, Number(monthlyLeads) || 0);
    const ac = Math.max(0, Number(avgCommission) || 0);
    const mp = Math.min(100, Math.max(0, Number(missedPct) || 0)) / 100;

    const leadsAtRiskMonthly = ml * mp;
    const leadsAtRiskAnnual = leadsAtRiskMonthly * 12;
    const annualRevenueLeakage = leadsAtRiskAnnual * BASELINE_CLOSE_RATE * ac;

    return { leadsAtRiskMonthly, annualRevenueLeakage };
  }, [monthlyLeads, avgCommission, missedPct]);

  return (
    <Section id="calculate" borderTop>
      <div style={{ maxWidth: 840, marginBottom: 56 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Diagnostics</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            margin: '20px 0 24px',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          See where your leads are dying.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 19px)', color: '#475569' }}
        >
          Run the numbers in two minutes. Both tools run locally in your browser — your inputs
          stay with you.
        </motion.p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
          gap: 32,
          alignItems: 'start',
        }}
      >
        {/* Quick Calc Sidebar */}
        <motion.div
          {...fadeUp(0.05)}
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 24,
            padding: 'clamp(28px, 4vw, 40px)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ ...mono('#64748B', 24), fontSize: 13 }}>Quick Revenue Estimate</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <FormField label="Monthly inbound leads" value={monthlyLeads} onChange={setMonthlyLeads} type="number" />
            <FormField label="Avg. commission" value={avgCommission} onChange={setAvgCommission} type="number" prefix="$" />
            <FormField label="Estimated leakage" value={missedPct} onChange={setMissedPct} type="number" suffix="%" />
          </div>

          <div
            style={{
              marginTop: 32,
              padding: 28,
              background: '#fff',
              border: '1px solid #E2E8F0',
              borderRadius: 20,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div style={mono('#DC2626', 12)}>Est. Revenue Leakage</div>
            <div
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(36px, 5vw, 48px)',
                color: '#0F172A',
                lineHeight: 1,
              }}
            >
              {fmtCurrency(calc.annualRevenueLeakage)}
              <span
                style={{
                  fontSize: 16,
                  color: '#94A3B8',
                  fontFamily: "'Inter', sans-serif",
                  marginLeft: 8,
                  fontWeight: 400,
                }}
              >
                /yr
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ToolCard
            title="Lead Leakage Scorecard"
            icon={Gauge}
            desc="Five-minute diagnostic of your first-contact layer. Sub-scores for response, contact, and booking."
            to="/calculators/leakage"
          />
          <ToolCard
            title="Full Revenue Calculator"
            icon={Calculator}
            desc="Conservative estimate of speed-to-lead delay cost. Math shown step-by-step."
            to="/calculators/revenue"
          />
        </div>
      </div>
    </Section>
  );
}

function ToolCard({ title, icon: Icon, desc, to }) {
  return (
    <motion.div
      {...fadeUp(0.1)}
      className="card"
      style={{
        padding: 32,
        borderRadius: 24,
        background: '#fff',
        border: '1px solid #E2E8F0',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: '#F5F3FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Icon size={24} color="#5B3FD4" />
      </div>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: '#0F172A',
          marginBottom: 12,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6, marginBottom: 24 }}>{desc}</p>
      <Link
        to={to}
        className="btn-secondary"
        style={{
          alignSelf: 'flex-start',
          padding: '10px 20px',
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Run tool <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
}

function FormField({ label, value, onChange, type, prefix, suffix }) {
  return (
    <label style={{ display: 'block' }}>
      <span
        style={{
          display: 'block',
          fontSize: 13,
          fontWeight: 600,
          color: '#334155',
          marginBottom: 8,
        }}
      >
        {label}
      </span>
      <div
        style={{
          display: 'flex',
          background: '#fff',
          border: '1px solid #E2E8F0',
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'border-color 0.2s ease',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        {prefix && (
          <span
            style={{
              padding: '12px 16px',
              background: '#F8FAFC',
              color: '#94A3B8',
              fontSize: 14,
              borderRight: '1px solid #E2E8F0',
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            padding: '12px 16px',
            fontSize: 15,
            outline: 'none',
            width: '100%',
            color: '#0F172A',
            fontWeight: 500,
          }}
        />
        {suffix && (
          <span
            style={{
              padding: '12px 16px',
              background: '#F8FAFC',
              color: '#94A3B8',
              fontSize: 14,
              borderLeft: '1px solid #E2E8F0',
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

// ─── 4. PRICING ──────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <Section id="pricing" background="surface" borderTop>
      <div style={{ maxWidth: 840, marginBottom: 64 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Pricing — early access</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            margin: '20px 0 24px',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          Priced against what leakage already costs you.
        </motion.h2>
        <p
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 19px)', color: '#475569', maxWidth: 700 }}
        >
          PAS is priced as infrastructure, not a subscription experiment. We recommend a plan
          based on actual usage and complexity — not a pre-set tier.
        </p>
      </div>

      <motion.div
        {...fadeUp(0.1)}
        style={{
          background: '#fff',
          border: '1px solid #E2E8F0',
          borderRadius: 32,
          padding: 'clamp(40px, 8vw, 80px)',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.04)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, transparent, #5B3FD4, transparent)',
          }}
        />

        <h3
          style={{
            fontSize: 'clamp(24px, 3.5vw, 32px)',
            fontWeight: 600,
            color: '#0F172A',
            marginBottom: 20,
            letterSpacing: '-0.02em',
          }}
        >
          Tailored solutions for every brokerage.
        </h3>
        <p
          style={{
            color: '#475569',
            fontSize: 'clamp(15px, 1.6vw, 17px)',
            lineHeight: 1.7,
            maxWidth: 640,
            margin: '0 auto 40px',
          }}
        >
          Deployment and setup fees vary based on lead volume, integrations, routing complexity,
          and onboarding needs. Contact us for a quote based on your numbers.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href={PAS_LINKS.earlyAccess}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '14px 32px' }}
          >
            Apply for early access <ArrowRight size={18} />
          </a>
          <a href="mailto:hello@orvnlabs.com" className="btn-secondary" style={{ padding: '14px 32px' }}>
            Contact for quote
          </a>
        </div>
      </motion.div>
    </Section>
  );
}

// ─── 5. FAQ ──────────────────────────────────────────────────────────────────
function FAQTeaser() {
  const top = [
    {
      q: 'Is PAS a CRM?',
      a: 'No. PAS is first-contact infrastructure — it works before and around the CRM.',
    },
    {
      q: 'Does PAS replace agents?',
      a: 'No. PAS protects intent before agents enter. Agents still close trust.',
    },
    {
      q: 'Does PAS replace ISAs?',
      a: 'PAS can support or replace parts of the first-touch ISA function depending on workflow.',
    },
    { q: 'Can PAS work after hours?', a: 'Yes. PAS is designed to protect after-hours intent.' },
  ];

  return (
    <Section borderTop>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 24,
          marginBottom: 48,
        }}
      >
        <div style={{ maxWidth: 600 }}>
          <Eyebrow>FAQ</Eyebrow>
          <h2
            className="h-section"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              margin: '20px 0 0',
              letterSpacing: '-0.02em',
            }}
          >
            Common questions.
          </h2>
        </div>
        <Link
          to="/faq"
          className="btn-ghost"
          style={{ fontSize: 15, fontWeight: 600, padding: '10px 0' }}
        >
          All FAQ <ArrowRight size={18} />
        </Link>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {top.map((f, i) => (
          <FAQItem key={f.q} question={f.q} answer={f.a} delay={i * 0.05} />
        ))}
      </div>
    </Section>
  );
}

function FAQItem({ question, answer, delay }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      {...fadeUp(delay)}
      style={{
        borderBottom: '1px solid #F1F5F9',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 0',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          gap: 20,
        }}
      >
        <span
          style={{
            fontSize: 'clamp(16px, 1.8vw, 18px)',
            fontWeight: 600,
            color: '#0F172A',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          style={{ color: '#94A3B8', flexShrink: 0 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <p
          style={{
            fontSize: 16,
            color: '#475569',
            lineHeight: 1.7,
            paddingBottom: 24,
            margin: 0,
            maxWidth: 720,
          }}
        >
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── 6. FINAL CTA ────────────────────────────────────────────────────────────
function FinalCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'home_cta_waitlist' }),
      });
      if (!res.ok) throw new Error('Failed to join waitlist');
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Section borderTop>
        <div
          style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: 24,
            padding: 48,
            textAlign: 'center',
          }}
        >
          <CheckCircle2 size={40} color="#0D9E6E" style={{ margin: '0 auto 20px' }} />
          <h3
            style={{
              color: '#065F46',
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}
          >
            We've got it.
          </h3>
          <p style={{ color: '#065F46', fontSize: 16, margin: '8px 0 0' }}>
            You're on the waitlist. We'll reach out within one business day.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section background="surface" borderTop>
      <div
        style={{
          background: '#5B3FD4',
          borderRadius: 40,
          padding: 'clamp(60px, 10vw, 120px) clamp(24px, 5vw, 48px)',
          color: '#fff',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 30px 60px -12px rgba(91, 63, 212, 0.25)',
        }}
      >
        {/* Subtle decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '40%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.h2
            {...fadeUp(0)}
            className="h-section"
            style={{
              color: '#fff',
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              margin: '0 0 24px',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Stop guessing where your leads die.
          </motion.h2>
          <motion.p
            {...fadeUp(0.05)}
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 'clamp(17px, 2vw, 20px)',
              lineHeight: 1.6,
              margin: '0 auto 48px',
              maxWidth: 640,
            }}
          >
            Early access is limited. Join the waitlist to secure your brokerage's spot in our next
            cohort.
          </motion.p>

          <motion.form
            {...fadeUp(0.1)}
            onSubmit={submit}
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: 540,
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              required
              placeholder="your@brokerage.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: '1 1 300px',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 14,
                padding: '16px 24px',
                fontSize: 16,
                color: '#fff',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary"
              style={{
                background: '#fff',
                color: '#5B3FD4',
                padding: '16px 32px',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'} <ArrowRight size={18} />
            </button>
          </motion.form>
          {status === 'error' && (
            <p style={{ color: '#FFB2B2', fontSize: 14, marginTop: 16, fontWeight: 500 }}>
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────
export default function Home() {
  useDocumentMeta({ path: '/' });
  return (
    <PageWrapper>
      <Hero />
      <Problem />
      <Diagnosis />
      <PricingSection />

      {/* Tighter "Experience" Grouping via Navigation */}
      <Section borderTop background="surface">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          <LinkCard
            eyebrow="Systems & Proof"
            title="Explore PAS in detail"
            desc="Workflows, capabilities, and open source proof. See the technical layer behind the staff."
            to="/pas"
            cta="Explore systems"
          />
          <LinkCard
            eyebrow="Thesis & Insights"
            title="First-Contact Intelligence"
            desc="The philosophy, the founder's story, and field notes on lead conversion for operators."
            to="/thesis"
            cta="Read thesis"
          />
        </div>
      </Section>

      <FAQTeaser />
      <FinalCTA />
    </PageWrapper>
  );
}

function LinkCard({ eyebrow, title, desc, to, cta }) {
  return (
    <Link to={to} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.div
        {...fadeUp(0.05)}
        className="card"
        style={{
          padding: 'clamp(32px, 5vw, 48px)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 24,
          background: '#fff',
          border: '1px solid #E2E8F0',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        <span style={mono('#5B3FD4', 16)}>{eyebrow}</span>
        <h3
          style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)',
            fontWeight: 600,
            color: '#0F172A',
            marginBottom: 16,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 16,
            color: '#475569',
            lineHeight: 1.65,
            marginBottom: 28,
            flex: 1,
          }}
        >
          {desc}
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: '#5B3FD4',
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          {cta} <ArrowRight size={18} />
        </div>
      </motion.div>
    </Link>
  );
}

function mono(color = '#94A3B8', marginBottom = 0) {
  return {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color,
    fontWeight: 600,
    marginBottom,
  };
}