
import { Language } from '../types';

const RATES = {
  KO: 1,      // KRW (기본)
  EN: 1400,   // USD (1$ = 1400원 가정)
  TH: 40      // THB (1฿ = 40원 가정)
};

const SYMBOLS = {
  KO: '₩',
  EN: '$',
  TH: '฿'
};

const CURRENCY_CODES = {
  KO: 'KRW',
  EN: 'USD',
  TH: 'THB'
};

export function formatCurrency(amountKRW: number, lang: Language): string {
  const converted = amountKRW / RATES[lang];
  
  return new Intl.NumberFormat(lang === 'KO' ? 'ko-KR' : lang === 'EN' ? 'en-US' : 'th-TH', {
    style: 'currency',
    currency: CURRENCY_CODES[lang],
    maximumFractionDigits: lang === 'KO' ? 0 : 0, // 소수점 제외 (간결함 유지)
  }).format(converted);
}

// 약식 표기 (예: 50M, 5,000만 등)
export function formatCurrencyShort(amountKRW: number, lang: Language): string {
  const converted = amountKRW / RATES[lang];
  
  if (lang === 'KO') {
    if (amountKRW >= 100000000) return `${(amountKRW / 100000000).toFixed(1)}억 원`;
    if (amountKRW >= 10000) return `${(amountKRW / 10000).toLocaleString()}만 원`;
    return `${amountKRW.toLocaleString()}원`;
  }
  
  return new Intl.NumberFormat(lang === 'EN' ? 'en-US' : 'th-TH', {
    style: 'currency',
    currency: CURRENCY_CODES[lang],
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(converted);
}
