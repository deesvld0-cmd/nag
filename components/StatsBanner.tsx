'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 50000, suffix: '+', label: 'Active Members' },
  { value: 200, suffix: '+', label: 'Expert Trainers' },
  { value: 500, suffix: '+', label: 'Workout Programs' },
  { value: 98, suffix: '%', label: 'Success Rate' },
];

function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);

  return count;
}

function StatItem({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
  const count = useCountUp(stat.value, 2200, started);
  return (
    <div className="text-center px-8 group">
      <div className="font-bebas text-[clamp(48px,5vw,72px)] leading-none gradient-text group-hover:neon-text transition-all duration-300">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-white/40 text-sm font-medium mt-1 uppercase tracking-widest">{stat.label}</div>
    </div>
  );
}

export default function StatsBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative py-20 bg-[#0D0D0D] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4FF00]/3 via-transparent to-[#D4FF00]/3" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y-0 lg:divide-x lg:divide-white/8">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} started={started} />
          ))}
        </div>
      </div>
    </div>
  );
}
