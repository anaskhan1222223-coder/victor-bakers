interface BakeryInfo {
  name: string;
  phone: string;
  phoneDisplay: string;
  address: string;
  timing: string;
}

export default function LocationSection({ bakery }: { bakery: BakeryInfo }) {
  const mapQuery = `${bakery.name}, ${bakery.address}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&output=embed`;
  const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    mapQuery
  )}`;
  const googleSearchLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapQuery
  )}`;
  const callLink = `tel:+${bakery.phone}`;
  const waLink = `https://wa.me/${bakery.phone}?text=${encodeURIComponent(
    `Hi, I want to order from ${bakery.name}.`
  )}`;

  // ⚠️ Structured data — address/timings from BAKERY constant (verified).
  // ⚠️ geo coordinates below are approximate; replace with exact lat/lng
  //    from the owner's Google Business Profile or Google Maps "Share" link.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: bakery.name,
    image: "/images/chocolate-truffle-cake.jpg",
    telephone: `+${bakery.phone}`,
    priceRange: "₹",
    servesCuisine: ["Bakery", "Cakes", "Pastries", "Eggless Options"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "736/39, Onkar Nagar, Shambhu Nagar",
      addressLocality: "Tri Nagar",
      addressRegion: "Delhi",
      postalCode: "110052",
      addressCountry: "IN",
    },
    // TODO: replace with exact coordinates once verified
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6696,
      longitude: 77.1446,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
    url: "https://victor-bakers.vercel.app",
  };

  return (
    <section
      id="location"
      className="mx-auto max-w-7xl px-4 py-14"
      aria-label="Bakery location and contact"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-[#1a120a]/70 shadow-2xl shadow-black/50 backdrop-blur-2xl">
        {/* Header */}
        <div className="border-b border-white/10 px-6 py-8 text-center md:px-12 md:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">
            Find Us
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-stone-100 md:text-5xl">
            Visit{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Victor Baker&apos;s
            </span>
          </h2>
          <p className="mt-2 text-sm text-stone-400 md:text-base">
            Visit us in Tri Nagar, Delhi — freshly baked, just around the corner.
          </p>
        </div>

        {/* MOBILE-FIRST: prominent Get Directions hero */}
        <div className="border-b border-white/10 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-5 md:hidden">
          <a
            href={directionsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 text-base font-extrabold text-stone-950 shadow-xl shadow-amber-900/30"
            aria-label="Get directions to Victor Baker's on Google Maps"
          >
            📍 Get Directions to the Bakery
          </a>
          <p className="mt-3 text-center text-xs text-stone-400">
            Opens Google Maps with the fastest route
          </p>
        </div>

        <div className="grid lg:grid-cols-2">
          {/* Info side */}
          <div className="p-6 md:p-10">
            <div className="space-y-4">
              {/* Address */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-amber-400">
                  📍 Address
                </h3>
                <p className="mt-2 text-base leading-relaxed text-stone-200">
                  {bakery.address}
                </p>
                <a
                  href={googleSearchLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-semibold text-amber-400 hover:underline"
                >
                  View on Google Maps ↗
                </a>
              </div>

              {/* Hours */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-amber-400">
                  🕗 Opening Hours
                </h3>
                <p className="mt-2 text-base text-stone-200">{bakery.timing}</p>
                <p className="mt-1.5 text-xs text-stone-400">
                  Open 7 days a week
                </p>
              </div>

              {/* Contact */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-amber-400">
                  📞 Contact
                </h3>
                <p className="mt-2 text-base text-stone-200">
                  {bakery.phoneDisplay}
                </p>
                <p className="mt-1.5 text-xs text-stone-400">
                  Call or WhatsApp — both on the same number
                </p>
              </div>
            </div>

            {/* Action buttons — desktop primary row */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={callLink}
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-bold text-stone-100 transition hover:border-amber-500/50 hover:text-amber-400 min-[400px]:flex-none min-[400px]:px-6"
                aria-label={`Call ${bakery.phoneDisplay}`}
              >
                📞 Call
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-center text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20 min-[400px]:flex-none min-[400px]:px-6"
                aria-label="Order on WhatsApp"
              >
                💬 WhatsApp
              </a>
              <a
                href={directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden flex-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-3 text-center text-sm font-bold text-stone-950 transition hover:brightness-110 md:block min-[400px]:flex-none min-[400px]:px-6"
                aria-label="Get directions on Google Maps"
              >
                📍 Directions
              </a>
            </div>
          </div>

          {/* Map side */}
          <div className="relative min-h-[320px] border-t border-white/10 lg:border-l lg:border-t-0">
            <iframe
              title={`Map showing location of ${bakery.name} in Tri Nagar, Delhi`}
              src={mapSrc}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}