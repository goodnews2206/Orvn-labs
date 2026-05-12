import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Building2,
  Sparkles,
  Layers,
  Database,
  FileSearch,
  Users,
  ChevronDown,
  Terminal,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import { useDocumentMeta } from '../lib/seo';
import { PAS_LINKS } from '../lib/pas';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.21, 0.45, 0.32, 0.9], delay },
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

// ─── NEW: OPERATIONAL BACKGROUND ───────────────────────────────────────────
function OpBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: 0.4,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(91, 63, 212, 0.03) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <Section style={{ paddingTop: 'clamp(80px, 12vw, 160px)', position: 'relative' }}>
      <OpBackground />
      <div className="container-page" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div {...fadeUp(0)}>
          <span
            className="pill"
            style={{
              marginBottom: 28,
              background: '#fff',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#5B3FD4',
                animation: 'pulse 2s infinite',
              }}
            />
            PAS — Performative AI Superstaff
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.05)}
          className="h-display"
          style={{
            fontSize: 'clamp(44px, 7vw, 92px)',
            marginBottom: 28,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            fontWeight: 600,
          }}
        >
          The technical layer for <br />
          <span style={{ color: '#5B3FD4' }}>brokerage intelligence.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{
            maxWidth: 720,
            fontSize: 'clamp(18px, 2.2vw, 22px)',
            lineHeight: 1.6,
            color: '#475569',
            marginBottom: 48,
          }}
        >
          PAS is not a chatbot or a simple IVR. It is the operating layer that controls the gap
          between inquiry and qualified appointment.
        </motion.p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            marginTop: 40,
          }}
        >
          <motion.div
            {...fadeUp(0.15)}
            style={{
              padding: 32,
              background: '#fff',
              border: '1px solid #E2E8F0',
              borderRadius: 24,
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            }}
          >
            <div style={mono('#5B3FD4', 16)}>Core function</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#0F172A', lineHeight: 1.3 }}>
              Eliminating the delay between intent and response.
            </div>
          </motion.div>
          <motion.div
            {...fadeUp(0.2)}
            style={{
              padding: 32,
              background: '#0F172A',
              border: '1px solid #1E293B',
              borderRadius: 24,
              color: '#fff',
            }}
          >
            <div style={mono('#94A3B8', 16)}>System status</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 12px #10B981',
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Production Ready
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ─── BRAND HIERARCHY (AS ARCHITECTURE) ────────────────────────────────────
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
      ? { bg: '#5B3FD4', border: '#5B3FD4', icon: '#fff', label: '#fff', sub: '#C7BCF5' }
      : t === 'ok'
      ? { bg: '#F8FAFC', border: '#E2E8F0', icon: '#5B3FD4', label: '#0F172A', sub: '#64748B' }
      : { bg: '#F1F5F9', border: '#E2E8F0', icon: '#475569', label: '#0F172A', sub: '#64748B' };

  return (
    <Section borderTop background="surface">
      <div style={{ maxWidth: 840, marginBottom: 64 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Brand hierarchy</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', margin: '20px 0 0' }}
        >
          One company. One flagship system. One category.
        </motion.h2>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Connection Line */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '5%',
            right: '5%',
            height: 1,
            background: '#E2E8F0',
            zIndex: 0,
            display: 'none',
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {tiers.map((t, i) => {
            const c = map(t.tone);
            const Icon = t.icon;
            return (
              <motion.div
                key={t.label}
                {...fadeUp(0.05 + i * 0.1)}
                style={{
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  borderRadius: 32,
                  padding: 'clamp(32px, 5vw, 40px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                  boxShadow: t.tone === 'primary' ? '0 20px 40px -10px rgba(91, 63, 212, 0.2)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: t.tone === 'primary' ? 'rgba(255,255,255,0.1)' : '#fff',
                      border: t.tone === 'primary' ? '1px solid rgba(255,255,255,0.2)' : '1px solid #E2E8F0',
                      color: c.icon,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={24} />
                  </span>
                  <span style={mono(t.tone === 'primary' ? '#C7BCF5' : '#94A3B8')}>
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: c.label,
                      marginBottom: 8,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {t.label}
                  </div>
                  <div style={{ fontSize: 14, color: c.sub, marginBottom: 16, fontWeight: 500 }}>
                    {t.role}
                  </div>
                  <p
                    style={{
                      fontSize: 16,
                      color: t.tone === 'primary' ? 'rgba(255,255,255,0.85)' : '#1E293B',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {t.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─── THE PROCESS (SIX MOVEMENTS AS A PIPELINE) ─────────────────────────────
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
      <div style={{ maxWidth: 840, marginBottom: 64 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>The process</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', margin: '20px 0 24px' }}
        >
          Six movements. One operating layer.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 20px)', color: '#475569' }}
        >
          Every inbound lead moves through the same six steps. PAS controls all of them — so the
          first conversation starts with structure, not guesswork.
        </motion.p>
      </div>

      <div style={{ position: 'relative', padding: '0 20px' }}>
        {/* The Pipeline Spine */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            right: 20,
            top: 48,
            height: 2,
            background: 'linear-gradient(90deg, #E2E8F0 0%, #5B3FD4 50%, #E2E8F0 100%)',
            zIndex: 0,
            opacity: 0.3,
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 40,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              {...fadeUp(0.1 + i * 0.05)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#fff',
                  border: '2px solid #5B3FD4',
                  color: '#5B3FD4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  fontWeight: 700,
                  boxShadow: '0 0 20px rgba(91, 63, 212, 0.15)',
                }}
              >
                {s.n}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#0F172A',
                    marginBottom: 10,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.label}
                </div>
                <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── HOW PAS WORKS (OPERATIONAL STAGES) ───────────────────────────────────
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
    <Section borderTop background="surface">
      <div style={{ maxWidth: 840, marginBottom: 56 }}>
        <motion.div {...fadeUp(0)}>
          <Eyebrow>How PAS works</Eyebrow>
        </motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', margin: '20px 0 24px' }}
        >
          PAS detects what happened, decides the next step, and acts.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 20px)', color: '#475569' }}
        >
          Three movements per inbound lead. PAS owns all three so the next step doesn’t depend on
          someone remembering to follow up.
        </motion.p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 1,
          background: '#E2E8F0',
          borderRadius: 32,
          overflow: 'hidden',
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 50px -12px rgba(15, 23, 42, 0.08)',
        }}
      >
        {stages.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.key}
              {...fadeUp(0.1 * i)}
              style={{
                background: '#fff',
                padding: 'clamp(32px, 6vw, 48px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: '#F5F3FF',
                    color: '#5B3FD4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={28} />
                </div>
                <span style={mono('#94A3B8')}>Stage 0{s.n}</span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    color: '#0F172A',
                    marginBottom: 12,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.title}
                </div>
                <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  {s.body}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── CAPABILITIES (THE INTELLIGENCE FEED) ──────────────────────────────────
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
    <Section borderTop>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)',
          gap: 'clamp(40px, 8vw, 80px)',
          alignItems: 'start',
        }}
      >
        <div style={{ position: 'sticky', top: 120 }}>
          <motion.div {...fadeUp(0)}><Eyebrow>Capabilities</Eyebrow></motion.div>
          <motion.h2
            {...fadeUp(0.05)}
            className="h-section"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', margin: '20px 0 24px' }}
          >
            What PAS does on every inbound lead.
          </motion.h2>
          <motion.p
            {...fadeUp(0.1)}
            className="lead"
            style={{ fontSize: 18, color: '#475569', lineHeight: 1.6 }}
          >
            A complete first-contact loop — from the moment the call comes in to the moment the
            team has the next step in Slack or email.
          </motion.p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {caps.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                {...fadeUp(0.05 * i)}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 20,
                  padding: 24,
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#fff',
                    border: '1px solid #E2E8F0',
                    color: '#5B3FD4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>
                    {c.label}
                  </div>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    {c.sub}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─── PRODUCT PROOF (THE TERMINAL) ─────────────────────────────────────────
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
    <Section borderTop background="surface">
      <div style={{ maxWidth: 840, marginBottom: 56 }}>
        <motion.div {...fadeUp(0)}>
          <Eyebrow>Product proof</Eyebrow>
        </motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', margin: '20px 0 24px' }}
        >
          PAS is real, in code, and shippable.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 20px)', color: '#475569' }}
        >
          The PAS engine lives in an open source repository. No vapor, no slides. The product is
          the codebase.
        </motion.p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 24,
          marginBottom: 40,
        }}
      >
        {screenshots.map((s, i) => (
          <Screenshot key={s.key} src={s.src} title={s.title} caption={s.caption} delay={i * 0.1} />
        ))}
      </div>

      <motion.div
        {...fadeUp(0.2)}
        style={{
          background: '#0F172A',
          borderRadius: 32,
          overflow: 'hidden',
          border: '1px solid #1E293B',
          boxShadow: '0 30px 60px -15px rgba(0,0,0,0.4)',
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            background: '#1E293B',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
          </div>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: '#94A3B8',
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <Terminal size={14} />
            pas-engine — bash
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            padding: 'clamp(24px, 4vw, 48px)',
            gap: 40,
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <Github size={24} color="#fff" />
              <div style={{ color: '#fff', fontSize: 20, fontWeight: 600 }}>pas-engine</div>
            </div>
            <p
              style={{
                color: '#94A3B8',
                fontSize: 16,
                lineHeight: 1.6,
                marginBottom: 32,
                maxWidth: 440,
              }}
            >
              Read the code. Inspect the state machine, the workflow mapper, the reporting layer,
              and the test suites.
            </p>
            <a
              href={PAS_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ background: '#5B3FD4', borderColor: '#5B3FD4', padding: '14px 28px' }}
            >
              <Github size={18} /> View repository
            </a>
          </div>

          <div
            style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 16,
              padding: 24,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              lineHeight: 1.8,
              color: '#E2E8F0',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ color: '#A78BFA', marginBottom: 12 }}>$ tree pas-engine/</div>
            <div style={{ color: '#94A3B8' }}>├── app/engine/state_machine.py</div>
            <div style={{ color: '#94A3B8' }}>├── app/routes/simulate.py</div>
            <div style={{ color: '#94A3B8' }}>├── app/services/notifications/</div>
            <div style={{ color: '#94A3B8' }}>├── app/services/workflows/</div>
            <div style={{ color: '#94A3B8' }}>└── tests/</div>
            <div style={{ color: '#475569', marginTop: 12 }}># detect → decide → act</div>
            <div
              style={{
                marginTop: 20,
                padding: '12px 16px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: 8,
                color: '#10B981',
                fontSize: 12,
              }}
            >
              ✓ 142 tests passed in 0.4s
            </div>
          </div>
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
        border: '1px solid #E2E8F0',
        borderRadius: 24,
        padding: 12,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
      }}
    >
      <div
        style={{
          background: '#F8FAFC',
          borderRadius: 16,
          aspectRatio: '16 / 10',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          border: '1px solid #F1F5F9',
        }}
      >
        {errored ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              color: '#94A3B8',
              ...mono(),
            }}
          >
            <ImageIcon size={24} />
            <span>{src}</span>
          </div>
        ) : (
          <img
            src={src}
            alt={title}
            onError={() => setErrored(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
      <figcaption style={{ padding: '0 12px 12px' }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', marginBottom: 6 }}>
          {title}
        </div>
        <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.5 }}>{caption}</div>
      </figcaption>
    </motion.figure>
  );
}

