"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* Local hero data — keep in sync with the BAKERY constant in page.tsx */
const HERO = {
  location: "Tri Nagar, Delhi",
  headline: "Handcrafted Cakes & Fresh Bakes — Made Daily.",
  subheadline: "From signature birthday cakes to flaky patties and puff items — everything baked fresh every morning at Victor Baker's.",
  primaryCta: { label: "Order Custom Cake", href: "#enquiry" },
  secondaryCta: { label: "View Menu", href: "#menu" },
  whatsapp: {
    phone: "919999999999",
    message: "Hi, I want to place an order at Victor Baker's.",
  },
  heroImage: "/images/chocolate-truffle-cake.jpg",
  heroImageAlt: "Signature Chocolate Truffle Cake from Victor Baker's in Tri Nagar",
  imageBadge: "Bestseller",
  priceFrom: "₹899/kg",
};

export default function Hero() {
  const waUrl = `https://wa.me/${HERO.whatsapp.phone}?text=${encodeURIComponent(HERO.whatsapp.message)}`;

  return (
    <section className="relative overflow-hidden pb-14 pt-24 md:pb-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* LEFT: Text (appears first on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 md:order-1"
          >
            {/* Location badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-amber-300/90 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
              {HERO.location}
            </div>

            {/* Headline */}
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-stone-100 sm:text-5xl md:text-6xl">
              Handcrafted Cakes &amp;{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Fresh Bakes
              </span>{" "}
              — Made Daily.
            </h1>

            {/* Subheadline */}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-300/90 md:text-lg">
              {HERO.subheadline}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={HERO.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-6 py-3.5 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110 md:px-7"
              >
                {HERO.primaryCta.label}
              </a>
              <a
                href={HERO.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-stone-100 backdrop-blur transition hover:bg-white/10 md:px-7"
              >
                {HERO.secondaryCta.label}
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-3.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
              >
                <span aria-hidden="true">💬</span>
                WhatsApp
              </a>
            </div>

            {/* Trust strip — factual claims only, no fake stats */}
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-400">
              <li className="inline-flex items-center gap-1.5">
                <span aria-hidden="true">🥚</span> Eggless Available
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span aria-hidden="true">🕗</span> Baked Fresh Daily
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span aria-hidden="true">🚚</span> Home Delivery
              </li>
            </ul>
          </motion.div>

          {/* RIGHT: Hero image (appears first on mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="order-1 md:order-2"
          >
            <div className="relative mx-auto max-w-md md:max-w-none">
              {/* Soft glow behind image */}
              <div
                className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-amber-500/20 via-rose-500/10 to-transparent blur-3xl"
                aria-hidden="true"
              />

              {/* Image card */}
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#1a120a]/60 shadow-2xl shadow-black/40">
                <div className="relative aspect-[4/3] w-full md:aspect-[4/5]">
                  <Image
                    src={HERO.heroImage}
                    alt={HERO.heroImageAlt}
                    fill
                    sizes="(max-width: 768px) 90vw, 50vw"
                    priority
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#140d08]/60 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>

                {/* Bestseller tag */}
                <div className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-stone-950 shadow-lg">
                  ★ {HERO.imageBadge}
                </div>

                {/* Price chip */}
                <div className="absolute bottom-4 right-4 rounded-2xl border border-white/10 bg-[#140d08]/85 px-4 py-2 backdrop-blur">
                  <p className="text-[10px] uppercase tracking-widest text-stone-400">From</p>
                  <p className="text-xl font-bold text-amber-400">{HERO.priceFrom}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}