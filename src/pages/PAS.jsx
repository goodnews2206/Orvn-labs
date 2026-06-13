import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Calendar,
  Compass,
  Activity,
  ShieldCheck,
  Users,
  Database,
  ListChecks,
  Check,
  X,
  Brain,
  Eye,
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
  transition: { duration: 0.5, delay },
});

function Hero() {
  return (
    <section style={{ padding: 'clamp(56px, 7vw, 96px) 0 clamp(40px, 5vw, 64px)', background: '#fff' }}>
      <div className="container-page">
        <motion.div {...fadeUp(0)}>
          <Eyebrow>The product</Eyebrow>
        </motion.div>
        <motion.h1 {...fadeUp(0.05)} className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 68px)', margin: '14px 0 18px', maxWidth: 880 }}>
          PAS — <span style={{ color: '#5B3FD4' }}>Performative AI Superstaff</span>.
        </motion.h1>
        <motion.p {...fadeUp(0.1)} className="lead" style={{ maxWidth: 720, marginBottom: 28 }}>
          PAS is the first ORVN system. It controls the first-contact layer for real estate
          brokerages — the operating layer between inquiry and qualified appointment.
        </motion.p>
        <motion.div {...fadeUp(0.15)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
          <Link to="/demo" className="btn-primary">Test PAS <ArrowRight size={16} /></Link>
          <Link to="/calculators/leakage" className="btn-secondary">Run leakage scorecard</Link>
        </motion.div>
      </div>
    </section>
  );
}

function Capabilities() {
  const rows = [
    { icon: Phone, label: 'Answer inbound leads', detail: 'Voice, SMS, chat — whichever channel the lead used.' },
    { icon: Compass, label: 'Qualify intent', detail: 'Buy or sell, stage, urgency, financing readiness.' },
    { icon: Activity, label: 'Capture budget & timeline', detail: 'In writing, on the lead record. Not in a rep’s head.' },
    { icon: ShieldCheck, label: 'Handle basic objections', detail: '“Just browsing”, “Sending links over email”, “Not pre-approved yet”.' },
    { icon: Users, label: 'Route to the right agent', detail: 'By price band, neighborhood, language, agent specialty — your rules.' },
    { icon: Calendar, label: 'Book appointments', detail: 'Directly into agent calendars with full context attached.' },
    { icon: ListChecks, label: 'Log the outcome', detail: 'Status reflects what actually happened, not a subjective tag.' },
    { icon: Database, label: 'Create brokerage intelligence', detail: 'Patterns across leads — top objections, where leads stall, what works.' },
  ];

  return (
    <Section background="surface" borderTop>
      <motion.div {...fadeUp(0)}><Eyebrow>What PAS controls</Eyebrow></motion.div>
      <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '14px 0 28px', maxWidth: 720 }}>
        Eight movements. One operating layer.
      </motion.h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        {rows.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div key={r.label} {...fadeUp(0.04 * i)} className="card" style={{ padding: 24 }}>
              <span style={{ display: 'inline-flex', width: 38, height: 38, borderRadius: 9, background: '#EEEAFB', color: '#5B3FD4', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <Icon size={18} />
              </span>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: '0 0 6px', fontFamily: "'Inter', sans-serif" }}>{r.label}</h3>
              <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.65, margin: 0 }}>{r.detail}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

function Channels() {
  const items = [
    { icon: Phone, name: 'Voice', desc: 'Answers inbound calls. Live qualification. Live routing or booking.' },
    { icon: MessageSquare, name: 'SMS / chat', desc: 'Replies in seconds. Continues the conversation as the lead does.' },
    { icon: Mail, name: 'Email', desc: 'Picks up form submissions. Replies with structured qualification.' },
  ];
  return (
    <Section borderTop>
      <Eyebrow>Channels</Eyebrow>
      <h2 className="h-section" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '14px 0 24px', maxWidth: 720 }}>
        PAS works wherever the lead lands.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.div key={it.name} {...fadeUp(0.05 * i)} className="card" style={{ padding: 24 }}>
              <Icon size={22} color="#5B3FD4" style={{ marginBottom: 12 }} />
              <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0F172A', margin: '0 0 6px', fontFamily: "'Inter', sans-serif" }}>{it.name}</h3>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, margin: 0 }}>{it.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

