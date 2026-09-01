"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { waLink } from "@/lib/site";

const FAQS = [
  {
    q: "Do you make eggless cakes?",
    a: "Yes! Every cake can be made eggless on request — just choose the eggless option in the enquiry form or mention it on WhatsApp. Eggless bakes are just as soft and delicious.",
  },
  {
    q: "How early should I order a custom cake?",
    a: "Ideally 24–48 hours in advance. For wedding cakes, large tiers or bulk orders, 3–4 days helps us give you the best finish.",
  },
  {
    q: "Can I share my own cake design?",
    a: "Absolutely! Send us a reference photo on WhatsApp or attach it in the enquiry form, and our bakers will recreate it as close to your dream as possible.",
  },
  {
    q: "Do you offer delivery?",
    a: "Yes — we deliver across Tri Nagar and nearby areas, and store pickup is available any day between 8 AM and 10 PM. Same-day delivery is possible for select items; confirm on WhatsApp.",
  },
  {
    q: "How can I place an order?",
    a: "Three easy ways: message us on WhatsApp, call the store, or send the custom cake enquiry form on this website. We confirm price and availability quickly.",
  },
  {
    q: "Can I customise the flavour or size?",
    a: "Of course. You can mix flavours, choose weights from 0.5 kg to 5 kg (or more for tiered cakes), and add a personal message on the cake.",
  },
  {
    q: "How do I get a price for a custom cake?",
    a: "Share your design, size and date on WhatsApp or the enquiry form — we reply with a clear quote, usually within a few hours.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-10 border-t border-[#E6DFD3] bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          {/* Left — sticky intro + help card */}
          <div>
            <div className="lg:sticky lg:top-32">
              <p className="text-sm font-bold uppercase tracking-widest text-[#8B5A2B]">
                Good to know
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-[#2C241B] md:text-5xl">
                Questions, answered.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#5d4037]">
                Everything people usually ask us before ordering. Still unsure about something? We reply fast on WhatsApp.
              </p>

              <div className="mt-8 rounded-3xl border border-[#E6DFD3] bg-[#fff8f0] p-6">
                <p className="text-base font-bold text-[#2C241B]">Still have a question?</p>
                <p className="mt-1 text-sm text-[#5d4037]">
                  Message us — we usually reply within minutes during store hours.
                </p>
                <a
                  href={waLink("Hi! I have a question about your cakes.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#8B5A2B] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#704822]"
                >
                  💬 Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right — editorial accordion */}
          <div className="divide-y divide-[#E6DFD3] border-y border-[#E6DFD3]">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`text-base font-bold transition-colors md:text-lg ${
                        isOpen ? "text-[#8B5A2B]" : "text-[#2C241B] group-hover:text-[#8B5A2B]"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-[#8B5A2B] bg-[#8B5A2B] text-white"
                          : "border-[#E6DFD3] text-[#8B5A2B] group-hover:border-[#8B5A2B]"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M7 1v12M1 7h12" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-4 text-base leading-relaxed text-[#5d4037] md:pr-12">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}