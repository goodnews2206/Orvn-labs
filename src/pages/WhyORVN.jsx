import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, ArrowRight, Zap } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

gsap.registerPlugin(ScrollTrigger);

function Compare() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.compare-row', {
        x: -20, opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.06,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const rows = [
    { metric: 'Annual Cost', human: '$70,000 – $90,000+', orvn: 'Fractional infrastructure pricing' },
    { metric: 'Response Time', human: 'Minutes to hours', orvn: 'Under 3 seconds — always' },
    { metric: 'Availability', human: '~45 hrs/week', orvn: '8,760 hrs/year' },
    { metric: 'Lead Capacity', human: '~200–400/month', orvn: 'Unlimited — scales instantly' },
    { metric: 'Emotional Consistency', human: 'Degrades with fatigue', orvn: 'Constant — no bad days' },
    { metric: 'CRM Data Entry', human: 'Manual — high error rate', orvn: 'Native auto-sync — zero errors' },
    { metric: 'Graveyard Reactivation', human: null, orvn: '12-month systematic re-engagement', humanCheck: false, humanNote: 'Abandoned after 3–5 tries', orvnCheck: true },
    { metric: 'New App Required', human: 'N/A', orvn: 'Zero — lives in your current CRM', orvnCheck: true },
    { metric: 'Turnover Risk', human: 'High — avg ISA tenure 14 months', orvn: "None — infrastructure doesn't resign" },
  ];

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 8vw, 96px) clamp(20px, 6vw, 80px)', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
            <div style={{ width: 24, height: 2, background: '#5B3FD4' }} />
            <span style={{ color: '#7B5FEA', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 500 }}>The Honest Comparison</span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 3.8vw, 50px)', letterSpacing: '-.022em', lineHeight: 1.08, marginBottom: 48, maxWidth: 700 }}>
            Human ISA vs ORVN SuperStaff
          </h2>
        </motion.div>
        <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid rgba(91,63,212,0.2)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg3)', borderBottom: '1px solid rgba(91,63,212,0.2)' }}>
                <th style={{ padding: '20px 22px', textAlign: 'left', fontFamily: "'Clash Display', sans-serif", fontSize: 15, fontWeight: 600, width: '28%', color: '#F2EEFF' }}>Metric</th>
                <th style={{ padding: '20px 22px', textAlign: 'left', fontFamily: "'Clash Display', sans-serif", fontSize: 15, fontWeight: 600, color: '#68607F' }}>Human ISA</th>
                <th style={{ padding: '20px 22px', textAlign: 'left', fontFamily: "'Clash Display', sans-serif", fontSize: 15, fontWeight: 600, color: '#7B5FEA', background: 'rgba(91,63,212,.1)' }}>ORVN SuperStaff (PAS)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="compare-row" style={{ borderBottom: '1px solid rgba(91,63,212,.1)' }}>
                  <td style={{ padding: '16px 22px', fontSize: 14, color: '#F2EEFF', fontWeight: 500 }}>{row.metric}</td>
                  <td style={{ padding: '16px 22px', fontSize: 14, color: '#68607F' }}>
                    {row.humanCheck === false
                      ? <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><X size={14} color="#ef4444" /> {row.humanNote}</span>
                      : row.human}
                  </td>
                  <td style={{ padding: '16px 22px', fontSize: 14, color: '#F2EEFF', fontWeight: 500, background: 'rgba(91,63,212,.06)', borderLeft: '1px solid rgba(91,63,212,0.2)', borderRight: '1px solid rgba(91,63,212,0.2)' }}>
                    {row.orvnCheck
                      ? <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Check size={14} color="#22C55E" /> {row.orvn}</span>
                      : row.orvn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proof-stat', {
        scale: 0.9, opacity: 0, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 8vw, 96px) clamp(20px, 6vw, 80px)', background: 'var(--bg)', borderTop: '1px solid rgba(91,63,212,0.2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
            <div style={{ width: 24, height: 2, background: '#5B3FD4' }} />
            <span style={{ color: '#7B5FEA', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 500 }}>The Numbers</span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 3.8vw, 50px)', letterSpacing: '-.022em', lineHeight: 1.08, marginBottom: 48, maxWidth: 700 }}>
            What Performative Infrastructure Does to a Pipeline
          </h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { num: '90%', label: 'of US brokerages fail speed-to-lead standards every day' },
            { num: '80%+', label: 'drop in conversion probability after a 5-minute response delay' },
            { num: '12mo', label: 'average lead-to-transaction window — most abandoned too early' },
          ].map((s, i) => (
            <div key={i} className="proof-stat" style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--bg2)', border: '1px solid rgba(91,63,212,0.2)', borderRadius: 12 }}>
              <span style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 50, fontWeight: 700, color: '#7B5FEA', letterSpacing: '-.02em', display: 'block', marginBottom: 8 }}>{s.num}</span>
              <span style={{ fontSize: 14, color: '#68607F' }}>{s.label}</span>
            </div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ background: 'var(--bg2)', border: '1px solid rgba(91,63,212,0.2)', borderRadius: 12, padding: 40, maxWidth: 720, margin: '0 auto' }}>
          <div style={{ color: '#7B5FEA', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 14 }}>THE DOCTRINE</div>
          <p style={{ color: '#D0C8EC', fontSize: 19, lineHeight: 1.8, fontStyle: 'italic', fontWeight: 300 }}>
            "The ceiling on a human-run pipeline is the biological limit of your best human. The ceiling on an infrastructure-run pipeline is just computational capacity. And that ceiling is unlimited."
          </p>
          <div style={{ marginTop: 18, color: '#68607F', fontSize: 14 }}>— Daniel Oyegoke, Founder, ORVN Labs</div>
        </motion.div>
      </div>
    </section>
  );
}

