import foods from '@/data/labrador_foods.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return foods.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const foodItem = foods.find((item) => item.slug === resolvedParams.slug);

  if (!foodItem) {
    return {
      title: "Food Not Found | Labrador Diet Guide",
    };
  }

  return {
    title: `Can Labradors Eat ${foodItem.food}? ${foodItem.isSafe ? 'Safe Food Guide' : 'Warning & Risks'}`,
    description: foodItem.shortAnswer,
    openGraph: {
      title: `Can Labradors Eat ${foodItem.food}?`,
      description: foodItem.shortAnswer,
    },
  };
}

export default async function FoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const foodItem = foods.find((item) => item.slug === resolvedParams.slug);

  if (!foodItem) {
    notFound();
  }

  // Schema markup for Google Rich Snippets / FAQ Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Can Labradors eat ${foodItem.food}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": foodItem.shortAnswer + " " + foodItem.longExplanation
        }
      }
    ]
  };

  const affiliateSearchTerm = encodeURIComponent(
    foodItem.isSafe
      ? `healthy dog treats ${foodItem.food}`
      : 'dog pill pockets safe dog treats'
  );

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition"
      >
        &larr; Back to Food Database
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
        {/* Banner */}
        <div className={`p-8 sm:p-12 text-center text-white ${foodItem.isSafe ? 'bg-gradient-to-br from-emerald-600 to-teal-700' : 'bg-gradient-to-br from-red-600 to-rose-700'}`}>
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full inline-block mb-4">
            Category: {foodItem.category}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Can Labradors Eat {foodItem.food}?
          </h1>
          <div className="inline-flex items-center justify-center bg-white text-slate-900 font-black text-2xl sm:text-3xl px-8 py-3 rounded-full shadow-lg">
            {foodItem.isSafe ? 'YES - SAFE' : 'NO - TOXIC'}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-12 space-y-10">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              The Short Answer
            </h2>
            <p className="text-2xl font-bold text-slate-900 leading-snug">
              {foodItem.shortAnswer}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              Veterinary & Nutritional Breakdown
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed">
              {foodItem.longExplanation}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              Recommended Serving Size
            </h2>
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-5 rounded-r-2xl">
              <p className="text-indigo-950 font-medium">
                {foodItem.servingSize}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                Risks & Precautions
              </h3>
              <ul className="space-y-3">
                {foodItem.risks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="text-red-500 font-bold">⚠</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                Nutritional Benefits
              </h3>
              {foodItem.benefits.length > 0 ? (
                <ul className="space-y-3">
                  {foodItem.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400 italic">None reported for this item.</p>
              )}
            </div>
          </div>

          {/* Amazon Affiliate Monetization Slot */}
          <div className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/70 rounded-3xl p-8 text-center space-y-4">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Amazon Associate Pick
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              {foodItem.isSafe
                ? `Looking for Safe ${foodItem.food}-Flavored Treats for Your Lab?`
                : 'Need Vet-Approved Safe Treats for Your Labrador?'}
            </h3>
            <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
              Discover top-rated, laboratory-tested treats and dietary supplements on Amazon that keep your Labrador healthy and trim.
            </p>
            <div className="pt-2">
              <a
                href={`https://www.amazon.com/s?k=${affiliateSearchTerm}&tag=pugdietguide-20`}
                target="_blank"
                rel="noopener sponsored"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5"
              >
                Shop On Amazon &rarr;
              </a>
            </div>
            <p className="text-[11px] text-slate-400">
              As an Amazon Associate, we earn from qualifying purchases at zero additional cost to you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
