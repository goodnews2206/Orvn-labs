  import React, { useEffect, useState } from "react";

const DiagnosticTerminal = () => {
  const fullText = "INITIATE INFRASTRUCTURE DIAGNOSTIC";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State for CMS/API parity
  const [formData, setFormData] = useState({
    ANNUAL_VOLUME: "< $10M",
    CURRENT_TECH_STACK: "",
    TOTAL_CRM_RECORDS: "",
    TEAM_HEADCOUNT: "",
    PRIMARY_SOURCE: "",
    WORK_EMAIL: ""
  });

  // Typing effect logic
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 35);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      /* ENDPOINT: POST your n8n/Zapier Webhook URL here
         This will trigger the Telegram/Gmail alert to the Architect
      */
      const webhookURL = "YOUR_N8N_WEBHOOK_URL_HERE"; 
      
      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          origin: "ORVN_LABS_DIAGNOSTIC"
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Infrastructure Sync Failed:", error);
    } finally {
      // Simulate "Extraction" time for aesthetic
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  return (
    <div id="diagnostic" className="bg-background text-on-surface font-body min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-20 border-t border-white/5">
      
      {/* Visual Grid Backdrop */}
      <div className="absolute inset-0 bg-obsidian-grid bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl animate-in fade-in zoom-in duration-700">
        
        {/* HEADER */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#cc97ff]"></span>
            <span className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">
              SYSTEM_READY // EXTRACTION_PROTOCOL_04
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tighter uppercase flex flex-wrap items-center">
            <span>{typedText.replace("DIAGNOSTIC", "")}</span>
            {typedText.includes("DIAGNOSTIC") && (
              <span className="text-primary ml-2 italic">DIAGNOSTIC</span>
            )}
            <span className="ml-2 w-[2px] h-10 bg-primary animate-pulse"></span>
          </h1>
        </div>

        {/* TERMINAL UI */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden shadow-2xl">
          
          {isSuccess ? (
            <div className="p-20 text-center space-y-6">
              <div className="text-primary text-6xl animate-bounce">⬢</div>
              <h2 className="font-headline text-3xl text-white">DATA EXTRACTED</h2>
              <p className="text-on-surface-variant font-label text-sm tracking-widest">
                ARCHITECT NOTIFIED. ANALYZING INFRASTRUCTURE SILOS...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-12 grid md:grid-cols-2 gap-x-12 gap-y-8">
              
              {/* ANNUAL VOLUME */}
              <div className="space-y-2">
                <label className="text-[10px] font-label tracking-[0.3em] text-primary uppercase font-bold">ANNUAL_VOLUME</label>
                <select 
                  name="ANNUAL_VOLUME"
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary outline-none transition-colors appearance-none text-on-surface"
                >
                  <option className="bg-black">Less than $10M</option>
                  <option className="bg-black">$10M – $50M</option>
                  <option className="bg-black">$50M – $100M</option>
                  <option className="bg-black">$100M+</option>
                </select>
              </div>

              {/* TECH STACK */}
              <div className="space-y-2">
                <label className="text-[10px] font-label tracking-[0.3em] text-white uppercase font-bold">CURRENT_TECH_STACK</label>
                <input
                  name="CURRENT_TECH_STACK"
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="E.G. FOLLOW UP BOSS, SALESFORCE"
                />
              </div>

              {/* CRM RECORDS */}
              <div className="space-y-2">
                <label className="text-[10px] font-label tracking-[0.3em] text-white uppercase font-bold">TOTAL_CRM_RECORDS</label>
                <input
                  name="TOTAL_CRM_RECORDS"
                  type="number"
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="APPROXIMATE LEAD COUNT"
                />
              </div>

              {/* HEADCOUNT */}
              <div className="space-y-2">
                <label className="text-[10px] font-label tracking-[0.3em] text-white uppercase font-bold">TEAM_HEADCOUNT</label>
                <input
                  name="TEAM_HEADCOUNT"
                  type="number"
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="TOTAL AGENTS / ISAS"
                />
              </div>

              {/* PRIMARY SOURCE */}
              <div className="space-y-2">
                <label className="text-[10px] font-label tracking-[0.3em] text-white uppercase font-bold">PRIMARY_SOURCE</label>
                <input
                  name="PRIMARY_SOURCE"
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="ZILLOW / GOOGLE / REFERRALS"
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-[10px] font-label tracking-[0.3em] text-primary uppercase font-bold">WORK_EMAIL</label>
                <input
                  name="WORK_EMAIL"
                  type="email"
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="SECURE_ADDRESS@CORP.COM"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="md:col-span-2 pt-6 flex flex-col md:flex-row items-center gap-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-12 py-5 bg-primary text-black font-headline font-black tracking-widest text-sm uppercase relative overflow-hidden transition-all hover:scale-105 active:scale-95 ${isSubmitting ? 'opacity-50 cursor-wait' : ''}`}
                >
                  {isSubmitting ? "PROCESSING..." : "EXECUTE DIAGNOSTIC"}
                  {isSubmitting && <div className="absolute bottom-0 left-0 h-1 bg-white animate-load"></div>}
                </button>

                <div className="text-on-surface-variant font-label text-[9px] max-w-xs leading-loose tracking-[0.1em]">
                  BY EXECUTING, YOU INITIATE A MANUAL AUDIT BY THE ORVN ARCHITECT. DATA IS ENCRYPTED AND USED ONLY FOR INFRASTRUCTURE RECOVERY.
                </div>
              </div>
            </form>
          )}

          {/* STATUS FOOTER */}
          <div className="bg-white/[0.03] px-6 py-3 border-t border-white/5 flex justify-between items-center text-[9px] font-label tracking-widest">
            <div className="flex gap-6">
              <span className="flex items-center gap-2 text-primary">
                <span className="w-1 h-1 bg-primary rounded-full animate-ping"></span> CORE_ACTIVE
              </span>
              <span className="text-neutral-500">SECURE_TUNNEL_ESTABLISHED</span>
            </div>
            <span className="text-neutral-600 hidden md:block uppercase">
              ORVN LABS // INFRASTRUCTURE SECURED // 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticTerminal;