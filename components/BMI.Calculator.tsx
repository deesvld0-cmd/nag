'use client';

import { useState } from 'react';
import { Calculator, Flame, Target, Droplets, TrendingUp } from 'lucide-react';

type Unit = 'metric' | 'imperial';
type Goal = 'lose' | 'maintain' | 'gain';

export default function BMICalculator() {
  const [unit, setUnit] = useState<Unit>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [goal, setGoal] = useState<Goal>('maintain');
  const [activity, setActivity] = useState(1.55);
  const [result, setResult] = useState<null | { bmi: number; category: string; bmr: number; tdee: number; protein: number; carbs: number; fat: number; }>(null);

  function calculate() {
    const h = unit === 'imperial' ? height * 2.54 : height;
    const w = unit === 'imperial' ? weight * 0.453592 : weight;
    const bmi = w / ((h / 100) ** 2);

    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal Weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    const bmr = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * age + 5
      : 10 * w + 6.25 * h - 5 * age - 161;

    const tdeeBase = bmr * activity;
    const tdee = goal === 'lose' ? tdeeBase - 500 : goal === 'gain' ? tdeeBase + 300 : tdeeBase;

    const protein = Math.round(w * 2.2);
    const fat = Math.round((tdee * 0.25) / 9);
    const carbs = Math.round((tdee - protein * 4 - fat * 9) / 4);

    setResult({ bmi: Math.round(bmi * 10) / 10, category, bmr: Math.round(bmr), tdee: Math.round(tdee), protein, carbs, fat });
  }

  const bmiColor = result
    ? result.bmi < 18.5 ? '#0099FF'
    : result.bmi < 25 ? '#D4FF00'
    : result.bmi < 30 ? '#FF9500'
    : '#FF3D3D'
    : '#D4FF00';

  const bmiPercent = result ? Math.min((result.bmi / 40) * 100, 100) : 0;

  return (
    <section id="calculator" className="relative py-32 bg-[#0B0B0B]">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4FF00]/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="tag mb-4 mx-auto inline-flex">
            <Calculator className="w-3 h-3" /> Body Analysis
          </div>
          <h2 className="font-bebas text-[clamp(40px,6vw,80px)] leading-none text-white mb-4">
            BMI &amp; CALORIE
            <br />
            <span className="gradient-text">CALCULATOR</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto">Precision metrics to power your transformation journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 glass rounded-2xl p-8">
            {/* Unit Toggle */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-white/40 text-sm">Unit System:</span>
              <div className="flex bg-[#1A1A1A] rounded-lg p-1">
                {(['metric', 'imperial'] as Unit[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-4 py-1.5 rounded-md text-sm font-semibold capitalize transition-all ${
                      unit === u ? 'bg-[#D4FF00] text-black' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label className="text-white/50 text-xs uppercase tracking-widest mb-3 block">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                {(['male', 'female'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`py-3 rounded-xl font-semibold capitalize transition-all ${
                      gender === g
                        ? 'bg-[#D4FF00] text-black'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6 mb-6">
              <SliderField label="Age" value={age} min={16} max={80} unit="years" onChange={setAge} />
              <SliderField label="Height" value={height} min={unit === 'metric' ? 140 : 55} max={unit === 'metric' ? 220 : 87} unit={unit === 'metric' ? 'cm' : 'in'} onChange={setHeight} />
              <SliderField label="Weight" value={weight} min={unit === 'metric' ? 40 : 90} max={unit === 'metric' ? 150 : 330} unit={unit === 'metric' ? 'kg' : 'lbs'} onChange={setWeight} />
            </div>

            {/* Goal */}
            <div className="mb-6">
              <label className="text-white/50 text-xs uppercase tracking-widest mb-3 block">Goal</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'lose', label: 'Lose Fat', icon: '🔥' },
                  { value: 'maintain', label: 'Maintain', icon: '⚖️' },
                  { value: 'gain', label: 'Build Mass', icon: '💪' },
                ].map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGoal(g.value as Goal)}
                    className={`py-2.5 rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-1 ${
                      goal === g.value ? 'bg-[#D4FF00] text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    <span>{g.icon}</span>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="mb-8">
              <label className="text-white/50 text-xs uppercase tracking-widest mb-3 block">Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="w-full bg-[#1A1A1A] border border-white/8 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4FF00]/40"
              >
                <option value={1.2}>Sedentary (little/no exercise)</option>
                <option value={1.375}>Light (1-3 days/week)</option>
                <option value={1.55}>Moderate (3-5 days/week)</option>
                <option value={1.725}>Active (6-7 days/week)</option>
                <option value={1.9}>Very Active (athlete/labor)</option>
              </select>
            </div>

            <button onClick={calculate} className="btn-primary w-full py-4 text-base">
              Calculate My Stats
            </button>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-5">
            {result ? (
              <>
                {/* BMI Card */}
                <div className="glass rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at 50% 50%, ${bmiColor}, transparent 70%)` }} />
                  <div className="text-white/50 text-xs uppercase tracking-widest mb-4">Body Mass Index</div>
                  <div className="flex items-end gap-3 mb-4">
                    <span className="font-bebas text-7xl leading-none" style={{ color: bmiColor }}>{result.bmi}</span>
                    <span className="text-white/50 mb-2 text-sm">{result.category}</span>
                  </div>
                  {/* BMI Bar */}
                  <div className="progress-bar mb-2">
                    <div className="progress-fill" style={{ width: `${bmiPercent}%`, background: bmiColor }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/25">
                    <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
                  </div>
                </div>

                {/* TDEE */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Flame className="w-4 h-4 text-[#D4FF00]" />
                    <span className="text-white/50 text-xs uppercase tracking-widest">Daily Calories</span>
                  </div>
                  <div className="font-bebas text-5xl text-white">{result.tdee} <span className="text-white/30 text-xl">kcal</span></div>
                  <div className="text-white/30 text-xs mt-1">BMR: {result.bmr} kcal base</div>
                </div>

                {/* Macros */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-[#D4FF00]" />
                    <span className="text-white/50 text-xs uppercase tracking-widest">Daily Macros</span>
                  </div>
                  <div className="space-y-3">
                    <MacroBar label="Protein" value={result.protein} unit="g" color="#D4FF00" max={300} />
                    <MacroBar label="Carbs" value={result.carbs} unit="g" color="#0099FF" max={500} />
                    <MacroBar label="Fat" value={result.fat} unit="g" color="#FF9500" max={200} />
                  </div>
                </div>
              </>
            ) : (
              <div className="glass rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-16 h-16 bg-[#D4FF00]/10 rounded-2xl flex items-center justify-center mb-4">
                  <Calculator className="w-7 h-7 text-[#D4FF00]" />
                </div>
                <h3 className="text-white font-semibold mb-2">Your Results</h3>
                <p className="text-white/30 text-sm">Fill in your details and click Calculate to see your personalized stats.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderField({ label, value, min, max, unit, onChange }: {
  label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-white/50 text-xs uppercase tracking-widest">{label}</label>
        <span className="font-bebas text-xl text-[#D4FF00]">{value} <span className="text-white/40 text-sm">{unit}</span></span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  );
}

function MacroBar({ label, value, unit, color, max }: { label: string; value: number; unit: string; color: string; max: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-white/50 text-xs">{label}</span>
        <span className="font-semibold text-sm" style={{ color }}>{value}{unit}</span>
      </div>
      <div className="progress-bar">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((value / max) * 100, 100)}%`, background: color }} />
      </div>
    </div>
  );
}
