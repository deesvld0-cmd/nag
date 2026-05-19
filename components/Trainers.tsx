'use client';

import { useState } from 'react';
import { Link, Share2, Award, Users, Calendar } from 'lucide-react';

const trainers = [
  {
    id: 1,
    name: 'Б.Амарбат',
    role: 'Powerlifting Coach',
    specialty: 'Powerlifting & Strength',
    image: '/api/trainer-images/amarbat',
    experience: '10+ Years',
    clients: '200+',
    certifications: ['Powerlifting Coach', 'Strength & Conditioning'],
    tags: ['Powerlifting', 'Strength', 'Weightlifting'],
    bio: 'Powerlifting specialist with years of competitive experience. Expert in strength training and powerlifting techniques.',
    social: { instagram: '#', twitter: '#', youtube: '#' },
    rating: 4.9,
    reviews: 150,
    transformationResults: [
      '2023: Asia Grand Prix Men\'s Physique Pro - Ази 2-р байр',
      '2024: AGP Pro - Ази 3-р байр',
      '2024: China DMS Pro Ningjin - Хятад 🥇 1-р байр ⭐',
      '2024: Hong Kong SAR Pro - Хонг Конг 10-р байр',
      '2024: Mr. Olympia - АНУ, Лас Вегас 16-р байр',
      '2025: China DMS JiangYin Pro - Хятад 2-р байр',
      '2025: China DMS Pro Ningjin - Хятад 2-р байр',
      '2025: AGP Korea Pro - Солонгос 2-р байр',
      '2025: World of Monsterzym Korea Pro - Солонгос 2-р байр',
    ],
  },
  {
    id: 2,
    name: 'Б.Уянга',
    role: 'Fitness & Beauty Coach',
    specialty: 'Fitness & Beauty',
    image: '/api/trainer-images/uyanga',
    experience: '5+ Years',
    clients: '150+',
    certifications: ['Fitness Trainer', 'Beauty & Wellness'],
    tags: ['Fitness', 'Beauty', 'Wellness'],
    bio: 'Fitness and beauty specialist focused on holistic wellness and body transformation.',
    social: { instagram: '#', twitter: '#', youtube: '#' },
    rating: 5.0,
    reviews: 120,
    transformationResults: [
      '2021: Монголын мистер УАШТ - Бикини ангилал: Алт',
      '2021: Монголын мистер УАШТ - Фитнесс ангилал: Алт',
      '2021: Чамп кап тэмцээн - Бикини ангилал: Алт',
      '2022: Монголын мистер УАШТ - Үнэмлэхүй аварга (Үнэмлэхүй мисс)',
      '2022: Чамп кап тэмцээн - Бикини ангилал: Алт + Үнэмлэхүй мисс',
      '2022: Chulsoon Classic олон улсын тэмцээн: Алт',
      '2022: Mister Olympia AGP: Хүрэл',
      '2022: Төрийн дээд "Алтан гадас" одон, "Соёлын Тэргүүний ажилтан"',
      '2023: Mister Olympia AGP Open: Алт',
      '2023: Mister Olympia AGP Overall: Pro Card авсан',
      '2023: Тайван Про тэмцээн: 3-р байр',
      '2023: Тайван Про тэмцээн (2 дахь удаа): 1-р байр 🥇',
      '2024: Монголын бодибилдингийн түүхэнд анх Mr. Olympia-д оролцох эрх авсан',
      '2025: Mr. Olympia (АНУ, Лас Вегас) - Бикини ангилал 16-р байр',
      '2025: Asian Championships Pro (Тайван) - Бикини ангилал 2-р байр',
      '2025: Huanji China Pro (Бээжин) - Бикини ангилал 1-р байр',
    ],
  },
  {
    id: 3,
    name: 'Н.Болор-Эрдэнэ',
    role: 'Fat Loss Specialist',
    specialty: 'Fat Loss & Nutrition',
    image: '/api/trainer-images/bolor-erdene',
    experience: '6 Years',
    clients: '180+',
    certifications: ['Fat Loss Specialist', 'Nutrition Coach'],
    tags: ['Fat Loss', 'Nutrition', 'HIIT'],
    bio: 'Certified fat loss and nutrition specialist. Expert in metabolic conditioning and sustainable weight management.',
    social: { instagram: '#', twitter: '#', youtube: '#' },
    rating: 4.8,
    reviews: 95,
    transformationResults: [
      '2018: Хотын аварга шалгаруулах тэмцээн - 3-р байр 🥉',
      '2019: IFBE PRO QUALIFIER тэмцээн - 2-р байр мөнгө 🥈, 3-р байр хүрэл 🥉',
      '2019: Мон Алтиус Perfect Cup тэмцээн - 1-р байр Алт 🥇',
      '2019: Улсын аварга шалгаруулах тэмцээн - хос хүрэл 🥉🥉',
      '2019: Дэлхийн аварга шалгаруулах тэмцээн - 4-р байр',
      '2020: Улсын аварга шалгаруулах тэмцээн - 1-р байр Алт 🥇, 3-р байр хүрэл 🥉',
      '2021: Улсын аварга шалгаруулах тэмцээн - Алт 🥇',
      '2021: Champ Cup цомын аварга шалгаруулах тэмцээн - алт 🥇',
      '2022: Улсын аварга шалгаруулах тэмцээн - 1-р байр 🥇',
      '2024: Улсын аварга шалгаруулах тэмцээн - 2-р байр 🥈, 3-р байр 🥉',
      '2024: Champ Cup цомын аварга шалгаруулах тэмцээн - 3-р байр 🥉',
      '2024: ӨМӨЗО Чийрэг кап тэмцээн - Bikini 165 ангилал 2-р байр 🥈, +40 мастер ангилал 1-р байр 🥇',
      '2024: Азийн аварга шалгаруулах тэмцээн (Индонези) - Bikini model 165 ангилал 1-р байр 🥇',
      '2024: ДАШТ (Мальдив) - Bikini model 165см төрөл 1-р байр 🥇, Bikini model +35 насны ангилал 1-р байр 🥇 (Дэлхийн хошой аварга)',
      '2026: IFBB PRO CARD',
    ],
  },
  {
    id: 4,
    name: 'Т.Очирэрдэнэ',
    role: 'Boxing Coach',
    specialty: 'Boxing & Combat Sports',
    image: '/api/trainer-images/ochirerdene',
    experience: '8 Years',
    clients: '120+',
    certifications: ['Boxing Coach', 'Combat Sports'],
    tags: ['Boxing', 'Combat', 'Strength'],
    bio: 'Professional boxing coach with competitive experience. Specializes in boxing techniques and combat conditioning.',
    social: { instagram: '#', twitter: '#', youtube: '#' },
    rating: 4.9,
    reviews: 80,
    transformationResults: [
      '2023: Champ Cup цомын аварга - 3-р байр 🥉',
      '2023: Дархан Cup цомын аварга - 3-р байр 🥉',
      '2024: Olympia Amateur Korea - Top 7',
      '2024: China Super series цомын аварга - 1-р байр 🥇',
      '2024: Champ Cup цомын аварга - 1-р байр 🥇',
    ],
  },
];

