"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { PAYMENT_CONFIG, generateUpiLink } from "@/lib/config";

interface Props {
  amount: number;
  orderId: string;
}

export default function DynamicUpiQr({ amount, orderId }: Props) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedOrder, setCopiedOrder] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  const upiLink = generateUpiLink({
    amount,
    orderId,
    upiId: PAYMENT_CONFIG.UPI_ID,
    payeeName: PAYMENT_CONFIG.PAYEE_NAME,
  });

  useEffect(() => {
    // Generate dynamic QR code using qrcode library
    QRCode.toDataURL(upiLink, {
      width: 320,
      margin: 2,
      color: {
        dark: "#0F172A",
        light: "#FFFFFF",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("Error generating UPI QR code", err));
  }, [upiLink]);

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
      {/* Top Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
          <span>⚡ Dynamic UPI QR</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Scan & Pay with Any UPI App
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Google Pay, PhonePe, Paytm, BHIM, or any banking app.
        </p>
      </div>

      {/* QR Code Container */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative p-4 rounded-3xl bg-white border-2 border-blue-500/30 shadow-xl shadow-blue-500/10 flex flex-col items-center">
          {/* Top UPI Brand strip */}
          <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <span>BHIM UPI QR</span>
            <span className="text-blue-600 font-black">₹{amount}</span>
          </div>

          {qrDataUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={qrDataUrl}
              alt={`UPI QR code for ₹${amount}`}
              width={240}
              height={240}
              className="rounded-xl w-56 h-56 sm:w-60 sm:h-60 object-contain"
            />
          ) : (
            <div className="w-56 h-56 sm:w-60 sm:h-60 rounded-xl bg-slate-100 animate-pulse flex items-center justify-center text-xs text-slate-400">
              Generating dynamic QR...
            </div>
          )}

          {/* Bottom badge */}
          <div className="pt-2 text-center">
            <span className="inline-block text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Ref: {orderId}
            </span>
          </div>
        </div>

        {/* Mobile Pay with UPI App Direct Button */}
        <div className="w-full max-w-xs mt-4">
          <a
            href={upiLink}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/25 text-center"
          >
            <span>📱 Pay with UPI App (Mobile)</span>
          </a>
        </div>
      </div>

      {/* UPI Details & Copy Buttons */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        
        {/* Payable Amount */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 border border-blue-100">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Payable Amount
            </span>
            <span className="text-xl font-black text-slate-900">₹{amount}</span>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(String(amount), setCopiedAmount)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 transition-colors shadow-2xs"
          >
            {copiedAmount ? "✓ Copied" : "Copy Amount"}
          </button>
        </div>

        {/* UPI ID */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="min-w-0 pr-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              UPI ID
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold text-slate-800 truncate block">
              {PAYMENT_CONFIG.UPI_ID}
            </span>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(PAYMENT_CONFIG.UPI_ID, setCopiedUpi)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors shrink-0 shadow-2xs"
          >
            {copiedUpi ? "✓ Copied" : "Copy UPI ID"}
          </button>
        </div>

        {/* Order Reference */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="min-w-0 pr-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Order Reference
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold text-slate-800 truncate block">
              {orderId}
            </span>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(orderId, setCopiedOrder)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors shrink-0 shadow-2xs"
          >
            {copiedOrder ? "✓ Copied" : "Copy Order ID"}
          </button>
        </div>
      </div>

      {/* Step by Step Instructions */}
      <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-xs text-slate-700 space-y-2">
        <p className="font-extrabold text-amber-950 flex items-center gap-1.5">
          <span>📌 Payment Instructions:</span>
        </p>
        <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1 leading-relaxed">
          <li>Scan the QR code above or tap &quot;Pay with UPI App&quot;.</li>
          <li>Ensure the amount is <strong>₹{amount}</strong>.</li>
          <li>After successful payment, copy the <strong>12-digit UTR / UPI Ref number</strong> from your payment receipt.</li>
          <li>Paste the UTR number in the verification field below and click <strong>&quot;I Have Paid&quot;</strong>.</li>
        </ol>
      </div>
    </div>
  );
}

