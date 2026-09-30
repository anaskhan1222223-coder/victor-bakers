"use client";

import { motion } from "framer-motion";
import { Star, Phone, Clock, MessageCircle, MapPin } from "lucide-react";
import { SITE, callLink, waLink } from "@/lib/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Brand glyphs — lucide-react removed brand icons, so we inline them (version-proof) */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// ── EDIT PER CLIENT ─────────────────────────────────────────
// Paste real URLs below. Leave "" and the icon hides automatically.
const SOCIALS = {
  instagram: "",
  facebook: "",
  google: "https://www.google.com/maps/search/?api=1&query=Victor+Baker%27s+Tri+Nagar+Delhi",
};
// ────────────────────────────────────────────────────────────

const LINKS = [
  { href: "#menu", label: "Cakes & Bestsellers" },
  { href: "#occasions", label: "Shop by Occasion" },
  { href: "#custom-order", label: "Custom Cakes" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "Our Story" },
  { href: "#faq", label: "FAQ" },
];

export default function Footer() {
  const open = new Date().getHours() >= 8 && new Date().getHours() < 22;

  return (
    <footer className="relative z-10 overflow-hidden bg-chocolate text-cream">
      {/* Film grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-caramel/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 md:pb-14 md:pt-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="font-display text-2xl font-bold text-cream">{SITE.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-cream/60">
              A neighbourhood bakery crafting fresh cakes, pastries and snacks every day — for birthdays, weddings and daily cravings.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.google && (
                <a
                  href={SOCIALS.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition-all duration-300 hover:border-caramel hover:bg-caramel hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-chocolate"
                  aria-label="Google Reviews"
                >
                  <Star className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              {SOCIALS.instagram && (
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition-all duration-300 hover:border-caramel hover:bg-caramel hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-chocolate"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
              {SOCIALS.facebook && (
                <a
                  href={SOCIALS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition-all duration-300 hover:border-caramel hover:bg-caramel hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-chocolate"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
          >
            <h4 className="text-eyebrow uppercase text-caramel">Quick Links</h4>
            <div className="mt-4 grid gap-2.5 text-sm font-semibold text-cream/75">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-caramel focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-caramel focus-visible:ring-offset-1 focus-visible:ring-offset-chocolate"
                >
                  <span className="h-1 w-1 rounded-full bg-caramel/50" />
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <h4 className="text-eyebrow uppercase text-caramel">Visit Us</h4>
            <div className="mt-4 space-y-3">
              <p className="flex items-start gap-2 text-sm leading-relaxed text-cream/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-caramel" aria-hidden="true" />
                <span>{SITE.address}</span>
              </p>
              <p className="flex items-center gap-2 text-sm text-cream/75">
                <Phone className="h-4 w-4 text-caramel" aria-hidden="true" />
                <span>{SITE.phoneDisplay}</span>
              </p>
              <p className="flex items-center gap-2 text-sm text-cream/75">
                <Clock className="h-4 w-4 text-caramel" aria-hidden="true" />
                <span>{SITE.timing}</span>
              </p>
            </div>
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-3 py-1.5 text-xs font-bold backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                    open ? "bg-emerald-400" : "bg-red-400"
                  }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    open ? "bg-emerald-400" : "bg-red-400"
                  }`}
                />
              </span>
              <span className={open ? "text-emerald-300" : "text-red-300"}>
                {open ? "Open now · closes 10 PM" : "Closed · opens 8 AM"}
              </span>
            </motion.p>
          </motion.div>

          {/* Order */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            <h4 className="text-eyebrow uppercase text-caramel">Order Direct</h4>
            <p className="mt-4 text-sm text-cream/60">No middlemen, no apps — talk to us directly.</p>
            <div className="mt-4 grid gap-3">
              <a
                href={waLink("Hi! I'd like to place an order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-bronze to-caramel px-5 py-3 text-center text-sm font-bold text-cream shadow-bronze transition-all duration-300 hover:shadow-pastry focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-chocolate"
              >
                <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                Order on WhatsApp
              </a>
              <a
                href={callLink()}
                className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-caramel px-5 py-3 text-center text-sm font-bold text-caramel transition-all duration-300 hover:bg-caramel hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-chocolate"
              >
                <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                Call the Bakery
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/45 md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>
            Designed & developed by <span className="text-caramel">Anas Khan</span> · +91 9315650503
          </p>
        </div>
      </div>
    </footer>
  );
}