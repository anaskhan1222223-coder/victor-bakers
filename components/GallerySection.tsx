"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SHOTS = [
  { src: "/images/chocolate-truffle-cake.jpg", caption: "Chocolate Truffle — our bestseller" },
  { src: "/images/birthday-cake.jpg", caption: "Birthday classic with candles & sprinkles" },
  { src: "/images/red-velvet-cake.jpg", caption: "Red Velvet perfection" },
  { src: "/images/anniversary-cake.jpg", caption: "Anniversary tier with fresh roses" },
  { src: "/images/wedding-cake.jpg", caption: "Three-tier wedding elegance" },
  { src: "/images/black-forest-cake.jpg", caption: "Black Forest classic" },
  { src: "/images/baby-shower-cake.jpg", caption: "Baby shower softness" },
  { src: "/images/engagement-cake.jpg", caption: "Engagement ring cake" },
  { src: "/images/blueberry-cheesecake.jpg", caption: "Blueberry Cheesecake" },
  { src: "/images/gifting-box.jpg", caption: "Gift boxes & hampers" },
  { src: "/images/chocolate-pastry.jpg", caption: "Fresh pastries daily" },
  { src: "/images/paneer-puff.jpg", caption: "Golden paneer puffs" },
  { src: "/images/veg-patty.jpg", caption: "Crispy veg patties" },
  { src: "/images/red-velvet-pastry.jpg", caption: "Red Velvet pastry" },
];

const span = (i: number) =>
  i === 0 || i === 7 ? "col-span-2 row-span-2" : i === 10 ? "col-span-2" : "";

export default function GallerySection() {
  const [active, setActive] = useState<number | null>(null);

  // Lock scroll while lightbox open
  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((a) => (a === null ? a : (a + 1) % SHOTS.length));
      if (e.key === "ArrowLeft")
        setActive((a) => (a === null ? a : (a - 1 + SHOTS.length) % SHOTS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      {/* Header */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-eyebrow uppercase text-caramel"
          >
            Fresh from the oven
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-3 font-display text-section font-bold text-chocolate"
          >
            Our <span className="italic text-caramel">Gallery</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
          className="hidden max-w-xs text-sm leading-relaxed text-mocha md:block"
        >
          A little taste of what&apos;s waiting in the store today. Tap any photo to view.
        </motion.p>
      </div>

      {/* Masonry grid with stagger reveal */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
        }}
        className="grid grid-flow-dense grid-cols-2 gap-3 auto-rows-[140px] md:grid-cols-4 md:gap-4 md:auto-rows-[170px]"
      >
        {SHOTS.map((shot, i) => {
          const big = i === 0 || i === 7;
          return (
            <motion.button
              key={i}
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.96 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
              }}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-xl border border-border bg-cream ${span(i)} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2`}
              aria-label={`View photo: ${shot.caption}`}
            >
              <Image
                src={shot.src}
                alt={shot.caption}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
                className="object-cover transition-transform duration-[400ms] ease-[var(--ease-lux)] group-hover:scale-[1.04]"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-chocolate/75 via-chocolate/10 to-transparent transition-opacity duration-[400ms] ease-[var(--ease-lux)] ${
                  big ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />
              <p
                className={`absolute bottom-2.5 left-3 right-3 text-left text-xs font-bold text-cream md:text-sm ${
                  big
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                } transition-all duration-[400ms] ease-[var(--ease-lux)]`}
              >
                {shot.caption}
              </p>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-chocolate/95 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            {/* Close */}
            <button
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream backdrop-blur-sm transition-colors hover:bg-cream/25"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream backdrop-blur-sm transition-colors hover:bg-cream/25"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                setActive((active - 1 + SHOTS.length) % SHOTS.length);
              }}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Next */}
            <button
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream backdrop-blur-sm transition-colors hover:bg-cream/25"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                setActive((active + 1) % SHOTS.length);
              }}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Image card */}
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="w-full max-w-3xl overflow-hidden rounded-2xl bg-cream shadow-pastry-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full bg-chocolate/5">
                <Image
                  src={SHOTS[active].src}
                  alt={SHOTS[active].caption}
                  fill
                  sizes="(max-width: 1024px) 90vw, 768px"
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-between border-t border-border bg-cream px-5 py-3.5">
                <p className="text-sm font-bold text-chocolate md:text-base">
                  {SHOTS[active].caption}
                </p>
                <p className="font-mono text-xs font-semibold text-mocha tabular-nums">
                  <span className="text-caramel">{String(active + 1).padStart(2, "0")}</span>
                  <span className="mx-1.5">/</span>
                  <span>{String(SHOTS.length).padStart(2, "0")}</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}