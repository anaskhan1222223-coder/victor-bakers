"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import { waLink } from "@/lib/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
    <section id="faq" className="relative z-10 border-t border-border bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          {/* Left — sticky intro + help card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="lg:sticky lg:top-32">
              <p className="text-eyebrow uppercase text-caramel">Good to know</p>
              <h2 className="mt-3 font-display text-section font-bold text-chocolate">
                Questions, answered.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mocha md:text-lg">
                Everything people usually ask us before ordering. Still unsure about something? We reply fast on WhatsApp.
              </p>

              <div className="mt-8 rounded-3xl border border-border bg-cream p-6 shadow-pastry">
                <p className="font-display text-base font-bold text-chocolate">
                  Still have a question?
                </p>
                <p className="mt-1 text-sm text-mocha">
                  Message us — we usually reply within minutes during store hours.
                </p>
                <a
                  href={waLink("Hi! I have a question about your cakes.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-bronze to-caramel px-6 py-3 text-sm font-bold text-cream shadow-bronze transition-all duration-300 hover:shadow-pastry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — editorial accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="divide-y divide-border border-y border-border"
          >
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2"
                  >
                    <span
                      className={`font-display text-base font-bold transition-colors duration-300 md:text-lg ${
                        isOpen ? "text-caramel" : "text-chocolate group-hover:text-caramel"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        isOpen
                          ? "border-caramel bg-caramel text-cream"
                          : "border-border text-caramel group-hover:border-caramel"
                      }`}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-4 text-base leading-relaxed text-mocha md:pr-12">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}