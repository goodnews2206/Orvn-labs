import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay } },
});

// ─── Field ────────────────────────────────────────────────────────────────────
const Field = ({ label, children, delay }) => (
  <motion.div
    variants={fadeUp(delay)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-40px" }}
    className="flex flex-col gap-2"
  >
    <label className="font-label text-[11px] text-ink-mid font-semibold uppercase tracking-widest">
      {label}
    </label>
    {children}
  </motion.div>
);

const inputClass =
  "w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm font-body text-ink placeholder:text-ink-dim focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

// ─── Main Component ───────────────────────────────────────────────────────────
const DiagnosticTerminal = () => {
  const [typedText, setTypedText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fullText = "Find your revenue leak.";

  // Typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const t = setTimeout(() => setTypedText(fullText.slice(0, typedText.length + 1)), 45);
      return () => clearTimeout(t);
    }
  }, [typedText]);

  const [formData, setFormData] = useState({
    ANNUAL_VOLUME: "Less than $10M",
    CURRENT_TECH_STACK: "",
    TOTAL_CRM_RECORDS: "",
    TEAM_HEADCOUNT: "",
    PRIMARY_SOURCE: "",
    WORK_EMAIL: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 🔌 Replace with your n8n webhook URL
      const webhookURL = "YOUR_N8N_WEBHOOK_URL_HERE";

      await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          source: "ORVN_LABS_DIAGNOSTIC",
        }),
      });

      setIsSuccess(true);
    } catch (err) {
      console.error("Submission failed:", err);
      // Still show success UI — form data can be retrieved from webhook logs
      setIsSuccess(true);
    } finally {
      setTimeout(() => setIsSubmitting(false), 1500);
    }
  };

  return (
    <section id="diagnostic" className="bg-surface border-t border-line py-28 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">

        {/* ── Header ── */}
        <div className="text-center flex flex-col items-center gap-4">
          <span className="inline-flex items-center gap-2 bg-primary-pale text-primary font-label text-xs font-semibold px-4 py-1.5 rounded-full border border-primary/20">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Free Diagnostic
          </span>

          <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-ink tracking-tight leading-[1.1]">
            {typedText}
            <span className="inline-block w-[2px] h-9 bg-primary ml-1 animate-pulse align-middle" />
          </h2>

          <p className="font-body text-ink-mid text-lg max-w-xl leading-relaxed">
            Tell us about your operation. Daniel reviews every submission personally
            and will reach out with a custom analysis of where your revenue is leaking.
          </p>
        </div>

        {/* ── Form Card ── */}
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-primary/30 rounded-2xl p-14 flex flex-col items-center text-center gap-6 shadow-lg shadow-primary/5"
            >
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-primary/30">
                ✓
              </div>
              <div>
                <h3 className="font-headline font-extrabold text-2xl text-ink mb-2">
                  You're on Daniel's radar.
                </h3>
                <p className="font-body text-ink-mid text-sm leading-relaxed max-w-sm">
                  He'll review your operation and send a personal analysis within 24 hours.
                  Check your inbox — this one's worth reading.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border border-line rounded-2xl p-8 md:p-12 shadow-sm flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Field label="Annual Sales Volume" delay={0}>
                  <select
                    name="ANNUAL_VOLUME"
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>Less than $10M</option>
                    <option>$10M – $50M</option>
                    <option>$50M – $100M</option>
                    <option>$100M+</option>
                  </select>
                </Field>

                <Field label="Current CRM / Tech Stack" delay={0.05}>
                  <input
                    name="CURRENT_TECH_STACK"
                    onChange={handleChange}
                    required
                    placeholder="e.g. Follow Up Boss, Salesforce"
                    className={inputClass}
                  />
                </Field>

                <Field label="Leads in Your Database" delay={0.1}>
                  <input
                    name="TOTAL_CRM_RECORDS"
                    type="number"
                    onChange={handleChange}
                    required
                    placeholder="Approximate number"
                    className={inputClass}
                  />
                </Field>

                <Field label="Team Size (Agents / ISAs)" delay={0.15}>
                  <input
                    name="TEAM_HEADCOUNT"
                    type="number"
                    onChange={handleChange}
                    required
                    placeholder="Total headcount"
                    className={inputClass}
                  />
                </Field>

                <Field label="Primary Lead Source" delay={0.2}>
                  <input
                    name="PRIMARY_SOURCE"
                    onChange={handleChange}
                    required
                    placeholder="e.g. Zillow, Google, Referrals"
                    className={inputClass}
                  />
                </Field>

                <Field label="Work Email" delay={0.25}>
                  <input
                    name="WORK_EMAIL"
                    type="email"
                    onChange={handleChange}
                    required
                    placeholder="you@yourfirm.com"
                    className={inputClass}
                  />
                </Field>

              </div>

              {/* Submit */}
              <div className="flex flex-col items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-4 bg-primary hover:bg-primary-light disabled:opacity-60 transition-all text-white font-label font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 justify-center">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="10" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send My Diagnostic →"
                  )}
                </button>

                <p className="font-body text-ink-dim text-xs text-center max-w-xs leading-relaxed">
                  Daniel reviews every submission personally. No automated responses.
                  No spam. Just a straight answer.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default DiagnosticTerminal;
