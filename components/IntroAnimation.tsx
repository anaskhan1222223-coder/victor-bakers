"use client";

import { motion } from "framer-motion";

const NAME = "Victor Baker's";

export default function IntroAnimation({ onSkip }: { onSkip: () => void }) {
  return (
    <motion.div
      onClick={onSkip}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#140d08]"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Lightweight glow — radial gradient, NO blur filter = no lag */}
      <div className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.22),transparent_65%)] md:h-[460px] md:w-[460px]" />

      {/* 3D spinning cake — single GPU layer */}
      <div className="perspective-800 mb-6">
        <div className="animate-cake-3d text-6xl md:text-8xl">🎂</div>
      </div>

      {/* Name reveal — ONE animated layer instead of 14 letters */}
      <motion.h1
        initial={{ opacity: 0, rotateX: 70, y: 20 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
        className="perspective-800 px-4 text-center text-3xl font-extrabold md:text-5xl"
      >
        <span className="bg-gradient-to-b from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
          {NAME}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="mt-4 px-6 text-center text-xs uppercase tracking-[0.3em] text-stone-400 md:text-base"
      >
        Freshly Baked Happiness
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-white/10 md:w-56"
      >
        <div className="animate-shimmer h-full w-1/3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 text-xs text-stone-500"
      >
        Tap to skip
      </motion.p>
    </motion.div>
  );
}