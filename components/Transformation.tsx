'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const transformations = [
  {
    id: 1,
    name: 'Marcus T.',
    before: 'https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=600',
    after: 'https://images.pexels.com/photos/1431283/pexels-photo-1431283.jpeg?auto=compress&cs=tinysrgb&w=600',
    beforeWeight: '98kg', afterWeight: '81kg',
    duration: '16 weeks', program: 'Shred Protocol',
    quote: 'NANZAD completely changed how I approach training. The structure, the guidance, the community — everything is on another level.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah K.',
    before: 'https://images.pexels.com/photos/4498294/pexels-photo-4498294.jpeg?auto=compress&cs=tinysrgb&w=600',
    after: 'https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg?auto=compress&cs=tinysrgb&w=600',
    beforeWeight: '72kg', afterWeight: '60kg',
    duration: '12 weeks', program: 'Metabolic Ignition',
    quote: 'I\'ve tried so many programs, but nothing stuck. NANZAD\'s approach made it sustainable and enjoyable.',
    rating: 5,
  },
  {
    id: 3,
    name: 'James R.',
    before: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=600',
    after: 'https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=600',
    beforeWeight: '73kg', afterWeight: '85kg',
    duration: '20 weeks', program: 'Mass Monster',
    quote: 'Added 12kg of lean mass in 5 months. The program design and trainer support are unmatched.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Alicia M.',
    before: 'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=600',
    after: 'https://images.pexels.com/photos/4162438/pexels-photo-4162438.jpeg?auto=compress&cs=tinysrgb&w=600',
    beforeWeight: '65kg', afterWeight: '55kg',
    duration: '10 weeks', program: 'Greek God Physique',
    quote: 'The transformation I achieved in 10 weeks took other platforms 6+ months. The difference is the quality of coaching.',
    rating: 5,
  },
];

const testimonials = [
  { name: 'David H.', role: 'Competitive Powerlifter', text: 'Best investment I\'ve made in my fitness journey. The programs are incredibly well-designed.', rating: 5, avatar: 'DH' },
  { name: 'Emma L.', role: 'Fitness Enthusiast', text: 'The exercise library alone is worth the subscription. Step-by-step videos for everything.', rating: 5, avatar: 'EL' },
  { name: 'Chris P.', role: 'Amateur Bodybuilder', text: 'Went from beginner to competing in 8 months. The structured programming is elite.', rating: 5, avatar: 'CP' },
];

export default function Transformations() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeTransform, setActiveTransform] = useState(0);

  const current = transformations[activeTransform];

  return (
    <section id="transformations" className="relative py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="tag mb-4 mx-auto inline-flex">Real Results</div>
          <h2 className="font-bebas text-[clamp(40px,6vw,80px)] leading-none text-white mb-4">
            REAL PEOPLE
            <br />
            <span className="gradient-text">REAL RESULTS</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            Thousands of transformations backed by science, coaching, and community.
          </p>
        </div>

        {/* Before/After Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            {/* Before/After Component */}
            <div
              className="relative h-80 rounded-2xl overflow-hidden cursor-ew-resize select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setSliderPos(((e.clientX - rect.left) / rect.width) * 100);
              }}
              onTouchMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setSliderPos(((e.touches[0].clientX - rect.left) / rect.width) * 100);
              }}
            >
              {/* After */}
              <img src={current.after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 text-xs font-bold text-[#D4FF00]">AFTER</div>
              <div className="absolute bottom-4 right-4 text-right">
                <div className="font-bebas text-2xl text-[#D4FF00]">{current.afterWeight}</div>
              </div>

              {/* Before overlay */}
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                <img src={current.before} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-bold text-white/70">BEFORE</div>
                <div className="absolute bottom-4 left-4">
                  <div className="font-bebas text-2xl text-white/60">{current.beforeWeight}</div>
                </div>
              </div>

              {/* Divider */}
              <div
                className="absolute inset-y-0 w-0.5 bg-[#D4FF00] shadow-[0_0_20px_rgba(212,255,0,0.6)] z-10"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#D4FF00] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,255,0,0.5)]">
                  <div className="flex gap-1">
                    <ChevronLeft className="w-3 h-3 text-black" />
                    <ChevronRight className="w-3 h-3 text-black" />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-2 mt-4">
              {transformations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTransform(i)}
                  className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${i === activeTransform ? 'bg-[#D4FF00]' : 'bg-white/15 hover:bg-white/30'}`}
                />
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="glass rounded-2xl p-8">
            <Quote className="w-8 h-8 text-[#D4FF00] mb-4 opacity-60" />
            <p className="text-white/80 text-lg leading-relaxed mb-6 italic">&ldquo;{current.quote}&rdquo;</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#D4FF00]/15 rounded-full flex items-center justify-center">
                <span className="font-bebas text-[#D4FF00] text-lg">{current.name[0]}</span>
              </div>
              <div>
                <div className="font-semibold text-white">{current.name}</div>
                <div className="text-white/40 text-sm">{current.program} &bull; {current.duration}</div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4FF00] text-[#D4FF00]" />
                ))}
              </div>
            </div>

            <div className="divider my-6" />

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/3 rounded-xl p-4 text-center">
                <div className="font-bebas text-3xl text-red-400">{current.beforeWeight}</div>
                <div className="text-white/30 text-xs">Starting Weight</div>
              </div>
              <div className="bg-white/3 rounded-xl p-4 text-center">
                <div className="font-bebas text-3xl text-[#D4FF00]">{current.afterWeight}</div>
                <div className="text-white/30 text-xs">Final Weight</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="glass rounded-xl p-6 hover:border-[#D4FF00]/15 transition-colors duration-300">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[#D4FF00] text-[#D4FF00]" />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#D4FF00]/15 rounded-full flex items-center justify-center">
                  <span className="font-bebas text-[#D4FF00] text-sm">{t.avatar}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/30 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
