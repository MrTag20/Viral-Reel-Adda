import Header from "./components/Header";
import PromoBanner from "./components/PromoBanner";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import PopularBundles from "./components/PopularBundles";
import BonusCourses from "./components/BonusCourses";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <PromoBanner />
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <PopularBundles />
        <BonusCourses />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
