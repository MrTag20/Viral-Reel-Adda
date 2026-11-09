import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/data/products";
import Header from "@/app/components/Header";
import PromoBanner from "@/app/components/PromoBanner";
import Footer from "@/app/components/Footer";
import ProductDetailsClient from "./ProductDetailsClient";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Bundle Not Found - Viral Reel Adda",
    };
  }

  return {
    title: `${product.name} (₹149) - Viral Reel Adda`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <PromoBanner />
      <Header />
      <main className="flex-1">
        <ProductDetailsClient product={product} related={related} />
      </main>
      <Footer />
    </div>
  );
}

