import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay } },
});

// ─── Paragraph with scroll reveal ────────────────────────────────────────────
const RevealPara = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.p
      ref={ref}
      variants={fadeUp(delay)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={`font-body text-ink-mid text-lg leading-relaxed ${className}`}
    >
      {children}
    </motion.p>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const FounderManifesto = () => {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section id="manifesto" className="bg-background border-t border-line py-28 px-6">
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
              A Letter from the Founder
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={headInView ? "show" : "hidden"}
            className="font-headline font-extrabold text-4xl md:text-5xl text-ink tracking-tight leading-[1.1]"
          >
            I know your leaks{" "}
            <span className="text-primary">because I lived them.</span>
          </motion.h2>
        </div>

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* LEFT: Identity Card */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-surface border border-line rounded-2xl p-8 sticky top-28"
            >
              {/* Avatar placeholder */}
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-headline font-black text-2xl mb-6 shadow-lg shadow-primary/20">
                D
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-label text-[10px] text-ink-dim uppercase tracking-widest mb-1">Name</p>
                  <p className="font-label font-bold text-ink">Daniel Oyegoke</p>
                </div>
                <div>
                  <p className="font-label text-[10px] text-ink-dim uppercase tracking-widest mb-1">Title</p>
                  <p className="font-label font-bold text-ink">Founder, ORVN Labs</p>
                </div>
                <div>
                  <p className="font-label text-[10px] text-ink-dim uppercase tracking-widest mb-1">Background</p>
                  <p className="font-label font-bold text-ink">Former Realtor → Real Estate Architect</p>
                </div>
                <div className="pt-2 border-t border-line">
                  <p className="font-label text-[10px] text-ink-dim uppercase tracking-widest mb-1">Result</p>
                  <p className="font-label font-bold text-primary">600% Revenue Increase</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: The Letter */}
          <div className="lg:col-span-8 flex flex-col gap-7">

            <RevealPara delay={0}>
              "I didn't start my career in a tech lab. I started in the trenches as a Realtor — working my way through school, hustling for every deal. I was good at sales. But at the end of every month, my margins were painfully thin.
            </RevealPara>

            <RevealPara delay={0.05}>
              The math didn't add up until I saw the real problem:{" "}
              <span className="text-ink font-medium italic">I had more leads than I could respond to, and I was losing them all to speed.</span>{" "}
              By the time I got back to an inquiry, the buyer had already moved on.
            </RevealPara>

            <RevealPara delay={0.1}>
              I assumed this was a solo-agent problem. Then I joined a large brokerage — a full floor of human ISAs — and watched the same thing happen at scale. Millions in revenue walking out the door every month, simply because humans can't respond fast enough, consistently enough, to every lead.
            </RevealPara>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="border-l-4 border-primary pl-6 py-2 my-4"
            >
              <p className="font-headline font-extrabold text-2xl md:text-3xl text-ink leading-tight">
                That's where the AGS was born.
              </p>
            </motion.blockquote>

            <RevealPara delay={0.1}>
              Before AI, before any tech infrastructure, I built the AGS manually — engineering a framework to intercept, qualify, and track every lead without relying on human hustle. The results were immediate. Revenue up 600%. Company valuation up 20% in the first three months.
            </RevealPara>

            <RevealPara delay={0.15}>
              That proof of concept became what we deploy today. I'm not an "AI guy" selling you software. I'm a real estate operator who built the exact system I desperately needed — and I'm putting it inside your firm.
            </RevealPara>

            {/* Closing statement */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="bg-primary-pale border border-primary/20 rounded-2xl p-8 mt-4"
            >
              <p className="font-headline font-extrabold text-3xl md:text-4xl text-ink leading-tight mb-2">
                1 + 1 = 3.
              </p>
              <p className="font-body text-ink-mid text-lg">
                If you're tired of watching your best leads die in the pipeline — let's talk.
              </p>
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-1 pt-4"
            >
              <p className="font-headline font-black text-3xl text-ink italic">
                Daniel Oyegoke
              </p>
              <p className="font-label text-xs text-ink-dim uppercase tracking-widest">
                Founder, ORVN Labs
              </p>

              <div className="mt-6">
                <button
                  onClick={() => document.querySelector("#diagnostic")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-primary hover:bg-primary-light transition-all text-white font-label font-semibold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                >
                  Start your diagnostic →
                </button>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FounderManifesto;