function Anatomy() {
  const turns = [
    { who: 'pas', text: "Hey Sarah — thanks for reaching out about 412 Pine. Are you currently looking to buy, also open to selling, or just gathering information?" },
    { who: 'lead', text: 'Mostly looking to buy. Maybe in the next two months.' },
    { who: 'pas', text: 'Got it. Are you working with another agent right now, or is this your first conversation?' },
    { who: 'lead', text: 'First conversation — open to options.' },
    { who: 'pas', text: 'Roughly what price range works for you, and is financing already in place or still in progress?' },
    { who: 'lead', text: 'Around $450k. Pre-approval should be done in two weeks.' },
    { who: 'pas', text: 'Helpful. I’ll book you a call this week with Jordan, who covers the north side. Thursday 2pm or Friday 10am — which works?' },
    { who: 'lead', text: 'Thursday 2pm.' },
  ];

  return (
    <Section background="surface" borderTop>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'start' }}>
        <div>
          <Eyebrow>Anatomy of a PAS conversation</Eyebrow>
          <h2 className="h-section" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '14px 0 16px' }}>
            What “qualified” actually looks like.
          </h2>
          <p className="lead" style={{ marginBottom: 16 }}>
            One inbound, eight turns, fully captured. Budget, timeline, financing, agent
            assignment, appointment — all in writing on the lead record.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Budget captured',
              'Timeline captured',
              'Financing readiness captured',
              'Agent matched to north-side specialty',
              'Appointment booked',
              'CRM updated automatically',
            ].map((t) => (
              <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#0F172A' }}>
                <Check size={16} color="#0D9E6E" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0D9E6E' }} className="animate-blink" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569' }}>
              PAS · sample conversation
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {turns.map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: t.who === 'pas' ? 'flex-start' : 'flex-end' }}>
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '10px 14px',
                    borderRadius: t.who === 'pas' ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
                    background: t.who === 'pas' ? '#fff' : '#5B3FD4',
                    color: t.who === 'pas' ? '#0F172A' : '#fff',
                    border: t.who === 'pas' ? '1px solid #E5E8F0' : 'none',
                    fontSize: 13.5,
                    lineHeight: 1.55,
                  }}
                >
                  {t.text}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: '10px 14px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 10, fontSize: 13, color: '#065F46', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calendar size={14} /> Appointment booked · Thursday 2pm · Jordan
          </div>
        </div>
      </div>
    </Section>
  );
}

function Routing() {
  return (
    <Section borderTop>
      <Eyebrow>Routing</Eyebrow>
      <h2 className="h-section" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '14px 0 24px', maxWidth: 720 }}>
        Your rules. PAS enforces them.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {[
          { title: 'Geography', body: 'Route by neighborhood, zip, or service area. Hand-offs respect agent territories.' },
          { title: 'Price band', body: 'Match leads to agents who consistently close in that band.' },
          { title: 'Language', body: 'Route to bilingual agents when the lead engages in another language.' },
          { title: 'Agent specialty', body: 'New construction, luxury, first-time buyers, investors — your taxonomy.' },
          { title: 'Round-robin fallback', body: 'When no rule matches, distribute fairly with full context attached.' },
          { title: 'Escalation', body: 'High-intent or high-value leads can skip the queue and notify a team lead.' },
        ].map((r, i) => (
          <motion.div key={r.title} {...fadeUp(0.04 * i)} className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: '0 0 6px', fontFamily: "'Inter', sans-serif" }}>{r.title}</h3>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65, margin: 0 }}>{r.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Compare() {
  const rows = [
    { metric: 'Response time', isa: '15 minutes – several hours', pas: 'Under 30 seconds — every channel' },
    { metric: 'Hours covered', isa: '~45 / week per ISA', pas: '24 / 7 / 365 — no gaps' },
    { metric: 'Qualification consistency', isa: 'Varies by rep, day, mood', pas: 'Same intake every time, in writing' },
    { metric: 'CRM hygiene', isa: 'Manual, often skipped', pas: 'Automatic — status tied to events' },
    { metric: 'Routing rules', isa: 'Trained, sometimes followed', pas: 'Enforced on every lead' },
    { metric: 'After-hours coverage', isa: 'Voicemail / next day', pas: 'Active conversation, booked next-day appt' },
    { metric: 'Cost structure', isa: 'Salary + benefits + turnover', pas: 'PAS Credits, scales with usage' },
    { metric: 'Replaces agents', isa: 'No', pas: 'No — PAS protects intent before agents enter' },
  ];

  return (
    <Section background="surface" borderTop>
      <Eyebrow>PAS vs traditional ISA</Eyebrow>
      <h2 className="h-section" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '14px 0 24px', maxWidth: 720 }}>
        The honest comparison.
      </h2>
      <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid #E5E8F0', borderRadius: 14 }}>
        <table style={{ width: '100%', minWidth: 720, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F7F8FB', borderBottom: '1px solid #E5E8F0' }}>
              <th style={thStyle}>Metric</th>
              <th style={thStyle}>Human ISA</th>
              <th style={{ ...thStyle, color: '#5B3FD4', background: '#EEEAFB' }}>PAS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.metric} style={{ borderBottom: '1px solid #F1F3F9' }}>
                <td style={tdLabel}>{r.metric}</td>
                <td style={tdStyle}>{r.isa}</td>
                <td style={{ ...tdStyle, background: '#FBFAFE', color: '#0F172A', fontWeight: 500 }}>{r.pas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 13, color: '#475569', marginTop: 16 }}>
        PAS is not a replacement for skilled agents. It is the layer that protects intent so agents
        spend their time on real conversations.
      </p>
    </Section>
  );
}

