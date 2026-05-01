import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Clock,
  Calendar,
  Database,
  Compass,
  ShieldCheck,
  Activity,
  Eye,
  EyeOff,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Calculator,
  Gauge,
  PhoneOff,
  Moon,
  Users,
  ListChecks,
  FileSearch,
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
  initial: { opacity: 0, y: 16 },
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
        paddingTop: 'clamp(64px, 8vw, 100px)',
        paddingBottom: 'clamp(56px, 8vw, 96px)',
      }}
    >
      <div className="container-page">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: 'clamp(40px, 6vw, 64px)',
          }}
        >
          <div style={{ maxWidth: 760 }}>
            <motion.div {...fadeUp(0)}>
              <span className="pill" style={{ marginBottom: 22 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#0D9E6E',
                  }}
                />
                ORVN Labs · Real estate brokerage infrastructure
              </span>
            </motion.div>
            <motion.h1
              {...fadeUp(0.05)}
              className="h-display"
              style={{ fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: 20 }}
            >
              Control the first-contact layer{' '}
              <span style={{ color: '#5B3FD4' }}>before delay kills conversion.</span>
            </motion.h1>
            <motion.p
              {...fadeUp(0.1)}
              className="lead"
              style={{ maxWidth: 620, marginBottom: 30 }}
            >
              ORVN Labs builds brokerage intelligence infrastructure. Our flagship system,{' '}
              <strong style={{ color: '#0F172A' }}>PAS — Performative AI Superstaff</strong>,
              answers, qualifies, routes, books, and logs inbound leads before human delay turns
              intent cold.
            </motion.p>

            <motion.div
              {...fadeUp(0.15)}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}
            >
              <Link to="/calculators/leakage" className="btn-primary">
                Run your lead leakage score <ArrowRight size={16} />
              </Link>
              <Link to="/demo" className="btn-secondary">
                Test PAS
              </Link>
            </motion.div>

            <motion.p
              {...fadeUp(0.2)}
              style={{ fontSize: 13, color: '#94A3B8', maxWidth: 560 }}
            >
              Built for brokerage owners, team leads, and operators who cannot afford CRM
              graveyards.
            </motion.p>
          </div>

          <motion.div {...fadeUp(0.25)}>
            <FlowDiagram label="What PAS controls" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. PROBLEM ──────────────────────────────────────────────────────────────
