"use client";

import { motion } from "framer-motion";

export function CinematicFooterTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center justify-center my-6 group select-none cursor-default text-center"
    >
      {/* Cinematic Ambient Backlight Glow */}
      <div className="absolute inset-0 -inset-x-12 bg-[var(--accent)]/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Bold Name with Cinematic Light-Sweep Shimmer */}
      <h2 className="relative font-heading font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none">
        <span className="cinematic-shimmer inline-block drop-shadow-[0_8px_30px_var(--shadow-color)] group-hover:drop-shadow-[0_0_45px_rgba(212,175,55,0.45)] transition-all duration-500">
          Rohit Dandawate
        </span>
      </h2>

      {/* Cinematic Accent Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 flex items-center justify-center gap-3"
      >
        <span className="h-[1px] w-12 sm:w-20 md:w-32 bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)] animate-pulse" />
        <span className="h-[1px] w-12 sm:w-20 md:w-32 bg-gradient-to-l from-transparent via-[var(--accent)]/60 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
