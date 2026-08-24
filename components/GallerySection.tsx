"use client";

import { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";

const SHOTS = [
  { src: "/images/chocolate-truffle-cake.jpg", caption: "Chocolate Truffle — our bestseller" },
  { src: "/images/red-velvet-cake.jpg", caption: "Red Velvet perfection" },
  { src: "/images/black-forest-cake.jpg", caption: "Black Forest classic" },
  { src: "/images/blueberry-cheesecake.jpg", caption: "Blueberry Cheesecake" },
  { src: "/images/chocolate-pastry.jpg", caption: "Fresh pastries daily" },
  { src: "/images/paneer-puff.jpg", caption: "Golden paneer puffs" },
  { src: "/images/veg-patty.jpg", caption: "Crispy veg patties" },
  { src: "/images/red-velvet-pastry.jpg", caption: "Red Velvet pastry" },
];

export default function GallerySection() {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
  if (active === null) return;
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [active]);

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="mb-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-rose-400">
          Fresh From The Oven
        </p>
        <h2 className="mt-3 text-3xl font-extrabold text-[#3e2723] md:text-5xl">
          Our Gallery 📸
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#8d6e63] md:text-base">
          A little taste of what&apos;s waiting for you in the store today.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {SHOTS.map((shot, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-rose-100 bg-rose-50 shadow-sm transition hover:shadow-lg hover:shadow-rose-100"
            aria-label={`View photo: ${shot.caption}`}
          >
            <div className="absolute inset-0 flex items-center justify-center text-4xl">🍰</div>
            <Image
              src={shot.src}
              alt={shot.caption}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3e2723]/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <p className="absolute bottom-2 left-3 right-3 translate-y-2 text-left text-xs font-bold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              {shot.caption}
            </p>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-lg text-white transition hover:bg-white/25"
            aria-label="Close photo"
          >
            ✕
          </button>
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square w-full bg-black">
              <Image src={SHOTS[active].src} alt={SHOTS[active].caption} fill sizes="(max-width: 1024px) 90vw, 512px" className="object-contain" />
            </div>
            <p className="bg-[#fff8f0] px-5 py-3 text-center text-sm font-bold text-[#3e2723]">
              {SHOTS[active].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}