"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export default function StatCounter({
  value,
  suffix = "",
  decimals = 0,
  label,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.6,
      onUpdate: (v) => {
        if (!ref.current) return;
        ref.current.textContent = decimals
          ? v.toFixed(decimals) + suffix
          : Math.round(v).toLocaleString("en-IN") + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, decimals]);

  return (
    <div className="text-center">
      <span ref={ref} className="text-2xl font-extrabold text-amber-400 md:text-3xl">
        0
      </span>
      <p className="mt-1 text-xs uppercase tracking-widest text-stone-400">{label}</p>
    </div>
  );
}