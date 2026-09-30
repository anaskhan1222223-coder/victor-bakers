"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Egg, Clock, Truck } from "lucide-react";

/* Local hero data — keep in sync with the BAKERY constant in page.tsx */
const HERO = {
  location: "Tri Nagar, Delhi",
  headline: "Handcrafted Cakes & Fresh Bakes — Made Daily.",
  subheadline:
    "From signature birthday cakes to flaky patties and puff items — everything baked fresh every morning at Victor Baker's.",
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
  const waUrl = `https://wa.me/${HERO.whatsapp.phone}?text=${encodeURIComponent(
    HERO.whatsapp.message
  )}`;

  // Subtle parallax on mouse move (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 120, mass: 1 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    mouseX.set(x);
    mouseY.set(-y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative overflow-hidden bg-cream pb-14 pt-24 md:pb-24 md:pt-28">
      {/* Subtle background texture */}
      <div className="bg-grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* LEFT: Text (appears first on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1"
          >
            {/* Location badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-caramel/30 bg-caramel-soft px-4 py-1.5 text-xs font-semibold tracking-wide text-caramel">
              <span className="h-1.5 w-1.5 rounded-full bg-caramel" aria-hidden="true" />
              {HERO.location}
            </div>

            {/* Headline — editorial typography */}
            <h1 className="mt-6 font-display text-[clamp(2.6rem,5.2vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.025em] text-chocolate">
              Handcrafted Cakes &{" "}
              <span className="text-caramel">Fresh Bakes</span> — Made Daily.
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-lg text-base leading-relaxed text-mocha md:text-lg">
              {HERO.subheadline}
            </p>

            {/* CTAs — refined, not loud gradients */}
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={HERO.primaryCta.href}
                className="group inline-flex items-center justify-center rounded-full bg-bronze px-6 py-3.5 text-sm font-bold text-cream shadow-bronze transition-all hover:bg-bronze-hover hover:shadow-pastry md:px-7"
              >
                {HERO.primaryCta.label}
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={HERO.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border-2 border-chocolate px-6 py-3.5 text-sm font-bold text-chocolate transition-all hover:bg-chocolate hover:text-cream md:px-7"
              >
                {HERO.secondaryCta.label}
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-emerald-600 px-5 py-3.5 text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-600 hover:text-cream"
              >
                <span aria-hidden="true">💬</span>
                WhatsApp
              </a>
            </div>

            {/* Trust strip — Lucide icons instead of emojis */}
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-mocha">
              <li className="inline-flex items-center gap-2">
                <Egg className="h-4 w-4 text-caramel" aria-hidden="true" />
                <span>Eggless Available</span>
              </li>
              <li className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-caramel" aria-hidden="true" />
                <span>Baked Fresh Daily</span>
              </li>
              <li className="inline-flex items-center gap-2">
                <Truck className="h-4 w-4 text-caramel" aria-hidden="true" />
                <span>Home Delivery</span>
              </li>
            </ul>
          </motion.div>

          {/* RIGHT: Hero image (appears first on mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 md:order-2"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative mx-auto max-w-md md:max-w-none">
              {/* Soft caramel glow behind image */}
              <div
                className="absolute -inset-10 rounded-[3rem] bg-caramel/15 blur-3xl"
                aria-hidden="true"
              />

              {/* Image card with parallax + subtle floating */}
              <motion.div
                className="card-lift relative overflow-hidden rounded-[2.5rem] border border-border bg-surface shadow-pastry"
                style={{
                  rotateX: isDesktop ? rotateX : 0,
                  rotateY: isDesktop ? rotateY : 0,
                  transformPerspective: 1000,
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
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
                    className="absolute inset-0 bg-gradient-to-t from-chocolate/30 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>

                {/* Bestseller tag — solid bronze, not gradient */}
                <div className="absolute left-4 top-4 rounded-full bg-bronze px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-cream shadow-bronze">
                  ★ {HERO.imageBadge}
                </div>

                {/* Price chip — clean, editorial */}
                <div className="absolute bottom-4 right-4 rounded-2xl border border-border bg-cream/95 px-4 py-2 backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-mocha">
                    From
                  </p>
                  <p className="font-display text-xl font-bold text-bronze">
                    {HERO.priceFrom}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}