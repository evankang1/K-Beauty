
import React, { useState } from 'react';
import { generateMarketingContent } from '../services/geminiService';
import { Language } from '../types';

interface Props {
  lang: Language;
}

const ContentGenerator: React.FC<Props> = ({ lang }) => {
  const [niche, setNiche] = useState('');
  const [audience, setAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!niche || !audience) return;
    setLoading(true);
    setResult(null); // 이전 결과 초기화
    try {
      const content = await generateMarketingContent(niche, audience);
      setResult(content);
    } catch (e) {
      setResult("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const labels = {
    KO: { niche: "인플루언서 분야", audience: "타겟 오디언스", nichePlaceholder: "예: 스킨케어, 데일리 브이로그", audiencePlaceholder: "예: 2030 직장인 여성", btn: "AI 스크립트 생성", tip: "바이럴 스크립트를 생성하여 성과를 극대화하세요.", copy: "복사하기", copied: "복사됨!" },
    EN: { niche: "Influencer Niche", audience: "Target Audience", nichePlaceholder: "e.g. Skincare, Daily Vlog", audiencePlaceholder: "e.g. 25-35 Career Women", btn: "Generate AI Script", tip: "Generate viral scripts to maximize your performance.", copy: "Copy", copied: "Copied!" },
    TH: { niche: "หมวดหมู่คอนเทนต์", audience: "กลุ่มเป้าหมาย", nichePlaceholder: "เช่น สกินแคร์, ไลฟ์สไตล์", audiencePlaceholder: "เช่น ผู้หญิงวัยทำงาน 25-35 ปี", btn: "สร้างสคริปต์ AI", tip: "สร้างสคริปต์ไวรัลเพื่อเพิ่มประสิทธิภาพสูงสุด", copy: "คัดลอก", copied: "คัดลอกแล้ว!" }
  };

  const t = labels[lang];

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Thai-Korea <span className="gradient-text">AI Content Studio</span>
        </h2>
        <p className="text-slate-600 font-medium">
          {t.tip}
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 space-y-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-900 ml-1">
              <span className="text-pink-500 text-lg">✦</span> {t.niche}
            </label>
            <input 
              type="text" 
              placeholder={t.nichePlaceholder}
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-900 ml-1">
              <span className="text-blue-500 text-lg">◎</span> {t.audience}
            </label>
            <input 
              type="text" 
              placeholder={t.audiencePlaceholder}
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading || !niche || !audience}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg shadow-xl shadow-slate-900/10"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Generating Magic...</span>
            </div>
          ) : (
            <><span className="text-xl">✨</span> {t.btn}</>
          )}
        </button>

        {result && (
          <div className="mt-12 animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between mb-4 px-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-6 bg-pink-500 rounded-full"></span>
                {lang === 'KO' ? '생성된 바이럴 스크립트' : lang === 'EN' ? 'Generated Script' : 'สคริปต์ที่สร้างขึ้น'}
              </h4>
              <button 
                onClick={handleCopy}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                  copied ? 'bg-green-500 text-white' : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                }`}
              >
                {copied ? t.copied : t.copy}
              </button>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-200 relative group overflow-hidden">
              <div className="absolute -top-4 -right-4 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <span className="text-9xl font-black">AI</span>
              </div>
              <div className="relative z-10 font-sans text-base text-slate-800 leading-[1.9] tracking-tight whitespace-pre-wrap">
                {result}
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
              <span className="text-xl">💡</span>
              <p className="text-xs text-blue-700 font-medium leading-normal">
                {lang === 'KO' ? '이 스크립트를 기반으로 태국어 자막을 입힌 숏폼 영상을 제작해보세요!' : 
                 lang === 'EN' ? 'Try creating a short-form video with Thai subtitles based on this script!' :
                 'ลองสร้างวิดีโอสั้นพร้อมคำบรรยายภาษาไทยโดยอิงจากสคริปต์นี้!'}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {!result && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {[
            { label: "Short-form Focus", icon: "📱", desc: "TikTok/Reels에 최적화된 15-30초 분량" },
            { label: "High Conversion", icon: "🎯", desc: "행동 유도(CTA)가 포함된 전환 중심 스크립트" },
            { label: "Multi-Lingual", icon: "🌏", desc: "태국어/영어 병기로 현지 오디언스 소통 강화" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-5 bg-white/50 rounded-3xl border border-slate-100 shadow-sm">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-slate-900">{item.label}</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
