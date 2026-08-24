import { GOOGLE_LINK, GOOGLE_RATING, REVIEWS } from "@/lib/reviews";

/* All points below are verifiable business facts — no invented claims */
const TRUST_POINTS = [
  { icon: "🥚", title: "Eggless Available", text: "Eggless cakes for birthdays & special events." },
  { icon: "🎨", title: "Custom Cakes", text: "Birthday, wedding, anniversary & photo cakes." },
  { icon: "🏪", title: "Local Store", text: "Onkar Nagar, Tri Nagar — easy to find & reach." },
  { icon: "🕗", title: "Open 8 AM – 10 PM", text: "Fresh bakes available through the day." },
  { icon: "💬", title: "Order Direct", text: "Call or WhatsApp — no delivery-app middleman." },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="text-sm tracking-widest text-amber-400" aria-label={`Rated ${n} out of 5`}>
      {"★".repeat(Math.max(0, Math.min(5, n)))}
      {"☆".repeat(5 - Math.max(0, Math.min(5, n)))}
    </span>
  );
}

export default function TrustSection() {
  return (
    <section id="trust" className="mx-auto max-w-7xl px-4 py-16">
      {/* ---------- WHY CUSTOMERS CHOOSE ---------- */}
      <div className="mb-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">
          Trust & Care
        </p>
        <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">
          Why Customers Choose{" "}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            Victor Baker&apos;s
          </span>
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {TRUST_POINTS.map((point) => (
          <div
            key={point.title}
            className="rounded-3xl border border-white/10 bg-[#1a120a]/90 p-6 transition hover:border-amber-500/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-2xl">
              {point.icon}
            </div>
            <h3 className="mt-4 text-sm font-extrabold text-stone-100">
              {point.title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-stone-400">
              {point.text}
            </p>
          </div>
        ))}
      </div>

      {/* ---------- CUSTOMER REVIEWS ---------- */}
      <div className="mt-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-extrabold text-[#3e2723] md:text-3xl">
              Customer Reviews
            </h3>
            {GOOGLE_RATING ? (
              <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-bold text-amber-300">
                ★ {GOOGLE_RATING.score} · {GOOGLE_RATING.count} reviews on Google
              </p>
            ) : (
              <p className="mt-2 text-sm text-stone-400">
                Honest words from real customers.
              </p>
            )}
          </div>

          <a
            href={GOOGLE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-stone-100 transition hover:border-amber-500/50 hover:text-amber-400"
          >
            See us on Google ↗
          </a>
        </div>

        {REVIEWS.length > 0 ? (
          /* Real reviews render here automatically once added in lib/reviews.ts */
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review, i) => (
              <figure
                key={i}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-[#1a120a]/90 p-6"
              >
                <Stars n={review.rating} />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-stone-300">
                  “{review.text}”
                </blockquote>
                {(review.name || review.source) && (
                  <figcaption className="mt-4 text-xs font-semibold text-stone-500">
                    {review.name ?? "A customer"}
                    {review.source ? ` · ${review.source}` : ""}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        ) : (
          /* Honest placeholder — no fake testimonials, ever */
          <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.03] p-10 text-center md:p-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-2xl">
              ⭐
            </div>
            <h4 className="mt-4 text-xl font-extrabold text-[#3e2723]">
              Loved your cake? Tell your neighbours.
            </h4>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-400">
              Real Google reviews from our customers will appear here. Until
              then, read and share honest experiences directly on Google.
            </p>
            <a
              href={GOOGLE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3.5 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/20 transition hover:brightness-110"
            >
              See us on Google
            </a>
          </div>
        )}
      </div>
    </section>
  );
}