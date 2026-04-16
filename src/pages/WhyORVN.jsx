import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, ArrowRight, Zap } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

gsap.registerPlugin(ScrollTrigger);

const SEC = { padding: 'clamp(72px, 8vw, 112px) clamp(20px, 5vw, 64px)' };
const INNER = { maxWidth: 1160, margin: '0 auto' };
const EyeBrow = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
    <div style={{ width: 20, height: 1.5, background: ' #5B3FD4' }} />
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: ' #5B3FD4', fontFamily: "'JetBrains Mono', monospace" }}>{text}</span>
  </div>
);

function Compare() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cmp-row', { x: -16, opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05, scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
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
    <section ref={ref} style={{ ...SEC, background: 'white' }}>
      <div style={INNER}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <EyeBrow text="The Honest Comparison" />
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 400, color: ' #5B3FD4', lineHeight: 1.1, marginBottom: 52, maxWidth: 600 }}>
            Human ISA vs ORVN Labs SuperStaff
          </h2>
        </motion.div>
        <div style={{ overflowX: 'auto', borderRadius: 14, border: '1px solid #E2E6F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8F9FC', borderBottom: '1px solid #E2E6F0' }}>
                <th style={{ padding: '18px 22px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: ' #5B3FD4', width: '28%' }}>Metric</th>
                <th style={{ padding: '18px 22px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#8E97B5' }}>Human ISA</th>
                <th style={{ padding: '18px 22px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: ' #5B3FD4', background: '#EEF2FF' }}>ORVN Labs SuperStaff (PAS)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="cmp-row" style={{ borderBottom: '1px solid #F1F3F9' }}>
                  <td style={{ padding: '15px 22px', fontSize: 13, color: ' #5B3FD4', fontWeight: 500 }}>{row.metric}</td>
                  <td style={{ padding: '15px 22px', fontSize: 13, color: '#8E97B5' }}>
                    {row.humanCheck === false
                      ? <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><X size={13} color="#DC2626" /> {row.humanNote}</span>
                      : row.human}
                  </td>
                  <td style={{ padding: '15px 22px', fontSize: 13, color: ' #5B3FD4', fontWeight: 500, background: '#F5F7FF', borderLeft: '1px solid #E2E6F0' }}>
                    {row.orvnCheck
                      ? <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Check size={13} color="#0D9E6E" /> {row.orvn}</span>
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
      gsap.from('.proof-card', { scale: 0.93, opacity: 0, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.1, scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ ...SEC, background: '#F8F9FC', borderTop: '1px solid #E2E6F0' }}>
      <div style={INNER}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <EyeBrow text="The Numbers" />
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 400, color: ' #5B3FD4', lineHeight: 1.1, marginBottom: 52, maxWidth: 600 }}>
            What Performative Infrastructure Does to a Pipeline
          </h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { num: '90%', label: 'of US brokerages fail speed-to-lead standards every day' },
            { num: '80%+', label: 'drop in conversion probability after a 5-minute response delay' },
            { num: '12mo', label: 'average lead-to-transaction window — most abandoned too early' },
          ].map((s, i) => (
            <div key={i} className="proof-card" style={{ textAlign: 'center', padding: '36px 20px', background: 'white', border: '1px solid #E2E6F0', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 52, color: ' #5B3FD4', lineHeight: 1, marginBottom: 10 }}>{s.num}</div>
              <p style={{ fontSize: 13, color: '#5A6480', lineHeight: 1.6 }}>{s.label}</p>
            </div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ background: 'white', border: '1px solid #E2E6F0', borderLeft: '3px solid  #5B3FD4', borderRadius: 14, padding: 40, maxWidth: 720, margin: '0 auto', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', color: '#8E97B5', textTransform: 'uppercase', marginBottom: 16 }}>The Doctrine</div>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(17px, 2vw, 22px)', color: ' #5B3FD4', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 16 }}>
            "The ceiling on a human-run pipeline is the biological limit of your best human. The ceiling on an infrastructure-run pipeline is just computational capacity. And that ceiling is unlimited."
          </p>
          <p style={{ fontSize: 13, color: '#8E97B5' }}>— Daniel Oyegoke, Founder, ORVN Labs</p>
        </motion.div>
      </div>
    </section>
  );
}

function Founder() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.founder-l', { x: -36, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
      gsap.from('.founder-r', { x: 36, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 72%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ ...SEC, background: 'white', borderTop: '1px solid #E2E6F0' }}>
      <div style={{ ...INNER, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
        <div className="founder-l" style={{ textAlign: 'center' }}>
          <motion.div
            whileHover={{ boxShadow: '0 16px 48px rgba(27,37,89,0.18)' }}
            style={{ width: 160, height: 160, borderRadius: '50%', background: 'linear-gradient(135deg,  #5B3FD4, #7B5FEA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Instrument Serif', serif", fontSize: 60, fontWeight: 400, color: 'white', margin: '0 auto 20px', boxShadow: '0 8px 32px rgba(27,37,89,0.15)', transition: 'box-shadow 0.3s' }}
          >D</motion.div>
          <div style={{ fontWeight: 700, fontSize: 20, color: ' #5B3FD4', marginBottom: 4 }}>Daniel Oyegoke</div>
          <div style={{ fontSize: 13, color: '#8E97B5', letterSpacing: '0.03em' }}>Founder & CEO — ORVN Labs</div>
        </div>
        <div className="founder-r">
          <EyeBrow text="The Founder" />
          <blockquote style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(17px, 2vw, 22px)', color: ' #5B3FD4', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 24, borderLeft: '3px solid #E2E6F0', paddingLeft: 24 }}>
            "I study how the human body works. Then I build systems so businesses don't have to depend on its limits."
          </blockquote>
          <p style={{ color: '#5A6480', fontSize: 15, lineHeight: 1.8 }}>
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
      <div style={{ paddingTop: 68 }}>
        <Compare />
        <Proof />
        <Founder />
        <section style={{ ...SEC, background: ' #5B3FD4', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 400, color: 'white', lineHeight: 1.1, marginBottom: 16 }}>
                Your Brokerage.<br />Our Infrastructure.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.75, marginBottom: 36 }}>
                Test the AI in 90 seconds with no commitment — or book a 20-minute call to see the full AGS deployment for your specific operation.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/demo">
                  <motion.button whileHover={{ background: 'white', color: ' #5B3FD4', y: -2 }} whileTap={{ scale: 0.97 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', color: 'white', padding: '14px 26px', borderRadius: 10, fontWeight: 600, fontSize: 15, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }}>
                    <Zap size={15} /> Test the AI — Free
                  </motion.button>
                </Link>
                <a href="mailto:daniel@orvnlabs.com" style={{ textDecoration: 'none' }}>
                  <motion.button whileHover={{ background: 'rgba(255,255,255,0.1)', y: -2 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'rgba(255,255,255,0.6)', padding: '14px 26px', borderRadius: 10, fontWeight: 500, fontSize: 15, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }}>
                    Book a Call <ArrowRight size={14} />
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