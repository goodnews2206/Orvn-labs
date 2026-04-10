import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay } },
});

const slideLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -32 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay } },
});

// ─── AGS Flow Diagram ─────────────────────────────────────────────────────────
const FlowDiagram = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp(0.2)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="bg-white border border-line rounded-2xl p-8 shadow-sm"
    >
      <p className="font-label text-[10px] text-ink-dim uppercase tracking-widest font-medium mb-8 text-center">
        The AGS Pipeline
      </p>

      {/* Friction side */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 flex flex-col gap-2 opacity-40">
          <p className="font-label text-[9px] text-red-400 uppercase tracking-widest text-center mb-1">Before AGS</p>
          {["Missed call", "Decaying intent", "Siloed CRM", "Lost deal"].map((item) => (
            <div key={item} className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
              <span className="w-1.5 h-1.5 bg-red-300 rounded-full" />
              <span className="font-label text-xs text-red-400">{item}</span>
            </div>
          ))}
        </div>

        {/* AGS Node */}
        <div className="flex flex-col items-center gap-3 px-4">
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30"
          >
            <span className="text-white font-headline font-black text-lg">AGS</span>
          </motion.div>
          <span className="font-label text-[9px] text-primary uppercase tracking-widest font-semibold">
            SuperStaff Active
          </span>
        </div>

        {/* Close side */}
        <div className="flex-1 flex flex-col gap-2">
          <p className="font-label text-[9px] text-primary uppercase tracking-widest text-center mb-1">After AGS</p>
          {["Lead intercepted in 3s", "Conversation qualified", "Appointment booked", "Deal advancing"].map((item) => (
            <div key={item} className="flex items-center gap-2 bg-primary-pale border border-primary/20 rounded-lg px-4 py-2.5">
              <span className="text-primary text-xs">✓</span>
              <span className="font-label text-xs text-primary font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CRM logos */}
      <div className="mt-8 pt-6 border-t border-line text-center">
        <p className="font-label text-[10px] text-ink-dim uppercase tracking-widest mb-3">
          Plugs into your existing stack
        </p>
        <div className="flex justify-center gap-6 font-label text-xs text-ink-dim font-medium">
          {["HubSpot", "Follow Up Boss", "Salesforce", "BoomTown"].map((crm) => (
            <span key={crm}>{crm}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Step Card ────────────────────────────────────────────────────────────────
const Step = ({ number, title, subtitle, body, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={slideLeft(delay)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="group flex gap-6 p-8 rounded-2xl border border-line bg-white hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
    >
      {/* Number */}
      <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-pale border border-primary/20 flex items-center justify-center">
        <span className="font-headline font-black text-primary text-sm">{number}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <p className="font-label text-[10px] text-primary uppercase tracking-widest font-semibold">
          {subtitle}
        </p>
        <h3 className="font-headline font-extrabold text-xl text-ink">
          {title}
        </h3>
        <p className="font-body text-ink-mid text-sm leading-relaxed mt-1">
          {body}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const ProtocolSection = () => {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section id="protocol" className="bg-background border-t border-line py-28 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-20">

        {/* ── Header ── */}
        <div ref={headRef} className="max-w-3xl">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={headInView ? "show" : "hidden"}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-[2px] bg-primary rounded-full" />
            <span className="font-label text-xs text-primary font-semibold uppercase tracking-widest">
              How It Works
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={headInView ? "show" : "hidden"}
            className="font-headline font-extrabold text-4xl md:text-5xl text-ink tracking-tight leading-[1.1] mb-6"
          >
            The AGS Protocol.{" "}
            <span className="text-primary">We don't advise.</span>{" "}
            We deploy.
          </motion.h2>

          <motion.p
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={headInView ? "show" : "hidden"}
            className="font-body text-ink-mid text-lg leading-relaxed"
          >
            This isn't a new tool your team has to learn. The AGS lives inside your existing
            systems and quietly does the work — around the clock, without hesitation.
          </motion.p>
        </div>

        {/* ── 2-col layout: steps + diagram ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Steps */}
          <div className="flex flex-col gap-5">
            <Step
              delay={0}
              number="01"
              subtitle="Integration"
              title="We plug into what you already have"
              body="The AGS embeds directly into your CRM — HubSpot, Follow Up Boss, Salesforce, BoomTown. Zero downtime. No new logins. Your team doesn't change how they work. The system just starts working for them."
            />
            <Step
              delay={0.1}
              number="02"
              subtitle="Reactivation"
              title="We mine your existing database"
              body="We don't just catch new leads. The AGS digs into your existing contacts, learns how your best agents communicate, and starts reactivating deals your team had already given up on. Your old database becomes a new revenue stream."
            />
            <Step
              delay={0.2}
              number="03"
              subtitle="Interception"
              title="Every new lead gets a 3-second response"
              body="When a lead comes in, the AGS responds within 3 seconds — qualifying via SMS and email, and dropping confirmed appointments straight onto your calendar. Your team only ever talks to buyers who are genuinely ready to move."
            />
          </div>

          {/* Flow Diagram */}
          <div className="lg:sticky lg:top-28">
            <FlowDiagram />

            {/* Stat strip */}
            <div className="mt-5 grid grid-cols-3 bg-white border border-line rounded-2xl overflow-hidden">
              {[
                { value: "3s",   label: "Response time" },
                { value: "24/7", label: "Always on"     },
                { value: "600%", label: "Revenue lift"  },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center py-6 border-r border-line last:border-r-0">
                  <span className="font-headline font-black text-2xl text-primary">{s.value}</span>
                  <span className="font-label text-[10px] text-ink-dim uppercase tracking-wide mt-1">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProtocolSection;
