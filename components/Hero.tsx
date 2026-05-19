'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Users, Trophy, Star, ChevronDown, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function Hero() {
  const { t, language } = useLanguage();
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const promoVideo = 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38aaa35f7&profile_id=164';

  const words: Record<string, string[]> = {
    en: ['LIFESTYLE', 'STRENGTH', 'LEGACY', 'PHYSIQUE'],
    mn: ['АМЬДРАЛ', 'ХҮЧ', 'ӨВЛӨГ', 'БИЕ'],
    ru: ['ОБРАЗ ЖИЗНИ', 'СИЛА', 'НАСЛЕДИЕ', 'ФИГУРА'],
  };

  const stats = [
    { value: '50K+', label: t('hero.stats.members'), icon: Users },
    { value: '200+', label: t('hero.stats.trainers'), icon: Trophy },
    { value: '4.9', label: t('hero.stats.rating'), icon: Star },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words[language].length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, [language, words]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920"
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38aaa35f7&profile_id=164" type="video/mp4" />
        </video>
        <div className="video-overlay" />
        {/* Extra dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/70 via-transparent to-[#0B0B0B]/40" />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 grid-bg opacity-30 z-[1]" />

      {/* Neon orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#D4FF00]/5 rounded-full blur-[120px] z-[1] animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#D4FF00]/3 rounded-full blur-[80px] z-[1]" style={{ animation: 'float 8s ease-in-out infinite reverse' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-8 w-full">
        <div className="max-w-4xl">
          {/* Tag */}
          <div className="tag mb-8 inline-flex animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
            {t('hero.tag')}
          </div>

          {/* Heading */}
          <h1 className="font-bebas leading-none tracking-wide mb-6">
            <div
              className="text-white text-[clamp(56px,10vw,130px)] animate-slide-up whitespace-nowrap"
              style={{ animationDelay: '0.3s', opacity: 0 }}
            >
              {t('hero.line1')}
            </div>
            <div
              className="text-white text-[clamp(56px,10vw,130px)] animate-slide-up whitespace-nowrap"
              style={{ animationDelay: '0.5s', opacity: 0 }}
            >
              {t('hero.line2')}
            </div>
            <div
              className="text-[clamp(56px,10vw,130px)] animate-slide-up whitespace-nowrap"
              style={{ animationDelay: '0.7s', opacity: 0 }}
            >
              <span
                className="gradient-text transition-all duration-400"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  display: 'inline-block',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                {words[language][wordIndex]}
              </span>
            </div>
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/70 text-lg md:text-xl mb-8 animate-slide-up max-w-2xl"
            style={{ animationDelay: '0.9s', opacity: 0 }}
          >
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-4 mb-16 animate-slide-up"
            style={{ animationDelay: '1.1s', opacity: 0 }}
          >
            <a href="#programs" className="btn-primary flex items-center gap-2 text-[13px] py-3.5 px-8">
              {t('hero.cta')}
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setShowVideo(true)}
              className="btn-outline flex items-center gap-3 py-3.5 px-7"
            >
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </div>
              {t('hero.watchVideo')}
            </button>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-4 animate-slide-up"
            style={{ animationDelay: '1.3s', opacity: 0 }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl px-5 py-4 flex items-center gap-3 hover:border-[#D4FF00]/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-[#D4FF00]/10 rounded-lg flex items-center justify-center group-hover:bg-[#D4FF00]/20 transition-colors">
                  <stat.icon className="w-4 h-4 text-[#D4FF00]" />
                </div>
                <div>
                  <div className="font-bebas text-2xl text-white leading-none">{stat.value}</div>
                  <div className="text-white/40 text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float">
        <span className="text-white/30 text-xs tracking-widest uppercase">{t('hero.scrollDown')}</span>
        <ChevronDown className="w-4 h-4 text-[#D4FF00]" />
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent z-[2]" />

      {showVideo && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" />
          <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#111111]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setShowVideo(false)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/70 transition-colors hover:text-white"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <video
              src={promoVideo}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black object-cover"
              poster="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920"
            />
          </div>
        </div>
      )}
    </section>
  );
}
