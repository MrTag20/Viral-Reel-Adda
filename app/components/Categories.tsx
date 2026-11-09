import React from "react";

const CATEGORIES = [
  {
    id: "ai-tech",
    title: "AI & Tech Avatars",
    count: "2,000+ Reels",
    icon: "🤖",
    description: "AI Health Tips, AI Hulk & trending realistic avatar stories.",
    badge: "Most Trending",
    gradient: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-200",
  },
  {
    id: "anime",
    title: "Anime & Manga",
    count: "3,000+ Reels",
    icon: "⚡",
    description: "4K action edits, Demon Slayer, Naruto & shonen viral clips.",
    badge: "Highest Engagement",
    gradient: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-200",
  },
  {
    id: "animation",
    title: "2D & Stickman",
    count: "2,500+ Reels",
    icon: "🎨",
    description: "Viral comedy stickman stories & high-retention 2D animations.",
    badge: "Viral Formula",
    gradient: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-200",
  },
  {
    id: "fitness",
    title: "Gym & Fitness",
    count: "5,000+ Reels",
    icon: "💪",
    description: "Hardcore workout motivation, gym humor & shredded transformations.",
    badge: "Bestseller",
    gradient: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-200",
  },
  {
    id: "nature-space",
    title: "Space & Nature",
    count: "2,000+ Reels",
    icon: "🌌",
    description: "Ultra HD relaxing nature scenery, galaxies & cosmic mysteries.",
    badge: "Evergreen",
    gradient: "from-cyan-500/10 to-blue-500/10",
    border: "border-cyan-200",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-14 sm:py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Explore Niches</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Browse Top Viral Categories
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Hand-curated video bundles for high-growth creators, page owners, and digital agencies.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href="#bundles"
              className={`group relative p-5 sm:p-6 rounded-2xl bg-white border ${cat.border} hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {cat.badge}
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>{cat.count}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

