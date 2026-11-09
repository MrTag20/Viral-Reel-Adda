"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPageClient() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalOriginal,
    totalSavings,
    totalItems,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center text-4xl mb-6 shadow-inner">
          🛒
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base leading-relaxed mb-8">
          You haven&apos;t added any video bundles to your cart yet. Check out our 9 viral niche bundles — all just ₹149 each today!
        </p>
        <Link
          href="/#bundles"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
        >
          <span>Explore All 9 Bundles @ ₹149</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review your {totalItems} bundle{totalItems > 1 ? "s" : ""} and unlocked bonus courses.
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors self-start sm:self-auto"
          >
            Clear All Items
          </button>
        </div>

        {/* Free Courses Unlock Notification */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-amber-800">
                Bonus Reward Unlocked With Your Order!
              </p>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                2 Free Growth Mastery Courses (YouTube + Instagram)
              </h3>
              <p className="text-xs text-slate-600">
                Total Value: ₹1,998 — will be delivered directly with your Google Drive download link.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 font-black text-xs border border-green-200 shrink-0">
            100% FREE
          </span>
        </div>

        {/* 2-Column Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
              >
                {/* Visual Thumbnail */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.product.gradient} shrink-0 flex flex-col items-center justify-center text-white p-2`}
                  >
                    <span className="text-2xl">{item.product.icon}</span>
                    <span className="text-[10px] font-mono font-bold mt-1 opacity-90">
                      {item.product.videoCount}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {item.product.category}
                    </span>
                    <Link href={`/bundle/${item.product.slug}`}>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mt-1 hover:text-blue-600 transition-colors line-clamp-1">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-400 mt-0.5">
                      1080p Full HD • No Watermarks • Instant Drive Link
                    </p>
                  </div>
                </div>

                {/* Price, Quantity & Delete */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-slate-900">
                        ₹{item.product.price * item.quantity}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{item.product.originalPrice * item.quantity}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                      70% OFF
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-l-xl font-bold text-sm"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-r-xl font-bold text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link
                href="/#bundles"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                <span>← Continue Shopping & Add More Bundles</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs sticky top-24 space-y-5">
              <h2 className="text-lg font-extrabold text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h2>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Selected Bundles ({totalItems})</span>
                  <span>₹{totalOriginal}</span>
                </div>

                <div className="flex justify-between text-green-700 font-semibold">
                  <span>70% Bundle Discount</span>
                  <span>- ₹{totalSavings}</span>
                </div>

                <div className="flex justify-between text-slate-600 font-medium">
                  <span>2 Growth Mastery Courses</span>
                  <span className="text-green-700 font-bold">FREE (₹1,998)</span>
                </div>

                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Google Drive Cloud Delivery</span>
                  <span className="text-green-700 font-bold">FREE</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-slate-900">Total to Pay</span>
                  <span className="text-2xl font-black text-blue-600">₹{subtotal}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-extrabold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/25"
                >
                  <span>Proceed to Checkout (₹{subtotal})</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

                <p className="text-[11px] text-center text-slate-500">
                  ⚡ 100% Secure • Dynamic UPI QR • Instant WhatsApp Link
                </p>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Lifetime Google Drive Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Commercial Monetization Rights</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Direct Customer Support on WhatsApp</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

