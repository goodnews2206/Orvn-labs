import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AGSFlowAnimation from "./AGSFlowAnimation";

// ─── Animation Variants ──────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } },
});

// ─── Main Hero ────────────────────────────────────────────────────────────────
const Hero = () => {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background text-ink font-body overflow-x-hidden">

      {/* ── TOP BANNER ─────────────────────────────────────────── */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-2.5 max-w-7xl mx-auto">
              <div className="flex-1 text-center font-label text-[11px] text-white/90 tracking-wide">
                Read Daniel Oyegoke's{" "}
                <button
                  onClick={() => scrollTo("#manifesto")}
                  className="underline underline-offset-2 font-semibold text-white hover:opacity-80 transition-opacity"
                >
                  Letter to Founders
                </button>
              </div>
              <button
                onClick={() => setBannerVisible(false)}
                className="text-white/60 hover:text-white transition-colors ml-4 text-lg leading-none"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-sm border-b border-line" : "border-b border-line"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <span className="font-headline font-extrabold text-xl tracking-tight text-ink">
            ORVN <span className="text-primary">LABS</span>
          </span>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 font-label text-sm font-medium text-ink-mid">
            <button onClick={() => scrollTo("#logic")}    className="hover:text-primary transition-colors">The Problem</button>
            <button onClick={() => scrollTo("#protocol")} className="hover:text-primary transition-colors">How It Works</button>
            <button onClick={() => scrollTo("#manifesto")}className="hover:text-primary transition-colors">The Letter</button>
            <button onClick={() => scrollTo("#intelligence")} className="hover:text-primary transition-colors">Intelligence</button>
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollTo("#diagnostic")}
            className="bg-primary hover:bg-primary-light transition-colors text-white font-label font-semibold text-sm px-5 py-2.5 rounded-lg"
          >
            Find My Revenue Leak →
          </button>
        </div>
      </nav>

      {/* ── HERO SECTION ───────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">

        {/* Dot grid background */}
        <div
          className="absolute inset-0 bg-dot-grid bg-[size:28px_28px] opacity-40 pointer-events-none"
          style={{ maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent)" }}
        />

        {/* Purple glow blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary opacity-[0.06] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-8">

          {/* Eyebrow */}
          <motion.div variants={fadeUp(0)} initial="hidden" animate="show">
            <span className="inline-flex items-center gap-2 bg-primary-pale text-primary font-label text-xs font-semibold px-4 py-1.5 rounded-full border border-primary/20">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              AGS System — Now Deploying
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp(0.1)}
            initial="hidden"
            animate="show"
            className="font-headline font-extrabold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.0] text-ink"
          >
            Real estate is{" "}
            <span className="text-ink-dim">10% brick</span>
            <br /> and 90% human psychology.
            <br />
            <span className="text-primary">We engineer the 90%.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp(0.2)}
            initial="hidden"
            animate="show"
            className="font-body text-ink-mid text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Buyers move on when your team hesitates. The AGS deploys an autonomous SuperStaff that intercepts, qualifies, and books appointments — before your agents even pick up the phone. Built for{" "}
            <span className="text-ink font-semibold">$50M+ real estate firms.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              onClick={() => scrollTo("#diagnostic")}
              className="bg-primary hover:bg-primary-light transition-all text-white font-label font-semibold px-8 py-4 rounded-xl text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Find My Revenue Leak
            </button>
            <button
              onClick={() => scrollTo("#protocol")}
              className="font-label font-semibold text-sm text-ink-mid hover:text-primary transition-colors flex items-center gap-2"
            >
              See How It Works <span>→</span>
            </button>
          </motion.div>

          {/* ── AGS FLOW ANIMATION ───────────────────────────── */}
          <motion.div
            variants={fadeUp(0.45)}
            initial="hidden"
            animate="show"
            className="w-full max-w-2xl mt-4"
          >
            <AGSFlowAnimation />
          </motion.div>

        </div>
      </section>

      {/* ── STATS MARQUEE ──────────────────────────────────────── */}
      <div className="border-y border-line bg-surface overflow-hidden py-1">
        <div className="flex animate-marquee whitespace-nowrap w-max">
          {[
            "Revenue up 600% in 3 months",
            "Leads intercepted in under 3 seconds",
            "20% valuation increase",
            "Zero downtime deployment",
            "Works 24/7 — no sick days, no hesitation",
            "Built for $50M+ operators",
            "Revenue up 600% in 3 months",
            "Leads intercepted in under 3 seconds",
            "20% valuation increase",
            "Zero downtime deployment",
            "Works 24/7 — no sick days, no hesitation",
            "Built for $50M+ operators",
          ].map((text, i) => (
            <span key={i} className="font-label text-xs text-ink-mid font-medium px-10 flex items-center gap-4">
              <span className="w-1 h-1 bg-primary rounded-full inline-block" />
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* ── CRM LOGO BAR ───────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col items-center gap-8">
        <p className="font-label text-xs text-ink-dim uppercase tracking-widest font-medium">
          Embeds into the tools you already use
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {[
            { name: "HubSpot",        src: "https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png",           label: "HubSpot"         },
            { name: "Salesforce",     src: "https://c1.sfdcstatic.com/content/dam/web/en_us/www/images/home/logo-salesforce-m.svg",label: "Salesforce"      },
            { name: "Follow Up Boss", src: "https://followupboss.com/wp-content/uploads/2022/04/fub-icon.png",                   label: "Follow Up Boss"  },
            { name: "BoomTown",       src: "https://boomtownroi.com/wp-content/uploads/2020/03/BoomTown-favicon.png",            label: "BoomTown"        },
          ].map((crm) => (
            <div key={crm.name} className="flex items-center gap-2 font-label font-semibold text-sm text-ink-mid">
              <img src={crm.src} alt={crm.name} className="w-6 h-6 object-contain" onError={(e) => e.target.style.display = "none"} />
              {crm.label}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Hero;
