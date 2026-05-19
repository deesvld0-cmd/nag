'use client';

import { useState } from 'react';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';

const categories = ['All', 'Training', 'Nutrition', 'Recovery', 'Mindset', 'Science'];

const articles = [
  {
    id: 1, category: 'Training',
    title: 'The Science Behind Progressive Overload: Why Most People Get It Wrong',
    excerpt: 'Progressive overload is the cornerstone of strength training, but applying it correctly requires understanding the underlying mechanisms of muscle adaptation.',
    image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Alex Mercer', readTime: '8 min', date: 'Dec 12, 2024',
    featured: true, tags: ['Strength', 'Hypertrophy', 'Science'],
  },
  {
    id: 2, category: 'Nutrition',
    title: 'Optimal Protein Timing: What the Latest Research Actually Says',
    excerpt: 'The anabolic window debate has evolved dramatically. Here\'s what cutting-edge research reveals about when and how much protein to consume.',
    image: 'https://images.pexels.com/photos/1431283/pexels-photo-1431283.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'David Santos', readTime: '6 min', date: 'Dec 10, 2024',
    featured: false, tags: ['Protein', 'Nutrition', 'Recovery'],
  },
  {
    id: 3, category: 'Recovery',
    title: 'Sleep Optimization for Maximum Muscle Growth: A Complete Guide',
    excerpt: 'Sleep is your most powerful recovery tool. Optimizing it can yield results equivalent to an extra workout session per week.',
    image: 'https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Sarah Williams', readTime: '10 min', date: 'Dec 8, 2024',
    featured: false, tags: ['Sleep', 'Recovery', 'Hormones'],
  },
  {
    id: 4, category: 'Mindset',
    title: 'Building an Unbreakable Training Mindset: Mental Frameworks That Work',
    excerpt: 'Physical transformation starts in the mind. The most successful athletes share specific mental habits that separate them from the pack.',
    image: 'https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Maya Chen', readTime: '5 min', date: 'Dec 6, 2024',
    featured: false, tags: ['Psychology', 'Motivation', 'Habits'],
  },
  {
    id: 5, category: 'Science',
    title: 'Creatine: The Most Researched Supplement in History (Full Analysis)',
    excerpt: 'After 30+ years of research, creatine remains the most evidence-backed performance supplement. Here\'s everything you need to know.',
    image: 'https://images.pexels.com/photos/4162438/pexels-photo-4162438.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'David Santos', readTime: '12 min', date: 'Dec 4, 2024',
    featured: false, tags: ['Supplements', 'Creatine', 'Performance'],
  },
];

export default function Blog() {
  const [category, setCategory] = useState('All');

  const filtered = articles.filter((a) => category === 'All' || a.category === category);
  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  return (
    <section id="blog" className="relative py-32 bg-[#0D0D0D]">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="tag mb-4">Fitness Knowledge</div>
            <h2 className="font-bebas text-[clamp(40px,6vw,80px)] leading-none text-white">
              THE NANZAD
              <br />
              <span className="gradient-text">JOURNAL</span>
            </h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${category === c ? 'bg-[#D4FF00] text-black' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Featured */}
          {featured && (
            <div className="lg:col-span-3 group cursor-pointer">
              <div className="relative h-80 rounded-2xl overflow-hidden mb-5">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="tag">{featured.category}</span>
                  <span className="glass rounded-full px-3 py-1 text-[10px] font-bold text-white/70">Featured</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5 text-white/35 text-xs">
                  <User className="w-3 h-3" /> {featured.author}
                </div>
                <div className="flex items-center gap-1.5 text-white/35 text-xs">
                  <Clock className="w-3 h-3" /> {featured.readTime} read
                </div>
                <div className="text-white/25 text-xs">{featured.date}</div>
              </div>
              <h3 className="font-barlow font-bold text-white text-2xl mb-3 group-hover:text-[#D4FF00] transition-colors leading-snug">{featured.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
              <button className="flex items-center gap-2 text-[#D4FF00] text-sm font-semibold hover:gap-3 transition-all">
                Read Article <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Article list */}
          <div className="lg:col-span-2 space-y-5">
            {rest.slice(0, 4).map((article) => (
              <ArticleRow key={article.id} article={article} />
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <button className="btn-outline flex items-center gap-2 mx-auto">
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ArticleRow({ article }: { article: typeof articles[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex gap-4 group cursor-pointer p-4 rounded-xl transition-all duration-300"
      style={{ background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent', borderLeft: hovered ? '2px solid #D4FF00' : '2px solid transparent' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={article.image} alt="" className="w-20 h-20 object-cover rounded-xl flex-shrink-0 group-hover:opacity-90 transition-opacity" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[9px] font-bold text-[#D4FF00] uppercase tracking-widest">{article.category}</span>
          <span className="text-white/20 text-xs">{article.readTime}</span>
        </div>
        <h4 className="text-white text-sm font-semibold leading-snug group-hover:text-[#D4FF00] transition-colors line-clamp-2">{article.title}</h4>
        <p className="text-white/30 text-xs mt-1">{article.date}</p>
      </div>
    </div>
  );
}
