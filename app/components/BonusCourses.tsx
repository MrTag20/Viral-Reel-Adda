import React from "react";

export default function BonusCourses() {
  return (
    <section id="bonuses" className="py-16 sm:py-24 bg-gradient-to-b from-blue-50/50 via-ice-blue to-white border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
            <span>🎁 FREE BONUS INCLUDED</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Included With Every Purchase: <br className="hidden sm:inline" />
            <span className="text-blue-600">2 Complete Growth Mastery Courses</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            You don&apos;t just get raw videos — we also teach you how to turn them into viral views, loyal followers, and monthly brand income. Worth ₹1,998, included 100% free!
          </p>
        </div>

        {/* 2 Bonus Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Bonus 1: YouTube Growth Mastery */}
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-red-200/80 shadow-lg shadow-red-500/5 overflow-hidden flex flex-col justify-between">
            <div className="absolute top-4 right-4 bg-red-500/10 text-red-600 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-red-200">
              FREE BONUS #1
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-red-500 text-white flex items-center justify-center text-2xl shadow-md shadow-red-500/30 mb-6">
                ▶️
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-slate-500 line-through">Value: ₹999</span>
                <span className="text-xs font-extrabold text-green-700 bg-green-100 px-2 py-0.5 rounded-md">
                  FREE
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
                YouTube Shorts Growth Mastery Course
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Master the exact 2026 YouTube Shorts algorithm. Learn the retention formula, thumbnail secrets, click hooks, and how to get monetized quickly with Shorts Fund and sponsorships.
              </p>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-red-600 font-bold">✔</span>
                  <span>Viral Hook Blueprint (First 3 seconds retain 85% viewers)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-red-600 font-bold">✔</span>
                  <span>Audio Sync & Trending Sound Selection Secrets</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-red-600 font-bold">✔</span>
                  <span>Shorts SEO & Tagging to hit the Browse Feed fast</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-red-600 font-bold">✔</span>
                  <span>Complete Channel Setup & Brand Sponsorship Pitch Guide</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Format: Step-by-Step Video Guide + PDF</span>
              <span className="text-red-600">Lifetime Access</span>
            </div>
          </div>

          {/* Bonus 2: Instagram Growth Mastery */}
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200/80 shadow-lg shadow-purple-500/5 overflow-hidden flex flex-col justify-between">
            <div className="absolute top-4 right-4 bg-purple-500/10 text-purple-600 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-purple-200">
              FREE BONUS #2
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center text-2xl shadow-md shadow-purple-500/30 mb-6">
                📸
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-slate-500 line-through">Value: ₹999</span>
                <span className="text-xs font-extrabold text-green-700 bg-green-100 px-2 py-0.5 rounded-md">
                  FREE
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
                Instagram Reels Growth Mastery Course
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Explode your Instagram follower count organically from 0 to 100K+. Learn how to beat shadowbans, use trending audios before everyone else, and write captions that drive shares.
              </p>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-purple-600 font-bold">✔</span>
                  <span>The 2026 Instagram Reels Algorithm Decoded</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-purple-600 font-bold">✔</span>
                  <span>How to Identify Trending Audio 48 hours early</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-purple-600 font-bold">✔</span>
                  <span>High-Converting Bio & Profile Optimization Checklist</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-purple-600 font-bold">✔</span>
                  <span>Direct Message Affiliate & Paid Story Monetization Strategy</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Format: Step-by-Step Video Guide + Checklist</span>
              <span className="text-purple-600">Lifetime Access</span>
            </div>
          </div>

        </div>

        {/* Callout Strip */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            ⚡ Both courses are automatically unlocked in your delivery dashboard when you purchase any bundle for <span className="font-bold text-blue-600">₹149</span>.
          </p>
        </div>

      </div>
    </section>
  );
}

