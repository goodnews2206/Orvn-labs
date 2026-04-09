import React, { useState, useEffect } from 'react';

const Logic = () => {
  // CMS STATE: Initialize with your specific text
  const [content, setContent] = useState({
    tagline: "Leaking Alpha // 02",
    headlineMain: "YOUR BEST AGENT CAN’T OUT-WORK",
    headlineHighlight: "BUYER PSYCHOLOGY.",
    subHeadline: "Real estate is a game of impulse. While your team is asleep or overwhelmed, your buyer's intent is decaying. You cannot scale a $50M+ firm by just hiring more humans to manage human hesitation. You need a system that matches their speed.",
    columns: [
      {
        id: "death-window",
        label: "Metric: Lead Response Time",
        status: "DELAY",
        statusColor: "text-error",
        title: "The 5-Minute Death Window",
        body: "Your marketing just bought a high-intent lead, but buyer psychology decays in exactly 5 minutes. If your ISA is on another call, at lunch, or just slow, that buyer is already calling your competitor. Humans hesitate. The AGS strikes instantly.",
        footer: "LOST OPPORTUNITY",
        footerBg: "bg-error/10 text-error"
      },
      {
        id: "cherry-picking",
        label: "Status: Follow-Up",
        status: "INCONSISTENT",
        statusColor: "text-primary",
        title: "The Cherry-Picking ISA",
        body: "You are losing millions to human friction. Agents cherry-pick the 'easy' deals and let the rest rot in your pipeline because they hate the follow-up grind. We replace human emotion and fatigue with a SuperStaff that relentlessly qualifies every single lead, 24/7.",
        footer: "HUMAN LIMITATION",
        footerBg: "bg-primary/10 text-primary"
      },
      {
        id: "crm-graveyard",
        label: "System State",
        status: "DISCONNECTED",
        statusColor: "text-secondary",
        title: "The CRM Graveyard",
        body: "You spend thousands to make your phone ring, but your disconnected systems turn your CRM into a graveyard. You can't see which leads are dying or who dropped the ball. We wire your marketing and sales pipes together so a deal never gets lost in the dark again.",
        footer: "NO VISIBILITY",
        footerBg: "bg-secondary/10 text-secondary"
      }
    ]
  });

  /* CMS ENDPOINT: GET /api/v1/content/logic 
     Replace the initial state with data from your database here.
  */
  useEffect(() => {
    // const syncCMS = async () => {
    //   const res = await fetch('/api/v1/content/logic');
    //   const data = await res.json();
    //   setContent(data);
    // };
    // syncCMS();
  }, []);

  return (
    <div id="logic" className="bg-background text-on-surface font-body overflow-x-hidden selection:bg-primary selection:text-black min-h-screen relative border-t border-white/5">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-obsidian-grid bg-[size:40px_40px] pointer-events-none opacity-20"></div>

      <main className="py-32 relative z-10">
        <div className="container mx-auto px-8">
          
          {/* Headline Section */}
          <div className="max-w-5xl mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-primary"></span>
              <span className="font-label text-primary uppercase tracking-[0.3em] text-[10px]">
                {content.tagline}
              </span>
            </div>
            <h1 className="font-headline font-bold text-4xl md:text-6xl lg:text-[3.5rem] leading-[1.1] tracking-tighter text-white mb-8 uppercase">
              {content.headlineMain} <br/>
              <span className="text-primary italic">{content.headlineHighlight}</span>
            </h1>
            <p className="font-body text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
              {content.subHeadline}
            </p>
          </div>

          {/* Technical Grid (Dynamic Mapping) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/5 bg-black/50 backdrop-blur-sm overflow-hidden">
            
            {content.columns.map((col, index) => (
              <div 
                key={col.id} 
                className={`relative p-10 border-white/5 hover:bg-white/[0.02] transition-all duration-500 group ${index !== 2 ? 'md:border-r' : ''} border-b md:border-b-0`}
              >
                <div className="flex justify-between items-start mb-16">
                  <span className="font-label text-[10px] text-neutral-500 tracking-widest uppercase">{col.label}</span>
                  <span className={`${col.statusColor} font-mono text-[10px] font-bold tracking-tighter animate-pulse`}>
                    ● {col.status}
                  </span>
                </div>
                
                {/* DYNAMIC VISUALS BASED ON COLUMN ID */}
                <div className="h-48 flex items-center justify-center mb-12 relative overflow-hidden">
                  
                  {/* Visual 1: Decaying Timer */}
                  {col.id === "death-window" && (
                    <div className="relative flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-2 border-white/5 border-t-error animate-spin [animation-duration:3s]"></div>
                      <div className="absolute font-mono text-error text-2xl font-bold tracking-tighter">04:59</div>
                      <div className="absolute -inset-4 bg-error/5 blur-2xl rounded-full animate-pulse"></div>
                    </div>
                  )}

                  {/* Visual 2: Cherry Picking Chain */}
                  {col.id === "cherry-picking" && (
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center grayscale opacity-30">👤</div>
                      <div className="w-1 h-[1px] bg-white/20"></div>
                      <div className="w-14 h-14 rounded bg-primary/20 border border-primary/50 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(168,85,247,0.4)] animate-bounce">👤</div>
                      <div className="w-1 h-[1px] bg-white/20"></div>
                      <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center grayscale opacity-30">👤</div>
                    </div>
                  )}

                  {/* Visual 3: CRM Graveyard (Blinking Grid) */}
                  {col.id === "crm-graveyard" && (
                    <div className="grid grid-cols-6 gap-2 w-full max-w-[200px]">
                      {[...Array(18)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-4 rounded-sm transition-all duration-1000 ${
                            i % 4 === 0 ? 'bg-secondary/40 animate-pulse' : 'bg-white/5'
                          }`}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>

                <h3 className="font-headline text-2xl text-white mb-4 uppercase tracking-tight leading-tight">
                  {col.title.split(' ').map((word, i) => (
                    <span key={i}>{word} {i === 1 ? <br/> : ''}</span>
                  ))}
                </h3>
                
                <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-8 min-h-[80px]">
                  {col.body}
                </p>

                <div className={`flex items-center gap-2 font-label text-[10px] font-bold py-1.5 px-3 w-fit tracking-widest ${col.footerBg}`}>
                  {col.footer}
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* CMS ENDPOINT: POST /api/v1/diagnostic/start 
             Triggered by bottom section or diagnostic call.
          */}
        </div>
      </main>
    </div>
  );
};

export default Logic;