import React from 'react';
import { motion } from 'framer-motion';

interface InfoPageProps {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  onBack: () => void;
}

const InfoPage: React.FC<InfoPageProps> = ({ title, subtitle, content, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen pt-40 pb-20 px-4 md:px-12 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 hover:text-slate-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-6 block">{subtitle}</span>
        <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-16 text-slate-900">
          {title.split(' ').map((word, i) => (
            <span key={i} className={i % 2 !== 0 ? 'text-slate-100' : ''}>{word} </span>
          ))}
        </h1>

        <div className="prose prose-slate max-w-none">
          {content}
        </div>
      </div>
    </motion.div>
  );
};

export default InfoPage;