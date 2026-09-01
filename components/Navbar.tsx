"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BAKERY_CONFIG, callLink, waLink } from "@/lib/config";

const MENU_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Cakes & Bestsellers" },
  { href: "#occasions", label: "Shop by Occasion" },
  { href: "#custom-order", label: "Custom Cakes" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "Our Story" },
  { href: "#trust", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#location", label: "Visit Us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Announcement strip — collapses on scroll */}
        <div className={`overflow-hidden transition-all duration-300 ${scrolled ? "max-h-0" : "max-h-10"}`}>
          <div className="bg-[#2C241B] px-4 py-2 text-center text-xs font-semibold tracking-wide text-[#FDFBF7] md:text-sm">
            🕗 Open 8 AM – 10 PM · Fresh stock baked daily ·{" "}
            <a
              href={waLink("Hi! I'd like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#C88A58] decoration-2 underline-offset-2 hover:text-[#C88A58]"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>

        {/* Nav row */}
        <div className={`transition-all duration-300 ${scrolled ? "border-b border-[#E6DFD3] bg-[#FDFBF7]/95 py-3 shadow-sm backdrop-blur-md" : "bg-transparent py-4 md:py-5"}`}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
            <Link href="#home" className={`font-display text-2xl font-bold tracking-tight ${scrolled ? "text-[#2C241B]" : "text-[#FDFBF7]"}`}>
              {BAKERY_CONFIG.name}
            </Link>

            <div className="flex items-center gap-3">
              <a
                href={waLink("Hi! I'd like to place an order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full bg-[#8B5A2B] px-5 py-2.5 text-sm font-bold text-[#FDFBF7] shadow-md transition-colors hover:bg-[#704822] sm:inline-block"
              >
                Order Now
              </a>

              {/* THE 3-LINE BUTTON */}
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
                  scrolled
                    ? "border-[#E6DFD3] bg-white text-[#2C241B] hover:border-[#8B5A2B]"
                    : "border-white/30 bg-white/10 text-[#FDFBF7] backdrop-blur hover:bg-white/20"
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 5h14M3 10h14M3 15h14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MENU OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-[#2C241B]"
          >
            <div className="flex h-full flex-col overflow-y-auto">
              {/* Top row */}
              <div className="flex items-center justify-between px-5 py-5">
                <span className="font-display text-2xl font-bold text-[#FDFBF7]">
                  {BAKERY_CONFIG.name}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-[#FDFBF7] transition hover:bg-white/10"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4l10 10M4 14L14 4" />
                  </svg>
                </button>
              </div>

              {/* All sections — numbered, editorial style */}
              <nav className="mx-auto grid w-full max-w-4xl flex-1 content-center gap-x-12 px-6 py-8 sm:grid-cols-2">
                {MENU_LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 border-b border-white/10 py-4"
                    >
                      <span className="text-xs font-bold text-[#C88A58]">0{i + 1}</span>
                      <span className="font-display text-2xl font-bold text-[#FDFBF7] transition-colors group-hover:text-[#C88A58]">
                        {l.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom actions */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mx-auto w-full max-w-4xl px-6 pb-10"
              >
                <div className="grid grid-cols-2 gap-3">
                  <a href={callLink()} className="rounded-full border-2 border-[#C88A58] px-4 py-3.5 text-center text-sm font-bold text-[#C88A58] transition hover:bg-[#C88A58]/10">
                    📞 Call Us
                  </a>
                  <a
                    href={waLink("Hi! I'd like to place an order.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#C88A58] px-4 py-3.5 text-center text-sm font-bold text-[#2C241B] transition hover:bg-[#b37545]"
                  >
                    💬 Order on WhatsApp
                  </a>
                </div>
                <p className="mt-6 text-center text-xs text-[#FDFBF7]/50">
                  {BAKERY_CONFIG.address}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}