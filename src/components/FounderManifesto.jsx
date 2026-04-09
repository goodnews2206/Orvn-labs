import React from 'react';

const FounderManifesto = () => {
  return (
    <section id="manifesto" className="relative py-32 px-8 bg-background overflow-hidden border-t border-white/5">
      
      {/* ARCHITECTURAL GRID BACKDROP */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(204, 151, 255, 0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(204, 151, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col mb-20">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-[1px] w-12 bg-primary"></span>
            <span className="font-label text-xs tracking-[0.3em] uppercase text-primary font-bold">
              Protocol VI: The Founder’s Manifesto
            </span>
          </div>
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.85] text-white uppercase">
            A LETTER FROM THE FOUNDER: <br />
            I KNOW YOUR <span className="text-primary italic text-6xl md:text-8xl">LEAKS</span> BECAUSE I LIVED THEM.
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          
          {/* LEFT COLUMN: IDENTITY DATA (No Image) */}
          <div className="md:col-span-4 space-y-6">
            <div className="p-8 bg-surface-container-low border border-white/10 rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-20">
                <div className="w-12 h-12 border-t-2 border-r-2 border-primary"></div>
              </div>
              
              <p className="font-label text-[10px] text-primary uppercase tracking-[0.4em] mb-8">Authentication Trace</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-neutral-500 font-label text-[9px] uppercase tracking-widest">Origin</p>
                  <p className="text-white font-bold text-sm uppercase">Daniel Oyegoke</p>
                </div>
                <div>
                  <p className="text-neutral-500 font-label text-[9px] uppercase tracking-widest">Designation</p>
                  <p className="text-white font-bold text-sm uppercase">Real Estate Architect</p>
                </div>
                <div>
                  <p className="text-neutral-500 font-label text-[9px] uppercase tracking-widest">System Status</p>
                  <p className="text-primary font-bold text-sm uppercase animate-pulse">LOCKED // VERIFIED</p>
                </div>
              </div>
            </div>

            <div className="hidden md:block h-64 border-l border-white/5 ml-8"></div>
          </div>

          {/* RIGHT COLUMN: THE MANIFESTO TEXT */}
          <div className="md:col-span-8">
            <div className="font-body text-xl md:text-2xl leading-relaxed text-on-surface/90 font-light space-y-8">
              <p>
                "I didn’t start my career in a tech lab; I started in the trenches as a Realtor. 
                I was working my way through school, hustling for every deal. I was good at sales, 
                but at the end of the month, my profit margins were painfully low.
              </p>

              <p>
                The math didn't make sense until I looked at the friction: <span className="text-white font-medium italic">I had too many leads and not enough speed.</span> 
                By the time I could manually respond to an inquiry, the prospect had already moved on.
              </p>

              <p>
                I thought this <span className="text-white font-bold italic underline decoration-primary/50 underline-offset-4">'Lead-to-Speed Death'</span> was just a solo-agent problem. 
                But when I joined a large brokerage, I realized it was an industry-wide epidemic. Even with a floor full of human ISAs, the firm was still bleeding cash. We were leaving millions in revenue on the table simply because humans cannot scale speed.
              </p>

              <div className="py-10 border-y border-white/10 my-12">
                <p className="text-white text-3xl md:text-4xl font-headline font-black leading-tight tracking-tighter uppercase">
                  That is where the <span className="text-primary italic">AGS</span> was born.
                </p>
              </div>

              <p className="text-on-surface-variant">
                Before I ever integrated AI or built a tech infrastructure, I did what any smart broker would do: I manually engineered the AGS framework to intercept, qualify, and track leads without the 'Slack Hand' of human error.
              </p>

              <p className="text-on-surface-variant">
                The result? <span className="text-white font-bold">Revenue shot up by 600%.</span> Valuation? Up by 20% in the first 3 months. 
                That manual proof-of-concept validated the architecture we use today. I am not an 'AI guy' trying to sell you software. I am a Real Estate Architect who built the exact SuperStaff I desperately needed back then.
              </p>

              {/* THE BIG COLOR CLOSING */}
              <div className="pt-20">
                <h2 className="font-headline text-8xl md:text-[14rem] font-black text-primary leading-none tracking-tighter">
                  1+1=3.
                </h2>
                <p className="font-headline text-3xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
                  We will do great things.
                </p>
              </div>

              {/* SIGNATURE AREA */}
              <div className="pt-16 mt-16 flex flex-col items-start">
                <p className="text-4xl md:text-5xl font-headline font-black text-white italic tracking-tighter mb-2 underline decoration-primary decoration-4">
                  Daniel Oyegoke
                </p>
                <div className="h-[2px] w-64 bg-gradient-to-r from-primary to-transparent opacity-50"></div>
                <p className="font-label text-[10px] text-neutral-500 uppercase tracking-[0.5em] mt-4">
                  FOUNDER, ORVN LABS // ARCHITECT
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderManifesto;