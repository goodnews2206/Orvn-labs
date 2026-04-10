import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Conversation script ──────────────────────────────────────────────────────
// angle: degrees around the circle (0 = right, 90 = bottom, 180 = left, 270 = top)
// radius: distance from center in px
const MESSAGES = [
  { id: 1, from: "lead", angle: 210, radius: 152,
    text: "Hi, I saw a 3-bed listing in Austin on Zillow — is it still available?",
    delay: 500 },
  { id: 2, from: "ags",  angle: 320, radius: 148,
    text: "Hey! Yes, still active 👋 Are you looking to buy or just exploring?",
    delay: 1800 },
  { id: 3, from: "lead", angle: 140, radius: 158,
    text: "Definitely buying. I'm pre-approved up to $520k.",
    delay: 3300 },
  { id: 4, from: "ags",  angle: 30,  radius: 152,
    text: "Perfect — that listing is $489k so you're in great shape. Working with an agent yet?",
    delay: 4600 },
  { id: 5, from: "lead", angle: 250, radius: 144,
    text: "No agent. Can I schedule a showing this week?",
    delay: 6100 },
  { id: 6, from: "ags",  angle: 355, radius: 156,
    text: "Absolutely. Thursday 2pm or Friday 10am — which works?",
    delay: 7400 },
  { id: 7, from: "lead", angle: 110, radius: 150,
    text: "Thursday 2pm is perfect.",
    delay: 8900 },
  { id: 8, from: "ags",  angle: 70,  radius: 148,
    text: "✅ Booked! Confirmation + address on the way. See you Thursday!",
    delay: 10000, isClosing: true },
];

// ─── Polar → cartesian ────────────────────────────────────────────────────────
const polar = (deg, r) => {
  const rad = (deg * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
};

// ─── Lead avatar ──────────────────────────────────────────────────────────────
const LeadAvatar = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
    <circle cx="20" cy="20" r="18" fill="#FFD93D" stroke="#F4C430" strokeWidth="1.5"/>
    <path d="M7 16 Q10 5 20 4 Q30 5 33 16" fill="#4A3728"/>
    {/* worried brows */}
    <path d="M11 17 Q14 14 17 16" stroke="#4A3728" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M23 16 Q26 14 29 17" stroke="#4A3728" strokeWidth="1.5" strokeLinecap="round"/>
    {/* wide eyes */}
    <ellipse cx="14" cy="20" rx="3" ry="3.5" fill="white"/>
    <ellipse cx="26" cy="20" rx="3" ry="3.5" fill="white"/>
    <circle cx="14.5" cy="20.5" r="1.8" fill="#2D2D2D"/>
    <circle cx="26.5" cy="20.5" r="1.8" fill="#2D2D2D"/>
    <circle cx="15" cy="19" r="0.6" fill="white"/>
    <circle cx="27" cy="19" r="0.6" fill="white"/>
    {/* nervous mouth */}
    <path d="M14 29 Q20 27 26 29" stroke="#4A3728" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* sweat */}
    <ellipse cx="31" cy="16" rx="1.5" ry="2" fill="#74C0FC" opacity="0.9"/>
    {/* phone */}
    <rect x="30" y="26" width="6" height="9" rx="1.5" fill="#ADB5BD" stroke="#868E96" strokeWidth="0.8"/>
    <rect x="31" y="27.5" width="4" height="6" rx="0.8" fill="#74C0FC" opacity="0.5"/>
  </svg>
);

