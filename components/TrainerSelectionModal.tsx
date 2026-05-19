'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Filter, Star, Award, Calendar, Users, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface Trainer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  experience: string;
  clients: string;
  certifications: string[];
  bio: string;
  rating: number;
  reviews: number;
  languages: string[];
  schedule: Record<string, string>;
  availability: boolean;
  social: Record<string, string>;
  pricing: string;
  tags: string[];
  transformationResults: string[];
  isFeatured: boolean;
}

type ApiTrainer = Omit<Trainer, 'schedule' | 'social'> & {
  schedule: Record<string, string> | null;
  social: Record<string, string> | null;
};

const mockTrainers: Trainer[] = [
  {
    id: '1',
    name: 'Б.Амарбат',
    role: 'Powerlifting Coach',
    specialty: 'Powerlifting & Strength',
    image: '/api/trainer-images/amarbat',
    experience: '10+ Years',
    clients: '200+',
    certifications: ['Powerlifting Coach', 'Strength & Conditioning'],
    bio: 'Powerlifting specialist with years of competitive experience. Expert in strength training and powerlifting techniques.',
    rating: 4.9,
    reviews: 150,
    languages: ['Mongolian'],
    schedule: { monday: '9AM-6PM', tuesday: '9AM-6PM', wednesday: '9AM-6PM', thursday: '9AM-6PM', friday: '9AM-6PM', saturday: '10AM-4PM', sunday: 'Closed' },
    availability: true,
    social: { instagram: '#', twitter: '#', youtube: '#' },
    pricing: '199,000 ₮/сар',
    tags: ['Powerlifting', 'Strength', 'Weightlifting'],
    transformationResults: ['National powerlifting champion', 'Helped 100+ clients achieve strength goals'],
    isFeatured: true
  },
  {
    id: '2',
    name: 'Б.Уянга',
    role: 'Fitness & Beauty Coach',
    specialty: 'Fitness & Beauty',
    image: '/api/trainer-images/uyanga',
    experience: '5+ Years',
    clients: '150+',
    certifications: ['Fitness Trainer', 'Beauty & Wellness', 'IFBB Pro'],
    bio: 'Fitness and beauty specialist focused on holistic wellness and body transformation.',
    rating: 5.0,
    reviews: 120,
    languages: ['Mongolian', 'English'],
    schedule: { monday: '10AM-7PM', tuesday: '10AM-7PM', wednesday: '10AM-7PM', thursday: '10AM-7PM', friday: '10AM-7PM', saturday: 'Closed', sunday: 'Closed' },
    availability: true,
    social: { instagram: '#', twitter: '#', youtube: '#' },
    pricing: '149,000 ₮/сар',
    tags: ['Fitness', 'Beauty', 'Wellness'],
    transformationResults: [
      '2021: Монголын мистер УАШТ - Бикини ангилал: Алт',
      '2022: Монголын мистер УАШТ - Үнэмлэхүй аварга',
      '2023: Mister Olympia AGP Overall: Pro Card авсан',
      '2024: Монголын бодибилдингийн түүхэнд анх Mr. Olympia-д оролцох эрх авсан',
      '2025: Huanji China Pro - Бикини ангилал 1-р байр',
    ],
    isFeatured: true
  },
  {
    id: '3',
    name: 'Н.Болор-Эрдэнэ',
    role: 'Fat Loss Specialist',
    specialty: 'Fat Loss & Nutrition',
    image: '/api/trainer-images/bolor-erdene',
    experience: '6 Years',
    clients: '180+',
    certifications: ['Fat Loss Specialist', 'Nutrition Coach'],
    bio: 'Certified fat loss and nutrition specialist. Expert in metabolic conditioning and sustainable weight management.',
    rating: 4.8,
    reviews: 95,
    languages: ['Mongolian'],
    schedule: { monday: '8AM-5PM', tuesday: '8AM-5PM', wednesday: '8AM-5PM', thursday: '8AM-5PM', friday: '8AM-5PM', saturday: '9AM-2PM', sunday: 'Closed' },
    availability: true,
    social: { instagram: '#', twitter: '#', youtube: '#' },
    pricing: '179,000 ₮/сар',
    tags: ['Fat Loss', 'Nutrition', 'HIIT'],
    transformationResults: ['Helped 50+ clients achieve weight loss goals', 'Specialist in metabolic conditioning'],
    isFeatured: true
  },
  {
    id: '4',
    name: 'Т.Очирэрдэнэ',
    role: 'Boxing Coach',
    specialty: 'Boxing & Combat Sports',
    image: '/api/trainer-images/ochirerdene',
    experience: '8 Years',
    clients: '120+',
    certifications: ['Boxing Coach', 'Combat Sports'],
    bio: 'Professional boxing coach with competitive experience. Specializes in boxing techniques and combat conditioning.',
    rating: 4.9,
    reviews: 80,
    languages: ['Mongolian'],
    schedule: { monday: '6AM-8PM', tuesday: '6AM-8PM', wednesday: '6AM-8PM', thursday: '6AM-8PM', friday: '6AM-8PM', saturday: '8AM-4PM', sunday: '8AM-12PM' },
    availability: true,
    social: { instagram: '#', twitter: '#', youtube: '#' },
    pricing: '249,000 ₮/сар',
    tags: ['Boxing', 'Combat', 'Strength'],
    transformationResults: ['Competitive boxing experience', 'Helped 30+ clients improve boxing skills'],
    isFeatured: true
  },
];

interface TrainerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrainer: (trainer: Trainer) => void;
}

