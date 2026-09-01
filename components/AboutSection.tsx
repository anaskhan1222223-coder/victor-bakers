"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STATS = [
  { value: "1995", label: "Serving since" },
  { value: "30+", label: "Years of trust" },
  { value: "40+", label: "Fresh items daily" },
  { value: "4.2★", label: "1,500+ happy ratings" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 bg-[#fff8f0] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl">
              <Image
                src="/images/paneer-puff.jpg"
                alt="Fresh bakes at Victor Baker's"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-4 rounded-2xl bg-[#8B5A2B] px-6 py-4 text-white shadow-xl md:-right-4">
              <p className="text-2xl font-extrabold">Since 1995</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                Tri Nagar, Delhi
              </p>
            </div>
          </motion.div>

          {/* Story side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-sm font-bold uppercase tracking-widest text-[#8B5A2B]">
              Our Story
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#3e2723] md:text-5xl">
              A neighbourhood bakery,{" "}
              <span className="text-[#8B5A2B]">three decades</span> in the making.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5d4037]">
              What started as a small family oven in Onkar Nagar is today a daily
              stop for cakes, pastries and snacks across Tri Nagar. We bake fresh
              every morning — honest recipes, fair prices and the same warm
              service since day one.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#5d4037]">
              Birthdays, weddings or a simple evening craving — we&apos;re here for all of it.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[#E6DFD3] bg-white p-4 text-center"
                >
                  <p className="text-xl font-extrabold text-[#8B5A2B]">{s.value}</p>
                  <p className="mt-1 text-xs font-semibold text-[#5d4037]">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}