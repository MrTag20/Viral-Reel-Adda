import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black">
                ▶
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Viral Reel <span className="text-blue-400">Adda</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              India&apos;s #1 creator hub for premium, watermark-free vertical video bundles. Create more, upload consistently, and grow faster across Instagram and YouTube Shorts.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-blue-400 font-semibold">
                ⚡ Instant WhatsApp Delivery
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 font-semibold">
                🔒 Safe UPI Payment
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#bundles" className="hover:text-white transition-colors">
                  All 9 Video Bundles
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition-colors">
                  Browse Categories
                </a>
              </li>
              <li>
                <a href="#bonuses" className="hover:text-white transition-colors">
                  Free Growth Courses
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Top Bundles */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Popular Niches
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>AI Health Tips Reels</li>
              <li>Anime 4K Edits Bundle</li>
              <li>AI Hulk & Stories</li>
              <li>Stickman Animation 2D</li>
              <li>5000+ Gym Motivation</li>
              <li>Space & Relaxing Nature</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Viral Reel Adda. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Made for Creators & Influencers</span>
            <span>•</span>
            <span className="text-blue-400 font-semibold">Create. Upload. Go Viral.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