export default function TrainerSelectionModal({ isOpen, onClose, onSelectTrainer }: TrainerSelectionModalProps) {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const categories = ['All', 'Strength', 'Fat Loss', 'Bodybuilding', 'CrossFit', 'Yoga'];

  const filteredTrainers = mockTrainers
    .filter(trainer => {
      const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           trainer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || trainer.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
      const matchesAvailability = !showAvailableOnly || trainer.availability;
      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
      return 0;
    });

  const handleSelectTrainer = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    onSelectTrainer(trainer);
    onClose();
  };

  const handleViewDetails = (trainer: Trainer) => {
    setExpandedCard(expandedCard === trainer.id ? null : trainer.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-[#0B0B0B] border border-[#D4FF00]/20 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-bebas text-3xl text-white mb-1">Choose Your Trainer</h2>
                  <p className="text-white/50 text-sm">Select a personal trainer to guide your fitness journey</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Search trainers by name, specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#111111] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#D4FF00]/50 transition-colors"
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4FF00]/50 transition-colors cursor-pointer"
                  >
                    <option value="rating">Top Rated</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="experience">Most Experience</option>
                  </select>

                  <button
                    onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${showAvailableOnly ? 'bg-[#D4FF00] text-black' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                  >
                    Available Now
                  </button>
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === category ? 'bg-[#D4FF00] text-black' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Trainer Grid */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrainers.map((trainer, index) => (
                  <motion.div
                    key={trainer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative group ${expandedCard === trainer.id ? 'lg:col-span-2' : ''}`}
                  >
                    <div className={`relative bg-gradient-to-br from-[#111111] to-[#0A0A0A] border rounded-2xl overflow-hidden transition-all duration-300 ${expandedCard === trainer.id ? 'border-[#D4FF00]/50 shadow-[0_0_30px_rgba(212,255,0,0.2)]' : 'border-white/10 group-hover:border-[#D4FF00]/30 group-hover:shadow-[0_0_20px_rgba(212,255,0,0.1)]'}`}>
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D4FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Featured Badge */}
                      {trainer.isFeatured && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="bg-[#D4FF00] text-black text-xs font-bold px-3 py-1 rounded-full">
                            Featured
                          </div>
                        </div>
                      )}

                      {/* Trainer Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={trainer.image}
                          alt={trainer.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
                        
                        {/* Rating Overlay */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-[#D4FF00] fill-[#D4FF00]" />
                          <span className="text-white text-sm font-semibold">{trainer.rating}</span>
                          <span className="text-white/50 text-xs">({trainer.reviews})</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 relative">
                        <h3 className="font-bebas text-xl text-white mb-1">{trainer.name}</h3>
                        <p className="text-[#D4FF00] text-sm mb-2">{trainer.role}</p>
                        <p className="text-white/60 text-sm mb-3">{trainer.specialty}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {trainer.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-white/5 text-white/50 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-[#D4FF00]" />
                            <div>
                              <p className="text-white/40 text-xs">Experience</p>
                              <p className="text-white text-sm font-semibold">{trainer.experience}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#D4FF00]" />
                            <div>
                              <p className="text-white/40 text-xs">Clients</p>
                              <p className="text-white text-sm font-semibold">{trainer.clients}</p>
                            </div>
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-white/40 text-xs">Starting at</p>
                            <p className="text-white text-lg font-bold">{trainer.pricing}</p>
                          </div>
                          {trainer.availability && (
                            <div className="flex items-center gap-1 text-green-400 text-sm">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              Available
                            </div>
                          )}
                        </div>

                        {/* Expanded Details */}
                        <AnimatePresence>
                          {expandedCard === trainer.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="border-t border-white/10 pt-4 mt-4 space-y-4"
                            >
                              <div>
                                <p className="text-white/60 text-sm mb-2">{trainer.bio}</p>
                              </div>

                              <div>
                                <p className="text-white font-semibold text-sm mb-2">Languages</p>
                                <div className="flex flex-wrap gap-2">
                                  {trainer.languages.map((lang) => (
                                    <span key={lang} className="px-2 py-1 bg-[#D4FF00]/10 text-[#D4FF00] text-xs rounded-full">
                                      {lang}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <p className="text-white font-semibold text-sm mb-2">Certifications</p>
                                <div className="space-y-1">
                                  {trainer.certifications.map((cert) => (
                                    <p key={cert} className="text-white/60 text-xs">• {cert}</p>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <p className="text-white font-semibold text-sm mb-2">Schedule</p>
                                <div className="grid grid-cols-2 gap-1 text-xs">
                                  {Object.entries(trainer.schedule).map(([day, time]) => (
                                    <div key={day} className="flex justify-between text-white/60">
                                      <span className="capitalize">{day}</span>
                                      <span>{time}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <p className="text-white font-semibold text-sm mb-2">Client Results</p>
                                <div className="space-y-1">
                                  {trainer.transformationResults.map((result) => (
                                    <p key={result} className="text-white/60 text-xs">✓ {result}</p>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Actions */}
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => handleSelectTrainer(trainer)}
                            className="flex-1 bg-[#D4FF00] text-black font-bold py-3 rounded-xl hover:bg-[#D4FF00]/90 transition-colors flex items-center justify-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            Select
                          </button>
                          <button
                            onClick={() => handleViewDetails(trainer)}
                            className="px-4 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
                          >
                            {expandedCard === trainer.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredTrainers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-white/50 text-lg">No trainers found matching your criteria</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setShowAvailableOnly(false); }}
                    className="mt-4 text-[#D4FF00] hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
