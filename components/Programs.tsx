'use client';

import { useState } from 'react';
import { Clock, Flame, ArrowRight, TrendingUp, Target, Home, Dumbbell, Zap, X, CheckCircle2, PlayCircle } from 'lucide-react';

const programs = [
  {
    id: 1,
    category: 'Bulking',
    title: 'Mass Monster Program',
    subtitle: 'Build serious size and strength',
    image: 'https://images.pexels.com/photos/1431283/pexels-photo-1431283.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Advanced',
    difficultyClass: 'badge-advanced',
    duration: '12 Weeks',
    calories: '3200–4000',
    sessions: '5x / Week',
    icon: Dumbbell,
    color: '#D4FF00',
    tags: ['Hypertrophy', 'Strength', 'Mass'],
  },
  {
    id: 2,
    category: 'Strength',
    title: 'PowerLift Elite',
    subtitle: 'Maximize your 1RM across all lifts',
    image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Advanced',
    difficultyClass: 'badge-advanced',
    duration: '16 Weeks',
    calories: '2800–3500',
    sessions: '4x / Week',
    icon: TrendingUp,
    color: '#0099FF',
    tags: ['Powerlifting', 'Olympic', 'Strength'],
  },
  {
    id: 3,
    category: 'Fat Loss',
    title: 'Shred Protocol',
    subtitle: 'Drop fat fast while keeping lean muscle',
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Intermediate',
    difficultyClass: 'badge-intermediate',
    duration: '8 Weeks',
    calories: '1700–2300',
    sessions: '5x / Week',
    icon: Flame,
    color: '#FF7A00',
    tags: ['Cutting', 'HIIT', 'Nutrition'],
  },
  {
    id: 4,
    category: 'Aesthetic',
    title: 'Greek God Physique',
    subtitle: 'Proportional, defined, elite aesthetic',
    image: 'https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Intermediate',
    difficultyClass: 'badge-intermediate',
    duration: '10 Weeks',
    calories: '2600–3200',
    sessions: '5x / Week',
    icon: Target,
    color: '#D4FF00',
    tags: ['Aesthetic', 'Proportion', 'Definition'],
  },
  {
    id: 5,
    category: 'Home',
    title: 'No Gym Required',
    subtitle: 'Full-body transformation at home',
    image: 'https://images.pexels.com/photos/4498294/pexels-photo-4498294.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Beginner',
    difficultyClass: 'badge-beginner',
    duration: '6 Weeks',
    calories: '1800–2400',
    sessions: '4x / Week',
    icon: Home,
    color: '#22c55e',
    tags: ['Bodyweight', 'Calisthenics', 'Functional'],
  },
  {
    id: 6,
    category: 'HIIT',
    title: 'Metabolic Ignition',
    subtitle: 'High-intensity intervals for peak conditioning',
    image: 'https://images.pexels.com/photos/4162438/pexels-photo-4162438.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'Advanced',
    difficultyClass: 'badge-advanced',
    duration: '6 Weeks',
    calories: '2500–3000',
    sessions: '5x / Week',
    icon: Zap,
    color: '#FF3D3D',
    tags: ['Cardio', 'Conditioning', 'Fat Burn'],
  },
];

const categories = ['All', 'Bulking', 'Fat Loss', 'Strength', 'Aesthetic', 'Home', 'HIIT'];

type Workout = {
  day: string;
  title: string;
  exercises: {
    name: string;
    videoUrl: string;
  }[];
};

