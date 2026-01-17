
import React from 'react';

interface FooterProps {
  onNavigate: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-50 py-20 px-4 md:px-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-4 mb-8 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-100">
                <img src="https://i.ibb.co/35cTDnT6/Safar-Nama-Logo-bg.png" alt="Safar Nama Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase italic">Safar Nama</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Safar Nama provides premium car rental solutions with a focus on reliability, performance, and professional service across Pakistan.
            </p>
          </div>

          <div>
            <h4 className="font-black italic uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><button onClick={() => onNavigate('services')} className="hover:text-slate-900 transition-colors">Our Services</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-slate-900 transition-colors">Available Fleet</button></li>
              <li><button onClick={() => onNavigate('locations')} className="hover:text-slate-900 transition-colors">Locations</button></li>
              <li><button onClick={() => onNavigate('corporate')} className="hover:text-slate-900 transition-colors">Corporate</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black italic uppercase tracking-widest text-xs mb-8">Customer Care</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><button onClick={() => onNavigate('contact')} className="hover:text-slate-900 transition-colors">Contact Us</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:text-slate-900 transition-colors">FAQs</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-slate-900 transition-colors">Rental Terms</button></li>
              <li><button onClick={() => onNavigate('insurance')} className="hover:text-slate-900 transition-colors">Insurance</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black italic uppercase tracking-widest text-xs mb-8">Stay Informed</h4>
            <p className="text-slate-400 text-xs mb-6 font-medium">Subscribe for updates on fleet additions and special rates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white border-none rounded-xl px-4 py-3 text-xs flex-1 focus:ring-2 focus:ring-slate-900" 
              />
              <button className="bg-slate-900 text-white p-3 rounded-xl hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-slate-200">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            © 2025 Safar Nama Rentals. Professional Mobility Solutions.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">Twitter</a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">Instagram</a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
