import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
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
  CheckCircle2,
  Image as ImageIcon,
  Slack,
  Mail,
  Building2,
  Sparkles,
  Layers,
  Database,
  FileSearch,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import { useDocumentMeta } from '../lib/seo';
import { PAS_LINKS } from '../lib/pas';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut', delay },
});

const PAS_GITHUB_URL = 'https://github.com/goodnews2206/pas-engine';

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

// ─── BRAND HIERARCHY ──────────────────────────────────────────────────────
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
    <Section>
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
                <span style={mono('#94A3B8')}>{String(i + 1).padStart(2, '0')} · Layer</span>
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

// ─── WHAT PAS CONTROLS ──────────────────────────────────────────────────────
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
    <Section borderTop background="surface">
      <div style={{ maxWidth: 760, marginBottom: 36 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>The process</Eyebrow></motion.div>
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

// ─── HOW PAS WORKS ────────────────────────────────────────────────────────
function HowPASWorks() {
  const stages = [
    {
      key: 'detect',
      n: 1,
      icon: Eye,
      title: 'Detect',
      body: 'Captures intent, budget, timeline, objections, and callback requests as the call happens.',
    },
    {
      key: 'decide',
      n: 2,
      icon: GitBranch,
      title: 'Decide',
      body: 'Determines the right next step in real time: booking, callback, follow-up, or hand-off.',
    },
    {
      key: 'act',
      n: 3,
      icon: Zap,
      title: 'Act',
      body: 'Books on the calendar, schedules the callback, logs the workflow, and reports outcomes.',
    },
  ];

  return (
    <Section borderTop>
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
                  <span style={mono('#94A3B8')}>Step {String(s.n).padStart(2, '0')}</span>
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

// ─── CAPABILITIES ──────────────────────────────────────────────────────────
function Capabilities() {
  const caps = [
    { icon: Phone, label: 'Answers inbound calls', sub: 'Picks up every call, day or night.' },
    { icon: Compass, label: 'Qualifies buy / sell / rent', sub: 'Identifies what the lead actually wants.' },
    { icon: Activity, label: 'Captures intent, budget, timeline', sub: 'In writing, on the lead record. Not in someone’s head.' },
    { icon: ShieldCheck, label: 'Handles objections', sub: '“Just looking”, “not pre-approved”, “send links over email”.' },
    { icon: Calendar, label: 'Books appointments', sub: 'Direct to the agent calendar, with full context attached.' },
    { icon: Clock, label: 'Schedules callbacks', sub: 'When booking isn’t the right next step, the callback gets scheduled — not forgotten.' },
    { icon: ListChecks, label: 'Logs every call', sub: 'Outcome and transcript saved. Nothing lives in someone’s memory.' },
    { icon: GitBranch, label: 'Creates workflow timelines', sub: 'Each call becomes a record of what PAS detected, decided, and did.' },
    { icon: Bell, label: 'Sends Slack and email reports', sub: 'Outcomes show up where the team already works. No portal babysitting.' },
    { icon: BarChart3, label: 'Operational visibility', sub: 'Brokerages can see what happened, when, and why — without chasing it.' },
  ];

  return (
    <Section background="surface" borderTop>
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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

// ─── PRODUCT PROOF ──────────────────────────────────────────────────────────
function ProductProof() {
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
    <Section borderTop>
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
          The PAS engine lives in an open source repository. No vapor, no
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
            Read the code. Inspect the state machine, the workflow mapper, the reporting layer,
            and the test suites.
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
          <div style={{ ...mono('#94A3B8'), marginBottom: 14, fontSize: 11 }}>
            <Github size={14} style={{ marginRight: 4 }} /> github.com / goodnews2206 / pas-engine
          </div>
          <div style={{ color: '#A78BFA' }}>$ pas-engine</div>
          <div style={{ color: '#E2E8F0' }}>├── app/engine/state_machine.py</div>
          <div style={{ color: '#E2E8F0' }}>├── app/routes/simulate.py</div>
          <div style={{ color: '#E2E8F0' }}>├── app/services/notifications/</div>
          <div style={{ color: '#E2E8F0' }}>├── app/services/workflows/</div>
          <div style={{ color: '#E2E8F0' }}>└── tests/</div>
          <div style={{ color: '#475569', marginTop: 12 }}># detect → decide → act</div>
        </div>
      </motion.div>
    </Section>
  );
}

function Screenshot({ src, title, caption, delay }) {
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

// ─── CONTROL ROOM ────────────────────────────────────────────────────────────
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
    <Section borderTop background="surface">
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
    </Section>
  );
}

// ─── USE CASES ──────────────────────────────────────────────────────────────
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
    <Section borderTop>
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

      <motion.div {...fadeUp(0.1)} style={{ marginTop: 40, textAlign: 'center' }}>
        <Link to="/#pricing" className="btn-primary">View tailored pricing <ArrowRight size={16} /></Link>
      </motion.div>
    </Section>
  );
}

export default function PAS() {
  useDocumentMeta({
    title: 'PAS — First-Contact Infrastructure',
    description: 'Detailed systems, workflows, and capabilities of the Performative AI Superstaff.',
    path: '/pas',
  });

  return (
    <PageWrapper>
      <Section style={{ paddingTop: 'clamp(64px, 9vw, 112px)', paddingBottom: 0 }}>
        <div className="container-page">
          <motion.div {...fadeUp(0)}>
            <span className="pill" style={{ marginBottom: 22 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5B3FD4' }} />
              PAS — Performative AI Superstaff
            </span>
          </motion.div>
          <motion.h1
            {...fadeUp(0.05)}
            className="h-display"
            style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', marginBottom: 22 }}
          >
            The technical layer for <span style={{ color: '#5B3FD4' }}>brokerage intelligence.</span>
          </motion.h1>
          <p className="lead" style={{ maxWidth: 720 }}>
            PAS is not a chatbot or a simple IVR. It is the operating layer that controls the
            gap between inquiry and qualified appointment.
          </p>
        </div>
      </Section>

      <BrandHierarchy />
      <WhatPASControls />
      <HowPASWorks />
      <Capabilities />
      <ProductProof />
      <ControlRoom />
      <UseCases />
    </PageWrapper>
  );
}
