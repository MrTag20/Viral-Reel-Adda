"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function PopularBundles() {
  const { addToCart } = useCart();

  return (
    <section id="bundles" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <span>9 Trending Bundles Available</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Ready-To-Post Video Bundles
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Instant Google Drive access immediately after order. Fully watermark-free, 1080p HD, and monetization-ready.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50/80 px-4 py-2.5 rounded-xl border border-blue-100 self-start md:self-auto">
            <span className="text-xl">🎁</span>
            <div className="text-xs">
              <span className="font-bold text-slate-900">2 Free Bonus Courses</span>
              <p className="text-slate-500">Auto-unlocked with any bundle purchase</p>
            </div>
          </div>
        </div>

        {/* 9 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRODUCTS.map((bundle: Product) => (
            <div
              key={bundle.id}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Card Banner / Thumbnail */}
              <Link
                href={`/bundle/${bundle.slug}`}
                className={`h-48 bg-gradient-to-br ${bundle.gradient} relative p-5 flex flex-col justify-between overflow-hidden block cursor-pointer`}
              >
                {/* Subtle visual grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:14px_14px] opacity-15" />
                
                {/* Top Tags */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold tracking-wide">
                    {bundle.category}
                  </span>
                  {bundle.badge && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black tracking-wider shadow-xs">
                      {bundle.badge}
                    </span>
                  )}
                </div>

                {/* Center / Bottom Info inside banner */}
                <div className="relative z-10 flex items-end justify-between text-white">
                  <div>
                    <span className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform inline-block">
                      {bundle.icon}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md font-mono text-xs font-bold border border-white/20">
                    {bundle.videoCount}
                  </span>
                </div>
              </Link>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/bundle/${bundle.slug}`}>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                      {bundle.name}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                    {bundle.shortDescription}
                  </p>

                  {/* Feature Checkmarks */}
                  <ul className="space-y-1.5 text-xs text-slate-600 font-medium mb-5">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>1080x1920 Full HD Vertical Format</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>No Watermark & Clean Audio</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>Instant Lifetime Google Drive Link</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>Includes 2 Free Growth Mastery Courses</span>
                    </li>
                  </ul>
                </div>

                {/* Price & Action Buttons */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-slate-900">
                          ₹{bundle.price}
                        </span>
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          ₹{bundle.originalPrice}
                        </span>
                      </div>
                    </div>
                    <span className="inline-block text-[11px] font-extrabold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                      70% OFF
                    </span>
                  </div>

                  {/* Dual Action: Explore Bundle & Add to Cart */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href={`/bundle/${bundle.slug}`}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all text-center"
                    >
                      <span>Explore</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    <button
                      type="button"
                      onClick={() => addToCart(bundle)}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/20 text-center"
                    >
                      <span>Add to Cart</span>
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🛡️</span>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                100% Satisfaction & High Engagement Guarantee
              </h4>
              <p className="text-xs text-slate-600">
                All video bundles are handpicked, curated, and ready for immediate monetization.
              </p>
            </div>
          </div>
          <a
            href="#bundles"
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-blue-700 border border-blue-300 hover:bg-blue-50 shadow-xs transition-colors shrink-0"
          >
            All Bundles @ ₹149 Each
          </a>
        </div>

      </div>
    </section>
  );
}