function CreditsAndIntegrations() {
  return (
    <Section borderTop>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 5vw, 56px)' }}>
        <div>
          <Eyebrow>PAS Credits</Eyebrow>
          <h3 className="h-section" style={{ fontSize: 'clamp(24px, 3vw, 32px)', margin: '14px 0 12px' }}>
            Usage measured in PAS Credits.
          </h3>
          <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.7 }}>
            One credit roughly maps to one unit of work — answered call minute, qualification turn,
            routing decision, booking, intelligence record. Plans bundle credits monthly. Overage is
            billed transparently. No surprise charges.
          </p>
          <Link to="/pricing" className="btn-secondary" style={{ marginTop: 18 }}>See pricing & credits</Link>
        </div>

        <div>
          <Eyebrow>How it sits in your stack</Eyebrow>
          <h3 className="h-section" style={{ fontSize: 'clamp(24px, 3vw, 32px)', margin: '14px 0 12px' }}>
            Around the CRM, not on top of it.
          </h3>
          <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.7, marginBottom: 14 }}>
            PAS handles the first-contact movements. Your CRM remains the system of record. PAS
            writes status, lead context, and outcomes back so the CRM reflects what actually
            happened.
          </p>
          <FlowDiagram
            label="The shape of the integration"
            steps={[
              { label: 'Inbound channel', tone: 'neutral' },
              { label: 'PAS', tone: 'primary' },
              { label: 'Your CRM', tone: 'ok' },
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

function Compliance() {
  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 760 }}>
        <Eyebrow>Compliance posture</Eyebrow>
        <h2 className="h-section" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '14px 0 16px' }}>
          Built to qualify on intent, not on protected traits.
        </h2>
        <p className="lead" style={{ marginBottom: 18 }}>
          PAS qualifies leads on intent, budget, timeline, location/property interest, availability,
          and consent. It does not ask for or qualify on race, color, religion, sex, national
          origin, familial status, or disability. Fair Housing guardrails are non-negotiable.
        </p>
        <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7 }}>
          Call recording, transcripts, and consent disclosures are detailed in the{' '}
          <Link to="/legal/ai-disclosure" style={{ color: '#5B3FD4', fontWeight: 500 }}>
            AI / Call Recording Disclosure
          </Link>{' '}
          and{' '}
          <Link to="/legal/fair-housing" style={{ color: '#5B3FD4', fontWeight: 500 }}>
            Fair Housing Compliance
          </Link>{' '}
          pages.
        </p>
      </div>
    </Section>
  );
}

