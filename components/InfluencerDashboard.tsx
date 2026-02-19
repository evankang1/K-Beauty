
import React from 'react';
import { InfluencerProfile, RewardTier, Language } from '../types';
import { translations } from '../translations';
import { formatCurrency, formatCurrencyShort } from '../utils/currency';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  profile: InfluencerProfile;
  lang: Language;
}

const InfluencerDashboard: React.FC<Props> = ({ profile, lang }) => {
  const t = translations[lang];
  
  // 기준 매출 (KRW)
  const currentSales = 125000000; 
  const myCommission = currentSales * 0.06; // 6% 수수료
  const nextGoalValue = 150000000;
  const remainingToNext = nextGoalValue - currentSales;

  const data = [
    { name: 'Jan', value: 4500000 },
    { name: 'Feb', value: 8900000 },
    { name: 'Mar', value: 12500000 },
    { name: 'Apr', value: 21000000 },
    { name: 'May', value: 38000000 },
    { name: 'Jun', value: 42000000 },
  ];

  const getTierColor = (tier: RewardTier) => {
    switch(tier) {
      case RewardTier.SILVER: return 'bg-slate-200 text-slate-700';
      case RewardTier.GOLD: return 'bg-amber-100 text-amber-700';
      case RewardTier.PLATINUM: return 'bg-pink-100 text-pink-700';
      default: return 'bg-slate-100';
    }
  };

  const silverTreat = formatCurrencyShort(2000000, lang);
  const platinumTreat = formatCurrencyShort(5000000, lang);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{t.dashboard_greeting}, {profile.name}!</h2>
          <p className="text-slate-500 font-medium">{t.dashboard_sub}</p>
        </div>
        <div className={`px-5 py-2 rounded-full font-black text-[10px] tracking-widest ${getTierColor(profile.tier)}`}>
          {profile.tier} LEVEL PARTNER
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">{t.total_revenue}</p>
          <p className="text-2xl font-black text-slate-900">{formatCurrencyShort(currentSales, lang)}</p>
        </div>
        <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">{t.my_commission}</p>
          <p className="text-2xl font-black text-pink-600">{formatCurrencyShort(myCommission, lang)}</p>
        </div>
        <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">{t.engagement_rank}</p>
          <p className="text-2xl font-black text-blue-600">Top 5%</p>
        </div>
        <div className="bg-slate-900 p-7 rounded-[2rem] border border-slate-800 shadow-lg shadow-slate-200 text-white">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">{t.next_tier_goal}</p>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-black text-amber-400">{formatCurrencyShort(remainingToNext > 0 ? remainingToNext : 0, lang)}</p>
            <p className="text-[10px] font-bold text-slate-400 mb-1">To {profile.tier === RewardTier.GOLD ? 'PLATINUM' : 'NEXT TIER'}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold text-slate-900">{lang === 'KO' ? '월별 누적 매출 트렌드' : 'Monthly Sales Trends'}</h3>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} fontWeight={700} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px' }}
                  formatter={(value: number) => [formatCurrency(value, lang), 'Sales']}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#db2777' : '#f472b6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="text-pink-500">🎁</span> {lang === 'KO' ? '등급 달성 보상' : 'Tier Rewards'}
          </h3>
          <div className="space-y-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Reward (GOLD)</p>
              <p className="text-sm font-bold text-slate-800 leading-relaxed whitespace-pre-line">
                {t.tier_gift_treat.replace('{amount}', silverTreat)}{t.tier_gift_gold_plus}
              </p>
            </div>
            <div className="p-5 bg-pink-50 rounded-2xl border border-pink-100">
              <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-1">Upcoming (PLATINUM)</p>
              <p className="text-sm font-bold text-pink-700 leading-relaxed opacity-60 whitespace-pre-line">
                {t.tier_gift_treat.replace('{amount}', platinumTreat)}{t.tier_gift_platinum_plus}
              </p>
            </div>
          </div>
          <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all text-sm">
             {lang === 'KO' ? '시술 예약권 신청하기' : 'Request Treatment Trip'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDashboard;
