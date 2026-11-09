"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  generateOrderId,
  saveOrder,
  updateOrderUtr,
  Order,
} from "@/lib/orders";
import { buildWhatsAppMessage, getWhatsAppUrl } from "@/lib/config";
import DynamicUpiQr from "@/app/components/DynamicUpiQr";

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, subtotal, totalOriginal, totalSavings, totalItems, clearCart } =
    useCart();

  // Form State
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; whatsapp?: string }>({});

  // Checkout Step: 1 = Details, 2 = Payment QR
  const [step, setStep] = useState<1 | 2>(1);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // UTR State
  const [utr, setUtr] = useState("");
  const [utrError, setUtrError] = useState("");
  const [isSubmittingUtr, setIsSubmittingUtr] = useState(false);

  // Restore active order from session/local storage if user refreshed during payment step
  useEffect(() => {
    try {
      const activeOrderId = sessionStorage.getItem("vra_active_order_id");
      if (activeOrderId) {
        const storedOrders = localStorage.getItem("viralreeladda_orders_v1");
        if (storedOrders) {
          const parsed: Order[] = JSON.parse(storedOrders);
          const found = parsed.find((o) => o.orderId === activeOrderId);
          if (found && found.status === "Payment Pending") {
            setCurrentOrder(found);
            setStep(2);
          }
        }
      }
    } catch (e) {
      console.error("Error restoring checkout session", e);
    }
  }, []);

  // Validation function for Indian Mobile Number
  const validateMobile = (phone: string): boolean => {
    // Strip all non-digits
    const clean = phone.replace(/\D/g, "");
    // Handles 10 digits directly, or 12 digits starting with 91, or 11 digits starting with 0
    if (clean.length === 10) {
      return /^[6-9]\d{9}$/.test(clean);
    } else if (clean.length === 12 && clean.startsWith("91")) {
      return /^[6-9]\d{9}$/.test(clean.slice(2));
    } else if (clean.length === 11 && clean.startsWith("0")) {
      return /^[6-9]\d{9}$/.test(clean.slice(1));
    }
    return false;
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; whatsapp?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Please enter your full name (minimum 2 characters)";
    }

    if (!whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required for receiving download links";
    } else if (!validateMobile(whatsapp)) {
      newErrors.whatsapp = "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Clean phone number
    const cleanPhone = whatsapp.replace(/\D/g, "").slice(-10);

    // Create unique order
    const orderId = generateOrderId();
    const newOrder: Order = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: name.trim(),
        whatsapp: cleanPhone,
        email: email.trim() || undefined,
      },
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        price: item.product.price,
        originalPrice: item.product.originalPrice,
        quantity: item.quantity,
        gradient: item.product.gradient,
        icon: item.product.icon,
        videoCount: item.product.videoCount,
      })),
      subtotal,
      totalOriginal,
      totalSavings,
      totalAmount: subtotal,
      status: "Payment Pending",
      freeBonuses: [
        "YouTube Growth Mastery Course (Worth ₹999)",
        "Instagram Growth Mastery Course (Worth ₹999)",
      ],
    };

    saveOrder(newOrder);
    sessionStorage.setItem("vra_active_order_id", orderId);
    setCurrentOrder(newOrder);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUtrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrder) return;

    const trimmedUtr = utr.trim();
    if (!trimmedUtr) {
      setUtrError("Please enter your 12-digit UTR / UPI Transaction Reference number");
      return;
    }

    if (trimmedUtr.length < 6) {
      setUtrError("Please enter a valid UTR reference number from your UPI receipt");
      return;
    }

    setUtrError("");
    setIsSubmittingUtr(true);

    // Update Order to "Payment Pending Verification"
    const updated = updateOrderUtr(currentOrder.orderId, trimmedUtr);

    // Prepare WhatsApp Confirmation Message
    const msg = buildWhatsAppMessage({
      orderId: currentOrder.orderId,
      customerName: currentOrder.customer.name,
      whatsappNumber: currentOrder.customer.whatsapp,
      items: currentOrder.items,
      totalAmount: currentOrder.totalAmount,
      utr: trimmedUtr,
    });

    const waUrl = getWhatsAppUrl(msg);

    // Clear cart and session active order
    clearCart();
    sessionStorage.removeItem("vra_active_order_id");

    // Open WhatsApp in new tab for user convenience
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }

    // Redirect to Order Confirmation page
    router.push(`/order-confirmation/${currentOrder.orderId}`);
  };

  // If cart is empty and user hasn't generated an active order
  if (cart.length === 0 && !currentOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center text-4xl mb-6">
          🛒
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Your Cart is Empty
        </h1>
        <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base leading-relaxed mb-8">
          Add at least one reel bundle to proceed to checkout. All bundles are ₹149 each today.
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
        
        {/* Checkout Stepper Header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-300 z-0"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />

            {/* Step 1 Indicator */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step === 1
                    ? "bg-blue-600 text-white ring-4 ring-blue-100"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {step === 2 ? "✓" : "1"}
              </div>
              <span className="text-xs font-bold mt-2 text-slate-800">
                Customer Details
              </span>
            </div>

            {/* Step 2 Indicator */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step === 2
                    ? "bg-blue-600 text-white ring-4 ring-blue-100"
                    : "bg-white text-slate-400 border-2 border-slate-300"
                }`}
              >
                2
              </div>
              <span
                className={`text-xs font-bold mt-2 ${
                  step === 2 ? "text-blue-600" : "text-slate-400"
                }`}
              >
                Scan UPI QR & Pay
              </span>
            </div>
          </div>
        </div>

        {/* STEP 1: Customer Details Form + Summary */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            
            {/* Left Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                    <span>Delivery Contact</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Where Should We Send Your Video Links?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Your Google Drive download link will be shared via WhatsApp immediately upon payment verification.
                  </p>
                </div>

                <form onSubmit={handleDetailsSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Farhad Khan"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none transition-colors ${
                        errors.name
                          ? "border-red-400 bg-red-50/30 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  {/* WhatsApp Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      WhatsApp Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm font-bold">
                        +91
                      </div>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => {
                          setWhatsapp(e.target.value);
                          if (errors.whatsapp) setErrors({ ...errors, whatsapp: undefined });
                        }}
                        placeholder="9876543210"
                        maxLength={15}
                        className={`w-full pl-13 pr-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none transition-colors ${
                          errors.whatsapp
                            ? "border-red-400 bg-red-50/30 focus:border-red-500"
                            : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        }`}
                      />
                    </div>
                    {errors.whatsapp ? (
                      <p className="text-xs text-red-500 mt-1 font-medium">{errors.whatsapp}</p>
                    ) : (
                      <p className="text-[11px] text-slate-400 mt-1">
                        We send the lifetime Google Drive link to this WhatsApp number.
                      </p>
                    )}
                  </div>

                  {/* Optional Email */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Email Address
                      </label>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        Optional
                      </span>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@gmail.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-black text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/25"
                    >
                      <span>Continue to UPI Payment (₹{subtotal})</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-5">
                <h3 className="font-extrabold text-base text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <span>Selected Bundles</span>
                  <span className="text-xs font-bold text-blue-600">{totalItems} Item(s)</span>
                </h3>

                {/* Items List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between text-xs py-1"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-slate-800 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-slate-400 text-[11px]">
                          Qty: {item.quantity} • {item.product.videoCount}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-extrabold text-slate-900">
                          ₹{item.product.price * item.quantity}
                        </span>
                        <span className="block text-[10px] text-slate-400 line-through">
                          ₹{item.product.originalPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Free Bonuses Badge */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-black text-amber-900">
                    <span>🎁 2 FREE Bonuses Included:</span>
                  </div>
                  <ul className="text-slate-700 space-y-1 pl-4 list-disc text-[11px] font-medium">
                    <li>YouTube Growth Mastery Course (₹999)</li>
                    <li>Instagram Growth Mastery Course (₹999)</li>
                  </ul>
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Original Price</span>
                    <span className="line-through">₹{totalOriginal}</span>
                  </div>
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Instant Discount (70%)</span>
                    <span>- ₹{totalSavings}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total Amount to Pay</span>
                    <span className="text-blue-600 text-xl">₹{subtotal}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* STEP 2: Dynamic UPI QR & UTR Submission */}
        {step === 2 && currentOrder && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
            
            {/* Left QR Code Column */}
            <div className="lg:col-span-6">
              <DynamicUpiQr
                amount={currentOrder.totalAmount}
                orderId={currentOrder.orderId}
              />
            </div>

            {/* Right UTR Confirmation Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Order Info Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Order Reference
                    </span>
                    <p className="font-mono font-black text-slate-900 text-base">
                      {currentOrder.orderId}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
                    {currentOrder.status}
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Customer:</span>
                    <span className="font-bold text-slate-800">
                      {currentOrder.customer.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">WhatsApp:</span>
                    <span className="font-bold text-slate-800">
                      +91 {currentOrder.customer.whatsapp}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Bundles:</span>
                    <span className="font-bold text-slate-800">
                      {currentOrder.items.length} Bundle(s)
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100 text-sm font-extrabold text-slate-900">
                    <span>Payable Amount:</span>
                    <span className="text-blue-600 text-base">
                      ₹{currentOrder.totalAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* UTR Submission Form */}
              <div className="bg-white rounded-3xl border-2 border-blue-500/40 p-6 sm:p-7 shadow-lg shadow-blue-500/10 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    Confirm Your UPI Payment
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Once paid, find the 12-digit UTR / UPI Ref number in your payment app and submit it below to register your order.
                  </p>
                </div>

                <form onSubmit={handleUtrSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      UTR / UPI Transaction Reference No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={utr}
                      onChange={(e) => {
                        setUtr(e.target.value);
                        if (utrError) setUtrError("");
                      }}
                      placeholder="e.g. 431209874521"
                      className={`w-full px-4 py-3.5 rounded-xl border font-mono text-sm text-slate-900 focus:outline-none transition-colors ${
                        utrError
                          ? "border-red-400 bg-red-50/30 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      }`}
                    />
                    {utrError && (
                      <p className="text-xs text-red-500 mt-1 font-medium">{utrError}</p>
                    )}
                    <p className="text-[11px] text-slate-400 mt-1.5 leading-normal">
                      💡 Tip: In Google Pay, PhonePe, or Paytm, tap on your completed payment receipt to see the 12-digit &quot;UPI Ref No&quot; or &quot;UTR&quot;.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingUtr}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-black text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50"
                  >
                    <span>{isSubmittingUtr ? "Submitting Order..." : "I Have Paid"}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-[11px] text-slate-500">
                      ⚡ WhatsApp will open automatically to send your order verification message.
                    </p>
                  </div>
                </form>
              </div>

              {/* Back button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  ← Edit Customer Details
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

