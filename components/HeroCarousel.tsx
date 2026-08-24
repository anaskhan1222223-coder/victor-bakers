"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { generalOrderMessage, waLink } from "@/lib/site";

const SLIDES = [
  { image: "/images/chocolate-truffle-cake.jpg", quote: "Magic in every wish", label: "Birthday Cakes" },
  { image: "/images/red-velvet-cake.jpg", quote: "Love at first bite", label: "Red Velvet Specials" },
  { image: "/images/black-forest-cake.jpg", quote: "A classic that never fails", label: "Eggless Wonders" },
  { image: "/images/pineapple-cake.jpg", quote: "Your memories, baked sweet", label: "Photo Cakes" },
  { image: "/images/blueberry-cheesecake.jpg", quote: "Creamy dreams come true", label: "Cheesecakes" },
  { image: "/images/chocolate-pastry.jpg", quote: "Little bites of happiness", label: "Fresh Pastries" },
  { image: "/images/paneer-puff.jpg", quote: "Crispy. Flaky. Unforgettable.", label: "Puffs & Patties" },
  { image: "/images/red-velvet-pastry.jpg", quote: "Gifts that taste like love", label: "Gift Combos" },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % SLIDES.length);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [index]);

  const slide = SLIDES[index];

  return (
    <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 6, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.label}
              fill
              priority={index === 0}
              sizes="100vw"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
              className="object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#2a1208]/85 via-[#2a1208]/45 to-[#2a1208]/10" />

          <div className="relative flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-4 pt-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="mb-4 inline-block rounded-full border border-amber-300/40 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-200 backdrop-blur"
              >
                {slide.label} · Tri Nagar, Delhi
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="max-w-2xl font-serif text-5xl font-bold italic leading-tight text-[#fff8f0] md:text-7xl"
              >
                {slide.quote}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="mt-4 max-w-md text-base text-amber-100/80"
              >
                Baked fresh daily at Victor Baker&apos;s — cakes, pastries & snacks for every celebration.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a href="#custom-order" className="rounded-full bg-gradient-to-r from-rose-500 to-orange-400 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-900/40">
                  Order Custom Cake
                </a>
                <a href="#menu" className="rounded-full border-2 border-amber-200/50 bg-white/10 px-7 py-3.5 text-sm font-bold text-amber-100 backdrop-blur">
                  View Menu
                </a>
                <a href={waLink(generalOrderMessage())} target="_blank" rel="noopener noreferrer" className="rounded-full border border-emerald-300/40 bg-emerald-500/15 px-5 py-3.5 text-sm font-bold text-emerald-200 backdrop-blur">
                  💬 WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prev} aria-label="Previous slide" className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-lg text-white backdrop-blur hover:bg-white/30 md:flex">❮</button>
      <button onClick={next} aria-label="Next slide" className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-lg text-white backdrop-blur hover:bg-white/30 md:flex">❯</button>

      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-amber-300" : "w-2.5 bg-white/40 hover:bg-white/70"}`} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block w-full">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="#fff8f0" />
        </svg>
      </div>
    </section>
  );
}