"use client";

import { motion } from "framer-motion";
import { waLink } from "@/lib/site";

const STEPS = [
  { n: "01", t: "Choose Your Cake", d: "Browse cakes, pastries & snacks." },
  { n: "02", t: "Message on WhatsApp", d: "Tell us what you need & when." },
  { n: "03", t: "We Confirm", d: "Price, availability & details — quickly." },
  { n: "04", t: "Pickup or Delivery", d: "Collect fresh, or get it delivered." },
];

export default function OrderingSteps() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-14 md:py-16">
      <div className="rounded-[2rem] bg-[#2C241B] p-8 shadow-2xl md:p-12">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C88A58]">Simple & Direct</p>
          <h2 className="mt-3 text-3xl font-extrabold text-[#FDFBF7] md:text-4xl">How Ordering Works</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <p className="text-4xl font-extrabold text-[#C88A58]">{s.n}</p>
              <h3 className="mt-2 text-lg font-bold text-[#FDFBF7]">{s.t}</h3>
              <p className="mt-1 text-sm text-[#FDFBF7]/70">{s.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {["🛵 Local delivery", "🏪 Store pickup", "⚡ Same-day on request"].map((c) => (
              <span key={c} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-[#FDFBF7]/90">
                {c}
              </span>
            ))}
          </div>
          <a
            href={waLink("Hi! Please share delivery availability for my area.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#C88A58] px-7 py-3.5 text-sm font-bold text-[#2C241B] shadow-lg transition-colors hover:bg-[#b37545]"
          >
            Check Availability on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}