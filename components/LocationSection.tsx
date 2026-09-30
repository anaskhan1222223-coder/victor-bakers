"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, MessageCircle, Navigation, ExternalLink, Store } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
      className="relative mx-auto max-w-7xl px-4 py-16 md:py-20"
      aria-label="Bakery location and contact"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative overflow-hidden rounded-[3rem] bg-chocolate shadow-pastry-lg">
        {/* Film grain texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Warm ambient glow */}
        <div
          className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-caramel/15 blur-[100px]"
          aria-hidden="true"
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative border-b border-cream/10 px-6 py-8 text-center md:px-12 md:text-left md:py-10"
        >
          <p className="text-eyebrow uppercase text-caramel">Find Us</p>
          <h2 className="mt-3 font-display text-section font-bold text-cream">
            Visit{" "}
            <span className="italic text-caramel">Victor Baker&apos;s</span>
          </h2>
          <p className="mt-2 text-sm text-cream/70 md:text-base">
            Visit us in Tri Nagar, Delhi — freshly baked, just around the corner.
          </p>
        </motion.div>

        {/* MOBILE-FIRST: prominent Get Directions hero */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="relative border-b border-cream/10 bg-gradient-to-r from-caramel/10 to-bronze/10 p-5 md:hidden"
        >
          <a
            href={directionsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-bronze to-caramel px-6 py-4 text-base font-extrabold text-cream shadow-bronze transition-all duration-300 hover:shadow-pastry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-chocolate"
            aria-label="Get directions to Victor Baker's on Google Maps"
          >
            <Navigation className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
            Get Directions to the Bakery
          </a>
          <p className="mt-3 text-center text-xs text-cream/60">
            Opens Google Maps with the fastest route
          </p>
        </motion.div>

        <div className="relative grid lg:grid-cols-2">
          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="p-6 md:p-10"
          >
            <div className="space-y-4">
              {/* Address */}
              <div className="group rounded-3xl border border-cream/10 bg-cream/5 p-5 transition-all duration-300 hover:border-caramel/30 hover:bg-cream/10">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-caramel">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Address
                </h3>
                <p className="mt-2 text-base leading-relaxed text-cream">
                  {bakery.address}
                </p>
                <a
                  href={googleSearchLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-caramel transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-caramel focus-visible:ring-offset-1 focus-visible:ring-offset-chocolate"
                >
                  View on Google Maps
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>

              {/* Hours */}
              <div className="group rounded-3xl border border-cream/10 bg-cream/5 p-5 transition-all duration-300 hover:border-caramel/30 hover:bg-cream/10">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-caramel">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  Opening Hours
                </h3>
                <p className="mt-2 text-base text-cream">{bakery.timing}</p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-cream/70">
                  <span className="flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Open 7 days a week
                </p>
              </div>

              {/* Contact */}
              <div className="group rounded-3xl border border-cream/10 bg-cream/5 p-5 transition-all duration-300 hover:border-caramel/30 hover:bg-cream/10">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-caramel">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Contact
                </h3>
                <p className="mt-2 font-display text-base font-bold text-cream">
                  {bakery.phoneDisplay}
                </p>
                <p className="mt-1.5 text-xs text-cream/70">
                  Call or WhatsApp — both on the same number
                </p>
              </div>
            </div>

            {/* Action buttons — desktop primary row */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={callLink}
                className="flex-1 rounded-full border border-cream/20 bg-cream/5 px-5 py-3 text-center text-sm font-bold text-cream transition-all duration-300 hover:border-caramel hover:text-caramel min-[400px]:flex-none min-[400px]:px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-chocolate"
                aria-label={`Call ${bakery.phoneDisplay}`}
              >
                <Phone className="mr-1.5 inline-block h-4 w-4" aria-hidden="true" />
                Call
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-center text-sm font-bold text-emerald-300 transition-all duration-300 hover:bg-emerald-500/20 min-[400px]:flex-none min-[400px]:px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-chocolate"
                aria-label="Order on WhatsApp"
              >
                <MessageCircle className="mr-1.5 inline-block h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden flex-1 rounded-full bg-gradient-to-r from-bronze to-caramel px-5 py-3 text-center text-sm font-bold text-cream shadow-bronze transition-all duration-300 hover:shadow-pastry md:block min-[400px]:flex-none min-[400px]:px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-chocolate"
                aria-label="Get directions on Google Maps"
              >
                <Navigation className="mr-1.5 inline-block h-4 w-4 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
                Directions
              </a>
            </div>
          </motion.div>

          {/* Map side */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="relative min-h-[320px] border-t border-cream/10 lg:border-l lg:border-t-0"
          >
            <iframe
              title={`Map showing location of ${bakery.name} in Tri Nagar, Delhi`}
              src={mapSrc}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}