export default function Trainers() {
  const [selected, setSelected] = useState<null | typeof trainers[0]>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingPlan, setBookingPlan] = useState('Single Session');
  const [bookingTime, setBookingTime] = useState('Weekday evening');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const openTrainer = (trainer: typeof trainers[0], booking = false) => {
    setSelected(trainer);
    setShowBooking(booking);
    setBookingPlan('Single Session');
    setBookingTime('Weekday evening');
    setBookingConfirmed(false);
  };

  return (
    <section id="trainers" className="relative py-32 bg-[#0D0D0D]">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="tag mb-4">Expert Coaches</div>
            <h2 className="font-bebas text-[clamp(40px,6vw,80px)] leading-none text-white">
              WORLD-CLASS
              <br />
              <span className="gradient-text">TRAINERS</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-xs leading-relaxed">
            Certified, experienced, and dedicated to delivering your best results.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {trainers.map((trainer, i) => (
            <TrainerCard key={trainer.id} trainer={trainer} onSelect={openTrainer} index={i} />
          ))}
        </div>
      </div>

      {/* Trainer Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <div
            className="relative z-10 w-full max-w-2xl bg-[#111111] rounded-2xl border border-white/8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <img src={selected.image} alt={selected.name} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white/70 hover:text-white">
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-bebas text-3xl text-white">{selected.name}</h2>
                  <p className="text-[#D4FF00] text-sm">{selected.specialty}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">{selected.rating} ⭐</div>
                  <div className="text-white/30 text-xs">{selected.reviews} reviews</div>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{selected.bio}</p>
              {showBooking && (
                <div className="mb-5 rounded-2xl border border-[#D4FF00]/20 bg-[#D4FF00]/5 p-4">
                  <h3 className="text-white font-semibold text-sm mb-3">Book Season</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                    {['Single Session', '4 Week Season', '12 Week Season'].map((plan) => (
                      <button
                        key={plan}
                        type="button"
                        onClick={() => setBookingPlan(plan)}
                        className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                          bookingPlan === plan ? 'bg-[#D4FF00] text-black' : 'bg-white/5 text-white/60 hover:text-white'
                        }`}
                      >
                        {plan}
                      </button>
                    ))}
                  </div>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="mb-3 w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-sm text-white focus:border-[#D4FF00] focus:outline-none"
                  >
                    <option>Weekday evening</option>
                    <option>Weekend morning</option>
                    <option>Online consultation</option>
                  </select>
                  {bookingConfirmed && (
                    <div className="rounded-xl bg-[#D4FF00]/10 px-4 py-3 text-sm text-[#D4FF00]">
                      Booking request saved for {selected.name}: {bookingPlan}, {bookingTime}.
                    </div>
                  )}
                </div>
              )}
              {selected.transformationResults && (
                <div className="mb-5">
                  <h3 className="text-white font-semibold text-sm mb-3">Achievements</h3>
                  <ul className="space-y-2">
                    {selected.transformationResults.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-[#D4FF00] mt-1">✓</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-white/3 rounded-xl p-3 text-center">
                  <Award className="w-4 h-4 text-[#D4FF00] mx-auto mb-1" />
                  <div className="text-white font-semibold text-sm">{selected.experience}</div>
                  <div className="text-white/30 text-xs">Experience</div>
                </div>
                <div className="bg-white/3 rounded-xl p-3 text-center">
                  <Users className="w-4 h-4 text-[#D4FF00] mx-auto mb-1" />
                  <div className="text-white font-semibold text-sm">{selected.clients}</div>
                  <div className="text-white/30 text-xs">Clients</div>
                </div>
                <div className="bg-white/3 rounded-xl p-3 text-center">
                  <Award className="w-4 h-4 text-[#D4FF00] mx-auto mb-1" />
                  <div className="text-white font-semibold text-sm">{selected.certifications.length}</div>
                  <div className="text-white/30 text-xs">Certifications</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!showBooking) {
                    setShowBooking(true);
                    return;
                  }
                  setBookingConfirmed(true);
                }}
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 font-bold text-base"
              >
                <Calendar className="w-4 h-4" />
                {showBooking ? 'Confirm Booking' : 'Book a Session'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function TrainerCard({ trainer, onSelect, index }: { trainer: typeof trainers[0]; onSelect: (t: typeof trainers[0], booking?: boolean) => void; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-400"
      style={{
        transform: hovered ? 'translateY(-8px)' : 'none',
        boxShadow: hovered ? '0 30px 80px rgba(0,0,0,0.4), 0 0 40px rgba(212,255,0,0.08)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(trainer)}
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />

        {/* Social links */}
        <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          {Object.entries(trainer.social).map(([platform]) => (
            <div key={platform} className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-[#D4FF00] group/icon transition-colors">
              {platform === 'instagram' && <Link className="w-3.5 h-3.5 text-white group-hover/icon:text-black" />}
              {platform === 'twitter' && <Share2 className="w-3.5 h-3.5 text-white group-hover/icon:text-black" />}
              {platform === 'youtube' && <Share2 className="w-3.5 h-3.5 text-white group-hover/icon:text-black" />}
            </div>
          ))}
        </div>

        {/* Rating */}
        <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-bold text-[#D4FF00]">
          ⭐ {trainer.rating}
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#111111] border border-white/5 p-5 border-t-0 rounded-b-2xl">
        <h3 className="font-barlow font-bold text-white text-xl">{trainer.name}</h3>
        <p className="text-[#D4FF00] text-xs font-semibold mb-2">{trainer.specialty}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {trainer.tags.map((t) => (
            <span key={t} className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded">{t}</span>
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(trainer, true);
          }}
          className="w-full py-3.5 rounded-xl font-bold text-base glass text-white/60 hover:text-[#D4FF00] hover:border-[#D4FF00]/20 transition-all flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Book Session
        </button>
      </div>
    </div>
  );
}
