"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import MenuSection from "@/components/MenuSection";
import CakeInquiryForm from "@/components/CakeInquiryForm";
import IntroAnimation from "@/components/IntroAnimation";

const Bakery3DBackground = dynamic(
  () => import("@/components/Bakery3DBackground"),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-[#140d08]" />,
  }
);

const BAKERY = {
  name: "Victor Baker's",
  phoneDisplay: "+91 99999 99999", // Replace with real number
  phone: "919999999999", // Replace with real WhatsApp number
  address: "736/39, Onkar Nagar, Shambhu Nagar, Tri Nagar, Delhi - 110052",
  timing: "8:00 AM - 10:00 PM", // Replace with real timing if different
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  const whatsappLink = `https://wa.me/${BAKERY.phone}?text=${encodeURIComponent(
    "Hi, I want to order from Victor Baker's."
  )}`;

  const mapQuery = `${BAKERY.name}, ${BAKERY.address}`;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&output=embed`;

  const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    mapQuery
  )}`;

  return (
    <main className="relative z-10 min-h-screen">
      {/* 3D opening animation */}
      <AnimatePresence>
        {showIntro && <IntroAnimation onSkip={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Floating WhatsApp button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-2xl text-white shadow-2xl shadow-black/50 transition hover:scale-110"
      >
        💬
      </a>

      <Bakery3DBackground />

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#140d08]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <a href="#home" className="text-2xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Victor Baker&apos;s
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#menu" className="text-stone-300 transition hover:text-amber-400">
              Menu
            </a>
            <a href="#custom-order" className="text-stone-300 transition hover:text-amber-400">
              Custom Cake
            </a>
            <a href="#location" className="text-stone-300 transition hover:text-amber-400">
              Location
            </a>
          </nav>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-bold text-stone-950 transition hover:scale-105"
          >
            Order Now
          </a>
        </div>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="mx-auto max-w-7xl px-4 pb-16 pt-32 md:pb-24 md:pt-40"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl rounded-[3rem] border border-white/10 bg-[#1a120a]/70 p-8 shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400"
          >
            📍 Tri Nagar, Delhi
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="text-4xl font-extrabold leading-tight text-stone-100 md:text-6xl"
          >
            Fresh Cakes, Pastries & Bakery Snacks from{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Victor Baker&apos;s
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="mt-6 max-w-2xl text-lg text-stone-400 md:text-xl"
          >
            Order birthday cakes, custom cakes, fresh pastries, patties and
            puff items. Send your cake enquiry directly and get a fast
            response.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a
              href="#custom-order"
              className="rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-7 py-4 font-bold text-stone-950 shadow-xl shadow-amber-900/40 transition hover:scale-[1.03]"
            >
              Order Custom Cake
            </a>

            <a
              href="#menu"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-4 font-bold text-stone-200 backdrop-blur transition hover:border-amber-500/50 hover:text-amber-400"
            >
              View Menu
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-3xl">🎂</div>
              <h3 className="mt-3 font-bold text-stone-100">Custom Cakes</h3>
              <p className="mt-1 text-sm text-stone-400">
                Birthday, wedding, anniversary and photo cakes.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-3xl">🥐</div>
              <h3 className="mt-3 font-bold text-stone-100">Fresh Snacks</h3>
              <p className="mt-1 text-sm text-stone-400">
                Pastries, patties and puff items baked fresh.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-3xl">💬</div>
              <h3 className="mt-3 font-bold text-stone-100">Direct Orders</h3>
              <p className="mt-1 text-sm text-stone-400">
                Order directly without depending only on delivery apps.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Quote section */}
      <section className="mx-auto max-w-5xl px-4 py-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotateX: 14 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="perspective-800 rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-14"
        >
          <span className="text-6xl leading-none text-amber-500">“</span>

          <p className="mt-2 font-serif text-2xl italic leading-snug text-stone-100 md:text-4xl">
            Life is short, eat dessert first.
          </p>

          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-amber-400 md:text-sm">
            — Baked with love at Victor Baker&apos;s, Tri Nagar
          </p>
        </motion.div>
      </section>

      {/* Menu */}
      <MenuSection />

      {/* Custom cake enquiry */}
      <section id="custom-order" className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.5rem] border border-white/10 bg-[#1a120a]/70 p-8 shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-10"
          >
            <h2 className="text-3xl font-extrabold text-stone-100 md:text-5xl">
              Book a{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Custom Cake
              </span>
            </h2>

            <p className="mt-5 text-lg text-stone-400">
              Planning a birthday, anniversary, wedding or office celebration?
              Send your requirement and Victor Baker&apos;s will help you with
              flavor, weight, design and price.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-lg font-bold text-stone-100">🎨 Custom Design</h3>
                <p className="mt-2 text-stone-400">
                  Share your idea or reference photo and get a cake made for
                  your occasion.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-lg font-bold text-stone-100">🥚 Eggless Option</h3>
                <p className="mt-2 text-stone-400">
                  Eggless cakes available for birthdays and special events.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-lg font-bold text-stone-100">⚡ Fast Response</h3>
                <p className="mt-2 text-stone-400">
                  Get price and booking details quickly through enquiry or
                  WhatsApp.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CakeInquiryForm />
          </motion.div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="mx-auto max-w-7xl px-4 py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[3rem] border border-white/10 bg-[#1a120a]/70 shadow-2xl shadow-black/50 backdrop-blur-2xl"
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-extrabold text-stone-100 md:text-5xl">
                Visit{" "}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                  Victor Baker&apos;s
                </span>
              </h2>

              <div className="mt-8 space-y-5">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <h3 className="text-lg font-bold text-stone-100">Address</h3>
                  <p className="mt-2 text-stone-400">{BAKERY.address}</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <h3 className="text-lg font-bold text-stone-100">Phone / WhatsApp</h3>
                  <p className="mt-2 text-stone-400">{BAKERY.phoneDisplay}</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <h3 className="text-lg font-bold text-stone-100">Timing</h3>
                  <p className="mt-2 text-stone-400">{BAKERY.timing}</p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={directionsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 font-bold text-stone-950 transition hover:scale-105"
                  >
                    Get Directions
                  </a>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-stone-200 transition hover:border-green-500/60 hover:text-green-400"
                  >
                    WhatsApp Order
                  </a>
                </div>
              </div>
            </div>

            <div className="min-h-[320px]">
              <iframe
                title="Victor Baker's Location"
                src={mapSrc}
                className="h-full min-h-[320px] w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#140d08]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <p className="text-xl font-extrabold">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Victor Baker&apos;s
            </span>
          </p>

          <p className="mt-3 text-stone-400">{BAKERY.address}</p>

          <p className="mt-2 text-sm text-stone-500">
            © {new Date().getFullYear()} {BAKERY.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}