// ── PAS Brain / brokerage memory (C4) ──
function BrainMemory() {
  return (
    <Section borderTop>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(32px, 5vw, 56px)', alignItems: 'start' }}>
        <div>
          <motion.div {...fadeUp(0)}><Eyebrow>Brokerage memory · PAS Brain</Eyebrow></motion.div>
          <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '14px 0 0' }}>
            Your brokerage doesn’t have a memory. It has a dozen people who can leave.
          </motion.h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <motion.div {...fadeUp(0.05)} className="card" style={{ padding: 24, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ display: 'inline-flex', width: 38, height: 38, borderRadius: 9, background: '#FEF2F2', color: '#DC2626', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users size={18} />
            </span>
            <p style={{ fontSize: 15, color: '#0F172A', lineHeight: 1.7, margin: 0 }}>
              By default, what your brokerage knows lives in individual heads, inboxes, call logs,
              and a CRM nobody fully updates. When someone leaves, that knowledge leaves with them —
              and the operation resets.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="card" style={{ padding: 24, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ display: 'inline-flex', width: 38, height: 38, borderRadius: 9, background: '#EEEAFB', color: '#5B3FD4', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Brain size={18} />
            </span>
            <p style={{ fontSize: 15, color: '#0F172A', lineHeight: 1.7, margin: 0 }}>
              PAS preserves what happened across the first-contact layer: every lead, every response
              attempt, every outcome — held in the operation, not in a person. When people leave, the
              operational record stays.
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ── Operational visibility (C5) ──
function OperationalVisibility() {
  const items = [
    'When the lead arrived',
    'Whether a response was attempted, and how fast',
    'The conversation outcome',
    'The qualification result',
    'Who it was routed to',
    'Whether it was booked',
    'The follow-up state',
    'If it didn’t convert, the reason it was lost, went cold, or stayed unresponsive',
  ];
  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 760, marginBottom: 28 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Operational visibility</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '14px 0 16px' }}>
          Operational visibility is not a list of what people say they did.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead">
          Real visibility is being able to see what actually happened to every lead — not
          self-reported activity. For each inbound lead, PAS is built to show:
        </motion.p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {items.map((it, i) => (
          <motion.div key={it} {...fadeUp(0.04 * i)} className="card" style={{ padding: 20, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <Eye size={18} color="#5B3FD4" style={{ flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 14, color: '#0F172A', lineHeight: 1.6 }}>{it}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ── Founder (C6) ──
function Founder() {
  return (
    <Section borderTop>
      <div style={{ maxWidth: 760 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Founder</Eyebrow></motion.div>
        <motion.h2 {...fadeUp(0.05)} className="h-section" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', margin: '14px 0 18px' }}>
          Built from the operational gap most brokerages normalize.
        </motion.h2>
        <motion.p {...fadeUp(0.08)} style={{ fontSize: 16, color: '#0F172A', lineHeight: 1.75, margin: '0 0 16px' }}>
          ORVN Labs was founded by Daniel Oyegoke. PAS came out of studying the same brokerage
          failures repeating across the industry: delayed first response, weak and inconsistent
          follow-up, an operation that depends on whether a specific person is available, CRM
          graveyards full of leads nobody worked, and institutional memory that walks out the door
          when people leave.
        </motion.p>
        <motion.p {...fadeUp(0.1)} style={{ fontSize: 16, color: '#0F172A', lineHeight: 1.75, margin: '0 0 16px' }}>
          PAS is the layer built to close that gap — answering, qualifying, routing, booking, and
          remembering first contact, so intent isn’t lost to human delay and knowledge isn’t lost to
          turnover.
        </motion.p>
        <motion.p {...fadeUp(0.12)} style={{ fontSize: 16, color: '#0F172A', lineHeight: 1.75, margin: '0 0 24px' }}>
          We’re early, and we’re building in the open. If you run a brokerage and these failures
          sound like your operation, I’d like to talk.
        </motion.p>
        <motion.div {...fadeUp(0.14)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="mailto:hello@orvnlabs.com?subject=ORVN%20—%20book%20a%20call" className="btn-primary">
            Book a call <ArrowRight size={15} />
          </a>
          <span style={{ fontSize: 13, color: '#94A3B8' }}>Daniel Oyegoke — Founder, ORVN Labs</span>
        </motion.div>
      </div>
    </Section>
  );
}

function CTA() {
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
        <h2 className="h-section" style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 48px)', margin: '0 0 14px' }}>
          See PAS run on a real conversation.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 1.65, margin: '0 0 24px' }}>
          90 seconds. No signup. No calendar booking.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/demo" className="btn-primary" style={{ background: '#fff', color: '#5B3FD4' }}>
            Test PAS <ArrowRight size={16} />
          </Link>
          <Link to="/pricing" className="btn-secondary" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
            See pricing
          </Link>
          <a href={PAS_LINKS.earlyAccess} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ color: '#fff' }}>
            Apply for early access
          </a>
        </div>
      </div>
    </Section>
  );
}

export default function PAS() {
  useDocumentMeta({
    title: 'PAS — Performative AI Superstaff',
    description:
      'PAS is the flagship ORVN system. It controls the first-contact layer for real estate brokerages: answering, qualifying, routing, booking, and logging inbound leads.',
    path: '/pas',
  });
  return (
    <PageWrapper>
      <Hero />
      <Capabilities />
      <BrainMemory />
      <Channels />
      <Anatomy />
      <OperationalVisibility />
      <Routing />
      <Compare />
      <CreditsAndIntegrations />
      <Compliance />
      <Founder />
      <CTA />
    </PageWrapper>
  );
}

const thStyle = {
  textAlign: 'left',
  padding: '14px 18px',
  fontSize: 12,
  fontFamily: "'JetBrains Mono', monospace",
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#475569',
  fontWeight: 600,
};
const tdStyle = {
  padding: '14px 18px',
  fontSize: 14,
  color: '#475569',
};
const tdLabel = {
  ...tdStyle,
  color: '#0F172A',
  fontWeight: 500,
  width: '28%',
};
