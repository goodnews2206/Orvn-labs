import React, { useState, useEffect } from "react";

const ProtocolSection = () => {
  // CMS STATE: Initialize with your specific text
  const [content, setContent] = useState({
    tagline: "AGS SYSTEM // 03",
    headline: "THE AGS PROTOCOL: WE DON'T ADVISE. WE DEPLOY.",
    subHeadline: "This isn't another software tool your agents will refuse to use. This is an autonomous SuperStaff that lives inside your current systems and does the work for them.",
    pillars: [
      {
        id: "integration",
        title: "INTEGRATION",
        subtitle: "The Autonomous Embed",
        body: "Your CRM is currently a storage unit; we turn it into an engine. The SuperStaff embeds seamlessly into your existing stack (Follow Up Boss, Salesforce, HubSpot) with zero downtime. It lives in your pipes, monitoring every inbound signal 24/7. No new logins, no learning curve for your team.",
      },
      {
        id: "interpretation",
        title: "INTERPRETATION",
        subtitle: "Mining the Graveyard",
        body: "We don't just catch new leads; we resurrect the old ones. The AGS analyzes your historical data, learns your top producer’s exact communication style, and systematically reactivates the 'Dead Alpha'—the thousands of leads your human ISAs gave up on months ago. We turn your neglected database back into cash flow.",
      },
      {
        id: "implementation",
        title: "IMPLEMENTATION",
        subtitle: "The 3-Second Interception",
        body: "The SuperStaff takes the front line. It intercepts inbound leads within 3 seconds, qualifies them ruthlessly via SMS and Email, and drops the appointment directly onto your calendar. Your team stops chasing ghosts, stops making cold calls, and only talks to buyers who are actively ready to close.",
      }
    ]
  });

  /* CMS ENDPOINT: GET /api/v1/content/protocol 
     Sync this section with your CMS dashboard.
  */

  return (
    <main id="protocol" className="relative bg-background text-on-surface overflow-x-hidden border-t border-white/5">
      {/* 1. HERO & FLOWCHART SECTION */}
      <section className="relative pt-32 pb-12 px-8 max-w-screen-2xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: Copy */}
          <div className="z-10 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20">
              <span className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">
                {content.tagline}
              </span>
            </div>

            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] text-white">
              THE AGS PROTOCOL: <br />
              <span className="italic text-primary">WE DON'T ADVISE. WE DEPLOY.</span>
            </h1>

            <p className="font-body text-xl text-on-surface-variant leading-relaxed max-w-xl">
              {content.subHeadline.split("autonomous SuperStaff")[0]}
              <span className="text-white font-semibold underline decoration-primary underline-offset-4">autonomous SuperStaff</span>
              {content.subHeadline.split("autonomous SuperStaff")[1]}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-sm">
                <span className="text-primary animate-pulse">●</span>
                <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant">Autonomous Embed</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-sm">
                <span className="text-primary">⚡</span>
                <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant">3s Interception</span>
              </div>
            </div>
          </div>

          {/* RIGHT: THE FLOWCHART (Dan's Visual) */}
          <div className="relative">
             <div className="absolute inset-0 bg-primary/10 blur-[150px] rounded-full"></div>
             
             <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 bg-black/40 backdrop-blur-3xl border border-white/5 p-10 rounded-2xl">
                
                {/* 1. THE FRICTION (Messy tangle) */}
                <div className="flex flex-col gap-3 w-full md:w-1/3 opacity-30 grayscale blur-[1px]">
                   <p className="font-label text-[10px] text-center mb-2 tracking-widest text-error">THE FRICTION</p>
                   <div className="h-12 border border-dashed border-white/20 rounded flex items-center justify-center text-[10px]">MISSED CALL</div>
                   <div className="h-12 border border-dashed border-white/20 rounded flex items-center justify-center text-[10px]">DECAYING INTENT</div>
                   <div className="h-12 border border-dashed border-white/20 rounded flex items-center justify-center text-[10px]">CRM SILO</div>
                </div>

                {/* 2. THE AGS NODE (The Centerpiece) */}
                <div className="relative z-20 scale-110">
                   <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
                   <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-container p-[1px] rounded-xl rotate-45">
                      <div className="w-full h-full bg-black rounded-xl flex items-center justify-center -rotate-45">
                         <span className="text-primary text-4xl animate-pulse">⬢</span>
                      </div>
                   </div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary/20 rounded-full animate-spin [animation-duration:8s]"></div>
                </div>

                {/* 3. THE CLOSE (Clean Calendar) */}
                <div className="flex flex-col gap-3 w-full md:w-1/3">
                   <p className="font-label text-[10px] text-center mb-2 tracking-widest text-primary">THE CLOSE</p>
                   <div className="h-12 bg-primary/10 border border-primary/40 rounded flex items-center justify-between px-4 text-[10px] font-bold">
                      CALENDAR BOOKED <span className="text-primary">✓</span>
                   </div>
                   <div className="h-12 bg-primary/10 border border-primary/40 rounded flex items-center justify-between px-4 text-[10px] font-bold">
                      QUALIFIED LEAD <span className="text-primary">✓</span>
                   </div>
                   <div className="h-12 bg-primary/10 border border-primary/40 rounded flex items-center justify-between px-4 text-[10px] font-bold">
                      REVENUE SECURED <span className="text-primary">✓</span>
                   </div>
                </div>

                {/* CONNECTOR LINES (SVG for clean paths) */}
                <div className="hidden md:block absolute top-1/2 left-[30%] w-[12%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-primary"></div>
                <div className="hidden md:block absolute top-1/2 right-[30%] w-[12%] h-[2px] bg-gradient-to-r from-primary via-white/20 to-transparent"></div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. DEPLOYMENT BLOCKS (The Details) */}
      <section className="py-32 px-8 max-w-screen-2xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-0 border border-white/5">
          {content.pillars.map((pillar, i) => (
            <div
              key={pillar.id}
              className="group relative flex flex-col p-12 bg-black hover:bg-white/[0.02] transition-all duration-500 border-r border-white/5 last:border-r-0"
            >
              <div className="font-headline text-5xl text-white/5 mb-10 group-hover:text-primary/10 transition-colors">{`0${i + 1}`}</div>
              
              <div className="space-y-4">
                <h3 className="font-headline text-2xl font-bold text-white tracking-tight uppercase">
                  {pillar.title}
                </h3>
                <div className="font-label text-[10px] text-primary uppercase tracking-[0.3em] font-bold">
                  {pillar.subtitle}
                </div>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed pt-4">
                  {pillar.body}
                </p>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </section>

      {/* CMS ENDPOINT: POST /api/v1/leads/sync 
         This endpoint handles the "Autonomous Embed" logic once deployed.
      */}
    </main>
  );
};

export default ProtocolSection;