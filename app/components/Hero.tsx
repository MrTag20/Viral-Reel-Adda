import React from "react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white pt-8 pb-16 sm:pt-16 sm:pb-24">
      {/* Background subtle decorative blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute -top-12 left-1/4 w-72 h-72 bg-blue-300/40 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-sky-200/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-7/12 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
              <span>Viral Reel Adda • 15,000+ Ready-To-Post Videos</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5">
              Ready-to-Upload Reels. <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                Create More. Grow Faster.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Skip hours of video editing, scripting, and research. Get premium, watermark-free 1080p vertical video bundles ready to post directly on Instagram, YouTube Shorts, and Facebook.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 sm:gap-4 mb-10">
              <a
                href="#bundles"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/25 text-base"
              >
                <span>Explore Bundles (₹149)</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              <a
                href="#categories"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 active:scale-[0.98] transition-all text-base shadow-xs"
              >
                <svg
                  className="w-5 h-5 text-blue-600 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Watch Preview</span>
              </a>
            </div>

            {/* Quick Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  No Watermark
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  1080p Full HD
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  Direct Drive Link
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
                  ✓
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  Free 2 Courses
                </span>
              </div>
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Floating notification badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center font-bold text-lg">
                  📈
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Average Growth
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                    +1.2M Views in 30 Days
                  </p>
                </div>
              </div>

              {/* Main Phone Mockup Frame */}
              <div className="bg-slate-900 rounded-[32px] p-3 shadow-2xl shadow-blue-500/15 border-4 border-slate-800">
                <div className="relative rounded-[24px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 aspect-[9/16] max-h-[480px] w-full overflow-hidden flex flex-col justify-between p-4 sm:p-5 text-white">
                  {/* Top Bar inside mockup */}
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span className="flex items-center gap-1.5 font-semibold bg-red-600/90 text-white px-2 py-0.5 rounded-md text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      VIRAL REEL
                    </span>
                    <span className="font-mono text-[11px] bg-white/10 px-2 py-0.5 rounded">
                      1080 x 1920
                    </span>
                  </div>

                  {/* Reel Center Mock Visual */}
                  <div className="flex flex-col items-center justify-center text-center my-auto py-6">
                    <div className="w-16 h-16 rounded-full bg-blue-600/30 border-2 border-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/50 mb-3">
                      <svg
                        className="w-8 h-8 text-white fill-current ml-1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="text-xs uppercase font-bold tracking-widest text-blue-300">
                      Trending Reel Bundle
                    </span>
                    <p className="text-lg font-bold text-white mt-1 px-4 leading-tight">
                      5000+ Viral Reels In 9+ High-Demand Niches
                    </p>
                  </div>

                  {/* Bottom Reel Stats Bar */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-blue-200 font-medium">Special Offer</p>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-extrabold text-white">₹149</span>
                          <span className="text-xs text-white/50 line-through">₹499</span>
                          <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-1 rounded">
                            70% OFF
                          </span>
                        </div>
                      </div>
                      <a
                        href="#bundles"
                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors"
                      >
                        Get Access
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Bottom Left Badge */}
              <div className="absolute -bottom-4 -left-2 sm:-left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500">Fast Delivery</p>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                    Instant Drive Link via WhatsApp
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

