"use client";

import { useState } from 'react';
import Link from 'next/link';
import foods from '@/data/labrador_foods.json';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'safe' | 'toxic'>('all');

  const filteredFoods = foods.filter(item => {
    const matchesSearch = item.food.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'safe') return matchesSearch && item.isSafe;
    if (filter === 'toxic') return matchesSearch && !item.isSafe;
    return matchesSearch;
  });

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
          🐾 Breed-Specific Canine Nutrition
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          The Ultimate <span className="text-indigo-600">Labrador Retriever</span> Diet Guide
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Labradors have a known mutation in the <span className="font-semibold text-slate-800">POMC gene</span> that turns off their natural feeling of fullness. Search our database to see what human foods are safe, which are toxic, and how to fuel your Lab safely.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-4 max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <input
              type="text"
              className="w-full pl-5 pr-12 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg transition"
              placeholder="Search foods (e.g. Carrots, Grapes, Pumpkin, Chicken)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">
              🔍
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${filter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              All Foods ({foods.length})
            </button>
            <button
              onClick={() => setFilter('safe')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${filter === 'safe' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
            >
              ✓ Safe Only ({foods.filter(f => f.isSafe).length})
            </button>
            <button
              onClick={() => setFilter('toxic')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${filter === 'toxic' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
            >
              ⚠ Toxic & Dangerous ({foods.filter(f => !f.isSafe).length})
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Foods */}
      <div>
        {filteredFoods.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-2xl mb-2">🦴</p>
            <h3 className="text-lg font-bold text-slate-800">No foods found</h3>
            <p className="text-sm text-slate-500">We couldn't find any foods matching "{searchQuery}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((item) => (
              <Link href={`/${item.slug}`} key={item.slug} className="group block">
                <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {item.category}
                      </span>
                      {item.isSafe ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          ✓ Safe
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                          ⚠ Dangerous
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition mb-2">
                      {item.food}
                    </h2>
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {item.shortAnswer}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                    <span>Full Vet Nutrition Sheet &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* High-Intent Affiliate Banner (Slow Feeders & Joint Supplements) */}
      <div id="supplements" className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-indigo-300 font-bold uppercase tracking-widest text-xs">
            🐾 Amazon Verified Gear for Labradors
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Stop Bloat & Protect Their Hips
          </h2>
          <p className="text-indigo-200 text-base leading-relaxed">
            Because Labs eat faster than almost any other breed, slow-feeder bowls and veterinary glucosamine joint supplements are critical for preventing life-threatening Bloat (GDV) and Hip Dysplasia.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="https://www.amazon.com/s?k=large+dog+slow+feeder+bowl&tag=pugdietguide-20"
              target="_blank"
              rel="noopener sponsored"
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 text-sm"
            >
              Shop Slow Feeder Bowls &rarr;
            </a>
            <a
              href="https://www.amazon.com/s?k=cani-science+joint+supplement+large+dog+glucosamine&tag=pugdietguide-20"
              target="_blank"
              rel="noopener sponsored"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3.5 rounded-2xl backdrop-blur-sm transition text-sm"
            >
              Shop Joint Supplements &rarr;
            </a>
          </div>
          <p className="text-xs text-indigo-300/60 pt-2">
            As an Amazon Associate, purchases through these links support this free guide at zero extra cost to you.
          </p>
        </div>
      </div>

      {/* Core Labrador Nutrition Guide Section */}
      <div id="nutrition-guide" className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Canine Science</span>
          <h2 className="text-3xl font-black text-slate-900 mt-1 mb-3">Labrador Retriever Nutritional Requirements</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Maintaining a Labrador at a Body Condition Score of 4-5 out of 9 has been proven by clinical studies to extend their lifespan by an average of 1.8 years.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-1">Puppy (8 wks - 15 mo)</h3>
            <p className="text-xs text-indigo-600 font-bold mb-3">Controlled Skeletal Growth</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              22% - 32% protein, 10% - 15% fat. Calcium-to-phosphorus ratio of 1.2:1 to 1.5:1 is essential to prevent developmental orthopedic diseases like elbow dysplasia.
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-1">Adult (1 - 7 yrs)</h3>
            <p className="text-xs text-indigo-600 font-bold mb-3">Calorie Strict Maintenance</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              18% - 26% protein, 10% - 14% fat. Approximately 1,200 to 1,600 kcal/day. Always divide food into 2 meals to decrease risk of gastric dilatation-volvulus.
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-1">Senior (7+ yrs)</h3>
            <p className="text-xs text-indigo-600 font-bold mb-3">Lean Muscle & Joint Protection</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              20% - 26% high-digestibility protein, reduced fat (8% - 12%). Daily additions of Omega-3 EPA/DHA fatty acids and glucosamine for arthritis management.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
