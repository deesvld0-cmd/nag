'use client';

import { useState } from 'react';
import { Zap, Link as LinkIcon, Share2, ArrowRight, Mail, MapPin, Phone, X, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function Footer() {
  const { t } = useLanguage();
  const [showTrial, setShowTrial] = useState(false);

  const links = {
    Programs: [
      { key: 'footer.programs.bulking', label: t('footer.programs.bulking') },
      { key: 'footer.programs.fatLoss', label: t('footer.programs.fatLoss') },
      { key: 'footer.programs.strength', label: t('footer.programs.strength') },
      { key: 'footer.programs.aesthetics', label: t('footer.programs.aesthetics') },
      { key: 'footer.programs.homeWorkouts', label: t('footer.programs.homeWorkouts') },
      { key: 'footer.programs.hiit', label: t('footer.programs.hiit') },
    ],
    Platform: [
      { key: 'footer.platform.exerciseLibrary', label: t('footer.platform.exerciseLibrary') },
      { key: 'footer.platform.bmiCalculator', label: t('footer.platform.bmiCalculator') },
      { key: 'footer.platform.mealPlanner', label: t('footer.platform.mealPlanner') },
      { key: 'footer.platform.progressTracker', label: t('footer.platform.progressTracker') },
      { key: 'footer.platform.community', label: t('footer.platform.community') },
    ],
    Company: [
      { key: 'footer.company.aboutUs', label: t('footer.company.aboutUs') },
      { key: 'footer.company.careers', label: t('footer.company.careers') },
      { key: 'footer.company.pressKit', label: t('footer.company.pressKit') },
      { key: 'footer.company.partnerships', label: t('footer.company.partnerships') },
      { key: 'footer.company.affiliateProgram', label: t('footer.company.affiliateProgram') },
    ],
    Support: [
      { key: 'footer.support.helpCenter', label: t('footer.support.helpCenter') },
      { key: 'footer.support.contactUs', label: t('footer.support.contactUs') },
      { key: 'footer.support.privacyPolicy', label: t('footer.support.privacyPolicy') },
      { key: 'footer.support.termsOfService', label: t('footer.support.termsOfService') },
      { key: 'footer.support.refundPolicy', label: t('footer.support.refundPolicy') },
    ],
  };

  return (
    <footer className="relative bg-[#0B0B0B] border-t border-white/5">
      {/* CTA Band */}
      <div className="relative overflow-hidden bg-[#D4FF00] py-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="font-bebas text-[clamp(32px,5vw,64px)] text-[#0B0B0B] leading-none mb-4">
            {t('footer.cta.title')}
          </div>
          <p className="text-[#0B0B0B]/60 text-lg mb-8 max-w-md mx-auto">
            {t('footer.cta.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={() => setShowTrial(true)}
              className="bg-[#0B0B0B] text-white font-bold py-3.5 px-8 rounded-lg flex items-center gap-2 hover:bg-[#1A1A1A] transition-colors"
            >
              {t('footer.cta.startTrial')}
              <ArrowRight className="w-4 h-4" />
            </button>
            <a href="#programs" className="border-2 border-[#0B0B0B]/30 text-[#0B0B0B] font-bold py-3.5 px-8 rounded-lg hover:border-[#0B0B0B] transition-colors">
              {t('footer.cta.browsePrograms')}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-[#D4FF00] rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-black fill-black" />
              </div>
              <span className="font-bebas text-[22px] tracking-wider">
                NANZAD<span className="text-[#D4FF00]">FITNESS</span>
              </span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-6 max-w-xs">
              {t('footer.description')}
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-white/30 text-sm">
                <Mail className="w-3.5 h-3.5 text-[#D4FF00]" />
                {t('footer.email')}
              </div>
              <div className="flex items-center gap-2 text-white/30 text-sm">
                <Phone className="w-3.5 h-3.5 text-[#D4FF00]" />
                {t('footer.phone')}
              </div>
              <div className="flex items-center gap-2 text-white/30 text-sm">
                <MapPin className="w-3.5 h-3.5 text-[#D4FF00]" />
                {t('footer.location')}
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: LinkIcon, label: 'Instagram' },
                { icon: Share2, label: 'Twitter' },
                { icon: Share2, label: 'YouTube' },
                { icon: LinkIcon, label: 'Facebook' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white/40 hover:text-[#D4FF00] hover:border-[#D4FF00]/30 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-semibold text-white text-sm mb-4 tracking-wide">{t(`footer.${section.toLowerCase()}`)}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.key}>
                    <a href="#" className="text-white/35 text-sm hover:text-white transition-colors hover:pl-1 duration-200 block">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="divider my-12" />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-semibold text-white mb-1">{t('footer.newsletter.title')}</div>
            <p className="text-white/35 text-sm">{t('footer.newsletter.subtitle')}</p>
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <input
              type="email"
              placeholder={t('footer.newsletter.placeholder')}
              className="flex-1 lg:w-64 bg-[#111111] border border-white/8 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#D4FF00]/40"
            />
            <button className="btn-primary py-3 px-6 whitespace-nowrap">
              {t('footer.newsletter.subscribe')}
            </button>
          </div>
        </div>

        <div className="divider my-10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-white/20 text-xs">{t('footer.poweredBy')}</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-[#D4FF00] rounded flex items-center justify-center">
                <Zap className="w-2.5 h-2.5 text-black fill-black" />
              </div>
              <span className="text-white/30 text-xs font-semibold">NANZAD</span>
            </div>
          </div>
        </div>
      </div>

      {showTrial && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" onClick={() => setShowTrial(false)}>
          <div className="absolute inset-0 bg-black/85 backdrop-blur-lg" />
          <div
            className="relative z-10 w-full max-w-md rounded-2xl border border-[#D4FF00]/25 bg-[#111111] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowTrial(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 hover:text-white"
              aria-label="Close free trial"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-5">
              <div className="tag mb-4">Free Trial</div>
              <h3 className="font-bebas text-4xl leading-none text-white">START YOUR 7-DAY TRIAL</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                Get instant access to starter programs, BMI tools, and trainer discovery before choosing a paid plan.
              </p>
            </div>
            <div className="space-y-3 mb-6">
              {['No payment required today', 'Cancel anytime', 'Upgrade when you are ready'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-white/75">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4FF00]/15">
                    <Check className="h-3 w-3 text-[#D4FF00]" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setShowTrial(false);
                document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="btn-primary w-full py-3.5 font-bold"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
