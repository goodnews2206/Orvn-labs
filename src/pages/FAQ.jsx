import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import { useDocumentMeta } from '../lib/seo';

const FAQS = [
  {
    q: 'Is PAS a CRM?',
    a: (
      <p>
        No. PAS is first-contact infrastructure. It works before and around the CRM by answering,
        qualifying, routing, booking, and logging outcomes. Your CRM remains the system of record.
      </p>
    ),
  },
  {
    q: 'Does PAS replace agents?',
    a: <p>No. PAS protects intent before agents enter. Agents still close trust.</p>,
  },
  {
    q: 'Does PAS replace ISAs?',
    a: (
      <p>
        PAS can support or replace parts of the first-touch ISA function depending on brokerage
        workflow. Many brokerages run PAS alongside a smaller ISA team that handles the hardest
        conversations.
      </p>
    ),
  },
  {
    q: 'What happens when a lead wants a human?',
    a: <p>PAS routes or transfers according to brokerage rules — by territory, price band, language, agent specialty, or escalation logic.</p>,
  },
  {
    q: 'Can PAS work after hours?',
    a: <p>Yes. PAS is designed to protect after-hours intent. Inquiries between 7pm and 9am are usually a brokerage’s highest-intent leads — and the most likely to leak.</p>,
  },
  {
    q: 'What are PAS Credits?',
    a: (
      <p>
        PAS Credits measure usage across calls, minutes, qualification, routing, booking, and
        intelligence records. Plans bundle credits monthly. Overage is billed transparently. See{' '}
        <Link to="/pricing" style={{ color: '#5B3FD4' }}>pricing</Link>.
      </p>
    ),
  },
  {
    q: 'Is pricing fixed?',
    a: (
      <p>
        Early access pricing depends on volume, deployment needs, and integrations. Tiers are a
        starting point — Enterprise quotes are based on actual usage and routing complexity.
      </p>
    ),
  },
  {
    q: 'What data does PAS collect?',
    a: (
      <p>
        PAS may process lead contact information, call transcripts and summaries, booking details,
        routing outcomes, and usage data. Full detail in the{' '}
        <Link to="/legal/privacy" style={{ color: '#5B3FD4' }}>Privacy Policy</Link> and{' '}
        <Link to="/legal/data-retention" style={{ color: '#5B3FD4' }}>Data Retention Policy</Link>.
      </p>
    ),
  },
  {
    q: 'How does ORVN connect to PAS?',
    a: (
      <p>
        ORVN Labs is the public company and platform layer. PAS is the backend product
        infrastructure. The ORVN website routes users into PAS experiences (control room, demo,
        early access) — but the website never imports PAS code. They run on separate
        infrastructure with separate auth.
      </p>
    ),
  },
  {
    q: 'Is PAS Fair Housing compliant?',
    a: (
      <p>
        PAS is built to qualify on intent, budget, timeline, location/property interest,
        availability, and consent. It does not ask for or qualify on protected traits. See the{' '}
        <Link to="/legal/fair-housing" style={{ color: '#5B3FD4' }}>Fair Housing Compliance</Link>{' '}
        and{' '}
        <Link to="/legal/ai-disclosure" style={{ color: '#5B3FD4' }}>AI / Call Recording Disclosure</Link>{' '}
        pages.
      </p>
    ),
  },
  {
    q: 'How long does deployment take?',
    a: <p>Most brokerages go live within two weeks. Multi-office and custom CRM integrations on Enterprise can take longer; quoted per engagement.</p>,
  },
  {
    q: 'Can I see PAS run on a real conversation before paying?',
    a: (
      <p>
        Yes — <Link to="/demo" style={{ color: '#5B3FD4' }}>test PAS</Link>. 90 seconds, no signup,
        no calendar booking.
      </p>
    ),
  },
];

function Item({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E8F0', borderRadius: 12, marginBottom: 10, overflow: 'hidden' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: '100%',
          padding: '18px 22px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: '#0F172A' }}>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} color="#475569" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 22px 22px',
                fontSize: 14.5,
                color: '#475569',
                lineHeight: 1.75,
              }}
            >
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  useDocumentMeta({
    title: 'FAQ',
    description:
      'Common questions about PAS — what it is, what it controls, pricing, data handling, integrations, and Fair Housing compliance.',
    path: '/faq',
  });

  return (
    <PageWrapper>
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(24px, 3vw, 40px)', background: '#fff' }}>
        <div className="container-page" style={{ maxWidth: 760 }}>
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="h-display" style={{ fontSize: 'clamp(36px, 5.5vw, 56px)', margin: '14px 0 16px' }}>
            Common questions.
          </h1>
          <p className="lead">
            Practical answers about PAS, ORVN, pricing, data, and integrations. Email{' '}
            <a href="mailto:hello@orvnlabs.com" style={{ color: '#5B3FD4' }}>hello@orvnlabs.com</a>{' '}
            for anything not covered here.
          </p>
        </div>
      </section>

      <Section borderTop background="surface">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {FAQS.map((f, i) => (
            <Item key={f.q} {...f} defaultOpen={i === 0} />
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Link to="/calculators/leakage" className="btn-primary">
            Run lead leakage score <ArrowRight size={15} />
          </Link>
        </div>
      </Section>
    </PageWrapper>
  );
}
