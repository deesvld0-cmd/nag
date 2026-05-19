'use client';

import { useState } from 'react';
import { X, Play, ChevronRight, Search, Dumbbell } from 'lucide-react';

const muscleGroups = ['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core'];

const exercises = [
  {
    id: 1, name: 'Barbell Bench Press', muscle: 'Chest', difficulty: 'Intermediate', equipment: 'Barbell + Bench',
    image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoId: 'rT7DgCr-3pg',
    muscles: ['Pectorals', 'Anterior Deltoid', 'Triceps'],
    steps: ['Lie flat on bench, grip bar slightly wider than shoulders', 'Unrack and lower bar to mid-chest with control', 'Press explosively to full extension', 'Maintain scapular retraction throughout'],
  },
  {
    id: 2, name: 'Pull-Up', muscle: 'Back', difficulty: 'Intermediate', equipment: 'Pull-up Bar',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoId: 'eGo4IYlbE5g',
    muscles: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    steps: ['Hang from bar with overhand grip', 'Retract scapulae and initiate pull', 'Drive elbows to hips as you rise', 'Lower with control to full extension'],
  },
  {
    id: 3, name: 'Overhead Press', muscle: 'Shoulders', difficulty: 'Intermediate', equipment: 'Barbell',
    image: 'https://images.pexels.com/photos/1431283/pexels-photo-1431283.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoId: '2yjwXTZQDDI',
    muscles: ['Anterior Deltoid', 'Lateral Deltoid', 'Trapezius'],
    steps: ['Stand with bar at collarbone height', 'Grip slightly wider than shoulders', 'Press bar overhead to full lockout', 'Lower with control to starting position'],
  },
  {
    id: 4, name: 'Barbell Squat', muscle: 'Legs', difficulty: 'Advanced', equipment: 'Barbell + Rack',
    image: 'https://images.pexels.com/photos/4162438/pexels-photo-4162438.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoId: 'U3HlEF_E9fo',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    steps: ['Position bar on upper traps', 'Take shoulder-width stance', 'Descend until thighs parallel to floor', 'Drive through heels to stand'],
  },
  {
    id: 5, name: 'Deadlift', muscle: 'Back', difficulty: 'Advanced', equipment: 'Barbell',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoId: 'op9kVnSso6Q',
    muscles: ['Erector Spinae', 'Glutes', 'Hamstrings', 'Traps'],
    steps: ['Stand with feet hip-width, bar over mid-foot', 'Hinge at hips, grip just outside legs', 'Brace core, maintain neutral spine', 'Drive hips forward to lockout'],
  },
  {
    id: 6, name: 'Dips', muscle: 'Arms', difficulty: 'Intermediate', equipment: 'Parallel Bars',
    image: 'https://images.pexels.com/photos/3837781/pexels-photo-3837781.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoId: '2z8JmcrW-As',
    muscles: ['Triceps', 'Pectorals', 'Anterior Deltoid'],
    steps: ['Support yourself on parallel bars', 'Lean slightly forward for chest focus', 'Lower until upper arms are parallel', 'Press to full tricep extension'],
  },
  {
    id: 7, name: 'Plank', muscle: 'Core', difficulty: 'Beginner', equipment: 'None',
    image: 'https://images.pexels.com/photos/4498294/pexels-photo-4498294.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoId: 'ASdvN_XEl_c',
    muscles: ['Rectus Abdominis', 'Transverse Abdominis', 'Obliques'],
    steps: ['Position forearms on ground, elbows under shoulders', 'Form straight line from head to heels', 'Engage core and glutes', 'Hold without allowing hips to sag'],
  },
  {
    id: 8, name: 'Leg Press', muscle: 'Legs', difficulty: 'Beginner', equipment: 'Leg Press Machine',
    image: 'https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoId: 'IZxyjW7MPJQ',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    steps: ['Sit in machine, feet shoulder-width on platform', 'Release safety and lower weight controlled', 'Press through heels until legs almost straight', 'Control descent, repeat for reps'],
  },
  {
    id: 9, name: 'Cable Fly', muscle: 'Chest', difficulty: 'Beginner', equipment: 'Cable Machine',
    image: 'https://images.pexels.com/photos/4162585/pexels-photo-4162585.jpeg?auto=compress&cs=tinysrgb&w=600',
    videoId: 'Iwe6AmxVf7o',
    muscles: ['Pectorals', 'Anterior Deltoid'],
    steps: ['Set cables at chest height', 'Stand center, arms extended to sides', 'Arc arms together in front of chest', 'Squeeze pecs at peak contraction'],
  },
];