// ─── AGS avatar ───────────────────────────────────────────────────────────────
const AGSAvatar = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
    <rect x="4" y="6" width="32" height="30" rx="7" fill="#1A1A2E" stroke="#7B2FFF" strokeWidth="1.5"/>
    <line x1="20" y1="6" x2="20" y2="1" stroke="#7B2FFF" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="20" cy="1" r="1.8" fill="#7B2FFF">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <rect x="8" y="13" width="24" height="12" rx="4" fill="#0D0D1A"/>
    <ellipse cx="15" cy="19" rx="3.5" ry="3.5" fill="#7B2FFF"/>
    <ellipse cx="25" cy="19" rx="3.5" ry="3.5" fill="#7B2FFF"/>
    <circle cx="15" cy="19" r="1.2" fill="white"/>
    <circle cx="25" cy="19" r="1.2" fill="white"/>
    {/* scan line */}
    <rect x="8" y="18" width="24" height="1.5" fill="#7B2FFF" opacity="0.25">
      <animate attributeName="y" values="14;23;14" dur="2s" repeatCount="indefinite"/>
    </rect>
    <rect x="10" y="29" width="20" height="4" rx="2" fill="#0D0D1A"/>
    <rect x="12" y="30" width="5" height="2" rx="1" fill="#7B2FFF" opacity="0.8"/>
    <rect x="19" y="30" width="8" height="2" rx="1" fill="#7B2FFF" opacity="0.4"/>
    {/* ear bolts */}
    <circle cx="4" cy="19" r="2.5" fill="#1A1A2E" stroke="#7B2FFF" strokeWidth="1"/>
    <circle cx="36" cy="19" r="2.5" fill="#1A1A2E" stroke="#7B2FFF" strokeWidth="1"/>
  </svg>
);

// ─── Happy agent avatar (appears at booking) ──────────────────────────────────
const AgentAvatar = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
    <circle cx="20" cy="20" r="18" fill="#FFBF69" stroke="#F4A828" strokeWidth="1.5"/>
    <path d="M6 18 Q8 5 20 4 Q32 5 34 18 Q28 10 20 12 Q12 10 6 18Z" fill="#2D1B00"/>
    {/* relaxed squint */}
    <path d="M11 20 Q14 17 17 20" stroke="#2D1B00" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M23 20 Q26 17 29 20" stroke="#2D1B00" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* big smile */}
    <path d="M12 27 Q20 34 28 27" stroke="#2D1B00" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M12 27 Q20 34 28 27 Q20 31 12 27Z" fill="#FF6B6B" opacity="0.35"/>
    {/* calendar check */}
    <rect x="2" y="26" width="9" height="9" rx="1.5" fill="#7B2FFF" opacity="0.15" stroke="#7B2FFF" strokeWidth="0.8"/>
    <path d="M4 31 L6 33 L10 29" stroke="#7B2FFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Single bubble ────────────────────────────────────────────────────────────
const Bubble = ({ msg, visible, showAgent }) => {
  const isLead = msg.from === "lead";
  const { x, y } = polar(msg.angle, msg.radius);

  // Bubble anchor — shift so bubble doesn't overlap center
  // We nudge away from center based on quadrant
  const nudgeX = x > 0 ? 8 : -8;
  const nudgeY = y > 0 ? 6 : -6;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, scale: 0.65, x: x * 0.5, y: y * 0.5 }}
          animate={{ opacity: 1, scale: 1, x: x + nudgeX, y: y + nudgeY }}
          exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: -18,
            marginLeft: -18,
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <div className={`flex items-end gap-1.5 max-w-[175px] ${isLead ? "flex-row" : "flex-row-reverse"}`}>
            {/* Avatar */}
            <div className={`
              w-8 h-8 shrink-0 rounded-xl overflow-hidden border shadow-md
              ${isLead ? "border-amber-200 bg-amber-50" : "border-primary/40 bg-ink"}
            `}>
              {isLead
                ? <LeadAvatar />
                : (msg.isClosing && showAgent ? <AgentAvatar /> : <AGSAvatar />)
              }
            </div>

            {/* Bubble */}
            <div className={`
              relative px-3 py-2 rounded-2xl shadow-md text-[11px] font-body leading-snug
              ${isLead
                ? "bg-white border border-line text-ink rounded-bl-sm"
                : msg.isClosing
                  ? "bg-primary text-white rounded-br-sm shadow-primary/25"
                  : "bg-ink text-white rounded-br-sm"
              }
            `}>
              {msg.text}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Rotating orbit ring ──────────────────────────────────────────────────────
const Ring = ({ r, opacity, dur, reverse }) => (
  <motion.div
    className="absolute rounded-full border border-line pointer-events-none"
    style={{ width: r * 2, height: r * 2, top: "50%", left: "50%", marginTop: -r, marginLeft: -r, opacity }}
    animate={{ rotate: reverse ? -360 : 360 }}
    transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
  />
);

