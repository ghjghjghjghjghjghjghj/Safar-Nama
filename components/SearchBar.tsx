
import React from 'react';

interface SearchBarProps {
  onSearch: (q: string) => void;
  onTabChange: (t: string) => void;
  activeTab: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onTabChange, activeTab }) => {
  const tabs = ['All', 'Luxury', 'SUV', 'Sports', 'Electric'];

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <div className="relative group">
        <input 
          type="text" 
          placeholder="Search for car models or brands..." 
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-slate-50 border-none rounded-full py-4 pl-14 pr-6 focus:ring-2 focus:ring-slate-900 transition-all text-sm font-medium"
        />
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === tab 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
