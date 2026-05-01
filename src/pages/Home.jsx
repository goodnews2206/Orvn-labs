import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Calendar,
  Database,
  Compass,
  ShieldCheck,
  Activity,
  Eye,
  EyeOff,
  BarChart3,
  Calculator,
  Gauge,
  Users,
  ListChecks,
  FileSearch,
  Building2,
  Sparkles,
  Layers,
} from 'lucide-react';

import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import FlowDiagram from '../components/FlowDiagram';
import Newsletter from '../components/Newsletter';
import { useDocumentMeta } from '../lib/seo';
import { PAS_LINKS } from '../lib/pas';
import { getRecentPosts } from '../lib/blog';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut', delay },
});

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
            <Link to="/scorecard" className="btn-primary">
              Run your lead leakage score <ArrowRight size={16} />
            </Link>
            <Link to="/test" className="btn-secondary">Test PAS</Link>
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

// ─── 2. BRAND HIERARCHY ──────────────────────────────────────────────────────
// Explicit ORVN Labs (parent) → PAS (flagship) → category visual.
function BrandHierarchy() {
  const tiers = [
    {
      icon: Building2,
      label: 'ORVN Labs',
      role: 'Parent infrastructure company',
      desc: 'Builds brokerage intelligence infrastructure for real estate.',
      tone: 'neutral',
    },
    {
      icon: Sparkles,
      label: 'PAS',
      role: 'Flagship product · Performative AI Superstaff',
      desc: 'The first ORVN system. Controls the first-contact layer.',
      tone: 'primary',
    },
    {
      icon: Layers,
      label: 'First-contact infrastructure',
      role: 'Category',
      desc: 'The operating layer between inquiry and qualified appointment.',
      tone: 'ok',
    },
  ];
  const map = (t) =>
    t === 'primary'
      ? { bg: '#EEEAFB', border: '#C7BCF5', icon: '#5B3FD4', label: '#3A2899' }
      : t === 'ok'
      ? { bg: '#ECFDF5', border: '#A7F3D0', icon: '#0D9E6E', label: '#065F46' }
      : { bg: '#F7F8FB', border: '#E5E8F0', icon: '#475569', label: '#0F172A' };

  return (
    <Section borderTop>
      <div style={{ maxWidth: 760, marginBottom: 28 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Brand hierarchy</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '14px 0 0' }}>
          One company. One flagship system. One category.
        </motion.h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 14,
        }}
      >
        {tiers.map((t, i) => {
          const c = map(t.tone);
          const Icon = t.icon;
          return (
            <motion.div
              key={t.label}
              {...fadeUp(0.05 + i * 0.05)}
              style={{
                background: '#fff',
                border: `1px solid ${c.border}`,
                borderRadius: 16,
                padding: 26,
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
                    background: c.bg,
                    color: c.icon,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
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
                  {String(i + 1).padStart(2, '0')} · Layer
                </span>
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 600, color: c.label, marginBottom: 4 }}>
                  {t.label}
                </div>
                <div style={{ fontSize: 13, color: '#475569', marginBottom: 10 }}>{t.role}</div>
                <p style={{ fontSize: 14, color: '#0F172A', lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── 3. PROBLEM ──────────────────────────────────────────────────────────────
// Tight visual: blame vs reality + visible vs hidden. No 7-card prose grid.
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

      {/* Visible vs hidden — single visual */}
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

      {/* Blame vs reality — single visual */}
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

// ─── 4. WHAT PAS CONTROLS — process strip (replaces FCI + HowItWorks) ────────
function WhatPASControls() {
  const steps = [
    { n: 1, label: 'Inquiry', body: 'Lead arrives — web, phone, listing, paid ad.' },
    { n: 2, label: 'Answer', body: 'PAS responds in seconds, on the same channel.' },
    { n: 3, label: 'Qualify', body: 'Intent, urgency, budget, timeline, financing.' },
    { n: 4, label: 'Route', body: 'Best-fit agent by territory, price band, specialty.' },
    { n: 5, label: 'Book', body: 'Appointment on the agent’s calendar, full context attached.' },
    { n: 6, label: 'Log', body: 'Status reflects what actually happened. CRM stays clean.' },
  ];
  return (
    <Section borderTop>
      <div style={{ maxWidth: 760, marginBottom: 36 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>What PAS controls</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 48px)', margin: '14px 0 16px' }}>
          Six movements. One operating layer.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          Every inbound lead moves through the same six steps. PAS controls all of them — so the
          first conversation starts with structure, not guesswork.
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
          }}
        >
          {steps.map((s) => (
            <motion.div
              key={s.n}
              {...fadeUp(0.04 * s.n)}
              style={{
                background: '#F7F8FB',
                border: '1px solid #E5E8F0',
                borderRadius: 12,
                padding: 18,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 7,
                    background: '#5B3FD4',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {s.n}
                </span>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>{s.label}</span>
              </div>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: 0 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── 5. MEET PAS — capability tiles ─────────────────────────────────────────
function MeetPAS() {
  const caps = [
    { icon: Phone, label: 'Answers inbound leads', sub: 'Voice, SMS, chat, email — within seconds.' },
    { icon: Compass, label: 'Qualifies intent', sub: 'Buy / sell / browse, urgency, financing.' },
    { icon: BarChart3, label: 'Captures budget & timeline', sub: 'In writing on the lead record.' },
    { icon: ShieldCheck, label: 'Handles basic objections', sub: '“Just browsing”, “send links”, etc.' },
    { icon: Users, label: 'Routes to the right agent', sub: 'Territory, price band, language, specialty.' },
    { icon: Calendar, label: 'Books appointments', sub: 'Directly into agent calendars with context.' },
    { icon: ListChecks, label: 'Logs outcomes', sub: 'Status tied to events, not subjective tags.' },
    { icon: Activity, label: 'Creates intelligence', sub: 'Patterns surface across leads.' },
  ];

  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 760, marginBottom: 36 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Meet PAS</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 48px)', margin: '14px 0 16px' }}>
          PAS — Performative AI Superstaff.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          PAS is the first ORVN system, built to control the first-contact layer for real estate
          brokerages.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={18} />
              </span>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>{c.label}</div>
              <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.6, margin: 0 }}>{c.sub}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div {...fadeUp(0.15)} style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link to="/pas" className="btn-primary">See PAS in detail <ArrowRight size={16} /></Link>
        <Link to="/test" className="btn-secondary">Test PAS</Link>
      </motion.div>
    </Section>
  );
}

// ─── 6. CONTROL ROOM (merged with Intelligence) ──────────────────────────────
function ControlRoom() {
  const cards = [
    { label: 'Calls handled', value: '184', tone: 'primary', sub: 'this week' },
    { label: 'Qualified leads', value: '67', tone: 'primary', sub: '36% of inbound' },
    { label: 'Appointments booked', value: '41', tone: 'ok', sub: 'across 9 agents' },
    { label: 'After-hours captured', value: '24', tone: 'primary', sub: 'would have leaked' },
    { label: 'Qualified but not booked', value: '12', tone: 'warn', sub: 'recoverable in 48h' },
    { label: 'First-Contact Lift', value: '+38%', tone: 'ok', sub: 'vs pre-PAS baseline' },
  ];
  const intel = [
    'Intent', 'Urgency', 'Budget', 'Timeline', 'Objection',
    'Routing outcome', 'Booking status', 'Final outcome',
  ];

  return (
    <Section borderTop>
      <div style={{ maxWidth: 760, marginBottom: 36 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>PAS Control Room</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 48px)', margin: '14px 0 16px' }}>
          The dashboard is the control room — not another daily workload.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          The dashboard is not the product. It shows what the infrastructure already controlled —
          where leads moved, where they stalled, where they died.
        </motion.p>
      </div>

      <motion.div
        {...fadeUp(0.05)}
        style={{
          background: '#fff',
          border: '1px solid #E5E8F0',
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 12px 28px rgba(15,23,42,0.06)',
        }}
      >
        <div
          style={{
            background: '#F7F8FB',
            borderBottom: '1px solid #E5E8F0',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span className="animate-blink" style={{ width: 8, height: 8, borderRadius: '50%', background: '#0D9E6E' }} />
          <span style={mono('#475569')}>PAS Control Room · demo data</span>
          <span style={{ marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#94A3B8' }}>
            Last 7 days
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 1,
            background: '#E5E8F0',
          }}
        >
          {cards.map((c) => (
            <div key={c.label} style={{ background: '#fff', padding: '20px 22px' }}>
              <div style={mono('#94A3B8')}>{c.label}</div>
              <div
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 32,
                  lineHeight: 1.1,
                  color:
                    c.tone === 'ok'
                      ? '#0D9E6E'
                      : c.tone === 'warn'
                      ? '#D97706'
                      : c.tone === 'primary'
                      ? '#5B3FD4'
                      : '#0F172A',
                  margin: '8px 0 6px',
                }}
              >
                {c.value}
              </div>
              <div style={{ fontSize: 12, color: '#475569' }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        {...fadeUp(0.1)}
        style={{
          marginTop: 14,
          background: '#F7F8FB',
          border: '1px solid #E5E8F0',
          borderRadius: 14,
          padding: '20px 22px',
        }}
      >
        <div style={{ ...mono('#475569'), marginBottom: 12 }}>
          Every interaction becomes structured intelligence
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {intel.map((i) => (
            <span
              key={i}
              style={{
                background: '#fff',
                border: '1px solid #E5E8F0',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: 13,
                color: '#0F172A',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {i}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.15)} style={{ marginTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <a href={PAS_LINKS.controlRoom} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          Open PAS Control Room <ArrowRight size={15} />
        </a>
        <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>
          {/* TODO: replace mock dashboard with real screenshots once PAS UI is finalized. */}
          Demo figures shown.
        </p>
      </motion.div>
    </Section>
  );
}

// ─── 7. USE CASES — 6 cards, single-line each ───────────────────────────────
function UseCases() {
  const cases = [
    { icon: Phone, title: 'After-hours capture', body: 'Inbound between 7pm–9am gets a real conversation, not voicemail.' },
    { icon: Users, title: 'ISA support / replacement', body: 'Cover first-touch volume without growing headcount.' },
    { icon: Compass, title: 'Lead qualification', body: 'Agents inherit intent, budget, and timeline — not just a name.' },
    { icon: Activity, title: 'Handoff visibility', body: 'Who responded, when, what was said, what was booked.' },
    { icon: Database, title: 'CRM hygiene', body: 'Status tied to events, not subjective tags. Reports stop lying.' },
    { icon: FileSearch, title: 'Weekly intelligence', body: 'Top objections, where leads stall, what to do about it.' },
  ];

  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 760, marginBottom: 32 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Use cases</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', margin: '14px 0 0' }}>
          What PAS controls, in operator terms.
        </motion.h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {cases.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              {...fadeUp(0.04 * i)}
              style={{
                background: '#fff',
                border: '1px solid #E5E8F0',
                borderRadius: 12,
                padding: 22,
              }}
            >
              <Icon size={20} color="#5B3FD4" style={{ marginBottom: 12 }} />
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: '0 0 6px', fontFamily: "'Inter', sans-serif" }}>
                {c.title}
              </h3>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, margin: 0 }}>{c.body}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── 8. CALCULATORS TEASER ───────────────────────────────────────────────────
function CalculatorsTeaser() {
  return (
    <Section borderTop>
      <div style={{ maxWidth: 760, marginBottom: 32 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Diagnostic entry point</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', margin: '14px 0 16px' }}>
          See where leads are dying — in five minutes.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          Both tools run in your browser. No login, no calendar booking, no sales call.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        <motion.div {...fadeUp(0.05)} className="card" style={{ padding: 28 }}>
          <Gauge size={28} color="#5B3FD4" style={{ marginBottom: 14 }} />
          <h3 style={{ fontSize: 22, fontFamily: "'Instrument Serif', serif", margin: '0 0 8px', color: '#0F172A' }}>
            Lead Leakage Scorecard
          </h3>
          <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, margin: '0 0 18px' }}>
            Plain-English score, likely bottleneck, suggested fix.
          </p>
          <Link to="/scorecard" className="btn-primary">
            Run scorecard <ArrowRight size={15} />
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="card" style={{ padding: 28 }}>
          <Calculator size={28} color="#5B3FD4" style={{ marginBottom: 14 }} />
          <h3 style={{ fontSize: 22, fontFamily: "'Instrument Serif', serif", margin: '0 0 8px', color: '#0F172A' }}>
            Revenue Calculator
          </h3>
          <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, margin: '0 0 18px' }}>
            Annual cost of speed-to-lead delay, math shown step by step.
          </p>
          <Link to="/calculators/revenue" className="btn-secondary">
            Run calculator <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── 9. PRICING TEASER ───────────────────────────────────────────────────────
function PricingTeaser() {
  const tiers = [
    { name: 'Starter', price: '$500', credits: '1,000 PAS Credits', for: 'Small teams testing PAS.' },
    { name: 'Growth', price: '$1,500', credits: '4,000 PAS Credits', for: 'Active lead flow across channels.', highlight: true },
    { name: 'Scale', price: '$3,500', credits: '12,000 PAS Credits', for: 'High-volume teams.' },
    { name: 'Enterprise', price: 'Custom', credits: 'Custom volume', for: 'Multi-office, custom integrations, SLA.' },
  ];

  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 760, marginBottom: 32 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Pricing — early access</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', margin: '14px 0 16px' }}>
          Priced against what leakage already costs you.
        </motion.h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            {...fadeUp(0.04 * i)}
            style={{
              background: '#fff',
              border: t.highlight ? '1px solid #5B3FD4' : '1px solid #E5E8F0',
              borderRadius: 14,
              padding: 24,
              boxShadow: t.highlight ? '0 0 0 4px rgba(91,63,212,0.08)' : '0 1px 2px rgba(15,23,42,0.04)',
              position: 'relative',
            }}
          >
            {t.highlight && (
              <span
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: '#5B3FD4',
                  color: '#fff',
                  fontSize: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  borderRadius: 999,
                  padding: '3px 10px',
                }}
              >
                Most operators
              </span>
            )}
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', marginBottom: 8 }}>{t.name}</div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, lineHeight: 1, color: '#0F172A', marginBottom: 4 }}>
              {t.price}
              {t.price !== 'Custom' && <span style={{ fontSize: 13, color: '#94A3B8' }}>/mo</span>}
            </div>
            <div style={{ fontSize: 12, color: '#475569', marginBottom: 12 }}>{t.credits}</div>
            <p style={{ fontSize: 13.5, color: '#475569', margin: 0, lineHeight: 1.6 }}>{t.for}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Link to="/pricing" className="btn-primary">See full pricing <ArrowRight size={15} /></Link>
        <p style={{ fontSize: 13, color: '#475569', margin: 0, maxWidth: 480 }}>
          Setup fees vary by lead volume, integrations, and routing complexity.
        </p>
      </div>
    </Section>
  );
}

// ─── 10. INTELLIGENCE HUB (was BlogTeaser) ──────────────────────────────────
function IntelligenceHub() {
  const posts = getRecentPosts(3);
  return (
    <Section borderTop>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
        <div>
          <Eyebrow>First-Contact Intelligence</Eyebrow>
          <h2 className="h-section" style={{ fontSize: 'clamp(28px, 3.8vw, 42px)', margin: '14px 0 6px' }}>
            Operator-grade writing on lead conversion.
          </h2>
          <p style={{ color: '#475569', fontSize: 14.5, margin: 0, maxWidth: 560 }}>
            Field notes from inside brokerages — not generic AI marketing.
          </p>
        </div>
        <Link to="/blog" className="btn-ghost">All posts <ArrowRight size={15} /></Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        {posts.map((p, i) => (
          <motion.article
            key={p.slug}
            {...fadeUp(0.04 * i)}
            className="card"
            style={{ padding: 24, display: 'flex', flexDirection: 'column' }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#5B3FD4',
                marginBottom: 10,
              }}
            >
              {p.category}
            </span>
            <h3 style={{ fontSize: 18, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: '#0F172A', margin: '0 0 10px', lineHeight: 1.35 }}>
              <Link to={`/blog/${p.slug}`} style={{ color: '#0F172A' }}>{p.title}</Link>
            </h3>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, margin: '0 0 14px', flex: 1 }}>
              {p.excerpt}
            </p>
            <Link
              to={`/blog/${p.slug}`}
              style={{ fontSize: 13, fontWeight: 600, color: '#5B3FD4', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              Read post <ArrowRight size={14} />
            </Link>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

// ─── 11. NEWSLETTER ──────────────────────────────────────────────────────────
function NewsletterSection() {
  return (
    <Section background="surface" borderTop>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(28px, 5vw, 64px)',
          alignItems: 'center',
        }}
      >
        <div>
          <Eyebrow>Newsletter</Eyebrow>
          <h2 className="h-section" style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', margin: '14px 0 14px' }}>
            Get First-Contact Intelligence.
          </h2>
          <p className="lead">
            Weekly field notes on speed-to-lead, ISA failure, CRM graveyards, agent handoffs, and
            after-hours leads.
          </p>
        </div>
        <Newsletter source="home" />
      </div>
    </Section>
  );
}

// ─── 12. FOUNDER THESIS ──────────────────────────────────────────────────────
function FounderThesis() {
  const timeline = [
    { label: 'More leads', tone: 'neutral' },
    { label: 'Scattered follow-up', tone: 'risk' },
    { label: 'Missed first contact', tone: 'risk' },
    { label: 'Structured response', tone: 'ok' },
    { label: 'PAS', tone: 'primary' },
  ];

  const messy = [
    'A lead comes in while you are busy.',
    'Another one comes in after hours.',
    'Someone asks for details and disappears.',
    'Someone needs to be qualified but never gets asked the right questions.',
    'Someone should have been booked immediately, but instead gets left inside a CRM note.',
  ];

  return (
    <Section borderTop>
      <div style={{ maxWidth: 760, marginBottom: 32 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Founder thesis</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(30px, 4.5vw, 52px)', margin: '14px 0 0' }}
        >
          I didn’t start with AI. I started with missed leads.
        </motion.h2>
      </div>

      <motion.div {...fadeUp(0.05)} style={{ marginBottom: 36 }}>
        <FlowDiagram label="The path that became ORVN" steps={timeline} />
      </motion.div>

      <div style={{ maxWidth: 720 }}>
        <motion.h3 {...fadeUp(0.05)} style={subhead()}>The problem started with me.</motion.h3>
        <motion.p {...fadeUp(0.07)} style={para()}>
          When I started as a realtor, I thought the problem was simple: get more leads. So I
          chased leads. I used tools. I tested sources. On paper, I had activity.
        </motion.p>
        <motion.p {...fadeUp(0.09)} style={para()}>
          But at the end of the week I would look back and see 30, 40, sometimes 50+ leads sitting
          across calls, messages, forms, and follow-ups. The painful part was not that the leads
          didn’t exist — the painful part was realizing I had only spoken properly to a fraction
          of them.
        </motion.p>

        <motion.h3 {...fadeUp(0.11)} style={subhead()}>Real estate first contact is messy.</motion.h3>
        <motion.p {...fadeUp(0.13)} style={para()}>
          Not because I did not care. Because the operating layer had no shape:
        </motion.p>
        <motion.ul
          {...fadeUp(0.15)}
          style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          {messy.map((m) => (
            <li
              key={m}
              style={{
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                borderLeft: '3px solid #DC2626',
                borderRadius: 10,
                padding: '12px 16px',
                fontSize: 15,
                color: '#0F172A',
                lineHeight: 1.55,
              }}
            >
              {m}
            </li>
          ))}
        </motion.ul>

        <motion.h3 {...fadeUp(0.05)} style={subhead()}>Then I saw it inside teams. Then inside brokerages.</motion.h3>
        <motion.p {...fadeUp(0.07)} style={para()}>
          The pattern was the same. The brokerage did not always need more leads. It needed a
          faster, cleaner, more structured way to handle the first few minutes after a lead showed
          intent. That became the original thesis behind ORVN.
        </motion.p>

        <motion.div
          {...fadeUp(0.1)}
          style={{
            background: '#F7F8FB',
            border: '1px solid #E5E8F0',
            borderLeft: '3px solid #5B3FD4',
            borderRadius: 12,
            padding: '20px 24px',
            margin: '8px 0 28px',
          }}
        >
          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 22,
              lineHeight: 1.5,
              color: '#0F172A',
              margin: 0,
            }}
          >
            Lead generation without first-contact infrastructure creates a bigger graveyard.
          </p>
        </motion.div>

        <motion.p {...fadeUp(0.12)} style={para()}>
          PAS is the productized version of that lesson.{' '}
          <strong style={{ color: '#0F172A' }}>PAS — Performative AI Superstaff</strong> is built
          to answer, qualify, route, book, and log inbound leads before delay kills conversion.
          Not because brokerages need another dashboard. Not because agents need more software.
          But because the gap between inquiry and qualified appointment is too expensive to leave
          to chance.
        </motion.p>

        <motion.div {...fadeUp(0.14)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24, marginBottom: 18 }}>
          <Link to="/scorecard" className="btn-primary">
            Run your lead leakage score <ArrowRight size={16} />
          </Link>
          <Link to="/test" className="btn-secondary">Test PAS</Link>
        </motion.div>

        <motion.p {...fadeUp(0.16)} style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
          Daniel Oyegoke — Founder, ORVN Labs.
        </motion.p>
      </div>
    </Section>
  );
}

// ─── 13. FAQ TEASER ──────────────────────────────────────────────────────────
function FAQTeaser() {
  const top = [
    { q: 'Is PAS a CRM?', a: 'No. PAS is first-contact infrastructure — it works before and around the CRM.' },
    { q: 'Does PAS replace agents?', a: 'No. PAS protects intent before agents enter. Agents still close trust.' },
    { q: 'Does PAS replace ISAs?', a: 'PAS can support or replace parts of the first-touch ISA function depending on workflow.' },
    { q: 'Can PAS work after hours?', a: 'Yes. PAS is designed to protect after-hours intent.' },
  ];
  return (
    <Section background="surface" borderTop>
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

// ─── 14. FINAL CTA ───────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <Section borderTop>
      <div
        style={{
          background: '#5B3FD4',
          borderRadius: 20,
          padding: 'clamp(40px, 6vw, 80px)',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.h2
            {...fadeUp(0)}
            className="h-section"
            style={{ color: '#fff', fontSize: 'clamp(32px, 4.5vw, 56px)', margin: '0 0 16px' }}
          >
            Stop guessing where your leads die.
          </motion.h2>
          <motion.p {...fadeUp(0.05)} style={{ color: 'rgba(255,255,255,0.78)', fontSize: 17, lineHeight: 1.65, margin: '0 0 28px' }}>
            Five minutes with the leakage scorecard, or test PAS on a real conversation.
          </motion.p>
          <motion.div
            {...fadeUp(0.1)}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link to="/scorecard" className="btn-primary" style={{ background: '#fff', color: '#5B3FD4' }}>
              Run leakage score <ArrowRight size={16} />
            </Link>
            <Link to="/test" className="btn-secondary" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
              Test PAS
            </Link>
            <Link to="/blog" className="btn-ghost" style={{ color: '#fff' }}>
              Join First-Contact Intelligence
            </Link>
          </motion.div>
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
      <BrandHierarchy />
      <Problem />
      <WhatPASControls />
      <MeetPAS />
      <ControlRoom />
      <UseCases />
      <CalculatorsTeaser />
      <PricingTeaser />
      <IntelligenceHub />
      <NewsletterSection />
      <FounderThesis />
      <FAQTeaser />
      <FinalCTA />
    </PageWrapper>
  );
}

// ─── shared style helpers ───────────────────────────────────────────────────
function mono(color = '#94A3B8') {
  return {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color,
    fontWeight: 600,
  };
}

function subhead() {
  return {
    fontSize: 19,
    fontWeight: 600,
    color: '#0F172A',
    fontFamily: "'Inter', sans-serif",
    margin: '20px 0 10px',
  };
}

function para() {
  return {
    fontSize: 17,
    lineHeight: 1.75,
    color: '#0F172A',
    margin: '0 0 16px',
  };
}
