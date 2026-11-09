import React from "react";
import Header from "@/app/components/Header";
import PromoBanner from "@/app/components/PromoBanner";
import Footer from "@/app/components/Footer";
import CartPageClient from "./CartPageClient";

export const metadata = {
  title: "Shopping Cart - Viral Reel Adda",
  description: "Review your selected viral reel bundles and proceed to fast direct UPI payment.",
};

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <PromoBanner />
      <Header />
      <main className="flex-1">
        <CartPageClient />
      </main>
      <Footer />
    </div>
  );
}

