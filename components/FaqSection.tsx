"use client";

import { useState } from "react";

const FAQS = [
  { q: "Do you make eggless cakes?", a: "Yes! Every cake can be made eggless on request — just tick the eggless option in the enquiry form or mention it on WhatsApp." },
  { q: "How much advance notice for a custom cake?", a: "Ideally 24–48 hours. For wedding or large tier cakes, 3–4 days helps us give you the best finish." },
  { q: "Do you deliver?", a: "Yes, we deliver across Tri Nagar and nearby areas. You can also pick up from the store any day between 8 AM and 10 PM." },
  { q: "How do I order?", a: "Three easy ways: WhatsApp us, call us, or send the custom cake enquiry form on this website. We confirm price & availability quickly." },
  { q: "Can I share my own cake design?", a: "Absolutely! Send a reference photo on WhatsApp and we'll bake it as close to your dream as possible." },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="mb-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-rose-400">
          Good To Know
        </p>
        <h2 className="mt-3 text-3xl font-extrabold text-[#3e2723] md:text-5xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#1a120a] shadow-lg shadow-rose-100/40"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open === i}
            >
              <span className="text-sm font-bold text-stone-100 md:text-base">{faq.q}</span>
              <span className={`text-xl text-amber-400 transition-transform ${open === i ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
            {open === i && (
              <p className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-stone-400">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}