function Problem() {
  const cards = [
    { icon: Clock, title: 'Delayed first response', body: 'Hours pass before a human follows up. By then, the lead has called the next listing.' },
    { icon: MessageSquare, title: 'Generic follow-up', body: 'Same template, same questions, no qualification. Lead disengages quietly.' },
    { icon: Compass, title: 'No qualification', body: 'No budget, no timeline, no intent captured. Agents inherit a name and a phone number.' },
    { icon: Users, title: 'Wrong routing', body: 'Best-fit agent never sees the lead. It sits in a round-robin or a junk bucket.' },
    { icon: Calendar, title: 'No booked next step', body: '“Talked to them once.” No appointment. No commitment. No deal.' },
    { icon: Database, title: 'Dirty CRM data', body: 'Status fields are subjective. “Contacted” means nothing. Reports lie.' },
    { icon: Moon, title: 'After-hours leakage', body: 'Inquiries between 7pm and 9am vanish into voicemail. Nobody recovers them.' },
  ];

  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 760, marginBottom: 48 }}>
        <motion.div {...fadeUp(0)}>
          <Eyebrow>The problem</Eyebrow>
        </motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 48px)', margin: '14px 0 16px' }}>
          Most brokerages are measuring the wrong failure.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          Lead spend is visible. CRM records are visible. Closed deals are visible. But the gap
          between inquiry and qualified appointment is usually where money dies.
        </motion.p>
      </div>

      {/* Visible vs hidden */}
      <motion.div {...fadeUp(0.15)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 56 }}>
        <div style={visHiddenStyle('visible')}>
          <div style={visHeaderStyle()}>
            <Eye size={16} color="#475569" />
            <span style={visLabelStyle()}>What gets measured</span>
          </div>
          <ul style={visListStyle()}>
            <li>Lead volume</li>
            <li>Lead spend</li>
            <li>Closed deals</li>
            <li>Agent count</li>
          </ul>
        </div>
        <div style={visHiddenStyle('hidden')}>
          <div style={visHeaderStyle()}>
            <EyeOff size={16} color="#DC2626" />
            <span style={{ ...visLabelStyle(), color: '#DC2626' }}>What gets ignored</span>
          </div>
          <ul style={visListStyle('#DC2626')}>
            <li>Time to first response</li>
            <li>Actual contact rate</li>
            <li>Qualification rate</li>
            <li>Routing quality</li>
            <li>Booking rate</li>
          </ul>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div key={c.title} className="card" {...fadeUp(0.05 + i * 0.04)} style={{ padding: 24 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: '#FEF2F2', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626', marginBottom: 14 }}>
                <Icon size={18} />
              </div>
              <h3 style={cardTitleStyle}>{c.title}</h3>
              <p style={cardBodyStyle}>{c.body}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── 3. WHAT IS FIRST-CONTACT INFRASTRUCTURE ─────────────────────────────────
function WhatIsFCI() {
  const questions = [
    'Who is the lead?',
    'What do they want?',
    'How urgent are they?',
    'What is their budget and timeline?',
    'Should they be routed or booked?',
    'What happened after contact?',
  ];

  const flow = [
    { label: 'Lead source', tone: 'neutral' },
    { label: 'First contact', tone: 'primary' },
    { label: 'Qualification', tone: 'primary' },
    { label: 'Routing', tone: 'primary' },
    { label: 'Booking', tone: 'primary' },
    { label: 'Intelligence log', tone: 'ok' },
  ];

  return (
    <Section borderTop>
      <div style={{ maxWidth: 760, marginBottom: 40 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>The category</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 48px)', margin: '14px 0 16px' }}>
          What is first-contact infrastructure?
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          It is the operating layer that controls what happens immediately after a lead shows
          intent. It answers six questions, every time, in writing.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 32 }}>
        {questions.map((q, i) => (
          <motion.div key={q} className="card" {...fadeUp(0.05 + i * 0.04)} style={{ padding: 22, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: '#EEEAFB', color: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: 15, color: '#0F172A' }}>{q}</span>
          </motion.div>
        ))}
      </div>

      <motion.div {...fadeUp(0.1)}>
        <FlowDiagram steps={flow} label="The first-contact layer in plain English" />
      </motion.div>
    </Section>
  );
}

// ─── 4. MEET PAS ─────────────────────────────────────────────────────────────
function MeetPAS() {
  const caps = [
    { icon: Phone, label: 'Answers inbound leads' },
    { icon: Compass, label: 'Qualifies intent' },
    { icon: BarChart3, label: 'Captures budget & timeline' },
    { icon: ShieldCheck, label: 'Handles basic objections' },
    { icon: Users, label: 'Routes to the right agent' },
    { icon: Calendar, label: 'Books appointments' },
    { icon: ListChecks, label: 'Logs outcomes' },
    { icon: Activity, label: 'Creates brokerage intelligence' },
  ];

  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 760, marginBottom: 40 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Meet PAS</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 48px)', margin: '14px 0 16px' }}>
          PAS — Performative AI Superstaff.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          PAS is the first ORVN system, built to control the first-contact layer for real estate
          brokerages.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 32 }}>
        {caps.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div key={c.label} {...fadeUp(0.04 * i)} style={{ background: '#fff', border: '1px solid #E5E8F0', borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 36, height: 36, borderRadius: 9, background: '#EEEAFB', color: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} />
              </span>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#0F172A' }}>{c.label}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        {...fadeUp(0.1)}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 14,
        }}
      >
        <div style={pullQuoteStyle}>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: '#0F172A', margin: 0, fontFamily: "'Instrument Serif', serif" }}>
            “PAS is not another CRM. PAS moves the lead before the CRM becomes a graveyard.”
          </p>
        </div>
        <div style={pullQuoteStyle}>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: '#0F172A', margin: 0, fontFamily: "'Instrument Serif', serif" }}>
            “Your agents close trust. PAS protects intent before the agent enters.”
          </p>
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.15)} style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link to="/pas" className="btn-primary">See what PAS controls <ArrowRight size={16} /></Link>
        <Link to="/demo" className="btn-secondary">Test PAS in 90 seconds</Link>
      </motion.div>
    </Section>
  );
}

