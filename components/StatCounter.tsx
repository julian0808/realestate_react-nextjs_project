"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  light?: boolean;
}

export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  light = false,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 60 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="text-center sm:text-left"
    >
      <span
        ref={ref}
        className={`block text-4xl sm:text-5xl md:text-6xl font-bold tracking-tightest ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {prefix}0{suffix}
      </span>
      <span
        className={`mt-2 block text-sm uppercase tracking-[0.2em] ${
          light ? "text-white/60" : "text-navy/60"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}
