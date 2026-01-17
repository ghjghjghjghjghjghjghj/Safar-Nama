
import React from 'react';
import { motion } from 'framer-motion';
import { Car } from '../types';

interface CarDetailsProps {
  car: Car;
  onClose: () => void;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car, onClose }) => {
  const WHATSAPP_NUMBER = "923314213199";

  const handleWhatsAppBooking = () => {
    const message = car.pricePerDay === 0 
      ? `Hi Safar Nama! I would like to inquire about the rental rate and availability for the *${car.name}* (${car.brand}). Looking forward to your response.`
      : `Hi Safar Nama! I am interested in booking the *${car.name}* (${car.brand}) at Rs. ${car.pricePerDay.toLocaleString()} per day. Please let me know the availability. Thank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.9 }}
        className="relative bg-white w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[95vh] md:max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="md:w-5/12 relative bg-slate-50 overflow-hidden flex items-center justify-center p-12 border-r border-slate-100">
          <img 
            src={car.image} 
            alt={car.name} 
            className={`w-full h-auto object-contain drop-shadow-2xl transition-transform duration-700 ${
              ['lc-300', 'mg-hs-2024', 'brv-2024'].includes(car.id) ? 'scale-150' : 'scale-125'
            }`}
          />
          <div className="absolute top-10 left-10 flex flex-col gap-4">
             <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Available Today</span>
             </div>
             <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 text-white rounded-full shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest">{car.seats} Seater</span>
             </div>
          </div>
        </div>

        <div className="md:w-7/12 p-8 md:p-14 overflow-y-auto bg-white">
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-widest text-slate-300">{car.brand}</span>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                   {[1,2,3,4,5].map(i => (
                     <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                     </svg>
                   ))}
                </div>
                <span className="text-[10px] font-black text-slate-900">{car.rating} ({car.reviewCount} Reviews)</span>
              </div>
            </div>
            <h2 className="text-6xl font-black italic uppercase leading-none tracking-tighter mb-6">{car.name}</h2>
            <p className="text-slate-400 text-lg leading-relaxed serif-luxury italic border-l-4 border-slate-100 pl-6 mb-8">
              "{car.description}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Inclusive Policy</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Driver', val: 'Includes Professional Driver', icon: '👤' },
                  { label: 'Fuel', val: 'Complimentary Fuel Included', icon: '⛽' },
                  { label: 'Tolls', val: 'All Toll Taxes Covered', icon: '🛣️' },
                  { label: 'Concierge', val: '24/7 Roadside Assistance', icon: '🛠️' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-900">
                    <span className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg">{item.icon}</span>
                    <div>
                      <span className="block text-[8px] text-slate-400 tracking-[0.2em]">{item.label}</span>
                      {item.val}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Booking Requirements</h4>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <ul className="space-y-3">
                  {['Full Name', 'CNIC Number', 'Current Address', 'Active Phone Number'].map((req, i) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      {req}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[9px] text-slate-400 italic leading-relaxed">
                  * Original Documents will be verified at the time of delivery.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-10 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10">
            <div className="text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 block mb-2">
                {car.pricePerDay === 0 ? "Inquiry Required" : "All-Inclusive Daily Rate"}
              </span>
              <div className="flex items-end gap-2">
                <span className="text-3xl md:text-4xl font-black italic tracking-tighter whitespace-nowrap">
                  {car.pricePerDay === 0 ? "Call for Price" : `Rs. ${car.pricePerDay.toLocaleString()}`}
                </span>
                {car.pricePerDay !== 0 && <span className="text-slate-300 text-xs font-black uppercase mb-2">PKR</span>}
              </div>
            </div>
            <button 
              onClick={handleWhatsAppBooking}
              className="w-full md:flex-1 bg-slate-900 text-white py-5 md:py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              {car.pricePerDay === 0 ? "Request via WhatsApp" : "Book All-Inclusive"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CarDetails;