// ─── CONTROL ROOM (NOC DASHBOARD) ─────────────────────────────────────────
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
      <div style={{ maxWidth: 840, marginBottom: 56 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>PAS Control Room</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)', margin: '20px 0 24px' }}
        >
          The dashboard is the control room — not another daily workload.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 20px)', color: '#475569' }}
        >
          The dashboard is not the product. It shows what the infrastructure already controlled —
          where leads moved, where they stalled, where they died.
        </motion.p>
      </div>

      <motion.div
        {...fadeUp(0.15)}
        style={{
          background: '#0F172A',
          borderRadius: 32,
          overflow: 'hidden',
          border: '1px solid #1E293B',
          boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            background: '#1E293B',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            borderBottom: '1px solid #334155',
          }}
        >
          <div
            className="animate-pulse"
            style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }}
          />
          <span style={mono('#94A3B8')}>NOC · Operational Pulse</span>
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#475569',
            }}
          >
            Live view · Real-time
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            background: '#1E293B',
            gap: 1,
          }}
        >
          {cards.map((c, i) => (
            <div key={c.label} style={{ background: '#0F172A', padding: '32px' }}>
              <div style={mono('#475569', 12)}>{c.label}</div>
              <div
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 48,
                  lineHeight: 1,
                  color:
                    c.tone === 'ok'
                      ? '#10B981'
                      : c.tone === 'warn'
                      ? '#F59E0B'
                      : c.tone === 'primary'
                      ? '#A78BFA'
                      : '#fff',
                  margin: '8px 0 12px',
                }}
              >
                {c.value}
              </div>
              <div style={{ fontSize: 13, color: '#64748B' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '32px', background: '#0F172A', borderTop: '1px solid #1E293B' }}>
          <div style={{ ...mono('#475569'), marginBottom: 20 }}>
            Structured Intelligence Stream
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {intel.map((it) => (
              <span
                key={it}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 100,
                  padding: '8px 16px',
                  fontSize: 12,
                  color: '#94A3B8',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {it}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

// ─── USE CASES ────────────────────────────────────────────────────────────
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
      <div style={{ maxWidth: 840, marginBottom: 56 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Use cases</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(32px, 4vw, 52px)', margin: '20px 0 0' }}
        >
          What PAS controls, in operator terms.
        </motion.h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 20,
        }}
      >
        {cases.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              {...fadeUp(0.05 * i)}
              style={{
                background: '#fff',
                border: '1px solid #E2E8F0',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: '#F5F3FF',
                  color: '#5B3FD4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={20} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#0F172A',
                    margin: '0 0 8px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {c.title}
                </h3>
                <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  {c.body}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div {...fadeUp(0.1)} style={{ marginTop: 64, textAlign: 'center' }}>
        <Link to="/#pricing" className="btn-primary" style={{ padding: '16px 32px' }}>
          View tailored pricing <ArrowRight size={20} />
        </Link>
      </motion.div>
    </Section>
  );
}

// ─── WAITLIST SIGNUP ──────────────────────────────────────────────────────
function WaitlistSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'product_waitlist' }),
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
      <Section background="surface" borderTop>
        <div
          style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: 32,
            padding: 'clamp(40px, 8vw, 64px)',
            textAlign: 'center',
            maxWidth: 800,
            margin: '0 auto',
          }}
        >
          <CheckCircle2 size={48} color="#0D9E6E" style={{ margin: '0 auto 24px' }} />
          <h3
            style={{
              color: '#065F46',
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            You're on the list.
          </h3>
          <p style={{ color: '#065F46', fontSize: 17, margin: '12px 0 0' }}>
            We'll notify you as soon as a slot opens for your brokerage.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section background="surface" borderTop>
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
          background: '#fff',
          padding: 'clamp(48px, 10vw, 96px) clamp(24px, 5vw, 48px)',
          borderRadius: 48,
          border: '1px solid #E2E8F0',
          boxShadow: '0 40px 80px -20px rgba(15, 23, 42, 0.05)',
        }}
      >
        <motion.div {...fadeUp(0)}><Eyebrow>Join the waitlist</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)', margin: '20px 0 24px' }}
        >
          Early access is limited.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ marginBottom: 48, maxWidth: 640, margin: '0 auto 48px' }}
        >
          We are currently onboarding brokerages in cohorts to ensure high-touch implementation.
          Join the waitlist to secure your spot.
        </motion.p>

        <motion.form
          {...fadeUp(0.15)}
          onSubmit={submit}
          style={{
            display: 'flex',
            gap: 12,
            maxWidth: 540,
            margin: '0 auto',
            flexWrap: 'wrap',
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
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: 16,
              padding: '18px 24px',
              fontSize: 16,
              outline: 'none',
              transition: 'all 0.2s ease',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary"
            style={{ padding: '18px 32px', fontSize: 16 }}
          >
            {status === 'loading' ? 'Joining...' : 'Join Waitlist'} <ArrowRight size={20} />
          </button>
        </motion.form>
        {status === 'error' && (
          <p style={{ color: '#DC2626', fontSize: 14, marginTop: 16, fontWeight: 500 }}>
            Something went wrong. Please try again or email hello@orvnlabs.com.
          </p>
        )}
      </div>
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
      <Hero />
      <BrandHierarchy />
      <WhatPASControls />
      <HowPASWorks />
      <Capabilities />
      <ProductProof />
      <ControlRoom />
      <UseCases />
      <WaitlistSignup />
    </PageWrapper>
  );
}
