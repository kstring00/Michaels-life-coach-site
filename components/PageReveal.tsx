"use client";
import { motion, useReducedMotion } from "motion/react";

export function PageReveal({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .48, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}
