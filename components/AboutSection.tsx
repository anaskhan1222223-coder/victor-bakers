"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// VERIFIED FACTS ONLY — do not fabricate
const STATS = [
  { value: "1995", label: "Serving since" },
  { value: "30+", label: "Years of trust" },
  { value: "40+", label: "Fresh items daily" },
  { value: "4.2★", label: "1,500+ happy ratings" },
];

const TIMELINE = [
  { year: "1995", text: "A small family oven opens in Onkar Nagar — just a few loaves a day." },
  { year: "2000s", text: "Word spreads across Tri Nagar. Birthday cakes become our signature." },
  { year: "2010s", text: "We add pastries, puffs and custom celebration cakes to the menu." },
  { year: "Today", text: "Still family-run, still baking fresh every morning — three decades strong." },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-cream py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* LEFT — Story with timeline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-eyebrow uppercase text-caramel"
            >
              Our Story
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              className="mt-3 font-display text-section font-bold leading-tight text-chocolate"
            >
              A neighbourhood bakery,{" "}
              <span className="italic text-caramel">three decades</span> in the making.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
              className="mt-6 text-base leading-relaxed text-mocha md:text-lg"
            >
              What started as a small family oven in Onkar Nagar is today a daily stop for
              cakes, pastries and snacks across Tri Nagar. We bake fresh every morning —
              honest recipes, fair prices and the same warm service since day one.
            </motion.p>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
              className="mt-10 border-l-2 border-caramel/20 pl-6"
            >
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.08 }}
                  className="relative mb-6 last:mb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[29px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-cream bg-caramel">
                    <div className="h-1.5 w-1.5 rounded-full bg-cream" />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-widest text-caramel">
                    {t.year}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-mocha md:text-base">
                    {t.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-surface p-4 text-center transition-shadow duration-300 hover:shadow-pastry"
                >
                  <p className="font-display text-xl font-extrabold text-caramel tabular-nums">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-mocha">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Image with parallax */}
          <div className="relative lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative"
              style={{ y: imageY }}
            >
              {/* Main image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-pastry-lg md:aspect-[3/4]">
                <Image
                  src="/images/paneer-puff.jpg"
                  alt="Fresh bakes at Victor Baker's"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                {/* Warm overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/20 via-transparent to-transparent" />
              </div>

              {/* "Since 1995" badge — editorial positioning */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
                className="absolute -bottom-6 right-4 rounded-2xl bg-bronze px-6 py-4 text-cream shadow-bronze md:-right-4"
              >
                <p className="font-display text-2xl font-extrabold">Since 1995</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-cream/80">
                  Tri Nagar, Delhi
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}