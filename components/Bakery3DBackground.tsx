"use client";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* Bokeh depth orbs — radial-gradient falloff (NO blur filters = GPU-cheap) */
const ORBS = [
  // FAR layer (large, slow)
  { s: 260, l: "4%", t: "14%", c: "rgba(180,122,69,0.16)", d: 20, dl: 0 },
  { s: 190, l: "74%", t: "8%", c: "rgba(214,166,112,0.15)", d: 17, dl: 1.4 },
  { s: 220, l: "16%", t: "70%", c: "rgba(180,122,69,0.12)", d: 22, dl: 2.2 },
  // MID layer (smaller, mouse-parallax)
  { s: 110, l: "60%", t: "64%", c: "rgba(244,63,94,0.07)", d: 12, dl: 0.8 },
  { s: 80, l: "44%", t: "30%", c: "rgba(255,214,165,0.20)", d: 10, dl: 3.1 },
  { s: 130, l: "86%", t: "46%", c: "rgba(180,122,69,0.10)", d: 15, dl: 1.0 },
  { s: 64, l: "10%", t: "42%", c: "rgba(255,231,199,0.22)", d: 9, dl: 2.6 },
  { s: 96, l: "32%", t: "6%", c: "rgba(214,166,112,0.12)", d: 13, dl: 0.4 },
];

export default function Bakery3DBackground() {
  // Start "low" (SSR-safe), upgrade only if the device proves it can handle it
  const [tier, setTier] = useState<"high" | "low">("low");
  const reduce = useReducedMotion();

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const mem = nav.deviceMemory ?? 8;
    const cores = nav.hardwareConcurrency ?? 8;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (mem >= 4 && cores >= 4 && finePointer) setTier("high");
  }, []);

  // Scroll parallax (high tier only)
  const { scrollY } = useScroll();
  const yFar = useTransform(scrollY, [0, 1400], [0, 55]);

  // Mouse parallax (high tier only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 50, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (tier !== "high" || reduce) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 18);
      my.set((e.clientY / window.innerHeight - 0.5) * 12);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [tier, reduce, mx, my]);

  const high = tier === "high" && !reduce;
  const orbs = high ? ORBS : ORBS.slice(0, 4); // low tier = fewer orbs, zero JS motion

  const orbStyle = (o: (typeof ORBS)[number]) =>
    ({
      width: o.s,
      height: o.s,
      left: o.l,
      top: o.t,
      background: `radial-gradient(circle at 35% 35%, ${o.c}, transparent 70%)`,
      "--vk-d": `${o.d}s`,
      "--vk-dl": `${o.dl}s`,
    }) as React.CSSProperties;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes vk-drift {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          33% { transform: translate3d(14px,-20px,0) scale(1.06); }
          66% { transform: translate3d(-12px,12px,0) scale(0.96); }
        }
        .vk-orb {
          animation: vk-drift var(--vk-d, 14s) ease-in-out infinite;
          animation-delay: var(--vk-dl, 0s);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) { .vk-orb { animation: none; } }
      `}</style>

      {/* Base warm wash — static, painted once */}
      <div className="absolute inset-0 bg-[radial-gradient(70rem_44rem_at_115%_-12%,rgba(180,122,69,0.10),transparent_60%),radial-gradient(56rem_38rem_at_-15%_112%,rgba(180,122,69,0.08),transparent_60%)]" />

      {/* FAR depth layer — scroll parallax */}
      <motion.div className="absolute inset-0" style={high ? { y: yFar } : undefined}>
        {orbs.slice(0, 3).map((o, i) => (
          <span key={i} className="vk-orb absolute rounded-full" style={orbStyle(o)} />
        ))}
      </motion.div>

      {/* MID depth layer — mouse parallax */}
      <motion.div className="absolute inset-0" style={high ? { x: sx, y: sy } : undefined}>
        {orbs.slice(3).map((o, i) => (
          <span key={i} className="vk-orb absolute rounded-full" style={orbStyle(o)} />
        ))}
      </motion.div>

      {/* Vignette — subtle edge depth */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_8%,transparent_55%,rgba(23,18,15,0.06))]" />

      {/* Film grain — 3.5% */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}