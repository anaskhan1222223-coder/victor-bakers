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

      {/* Footer */}
      <footer className="border-t border-rose-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 md:pb-12">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="flex items-center gap-2 text-xl font-extrabold">
                <span className="text-2xl" aria-hidden="true">🎂</span>
                <span className="text-gradient-berry">Victor Baker&apos;s</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#8d6e63]">
                A local Tri Nagar bakery crafting fresh cakes, pastries and
                snacks every single day — for birthdays, weddings and daily cravings.
              </p>
              <div className="mt-4 flex gap-2">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-full border border-rose-200 bg-[#fff8f0] px-4 py-2 text-xs font-bold text-rose-500 transition hover:bg-rose-50">💬 WhatsApp</a>
                <a href="https://www.google.com/maps/search/?api=1&query=Victor+Baker%27s+Tri+Nagar+Delhi" target="_blank" rel="noopener noreferrer" className="rounded-full border border-rose-200 bg-[#fff8f0] px-4 py-2 text-xs font-bold text-rose-500 transition hover:bg-rose-50">⭐ Google</a>
                <span className="rounded-full border border-rose-200 bg-[#fff8f0] px-4 py-2 text-xs font-bold text-rose-500 transition hover:bg-rose-50">📸 Instagram (Coming Soon)</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-rose-400">Quick Links</h4>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-semibold text-[#5d4037]">
                <a href="#menu" className="transition hover:text-rose-500">Menu</a>
                <a href="#gallery" className="transition hover:text-rose-500">Gallery</a>
                <a href="#trust" className="transition hover:text-rose-500">Why Us</a>
                <a href="#custom-order" className="transition hover:text-rose-500">Custom Cake</a>
                <a href="#faq" className="transition hover:text-rose-500">FAQ</a>
                <a href="#location" className="transition hover:text-rose-500">Location</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-rose-400">Visit Us</h4>
              <p className="mt-4 text-sm text-[#5d4037]">{BAKERY.address}</p>
              <p className="mt-2 text-sm text-[#5d4037]">📞 {BAKERY.phoneDisplay}</p>
              <p className="mt-2 text-sm text-[#5d4037]">🕗 {BAKERY.timing}</p>
              <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-[#fff8f0] px-3 py-1.5 text-xs font-bold">
                {new Date().getHours() >= 8 && new Date().getHours() < 22 ? (
                  <><span className="h-2 w-2 rounded-full bg-green-500" /> <span className="text-green-600">Open now · closes 10 PM</span></>
                ) : (
                  <><span className="h-2 w-2 rounded-full bg-rose-500" /> <span className="text-rose-500">Closed · opens 8 AM</span></>
                )}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-rose-100 pt-6 text-xs text-[#bcaaa4] md:flex-row">
            <p>© {new Date().getFullYear()} {BAKERY.name}. All rights reserved.</p>
            <p>Designed & developed by Anas Khan · +91 9315650503</p>
          </div>
        </div>
      </footer>

      <BackToTop />
      <MobileActionBar />
    </main>
  );
}