
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NetworkModel from './components/NetworkModel';
import InfluencerDashboard from './components/InfluencerDashboard';
import ContentGenerator from './components/ContentGenerator';
import CustomerIncentives from './components/CustomerIncentives';
import ApplicationModal from './components/ApplicationModal';
import AdminDashboard from './components/AdminDashboard';
import { InfluencerProfile, RewardTier, Language, Application } from './types';
import { translations } from './translations';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'tools' | 'admin'>('home');
  const [language, setLanguage] = useState<Language>('KO');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminError, setAdminError] = useState(false);
  
  const [profile] = useState<InfluencerProfile>({
    name: "Sarin Phitak",
    followers: 125000,
    referralsCount: 42,
    totalEarnings: 850000,
    tier: RewardTier.GOLD
  });

  const t = translations[language];

  // Load existing applications from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('kglow_apps');
    if (saved) {
      try {
        setApplications(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse applications", e);
      }
    }
  }, []);

  const handleNewApplication = (app: Application) => {
    const updated = [app, ...applications];
    setApplications(updated);
    localStorage.setItem('kglow_apps', JSON.stringify(updated));
  };

  const handleUpdateApplicationStatus = (id: string, status: 'Approved' | 'Rejected') => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status } : app
    );
    setApplications(updated);
    localStorage.setItem('kglow_apps', JSON.stringify(updated));
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo passcode
    if (adminPasscode === 'icenine2024') {
      setIsAdminAuthenticated(true);
      setAdminError(false);
    } else {
      setAdminError(true);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 ${language === 'TH' ? 'font-sans' : ''}`}>
      <Header 
        activeTab={activeTab === 'admin' ? 'home' : activeTab} 
        setActiveTab={(tab) => setActiveTab(tab as any)} 
        language={language} 
        setLanguage={setLanguage}
        onApplyClick={() => setIsApplyModalOpen(true)}
        isAdminActive={isAdminAuthenticated && activeTab === 'admin'}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <div className="space-y-16">
            <Hero lang={language} />
            <NetworkModel lang={language} />
            <CustomerIncentives lang={language} />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <InfluencerDashboard profile={profile} lang={language} />
        )}

        {activeTab === 'tools' && (
          <ContentGenerator lang={language} />
        )}

        {activeTab === 'admin' && (
          <>
            {!isAdminAuthenticated ? (
              <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
                <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">{t.admin_login_title}</h2>
                <form onSubmit={handleAdminLogin} className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">{t.admin_login_pass}</label>
                    <input 
                      type="password"
                      value={adminPasscode}
                      onChange={(e) => setAdminPasscode(e.target.value)}
                      className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border outline-none transition-all font-medium ${adminError ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-pink-500'}`}
                      placeholder="••••••••"
                    />
                    {adminError && <p className="text-red-500 text-[10px] font-bold mt-2 ml-1">{t.admin_login_err}</p>}
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all">
                    {t.admin_login_btn}
                  </button>
                </form>
              </div>
            ) : (
              <AdminDashboard 
                lang={language} 
                applications={applications} 
                onUpdateStatus={handleUpdateApplicationStatus}
              />
            )}
          </>
        )}
      </main>

      {isApplyModalOpen && (
        <ApplicationModal 
          lang={language} 
          onClose={() => setIsApplyModalOpen(false)} 
          onSubmit={handleNewApplication}
        />
      )}

      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
               <span className="text-white text-[10px] font-bold">K</span>
            </div>
            <span className="text-slate-900 font-bold text-sm">K-Glow Connect</span>
          </div>
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
            © 2024 Doijae Wellness Co., Ltd. Seoul & Bangkok. All Rights Reserved.
          </p>
          <button 
            onClick={() => setActiveTab('admin')}
            className="text-[10px] font-bold text-slate-300 hover:text-slate-500 transition-colors"
          >
            {isAdminAuthenticated ? 'ADMIN CONSOLE' : 'MANAGEMENT ACCESS'}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
