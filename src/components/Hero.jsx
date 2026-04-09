import React, { useState } from 'react';

const Hero = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  
  const content = {
    ceoName: "Daniel Oyegoke",
    statsValue: "1,244,092",
    subHeadline: "The AGS Framework deploys an autonomous SuperStaff that captures, qualifies, and converts demand before your agents ever step in. Built to recover millions for $50M+ operators.",
  };

  // Direct scroll function for the Manifesto
  const scrollToManifesto = () => {
    const section = document.querySelector('#manifesto');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary selection:text-black min-h-screen flex flex-col relative overflow-x-hidden">
      
      {/* TOP BANNER */}
      {isBannerVisible && (
        <div className="fixed top-0 w-full z-[60] bg-neutral-950 text-white border-b border-neutral-800 px-6 py-3 flex justify-between items-center animate-in slide-in-from-top duration-300">
          <div className="flex-1 text-center font-label text-[11px] md:text-xs uppercase tracking-widest">
            Read CEO {content.ceoName}’s <button onClick={scrollToManifesto} className="underline decoration-primary underline-offset-4 hover:text-primary transition-colors">Letter to Shareholders</button>
          </div>
          <button onClick={() => setIsBannerVisible(false)} className="text-neutral-500 hover:text-white transition-colors p-1">✕</button>
        </div>
      )}

      {/* NAVBAR */}
      <nav className={`fixed ${isBannerVisible ? 'top-[45px]' : 'top-0'} w-full z-50 bg-neutral-950/60 backdrop-blur-xl flex justify-between items-center px-8 py-4 border-b border-neutral-900/50 transition-all duration-300`}>
        <div className="text-xl font-black tracking-tighter text-neutral-50 font-headline uppercase">
          ORVN LABS
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 font-label font-bold tracking-tight uppercase text-xs">
            <a className="text-neutral-500 hover:text-primary transition-colors" href="#logic">Logic</a>
            <a className="text-neutral-500 hover:text-primary transition-colors" href="#protocol">Protocol</a>
            <button onClick={scrollToManifesto} className="text-primary border-b-2 border-primary pb-1 cursor-pointer">The Letter</button>
          </div>
          <div className="flex items-center gap-4 border-l border-neutral-900 pl-8">
            <button className="bg-gradient-to-br from-primary to-primary-container text-black px-5 py-1.5 rounded-md font-label font-bold text-xs uppercase tracking-wider transition-transform active:scale-95">
              Deploy
            </button>
          </div>
        </div>
      </nav>

      {/* HERO MAIN */}
      <main className="flex-1">
        <section className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-20">
          <div className="absolute inset-0 bg-obsidian-grid bg-[size:60px_60px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] opacity-30 z-0"></div>

          <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-sm border border-outline-variant/10">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">System Active</span>
              </div>

              <h1 className="font-headline font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.85] text-on-surface">
                REAL ESTATE IS 10% BRICK AND 90% HUMAN PSYCHOLOGY.<br /><br />
                THE BRICK IS <span className="text-primary-dim">10%.</span><br />
                WE ENGINEER <span className="[text-shadow:0_0_15px_rgba(204,151,255,0.4)] text-primary">THE 90%.</span>
              </h1>

              <p className="font-label text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
                The AGS Framework deploys an <span className="text-white font-semibold">autonomous SuperStaff</span> that captures, qualifies, and converts demand before your agents ever step in. Built to recover millions for <span className="text-secondary font-bold">$50M+ operators.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <button className="group relative px-8 py-5 bg-surface-container-high/40 backdrop-blur-md border border-primary/30 rounded-lg overflow-hidden transition-all hover:border-primary">
                  <span className="relative z-10 font-label font-bold tracking-widest text-on-surface flex items-center gap-3 uppercase">
                    [Find My Revenue Leak]
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                <div className="flex flex-col gap-1 font-label">
                  <span className="text-[10px] text-neutral-600 uppercase tracking-widest">Active Nodes</span>
                  <span className="text-xl font-bold text-neutral-300">{content.statsValue}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 relative hidden xl:block">
              <div className="aspect-square bg-surface-container-low rounded-xl border border-outline-variant/10 relative overflow-hidden flex items-center justify-center p-8 group">
                <div className="absolute inset-0 bg-obsidian-grid bg-[size:60px_60px] opacity-20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                  alt="Industrial Infrastructure" 
                  className="w-full h-full object-cover rounded-lg opacity-40 mix-blend-screen grayscale transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Hero;