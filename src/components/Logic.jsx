import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } },
});

// ─── Problem Card ─────────────────────────────────────────────────────────────
const ProblemCard = ({ tag, tagColor, title, body, badge, badgeColor, visual, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp(delay)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="group bg-white border border-line rounded-2xl p-8 flex flex-col gap-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
    >
      {/* Tag */}
      <span className={`font-label text-[10px] font-semibold uppercase tracking-widest ${tagColor}`}>
        {tag}
      </span>

      {/* Visual */}
      <div className="h-36 flex items-center justify-center bg-surface rounded-xl border border-line overflow-hidden">
        {visual}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 flex-1">
        <h3 className="font-headline font-extrabold text-xl text-ink leading-tight">
          {title}
        </h3>
        <p className="font-body text-ink-mid text-sm leading-relaxed">
          {body}
        </p>
      </div>

      {/* Badge */}
      <span className={`self-start font-label text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md ${badgeColor}`}>
        {badge}
      </span>
    </motion.div>
  );
};

// ─── Visuals ──────────────────────────────────────────────────────────────────

// Decaying countdown timer
const TimerVisual = () => (
  <div className="relative flex items-center justify-center">
    <svg width="90" height="90" className="rotate-[-90deg]">
      <circle cx="45" cy="45" r="38" fill="none" stroke="#FEE2E2" strokeWidth="5" />
      <circle
        cx="45" cy="45" r="38" fill="none"
        stroke="#EF4444" strokeWidth="5"
        strokeDasharray="239" strokeDashoffset="60"
        strokeLinecap="round"
      />
    </svg>
    <div className="absolute text-center">
      <span className="font-label font-bold text-red-500 text-lg">4:59</span>
      <p className="font-label text-[9px] text-ink-dim uppercase tracking-wide mt-0.5">remaining</p>
    </div>
  </div>
);

// ISA cherry-picking agents
const ISAVisual = () => (
  <div className="flex items-end gap-3 px-4">
    {[
      { h: "h-8",  op: "opacity-30", label: "Lead A" },
      { h: "h-16", op: "opacity-100 ring-2 ring-primary ring-offset-2", label: "Lead B", active: true },
      { h: "h-6",  op: "opacity-20", label: "Lead C" },
      { h: "h-10", op: "opacity-25", label: "Lead D" },
      { h: "h-5",  op: "opacity-15", label: "Lead E" },
    ].map((b, i) => (
      <div key={i} className="flex flex-col items-center gap-1 flex-1">
        <div className={`w-full ${b.h} rounded-md ${b.active ? "bg-primary" : "bg-line-strong"} ${b.op} transition-all`} />
        <span className="font-label text-[8px] text-ink-dim">{b.label}</span>
      </div>
    ))}
  </div>
);

// CRM graveyard blinking grid
const CRMVisual = () => (
  <div className="grid grid-cols-8 gap-1.5 p-4">
    {[...Array(32)].map((_, i) => (
      <div
        key={i}
        className={`h-3 rounded-sm transition-all ${
          i % 7 === 0
            ? "bg-amber-400 animate-pulse"
            : i % 11 === 0
            ? "bg-red-300"
            : "bg-line"
        }`}
      />
    ))}
  </div>
);

// ─── Main Section ─────────────────────────────────────────────────────────────
const Logic = () => {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section id="logic" className="bg-surface border-t border-line py-28 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* ── Section Header ── */}
        <div ref={headRef} className="max-w-3xl">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={headInView ? "show" : "hidden"}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-[2px] bg-primary rounded-full" />
            <span className="font-label text-xs text-primary font-semibold uppercase tracking-widest">
              The Problem
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={headInView ? "show" : "hidden"}
            className="font-headline font-extrabold text-4xl md:text-5xl text-ink tracking-tight leading-[1.1] mb-6"
          >
            Your best agent can't out-work{" "}
            <span className="text-primary">buyer psychology.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={headInView ? "show" : "hidden"}
            className="font-body text-ink-mid text-lg leading-relaxed"
          >
            Real estate runs on impulse. While your team is asleep or on another call,
            your buyer's intent is quietly dying. You can't fix a speed problem by hiring
            more people. You need a system that never sleeps.
          </motion.p>
        </div>

        {/* ── 3-Column Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProblemCard
            delay={0}
            tag="Lead Response"
            tagColor="text-red-400"
            title="The 5-Minute Window"
            body="A high-intent buyer contacts you. If your ISA doesn't respond within 5 minutes, their interest is already fading. They've moved on to the next listing, the next agent. Hesitation costs you the deal — every time."
            badge="Lost Opportunity"
            badgeColor="bg-red-50 text-red-500"
            visual={<TimerVisual />}
          />
          <ProblemCard
            delay={0.1}
            tag="Follow-Up"
            tagColor="text-primary"
            title="The Cherry-Picking Agent"
            body="Agents naturally chase the easiest deals. The rest sit in your pipeline and quietly die. Nobody follows up. Nobody notices. You're paying for leads that never had a real shot because your team only has so much energy."
            badge="Human Limitation"
            badgeColor="bg-primary-pale text-primary"
            visual={<ISAVisual />}
          />
          <ProblemCard
            delay={0.2}
            tag="Pipeline Visibility"
            tagColor="text-amber-500"
            title="The CRM Graveyard"
            body="Your CRM is full of leads that nobody remembers. Deals fell through the cracks, follow-ups were skipped, and now you have no idea which ones still have potential. Your database is a graveyard — and it doesn't have to be."
            badge="No Visibility"
            badgeColor="bg-amber-50 text-amber-600"
            visual={<CRMVisual />}
          />
        </div>

        {/* ── Bottom Pull Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-line rounded-2xl p-10 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="text-5xl">💸</div>
          <div className="flex-1">
            <p className="font-headline font-extrabold text-2xl text-ink leading-tight mb-2">
              "You spend millions acquiring the lead and generating the opportunity — only to lose the deal because a human was too slow."
            </p>
            <p className="font-label text-xs text-ink-dim uppercase tracking-widest mt-4">
              Daniel Oyegoke — Founder, ORVN Labs
            </p>
          </div>
          <button
            onClick={() => document.querySelector("#diagnostic")?.scrollIntoView({ behavior: "smooth" })}
            className="shrink-0 bg-primary hover:bg-primary-light transition-colors text-white font-label font-semibold text-sm px-6 py-3 rounded-xl"
          >
            Fix the leak →
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Logic;