// ─── 5. HOW PAS WORKS ────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: 1, title: 'Lead comes in', body: 'Web form, phone, listing portal, paid ad — every channel feeds the same first-contact layer.' },
    { n: 2, title: 'PAS answers', body: 'Within seconds, in your brokerage’s voice, by SMS, voice, or chat — whichever the lead used.' },
    { n: 3, title: 'PAS qualifies', body: 'Intent, urgency, budget, timeline, location, financing readiness. Captured in writing.' },
    { n: 4, title: 'PAS routes or books', body: 'Best-fit agent, on the right calendar, with full lead context already attached.' },
    { n: 5, title: 'PAS logs the outcome', body: 'Every conversation becomes a structured record. Status reflects what actually happened.' },
    { n: 6, title: 'You see the intelligence', body: 'Where leads moved, where they stalled, where they died, what to do about it.' },
  ];

  return (
    <Section borderTop>
      <div style={{ maxWidth: 760, marginBottom: 40 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>How PAS works</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 48px)', margin: '14px 0 16px' }}>
          Six steps. One operating layer.
        </motion.h2>
      </div>

      <ol style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, listStyle: 'none', padding: 0, margin: 0 }}>
        {steps.map((s, i) => (
          <motion.li key={s.n} {...fadeUp(0.04 * i)} className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ width: 30, height: 30, borderRadius: 8, background: '#5B3FD4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 13 }}>
                {s.n}
              </span>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0F172A', margin: 0, fontFamily: "'Inter', sans-serif" }}>
                {s.title}
              </h3>
            </div>
            <p style={cardBodyStyle}>{s.body}</p>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}

// ─── 6. CONTROL ROOM PREVIEW ─────────────────────────────────────────────────
function ControlRoom() {
  const cards = [
    { label: 'Calls handled this week', value: '184', tone: 'primary', sub: '+12 vs last week' },
    { label: 'Qualified leads', value: '67', tone: 'primary', sub: '36% of inbound' },
    { label: 'Appointments booked', value: '41', tone: 'ok', sub: 'On 9 agents’ calendars' },
    { label: 'Top objection', value: '“Just browsing.”', tone: 'neutral', sub: 'Heard 14 times' },
    { label: 'Qualified but not booked', value: '12', tone: 'warn', sub: 'Recoverable in 48h' },
    { label: 'PAS Credits remaining', value: '2,840', tone: 'neutral', sub: 'On Growth plan' },
    { label: 'First-Contact Lift', value: '+38%', tone: 'ok', sub: 'vs pre-PAS baseline' },
    { label: 'After-hours captured', value: '24', tone: 'primary', sub: 'Would have leaked' },
  ];

  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 760, marginBottom: 40 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>PAS Control Room</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 48px)', margin: '14px 0 16px' }}>
          The dashboard is the control room, not another daily workload.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          Brokerage owners do not need another screen to babysit. They need visibility into what
          happened, where leads moved, where they died, and what should happen next.
        </motion.p>
      </div>

      <motion.div
        {...fadeUp(0.1)}
        style={{
          background: '#fff',
          border: '1px solid #E5E8F0',
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '0 1px 2px rgba(15,23,42,0.04), 0 12px 28px rgba(15,23,42,0.06)',
        }}
      >
        <div style={{ background: '#F7F8FB', borderBottom: '1px solid #E5E8F0', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0D9E6E' }} className="animate-blink" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569' }}>
            PAS Control Room · Demo data
          </span>
          <span style={{ marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#94A3B8' }}>
            Last 7 days
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, background: '#E5E8F0' }}>
          {cards.map((c) => (
            <div key={c.label} style={{ background: '#fff', padding: '20px 22px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 10 }}>
                {c.label}
              </div>
              <div
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 30,
                  lineHeight: 1.1,
                  color: c.tone === 'ok' ? '#0D9E6E' : c.tone === 'warn' ? '#D97706' : c.tone === 'primary' ? '#5B3FD4' : '#0F172A',
                  marginBottom: 6,
                }}
              >
                {c.value}
              </div>
              <div style={{ fontSize: 12, color: '#475569' }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.15)} style={{ marginTop: 32 }}>
        <div
          style={{
            background: '#fff',
            border: '1px solid #E5E8F0',
            borderRadius: 14,
            padding: '20px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>
              ORVN Portal · PAS Control Room · ORVN Support
            </div>
            <p style={{ fontSize: 13.5, color: '#475569', margin: 0, maxWidth: 580 }}>
              The website is the public layer. PAS runs on its own infrastructure. Login, control
              room, and demo flows route into the PAS app.
            </p>
          </div>
          <a href={PAS_LINKS.controlRoom} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Open PAS Control Room <ArrowRight size={15} />
          </a>
        </div>
        <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 10 }}>
          {/* TODO: Replace mock dashboard cards with real screenshots once PAS UI is finalized.
              TODO: Link “Test PAS” CTA to PAS dashboard/demo route once production URL is finalized. */}
          Demo figures shown. Real dashboard reflects your brokerage’s actual lead flow.
        </p>
      </motion.div>
    </Section>
  );
}

// ─── 7. BROKERAGE INTELLIGENCE ───────────────────────────────────────────────
function Intelligence() {
  const items = [
    'Lead intent',
    'Urgency',
    'Budget',
    'Timeline',
    'Objection',
    'Routing outcome',
    'Booking status',
    'Transfer request',
    'Final outcome',
  ];

  return (
    <Section borderTop>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'start' }}>
        <div>
          <motion.div {...fadeUp(0)}><Eyebrow>Brokerage intelligence</Eyebrow></motion.div>
          <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 44px)', margin: '14px 0 16px' }}>
            Every PAS interaction becomes a decision trace.
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="lead">
            PAS does not only handle conversations. It creates structured intelligence from them —
            so the answer to “what happened on this lead?” is one click, not a guess.
          </motion.p>
        </div>

        <motion.div {...fadeUp(0.1)} className="card" style={{ padding: 24 }}>
          <FlowDiagram
            label="From conversation to dashboard"
            steps={[
              { label: 'Call / chat', tone: 'neutral' },
              { label: 'Extracted data', tone: 'primary' },
              { label: 'Dashboard intelligence', tone: 'ok' },
            ]}
          />
          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
            {items.map((it) => (
              <span
                key={it}
                style={{
                  background: '#F7F8FB',
                  border: '1px solid #E5E8F0',
                  borderRadius: 8,
                  padding: '8px 10px',
                  fontSize: 12.5,
                  color: '#0F172A',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {it}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── 8. CALCULATORS / SCORECARDS ─────────────────────────────────────────────
function CalculatorsTeaser() {
  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 760, marginBottom: 32 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Diagnostics</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 44px)', margin: '14px 0 16px' }}>
          Two ways to see where leads are dying.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          Run the numbers in five minutes. No login, no calendar booking, no sales call.
        </motion.p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <motion.div {...fadeUp(0.1)} className="card" style={{ padding: 28 }}>
          <Gauge size={28} color="#5B3FD4" style={{ marginBottom: 14 }} />
          <h3 style={{ fontSize: 22, fontFamily: "'Instrument Serif', serif", margin: '0 0 10px', color: '#0F172A' }}>
            Lead Leakage Scorecard
          </h3>
          <p style={cardBodyStyle}>
            A quick, plain-English score of where your first-contact layer is leaking. Identifies the
            likely bottleneck and the most direct fix.
          </p>
          <Link to="/calculators/leakage" className="btn-primary" style={{ marginTop: 18 }}>
            Run the scorecard <ArrowRight size={15} />
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="card" style={{ padding: 28 }}>
          <Calculator size={28} color="#5B3FD4" style={{ marginBottom: 14 }} />
          <h3 style={{ fontSize: 22, fontFamily: "'Instrument Serif', serif", margin: '0 0 10px', color: '#0F172A' }}>
            Revenue Calculator
          </h3>
          <p style={cardBodyStyle}>
            Conservative estimate of what speed-to-lead delay and CRM graveyards are costing per
            year, with the math shown step by step.
          </p>
          <Link to="/calculators/revenue" className="btn-secondary" style={{ marginTop: 18 }}>
            Run the calculator <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── 9. USE CASES ────────────────────────────────────────────────────────────
function UseCases() {
  const cases = [
    {
      icon: PhoneOff,
      title: 'After-hours lead capture',
      problem: 'Inquiries between 7pm and 9am hit voicemail or a stale form.',
      controls: 'PAS answers immediately, qualifies, and books for the next morning.',
      outcome: 'Recovered intent that previously vanished overnight.',
    },
    {
      icon: Users,
      title: 'ISA support or replacement',
      problem: 'A small ISA team can’t respond fast enough or cover every channel.',
      controls: 'PAS handles first-touch volume and hands off only qualified leads.',
      outcome: 'Higher contact rate without growing headcount.',
    },
    {
      icon: Compass,
      title: 'Brokerage lead qualification',
      problem: 'Agents inherit raw leads with no budget or timeline captured.',
      controls: 'PAS captures intent, urgency, budget, timeline, and financing readiness.',
      outcome: 'Agents enter conversations with context, not a blank slate.',
    },
    {
      icon: Activity,
      title: 'Agent handoff visibility',
      problem: 'No-one knows what happened between a lead inquiry and the first agent call.',
      controls: 'Every PAS step is logged: who responded, when, what was said, what was booked.',
      outcome: 'Owners see the full path, not just the closing conversation.',
    },
    {
      icon: Database,
      title: 'CRM graveyard prevention',
      problem: '“Contacted” means anything. Leads rot in stages nobody checks.',
      controls: 'PAS keeps lead status tied to actual events, not subjective tags.',
      outcome: 'Pipeline reports reflect reality.',
    },
    {
      icon: AlertTriangle,
      title: 'High-intent lead routing',
      problem: 'Hot leads land in a round-robin and reach the wrong agent.',
      controls: 'PAS scores intent and routes by your brokerage’s rules.',
      outcome: 'Best-fit agent on the right lead, faster.',
    },
    {
      icon: Calendar,
      title: 'Appointment booking',
      problem: '“We talked once.” Then nothing on the calendar.',
      controls: 'PAS books directly into agent calendars with full context attached.',
      outcome: 'Booked appointments per week, measured weekly.',
    },
    {
      icon: FileSearch,
      title: 'Weekly intelligence reports',
      problem: 'Owners get a feel for the pipeline. Not a read on it.',
      controls: 'PAS Intelligence Reports surface objections, leakage, and routing patterns.',
      outcome: 'Operators run the brokerage on data, not vibes.',
    },
  ];

  return (
    <Section borderTop>
      <div style={{ maxWidth: 760, marginBottom: 40 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Use cases</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 44px)', margin: '14px 0 16px' }}>
          What PAS controls, in operator terms.
        </motion.h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {cases.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div key={c.title} {...fadeUp(0.04 * i)} className="card" style={{ padding: 26 }}>
              <Icon size={22} color="#5B3FD4" style={{ marginBottom: 12 }} />
              <h3 style={cardTitleStyle}>{c.title}</h3>
              <dl style={{ margin: 0 }}>
                <dt style={dtStyle}>Problem</dt>
                <dd style={ddStyle}>{c.problem}</dd>
                <dt style={dtStyle}>What PAS controls</dt>
                <dd style={ddStyle}>{c.controls}</dd>
                <dt style={dtStyle}>Outcome</dt>
                <dd style={{ ...ddStyle, color: '#0D9E6E' }}>{c.outcome}</dd>
              </dl>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── 10. PRICING TEASER ──────────────────────────────────────────────────────
function PricingTeaser() {
  const tiers = [
    { name: 'Starter', price: '$500', credits: '1,000 PAS Credits', for: 'Small teams testing PAS.' },
    { name: 'Growth', price: '$1,500', credits: '4,000 PAS Credits', for: 'Growing brokerages with active lead flow.', highlight: true },
    { name: 'Scale', price: '$3,500', credits: '12,000 PAS Credits', for: 'High-volume teams.' },
    { name: 'Enterprise', price: 'Custom', credits: 'Custom volume', for: 'Multi-office brokerages, CRM integrations, custom workflows, SLA.' },
  ];

  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 760, marginBottom: 40 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Pricing — early access</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(30px, 4vw, 44px)', margin: '14px 0 16px' }}>
          Priced against what leakage already costs you.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          ISA cost. Missed appointments. Wasted lead spend. PAS is priced as infrastructure, not a
          subscription experiment.
        </motion.p>
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
              padding: 26,
              boxShadow: t.highlight ? '0 0 0 4px rgba(91,63,212,0.08)' : '0 1px 2px rgba(15,23,42,0.04)',
              position: 'relative',
            }}
          >
            {t.highlight && (
              <span style={{ position: 'absolute', top: 14, right: 14, background: '#5B3FD4', color: '#fff', fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 999, padding: '3px 10px' }}>
                Most operators
              </span>
            )}
            <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: 8 }}>{t.name}</div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, lineHeight: 1, color: '#0F172A', marginBottom: 4 }}>
              {t.price}
              {t.price !== 'Custom' && <span style={{ fontSize: 14, color: '#94A3B8' }}>/mo</span>}
            </div>
            <div style={{ fontSize: 12, color: '#475569', marginBottom: 12 }}>{t.credits}</div>
            <p style={{ fontSize: 13.5, color: '#475569', margin: 0, lineHeight: 1.6 }}>{t.for}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Link to="/pricing" className="btn-primary">See full pricing <ArrowRight size={15} /></Link>
        <p style={{ fontSize: 13, color: '#475569', margin: 0, maxWidth: 480 }}>
          Deployment and setup fees vary based on lead volume, integrations, routing complexity,
          and onboarding needs.
        </p>
      </div>
    </Section>
  );
}

// ─── 11. BLOG TEASER ─────────────────────────────────────────────────────────
function BlogTeaser() {
  const posts = getRecentPosts(3);
  return (
    <Section borderTop>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
        <div>
          <Eyebrow>First-Contact Intelligence</Eyebrow>
          <h2 className="h-section" style={{ fontSize: 'clamp(28px, 3.8vw, 42px)', margin: '14px 0 0' }}>
            Field notes on lead conversion.
          </h2>
        </div>
        <Link to="/blog" className="btn-ghost">All posts <ArrowRight size={15} /></Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {posts.map((p, i) => (
          <motion.article key={p.slug} {...fadeUp(0.04 * i)} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5B3FD4', marginBottom: 10 }}>
              {p.category}
            </span>
            <h3 style={{ fontSize: 19, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: '#0F172A', margin: '0 0 10px', lineHeight: 1.35 }}>
              <Link to={`/blog/${p.slug}`} style={{ color: '#0F172A' }}>{p.title}</Link>
            </h3>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, margin: '0 0 18px', flex: 1 }}>
              {p.excerpt}
            </p>
            <Link to={`/blog/${p.slug}`} style={{ fontSize: 13, fontWeight: 600, color: '#5B3FD4', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Read post <ArrowRight size={14} />
            </Link>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

// ─── 12. NEWSLETTER ──────────────────────────────────────────────────────────
function NewsletterSection() {
  return (
    <Section background="surface" borderTop>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'center' }}>
        <div>
          <Eyebrow>Newsletter</Eyebrow>
          <h2 className="h-section" style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', margin: '14px 0 16px' }}>
            Get First-Contact Intelligence.
          </h2>
          <p className="lead">
            Weekly field notes on speed-to-lead, ISA failure, CRM graveyards, agent handoffs,
            after-hours leads, and the build of PAS.
          </p>
        </div>
        <Newsletter source="home" />
      </div>
    </Section>
  );
}

// ─── 13. FOUNDER THESIS ──────────────────────────────────────────────────────
function FounderThesis() {
  const timeline = [
    { label: 'More leads', tone: 'neutral' },
    { label: 'Scattered follow-up', tone: 'risk' },
    { label: 'Missed first contact', tone: 'risk' },
    { label: 'Structured response', tone: 'ok' },
    { label: 'PAS', tone: 'primary' },
  ];

  const paragraphs = [
    'When I started as a realtor, I thought the problem was simple: get more leads.',
    'So I chased leads. I used tools. I tested sources. I generated interest. And on paper, it looked like I had activity.',
    'But at the end of the week, I would look back and see 30, 40, sometimes 50+ leads sitting across calls, messages, forms, and follow-ups.',
    'The painful part was not that the leads didn’t exist. The painful part was realizing I had only spoken properly to a fraction of them.',
    'Not because I did not care. Because real estate first contact is messy.',
  ];

  const messy = [
    'A lead comes in while you are busy.',
    'Another one comes in after hours.',
    'Someone asks for details and disappears.',
    'Someone needs to be qualified but never gets asked the right questions.',
    'Someone should have been booked immediately, but instead gets left inside a CRM note.',
  ];

  const after = [
    'At first, I thought this was my problem. Then I saw it happen inside teams. Then inside brokerages.',
    'The pattern was the same: the brokerage did not always need more leads. It needed a faster, cleaner, more structured way to handle the first few minutes after a lead showed intent.',
    'That became the original thesis behind ORVN.',
    'Before PAS, I tested the idea manually through what I called an Automated Growth System: a structured process for making sure leads were responded to quickly, qualified properly, routed clearly, and moved toward a next step before intent died.',
  ];

  return (
    <Section borderTop>
      <div style={{ maxWidth: 760, marginBottom: 36 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Founder thesis</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(30px, 4.5vw, 52px)', margin: '14px 0 0' }}
        >
          I didn’t start with AI. I started with missed leads.
        </motion.h2>
      </div>

      <motion.div {...fadeUp(0.1)} style={{ marginBottom: 40 }}>
        <FlowDiagram label="The path that became ORVN" steps={timeline} />
      </motion.div>

      <div style={{ maxWidth: 720 }}>
        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            {...fadeUp(0.05 + i * 0.03)}
            style={{ fontSize: 17, lineHeight: 1.75, color: '#0F172A', margin: '0 0 18px' }}
          >
            {p}
          </motion.p>
        ))}

        <motion.ul
          {...fadeUp(0.2)}
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '8px 0 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
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

        {after.map((p, i) => (
          <motion.p
            key={i}
            {...fadeUp(0.05 + i * 0.03)}
            style={{ fontSize: 17, lineHeight: 1.75, color: '#0F172A', margin: '0 0 18px' }}
          >
            {p}
          </motion.p>
        ))}

        <motion.div
          {...fadeUp(0.15)}
          style={{
            background: '#F7F8FB',
            border: '1px solid #E5E8F0',
            borderLeft: '3px solid #5B3FD4',
            borderRadius: 12,
            padding: '20px 24px',
            margin: '8px 0 24px',
          }}
        >
          <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, lineHeight: 1.5, color: '#0F172A', margin: 0 }}>
            The lesson was simple: lead generation without first-contact infrastructure creates a
            bigger graveyard.
          </p>
        </motion.div>

        <motion.p {...fadeUp(0.18)} style={{ fontSize: 17, lineHeight: 1.75, color: '#0F172A', margin: '0 0 18px' }}>
          PAS is the productized version of that lesson.{' '}
          <strong style={{ color: '#0F172A' }}>PAS — Performative AI Superstaff</strong> is built
          to answer, qualify, route, book, and log inbound leads before delay kills conversion.
        </motion.p>

        <motion.p {...fadeUp(0.21)} style={{ fontSize: 17, lineHeight: 1.75, color: '#475569', margin: '0 0 32px' }}>
          Not because brokerages need another dashboard. Not because agents need more software. But
          because the gap between inquiry and qualified appointment is too expensive to leave to
          chance.
        </motion.p>

        <motion.div {...fadeUp(0.24)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
          <Link to="/scorecard" className="btn-primary">
            Run your lead leakage score <ArrowRight size={16} />
          </Link>
          <Link to="/test" className="btn-secondary">Test PAS</Link>
        </motion.div>

        <motion.p {...fadeUp(0.27)} style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
          Daniel Oyegoke — Founder, ORVN Labs.
        </motion.p>
      </div>
    </Section>
  );
}

// ─── 14. FAQ TEASER ──────────────────────────────────────────────────────────
function FAQTeaser() {
  const top = [
    { q: 'Is PAS a CRM?', a: 'No. PAS is first-contact infrastructure. It works before and around the CRM by answering, qualifying, routing, booking, and logging outcomes.' },
    { q: 'Does PAS replace agents?', a: 'No. PAS protects intent before agents enter. Agents still close trust.' },
    { q: 'Does PAS replace ISAs?', a: 'PAS can support or replace parts of the first-touch ISA function depending on brokerage workflow.' },
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
          <motion.div key={f.q} {...fadeUp(0.05 * i)} className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: '#0F172A', margin: '0 0 8px' }}>
              {f.q}
            </h3>
            <p style={cardBodyStyle}>{f.a}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── 15. FINAL CTA ───────────────────────────────────────────────────────────
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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          <motion.h2 {...fadeUp(0)} className="h-section" style={{ color: '#fff', fontSize: 'clamp(32px, 4.5vw, 56px)', margin: '0 0 16px' }}>
            Stop guessing where your leads die.
          </motion.h2>
          <motion.p {...fadeUp(0.05)} style={{ color: 'rgba(255,255,255,0.78)', fontSize: 17, lineHeight: 1.65, margin: '0 0 28px' }}>
            Take five minutes with the leakage scorecard, or test PAS on a real conversation. No
            calendar booking, no sales call.
          </motion.p>
          <motion.div {...fadeUp(0.1)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/calculators/leakage" className="btn-primary" style={{ background: '#fff', color: '#5B3FD4' }}>
              Run your lead leakage score <ArrowRight size={16} />
            </Link>
            <Link to="/demo" className="btn-secondary" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
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
  useDocumentMeta({
    path: '/',
  });
  return (
    <PageWrapper>
      <Hero />
      <Problem />
      <WhatIsFCI />
      <MeetPAS />
      <HowItWorks />
      <ControlRoom />
      <Intelligence />
      <CalculatorsTeaser />
      <UseCases />
      <PricingTeaser />
      <BlogTeaser />
      <NewsletterSection />
      <FounderThesis />
      <FAQTeaser />
      <FinalCTA />
    </PageWrapper>
  );
}

// ─── styles ──────────────────────────────────────────────────────────────────
const cardTitleStyle = {
  fontSize: 17,
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
  color: '#0F172A',
  margin: '0 0 8px',
};
const cardBodyStyle = {
  fontSize: 14,
  color: '#475569',
  lineHeight: 1.65,
  margin: 0,
};
const dtStyle = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#94A3B8',
  marginTop: 12,
  marginBottom: 4,
};
const ddStyle = {
  fontSize: 13.5,
  color: '#475569',
  lineHeight: 1.6,
  margin: 0,
};
const pullQuoteStyle = {
  background: '#fff',
  border: '1px solid #E5E8F0',
  borderLeft: '3px solid #5B3FD4',
  borderRadius: 12,
  padding: '20px 24px',
};
function visHiddenStyle(kind) {
  return {
    background: '#fff',
    border: kind === 'hidden' ? '1px solid #FECACA' : '1px solid #E5E8F0',
    borderRadius: 14,
    padding: 24,
  };
}
function visHeaderStyle() {
  return { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 };
}
function visLabelStyle() {
  return {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#475569',
    fontWeight: 600,
  };
}
function visListStyle(color) {
  return {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    fontSize: 14,
    color: color || '#0F172A',
  };
}
