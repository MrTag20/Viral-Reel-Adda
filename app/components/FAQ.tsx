"use client";

import React, { useState } from "react";

const FAQS = [
  {
    q: "Are these videos watermark-free and copyright safe?",
    a: "Yes, 100%! All reels in each bundle come completely free of watermarks, logos, or third-party usernames. You can freely edit them, add your own logo/handle, or post them directly as your own original content.",
  },
  {
    q: "How will I receive the video files?",
    a: "Immediately after confirming your order and payment, you will receive high-speed Google Drive download links directly on WhatsApp. You can download individual files or entire folders to your phone or computer anytime.",
  },
  {
    q: "Is the ₹149 price a one-time payment or monthly subscription?",
    a: "It is a 100% one-time payment! There are NO recurring fees or hidden charges. Once you buy a bundle for ₹149, you get permanent lifetime access to all files and updates.",
  },
  {
    q: "How do I get the 2 Free Growth Mastery Courses?",
    a: "Both the YouTube Growth Mastery Course and Instagram Growth Mastery Course (Worth ₹1,998) are automatically bundled together with your download link at zero extra charge.",
  },
  {
    q: "What payment methods are supported?",
    a: "We support direct UPI payments via dynamic QR code. You can use any UPI app including Google Pay, PhonePe, Paytm, BHIM, or any mobile banking app.",
  },
  {
    q: "Can I monetize these reels on Instagram and YouTube?",
    a: "Yes! High-engagement vertical video content is ideal for building a dedicated audience, qualifying for YouTube Shorts monetization, securing paid brand collaborations, and running affiliate marketing campaigns.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Everything you need to know about our viral reel bundles and instant delivery.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`text-xl transition-transform duration-200 text-blue-600 ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

