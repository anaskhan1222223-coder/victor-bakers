"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-24 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-rose-200 bg-white text-lg text-rose-500 shadow-lg shadow-rose-100 transition hover:scale-110 md:bottom-6"
    >
      ↑
    </button>
  );
}