// ─── Dashed connector from center to each bubble ──────────────────────────────
const Spoke = ({ msg, visible }) => {
  const { x, y } = polar(msg.angle, msg.radius * 0.55);
  const len = msg.radius * 0.52;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: len,
            height: 1,
            transformOrigin: "left center",
            transform: `rotate(${msg.angle}deg)`,
            marginTop: -0.5,
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <motion.div
            className="h-full"
            style={{
              background: msg.from === "lead"
                ? "linear-gradient(to right, transparent, #C8BEEE)"
                : "linear-gradient(to right, transparent, #7B2FFF60)",
              borderTop: "1px dashed",
              borderColor: msg.from === "lead" ? "#C8BEEE" : "#7B2FFF50",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const AGSFlowAnimation = () => {
  const [visibleIds, setVisibleIds] = useState(new Set());
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    setVisibleIds(new Set());
    const timers = MESSAGES.map((m) =>
      setTimeout(() => setVisibleIds((prev) => new Set([...prev, m.id])), m.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [cycleKey]);

  const isComplete = visibleIds.has(8);
  const msgCount = visibleIds.size;

  const statusText = msgCount === 0
    ? "Waiting for lead..."
    : msgCount < 3
    ? "Lead engaged..."
    : msgCount < 6
    ? "Qualifying buyer..."
    : msgCount < 8
    ? "Scheduling showing..."
    : "Appointment booked ✓";

  return (
    <div className="w-full bg-white border border-line rounded-2xl shadow-xl shadow-ink/5 overflow-hidden select-none">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-line">
        <div className="flex items-center gap-2.5">
          <motion.span
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <p className="font-label text-xs text-ink font-semibold">AGS — Live</p>
          <span className="font-label text-[10px] text-ink-dim border border-line px-2 py-0.5 rounded-full">
            {statusText}
          </span>
        </div>
        <button
          onClick={() => setCycleKey((k) => k + 1)}
          className="font-label text-[10px] text-ink-dim hover:text-primary transition-colors uppercase tracking-widest"
        >
          ↺ Replay
        </button>
      </div>

      {/* ── Canvas ── */}
      <div className="relative flex items-center justify-center bg-surface overflow-hidden" style={{ height: 440 }}>

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #C8BEEE 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />

        {/* Orbit rings */}
        <Ring r={58}  opacity={0.5}  dur={20}  />
        <Ring r={108} opacity={0.3}  dur={35}  reverse />
        <Ring r={168} opacity={0.15} dur={55}  />

        {/* Spokes */}
        {MESSAGES.map((m) => (
          <Spoke key={`spoke-${m.id}-${cycleKey}`} msg={m} visible={visibleIds.has(m.id)} />
        ))}

        {/* Bubbles */}
        {MESSAGES.map((m) => (
          <Bubble key={`bubble-${m.id}-${cycleKey}`} msg={m} visible={visibleIds.has(m.id)} showAgent={isComplete} />
        ))}

        {/* ── Central AGS Node ── */}
        <div className="relative z-30 flex flex-col items-center gap-2">
          <motion.div
            className="w-[72px] h-[72px] rounded-2xl bg-ink border-2 border-primary overflow-hidden shadow-2xl"
            animate={{
              boxShadow: isComplete
                ? ["0 0 0px #7B2FFF40", "0 0 40px #7B2FFF70", "0 0 0px #7B2FFF40"]
                : ["0 0 0px #7B2FFF20", "0 0 18px #7B2FFF35", "0 0 0px #7B2FFF20"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AGSAvatar />
          </motion.div>
          <div className="text-center">
            <p className="font-label text-[10px] text-primary font-bold uppercase tracking-widest">SuperStaff</p>
            <p className="font-label text-[9px] text-ink-dim mt-0.5">AGS Active</p>
          </div>
        </div>

      </div>

      {/* ── Footer ── */}
      <motion.div
        animate={{ opacity: isComplete ? 1 : 0, height: isComplete ? "auto" : 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden border-t border-line"
      >
        <div className="px-6 py-4 flex flex-wrap justify-center gap-5">
          {["Responded in under 3 seconds", "No ISA involved", "Appointment on the calendar"].map((t) => (
            <span key={t} className="font-label text-[10px] text-ink-dim">✓ {t}</span>
          ))}
        </div>
      </motion.div>

    </div>
  );
};

export default AGSFlowAnimation;
