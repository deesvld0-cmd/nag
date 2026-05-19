'use client';

import { useState } from 'react';
import { MapPin, Search, Star, Clock, Navigation, Filter } from 'lucide-react';

const locations = [
  { id: 1, name: 'NANZAD Flagship Gym', type: 'Gym', distance: '0.3 mi', rating: 4.9, hours: 'Open 24/7', address: '123 Fitness Ave, LA', x: 45, y: 38, active: true },
  { id: 2, name: 'Iron Works Training', type: 'Gym', distance: '0.8 mi', rating: 4.7, hours: 'Open until 10PM', address: '456 Power St, LA', x: 62, y: 52, active: false },
  { id: 3, name: 'GNC Supplements', type: 'Supplement Store', distance: '1.2 mi', rating: 4.5, hours: 'Open until 9PM', address: '789 Nutrition Blvd', x: 30, y: 60, active: false },
  { id: 4, name: 'Coach Mike Alves', type: 'Personal Trainer', distance: '0.5 mi', rating: 5.0, hours: 'By Appointment', address: 'LA Fitness Center', x: 58, y: 30, active: false },
  { id: 5, name: 'CrossFit Downtown', type: 'Gym', distance: '1.5 mi', rating: 4.6, hours: 'Open until 8PM', address: '321 Barbell Lane', x: 25, y: 42, active: false },
  { id: 6, name: 'Supplement World', type: 'Supplement Store', distance: '2.0 mi', rating: 4.4, hours: 'Open until 9PM', address: '654 Protein Pkwy', x: 72, y: 65, active: false },
];

const filterTypes = ['All', 'Gym', 'Supplement Store', 'Personal Trainer'];

export default function FitnessMap() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [search, setSearch] = useState('');

  const filtered = locations.filter(
    (l) =>
      (activeFilter === 'All' || l.type === activeFilter) &&
      l.name.toLowerCase().includes(search.toLowerCase())
  );

  const pinColor = (type: string) =>
    type === 'Gym' ? '#D4FF00' : type === 'Supplement Store' ? '#4A9EFF' : '#FF9500';

  return (
    <section id="map" className="relative py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag mb-4 mx-auto inline-flex">
            <MapPin className="w-3 h-3" /> Fitness Map
          </div>
          <h2 className="font-bebas text-[clamp(40px,6vw,80px)] leading-none text-white mb-4">
            FIND FITNESS
            <br />
            <span className="gradient-text">NEAR YOU</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto">Gyms, supplement stores, and elite personal trainers — all in one place.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text" placeholder="Search locations..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#111111] border border-white/8 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#D4FF00]/40"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              {filterTypes.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activeFilter === f ? 'bg-[#D4FF00] text-black' : 'bg-white/5 text-white/50 hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Location list */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {filtered.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    selectedLocation.id === loc.id
                      ? 'bg-[#D4FF00]/10 border border-[#D4FF00]/25'
                      : 'bg-white/3 border border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${pinColor(loc.type)}15` }}
                    >
                      <MapPin className="w-3.5 h-3.5" style={{ color: pinColor(loc.type) }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm truncate">{loc.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px]" style={{ color: pinColor(loc.type) }}>{loc.type}</span>
                        <span className="text-white/25 text-[10px]">{loc.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-3 h-3 fill-[#D4FF00] text-[#D4FF00]" />
                        <span className="text-white/40 text-xs">{loc.rating}</span>
                        <span className="text-white/20 text-xs">&bull;</span>
                        <span className="text-white/25 text-xs">{loc.hours}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-[500px] bg-[#0D1117]" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            {/* Simulated dark map */}
            <div className="absolute inset-0">
              {/* Roads */}
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="0" y1="45" x2="100" y2="45" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                <line x1="0" y1="65" x2="100" y2="65" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                <line x1="35" y1="0" x2="35" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                <line x1="65" y1="0" x2="65" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" />
                {/* Diagonal roads */}
                <line x1="0" y1="0" x2="40" y2="45" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                <line x1="60" y1="45" x2="100" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              </svg>

              {/* Blocks */}
              {[
                { x: 5, y: 5, w: 20, h: 12 }, { x: 40, y: 5, w: 15, h: 12 }, { x: 70, y: 5, w: 25, h: 12 },
                { x: 5, y: 25, w: 15, h: 15 }, { x: 40, y: 25, w: 12, h: 8 }, { x: 70, y: 25, w: 18, h: 8 },
                { x: 5, y: 50, w: 20, h: 12 }, { x: 38, y: 50, w: 20, h: 10 }, { x: 70, y: 50, w: 15, h: 12 },
                { x: 5, y: 70, w: 25, h: 25 }, { x: 40, y: 72, w: 18, h: 20 }, { x: 70, y: 70, w: 25, h: 25 },
              ].map((block, i) => (
                <div
                  key={i}
                  className="absolute rounded-sm"
                  style={{
                    left: `${block.x}%`, top: `${block.y}%`,
                    width: `${block.w}%`, height: `${block.h}%`,
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.03)',
                  }}
                />
              ))}

              {/* Pins */}
              {filtered.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-125"
                    style={{
                      background: selectedLocation.id === loc.id ? pinColor(loc.type) : `${pinColor(loc.type)}30`,
                      border: `2px solid ${pinColor(loc.type)}`,
                      boxShadow: selectedLocation.id === loc.id ? `0 0 20px ${pinColor(loc.type)}60` : 'none',
                    }}
                  >
                    <MapPin className="w-3.5 h-3.5" style={{ color: selectedLocation.id === loc.id ? '#0B0B0B' : pinColor(loc.type) }} />
                  </div>
                </button>
              ))}

              {/* User location */}
              <div className="absolute" style={{ left: '50%', top: '45%', transform: 'translate(-50%,-50%)' }}>
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-30" />
                </div>
              </div>
            </div>

            {/* Selected Location Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="glass-dark rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-white">{selectedLocation.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: pinColor(selectedLocation.type) }}>{selectedLocation.type}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#D4FF00] text-[#D4FF00]" />
                        <span className="text-white/60 text-xs">{selectedLocation.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-white/30" />
                        <span className="text-white/40 text-xs">{selectedLocation.hours}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="w-3 h-3 text-white/30" />
                        <span className="text-white/40 text-xs">{selectedLocation.distance}</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-[#D4FF00] text-black px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(212,255,0,0.4)] transition-all whitespace-nowrap">
                    <Navigation className="w-3 h-3" />
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
