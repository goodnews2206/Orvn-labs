import { useState } from 'react';
import { X, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [showManifestoBar, setShowManifestoBar] = useState(true);

  return (
    <nav className="fixed top-0 w-full z-50 font-mono">
      {/* CEO Letter Announcement Bar - Refined per Palantir Reference */}
      <AnimatePresence>
        {showManifestoBar && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#1A1A1A] text-white py-3 px-6 flex justify-between items-center text-xs border-b border-white/10"
          >
            <div className="flex-1 text-center">
              <span className="opacity-80">Read CEO Daniel Oyegoke’s </span>
              <button 
                onClick={() => console.log("Open Manifesto Modal")} 
                className="underline underline-offset-4 hover:text-electric-purple transition-colors"
              >
                Letter to Partners
              </button>
            </div>
            <button 
              onClick={() => setShowManifestoBar(false)}
              className="opacity-50 hover:opacity-100 transition-opacity p-1"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation Bar */}
      <div className="bg-[#08080B]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Cpu className="text-electric-purple" size={20} />
          <span className="text-lg font-bold tracking-tighter text-white font-sans uppercase">
            ORVN <span className="text-electric-purple">Labs</span>
          </span>
        </div>

        {/* Desktop Links - Technical Industrial Style */}
        <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] text-white/50">
          <a href="#hero" className="hover:text-white transition-colors">[ INFRASTRUCTURE ]</a>
          <a href="#logic" className="hover:text-white transition-colors">[ LOGIC ]</a>
          <a href="#ags" className="hover:text-white transition-colors">[ AGS_PROTOCOL ]</a>
          <a href="#diagnostic" className="text-electric-purple hover:brightness-125 transition-all tracking-widest font-bold">
            // INITIATE_DIAGNOSTIC
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;