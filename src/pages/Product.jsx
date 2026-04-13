import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, BrainCircuit, MessageSquare, Calendar, RefreshCw, Link2, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

gsap.registerPlugin(ScrollTrigger);

function Problem() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.problem-card', {
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 8vw, 96px) clamp(20px, 6vw, 80px)', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
            <div style={{ width: 24, height: 2, background: '#5B3FD4' }} />
            <span style={{ color: '#7B5FEA', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 500 }}>The Problem</span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 3.8vw, 50px)', letterSpacing: '-.022em', lineHeight: 1.08, marginBottom: 16, maxWidth: 700 }}>
            Three Structural Failures in Every Brokerage
          </h2>
          <p style={{ color: '#68607F', fontSize: 17, maxWidth: 570, lineHeight: 1.82, marginBottom: 48 }}>
            These aren't performance problems. They're architecture problems. And you can't solve them by hiring harder.
          </p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { num: '01', title: 'The Speed-to-Lead Gap', body: "The top-of-funnel is broken. 90% of US brokerages fail to respond within 5 minutes. By then, conversion probability has dropped by over 80%. You're spending on leads your team is statistically incapable of catching." },
            { num: '02', title: 'The Graveyard CRM', body: "The average brokerage CRM holds 2,000+ leads that were contacted 3–5 times, didn't convert immediately, and were abandoned. They're not dead — they were just handed off too early to a system not built for the long game." },
            { num: '03', title: 'The Human Ceiling', body: "A human ISA's performance degrades throughout the day. Fatigue and rejection directly impact conversion quality. You cannot motivate your way out of biology. It's a system design problem." },
          ].map((p, i) => (
            <motion.div key={i} className="problem-card" whileHover={{ borderColor: '#5B3FD4', y: -4 }}
              style={{ background: 'var(--bg2)', border: '1px solid rgba(91,63,212,0.2)', borderRadius: 12, padding: 32, position: 'relative', overflow: 'hidden', transition: 'border-color .3s, transform .3s' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,#5B3FD4,#7B5FEA)' }} />
              <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 52, fontWeight: 700, color: 'rgba(91,63,212,.18)', letterSpacing: '-.03em', marginBottom: 10, lineHeight: 1 }}>{p.num}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, color: '#F2EEFF' }}>{p.title}</h3>
              <p style={{ color: '#68607F', fontSize: 14, lineHeight: 1.7 }}>{p.body}</p>
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
      gsap.from('.phase-block', {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const phases = [
    { num: 1, tag: 'Integration', title: 'The Native Embed', body: "We connect directly into your existing CRM. No new apps. No retraining your team. The PAS begins monitoring your lead sources in real time from Day 1.", tags: ['Follow Up Boss', 'GoHighLevel', 'Salesforce', '+ more'], note: null },
    { num: 2, tag: 'Interpretation', title: 'Mining the Graveyard', body: 'We analyze your full historical lead database. Every abandoned lead is mapped for reactivation potential. The "Dead Alpha" in your CRM becomes an active revenue pipeline.', tags: [], note: 'Avg brokerage: 2,000+ recoverable leads in CRM' },
    { num: 3, tag: 'Implementation', title: 'The Autonomous Floor', body: "Full PAS deployment. Every inbound lead intercepted in 3 seconds. Graveyard campaigns activated. Your agents receive only qualified, booked appointments.", tags: [], note: 'Live from Day 7 of engagement' },
  ];

  return (
    <section ref={ref} id="how" style={{ padding: 'clamp(60px, 8vw, 96px) clamp(20px, 6vw, 80px)', background: 'var(--bg2)', borderTop: '1px solid rgba(91,63,212,0.2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
            <div style={{ width: 24, height: 2, background: '#5B3FD4' }} />
            <span style={{ color: '#7B5FEA', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 500 }}>The AGS Framework</span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 3.8vw, 50px)', letterSpacing: '-.022em', lineHeight: 1.08, marginBottom: 16, maxWidth: 700 }}>
            Three Phases. One Autonomous Floor.
          </h2>
          <p style={{ color: '#68607F', fontSize: 17, maxWidth: 570, lineHeight: 1.82, marginBottom: 48 }}>
            The Automated Growth System installs your Performative AI SuperStaff in three precise phases — each one irreversible.
          </p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2, background: 'rgba(91,63,212,0.2)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(91,63,212,0.2)' }}>
          {phases.map((phase, i) => (
            <motion.div key={i} className="phase-block" whileHover={{ background: 'rgba(91,63,212,.08)' }}
              style={{ background: 'var(--bg3)', padding: '36px 28px', transition: 'background .3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white' }}>{phase.num}</div>
                <span style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: '#7B5FEA', fontWeight: 500 }}>{phase.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 10, color: '#F2EEFF' }}>{phase.title}</h3>
              <p style={{ color: '#68607F', fontSize: 14, lineHeight: 1.7 }}>{phase.body}</p>
              {phase.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                  {phase.tags.map(t => (
                    <span key={t} style={{ background: 'rgba(91,63,212,.15)', border: '1px solid rgba(91,63,212,0.2)', borderRadius: 4, padding: '3px 10px', fontSize: 11, color: '#68607F' }}>{t}</span>
                  ))}
                </div>
              )}
              {phase.note && <p style={{ color: '#7B5FEA', fontSize: 13, marginTop: 12, fontWeight: 500 }}>{phase.note}</p>}
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
      gsap.from('.cap-card', {
        y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const caps = [
    { icon: <Zap size={20} />, title: '3-Second Intercept', body: "Every inbound inquiry contacted within 3 seconds. Voice or text. 24/7/365. No exceptions, no fatigue, no bad days." },
    { icon: <BrainCircuit size={20} />, title: 'Psychological Qualification', body: "Elite real estate scripts fused with advanced reasoning. Handles objections, counters hesitation, reads genuine purchase intent — not just budget and timeline." },
    { icon: <MessageSquare size={20} />, title: 'Conversation Memory', body: "Remembers every prior interaction. References past conversations naturally. Builds rapport over time with zero human involvement." },
    { icon: <Calendar size={20} />, title: 'Autonomous Booking', body: "When a lead qualifies, the PAS books directly onto your agent's calendar with full lead context. Zero manual scheduling." },
    { icon: <RefreshCw size={20} />, title: 'Graveyard Reactivation', body: "Re-engages abandoned leads over a 12-month window using intelligent sequences. Recovers revenue your team already paid for and wrote off." },
    { icon: <Link2 size={20} />, title: 'Native CRM Sync', body: "Every interaction logged automatically. Lead status updated in real time. Zero manual data entry. Zero lost context between handoffs." },
  ];

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 8vw, 96px) clamp(20px, 6vw, 80px)', background: 'var(--bg)', borderTop: '1px solid rgba(91,63,212,0.2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
            <div style={{ width: 24, height: 2, background: '#5B3FD4' }} />
            <span style={{ color: '#7B5FEA', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 500 }}>PAS Capabilities</span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 3.8vw, 50px)', letterSpacing: '-.022em', lineHeight: 1.08, marginBottom: 16, maxWidth: 700 }}>
            What the SuperStaff Actually Does
          </h2>
          <p style={{ color: '#68607F', fontSize: 17, maxWidth: 570, lineHeight: 1.82, marginBottom: 48 }}>
            Not a chatbot. Not an autoresponder. A fully autonomous entity that makes decisions, handles human psychology, and drives direct revenue.
          </p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {caps.map((cap, i) => (
            <motion.div key={i} className="cap-card" whileHover={{ borderColor: '#7B5FEA', y: -3 }}
              style={{ background: 'var(--bg2)', border: '1px solid rgba(91,63,212,0.2)', borderRadius: 12, padding: 28, transition: 'border-color .2s, transform .2s' }}>
              <div style={{ width: 46, height: 46, borderRadius: 10, background: 'rgba(91,63,212,.2)', border: '1px solid rgba(91,63,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7B5FEA', marginBottom: 16 }}>{cap.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#F2EEFF' }}>{cap.title}</h3>
              <p style={{ fontSize: 13.5, color: '#68607F', lineHeight: 1.7 }}>{cap.body}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} style={{ textAlign: 'center', marginTop: 60 }}>
          <Link to="/why-orvn">
            <motion.button whileHover={{ background: '#7B5FEA', y: -2, boxShadow: '0 14px 44px rgba(91,63,212,0.42)' }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#5B3FD4', color: '#F2EEFF', padding: '14px 32px', borderRadius: 8, fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: "'Epilogue', sans-serif" }}>
              See Why ORVN Wins <ArrowRight size={15} />
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
      <div style={{ paddingTop: 70 }}>
        <Problem />
        <HowItWorks />
        <Capabilities />
      </div>
    </PageWrapper>
  );
}