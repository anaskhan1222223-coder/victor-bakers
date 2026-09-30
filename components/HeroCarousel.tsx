"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { waLink } from "@/lib/config";

const SLIDES = [
  { image: "/images/wedding-cake.jpg", quote: "Made for your big day", label: "Wedding Cakes", price: "₹1,499/kg" },
  { image: "/images/chocolate-truffle-cake.jpg", quote: "Magic in every wish", label: "Birthday Cakes", price: "₹899/kg" },
  { image: "/images/red-velvet-cake.jpg", quote: "Love at first bite", label: "Red Velvet Specials", price: "₹999/kg" },
  { image: "/images/black-forest-cake.jpg", quote: "A classic that never fails", label: "Eggless Wonders", price: "₹799/kg" },
  { image: "/images/pineapple-cake.jpg", quote: "Your memories, baked sweet", label: "Photo Cakes", price: "₹949/kg" },
  { image: "/images/blueberry-cheesecake.jpg", quote: "Creamy dreams come true", label: "Cheesecakes", price: "₹1,299/kg" },
  { image: "/images/baby-shower-cake.jpg", quote: "Cleverly crafted for little ones", label: "Baby Shower Cakes", price: "₹1,199/kg" },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D tilt on mouse move (desktop)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 100, mass: 0.8 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = () => setIndex((i) => (i + 1) % SLIDES.length);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !containerRef.current || reduce) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 40;
    const y = (e.clientY - rect.top - rect.height / 2) / 40;
    mouseX.set(x);
    mouseY.set(-y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const slide = SLIDES[index];

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-br from-[#FFF9F0] via-[#F8F4ED] to-[#F1E6D6] pb-16 pt-24 md:pb-0 md:pt-0"
      style={{ perspective: "1200px" }}
    >
      {/* AMBIENT BACKGROUND — warm light: soft caramel spotlight + grain */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel/20 blur-[120px] md:left-[60%] md:h-[120vh] md:w-[120vh]" />
        <div className="absolute bottom-0 right-0 h-[60vh] w-[60vh] rounded-full bg-rose-300/20 blur-[100px]" />
        <div className="absolute left-0 top-0 h-[50vh] w-[50vh] rounded-full bg-amber-200/30 blur-[100px]" />
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
        }} />
        {/* Subtle floating decorative elements */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] top-[15%] hidden text-5xl opacity-25 md:block"
        >
          🍰
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[12%] top-[20%] hidden text-4xl opacity-20 md:block"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ y: [-8, 12, -8], rotate: [0, 6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[18%] left-[10%] hidden text-4xl opacity-20 md:block"
        >
          🎂
        </motion.div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto flex h-full min-h-[100svh] max-w-7xl flex-col items-center justify-center px-5 md:flex-row md:gap-10 md:px-8 md:py-16"
        >
          {/* LEFT — TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative z-10 order-2 w-full text-center md:order-1 md:w-1/2 md:text-left"
          >
            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-caramel/40 bg-caramel-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-caramel backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-caramel opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-caramel" />
              </span>
              {slide.label} · Tri Nagar
            </motion.div>

            {/* Headline — espresso ink on cream */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-display text-4xl font-bold italic leading-[1.05] text-chocolate sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {slide.quote}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mx-auto mt-5 max-w-md text-sm text-mocha md:mx-0 md:text-base"
            >
              Freshly baked moments, made just for you. Cakes, pastries & snacks for every celebration — handcrafted daily at Victor Baker's.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
            >
              <a
                href="#custom"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-bronze to-caramel px-7 py-3.5 text-sm font-bold text-cream shadow-[0_8px_30px_-8px_rgb(139_90_43/0.5)] transition-all hover:shadow-[0_12px_40px_-8px_rgb(139_90_43/0.7)] md:px-8 md:py-4"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Order Custom Cake
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-caramel-deep to-bronze-hover transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a
                href={waLink("Hi, I'd like to know more about your menu.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-chocolate/20 bg-white/70 px-6 py-3.5 text-sm font-bold text-chocolate backdrop-blur-sm transition-all hover:border-chocolate/40 hover:bg-white md:px-7 md:py-4"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.78.47 3.45 1.29 4.89L2 22l5.25-1.38C8.62 21.51 10.25 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
                WhatsApp
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-mocha md:justify-start"
            >
              <li className="flex items-center gap-1.5"><span className="text-caramel">●</span> Baked Fresh Daily</li>
              <li className="flex items-center gap-1.5"><span className="text-caramel">●</span> Eggless Options</li>
              <li className="flex items-center gap-1.5"><span className="text-caramel">●</span> Same-Day Delivery</li>
            </motion.ul>
          </motion.div>

          {/* RIGHT — IMAGE STAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 mb-8 w-full md:order-2 md:mb-0 md:w-1/2"
            style={{
              rotateX: isDesktop ? rotateX : 0,
              rotateY: isDesktop ? rotateY : 0,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="relative mx-auto max-w-sm md:max-w-lg">
              {/* WARM GLOW BEHIND CAKE */}
              <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-br from-caramel/35 via-amber-200/30 to-transparent blur-3xl" />

              {/* CAKE IMAGE — floating */}
              <motion.div
                animate={reduce ? {} : { y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
                style={{ transform: "translateZ(40px)" }}
              >
                <Image
                  src={slide.image}
                  alt={`${slide.label} at Victor Baker's`}
                  width={600}
                  height={600}
                  priority={index === 0}
                  className="relative z-10 h-auto w-full drop-shadow-[0_30px_40px_rgba(139,90,43,0.35)]"
                />
              </motion.div>

              {/* PEDESTAL SHADOW */}
              <div className="absolute bottom-[-20px] left-1/2 z-0 h-6 w-3/4 -translate-x-1/2 rounded-[50%] bg-bronze/30 blur-2xl" />

              {/* FLOATING BADGES */}
              <motion.div
                animate={reduce ? {} : { y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute left-[-4%] top-[15%] z-20 rounded-2xl border border-chocolate/10 bg-white/80 px-3 py-2 shadow-pastry backdrop-blur-md md:left-[-12%]"
                style={{ transform: "translateZ(60px)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-mocha">Bestseller</p>
                    <p className="text-xs font-bold text-chocolate">1,587+ Orders</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={reduce ? {} : { y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[-3%] top-[45%] z-20 rounded-2xl bg-gradient-to-br from-bronze to-caramel px-4 py-3 text-right shadow-bronze backdrop-blur-md md:right-[-15%]"
                style={{ transform: "translateZ(80px)" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-cream/80">Starting from</p>
                <p className="font-display text-xl font-bold text-cream">{slide.price}</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows (desktop only) */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-chocolate/15 bg-white/70 text-chocolate backdrop-blur-md transition-all hover:border-caramel hover:text-caramel md:flex"
      >
        ❮
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-chocolate/15 bg-white/70 text-chocolate backdrop-blur-md transition-all hover:border-caramel hover:text-caramel md:flex"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2 md:bottom-12">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-caramel" : "w-2 bg-chocolate/20 hover:bg-chocolate/40"
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute right-6 top-28 z-30 hidden font-mono text-xs text-mocha/60 md:block">
        <span className="text-caramel">{String(index + 1).padStart(2, "0")}</span>
        <span className="mx-1">/</span>
        <span>{String(SLIDES.length).padStart(2, "0")}</span>
      </div>

      {/* Wave into next section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block w-full">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="#F8F4ED" />
        </svg>
      </div>
    </section>
  );
}