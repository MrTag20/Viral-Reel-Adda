"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getOrderById, Order } from "@/lib/orders";
import { buildWhatsAppMessage, getWhatsAppUrl } from "@/lib/config";

interface Props {
  orderId: string;
}

export default function OrderConfirmationClient({ orderId }: Props) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetched = getOrderById(orderId);
    setOrder(fetched);
    setLoaded(true);
  }, [orderId]);

  if (!loaded) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Loading order details...</p>
      </div>
    );
  }

  // If order is found in localStorage
  const waUrl = order
    ? getWhatsAppUrl(
        buildWhatsAppMessage({
          orderId: order.orderId,
          customerName: order.customer.name,
          whatsappNumber: order.customer.whatsapp,
          items: order.items,
          totalAmount: order.totalAmount,
          utr: order.utr || "Pending",
        })
      )
    : "";

  return (
    <div className="bg-slate-50/50 py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Status Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm text-center space-y-6">
          
          {/* Animated Success Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center text-4xl shadow-inner">
            ✓
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Awaiting Manual Verification
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Order Received Successfully!
            </h1>
            <p className="text-sm font-mono font-bold text-blue-600">
              Reference: {orderId}
            </p>
          </div>

          {/* Primary Verification Callout Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/80 border border-blue-200 text-left space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">ℹ️</span>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                Payment Verification in Progress
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              &quot;Your order has been received. We will verify your payment manually and share your download links through WhatsApp after successful verification.&quot;
            </p>
            <p className="text-[11px] text-slate-500 pt-1 font-medium">
              🔒 Download links will be unlocked once our team confirms your UTR transaction in our bank portal.
            </p>
          </div>

          {/* WhatsApp Direct Confirmation Button */}
          {waUrl && (
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-lg shadow-emerald-600/25 text-center"
              >
                <span>💬 Open WhatsApp to Confirm / Check Status</span>
              </a>
              <p className="text-[11px] text-slate-400 mt-2">
                Click above if your WhatsApp did not open automatically.
              </p>
            </div>
          )}

          {/* Detailed Order Summary */}
          {order && (
            <div className="border-t border-slate-100 pt-6 text-left space-y-5">
              <h3 className="font-extrabold text-base text-slate-900">
                Order Summary
              </h3>

              {/* Customer & Payment Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <div>
                  <span className="text-slate-400 block font-semibold">Customer Name</span>
                  <span className="font-bold text-slate-900">{order.customer.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">WhatsApp Number</span>
                  <span className="font-bold text-slate-900">+91 {order.customer.whatsapp}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Payment Status</span>
                  <span className="font-bold text-amber-700">{order.status}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Submitted UTR / Ref</span>
                  <span className="font-mono font-bold text-slate-900">
                    {order.utr || "Pending"}
                  </span>
                </div>
              </div>

              {/* Purchased Bundles List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Purchased Reel Bundles
                </span>
                <div className="divide-y divide-slate-100 border border-slate-200/70 rounded-2xl overflow-hidden">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-white flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-slate-400 text-[11px]">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-extrabold text-slate-900">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free Bonuses Card */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1.5">
                <span className="font-black text-amber-900 block">
                  🎁 Unlocked Free Growth Courses:
                </span>
                <ul className="text-slate-700 space-y-1 list-disc pl-4 text-[11px]">
                  <li>YouTube Shorts Growth Mastery Course (Worth ₹999) - FREE</li>
                  <li>Instagram Reels Growth Mastery Course (Worth ₹999) - FREE</li>
                </ul>
              </div>

              {/* Total Row */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 text-white">
                <span className="text-sm font-bold">Total Paid via UPI</span>
                <span className="text-xl font-black text-blue-400">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              ← Back to Homepage
            </Link>
            <Link
              href="/#bundles"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
            >
              Browse More Bundles
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

