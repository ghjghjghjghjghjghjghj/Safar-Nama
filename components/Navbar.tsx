
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateView: (view: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onNavigateView }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigateHome(); // Ensure we are on home view before scrolling
    
    // Small delay to allow home view to mount if we were on another page
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-1000 ${isScrolled ? 'py-4' : 'py-10'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className={`rounded-full px-6 md:px-12 py-4 md:py-5 flex items-center justify-between transition-all duration-1000 ${isScrolled ? 'glass-concierge shadow-[0_40px_100px_rgba(0,0,0,0.05)]' : 'bg-transparent'}`}>
          
          <div className="flex items-center gap-4 md:gap-5 cursor-pointer group" onClick={onNavigateHome}>
            <div className="relative">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110 overflow-hidden shadow-sm border border-slate-50">
                <img src="https://i.ibb.co/35cTDnT6/Safar-Nama-Logo-bg.png" alt="Safar Nama Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-[-0.05em] uppercase italic leading-none text-slate-900">SAFAR NAMA</span>
              <span className="text-[7px] md:text-[8px] font-black tracking-[0.5em] text-slate-400 mt-1">THE GOLD STANDARD</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-12 xl:gap-16">
            <a href="#fleet" onClick={(e) => scrollToSection(e, 'fleet')} className="relative text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors group">The Fleet</a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="relative text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors group">Experience</a>
            <a href="#inquiry" onClick={(e) => scrollToSection(e, 'inquiry')} className="relative text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors group">Inquiry</a>
            <a href="#prive" onClick={(e) => scrollToSection(e, 'prive')} className="relative text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors group">Privé</a>
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={(e) => scrollToSection(e as any, 'fleet')}
              className="bg-slate-900 text-white px-6 md:px-10 py-3 md:py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all cursor-pointer"
            >
              Reserve
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
