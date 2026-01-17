
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useTransform } from 'framer-motion';

const AnimatedNumber = ({ value, duration = 2, startAnimation }: { value: number; duration?: number; startAnimation: boolean }) => {
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  const display = useTransform(spring, (current) => 
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (startAnimation) {
      spring.set(value);
    } else {
      spring.set(0);
    }
  }, [value, startAnimation, spring]);

  return <motion.span>{display}</motion.span>;
};

const TrustStats: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [countingDone, setCountingDone] = useState(false);

  useEffect(() => {
    if (isInView) {
      // Numbers count up for roughly 2 seconds based on spring settings
      const timer = setTimeout(() => {
        setCountingDone(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section ref={containerRef} className="py-24 bg-white relative z-[50]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-center">
          
          {/* Stats Column 1: Market Volume */}
          <div className="text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 block mb-4">Market Presence</span>
            <div className="text-6xl md:text-7xl font-black italic tracking-tighter text-slate-900 mb-2">
              <AnimatedNumber value={50200} startAnimation={isInView} />+
            </div>
            <p className="text-slate-400 font-medium text-sm">Google Searches per Month</p>
          </div>

          {/* Stats Column 2: Reviews Count */}
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 block mb-4">Verified Trust</span>
            <div className="text-6xl md:text-7xl font-black italic tracking-tighter text-slate-900 mb-2">
              <AnimatedNumber value={1240} startAnimation={isInView} />
            </div>
            <p className="text-slate-400 font-medium text-sm">Google Business Reviews</p>
          </div>

          {/* Column 3: Google Rating with Staggered Stars */}
          <div className="text-center md:text-right flex flex-col items-center md:items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 block mb-4">Platform Rating</span>
            
            <div className="h-20 flex flex-col items-center md:items-end justify-center">
              <AnimatePresence>
                {countingDone ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center md:items-end"
                  >
                    <div className="flex gap-1.5 mb-2 text-yellow-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.svg
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotate: -45 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: i * 0.15, 
                            type: "spring", 
                            stiffness: 260, 
                            damping: 20 
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>
                    <motion.span 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-2xl font-black italic text-slate-900"
                    >
                      4.9 / 5.0 Google Rating
                    </motion.span>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 italic"
                  >
                    Syncing live data...
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
      <div className="h-[1px] w-full bg-slate-50 mt-24" />
    </section>
  );
};

export default TrustStats;
