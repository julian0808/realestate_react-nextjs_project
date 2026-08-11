"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  photo: string;
}

export default function Testimonial({ quote, name, role, photo }: TestimonialData) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-full flex-col justify-between rounded-3xl bg-white p-8 sm:p-10 shadow-[0_20px_60px_-30px_rgba(10,37,64,0.25)]"
    >
      <p className="text-lg sm:text-xl leading-relaxed text-navy/85 text-balance">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-8 flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image src={photo} alt={name} fill className="object-cover" />
        </div>
        <div>
          <p className="font-semibold text-navy">{name}</p>
          <p className="text-sm text-navy/60">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
