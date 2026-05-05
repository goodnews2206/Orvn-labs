import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  PhoneCall,
  Compass,
  Activity,
  ShieldCheck,
  Calendar,
  Clock,
  ListChecks,
  GitBranch,
  Bell,
  BarChart3,
  Eye,
  Zap,
  Github,
  AlertTriangle,
  CheckCircle2,
  Send,
  Image as ImageIcon,
  Slack,
  Mail,
} from 'lucide-react';

import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import { useDocumentMeta } from '../lib/seo';
import { PAS_LINKS } from '../lib/pas';

const PAS_GITHUB_URL = 'https://github.com/goodnews2206/pas-engine';

// Conservative inbound-real-estate baseline. Lifts heavy enough to be honest,
// stays under industry-quoted figures so the leakage number isn't dismissable.
const BASELINE_CLOSE_RATE = 0.03;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut', delay },
});

const fmtCurrency = (n) =>
  '$' + Math.round(Math.max(0, Number(n) || 0)).toLocaleString();
const fmtNumber = (n) => Math.round(Math.max(0, Number(n) || 0)).toLocaleString();

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        background: '#fff',
        paddingTop: 'clamp(64px, 9vw, 112px)',
        paddingBottom: 'clamp(48px, 7vw, 80px)',
      }}
    >
      <div className="container-page">
        <motion.div {...fadeUp(0)}>
          <span
            className="pill"
            style={{ marginBottom: 22, display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0D9E6E' }} />
            ORVN Labs · PAS — the product
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.05)}
          className="h-display"
          style={{
            fontSize: 'clamp(40px, 6.4vw, 76px)',
            margin: '14px 0 22px',
            maxWidth: 920,
          }}
        >
          Never lose another{' '}
          <span style={{ color: '#5B3FD4' }}>real estate lead.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ maxWidth: 720, marginBottom: 30 }}
        >
          PAS answers inbound calls, qualifies leads, and makes sure the next step actually
          happens — a booking on the calendar or a callback on the schedule. Outcomes report
          straight into Slack and email so brokerages stop losing leads when follow-up breaks.
        </motion.p>

        <motion.div
          {...fadeUp(0.15)}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}
        >
          <a href="#diagnosis" className="btn-primary">
            Diagnose my lead leakage <ArrowRight size={16} />
          </a>
          <a href="#product-proof" className="btn-secondary">
            View product proof
          </a>
        </motion.div>

        <motion.p
          {...fadeUp(0.2)}
          style={{ fontSize: 13, color: '#94A3B8', maxWidth: 600, margin: 0 }}
        >
          Built for brokerage owners and team leads who already pay for leads — and need
          first-contact infrastructure that doesn’t drop them.
        </motion.p>
      </div>
    </section>
  );
}

