import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, BrainCircuit, MessageSquare, Calendar, RefreshCw, Link2, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

gsap.registerPlugin(ScrollTrigger);

const SEC = { padding: 'clamp(72px, 8vw, 112px) clamp(20px, 5vw, 64px)' };
const INNER = { maxWidth: 1160, margin: '0 auto' };

const EyeBrow = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
    <div style={{ width: 20, height: 1.5, background: '#1B2559' }} />
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1B2559', fontFamily: "'JetBrains Mono', monospace" }}>{text}</span>
  </div>
);

function Problem() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.prob-card', { y: 36, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ ...SEC, background: 'white' }}>
      <div style={INNER}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <EyeBrow text="The Human Factor Problem" />
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 400, color: '#1B2559', lineHeight: 1.1, marginBottom: 14, maxWidth: 640 }}>
            Three Reasons Your Pipeline Is Haemorrhaging Revenue
          </h2>
          <p style={{ color: '#5A6480', fontSize: 16, lineHeight: 1.75, marginBottom: 56, maxWidth: 500 }}>
            The ceiling on a human-run pipeline is the biological limit of your best human. Biology always loses.
          </p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { num: '01', title: 'Speed-to-Lead Death', body: "90% of brokerages fail to respond within 5 minutes. After that window, conversion probability drops 80%+. Your agents sleep. Leads go to whoever responds faster." },
            { num: '02', title: 'The Graveyard CRM', body: "Brokerages abandon leads after 3–5 attempts. Most prospects take months to transact. Your CRM holds revenue you already paid for — left rotting." },
            { num: '03', title: 'Emotional Fatigue', body: "A human ISA's performance degrades daily. Rejection and fatigue directly impact conversion quality. You cannot motivate your way out of biology." },
          ].map((p, i) => (
            <motion.div key={i} className="prob-card"
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(27,37,89,0.1)', borderColor: '#C8CEDF' }}
              style={{ background: 'white', border: '1px solid #E2E6F0', borderRadius: 14, padding: 32, position: 'relative', overflow: 'hidden', transition: 'all 0.25s', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #1B2559, #2D3A7C)' }} />
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 56, color: '#F1F3F9', lineHeight: 1, marginBottom: 12 }}>{p.num}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1B2559', marginBottom: 10 }}>{p.title}</h3>
              <p style={{ color: '#5A6480', fontSize: 14, lineHeight: 1.7 }}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phase-card', { y: 28, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.14, scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="how" style={{ ...SEC, background: '#F8F9FC', borderTop: '1px solid #E2E6F0' }}>
      <div style={INNER}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <EyeBrow text="The AGS Framework" />
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 400, color: '#1B2559', lineHeight: 1.1, marginBottom: 14, maxWidth: 640 }}>
            Three Phases. One Autonomous Floor.
          </h2>
          <p style={{ color: '#5A6480', fontSize: 16, lineHeight: 1.75, marginBottom: 56, maxWidth: 500 }}>
            The Automated Growth System installs your Performative AI SuperStaff in three precise phases — each one irreversible.
          </p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { num: '1', tag: 'Integration', title: 'The Native Embed', body: "We connect directly into your existing CRM. No new apps. No retraining your team. The PAS begins monitoring your lead sources in real time from Day 1.", tags: ['Follow Up Boss', 'GoHighLevel', 'Salesforce', '+ more'], note: null },
            { num: '2', tag: 'Interpretation', title: 'Mining the Graveyard', body: 'We analyze your full historical lead database. Every abandoned lead is mapped for reactivation potential. The "Dead Alpha" in your CRM becomes an active revenue pipeline.', tags: [], note: 'Avg brokerage: 2,000+ recoverable leads in CRM' },
            { num: '3', tag: 'Implementation', title: 'The Autonomous Floor', body: "Full PAS deployment. Every inbound lead intercepted in 3 seconds. Graveyard campaigns activated. Your agents receive only qualified, booked appointments.", tags: [], note: 'Live from Day 7 of engagement' },
          ].map((phase, i) => (
            <motion.div key={i} className="phase-card"
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(27,37,89,0.1)' }}
              style={{ background: 'white', border: '1px solid #E2E6F0', borderRadius: 14, padding: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.25s' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1B2559', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white' }}>{phase.num}</div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8E97B5' }}>{phase.tag}</span>
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 600, color: '#1B2559', marginBottom: 10 }}>{phase.title}</h3>
              <p style={{ color: '#5A6480', fontSize: 14, lineHeight: 1.7, marginBottom: phase.tags.length > 0 || phase.note ? 16 : 0 }}>{phase.body}</p>
              {phase.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {phase.tags.map(t => (
                    <span key={t} style={{ background: '#F1F3F9', border: '1px solid #E2E6F0', borderRadius: 6, padding: '3px 10px', fontSize: 11, color: '#5A6480' }}>{t}</span>
                  ))}
                </div>
              )}
              {phase.note && <p style={{ fontSize: 12, color: '#1B2559', fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>{phase.note}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cap-card', { y: 28, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ ...SEC, background: 'white', borderTop: '1px solid #E2E6F0' }}>
      <div style={INNER}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <EyeBrow text="PAS Capabilities" />
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 400, color: '#1B2559', lineHeight: 1.1, marginBottom: 14, maxWidth: 640 }}>
            What the SuperStaff Actually Does
          </h2>
          <p style={{ color: '#5A6480', fontSize: 16, lineHeight: 1.75, marginBottom: 56, maxWidth: 500 }}>
            Not a chatbot. Not an autoresponder. A fully autonomous entity that makes decisions, handles human psychology, and drives direct revenue.
          </p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {[
            { icon: <Zap size={18} />, title: '3-Second Intercept', body: "Every inbound inquiry contacted within 3 seconds. Voice or text. 24/7/365. No exceptions, no fatigue, no bad days." },
            { icon: <BrainCircuit size={18} />, title: 'Psychological Qualification', body: "Elite real estate scripts fused with advanced reasoning. Handles objections, counters hesitation, reads genuine purchase intent." },
            { icon: <MessageSquare size={18} />, title: 'Conversation Memory', body: "Remembers every prior interaction. References past conversations naturally. Builds rapport over time with zero human involvement." },
            { icon: <Calendar size={18} />, title: 'Autonomous Booking', body: "When a lead qualifies, the PAS books directly onto your agent's calendar with full lead context. Zero manual scheduling." },
            { icon: <RefreshCw size={18} />, title: 'Graveyard Reactivation', body: "Re-engages abandoned leads over a 12-month window using intelligent sequences. Recovers revenue your team wrote off." },
            { icon: <Link2 size={18} />, title: 'Native CRM Sync', body: "Every interaction logged automatically. Lead status updated in real time. Zero manual data entry. Zero lost context." },
          ].map((cap, i) => (
            <motion.div key={i} className="cap-card"
              whileHover={{ y: -3, boxShadow: '0 10px 24px rgba(27,37,89,0.09)', borderColor: '#C8CEDF' }}
              style={{ background: 'white', border: '1px solid #E2E6F0', borderRadius: 14, padding: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F1F3F9', border: '1px solid #E2E6F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1B2559', marginBottom: 16 }}>{cap.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1B2559', marginBottom: 8 }}>{cap.title}</h3>
              <p style={{ fontSize: 13.5, color: '#5A6480', lineHeight: 1.7 }}>{cap.body}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} style={{ textAlign: 'center', marginTop: 56 }}>
          <Link to="/why-orvn">
            <motion.button whileHover={{ background: '#2D3A7C', y: -1, boxShadow: '0 10px 28px rgba(27,37,89,0.2)' }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1B2559', color: 'white', padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              See Why ORVN Labs Wins <ArrowRight size={15} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Product() {
  return (
    <PageWrapper>
      <div style={{ paddingTop: 68 }}>
        <Problem />
        <HowItWorks />
        <Capabilities />
      </div>
    </PageWrapper>
  );
}