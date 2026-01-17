
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStats from './components/TrustStats';
import FeaturedSlider from './components/FeaturedSlider';
import CarCard from './components/CarCard';
import CarDetails from './components/CarDetails';
import AIRecommendation from './components/AIRecommendation';
import Footer from './components/Footer';
import InfoPage from './components/InfoPage';
import { CARS, REVIEWS } from './constants';
import { Car } from './types';
import { motion, AnimatePresence } from 'framer-motion';

type ViewState = 'home' | 'services' | 'locations' | 'corporate' | 'faq' | 'terms' | 'insurance' | 'contact';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filterType, setFilterType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('Default');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const popularCars = CARS.filter(c => c.isPopular);

  const processedCars = useMemo(() => {
    let result = [...CARS];
    if (filterType !== 'All') {
      result = result.filter(car => car.type === filterType);
    }
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => (a.pricePerDay || 0) - (b.pricePerDay || 0));
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => (b.pricePerDay || 0) - (a.pricePerDay || 0));
    } else if (sortBy === 'Top Rated') {
      result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [filterType, sortBy]);

  const carTypes = ['All', 'SUV', 'Sedan', 'Luxury', 'Sports', 'Electric', 'Hatchback'];
  const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

  const renderInfoContent = () => {
    switch(view) {
      case 'services':
        return (
          <div className="space-y-12 text-slate-500 font-medium text-lg leading-relaxed">
            <p>At Safar Nama, we provide more than just a car; we provide a bespoke mobility experience tailored to the elite standards of Pakistan's premium travelers. Our new all-inclusive policy ensures you never have to worry about the logistics.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-8 bg-slate-50 rounded-[2rem]">
                <h3 className="text-slate-900 font-black uppercase text-sm tracking-widest mb-4">Chauffeur & Fuel</h3>
                <p className="text-sm">Professional chauffeurs combined with complimentary fuel. We handle the tank, you handle the journey.</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-[2rem]">
                <h3 className="text-slate-900 font-black uppercase text-sm tracking-widest mb-4">Seamless Tolls</h3>
                <p className="text-sm">No more stopping for change at M-Tag booths. All motorway and bridge tolls are pre-paid and included.</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-[2rem]">
                <h3 className="text-slate-900 font-black uppercase text-sm tracking-widest mb-4">Event Management</h3>
                <p className="text-sm">Premium fleets for weddings and corporate conferences with full-service logistics included.</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-[2rem]">
                <h3 className="text-slate-900 font-black uppercase text-sm tracking-widest mb-4">Airport Protocol</h3>
                <p className="text-sm">VIP meet-and-greet services at all major international airports with all parking fees covered.</p>
              </div>
            </div>
          </div>
        );
      case 'locations':
        return (
          <div className="space-y-8">
            <p className="text-slate-500 text-lg">Safar Nama maintains a strategic presence across Pakistan to ensure your luxury drive is never far away.</p>
            <div className="space-y-4">
              {['Lahore - Main Boulevard, Gulberg III', 'Islamabad - Blue Area, Sector F-6', 'Karachi - DHA Phase VI', 'Faisalabad - Canal Road'].map(loc => (
                <div key={loc} className="flex items-center gap-4 p-6 border-b border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                  <span className="font-black text-slate-900 uppercase text-xs tracking-widest">{loc}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="space-y-10">
            {[
              { q: 'What documents are required for booking?', a: 'You need a valid CNIC, a copy of your Driving License (if applicable), and a proof of residence.' },
              { q: 'Is a security deposit mandatory?', a: 'Yes, a refundable security deposit is required for all luxury rentals, which is returned upon safe vehicle inspection.' },
              { q: 'Are fuel and toll costs included?', a: 'Yes! Safar Nama now offers an all-inclusive experience. Both fuel and toll taxes are fully covered by us during your rental period.' },
              { q: 'Can I travel to Northern areas?', a: 'Absolutely. We specialize in North-bound tours with all-inclusive fuel and toll packages for 4x4 vehicles.' }
            ].map((item, i) => (
              <div key={i} className="group">
                <h3 className="text-slate-900 font-black uppercase text-sm tracking-widest mb-3">{item.q}</h3>
                <p className="text-slate-500 italic serif-luxury text-xl">"{item.a}"</p>
              </div>
            ))}
          </div>
        );
      case 'terms':
        return (
          <div className="bg-slate-50 p-12 rounded-[3rem] space-y-8">
            <div className="space-y-4">
              <h3 className="text-slate-900 font-black uppercase text-xs tracking-widest">01. All-Inclusive Rates</h3>
              <p className="text-slate-500 text-sm">Our daily rates now include fuel and toll charges for a hassle-free premium experience.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-slate-900 font-black uppercase text-xs tracking-widest">02. Chauffeur Policy</h3>
              <p className="text-slate-500 text-sm">Professional chauffeur service is integrated. For out-of-station trips, driver meals are coordinated by Safar Nama.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-slate-900 font-black uppercase text-xs tracking-widest">03. Cancellation</h3>
              <p className="text-slate-500 text-sm">Cancellations made 48 hours prior to booking receive a full refund. 24-hour cancellations incur a 50% charge.</p>
            </div>
          </div>
        );
      case 'insurance':
        return (
          <div className="space-y-12">
            <p className="text-slate-500 text-lg">Your peace of mind is non-negotiable. All Safar Nama vehicles come with comprehensive protection.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Comprehensive Coverage', 'Third Party Liability', 'Driver Accidental Cover'].map(title => (
                <div key={title} className="p-8 border border-slate-100 rounded-3xl text-center">
                  <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-2">{title}</h4>
                  <span className="text-green-600 font-black text-[10px] uppercase">Included</span>
                </div>
              ))}
            </div>
            <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
              <h3 className="font-black italic text-2xl mb-4">Safety First</h3>
              <p className="text-white/60 text-sm leading-relaxed">We conduct a 50-point safety check before every deployment. Our insurance partner is EFU General, ensuring premium claim settlements if needed.</p>
            </div>
          </div>
        );
      case 'corporate':
        return (
          <div className="space-y-12">
            <h3 className="text-3xl font-black italic text-slate-900">Elevate Your Corporate Mobility</h3>
            <p className="text-slate-500 text-lg">Safar Nama offers tax-efficient leasing and all-inclusive short-term rentals for multinational corporations and diplomatic missions in Pakistan.</p>
            <div className="space-y-6">
              {['Fuel & Toll Inclusive Billing', 'Executive Chauffeur Service', '24/7 Priority Support', 'Monthly Billing Cycle'].map(item => (
                <div key={item} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                  <span className="font-black uppercase text-xs tracking-widest text-slate-900">{item}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-900" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest block mb-2">Central Support</span>
                <p className="text-3xl font-black italic text-slate-900">+92 331 4213199</p>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest block mb-2">Email Inquiries</span>
                <p className="text-3xl font-black italic text-slate-900">concierge@safarnama.pk</p>
              </div>
            </div>
            <div className="bg-slate-50 p-10 rounded-[3rem]">
              <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-6">Send a Message</h4>
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full bg-white border-none rounded-xl p-4 text-xs font-bold uppercase tracking-widest" />
                <input type="email" placeholder="Email" className="w-full bg-white border-none rounded-xl p-4 text-xs font-bold uppercase tracking-widest" />
                <textarea placeholder="Your Message" rows={4} className="w-full bg-white border-none rounded-xl p-4 text-xs font-bold uppercase tracking-widest"></textarea>
                <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest">Send Inquiry</button>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigateHome={() => setView('home')} onNavigateView={setView} />
      
      <main>
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero />
              <div id="experience" className="scroll-mt-32"><TrustStats /></div>
              <section id="fleet" className="py-20 bg-white relative z-[50] scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 md:px-12 text-center">
                  <h2 className="text-7xl md:text-[10rem] font-black italic uppercase tracking-tighter leading-[0.8] mb-10 text-slate-900">
                    THE <span className="text-slate-100">SIGNATURE</span> <br />FLEET
                  </h2>
                </div>
                <FeaturedSlider cars={popularCars} onSelect={setSelectedCar} />
              </section>

              <section className="py-40 px-4 md:px-12 bg-white relative z-[50]">
                <div className="max-w-7xl mx-auto">
                   <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">Our Inventory</h2>
                    <div className="flex flex-wrap gap-4">
                      {/* Filter Button */}
                      <div className="relative">
                        <button 
                          onClick={() => setShowFilterMenu(!showFilterMenu)}
                          className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3"
                        >
                          Type: {filterType}
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {showFilterMenu && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 mt-2 w-48 bg-white shadow-2xl rounded-2xl p-2 z-[60] border border-slate-50">
                              {carTypes.map(t => (
                                <button key={t} onClick={() => { setFilterType(t); setShowFilterMenu(false); }} className={`w-full text-left px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 ${filterType === t ? 'text-slate-900 bg-slate-50' : 'text-slate-300'}`}>{t}</button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Sort Button */}
                      <div className="relative">
                        <button 
                          onClick={() => setShowSortMenu(!showSortMenu)}
                          className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3"
                        >
                          Sort: {sortBy}
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {showSortMenu && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-2 w-56 bg-slate-900 text-white shadow-2xl rounded-2xl p-2 z-[60]">
                              {sortOptions.map(s => (
                                <button key={s} onClick={() => { setSortBy(s); setShowSortMenu(false); }} className={`w-full text-left px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 ${sortBy === s ? 'text-white' : 'text-white/40'}`}>{s}</button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                    <AnimatePresence mode='popLayout'>
                      {processedCars.map(car => (
                        <CarCard key={car.id} car={car} onClick={() => setSelectedCar(car)} />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </section>

              <section id="inquiry" className="py-40 px-4 md:px-12 bg-slate-50 relative z-[50] scroll-mt-32">
                <AIRecommendation />
              </section>
              
              <section id="prive" className="py-40 bg-white relative z-[50] border-t border-slate-50 scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 md:px-12 text-center mb-20">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-6 block">Client Chronicles</span>
                  <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.9]">
                    TRUSTED BY <br /><span className="text-slate-100">THE DISCERNING</span>
                  </h2>
                </div>
                <div className="flex overflow-x-auto gap-8 px-4 md:px-12 pb-10 no-scrollbar">
                   {REVIEWS.map(review => (
                     <div key={review.id} className="min-w-[400px] bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
                        <div className="flex gap-1 mb-6 text-yellow-400">
                           {[...Array(review.rating)].map((_, i) => (
                             <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                             </svg>
                           ))}
                        </div>
                        <p className="text-slate-500 italic serif-luxury text-xl mb-10 leading-relaxed">"{review.comment}"</p>
                        <div>
                           <h4 className="font-black italic text-slate-900 uppercase text-sm tracking-widest">{review.name}</h4>
                           <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">{review.location} • {review.date}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <InfoPage 
              key={view}
              title={view === 'faq' ? 'Frequently Asked' : view}
              subtitle="Information Portal"
              content={renderInfoContent()}
              onBack={() => setView('home')}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={setView} />

      <AnimatePresence>
        {selectedCar && <CarDetails car={selectedCar} onClose={() => setSelectedCar(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
