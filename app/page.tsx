"use client";

import dynamic from "next/dynamic";
import HeroCarousel from "@/components/HeroCarousel";
import Marquee from "@/components/Marquee";
import ScrollProgress from "@/components/ScrollProgress";
import PopularProducts from "@/components/products/PopularProducts";
import TrustSection from "@/components/TrustSection";
import CakeInquiryForm from "@/components/CakeInquiryForm";
import LocationSection from "@/components/LocationSection";
import MobileActionBar from "@/components/MobileActionBar";
import { SITE, generalOrderMessage, waLink } from "@/lib/site";
import GallerySection from "@/components/GallerySection";
import FaqSection from "@/components/FaqSection";
import BackToTop from "@/components/BackToTop";
import Navbar from "@/components/Navbar";
import TrustBar from "@/components/TrustBar";
import OccasionSection from "@/components/OccasionSection";
import OrderingSteps from "@/components/OrderingSteps";
import CategoryShowcase from "@/components/CategoryShowcase";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const PositiveBackground = dynamic(() => import("@/components/Bakery3DBackground"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#fff8f0]" />,
});

const BAKERY = {
  name: SITE.name,
  phoneDisplay: SITE.phoneDisplay,
  phone: SITE.phone,
  address: SITE.address,
  timing: SITE.timing,
};

export default function Home() {
  const whatsappLink = waLink(generalOrderMessage());

  return (
    <main className="relative z-10 min-h-screen">
      <ScrollProgress />
      <PositiveBackground />

      {/* Floating WhatsApp — desktop only */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-2xl shadow-green-200 wa-pulse transition hover:scale-110 md:flex"
      >
        💬
      </a>

      {/* New premium navbar */}
      <Navbar />

      <HeroCarousel />
      <TrustBar />
      <Marquee />
      <CategoryShowcase />
      <PopularProducts />
      <OccasionSection />
      <TrustSection />
      <AboutSection />
      <GallerySection />

      <OrderingSteps />
      {/* Custom cake enquiry */}
      <section id="custom-order" className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div className="rounded-[2.5rem] border border-rose-100 bg-white p-8 shadow-xl shadow-rose-100/60 md:p-10">
            <h2 className="text-3xl font-extrabold text-[#3e2723] md:text-5xl">
              Book a <span className="text-gradient-berry">Custom Cake</span>
            </h2>
            <p className="mt-5 text-lg text-[#8d6e63]">
              Planning a birthday, anniversary, wedding or office celebration?
              Send your requirement and we&apos;ll help you with flavor, weight, design and price.
            </p>
            <div className="mt-8 space-y-4">
              <div className="rounded-3xl border border-rose-100 bg-[#fff8f0] p-6">
                <h3 className="text-lg font-bold text-[#3e2723]">🎨 Custom Design</h3>
                <p className="mt-2 text-[#8d6e63]">Share your idea or reference photo and get a cake made for your occasion.</p>
              </div>
              <div className="rounded-3xl border border-rose-100 bg-[#fff8f0] p-6">
                <h3 className="text-lg font-bold text-[#3e2723]">🥚 Eggless Option</h3>
                <p className="mt-2 text-[#8d6e63]">Eggless cakes available for birthdays and special events.</p>
              </div>
              <div className="rounded-3xl border border-rose-100 bg-[#fff8f0] p-6">
                <h3 className="text-lg font-bold text-[#3e2723]">⚡ Fast Response</h3>
                <p className="mt-2 text-[#8d6e63]">Get price and booking details quickly through enquiry or WhatsApp.</p>
              </div>
            </div>
          </div>
          <div>
            <CakeInquiryForm />
          </div>
        </div>
      </section>

      <FaqSection />
      <LocationSection bakery={BAKERY} />

      <Footer />
      <BackToTop />
      <MobileActionBar />
    </main>
  );
}