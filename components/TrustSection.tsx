"use client";

import { motion } from "framer-motion";
import { Wheat, PartyPopper, Egg, Palette, MessageCircle, Zap, Star, ArrowUpRight } from "lucide-react";
import { REVIEW_CONFIG, TESTIMONIALS } from "@/lib/reviews";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const POINTS = [
  { Icon: Wheat, title: "Freshly Baked", text: "Made fresh so every bite tastes better." },
  { Icon: PartyPopper, title: "Made for Your Celebration", text: "Birthday, anniversary, wedding or everyday craving." },
  { Icon: Egg, title: "Eggless Options", text: "Delicious choices for every preference." },
  { Icon: Palette, title: "Custom Designs", text: "Your idea or reference photo, turned into a cake." },
  { Icon: MessageCircle, title: "Easy Direct Ordering", text: "Speak directly with the bakery on WhatsApp." },
  { Icon: Zap, title: "Fast Response", text: "Quick confirmation of price & availability." },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`Rated ${n} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={i <= n ? "#B47A45" : "none"}
          stroke="#B47A45"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
        </svg>
      ))}
    </span>
  );
}

export default function TrustSection() {
  return (
    <section id="trust" className="relative z-10 border-t border-border bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Why us — editorial numbered rows */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <div className="self-start lg:sticky lg:top-28">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-eyebrow uppercase text-caramel"
            >
              Why Victor Baker&apos;s
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              className="mt-3 font-display text-section font-bold text-chocolate"
            >
              A bakery Tri Nagar has <span className="italic text-caramel">trusted</span> for decades.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
              className="mt-4 text-base leading-relaxed text-mocha md:text-lg"
            >
              No shortcuts — just honest bakes, fair prices and warm service, every single day.
            </motion.p>
          </div>

          <div className="grid gap-x-10 sm:grid-cols-2">
            {POINTS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
                className="group border-t border-border py-5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-caramel">0{i + 1}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-caramel-soft text-caramel transition-colors duration-300 group-hover:bg-caramel group-hover:text-cream">
                    <p.Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-bold text-chocolate">{p.title}</h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-mocha">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reviews wall */}
        <div className="mt-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-section font-bold text-chocolate">Loved by our customers</h3>
              {REVIEW_CONFIG.showBadge && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-caramel/30 bg-caramel-soft px-4 py-1.5 text-sm font-bold text-caramel">
                  ★ {REVIEW_CONFIG.score} · {REVIEW_CONFIG.countLabel}
                </p>
              )}
            </div>
            <a
              href={REVIEW_CONFIG.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-bold text-bronze transition-colors hover:text-caramel"
            >
              {REVIEW_CONFIG.linkLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((r, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-xl border border-border bg-cream p-6 transition-shadow duration-300 hover:shadow-pastry"
              >
                <Stars n={r.rating} />
                <blockquote className="mt-3 flex-1 text-[15px] font-medium leading-relaxed text-chocolate">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm font-bold text-mocha">
                  {r.name}
                  {r.meta && <span className="font-medium text-mocha/70"> · {r.meta}</span>}
                </figcaption>
              </motion.figure>
            ))}

            {/* Honest CTA tile */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: EASE, delay: TESTIMONIALS.length * 0.06 }}
              className="flex h-full flex-col justify-between rounded-xl bg-chocolate p-6"
            >
              <p className="font-display text-lg font-bold text-cream">Tried our cakes recently?</p>
              <p className="mt-2 text-sm text-cream/70">Your words help neighbours discover us.</p>
              <a
                href={REVIEW_CONFIG.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-caramel px-5 py-3 text-center text-sm font-bold text-cream transition-colors hover:bg-bronze"
              >
                <Star className="h-4 w-4" aria-hidden="true" />
                Rate us on Google
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}