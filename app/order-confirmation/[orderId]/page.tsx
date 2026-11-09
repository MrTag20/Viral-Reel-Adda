import React, { Suspense } from "react";
import Header from "@/app/components/Header";
import PromoBanner from "@/app/components/PromoBanner";
import Footer from "@/app/components/Footer";
import OrderConfirmationClient from "./OrderConfirmationClient";

interface Props {
  params: Promise<{
    orderId: string;
  }>;
}

export const metadata = {
  title: "Order Received - Viral Reel Adda",
  description: "Your order has been received and is awaiting manual payment verification.",
};

async function OrderContent({ params }: Props) {
  const { orderId } = await params;
  return <OrderConfirmationClient orderId={orderId} />;
}

export default function OrderConfirmationPage({ params }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <PromoBanner />
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Loading order details...</p>
            </div>
          }
        >
          <OrderContent params={params} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
