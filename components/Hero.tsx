
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SafetyGauge = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const end = 100;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / end));
      
      const interval = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(interval);
      }, stepTime);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-slate-100 opacity-20" />
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <motion.circle
          cx="50%" cy="50%" r="48%"
          fill="transparent"
          stroke="#0f172a"
          strokeWidth="1.5"
          strokeDasharray="300"
          initial={{ strokeDashoffset: 300 }}
          animate={{ strokeDashoffset: 300 - (300 * count / 100) }}
          transition={{ duration: 2, ease: "circOut", delay: 1 }}
        />
      </svg>
      <div className="flex flex-col items-center">
        <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-300 mb-0.5">Safety</span>
        <div className="text-2xl font-black italic text-slate-900 leading-none">
          {count}<span className="text-[10px] ml-0.5">%</span>
        </div>
        <div className="w-6 h-[1px] bg-slate-900/10 my-1" />
        <span className="text-[5px] font-bold text-slate-400 uppercase tracking-widest">Verified</span>
      </div>
      {[...Array(8)].map((_, i) => (
        <div 
          key={i} 
          className="absolute w-full h-full" 
          style={{ transform: `rotate(${i * 45}deg)` }}
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-slate-200" />
        </div>
      ))}
    </div>
  );
};

const RadarScanner = () => (
  <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full border border-slate-100 overflow-hidden">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute top-1/2 left-1/2 w-full h-full origin-top-left bg-gradient-to-tr from-slate-900/5 to-transparent z-10"
        style={{ marginTop: '-1px', marginLeft: '-1px' }}
      />
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-[0.05]">
        {[...Array(16)].map((_, i) => <div key={i} className="border-[0.5px] border-slate-900" />)}
      </div>
    </div>
    <div className="flex flex-col items-center z-20">
      <span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-300 mb-0.5">Status</span>
      <div className="text-[9px] font-black text-slate-900 uppercase tracking-widest animate-pulse">Scanning</div>
      <span className="text-[5px] font-bold text-slate-400 uppercase mt-0.5">Live Fleet</span>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  const carScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const carY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  return (
    <section className="relative min-h-screen bg-white flex flex-col items-center justify-center pt-32 overflow-hidden">
      {/* Technical Background Layer */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-24 left-0 w-full overflow-hidden flex whitespace-nowrap opacity-10">
          {[...Array(10)].map((_, i) => (
            <motion.span 
              key={i} 
              animate={{ x: [0, -2000] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="text-[10px] font-black uppercase tracking-[1em] px-20"
            >
              PRECISION ENGINEERING • GLOBAL MOBILITY • PLATINUM STANDARDS • ELITE FLEET •
            </motion.span>
          ))}
        </div>
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-100" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-100" />
      </div>

      <div className="max-w-7xl mx-auto px-8 w-full relative z-10 text-center">
        
        {/* Main Content Area */}
        <motion.div 
          style={{ y: textY, opacity }}
          className="relative mb-12 md:mb-20 flex flex-col items-center"
        >
          {/* Top Status Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-12"
          >
            <div className="px-5 py-1.5 rounded-full border border-slate-900/5 bg-slate-50 mb-3">
              <span className="text-[7px] font-black uppercase tracking-[0.5em] text-slate-400">System Core Active</span>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                  className="w-4 h-1 bg-slate-900/20 rounded-full" 
                />
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 xl:gap-24 w-full">
            
            {/* LEFT GRAPHIC */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: "circOut" }}
              className="hidden lg:block relative"
            >
              <SafetyGauge />
              <div className="absolute top-1/2 -right-12 w-12 h-[0.5px] bg-slate-100" />
            </motion.div>

            {/* CENTRAL HEADLINE BLOCK */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="flex items-center justify-center gap-6 mb-8"
              >
                <span className="text-slate-200 font-light text-2xl">[</span>
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-900">The Gold Standard of Mobility</span>
                <span className="text-slate-200 font-light text-2xl">]</span>
              </motion.div>

              <div className="relative inline-block">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                  transition={{ 
                    opacity: { delay: 1, duration: 1 },
                    y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                  }}
                  className="absolute -top-12 -left-20 z-30 hidden xl:flex items-center gap-3 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-100 shadow-sm"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-900">Tier: Platinum</span>
                </motion.div>

                <h1 className="text-6xl md:text-[10rem] xl:text-[11rem] font-black italic uppercase tracking-tighter leading-[0.8] text-slate-900 relative z-10">
                  THE <br />
                  <span className="text-slate-100 relative">
                    SIGNATURE
                    <motion.span 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2, duration: 1.5 }}
                      className="absolute top-0 -left-4 md:-left-8 text-slate-900/10 text-4xl md:text-8xl serif-luxury italic font-light lowercase tracking-normal z-20 pointer-events-none whitespace-nowrap"
                    >
                      bespoke experience
                    </motion.span>
                  </span> <br />
                  DRIVE
                </h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "circInOut" }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent mt-4"
                />
              </div>
            </div>

            {/* RIGHT GRAPHIC */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 1, duration: 1.2, ease: "circOut" }}
              className="hidden lg:block relative"
            >
              <RadarScanner />
              <div className="absolute top-1/2 -left-12 w-12 h-[0.5px] bg-slate-100" />
            </motion.div>

            {/* Mobile View Only Gauges */}
            <div className="flex lg:hidden gap-8 mt-10">
              <SafetyGauge />
              <RadarScanner />
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-14 flex flex-col items-center gap-10"
          >
            <div className="flex gap-4">
              {['Reliability', 'Prestige', 'Comfort'].map((tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + (i * 0.1) }}
                  className="px-4 py-1.5 border border-slate-100 rounded-lg"
                >
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{tag}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-slate-400 text-lg md:text-xl font-medium serif-luxury italic max-w-xl text-center">
              "Where every mile is curated with precision, and every journey is a statement of prestige."
            </p>
          </motion.div>
        </motion.div>

        {/* Hero Car Image Section */}
        <motion.div 
          style={{ scale: carScale, y: carY }}
          className="relative mt-8 w-full max-w-6xl mx-auto"
        >
          {/* FLOATING BOXES: DESKTOP ONLY */}
          <motion.div
            className="hidden lg:flex absolute top-[15%] right-[-8%] z-30 text-left origin-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, y: [-5, 5, -5] }}
            transition={{ opacity: { delay: 2 }, y: { repeat: Infinity, duration: 4 } }}
          >
            <div className="glass-concierge p-8 rounded-[2.5rem] shadow-xl border border-white/80 flex flex-col gap-5 min-w-[280px]">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[12px] font-black uppercase tracking-widest text-slate-900">Operational: Chauffeur Included</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-3xl font-black italic text-slate-900 leading-none">LC 300</span>
                  <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mt-2">2025 Platinum Edition</span>
               </div>
               <div className="h-[1px] w-full bg-slate-100" />
               <div className="flex gap-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900 uppercase">3.5L V6</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase mt-0.5">Twin Turbo</span>
                  </div>
                  <div className="flex flex-col border-l border-slate-100 pl-6">
                    <span className="text-sm font-black text-slate-900 uppercase">7 Seater</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase mt-0.5">Luxury VIP</span>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:flex absolute bottom-[20%] left-[-8%] z-30 text-left origin-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0, y: [5, -5, 5] }}
            transition={{ opacity: { delay: 2.2 }, y: { repeat: Infinity, duration: 5 } }}
          >
            <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl flex flex-col gap-4 min-w-[280px]">
               <div className="flex items-center gap-2 mb-1">
                 <div className="w-1 h-6 bg-white/20 rounded-full" />
                 <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Premium Rate</span>
               </div>
               <div className="flex items-end gap-2">
                 <span className="text-4xl font-black italic leading-none">Rs. 30k</span>
                 <span className="text-[12px] font-black uppercase text-slate-500 mb-1">/ Day</span>
               </div>
               <div className="h-[1px] w-full bg-white/10 my-2" />
               <div className="flex items-center gap-3">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">Concierge 24/7 Active</span>
               </div>
            </div>
          </motion.div>

          {/* Main Car Image: FULL VISIBILITY ON MOBILE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-20"
          >
            <img 
              src="https://i.ibb.co/1JmXL24x/Untitled-design-13.png" 
              alt="Elite Land Cruiser" 
              className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)]"
            />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-12 bg-slate-900/10 blur-[50px] rounded-[100%] z-[-1]" />
          </motion.div>

          {/* ATTACHED DASHBOARD: MOBILE ONLY (Below car, no overlap) */}
          <div className="lg:hidden mt-4 px-4 flex flex-col gap-4">
            <div className="bg-white/80 glass-concierge p-6 rounded-[2rem] border border-slate-100 flex flex-col gap-4 text-left shadow-sm">
               <div className="flex justify-between items-center">
                 <div className="flex flex-col">
                    <span className="text-2xl font-black italic text-slate-900 leading-none">LC 300</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">2025 Platinum Edition</span>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-xl font-black italic text-slate-900">Rs. 30k</span>
                    <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">/ Per Day</span>
                 </div>
               </div>
               <div className="h-[1px] w-full bg-slate-50" />
               <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900/20" />
                    <span className="text-[9px] font-black text-slate-900 uppercase">3.5L V6 Twin Turbo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900/20" />
                    <span className="text-[9px] font-black text-slate-900 uppercase">VIP 7 Seater</span>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-300">Scroll for Grandeur</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-slate-200 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
