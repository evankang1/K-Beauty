
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { formatCurrencyShort } from '../utils/currency';

interface Props {
  lang: Language;
}

const NetworkModel: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const [activeView, setActiveView] = useState<'process' | 'profit' | 'tiers'>('profit');

  const getTierData = () => {
    const silverTreat = formatCurrencyShort(2000000, lang);
    const platinumTreat = formatCurrencyShort(5000000, lang);

    return [
      { 
        tier: "SILVER", 
        req: `${t.tier_req_prefix}${formatCurrencyShort(50000000, lang)}${t.tier_req_suffix}`, 
        gift: t.tier_gift_treat.replace('{amount}', silverTreat), 
        color: "border-slate-400", 
        bg: "bg-slate-400/10",
        icon: "🥈" 
      },
      { 
        tier: "GOLD", 
        req: `${t.tier_req_prefix}${formatCurrencyShort(150000000, lang)}${t.tier_req_suffix}`, 
        gift: t.tier_gift_treat.replace('{amount}', silverTreat) + t.tier_gift_gold_plus, 
        color: "border-amber-400", 
        bg: "bg-amber-400/20",
        icon: "🥇",
        highlight: true
      },
      { 
        tier: "PLATINUM", 
        req: `${t.tier_req_prefix}${formatCurrencyShort(300000000, lang)}${t.tier_req_suffix}`, 
        gift: t.tier_gift_treat.replace('{amount}', platinumTreat) + t.tier_gift_platinum_plus, 
        color: "border-pink-500", 
        bg: "bg-pink-500/20",
        icon: "💎" 
      }
    ];
  };

  const processes = lang === 'KO' ? [
    { step: "01", title: "콘텐츠 발행", desc: "태국 맞춤형 K-뷰티 콘텐츠를 발행합니다.", icon: "🎬" },
    { step: "02", title: "실시간 상담", desc: "태국어 대응팀이 즉각적인 예약을 지원합니다.", icon: "💬" },
    { step: "03", title: "서울 방문", desc: "고객이 강남 클리닉을 방문하여 시술을 받습니다.", icon: "✈️" },
    { step: "04", title: "자동 정산", desc: "매출 발생 시 확정된 요율로 정산됩니다.", icon: "💳" },
    { step: "05", title: "리텐션 보너스", desc: "재방문 시 추가 수익이 지속 발생합니다.", icon: "🔄" }
  ] : lang === 'EN' ? [
    { step: "01", title: "Publish", desc: "Post K-beauty content for Thailand.", icon: "🎬" },
    { step: "02", title: "Counseling", desc: "Thai team handles inquiries & bookings.", icon: "💬" },
    { step: "03", title: "Clinic Visit", desc: "Customers visit Gangnam for treatment.", icon: "✈️" },
    { step: "04", title: "Payout", desc: "Commission settled at fixed rates.", icon: "💳" },
    { step: "05", title: "Retention", desc: "Bonus for recurring customer visits.", icon: "🔄" }
  ] : [
    { step: "01", title: "โพสต์คอนเทนต์", desc: "สร้างคอนเทนต์ K-beauty สำหรับตลาดไทย", icon: "🎬" },
    { step: "02", title: "การปรึกษา", desc: "ทีมงานดูแลการสอบถามและจองคิวเป็นภาษาไทย", icon: "💬" },
    { step: "03", title: "เข้าใช้บริการ", desc: "ลูกค้าเดินทางไปกังนัมเพื่อรับบริการ", icon: "✈️" },
    { step: "04", title: "รับเงิน", desc: "จ่ายคอมมิชชั่นตามอัตราที่กำหนด", icon: "💳" },
    { step: "05", title: "Retention", desc: "โบนัสเมื่อลูกค้ากลับมาใช้บริการซ้ำ", icon: "🔄" }
  ];

  return (
    <section className="bg-slate-900 text-white rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-500/10 blur-[120px] rounded-full"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight">
               {lang === 'KO' ? '투명한 수익 시스템' : lang === 'EN' ? 'Transparent System' : 'ระบบที่โปร่งใส'} <span className="text-pink-500">& {t.tab_tiers}</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-lg font-medium">
              {lang === 'KO' ? '아이스나인과 인플루언서 모두가 상생하는 구조입니다.' : lang === 'EN' ? 'A win-win structure for IceNine and influencers.' : 'โครงสร้างแบบ win-win สำหรับทั้ง IceNine และอินฟลูเอนเซอร์'}
            </p>
          </div>
          
          <div className="flex bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
            {['process', 'profit', 'tiers'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveView(tab as any)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeView === tab ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                {tab === 'process' ? t.tab_process : tab === 'profit' ? t.tab_profit : t.tab_tiers}
              </button>
            ))}
          </div>
        </div>

        {activeView === 'profit' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto w-full">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/60 p-8 rounded-[2rem] border border-slate-700 text-center space-y-4">
                <div className="text-4xl">💼</div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t.profit_agent}</p>
                <p className="text-5xl font-black text-white">12%</p>
              </div>
              <div className="bg-pink-600 p-8 rounded-[2rem] border border-pink-500 shadow-xl shadow-pink-900/20 text-center space-y-4 transform scale-105">
                <div className="text-4xl">🌟</div>
                <p className="text-pink-100 text-xs font-bold uppercase tracking-widest">{t.profit_influencer}</p>
                <p className="text-5xl font-black text-white">6%</p>
                <p className="text-[10px] text-pink-200 font-medium">+ 등급별 추가 혜택 지원</p>
              </div>
              <div className="bg-slate-800/60 p-8 rounded-[2rem] border border-slate-700 text-center space-y-4">
                <div className="text-4xl">🏰</div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t.profit_doi}</p>
                <p className="text-5xl font-black text-white">12%</p>
              </div>
            </div>
          </div>
        )}

        {activeView === 'tiers' && (
          <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {getTierData().map((item, idx) => (
              <div key={idx} className={`p-8 rounded-[2.5rem] border-2 ${item.color} ${item.bg} relative flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300`}>
                {item.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[10px] font-black px-4 py-1 rounded-full">MOST POPULAR</div>
                )}
                <div>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-black mb-2 tracking-tight">{item.tier}</h3>
                  <p className="text-slate-400 text-xs font-bold mb-6">{item.req}</p>
                  <div className="h-px bg-white/10 mb-6"></div>
                  <p className="text-white font-medium text-sm leading-relaxed whitespace-pre-line">{item.gift}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === 'process' && (
          <div className="grid gap-4 md:grid-cols-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {processes.map((p, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-700 p-8 rounded-[2.5rem] relative group hover:border-pink-500/50 transition-all">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{p.icon}</div>
                <div className="text-pink-500 font-black text-[10px] mb-2">{p.step} STEP</div>
                <h4 className="font-bold text-lg mb-2">{p.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed opacity-80">{p.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NetworkModel;