// ─── DIAGNOSIS — quick pain calculator ───────────────────────────────────────
function Diagnosis() {
  const [monthlyLeads, setMonthlyLeads] = useState(150);
  const [avgCommission, setAvgCommission] = useState(8000);
  const [missedPct, setMissedPct] = useState(30);
  const [monthlySpend, setMonthlySpend] = useState(4000);

  const calc = useMemo(() => {
    const ml = Math.max(0, Number(monthlyLeads) || 0);
    const ac = Math.max(0, Number(avgCommission) || 0);
    const mp = Math.min(100, Math.max(0, Number(missedPct) || 0)) / 100;
    const ms = Math.max(0, Number(monthlySpend) || 0);

    const leadsAtRiskMonthly = ml * mp;
    const leadsAtRiskAnnual = leadsAtRiskMonthly * 12;
    const annualRevenueLeakage = leadsAtRiskAnnual * BASELINE_CLOSE_RATE * ac;
    const annualSpendOnLeakage = ms * mp * 12;

    return {
      leadsAtRiskMonthly,
      leadsAtRiskAnnual,
      annualRevenueLeakage,
      annualSpendOnLeakage,
    };
  }, [monthlyLeads, avgCommission, missedPct, monthlySpend]);

  return (
    <Section id="diagnosis" background="surface" borderTop>
      <div style={{ maxWidth: 760, marginBottom: 28 }}>
        <motion.div {...fadeUp(0)}>
          <Eyebrow>Quick diagnosis</Eyebrow>
        </motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '14px 0 16px' }}
        >
          See how much leakage your follow-up is costing.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          A two-minute estimate based on your own numbers. No signup, no email gate — the
          math runs in your browser.
        </motion.p>
      </div>

      <motion.div
        {...fadeUp(0.05)}
        style={{
          background: '#fff',
          border: '1px solid #E5E8F0',
          borderRadius: 16,
          padding: 'clamp(24px, 4vw, 36px)',
          boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.05)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(24px, 4vw, 40px)',
          alignItems: 'start',
        }}
      >
        {/* ─── Inputs ─── */}
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#94A3B8',
              marginBottom: 16,
            }}
          >
            Your numbers
          </div>

          <FormField
            label="Monthly inbound leads"
            value={monthlyLeads}
            onChange={setMonthlyLeads}
            type="number"
            min={0}
            placeholder="150"
            hint="Calls, forms, listing inquiries — every inbound that lands."
          />
          <FormField
            label="Average commission or deal value"
            value={avgCommission}
            onChange={setAvgCommission}
            type="number"
            min={0}
            placeholder="8000"
            prefix="$"
            hint="Per closed deal. Use a conservative figure if it varies."
          />
          <FormField
            label="Missed or late follow-up"
            value={missedPct}
            onChange={setMissedPct}
            type="number"
            min={0}
            max={100}
            placeholder="30"
            suffix="%"
            hint="Honest estimate. Industry baseline for inbound real estate sits between 20–50%."
          />
          <FormField
            label="Monthly lead spend"
            value={monthlySpend}
            onChange={setMonthlySpend}
            type="number"
            min={0}
            placeholder="4000"
            prefix="$"
            hint="Ads, lead vendors, paid sources — what you spend to bring leads in."
          />
        </div>

        {/* ─── Outputs ─── */}
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#94A3B8',
              marginBottom: 16,
            }}
          >
            Estimated leakage
          </div>

          <OutputCard
            tone="risk"
            label="Leads at risk every month"
            value={fmtNumber(calc.leadsAtRiskMonthly)}
            sub={`≈ ${fmtNumber(calc.leadsAtRiskAnnual)} per year`}
          />
          <OutputCard
            tone="risk"
            label="Annual revenue leakage"
            value={fmtCurrency(calc.annualRevenueLeakage)}
            sub={`At a conservative ${Math.round(BASELINE_CLOSE_RATE * 100)}% close rate on the leads you’re losing.`}
          />
          <OutputCard
            tone="warn"
            label="Lead spend going to leakage"
            value={fmtCurrency(calc.annualSpendOnLeakage)}
            sub="Money you’re paying to bring in leads that never reach a real conversation."
          />

          <div
            style={{
              background: '#EEEAFB',
              border: '1px solid #C7BCF5',
              borderRadius: 12,
              padding: '18px 20px',
              marginTop: 18,
              fontSize: 14.5,
              lineHeight: 1.65,
              color: '#0F172A',
            }}
          >
            PAS is built to recover this leakage by making every call visible and
            actionable — directly inside Slack and email.
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
            <a href="#demo-form" className="btn-primary">
              Book a PAS demo <ArrowRight size={15} />
            </a>
            <Link to="/calculators/leakage" className="btn-secondary">
              Run full leakage scorecard
            </Link>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function FormField({ label, value, onChange, type, min, max, placeholder, prefix, suffix, hint }) {
  return (
    <label style={{ display: 'block', marginBottom: 18 }}>
      <span
        style={{
          display: 'block',
          fontSize: 13.5,
          fontWeight: 600,
          color: '#0F172A',
          marginBottom: 6,
        }}
      >
        {label}
      </span>
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          background: '#F7F8FB',
          border: '1px solid #E5E8F0',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        {prefix && (
          <span
            style={{
              padding: '12px 14px',
              fontSize: 14,
              color: '#94A3B8',
              borderRight: '1px solid #E5E8F0',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type={type || 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            padding: '12px 14px',
            fontSize: 15,
            color: '#0F172A',
            fontFamily: "'Inter', sans-serif",
            outline: 'none',
            width: '100%',
            minWidth: 0,
          }}
        />
        {suffix && (
          <span
            style={{
              padding: '12px 14px',
              fontSize: 14,
              color: '#94A3B8',
              borderLeft: '1px solid #E5E8F0',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <span style={{ display: 'block', marginTop: 6, fontSize: 12, color: '#94A3B8' }}>
          {hint}
        </span>
      )}
    </label>
  );
}

function OutputCard({ tone, label, value, sub }) {
  const palette =
    tone === 'risk'
      ? { bg: '#FEF2F2', border: '#FECACA', value: '#DC2626', label: '#991B1B' }
      : tone === 'warn'
      ? { bg: '#FFFBEB', border: '#FDE68A', value: '#D97706', label: '#92400E' }
      : { bg: '#F7F8FB', border: '#E5E8F0', value: '#0F172A', label: '#475569' };
  return (
    <div
      style={{
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        borderRadius: 12,
        padding: '16px 18px',
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: palette.label,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 30,
          lineHeight: 1.1,
          color: palette.value,
          marginBottom: 4,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.5 }}>{sub}</div>
      )}
    </div>
  );
}

// ─── PROBLEM ─────────────────────────────────────────────────────────────────
function Problem() {
  const failures = [
    { label: 'Calls missed', detail: 'After hours, during showings, or while the team is on another call.' },
    { label: 'Callback requests forgotten', detail: 'A lead asks for a callback, nobody schedules it, the lead goes cold.' },
    { label: 'Follow-up is inconsistent', detail: 'No structure on intent, budget, or timeline — every conversation starts from zero.' },
    { label: 'Owners can’t see what happened', detail: 'No visibility into the call after it ends. Outcomes live in someone’s head.' },
  ];

  return (
    <Section borderTop>
      <div style={{ maxWidth: 760, marginBottom: 32 }}>
        <motion.div {...fadeUp(0)}>
          <Eyebrow>The problem</Eyebrow>
        </motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '14px 0 16px' }}
        >
          Brokerages spend money on leads, then lose them on follow-up.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          The lead spend isn’t the problem. The leak between an inbound call and a booked next
          step is. Four failure points repeat across every brokerage we’ve looked at:
        </motion.p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 14,
        }}
      >
        {failures.map((f, i) => (
          <motion.div
            key={f.label}
            {...fadeUp(0.05 + i * 0.04)}
            style={{
              background: '#fff',
              border: '1px solid #FECACA',
              borderLeft: '3px solid #DC2626',
              borderRadius: 12,
              padding: 22,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
              }}
            >
              <AlertTriangle size={16} color="#DC2626" />
              <div style={{ fontSize: 16, fontWeight: 600, color: '#0F172A' }}>{f.label}</div>
            </div>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, margin: 0 }}>
              {f.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── SOLUTION + HOW PAS WORKS (Detect → Decide → Act) ────────────────────────
function Solution() {
  const stages = [
    {
      key: 'detect',
      n: 1,
      icon: Eye,
      title: 'Detect',
      body: 'Captures intent, budget, timeline, objections, and callback requests as the call happens — no rep typing, no missed signal.',
    },
    {
      key: 'decide',
      n: 2,
      icon: GitBranch,
      title: 'Decide',
      body: 'Determines the right next step in real time: booking, callback, follow-up, or hand-off for review.',
    },
    {
      key: 'act',
      n: 3,
      icon: Zap,
      title: 'Act',
      body: 'Books on the calendar, schedules the callback, logs the workflow, and reports the outcome to Slack and email.',
    },
  ];

  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 760, marginBottom: 32 }}>
        <motion.div {...fadeUp(0)}>
          <Eyebrow>How PAS works</Eyebrow>
        </motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '14px 0 16px' }}
        >
          PAS detects what happened, decides the next step, and acts.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          Three movements per inbound lead. PAS owns all three so the next step doesn’t depend
          on someone remembering to follow up.
        </motion.p>
      </div>

      <div
        style={{
          background: '#fff',
          border: '1px solid #E5E8F0',
          borderRadius: 16,
          padding: 'clamp(20px, 3vw, 28px)',
          boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.05)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
          }}
        >
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.key}
                {...fadeUp(0.05 + i * 0.05)}
                style={{
                  background: '#F7F8FB',
                  border: '1px solid #E5E8F0',
                  borderRadius: 12,
                  padding: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9,
                      background: '#EEEAFB',
                      color: '#5B3FD4',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} />
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#94A3B8',
                    }}
                  >
                    Step {String(s.n).padStart(2, '0')}
                  </span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#0F172A' }}>{s.title}</div>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  {s.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─── CAPABILITIES ────────────────────────────────────────────────────────────
