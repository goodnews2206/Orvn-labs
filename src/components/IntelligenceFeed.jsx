import React, { useState } from "react";
import { motion } from "framer-motion";

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } },
});

// ─── Feed Data — Architect updates this manually ───────────────────────────
const feedItems = [
  {
    id: "session-01",
    tag: "System Architecture",
    date: "Aug 12, 2024",
    title: "Core Omni-Channel Lead Flow",
    description:
      "A detailed walkthrough of how the AGS routes inbound leads across channels — SMS, email, and call — without dropping a single touchpoint. See the full node architecture and how response latency directly impacts conversion.",
    youtubeId: "dQw4w9WgXcQ", // Replace with real ID
    resourceLabel: "Open Architecture Board",
    resourceUrl: "#",
  },
  {
    id: "session-02",
    tag: "Financial Analysis",
    date: "Aug 15, 2024",
    title: "RE P&L Optimization Deep Dive",
    description:
      "Where are the real money leaks in a traditional brokerage? This session breaks down a real P&L report side-by-side with an AGS-augmented operation — and shows exactly where the numbers change.",
    youtubeId: "dQw4w9WgXcQ", // Replace with real ID
    resourceLabel: "Watch Full Analysis",
    resourceUrl: "#",
  },
];

// ─── Feed Card ────────────────────────────────────────────────────────────────
const FeedCard = ({ item, index }) => (
  <motion.article
    variants={fadeUp(index * 0.1)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    className="group bg-white border border-line rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
  >
    <div className="grid grid-cols-1 lg:grid-cols-12">

      {/* YouTube Embed */}
      <div className="lg:col-span-7 relative bg-ink aspect-video lg:aspect-auto lg:h-auto">
        <iframe
          className="w-full h-full min-h-[260px] opacity-90 group-hover:opacity-100 transition-opacity"
          src={`https://www.youtube.com/embed/${item.youtubeId}?controls=1&rel=0`}
          title={item.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Content */}
      <div className="lg:col-span-5 p-8 flex flex-col justify-between gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="bg-primary-pale text-primary font-label text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md">
              {item.tag}
            </span>
            <span className="font-label text-[10px] text-ink-dim">
              {item.date}
            </span>
          </div>

          <h3 className="font-headline font-extrabold text-2xl text-ink tracking-tight leading-tight">
            {item.title}
          </h3>

          <p className="font-body text-ink-mid text-sm leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Resource Link */}
        <a
          href={item.resourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link flex items-center gap-4 p-5 bg-surface border border-line rounded-xl hover:border-primary/30 hover:bg-primary-pale transition-all duration-300"
        >
          <div className="w-10 h-10 bg-white border border-line rounded-xl flex items-center justify-center text-primary shadow-sm group-hover/link:shadow-md transition-shadow">
            ↗
          </div>
          <div className="flex-1">
            <p className="font-label text-[9px] text-ink-dim uppercase tracking-widest mb-0.5">
              Resource
            </p>
            <p className="font-label text-sm text-ink font-semibold group-hover/link:text-primary transition-colors">
              {item.resourceLabel}
            </p>
          </div>
          <span className="text-ink-dim group-hover/link:text-primary group-hover/link:translate-x-1 transition-all">→</span>
        </a>
      </div>

    </div>
  </motion.article>
);

// ─── Main Section ─────────────────────────────────────────────────────────────
const IntelligenceFeed = () => (
  <section id="intelligence" className="bg-surface border-t border-line py-28 px-6">
    <div className="max-w-6xl mx-auto flex flex-col gap-16">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-primary rounded-full" />
            <span className="font-label text-xs text-primary font-semibold uppercase tracking-widest">
              Intelligence Feed
            </span>
          </div>
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-ink tracking-tight leading-[1.1] mb-4">
            Industrial intelligence.
          </h2>
          <p className="font-body text-ink-mid text-lg leading-relaxed">
            Deep-dives into real estate P&L, system architecture, and lead-handling logic.
            Each session is a hands-on breakdown — not theory, not fluff.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 font-label text-xs text-ink-dim">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Updated manually by the Architect
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-8">
        {feedItems.map((item, i) => (
          <FeedCard key={item.id} item={item} index={i} />
        ))}
      </div>

    </div>
  </section>
);

export default IntelligenceFeed;
