"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { waLink } from "@/lib/config";

const SLIDES = [
  { image: "/images/wedding-cake.jpg", quote: "Made for your big day", label: "Wedding Cakes" },
  { image: "/images/chocolate-truffle-cake.jpg", quote: "Magic in every wish", label: "Birthday Cakes" },
  { image: "/images/red-velvet-cake.jpg", quote: "Love at first bite", label: "Red Velvet Specials" },
  { image: "/images/black-forest-cake.jpg", quote: "A classic that never fails", label: "Eggless Wonders" },
  { image: "/images/pineapple-cake.jpg", quote: "Your memories, baked sweet", label: "Photo Cakes" },
  { image: "/images/blueberry-cheesecake.jpg", quote: "Creamy dreams come true", label: "Cheesecakes" },
  { image: "/images/baby-shower-cake.jpg", quote: "Cleverly crafted for little ones", label: "Baby Shower Cakes" },
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
    <section
      id="home"
      className="relative h-[92vh] min-h-[620px] w-full overflow-hidden md:h-[85vh] md:min-h-[640px]"
    >
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
        >
          {/* IMAGE — full bleed, sharp, gentle zoom */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 6, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.label}
              fill
              priority={index === 0}
              sizes="100vw"
              quality={92}
              className="object-cover object-center"
            />
          </motion.div>

          {/* GRADIENT — mobile: from bottom (image stays vivid on top)
              desktop: from left (text side dark) */}
          <div className="absolute inset-0 bg-gradient-to-t from-chocolate/90 via-chocolate/20 to-transparent md:bg-gradient-to-r md:from-chocolate/85 md:via-chocolate/45 md:to-chocolate/10" />

          {/* TEXT — mobile: bottom · desktop: middle-left */}
          <div className="relative flex h-full items-end md:items-center">
            <div className="mx-auto w-full max-w-7xl px-4 pb-32 md:pb-0 md:pt-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4 inline-block rounded-full border border-bronze/60 bg-cream/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-cream backdrop-blur"
              >
                {slide.label} · Tri Nagar, Delhi
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="max-w-2xl font-display text-4xl font-bold italic leading-tight text-cream sm:text-5xl md:text-7xl"
              >
                {slide.quote}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-3 max-w-md text-sm text-cream/90 md:text-base"
              >
                Freshly baked moments, made just for you. Cakes, pastries & snacks for every celebration.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="mt-6 flex flex-wrap gap-3"
              >
                <a
                  href="#custom"
                  className="rounded-full bg-bronze px-6 py-3 text-sm font-bold text-cream shadow-lg hover:bg-bronze-hover transition-colors md:px-7 md:py-3.5"
                >
                  Order a Custom Cake
                </a>
                <a
                  href={waLink("Hi, I'd like to know more about your menu.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-2 border-cream/50 bg-cream/10 px-6 py-3 text-sm font-bold text-cream backdrop-blur hover:bg-cream/20 transition-colors md:px-7 md:py-3.5"
                >
                  WhatsApp Us
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows (desktop only) */}
      <button onClick={prev} aria-label="Previous slide" className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-lg text-cream backdrop-blur hover:bg-cream/30 md:flex">❮</button>
      <button onClick={next} aria-label="Next slide" className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-lg text-cream backdrop-blur hover:bg-cream/30 md:flex">❯</button>

      {/* Dots — above the wave */}
      <div className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-bronze" : "w-2.5 bg-cream/40 hover:bg-cream/70"}`}
          />
        ))}
      </div>

      {/* Wave into next section */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block w-full">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="#FDFBF7" />
        </svg>
      </div>
    </section>
  );
}