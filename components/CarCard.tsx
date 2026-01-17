
import React from 'react';
import { motion } from 'framer-motion';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onClick: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
  // IDs of cars that need a moderate size boost because their source images have lots of white space
  const needsExtraScaling = ['lc-300', 'mg-hs-2024', 'brv-2024'].includes(car.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-[2rem] border border-slate-100 p-4 transition-all hover:shadow-2xl cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 bg-slate-50 flex items-center justify-center">
        <img 
          src={car.image} 
          alt={car.name} 
          className={`w-full h-full object-contain transition-transform duration-1000 ${
            needsExtraScaling 
              ? 'p-4 scale-[1.3] group-hover:scale-[1.45]' 
              : 'p-8 scale-110 group-hover:scale-125'
          }`}
        />
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm border border-slate-100">
          {car.type}
        </div>
        {car.isPopular && (
          <div className="absolute top-6 right-6 bg-slate-900 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg">
            Trending
          </div>
        )}
      </div>

      <div className="px-4 pb-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1">{car.brand}</h3>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">{car.name}</h2>
          </div>
          <div className="text-right">
            <span className="text-xl font-black italic whitespace-nowrap text-slate-900">
              {car.pricePerDay === 0 ? "Enquire" : `Rs. ${car.pricePerDay.toLocaleString()}`}
            </span>
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mt-1">
              {car.pricePerDay === 0 ? "Contact Sales" : "Per Day"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-8 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
          <div className="flex flex-col items-center justify-center py-3 bg-slate-50 rounded-xl">
            <span className="text-slate-900 mb-1">{car.seats}</span>
            <span>Seats</span>
          </div>
          <div className="flex flex-col items-center justify-center py-3 bg-slate-50 rounded-xl">
            <span className="text-slate-900 mb-1">Auto</span>
            <span>Shift</span>
          </div>
          <div className="flex flex-col items-center justify-center py-3 bg-slate-50 rounded-xl">
            <span className="text-slate-900 mb-1">{car.fuel}</span>
            <span>Fuel</span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-50 flex items-center justify-between group/line">
           <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 group-hover/line:text-slate-900 transition-colors">
             Explore Specifications
           </span>
           <div className="h-[1px] flex-1 mx-4 bg-slate-50 group-hover/line:bg-slate-200 transition-colors" />
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-200 group-hover/line:text-slate-900 transition-all transform group-hover/line:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
           </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
