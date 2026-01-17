
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCarRecommendation } from '../services/geminiService';
import { GroundingChunk } from '../types';

const AIRecommendation: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{text: string, sources: GroundingChunk[]} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLoading(true);
    const result = await getCarRecommendation(input);
    setRecommendation(result);
    setLoading(false);
  };

  return (
    <div className="relative py-20">
      <div className="max-w-6xl mx-auto rounded-[4rem] overflow-hidden relative shadow-[0_80px_150px_-50px_rgba(0,0,0,0.1)]">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white" />
        
        <div className="relative z-10 grid md:grid-cols-2">
          <div className="p-16 md:p-24 border-r border-slate-100/50">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-8 block">Rental Assistant</span>
            <h2 className="text-6xl font-black italic mb-10 uppercase leading-[0.9] tracking-tighter text-slate-900">
              SMART <br />
              <span className="serif-luxury italic text-slate-300">SELECTION.</span>
            </h2>
            <p className="text-slate-400 mb-12 leading-relaxed serif-luxury text-xl italic max-w-sm">
              "Input your travel needs and our system will analyze live automotive data to find your ideal vehicle."
            </p>

            <form onSubmit={handleSubmit} className="relative group">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Where are you going? (e.g., family trip to mountains)"
                className="w-full bg-white border-none rounded-2xl py-8 px-10 focus:ring-1 focus:ring-slate-900 transition-all text-sm font-medium shadow-sm italic"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-4 top-4 bottom-4 bg-slate-900 text-white px-10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black disabled:opacity-50 transition-all"
              >
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </form>
          </div>

          <div className="flex items-center justify-center bg-slate-900 p-20 relative overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute inset-0 opacity-10"
              style={{ background: 'conic-gradient(from 0deg, white, transparent, white)' }}
            />

            <AnimatePresence mode='wait'>
              {!recommendation && !loading ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center relative z-10">
                  <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center mb-8 mx-auto">
                    <span className="text-white text-xl font-light">?</span>
                  </div>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">Grounded by Google Search</p>
                </motion.div>
              ) : loading ? (
                <div className="flex gap-4">
                  {[0,1,2].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      className="w-2 h-10 bg-white/20 rounded-full"
                    />
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-left relative z-10 w-full">
                  <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-8 flex items-center gap-4">
                    <span>Verified Analysis</span>
                    <div className="h-[1px] flex-1 bg-white/10" />
                  </div>
                  <p className="text-white text-xl serif-luxury italic leading-relaxed mb-10">"{recommendation.text}"</p>
                  
                  {recommendation.sources.length > 0 && (
                    <div className="mb-10">
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/20 block mb-4">Sources & Verification:</span>
                      <div className="flex flex-wrap gap-3">
                        {recommendation.sources.map((src, i) => src.web && (
                          <a 
                            key={i} 
                            href={src.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] text-white/60 hover:text-white underline decoration-white/20 transition-colors"
                          >
                            {src.web.title || 'Verified Source'}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => setRecommendation(null)}
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors"
                  >
                    ← New Analysis
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendation;
