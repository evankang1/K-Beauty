
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  lang: Language;
}

const CustomerIncentives: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  const memberships = lang === 'KO' ? [
    { title: "프리미엄 정액권", clinic: "강남 공통", benefit: "+ 20% 추가 적립", desc: "고액 결제 시 인플루언서에게 고액 수익 발생" },
    { title: "베버리힐즈 VIP 케어", clinic: "베버리힐즈", benefit: "12개월 사후관리", desc: "장기 리텐션 보장형 모델" },
    { title: "글라스 스킨 패키지", clinic: "피부과 전용", benefit: "태국-한국 연계", desc: "재방문 유도에 최적화된 패키지" }
  ] : lang === 'EN' ? [
    { title: "Premium Prepaid", clinic: "Gangnam Clinics", benefit: "+ 20% Bonus Credit", desc: "High-value sales bring high commissions." },
    { title: "Beverly Hills VIP Care", clinic: "Beverly Hills Clinic", benefit: "12M Aftercare", desc: "Long-term retention model." },
    { title: "Glass Skin Package", clinic: "Derm Clinics", benefit: "TH-KR Connected", desc: "Optimized for recurring visits." }
  ] : [
    { title: "สมาชิกพรีเมียม", clinic: "คลินิกกังนัม", benefit: "+ 20% เครดิตเพิ่ม", desc: "ยอดขายสูงรับคอมมิชชั่นสูง" },
    { title: "Beverly Hills VIP Care", clinic: "Beverly Hills Clinic", benefit: "ดูแลหลังผ่าตัด 12 เดือน", desc: "โมเดลการรักษาลูกค้าในระยะยาว" },
    { title: "Glass Skin Package", clinic: "Derm Clinics", benefit: "เชื่อมต่อ ไทย-เกาหลี", desc: "เน้นการกลับมาใช้บริการซ้ำ" }
  ];

  return (
    <section className="space-y-12 py-10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-slate-900">{t.membership_title}</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">{t.membership_desc}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {memberships.map((item, idx) => (
          <div key={idx} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 space-y-4 border-b-4 border-b-pink-500">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-xs font-bold text-slate-400">{item.clinic}</p>
            <div className="py-2 px-4 bg-pink-50 rounded-xl text-pink-600 font-black">{item.benefit}</div>
            <p className="text-xs text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerIncentives;
