import React from "react";
import Header from "@/app/components/Header";
import PromoBanner from "@/app/components/PromoBanner";
import Footer from "@/app/components/Footer";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Checkout - Viral Reel Adda",
  description: "Complete your order with dynamic UPI QR and get instant Google Drive access on WhatsApp.",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <PromoBanner />
      <Header />
      <main className="flex-1">
        <CheckoutClient />
      </main>
      <Footer />
    </div>
  );
}

