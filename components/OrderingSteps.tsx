"use client";

import { motion } from "framer-motion";
import { Bike, Store, Zap, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STEPS = [
  { n: "01", t: "Choose Your Cake", d: "Browse cakes, pastries & snacks." },
  { n: "02", t: "Message on WhatsApp", d: "Tell us what you need & when." },
  { n: "03", t: "We Confirm", d: "Price, availability & details — quickly." },
  { n: "04", t: "Pickup or Delivery", d: "Collect fresh, or get it delivered." },
];

const CHIPS = [
  { Icon: Bike, label: "Local delivery" },
  { Icon: Store, label: "Store pickup" },
  { Icon: Zap, label: "Same-day on request" },
];

export default function OrderingSteps() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-chocolate p-8 shadow-pastry-lg md:p-12">
        {/* Subtle grain texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Header */}
        <div className="relative mb-10 text-center md:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-eyebrow uppercase text-caramel"
          >
            Simple & Direct
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-3 font-display text-section font-bold text-cream"
          >
            How <span className="italic text-caramel">Ordering</span> Works
          </motion.h2>
        </div>

        {/* Steps grid with connector lines */}
        <div className="relative grid gap-8 md:grid-cols-4 md:gap-6">
          {/* Connector lines (desktop only) */}
          <div className="absolute inset-x-0 top-8 hidden md:block" aria-hidden="true">
            <div className="mx-auto h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-caramel/20 to-transparent" />
          </div>

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              className="relative text-center md:text-left"
            >
              {/* Number circle */}
              <div className="relative mb-4 inline-flex items-center justify-center">
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-caramel/30 bg-chocolate">
                  <span className="font-display text-2xl font-extrabold text-caramel tabular-nums">
                    {s.n}
                  </span>
                </span>
                {/* Pulse ring (subtle) */}
                <span className="absolute inset-0 animate-ping rounded-full border border-caramel/20" style={{ animationDuration: "2.5s" }} />
              </div>

              <h3 className="font-display text-lg font-bold text-cream md:text-xl">
                {s.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70 md:text-base">
                {s.d}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer row */}
        <div className="relative mt-10 flex flex-col items-center justify-between gap-6 border-t border-cream/10 pt-8 md:flex-row md:mt-12">
          {/* Chips with Lucide icons */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {CHIPS.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 text-xs font-bold text-cream/90 backdrop-blur-sm"
              >
                <c.Icon className="h-3.5 w-3.5 text-caramel" aria-hidden="true" />
                {c.label}
              </span>
            ))}
          </div>

          {/* CTA button */}
          <motion.a
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
            href={waLink("Hi! Please share delivery availability for my area.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bronze to-caramel px-7 py-3.5 text-sm font-bold text-cream shadow-bronze transition-all duration-300 ease-[var(--ease-lux)] hover:shadow-pastry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-chocolate"
          >
            Check Availability on WhatsApp
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
}