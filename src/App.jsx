import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Logic from './components/Logic';
import ProtocolSection from './components/ProtocolSection';
import IntelligenceFeed from './components/IntelligenceFeed';
import FounderManifesto from './components/FounderManifesto';
import DiagnosticTerminal from './components/DiagnosticTerminal';

/**
 * App.jsx - ORVN LABS (Project AGS)
 * System Flow:
 * 1. Hero         → Entry + Positioning
 * 2. Logic        → Problem Exposure (The Leak)
 * 3. Protocol     → Solution Mechanism (The Deployment)
 * 4. Intelligence → Industrial Proof (The Deep-Dives)
 * 5. Manifesto    → Personal Authority (The Founder's Letter)
 * 6. Diagnostic   → Conversion Layer (The Infrastructure Extraction)
 */

function App() {
  return (
    <div className="bg-black min-h-screen selection:bg-primary/30 selection:text-white overflow-x-hidden">
      
      {/* GLOBAL NAVIGATION */}
      <Navbar />

      {/* SECTION 1: HERO */}
      <Hero />

      {/* SECTION 2: LOGIC */}
      <section id="logic">
        <Logic />
      </section>

      {/* SECTION 3: PROTOCOL */}
      <section id="protocol">
        <ProtocolSection />
      </section>

      {/* SECTION 4: INTELLIGENCE FEED */}
      <section id="intelligence" className="bg-[#0a0a0a]">
        <IntelligenceFeed />
      </section>

      {/* SECTION 5: FOUNDER'S MANIFESTO */}
      <section id="manifesto">
        <FounderManifesto />
      </section>

      {/* SECTION 6: DIAGNOSTIC TERMINAL */}
      <section id="terminal" className="relative bg-black">
        
        {/* Transition Header: Final psychological nudge */}
        <div className="max-w-6xl mx-auto text-center pt-32 pb-16 px-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 bg-primary animate-pulse shadow-[0_0_8px_rgba(204,151,255,0.5)]"></span>
            <span className="text-[10px] tracking-[0.2em] text-primary uppercase font-label font-bold">
              Final Protocol // 06
            </span>
          </div>

          <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase leading-tight">
            IDENTIFY THE <span className="text-primary italic">LEAK.</span><br />
            DEPLOY THE <span className="text-primary italic">FIX.</span>
          </h2>

          <p className="font-label text-on-surface-variant max-w-xl mx-auto text-sm tracking-wide leading-relaxed">
            Run a structured diagnostic across your infrastructure. 
            Surface missed revenue, broken follow-up chains, and latency gaps 
            within your current stack.
          </p>
        </div>

        {/* THE TERMINAL COMPONENT */}
        <DiagnosticTerminal />
      </section>

      {/* SPA FOOTER */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black text-center relative z-10">
        <div className="mb-8 opacity-20 hover:opacity-100 transition-opacity duration-500">
           <div className="text-xl font-black tracking-tighter text-white font-headline uppercase">ORVN LABS</div>
        </div>
        <p className="font-label text-[10px] uppercase tracking-[0.4em] text-neutral-600">
          © 2026 ORVN LABS — INFRASTRUCTURE SECURED
        </p>
      </footer>

    </div>
  );
}

export default App;