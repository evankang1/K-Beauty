
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  activeTab: 'home' | 'dashboard' | 'tools' | 'admin';
  setActiveTab: (tab: 'home' | 'dashboard' | 'tools' | 'admin') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onApplyClick: () => void;
  isAdminActive?: boolean;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, language, setLanguage, onApplyClick, isAdminActive }) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">K</span>
          </div>
          <span className="font-bold text-xl text-slate-900">K-Glow <span className="text-pink-500">Connect</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => setActiveTab('home')}
            className={`text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-pink-600' : 'text-slate-600 hover:text-pink-500'}`}
          >
            {t.nav_strategy}
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'text-pink-600' : 'text-slate-600 hover:text-pink-500'}`}
          >
            {t.nav_dashboard}
          </button>
          <button 
            onClick={() => setActiveTab('tools')}
            className={`text-sm font-medium transition-colors ${activeTab === 'tools' ? 'text-pink-600' : 'text-slate-600 hover:text-pink-500'}`}
          >
            {t.nav_tools}
          </button>
          {isAdminActive && (
             <button 
                onClick={() => setActiveTab('admin')}
                className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
              >
                {t.nav_admin}
              </button>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex bg-slate-100 p-1 rounded-lg">
            {(['KO', 'EN', 'TH'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${language === l ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <button 
            onClick={onApplyClick}
            className="bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-pink-700 transition-all shadow-lg shadow-pink-200"
          >
            {t.apply_now}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
