"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalOriginal,
    totalSavings,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                🛒
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Your Cart
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {totalItems} {totalItems === 1 ? "bundle" : "bundles"} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
              aria-label="Close cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Free Bonus Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200/70 px-4 py-2.5 flex items-center gap-2 text-xs">
            <span className="text-base">🎁</span>
            <div className="text-slate-800 leading-tight">
              <span className="font-bold text-amber-900">2 Free Courses Unlocked! </span>
              <span className="text-slate-600 text-[11px] block sm:inline">
                YouTube & Instagram Growth (Worth ₹1,998)
              </span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center text-3xl">
                  📦
                </div>
                <h3 className="font-bold text-slate-900 text-base">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Looks like you haven&apos;t added any viral reel bundles yet. All bundles are just ₹149 today!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
                >
                  Explore Bundles @ ₹149
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex gap-3 sm:gap-4 items-center"
                >
                  {/* Thumbnail */}
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.product.gradient} shrink-0 flex flex-col items-center justify-center text-white p-1`}
                  >
                    <span className="text-xl">{item.product.icon}</span>
                    <span className="text-[9px] font-mono font-bold mt-0.5 opacity-90">
                      {item.product.videoCount}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate mb-1.5">
                      {item.product.category}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-slate-900">
                        ₹{item.product.price}
                      </span>
                      <span className="text-[11px] text-slate-400 line-through">
                        ₹{item.product.originalPrice}
                      </span>
                      <span className="text-[9px] font-bold text-green-700 bg-green-50 px-1 py-0.2 rounded border border-green-200">
                        70% OFF
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-l-md font-bold text-xs"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-r-md font-bold text-xs"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/70 space-y-3">
              {/* Calculations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Original Total</span>
                  <span className="line-through">₹{totalOriginal}</span>
                </div>
                <div className="flex justify-between text-green-700 font-medium">
                  <span>Instant Bundle Discount</span>
                  <span>- ₹{totalSavings} (70%)</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-base pt-2 border-t border-slate-200">
                  <span>Total Amount to Pay</span>
                  <span className="text-blue-600 text-lg">₹{subtotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
                >
                  <span>View Full Cart Page</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    window.location.href = "/checkout";
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/25"
                >
                  <span>Proceed to Checkout (₹{subtotal})</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold py-1 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                  <span>🔒 Direct UPI QR</span>
                  <span>•</span>
                  <span>Instant Drive Link on WhatsApp</span>
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

