
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  lang: Language;
}

const Hero: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden pt-10 pb-20">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-100 px-4 py-1.5 rounded-full mb-4">
          <span className="animate-pulse w-2 h-2 bg-pink-500 rounded-full"></span>
          <span className="text-pink-600 text-[10px] font-bold tracking-widest uppercase">{t.hero_badge}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {t.hero_title_1} <br />
          <span className="gradient-text italic">{t.hero_title_2}</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
          {t.hero_sub}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 w-full sm:w-64 hover:border-pink-300 transition-all group">
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🇰🇷</span>
            <h3 className="font-bold text-slate-900 text-lg">{t.benefit_1_title}</h3>
            <p className="text-slate-500 text-sm leading-snug">{t.benefit_1_desc}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 w-full sm:w-64 hover:border-pink-300 transition-all group">
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">💰</span>
            <h3 className="font-bold text-slate-900 text-lg">{t.benefit_2_title}</h3>
            <p className="text-slate-500 text-sm leading-snug">{t.benefit_2_desc}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 w-full sm:w-64 hover:border-pink-300 transition-all group">
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">👑</span>
            <h3 className="font-bold text-slate-900 text-lg">{t.benefit_3_title}</h3>
            <p className="text-slate-500 text-sm leading-snug">{t.benefit_3_desc}</p>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 -left-20 w-64 h-64 bg-pink-200/20 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-200/20 blur-3xl rounded-full -z-10"></div>
    </section>
  );
};

export default Hero;
