import React from "react";

export default function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-2.5 px-4 text-center text-xs sm:text-sm font-semibold tracking-wide shadow-xs relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-2 sm:gap-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[11px] font-black uppercase tracking-wider animate-pulse">
          ⚡ MEGA DEAL
        </span>
        <span className="font-bold">ALL VIDEO BUNDLES JUST ₹149</span>
        <span className="hidden sm:inline text-blue-200">|</span>
        <span className="bg-white/20 px-2 py-0.5 rounded-md text-[11px] sm:text-xs">
          70% OFF TODAY
        </span>
        <span className="hidden md:inline text-blue-200">|</span>
        <span className="hidden md:inline text-blue-100">
          🎁 2 Free Growth Mastery Courses Included
        </span>
      </div>
    </div>
  );
}