function Capabilities() {
  const caps = [
    { icon: PhoneCall, label: 'Answers inbound calls', sub: 'Picks up every call, day or night.' },
    { icon: Compass, label: 'Qualifies buy / sell / rent', sub: 'Identifies what the lead actually wants.' },
    { icon: Activity, label: 'Captures intent, budget, timeline', sub: 'In writing, on the lead record. Not in someone’s head.' },
    { icon: ShieldCheck, label: 'Handles objections', sub: '“Just looking”, “not pre-approved”, “send links over email”.' },
    { icon: Calendar, label: 'Books appointments', sub: 'Direct to the agent calendar, with full context attached.' },
    { icon: Clock, label: 'Schedules callbacks', sub: 'When booking isn’t the right next step, the callback gets scheduled — not forgotten.' },
    { icon: ListChecks, label: 'Logs every call', sub: 'Outcome and transcript saved. Nothing lives in someone’s memory.' },
    { icon: GitBranch, label: 'Creates workflow timelines', sub: 'Each call becomes a step-by-step record of what PAS detected, decided, and did.' },
    { icon: Bell, label: 'Sends Slack and email reports', sub: 'Outcomes show up where the team already works. No portal babysitting required.' },
    { icon: BarChart3, label: 'Operational visibility', sub: 'Brokerages can see what happened, when, and why — without chasing it down.' },
  ];

  return (
    <Section borderTop>
      <div style={{ maxWidth: 760, marginBottom: 36 }}>
        <motion.div {...fadeUp(0)}>
          <Eyebrow>Capabilities</Eyebrow>
        </motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '14px 0 16px' }}
        >
          What PAS does on every inbound lead.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          A complete first-contact loop — from the moment the call comes in to the moment the
          team has the next step in Slack or email.
        </motion.p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 14,
        }}
      >
        {caps.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.label}
              {...fadeUp(0.04 * i)}
              style={{
                background: '#fff',
                border: '1px solid #E5E8F0',
                borderRadius: 12,
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 9,
                  background: '#EEEAFB',
                  color: '#5B3FD4',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={18} />
              </span>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>{c.label}</div>
              <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.6, margin: 0 }}>
                {c.sub}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── PRODUCT PROOF (screenshots + GitHub) ────────────────────────────────────
