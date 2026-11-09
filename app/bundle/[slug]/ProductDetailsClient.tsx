"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailsClient({ product, related }: Props) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"included" | "benefits" | "details">("included");
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="bg-slate-50/40">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-xs font-medium text-slate-500 gap-2 overflow-x-auto">
            <Link href="/" className="hover:text-blue-600 shrink-0">
              Home
            </Link>
            <span>/</span>
            <Link href="/#bundles" className="hover:text-blue-600 shrink-0">
              Bundles
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Main Product Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Big Product Preview Visual */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div
              className={`w-full rounded-3xl bg-gradient-to-br ${product.gradient} p-8 sm:p-12 text-white relative shadow-xl shadow-blue-500/10 flex flex-col justify-between aspect-[4/5] overflow-hidden border border-white/20`}
            >
              {/* Radial texture */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:18px_18px] opacity-20 pointer-events-none" />

              {/* Top tags */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-bold tracking-wide">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black tracking-wider shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Center icon showcase */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center py-6">
                <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-5xl mb-4 shadow-lg shadow-black/10">
                  {product.icon}
                </div>
                <span className="text-xs uppercase tracking-widest text-white/80 font-bold">
                  Instant Google Drive Delivery
                </span>
                <p className="text-xl sm:text-2xl font-black text-white mt-1 max-w-xs">
                  {product.videoCount}
                </p>
              </div>

              {/* Bottom bar preview */}
              <div className="relative z-10 bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  100% Watermark Free
                </span>
                <span className="font-mono text-white/90">1080x1920 MP4</span>
              </div>
            </div>

            {/* Quick Guarantees Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center gap-2.5">
                <span className="text-lg">⚡</span>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Instant Delivery</p>
                  <p className="text-slate-500 text-[11px]">Via WhatsApp link</p>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center gap-2.5">
                <span className="text-lg">🔒</span>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Direct UPI</p>
                  <p className="text-slate-500 text-[11px]">Dynamic QR code</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Purchase Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                <span>{product.category}</span>
                <span>•</span>
                <span>{product.videoCount}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                {product.name}
              </h1>

              {/* Pricing Block */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-100 mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500 font-semibold mb-1">
                    Special Creator Discount
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                      ₹{product.price}
                    </span>
                    <span className="text-base sm:text-lg text-slate-400 line-through font-semibold">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-green-700 bg-green-100 px-2 py-0.5 rounded-md border border-green-200">
                      70% OFF
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-lg inline-block">
                    Lifetime Unlimited Access
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">One-time payment. Zero renewal fees.</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                {product.fullDescription}
              </p>

              {/* Free Bonuses Callout Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300/80 mb-6 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎁</span>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
                    Included 100% Free
                  </span>
                  <span className="text-xs font-bold text-slate-500 line-through ml-auto">
                    Worth ₹1,998
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1">
                  2 Exclusive Growth Mastery Courses
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-2 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="text-red-600 font-bold">✔</span>
                    <span>YouTube Shorts Growth Mastery (₹999)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-purple-600 font-bold">✔</span>
                    <span>Instagram Reels Growth Mastery (₹999)</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Add to Cart Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                {/* Quantity */}
                <div className="flex items-center justify-between border border-slate-300 rounded-xl bg-white px-3 py-2 w-full sm:w-36">
                  <span className="text-xs font-bold text-slate-500 uppercase">Qty</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="font-extrabold text-sm text-slate-900 min-w-[16px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-extrabold text-white text-base transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] ${
                    addedAnimation
                      ? "bg-emerald-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <span>✓ Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Cart (₹{product.price * quantity})</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Tabs: What's Included / Benefits */}
              <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="flex border-b border-slate-100 bg-slate-50/60 text-xs sm:text-sm font-bold">
                  <button
                    type="button"
                    onClick={() => setActiveTab("included")}
                    className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
                      activeTab === "included"
                        ? "border-blue-600 text-blue-600 bg-white"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    What&apos;s Included
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("benefits")}
                    className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
                      activeTab === "benefits"
                        ? "border-blue-600 text-blue-600 bg-white"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Creator Benefits
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("details")}
                    className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
                      activeTab === "details"
                        ? "border-blue-600 text-blue-600 bg-white"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Format & Specs
                  </button>
                </div>

                <div className="p-5">
                  {activeTab === "included" && (
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                      {product.whatsIncluded.map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "benefits" && (
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                      {product.benefits.map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs shrink-0">
                            ★
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "details" && (
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
                      <div className="p-2.5 bg-slate-50 rounded-xl">
                        <span className="text-slate-400 block font-semibold">Video Resolution</span>
                        <span className="font-bold text-slate-900">1080 x 1920 (9:16)</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl">
                        <span className="text-slate-400 block font-semibold">File Format</span>
                        <span className="font-bold text-slate-900">Standard MP4 Video</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl">
                        <span className="text-slate-400 block font-semibold">Delivery Method</span>
                        <span className="font-bold text-slate-900">Google Drive Cloud Link</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl">
                        <span className="text-slate-400 block font-semibold">Licensing</span>
                        <span className="font-bold text-slate-900">Commercial & Personal Rights</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Related Bundles Section */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Creators Also Purchased
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Combine bundles to create a high-variety viral content strategy.
                </p>
              </div>

              <Link
                href="/#bundles"
                className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                View All 9 Bundles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <Link
                    href={`/bundle/${rel.slug}`}
                    className={`h-36 rounded-xl bg-gradient-to-br ${rel.gradient} p-4 flex flex-col justify-between text-white mb-4 relative overflow-hidden`}
                  >
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-black/40 self-start">
                      {rel.category}
                    </span>
                    <div className="flex items-end justify-between">
                      <span className="text-2xl">{rel.icon}</span>
                      <span className="text-xs font-mono font-bold bg-white/20 px-2 py-0.5 rounded">
                        {rel.videoCount}
                      </span>
                    </div>
                  </Link>

                  <div>
                    <Link href={`/bundle/${rel.slug}`}>
                      <h4 className="font-bold text-sm text-slate-900 mb-1 hover:text-blue-600 transition-colors line-clamp-1">
                        {rel.name}
                      </h4>
                    </Link>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                      {rel.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-lg font-black text-slate-900">₹{rel.price}</span>
                      <span className="text-xs text-slate-400 line-through ml-1">₹{rel.originalPrice}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(rel)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

