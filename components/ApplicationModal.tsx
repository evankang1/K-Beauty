
import React, { useState } from 'react';
import { Language, Application } from '../types';
import { translations } from '../translations';

interface Props {
  lang: Language;
  onClose: () => void;
  onSubmit: (app: Application) => void;
}

const ApplicationModal: React.FC<Props> = ({ lang, onClose, onSubmit }) => {
  const t = translations[lang];
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ sns: '', contact: '', niche: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sns || !formData.contact) return;

    const newApp: Application = {
      id: Math.random().toString(36).substr(2, 9),
      sns: formData.sns,
      contact: formData.contact,
      niche: formData.niche || 'Not Specified',
      timestamp: new Date().toLocaleString(),
      status: 'Pending'
    };

    onSubmit(newApp);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {!submitted ? (
          <div className="p-8 md:p-10 space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-slate-900">{t.form_title}</h3>
                <p className="text-slate-500 text-sm">Join the elite K-Beauty network.</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">{t.form_sns}</label>
                <input 
                  required
                  type="text"
                  placeholder="https://..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-medium"
                  value={formData.sns}
                  onChange={e => setFormData({...formData, sns: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">{t.form_contact}</label>
                <input 
                  required
                  type="text"
                  placeholder="@id_or_number"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all font-medium"
                  value={formData.contact}
                  onChange={e => setFormData({...formData, contact: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">{t.form_niche}</label>
                <select 
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all appearance-none cursor-pointer font-medium"
                  value={formData.niche}
                  onChange={e => setFormData({...formData, niche: e.target.value})}
                >
                  <option value="">Select Niche</option>
                  <option value="Skincare">Skincare</option>
                  <option value="Plastic Surgery">Plastic Surgery</option>
                  <option value="Lifestyle">Lifestyle / Vlog</option>
                  <option value="Fashion">K-Fashion</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold hover:bg-pink-700 transition-all shadow-xl shadow-pink-200 active:scale-[0.98]"
              >
                {t.form_submit}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎉</span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900">{t.form_success}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              {lang === 'KO' ? '도이재웰니스 매니저가 24시간 이내에 안내해 드립니다. 서울에서의 멋진 경험을 기대해 주세요!' : 
               lang === 'EN' ? 'Doijae Wellness manager will contact you within 24 hours. Get ready for your Seoul journey!' :
               'ผู้จัดการจาก Doijae Wellness จะติดต่อกลับภายใน 24 ชั่วโมง เตรียมตัวให้พร้อมสำหรับการเดินทางสู่โซล!'}
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
            >
              {t.form_close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;
