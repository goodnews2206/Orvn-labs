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
        paddingTop: 'clamp(64px, 9vw, 112px)',
        paddingBottom: 'clamp(48px, 7vw, 80px)',
      }}
    >
      <div
        className="container-page"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 'clamp(40px, 6vw, 64px)',
        }}
      >
        <div style={{ maxWidth: 800 }}>
          <motion.div {...fadeUp(0)}>
            <span className="pill" style={{ marginBottom: 22 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0D9E6E' }} />
              ORVN Labs · real estate brokerage infrastructure
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.05)}
            className="h-display"
            style={{ fontSize: 'clamp(40px, 6.4vw, 76px)', marginBottom: 22 }}
          >
            Control the first-contact layer{' '}
            <span style={{ color: '#5B3FD4' }}>before delay kills conversion.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            className="lead"
            style={{ maxWidth: 640, marginBottom: 30 }}
          >
            ORVN Labs builds brokerage intelligence infrastructure.{' '}
            <strong style={{ color: '#0F172A' }}>PAS</strong>, our flagship system, answers,
            qualifies, routes, books, and logs inbound leads — before human delay turns intent
            cold.
          </motion.p>

          <motion.div
            {...fadeUp(0.15)}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}
          >
            <Link to="/#calculate" className="btn-primary">
              Run your lead leakage score <ArrowRight size={16} />
            </Link>
            <Link to="/pas" className="btn-secondary">Explore PAS</Link>
          </motion.div>

          <motion.p {...fadeUp(0.2)} style={{ fontSize: 13, color: '#94A3B8', maxWidth: 600 }}>
            Built for brokerage owners, team leads, and operators who cannot afford CRM graveyards.
          </motion.p>
        </div>

        <motion.div {...fadeUp(0.25)}>
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
      <div style={{ maxWidth: 760, marginBottom: 36 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>The problem</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 48px)', margin: '14px 0 16px' }}>
          Most brokerages are measuring the wrong failure.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          The gap between inquiry and qualified appointment is usually where money dies — and it
          rarely shows up in the report you’re looking at.
        </motion.p>
      </div>

      <motion.div
        {...fadeUp(0.05)}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 14,
          marginBottom: 28,
        }}
      >
        <CompareColumn
          icon={<Eye size={16} />}
          tone="neutral"
          title="What gets measured"
          items={['Lead volume', 'Lead spend', 'Closed deals', 'Agent count']}
        />
        <CompareColumn
          icon={<EyeOff size={16} />}
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
      </motion.div>

      <motion.div
        {...fadeUp(0.1)}
        style={{
          background: '#fff',
          border: '1px solid #E5E8F0',
          borderRadius: 16,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: '#F7F8FB',
            borderBottom: '1px solid #E5E8F0',
          }}
        >
          <div style={{ padding: '14px 22px' }}>
            <span style={mono('#94A3B8')}>What brokerages blame</span>
          </div>
          <div style={{ padding: '14px 22px', borderLeft: '1px solid #E5E8F0' }}>
            <span style={mono('#5B3FD4')}>What actually killed conversion</span>
          </div>
        </div>
        {blameVsReality.map((row) => (
          <div
            key={row.blame}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderBottom: '1px solid #F1F3F9',
            }}
          >
            <div style={{ padding: '14px 22px', color: '#94A3B8', fontSize: 14, textDecoration: 'line-through' }}>
              {row.blame}
            </div>
            <div
              style={{
                padding: '14px 22px',
                color: '#0F172A',
                fontSize: 14,
                fontWeight: 500,
                borderLeft: '1px solid #F1F3F9',
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
  const palette =
    tone === 'risk'
      ? { border: '#FECACA', label: '#DC2626', dot: '#DC2626' }
      : { border: '#E5E8F0', label: '#475569', dot: '#94A3B8' };
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${palette.border}`,
        borderRadius: 14,
        padding: 24,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ color: palette.label, display: 'inline-flex' }}>{icon}</span>
        <span style={mono(palette.label)}>{title}</span>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it) => (
          <li key={it} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#0F172A' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: palette.dot, flexShrink: 0 }} />
            {it}
          </li>
        ))}
      </ul>
    </div>
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
      <div style={{ maxWidth: 760, marginBottom: 32 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Diagnostics</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 48px)', margin: '14px 0 16px' }}>
          See where your leads are dying.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          Run the numbers in two minutes. Both tools run locally in your browser — your inputs
          stay with you.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {/* Quick Calc */}
        <motion.div
          {...fadeUp(0.05)}
          style={{
            background: '#F7F8FB',
            border: '1px solid #E5E8F0',
            borderRadius: 16,
            padding: 'clamp(24px, 3vw, 32px)',
          }}
        >
          <div style={mono('#94A3B8', 16)}>Quick Revenue Estimate</div>
          <FormField label="Monthly inbound leads" value={monthlyLeads} onChange={setMonthlyLeads} type="number" />
          <FormField label="Avg. commission" value={avgCommission} onChange={setAvgCommission} type="number" prefix="$" />
          <FormField label="Estimated leakage" value={missedPct} onChange={setMissedPct} type="number" suffix="%" />

          <div style={{ marginTop: 24, padding: 16, background: '#fff', border: '1px solid #E5E8F0', borderRadius: 12 }}>
            <div style={mono('#DC2626', 4)}>Est. Revenue Leakage</div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: '#0F172A' }}>
              {fmtCurrency(calc.annualRevenueLeakage)} <span style={{ fontSize: 14, color: '#94A3B8', fontFamily: 'Inter' }}>/yr</span>
            </div>
          </div>
        </motion.div>

        {/* Full Tools Teaser */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
      style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      <Icon size={24} color="#5B3FD4" style={{ marginBottom: 12 }} />
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0F172A', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{desc}</p>
      <Link to={to} className="btn-secondary" style={{ alignSelf: 'flex-start' }}>Run tool <ArrowRight size={14} /></Link>
    </motion.div>
  );
}

function FormField({ label, value, onChange, type, prefix, suffix }) {
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>{label}</span>
      <div style={{ display: 'flex', background: '#fff', border: '1px solid #E5E8F0', borderRadius: 8, overflow: 'hidden' }}>
        {prefix && <span style={{ padding: '8px 12px', background: '#F1F3F9', color: '#94A3B8', fontSize: 13 }}>{prefix}</span>}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ flex: 1, border: 'none', padding: '8px 12px', fontSize: 14, outline: 'none', width: '100%' }}
        />
        {suffix && <span style={{ padding: '8px 12px', background: '#F1F3F9', color: '#94A3B8', fontSize: 13 }}>{suffix}</span>}
      </div>
    </label>
  );
}

// ─── 4. PRICING ──────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <Section id="pricing" background="surface" borderTop>
      <div style={{ maxWidth: 760, marginBottom: 32 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Pricing — early access</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 48px)', margin: '14px 0 16px' }}>
          Priced against what leakage already costs you.
        </motion.h2>
        <p className="lead">
          PAS is priced as infrastructure, not a subscription experiment. We recommend a plan
          based on actual usage and complexity — not a pre-set tier.
        </p>
      </div>

      <motion.div
        {...fadeUp(0.1)}
        style={{
          background: '#fff',
          border: '1px solid #E5E8F0',
          borderRadius: 20,
          padding: 'clamp(32px, 5vw, 48px)',
          textAlign: 'center',
          boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 12px 28px rgba(15,23,42,0.06)',
        }}
      >
        <h3 style={{ fontSize: 26, fontWeight: 600, color: '#0F172A', marginBottom: 12 }}>
          Tailored solutions for every brokerage.
        </h3>
        <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.7, maxWidth: 600, margin: '0 auto 28px' }}>
          Deployment and setup fees vary based on lead volume, integrations, routing complexity,
          and onboarding needs. Contact us for a quote based on your numbers.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href={PAS_LINKS.earlyAccess} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Apply for early access <ArrowRight size={15} />
          </a>
          <a href="mailto:hello@orvnlabs.com" className="btn-secondary">
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
    { q: 'Is PAS a CRM?', a: 'No. PAS is first-contact infrastructure — it works before and around the CRM.' },
    { q: 'Does PAS replace agents?', a: 'No. PAS protects intent before agents enter. Agents still close trust.' },
    { q: 'Does PAS replace ISAs?', a: 'PAS can support or replace parts of the first-touch ISA function depending on workflow.' },
    { q: 'Can PAS work after hours?', a: 'Yes. PAS is designed to protect after-hours intent.' },
  ];
  return (
    <Section borderTop>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="h-section" style={{ fontSize: 'clamp(28px, 3.8vw, 42px)', margin: '14px 0 0' }}>
            Common questions.
          </h2>
        </div>
        <Link to="/faq" className="btn-ghost">All FAQ <ArrowRight size={15} /></Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        {top.map((f, i) => (
          <motion.div
            key={f.q}
            {...fadeUp(0.05 * i)}
            style={{ background: '#fff', border: '1px solid #E5E8F0', borderRadius: 12, padding: 22 }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: '0 0 8px', fontFamily: "'Inter', sans-serif" }}>
              {f.q}
            </h3>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, margin: 0 }}>{f.a}</p>
          </motion.div>
        ))}
      </div>
    </Section>
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
        <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 14, padding: 32, textAlign: 'center' }}>
          <CheckCircle2 size={32} color="#0D9E6E" style={{ margin: '0 auto 14px' }} />
          <h3 style={{ color: '#065F46', fontSize: 20, fontWeight: 600 }}>We've got it.</h3>
          <p style={{ color: '#065F46', fontSize: 15, margin: 0 }}>You're on the waitlist. We'll reach out within one business day.</p>
        </div>
      </Section>
    );
  }

  return (
    <Section background="surface" borderTop>
      <div
        style={{
          background: '#5B3FD4',
          borderRadius: 24,
          padding: 'clamp(40px, 6vw, 80px)',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.h2 {...fadeUp(0)} className="h-section" style={{ color: '#fff', fontSize: 'clamp(32px, 4.5vw, 56px)', margin: '0 0 16px' }}>
            Stop guessing where your leads die.
          </motion.h2>
          <motion.p {...fadeUp(0.05)} style={{ color: 'rgba(255,255,255,0.78)', fontSize: 17, lineHeight: 1.65, margin: '0 0 32px' }}>
            Early access is limited. Join the waitlist to secure your brokerage's spot in our next cohort.
          </motion.p>

          <motion.form
            {...fadeUp(0.1)}
            onSubmit={submit}
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: 500,
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
                flex: '1 1 260px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 12,
                padding: '14px 18px',
                fontSize: 16,
                color: '#fff',
                outline: 'none',
              }}
            />
            <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ background: '#fff', color: '#5B3FD4' }}>
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'} <ArrowRight size={16} />
            </button>
          </motion.form>
          {status === 'error' && <p style={{ color: '#FF9999', fontSize: 13, marginTop: 12 }}>Something went wrong. Please try again.</p>}
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
        style={{ padding: 32, height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <span style={mono('#5B3FD4', 12)}>{eyebrow}</span>
        <h3 style={{ fontSize: 24, fontWeight: 600, color: '#0F172A', marginBottom: 12 }}>{title}</h3>
        <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.65, marginBottom: 20, flex: 1 }}>{desc}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#5B3FD4', fontWeight: 600, fontSize: 14 }}>
          {cta} <ArrowRight size={16} />
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
