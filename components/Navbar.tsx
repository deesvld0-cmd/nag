'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Zap } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/lib/i18n';

const navLinks = [
  { label: 'nav.programs', href: '#programs' },
  { label: 'nav.exercises', href: '#exercises' },
  { label: 'nav.calculator', href: '#calculator' },
  { label: 'nav.trainers', href: '#trainers' },
  { label: 'nav.shop', href: '#shop' },
  { label: 'nav.blog', href: '#blog' },
];

export default function Navbar() {
  const { t } = useLanguage();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0B0B0B] border-b border-white/5 py-3'
            : 'bg-[#0B0B0B] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#D4FF00] rounded flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(212,255,0,0.5)] transition-all duration-300">
              <Zap className="w-4 h-4 text-black fill-black" />
            </div>
            <span className="font-bebas text-[22px] tracking-wider text-white">
              NANZAD<span className="text-[#D4FF00]">FITNESS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 relative group"
                >
                  {t(link.label)}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4FF00] group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSelector />
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-semibold text-white/70 hover:text-white transition-colors px-4 py-2"
                >
                  {t('nav.dashboard')}
                </Link>
                {session.user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-sm font-semibold text-[#D4FF00] hover:text-[#E8FF4D] transition-colors px-4 py-2"
                  >
                    {t('nav.admin')}
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-sm font-semibold text-white/70 hover:text-white transition-colors px-4 py-2"
                >
                  {t('nav.signOut')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm font-semibold text-white/70 hover:text-white transition-colors px-4 py-2"
                >
                  {t('nav.signIn')}
                </Link>
                <a
                  href="#membership"
                  className="btn-primary text-[13px] py-2.5 px-5"
                >
                  {t('nav.getStarted')}
                </a>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(11,11,11,0.97)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-bebas text-4xl text-white hover:text-[#D4FF00] transition-colors tracking-widest"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {t(link.label)}
            </a>
          ))}
          <LanguageSelector />
          {session ? (
            <>
              <span className="text-white/70 font-semibold">
                {session.user?.name || session.user?.email}
              </span>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="text-white hover:text-[#D4FF00] font-semibold transition-colors"
              >
                {t('nav.dashboard')}
              </Link>
              {session.user?.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="text-[#D4FF00] hover:text-[#E8FF4D] font-semibold transition-colors"
                >
                  {t('nav.admin')}
                </Link>
              )}
              <button
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
                className="text-white hover:text-[#D4FF00] font-semibold transition-colors"
              >
                {t('nav.signOut')}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                onClick={() => setOpen(false)}
                className="text-white hover:text-[#D4FF00] font-semibold transition-colors"
              >
                {t('nav.signIn')}
              </Link>
              <a
                href="#membership"
                onClick={() => setOpen(false)}
                className="btn-primary mt-4 text-base px-10 py-4"
              >
                {t('nav.joinNow')}
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}