const defaultWorkouts: Workout[] = [
  {
    day: 'Day 1',
    title: 'Strength Foundation',
    exercises: [
      { name: 'Back Squat - 4 x 6', videoUrl: 'https://www.youtube.com/embed/gRVjAtPip0Y' },
      { name: 'Bench Press - 4 x 8', videoUrl: 'https://www.youtube.com/embed/2yjwXTZQDDI' },
      { name: 'Barbell Row - 3 x 10', videoUrl: 'https://www.youtube.com/embed/G8l_8chR5BE' },
      { name: 'Plank - 3 x 45 sec', videoUrl: 'https://www.youtube.com/embed/ASdvN_XEl_c' },
    ],
  },
  {
    day: 'Day 2',
    title: 'Volume Builder',
    exercises: [
      { name: 'Deadlift - 4 x 5', videoUrl: 'https://www.youtube.com/embed/Op9BvO3g7TM' },
      { name: 'Incline Dumbbell Press - 3 x 10', videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8' },
      { name: 'Lat Pulldown - 4 x 12', videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc' },
      { name: 'Leg Raise - 3 x 12', videoUrl: 'https://www.youtube.com/embed/l4kQd9eWclE' },
    ],
  },
  {
    day: 'Day 3',
    title: 'Conditioning',
    exercises: [
      { name: 'Bike Sprint - 8 rounds', videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI' },
      { name: 'Kettlebell Swing - 4 x 15', videoUrl: 'https://www.youtube.com/embed/uH4r4PmXQzk' },
      { name: 'Push-up - 3 x max', videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4' },
      { name: 'Mobility Flow - 10 min', videoUrl: 'https://www.youtube.com/embed/qX9FSZJ4Ks0' },
    ],
  },
  {
    day: 'Day 4',
    title: 'Lower Body Power',
    exercises: [
      { name: 'Front Squat - 4 x 6', videoUrl: 'https://www.youtube.com/embed/cxhJ2cz5aJ8' },
      { name: 'Romanian Deadlift - 4 x 8', videoUrl: 'https://www.youtube.com/embed/3S7sgQX5cXU' },
      { name: 'Walking Lunge - 3 x 12 each', videoUrl: 'https://www.youtube.com/embed/D7KaRcUTQeE' },
      { name: 'Standing Calf Raise - 4 x 15', videoUrl: 'https://www.youtube.com/embed/YKuP4f0n1xE' },
    ],
  },
  {
    day: 'Day 5',
    title: 'Upper Body Hypertrophy',
    exercises: [
      { name: 'Overhead Press - 4 x 8', videoUrl: 'https://www.youtube.com/embed/2yjwXTZQDDI' },
      { name: 'Pull-up - 4 x max', videoUrl: 'https://www.youtube.com/embed/eGo4IYlbE5g' },
      { name: 'Cable Row - 3 x 12', videoUrl: 'https://www.youtube.com/embed/n1awrLxGcLk' },
      { name: 'Lateral Raise - 3 x 15', videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo' },
    ],
  },
  {
    day: 'Day 6',
    title: 'Full Body Circuit',
    exercises: [
      { name: 'Goblet Squat - 4 x 12', videoUrl: 'https://www.youtube.com/embed/tL6ge1q4j5k' },
      { name: 'Dumbbell Press - 4 x 10', videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8' },
      { name: 'Battle Rope - 6 rounds', videoUrl: 'https://www.youtube.com/embed/ultWZbUMPL8' },
      { name: 'Farmer Carry - 4 x 30 m', videoUrl: 'https://www.youtube.com/embed/pYcpY20QaE8' },
    ],
  },
  {
    day: 'Day 7',
    title: 'Recovery and Mobility',
    exercises: [
      { name: 'Light Cardio - 20 min', videoUrl: 'https://www.youtube.com/embed/T5N0wzJZ6zE' },
      { name: 'Hip Mobility - 10 min', videoUrl: 'https://www.youtube.com/embed/qX9FSZJ4Ks0' },
      { name: 'Shoulder Mobility - 10 min', videoUrl: 'https://www.youtube.com/embed/7M3W0T5kRqg' },
      { name: 'Stretching - 15 min', videoUrl: 'https://www.youtube.com/embed/9fWH9Z5zJbY' },
    ],
  },
];

const massMonsterWorkouts: Workout[] = [
  ...defaultWorkouts.slice(0, 6),
  {
    day: 'Day 7',
    title: 'Mass Building Day',
    exercises: [
      { name: 'Incline Barbell Press - 5 x 8', videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8' },
      { name: 'Chest Fly - 4 x 12', videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo' },
      { name: 'Dip - 4 x 10', videoUrl: 'https://www.youtube.com/embed/2z8JmcrW-As' },
      { name: 'Push-up Finisher - 3 x max', videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4' },
    ],
  },
];

const powerLiftWorkouts: Workout[] = [
  ...defaultWorkouts.slice(0, 5),
  {
    day: 'Day 6',
    title: 'Squat Focus',
    exercises: [
      { name: 'Back Squat - 5 x 5', videoUrl: 'https://www.youtube.com/embed/gRVjAtPip0Y' },
      { name: 'Leg Press - 4 x 10', videoUrl: 'https://www.youtube.com/embed/IZxyjW7MPJQ' },
      { name: 'Bulgarian Split Squat - 3 x 12 each', videoUrl: 'https://www.youtube.com/embed/D7KaRcUTQeE' },
      { name: 'Leg Extension - 4 x 15', videoUrl: 'https://www.youtube.com/embed/YKuP4f0n1xE' },
    ],
  },
  {
    day: 'Day 7',
    title: 'Bench Press Focus',
    exercises: [
      { name: 'Bench Press - 5 x 5', videoUrl: 'https://www.youtube.com/embed/2yjwXTZQDDI' },
      { name: 'Incline Dumbbell Press - 4 x 8', videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8' },
      { name: 'Chest Fly - 3 x 12', videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo' },
      { name: 'Tricep Pushdown - 4 x 15', videoUrl: 'https://www.youtube.com/embed/2-LAMcpzODU' },
    ],
  },
];

const programWorkouts: Record<number, Workout[]> = {
  1: massMonsterWorkouts, // Mass Monster Program
  2: powerLiftWorkouts, // PowerLift Elite
};

export default function Programs() {
  const [active, setActive] = useState('All');
  const [selectedProgram, setSelectedProgram] = useState<null | typeof programs[0]>(null);

  const filtered = active === 'All' ? programs : programs.filter((p) => p.category === active);

  return (
    <section id="programs" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="tag mb-4">Featured Programs</div>
            <h2 className="font-bebas text-[clamp(40px,6vw,80px)] leading-none text-white">
              ELITE TRAINING
              <br />
              <span className="gradient-text">PROGRAMS</span>
            </h2>
          </div>
          <p className="text-white/40 text-base max-w-sm leading-relaxed lg:text-right">
            Science-backed training protocols designed by world-class coaches to deliver measurable results.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === cat
                  ? 'bg-[#D4FF00] text-black shadow-[0_0_20px_rgba(212,255,0,0.4)]'
                  : 'glass text-white/60 hover:text-white hover:border-[#D4FF00]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((program, i) => (
              <ProgramCard
                key={program.id}
                program={program}
                index={i}
                onOpenProgram={setSelectedProgram}
              />
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-8 text-center text-white/60">
            No programs found for this category.
          </div>
        )}

      </div>

      {selectedProgram && (
        <ProgramStartModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
      )}
    </section>
  );
}

function ProgramCard({
  program,
  index,
  onOpenProgram,
}: {
  program: typeof programs[0];
  index: number;
  onOpenProgram: (program: typeof programs[0]) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const handleStartProgram = () => {
    onOpenProgram(program);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        animationDelay: `${index * 100}ms`,
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        boxShadow: hovered ? `0 30px 80px rgba(0,0,0,0.5), 0 0 40px ${program.color}22` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="tag text-[10px]">{program.category}</span>
        </div>
        {/* Difficulty */}
        <div className="absolute top-4 right-4">
          <span className={`badge ${program.difficultyClass}`}>{program.difficulty}</span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#111111] border border-white/5 p-6 rounded-b-2xl border-t-0 group-hover:border-[#D4FF00]/10 transition-colors">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-barlow font-bold text-xl text-white mb-1">{program.title}</h3>
            <p className="text-white/40 text-sm">{program.subtitle}</p>
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ml-3"
            style={{ background: `${program.color}15`, border: `1px solid ${program.color}30` }}
          >
            <program.icon className="w-4 h-4" style={{ color: program.color }} />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {program.tags.map((t) => (
            <span key={t} className="text-[10px] font-semibold text-white/30 bg-white/5 px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center">
            <Clock className="w-3.5 h-3.5 text-white/30 mx-auto mb-1" />
            <div className="text-white text-sm font-semibold">{program.duration}</div>
          </div>
          <div className="text-center border-x border-white/5">
            <Flame className="w-3.5 h-3.5 text-white/30 mx-auto mb-1" />
            <div className="text-white text-sm font-semibold">{program.sessions}</div>
          </div>
          <div className="text-center">
            <Zap className="w-3.5 h-3.5 text-white/30 mx-auto mb-1" />
            <div className="text-white text-sm font-semibold">{program.calories.split('–')[0]}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleStartProgram}
          className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          style={{
            background: hovered ? program.color : 'rgba(255,255,255,0.05)',
            color: hovered ? '#0B0B0B' : 'white',
            boxShadow: hovered ? `0 0 20px ${program.color}40` : 'none',
          }}
        >
          Start Program
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function ProgramStartModal({ program, onClose }: { program: typeof programs[0]; onClose: () => void }) {
  const [selectedExercise, setSelectedExercise] = useState<null | { name: string; videoUrl: string }>(null);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
      <div
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#111111]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/70 transition-colors hover:text-white"
          aria-label="Close program"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[280px]">
            <img src={program.image} alt={program.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="tag mb-3 text-[10px]">{program.category}</span>
              <h3 className="font-bebas text-4xl leading-none text-white">{program.title}</h3>
              <p className="mt-2 text-sm text-white/65">{program.subtitle}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/5 p-3 text-center">
                <Clock className="mx-auto mb-1 h-4 w-4 text-[#D4FF00]" />
                <div className="text-sm font-semibold text-white">{program.duration}</div>
                <div className="text-xs text-white/35">Duration</div>
              </div>
              <div className="rounded-xl bg-white/5 p-3 text-center">
                <Flame className="mx-auto mb-1 h-4 w-4 text-[#D4FF00]" />
                <div className="text-sm font-semibold text-white">{program.sessions}</div>
                <div className="text-xs text-white/35">Training</div>
              </div>
              <div className="rounded-xl bg-white/5 p-3 text-center">
                <Zap className="mx-auto mb-1 h-4 w-4 text-[#D4FF00]" />
                <div className="text-sm font-semibold text-white">{program.difficulty}</div>
                <div className="text-xs text-white/35">Level</div>
              </div>
            </div>

            <div className="mb-5 rounded-2xl border border-[#D4FF00]/20 bg-[#D4FF00]/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#D4FF00]">
                <CheckCircle2 className="h-4 w-4" />
                Pro access unlocked
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                Your Pro plan gives instant access to this program. Start with week 1 and track each session from your dashboard.
              </p>
            </div>

            <h4 className="mb-3 font-semibold text-white">Video Lessons</h4>
            <div className="mb-6 max-h-80 space-y-3 overflow-y-auto pr-1">
              {(programWorkouts[program.id] || defaultWorkouts).map((workout) => (
                <div key={workout.day} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold uppercase text-[#D4FF00]">{workout.day}</div>
                      <div className="font-semibold text-white">{workout.title}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {workout.exercises.map((exercise) => (
                      <button
                        key={exercise.name}
                        type="button"
                        onClick={() => setSelectedExercise(exercise)}
                        className="w-full rounded-xl bg-black/20 px-3 py-2 text-left text-sm text-white/70 hover:bg-[#D4FF00]/10 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <PlayCircle className="h-3 w-3 text-[#D4FF00]" />
                        {exercise.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                window.sessionStorage.setItem('activeProgram', program.title);
                const firstExercise = (programWorkouts[program.id] || defaultWorkouts)[0]?.exercises[0];
                if (firstExercise) setSelectedExercise(firstExercise);
              }}
              className="btn-primary flex w-full items-center justify-center gap-2 py-3.5 font-bold"
            >
              <PlayCircle className="h-5 w-5" />
              Open First Lesson
            </button>
          </div>
        </div>

        {selectedExercise && (
          <ExerciseVideoModal exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
        )}
      </div>
    </div>
  );
}

function ExerciseVideoModal({ exercise, onClose }: { exercise: { name: string; videoUrl: string }; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
      <div
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#111111]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/70 transition-colors hover:text-white"
          aria-label="Close video"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-bebas text-3xl text-white">{exercise.name}</h3>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
            <iframe
              src={`${exercise.videoUrl}?autoplay=1`}
              title={exercise.name}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
