import React from "react";

const STEPS = [
  {
    step: "01",
    title: "Select Your Reel Bundle",
    description: "Browse 9+ viral niches (AI Health, Anime, Gym, Stickman, Space, etc.) and pick your bundle at just ₹149.",
    icon: "🛒",
  },
  {
    step: "02",
    title: "Scan & Pay via UPI QR",
    description: "Instant dynamic QR code generated for your order. Pay safely via Google Pay, PhonePe, Paytm, or BHIM.",
    icon: "📱",
  },
  {
    step: "03",
    title: "Instant Drive Link on WhatsApp",
    description: "Receive the Google Drive download link directly on your WhatsApp with lifetime access + 2 free growth courses.",
    icon: "⚡",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Viral Reel Adda Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            No complicated signups or subscriptions. Get your ready-to-post videos in under 2 minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="relative p-6 sm:p-8 rounded-3xl bg-blue-50/40 border border-blue-100 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl">{s.icon}</span>
                <span className="font-mono text-2xl font-black text-blue-600/30">
                  {s.step}
                </span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