type Exercise = typeof exercises[0];

export default function ExerciseLibrary() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Exercise | null>(null);

  const filtered = exercises.filter(
    (e) =>
      (category === 'All' || e.muscle === category) &&
      e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="exercises" className="relative py-32 bg-[#0D0D0D]">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag mb-4 mx-auto inline-flex">Exercise Library</div>
          <h2 className="font-bebas text-[clamp(40px,6vw,80px)] leading-none text-white mb-4">
            MASTER EVERY
            <br />
            <span className="gradient-text">MOVEMENT</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto leading-relaxed">
            Step-by-step guides with video demonstrations for every exercise in your program.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111111] border border-white/8 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#D4FF00]/40 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {muscleGroups.map((g) => (
              <button
                key={g}
                onClick={() => setCategory(g)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  category === g
                    ? 'bg-[#D4FF00] text-black'
                    : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((exercise, i) => (
            <ExerciseCard key={exercise.id} exercise={exercise} index={i} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && <ExerciseModal exercise={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function ExerciseCard({ exercise, index, onSelect }: { exercise: Exercise; index: number; onSelect: (e: Exercise) => void }) {
  const [hovered, setHovered] = useState(false);
  const diffClass = exercise.difficulty === 'Beginner' ? 'badge-beginner' : exercise.difficulty === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced';

  return (
    <div
      className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-400"
      style={{
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(212,255,0,0.1)' : 'none',
        animationDelay: `${index * 80}ms`,
        background: '#111111',
        border: hovered ? '1px solid rgba(212,255,0,0.15)' : '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(exercise)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={exercise.image} alt={exercise.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="tag text-[9px]">{exercise.muscle}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`badge ${diffClass}`}>{exercise.difficulty}</span>
        </div>
        {/* Play overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-14 h-14 bg-[#D4FF00] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,255,0,0.5)]">
            <Play className="w-5 h-5 fill-black ml-0.5" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-barlow font-bold text-white text-lg mb-1">{exercise.name}</h3>
        <p className="text-white/35 text-xs mb-3">{exercise.equipment}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {exercise.muscles.slice(0, 2).map((m) => (
            <span key={m} className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded">{m}</span>
          ))}
        </div>
        <button className="w-full py-2.5 glass rounded-lg text-sm font-semibold text-white/70 hover:text-[#D4FF00] hover:border-[#D4FF00]/20 transition-all flex items-center justify-center gap-2">
          View Exercise
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function ExerciseModal({ exercise, onClose }: { exercise: Exercise; onClose: () => void }) {
  const diffClass = exercise.difficulty === 'Beginner' ? 'badge-beginner' : exercise.difficulty === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
      <div
        className="relative z-10 w-full max-w-3xl bg-[#111111] rounded-2xl border border-white/8 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video */}
        <div className="relative aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${exercise.videoId}?autoplay=1&mute=1`}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={exercise.name}
          />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="tag">{exercise.muscle}</span>
                <span className={`badge ${diffClass}`}>{exercise.difficulty}</span>
              </div>
              <h2 className="font-bebas text-3xl text-white">{exercise.name}</h2>
              <p className="text-white/40 text-sm">{exercise.equipment}</p>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <X className="w-4 h-4 text-white/70" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Muscles */}
            <div className="bg-white/3 rounded-xl p-4 border border-white/5">
              <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
                <Dumbbell className="w-3.5 h-3.5 text-[#D4FF00]" /> Muscles Worked
              </h3>
              <div className="flex flex-wrap gap-2">
                {exercise.muscles.map((m) => (
                  <span key={m} className="tag">{m}</span>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="bg-white/3 rounded-xl p-4 border border-white/5">
              <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-[#D4FF00]" /> Execution
              </h3>
              <ol className="space-y-2">
                {exercise.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/60">
                    <span className="font-bebas text-[#D4FF00] text-lg leading-none w-5 flex-shrink-0">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