function Founder() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.founder-left', { x: -40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 70%' } });
      gsap.from('.founder-right', { x: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 70%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 8vw, 96px) clamp(20px, 6vw, 80px)', background: 'var(--bg2)', borderTop: '1px solid rgba(91,63,212,0.2)', borderBottom: '1px solid rgba(91,63,212,0.2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 80, alignItems: 'center' }}>
        <div className="founder-left">
          <motion.div whileHover={{ boxShadow: '0 0 80px rgba(91,63,212,.5)' }}
            style={{ width: 180, height: 180, borderRadius: '50%', background: 'linear-gradient(135deg,#3A2899,#7B5FEA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Clash Display', sans-serif", fontSize: 64, fontWeight: 700, color: 'rgba(255,255,255,.9)', border: '3px solid rgba(91,63,212,0.2)', boxShadow: '0 0 60px rgba(91,63,212,.3)', marginBottom: 20, transition: 'box-shadow 0.3s' }}>
            D
          </motion.div>
          <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 26, fontWeight: 700, color: '#F2EEFF' }}>Daniel Oyegoke</div>
          <div style={{ color: '#7B5FEA', fontSize: 13, marginTop: 4, letterSpacing: '.04em' }}>Founder & CEO — ORVN Labs</div>
        </div>
        <div className="founder-right">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 24, height: 2, background: '#5B3FD4' }} />
            <span style={{ color: '#7B5FEA', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 500 }}>The Founder</span>
          </div>
          <p style={{ fontSize: 19, lineHeight: 1.8, color: '#D0C8EC', fontStyle: 'italic', fontWeight: 300, marginBottom: 20, borderLeft: '3px solid #5B3FD4', paddingLeft: 24 }}>
            "I study how the human body works. Then I build systems so businesses don't have to depend on its limits."
          </p>
          <p style={{ color: '#68607F', fontSize: 15, lineHeight: 1.8 }}>
            I'm a human anatomy student, a real estate operator in Nigeria, and an AI infrastructure builder targeting the US market. Three different disciplines with one shared insight: the highest-performing systems are designed around human limits — not human effort. ORVN Labs exists to give brokerages the infrastructure that removes those limits entirely, so their people can focus on what humans do best: close.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function WhyORVN() {
  return (
    <PageWrapper>
      <div style={{ paddingTop: 70 }}>
        <Compare />
        <Proof />
        <Founder />
        <section style={{ background: 'var(--bg)', padding: 'clamp(60px, 8vw, 96px) clamp(20px, 6vw, 80px)', textAlign: 'center' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ padding: 'clamp(40px, 6vw, 72px) clamp(24px, 4vw, 40px)', background: 'var(--bg2)', border: '1px solid rgba(91,63,212,0.2)', borderRadius: 20, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top,rgba(91,63,212,.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
              <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 3.5vw, 42px)', marginBottom: 14, letterSpacing: '-.02em', position: 'relative' }}>
                Your Brokerage.<br />Our Infrastructure.
              </h2>
              <p style={{ color: '#68607F', fontSize: 16, marginBottom: 36, lineHeight: 1.8, position: 'relative' }}>
                Test the AI in 90 seconds with no commitment — or book a 20-minute call to see the full AGS deployment for your specific operation.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
                <Link to="/demo">
                  <motion.button whileHover={{ background: '#7B5FEA', y: -2, boxShadow: '0 14px 44px rgba(91,63,212,0.42)' }} whileTap={{ scale: 0.97 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#5B3FD4', color: '#F2EEFF', padding: '14px 28px', borderRadius: 8, fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: "'Epilogue', sans-serif" }}>
                    <Zap size={16} /> Test the AI — Free
                  </motion.button>
                </Link>
                <a href="mailto:daniel@orvnlabs.com" style={{ textDecoration: 'none' }}>
                  <motion.button whileHover={{ borderColor: '#5B3FD4', background: 'rgba(91,63,212,0.1)' }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'transparent', color: '#F2EEFF', padding: '14px 28px', borderRadius: 8, fontWeight: 500, fontSize: 15, border: '1px solid rgba(91,63,212,0.2)', cursor: 'pointer', fontFamily: "'Epilogue', sans-serif", transition: 'all 0.2s' }}>
                    Book a Call <ArrowRight size={15} />
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}