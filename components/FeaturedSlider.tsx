
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from '../types';

interface FeaturedSliderProps {
  cars: Car[];
  onSelect: (car: Car) => void;
}

const TechnicalHalo = ({ rotation }: { rotation: number }) => (
  <motion.div
    animate={{ rotate: rotation }}
    transition={{ type: "linear", duration: 20, repeat: Infinity }}
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
  >
    <div className="absolute w-[140%] aspect-square border-[0.5px] border-slate-100 rounded-full" />
    <div className="absolute w-[110%] aspect-square border-[1px] border-dashed border-slate-200/50 rounded-full" />
    {[0, 90, 180, 270].map((angle) => (
      <div 
        key={angle}
        className="absolute w-1 h-1 bg-slate-300 rounded-full"
        style={{ transform: `rotate(${angle}deg) translateY(-70%)` }}
      />
    ))}
  </motion.div>
);

const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ cars, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // Function to scroll to specific index
  const scrollToCard = (index: number, behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      const target = element.children[index] as HTMLElement;
      if (target) {
        element.scrollTo({
          left: target.offsetLeft - (element.offsetWidth / 2) + (target.offsetWidth / 2),
          behavior
        });
      }
    }
  };

  // Auto-play and Infinite Logic
  useEffect(() => {
    const startTimer = () => {
      timerRef.current = window.setInterval(() => {
        if (!isHovered) {
          setActiveIndex((prev) => {
            const next = (prev + 1) % cars.length;
            scrollToCard(next);
            return next;
          });
        }
      }, 5000);
    };

    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, cars.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const element = scrollRef.current;
    
    const maxScroll = element.scrollWidth - element.offsetWidth;
    setScrollProgress((element.scrollLeft / maxScroll) * 100);

    const scrollPos = element.scrollLeft + element.offsetWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(element.children).forEach((child, index) => {
      const target = child as HTMLElement;
      const childCenter = target.offsetLeft + target.offsetWidth / 2;
      const distance = Math.abs(scrollPos - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <div 
      className="relative py-10 overflow-hidden bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Timer Progress Bar (Luxury Detail) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-50 z-50">
        <motion.div 
          key={activeIndex}
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "0%" : "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-slate-900/10"
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="flex gap-2 items-end h-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div 
              key={i}
              animate={{ 
                height: Math.abs(scrollProgress - (i * 2.5)) < 5 ? 24 : 8,
                opacity: Math.abs(scrollProgress - (i * 2.5)) < 5 ? 1 : 0.3
              }}
              className="w-[1px] bg-slate-900" 
            />
          ))}
        </div>
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-8 md:gap-20 overflow-x-auto px-[10vw] md:px-[35vw] pb-40 pt-20 snap-x no-scrollbar cursor-grab active:cursor-grabbing items-center min-h-[500px] md:min-h-[700px] relative z-10"
      >
        {cars.map((car, index) => {
          const isActive = index === activeIndex;
          
          return (
            <motion.div
              key={car.id}
              onClick={() => {
                scrollToCard(index);
                onSelect(car);
              }}
              className={`relative flex-shrink-0 w-[280px] md:w-[600px] cursor-pointer snap-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isActive ? 'scale-110 opacity-100' : 'scale-75 opacity-10 blur-[4px]'
              }`}
            >
              <div className="relative flex flex-col items-center">
                <div className="relative w-full aspect-[16/9] flex items-center justify-center">
                  <AnimatePresence>
                    {isActive && <TechnicalHalo rotation={scrollProgress * 2} />}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 pointer-events-none"
                      >
                        <motion.div 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="absolute top-0 left-0 flex flex-col items-start"
                        >
                          <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Model Ref:</span>
                          <span className="text-[10px] md:text-xs font-black uppercase text-slate-900">EXT-{car.id.toUpperCase()}</span>
                          <div className="h-[0.5px] w-8 md:w-12 bg-slate-200 mt-2" />
                        </motion.div>

                        <motion.div 
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="absolute bottom-0 right-0 flex flex-col items-end"
                        >
                          <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Transmission</span>
                          <span className="text-[10px] md:text-xs font-black uppercase text-slate-900">{car.transmission}</span>
                          <div className="h-[0.5px] w-8 md:w-12 bg-slate-200 mt-2" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div 
                    animate={{ 
                      scaleX: isActive ? 1.4 : 0.8,
                      opacity: isActive ? 0.2 : 0.05
                    }}
                    className="absolute bottom-4 w-[80%] h-10 bg-slate-900 blur-[40px] md:blur-[80px] rounded-[100%] z-0" 
                  />
                  
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>

                <div className={`mt-10 md:mt-16 text-center transition-all duration-1000 delay-200 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="h-[1px] w-4 bg-slate-200" />
                    <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-[1em]">{car.brand}</h4>
                    <div className="h-[1px] w-4 bg-slate-200" />
                  </div>
                  <h3 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter leading-none text-slate-900">{car.name}</h3>
                  <div className="mt-6 md:mt-8 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8">
                    <span className="text-lg md:text-2xl font-black italic serif-luxury text-slate-400">
                      {car.pricePerDay === 0 ? "Call for inquiry" : "Starting from"}
                    </span>
                    <span className="text-xl md:text-3xl font-black italic text-slate-900">
                      {car.pricePerDay === 0 ? "Contact Us" : `Rs. ${car.pricePerDay.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="flex gap-2 items-start h-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div 
              key={i}
              animate={{ 
                height: Math.abs(scrollProgress - (i * 2.5)) < 5 ? 24 : 8,
                opacity: Math.abs(scrollProgress - (i * 2.5)) < 5 ? 1 : 0.3
              }}
              className="w-[1px] bg-slate-900" 
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40">
        {cars.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              scrollToCard(i);
              setActiveIndex(i);
            }}
            className={`h-[2px] transition-all duration-700 ${i === activeIndex ? 'w-16 bg-slate-900' : 'w-4 bg-slate-100'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSlider;
