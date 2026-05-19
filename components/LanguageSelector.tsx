'use client';

import { useState } from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

type Language = 'en' | 'mn' | 'ru';

const languages = [
  { code: 'en' as Language, name: 'EN', flag: '🇬🇧' },
  { code: 'mn' as Language, name: 'MN', flag: '🇲🇳' },
  { code: 'ru' as Language, name: 'RU', flag: '🇷🇺' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(l => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors px-4 py-2"
      >
        <Languages className="w-4 h-4" />
        <span>{currentLanguage?.flag} {currentLanguage?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                language === lang.code
                  ? 'bg-[#D4FF00]/10 text-[#D4FF00]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
