import React, { useState } from 'react';

const IntelligenceFeed = () => {
  // CMS STATE: Architect manually uploads YouTube ID, Miro URL, and Metadata here
  const [feedItems] = useState([
    {
      id: "session-01",
      tag: "ALPHA_REPORT_V.02",
      timestamp: "2024.08.12",
      title: "SYSTEM ARCHITECTURE MAP: CORE OMNI-CHANNEL",
      description: "Detailed visualization of the lead-handling logic through autonomous node networks. Analyzing the impact of sub-second response latency on conversion ratios.",
      youtubeId: "dQw4w9WgXcQ", // Replace with actual ID
      miroUrl: "#",
      miroTitle: "Open System Architecture Board",
      categories: ["DATA_VIS", "INFRA_STRAT"],
      sessionLabel: "CORE_LOGIC_SESSION_01"
    },
    {
      id: "session-02",
      tag: "P&L_AUDIT_X01",
      timestamp: "2024.08.15",
      title: "INDUSTRIAL RE P&L: OPTIMIZATION PARAMETERS",
      description: "A comprehensive deep-dive into real estate profit and loss frameworks. Identifying leakage points in traditional human-led operation models versus automated infrastructure.",
      youtubeId: "dQw4w9WgXcQ", // Replace with actual ID
      miroUrl: "#",
      miroTitle: "Watch Financial Analysis Session",
      categories: ["FINANCE", "OPERATIONS"],
      sessionLabel: "RE_P&L_DEEP_DIVE"
    }
  ]);

  return (
    <main id="intelligence" className="relative pt-32 pb-20 px-8 max-w-7xl mx-auto border-t border-white/5">
      
      {/* SECTION HEADER */}
      <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="font-label text-[10px] tracking-[0.2em] text-primary uppercase font-bold">
              Active Intelligence Feed // 05
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-white mb-6 uppercase leading-[0.9]">
            INDUSTRIAL <br/> INTELLIGENCE.
          </h1>
          <p className="text-on-surface-variant font-body text-lg max-w-lg leading-relaxed">
            Deep-dives into RE P&L reports, system architecture, and lead-handling logic. Verified repository of high-performance technical assets.
          </p>
        </div>
        
        <div className="hidden md:flex flex-col items-end gap-2 font-label text-[10px] text-neutral-500 tracking-widest">
          <span>LATENCY: 14MS</span>
          <span>STATUS: OPS_NORMAL</span>
          <div className="h-[1px] w-32 bg-white/10"></div>
        </div>
      </header>

      {/* REPOSITORY GRID */}
      <div className="grid grid-cols-1 gap-16">
        {feedItems.map((item) => (
          <article 
            key={item.id} 
            className="group relative bg-surface-container-low border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* MEDIA CANVAS (YOUTUBE EMBED) */}
              <div className="lg:col-span-7 relative h-[450px] bg-black">
                <iframe
                  className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                  src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=0&mute=1&controls=1`}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                
                {/* Floating Label */}
                <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md px-4 py-1.5 border border-white/10 rounded-sm text-[10px] font-label text-primary tracking-[0.2em] font-bold">
                  {item.sessionLabel}
                </div>
              </div>

              {/* TECHNICAL CONTENT */}
              <div className="lg:col-span-5 p-10 flex flex-col justify-between bg-[#111111]">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="bg-primary/10 text-primary font-label text-[10px] px-2 py-1 font-bold tracking-widest">
                      {item.tag}
                    </span>
                    <span className="text-neutral-600 font-label text-[10px] tracking-widest">
                      TS: {item.timestamp}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-headline font-bold text-white tracking-tighter uppercase leading-tight">
                    {item.title}
                  </h2>
                  
                  <p className="text-on-surface-variant font-body text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-10 space-y-4">
                  {/* MIRO LINK / ACTION */}
                  <a 
                    href={item.miroUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-5 bg-black border border-white/5 flex items-center gap-5 group/link hover:bg-white/[0.03] transition-all"
                  >
                    <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center text-primary group-hover/link:text-white transition-colors">
                      <span className="material-symbols-outlined">account_tree</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-label text-[9px] text-neutral-500 uppercase tracking-widest mb-1">Resource Link</div>
                      <div className="text-xs text-white uppercase font-bold tracking-tight group-hover/link:text-primary transition-colors">
                        {item.miroTitle}
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-neutral-600 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform text-sm">
                      north_east
                    </span>
                  </a>

                  {/* METADATA TAGS */}
                  <div className="flex gap-2">
                    {item.categories.map((cat) => (
                      <span key={cat} className="text-[9px] font-label text-neutral-500 bg-white/5 px-2 py-1 tracking-widest uppercase">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* SIDEBAR FLOATING INDEX */}
      <div className="hidden 2xl:block fixed right-12 top-1/2 -translate-y-1/2 space-y-4 pointer-events-none opacity-40">
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-primary to-transparent mx-auto"></div>
        <div 
          className="font-label text-[8px] text-primary tracking-[0.4em] uppercase py-4" 
          style={{ writingMode: 'vertical-rl' }}
        >
          REPOSITORY_INDEX_05
        </div>
      </div>
    </main>
  );
};

export default IntelligenceFeed;