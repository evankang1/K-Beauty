
import React from 'react';
import { Language, Application } from '../types';
import { translations } from '../translations';
import { formatCurrencyShort } from '../utils/currency';

interface Props {
  lang: Language;
  applications: Application[];
  onUpdateStatus: (id: string, status: 'Approved' | 'Rejected') => void;
}

const AdminDashboard: React.FC<Props> = ({ lang, applications, onUpdateStatus }) => {
  const t = translations[lang];

  const pendingCount = applications.filter(a => a.status === 'Pending').length;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">{t.admin_title}</h2>
          <p className="text-slate-500 font-medium">Management & Analytics for IceNine Agency</p>
        </div>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black tracking-widest">
           ADMIN SECURE ACCESS
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-2">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t.admin_stats_total}</p>
          <p className="text-3xl font-black text-slate-900">{formatCurrencyShort(1450000000, lang)}</p>
          <div className="pt-2 flex items-center gap-2 text-green-500 font-bold text-xs">
            <span>↑ 12.5%</span>
            <span className="text-slate-300 font-medium">vs last month</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-2">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Influencers</p>
          <p className="text-3xl font-black text-slate-900">142 명</p>
          <div className="pt-2 flex items-center gap-2 text-blue-500 font-bold text-xs">
            <span>+ 8 new</span>
            <span className="text-slate-300 font-medium">this week</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-2 border-l-4 border-l-pink-500">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t.admin_stats_apps}</p>
          <p className="text-3xl font-black text-pink-600">{pendingCount} 건</p>
          <p className="text-slate-400 text-[10px] font-bold">Needs immediate review</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-xl font-black text-slate-900">{t.admin_app_list}</h3>
          <button className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">View All History</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-5">Timestamp</th>
                <th className="px-8 py-5">SNS Channel</th>
                <th className="px-8 py-5">Contact</th>
                <th className="px-8 py-5">Niche</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-slate-400 font-medium italic">
                    No new applications yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6 text-xs text-slate-500 font-medium">{app.timestamp}</td>
                    <td className="px-8 py-6">
                      <a href={app.sns} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold text-sm hover:underline">
                        {app.sns.length > 25 ? app.sns.substring(0, 25) + '...' : app.sns}
                      </a>
                    </td>
                    <td className="px-8 py-6 text-slate-900 font-bold text-sm">{app.contact}</td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600">
                        {app.niche}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        app.status === 'Approved' ? 'text-green-600' : 
                        app.status === 'Rejected' ? 'text-red-600' : 'text-amber-600'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2">
                      {app.status === 'Pending' ? (
                        <>
                          <button 
                            onClick={() => onUpdateStatus(app.id, 'Approved')}
                            className="text-[10px] font-black bg-pink-50 text-pink-600 px-4 py-2 rounded-xl hover:bg-pink-600 hover:text-white transition-all shadow-sm"
                          >
                            {t.admin_approve}
                          </button>
                          <button 
                            onClick={() => onUpdateStatus(app.id, 'Rejected')}
                            className="text-[10px] font-black text-slate-400 hover:text-red-500 transition-colors px-2"
                          >
                            {t.admin_reject}
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] text-slate-300 font-bold uppercase">PROCESSED</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