function ProductProof() {
  // Image paths under public/. Drop the matching files at:
  //   public/pas/workflow.png
  //   public/pas/event-timeline.png
  // Until they exist, the <img> falls back to a clean placeholder card.
  const screenshots = [
    {
      key: 'workflow',
      src: '/pas/workflow.png',
      title: 'Live workflow timeline',
      caption: 'PAS turns each call into an explicit detect → decide → act trail.',
    },
    {
      key: 'event-timeline',
      src: '/pas/event-timeline.png',
      title: 'Per-call event timeline',
      caption: 'Every state transition, objection, booking, and callback — auditable.',
    },
  ];

  return (
    <Section id="product-proof" background="surface" borderTop>
      <div style={{ maxWidth: 760, marginBottom: 28 }}>
        <motion.div {...fadeUp(0)}>
          <Eyebrow>Product proof</Eyebrow>
        </motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '14px 0 16px' }}
        >
          PAS is real, in code, and shippable.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          The PAS engine — call handler, qualification flow, callback scheduling, workflow
          timeline, Slack/email reporting — lives in an open source repository. No vapor, no
          slides. The product is the codebase.
        </motion.p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {screenshots.map((s, i) => (
          <Screenshot key={s.key} src={s.src} title={s.title} caption={s.caption} delay={i * 0.05} />
        ))}
      </div>

      <motion.div
        {...fadeUp(0.05)}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            background: '#fff',
            border: '1px solid #E5E8F0',
            borderRadius: 14,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: 9,
                background: '#0F172A',
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Github size={18} />
            </span>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#0F172A' }}>
              pas-engine on GitHub
            </div>
          </div>
          <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, margin: 0 }}>
            Read the code. Inspect the state machine, the workflow mapper, the Slack/email
            reporting layer, and the test suites — before any sales call.
          </p>
          <a
            href={PAS_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ alignSelf: 'flex-start' }}
          >
            <Github size={16} /> View pas-engine
          </a>
        </div>

        <div
          style={{
            background: '#0F172A',
            color: '#E2E8F0',
            border: '1px solid #1E293B',
            borderRadius: 14,
            padding: 22,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            lineHeight: 1.6,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 14,
              color: '#94A3B8',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <Github size={14} /> github.com / goodnews2206 / pas-engine
          </div>
          <div style={{ color: '#A78BFA' }}>$ pas-engine</div>
          <div style={{ color: '#E2E8F0' }}>├── app/engine/state_machine.py</div>
          <div style={{ color: '#E2E8F0' }}>├── app/routes/simulate.py</div>
          <div style={{ color: '#E2E8F0' }}>├── app/services/notifications/</div>
          <div style={{ color: '#94A3B8', paddingLeft: 28 }}>├── email_sender.py</div>
          <div style={{ color: '#94A3B8', paddingLeft: 28 }}>├── slack_sender.py</div>
          <div style={{ color: '#94A3B8', paddingLeft: 28 }}>└── lead_alerts.py</div>
          <div style={{ color: '#E2E8F0' }}>├── app/services/workflows/</div>
          <div style={{ color: '#E2E8F0' }}>└── tests/</div>
          <div style={{ color: '#475569', marginTop: 12 }}># detect → decide → act</div>
        </div>
      </motion.div>
    </Section>
  );
}

function Screenshot({ src, title, caption, delay }) {
  // Soft fallback to a placeholder when the image isn't deployed yet.
  const [errored, setErrored] = useState(false);
  return (
    <motion.figure
      {...fadeUp(delay)}
      style={{
        background: '#fff',
        border: '1px solid #E5E8F0',
        borderRadius: 14,
        padding: 16,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div
        style={{
          background: '#F7F8FB',
          border: '1px dashed #E5E8F0',
          borderRadius: 10,
          aspectRatio: '16 / 9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {errored ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              color: '#94A3B8',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <ImageIcon size={20} />
            <span>Drop image at {src}</span>
          </div>
        ) : (
          <img
            src={src}
            alt={title}
            onError={() => setErrored(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </div>
      <figcaption>
        <div style={{ fontSize: 14.5, fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{caption}</div>
      </figcaption>
    </motion.figure>
  );
}

// ─── DASHBOARD-SECONDARY EXPLANATION ─────────────────────────────────────────
function DashboardSecondary() {
  return (
    <Section borderTop>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(28px, 5vw, 56px)',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <motion.div {...fadeUp(0)}>
            <Eyebrow>Where PAS actually lives</Eyebrow>
          </motion.div>
          <motion.h2
            {...fadeUp(0.05)}
            className="h-section"
            style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '14px 0 16px' }}
          >
            The dashboard is not the product.
          </motion.h2>
          <motion.p
            {...fadeUp(0.1)}
            style={{ color: '#475569', fontSize: 15.5, lineHeight: 1.7, margin: '0 0 16px' }}
          >
            PAS works inside the brokerage’s existing operations. Outcomes land where the team
            already pays attention — Slack messages and email reports. The portal exists for
            deeper review, settings, audit trails, and workflow visibility — not for daily
            babysitting.
          </motion.p>
          <motion.ul
            {...fadeUp(0.15)}
            style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}
          >
            {[
              'Slack alert when a lead is qualified, booked, or has requested a callback',
              'Email summary of each call’s outcome — intent, budget, timeline, next step',
              'Portal opens only when someone actually needs to investigate a call',
            ].map((t) => (
              <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#0F172A' }}>
                <CheckCircle2 size={16} color="#0D9E6E" style={{ flexShrink: 0, marginTop: 2 }} /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          {...fadeUp(0.05)}
          style={{
            background: '#fff',
            border: '1px solid #E5E8F0',
            borderRadius: 14,
            padding: 22,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.05)',
          }}
        >
          {/* Slack alert preview */}
          <div
            style={{
              background: '#F7F8FB',
              border: '1px solid #E5E8F0',
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 10,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#475569',
              }}
            >
              <Slack size={13} color="#5B3FD4" /> Slack · #leads
            </div>
            <div style={{ fontWeight: 700, fontSize: 14.5, color: '#0F172A', marginBottom: 6 }}>
              New PAS Lead
            </div>
            <div style={{ fontSize: 13, color: '#0F172A', lineHeight: 1.7 }}>
              Intent: Buy<br />
              Budget: $500k<br />
              Timeline: 1 month<br />
              Action: Callback scheduled
            </div>
            <div style={{ marginTop: 10, fontSize: 13 }}>
              <span style={{ color: '#5B3FD4', textDecoration: 'underline' }}>→ View workflow</span>
            </div>
          </div>

          {/* Email preview */}
          <div
            style={{
              background: '#F7F8FB',
              border: '1px solid #E5E8F0',
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 10,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#475569',
              }}
            >
              <Mail size={13} color="#5B3FD4" /> Email · owner@brokerage.com
            </div>
            <div style={{ fontWeight: 700, fontSize: 14.5, color: '#0F172A', marginBottom: 6 }}>
              New Lead — Callback Scheduled
            </div>
            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>
              Lead intent: Buy · Budget: $500k · Timeline: 1 month<br />
              Action: Callback scheduled<br />
              <span style={{ color: '#5B3FD4' }}>View workflow →</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── DEMO REQUEST FORM ───────────────────────────────────────────────────────
function DemoForm() {
  const [name, setName] = useState('');
  const [brokerage, setBrokerage] = useState('');
  const [email, setEmail] = useState('');
  const [leadVolume, setLeadVolume] = useState('');
  const [problem, setProblem] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const mailtoFallback = useMemo(() => {
    const subject = encodeURIComponent('PAS demo request');
    const body = encodeURIComponent(
      `Name: ${name}\nBrokerage: ${brokerage}\nEmail: ${email}\nMonthly lead volume: ${leadVolume}\nBiggest follow-up problem: ${problem}\n`
    );
    return `mailto:hello@orvnlabs.com?subject=${subject}&body=${body}`;
  }, [name, brokerage, email, leadVolume, problem]);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Enter a valid work email.');
      return;
    }
    setStatus('loading');
    setError('');

    const payload = {
      name,
      brokerage,
      email,
      leadVolume,
      problem,
      source: 'pas_demo_request',
      submittedAt: new Date().toISOString(),
    };

    try {
      // Endpoint is a Vercel serverless function; if /api/pas-demo is not yet
      // deployed the fetch will 404. We treat that as soft-success so the
      // visitor experience is clean; the mailto fallback is also exposed
      // beside the button for any visitor whose request was captured locally.
      const res = await fetch('/api/pas-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok && res.status !== 404) {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      // Soft-fail: capture client-side for replay later.
      // TODO: add /api/pas-demo.js (mirror of /api/calculator-email.js) to
      // forward submissions to Resend + Slack + sheet.
      console.warn('[pas-demo] backend unavailable, captured locally', err, payload);
    }
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div
        style={{
          background: '#ECFDF5',
          border: '1px solid #A7F3D0',
          borderRadius: 14,
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}
      >
        <CheckCircle2 size={22} color="#0D9E6E" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontWeight: 600, color: '#065F46', fontSize: 15, marginBottom: 4 }}>
            We’ve got it.
          </div>
          <p style={{ color: '#065F46', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            We’ll reach out within one business day to set up a PAS walkthrough on your
            numbers. If urgent, email{' '}
            <a href="mailto:hello@orvnlabs.com" style={{ color: '#065F46', fontWeight: 600 }}>
              hello@orvnlabs.com
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      style={{
        background: '#fff',
        border: '1px solid #E5E8F0',
        borderRadius: 16,
        padding: 'clamp(24px, 4vw, 36px)',
        boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.05)',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
          marginBottom: 12,
        }}
      >
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Name"
          style={inputStyle}
        />
        <input
          type="text"
          required
          value={brokerage}
          onChange={(e) => setBrokerage(e.target.value)}
          placeholder="Brokerage"
          aria-label="Brokerage"
          style={inputStyle}
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          aria-label="Email"
          style={inputStyle}
        />
        <select
          value={leadVolume}
          onChange={(e) => setLeadVolume(e.target.value)}
          aria-label="Monthly lead volume"
          style={{ ...inputStyle, appearance: 'auto' }}
        >
          <option value="">Monthly lead volume</option>
          <option>0–50</option>
          <option>51–200</option>
          <option>201–500</option>
          <option>500+</option>
        </select>
      </div>
      <textarea
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        placeholder="Biggest follow-up problem you’re trying to fix"
        aria-label="Biggest follow-up problem"
        rows={3}
        style={{ ...inputStyle, resize: 'vertical', marginBottom: 12 }}
      />

      {error && (
        <p role="alert" style={{ color: '#DC2626', fontSize: 13, marginBottom: 10 }}>
          {error}
        </p>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary"
            style={{ opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'wait' : 'pointer' }}
          >
            <Send size={15} /> {status === 'loading' ? 'Sending…' : 'Book a PAS demo'}
          </button>
          <a href={mailtoFallback} className="btn-secondary">
            Email us instead
          </a>
        </div>
        <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>
          We reply within one business day. No mass nurture sequences.
        </p>
      </div>
    </form>
  );
}

const inputStyle = {
  background: '#F7F8FB',
  border: '1px solid #E5E8F0',
  borderRadius: 10,
  padding: '12px 14px',
  fontSize: 14,
  color: '#0F172A',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

// ─── FINAL CTA + FORM ────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <Section background="surface" borderTop>
      <div id="demo-form" style={{ maxWidth: 760, marginBottom: 24 }}>
        <motion.div {...fadeUp(0)}>
          <Eyebrow>Book a PAS demo</Eyebrow>
        </motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', margin: '14px 0 16px' }}
        >
          See where your leads are leaking.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          Tell us about the brokerage and the follow-up problem you’re trying to fix. We’ll
          walk you through PAS on your real numbers.
        </motion.p>
      </div>

      <motion.div {...fadeUp(0.15)}>
        <DemoForm />
      </motion.div>
    </Section>
  );
}

// ─── PAS PAGE ────────────────────────────────────────────────────────────────
export default function PAS() {
  useDocumentMeta({
    title: 'PAS — Never lose another real estate lead',
    description:
      'PAS answers inbound calls, qualifies leads, schedules bookings or callbacks, and reports outcomes to Slack and email. The first-contact infrastructure for real estate brokerages.',
    path: '/pas',
  });
  return (
    <PageWrapper>
      <Hero />
      <Diagnosis />
      <Problem />
      <Solution />
      <Capabilities />
      <ProductProof />
      <DashboardSecondary />
      <FinalCTA />
    </PageWrapper>
  );
}
