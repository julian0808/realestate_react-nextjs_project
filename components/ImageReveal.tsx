"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export default function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  priority,
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: ImageRevealProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        style={{ originX: 0 }}
        className="absolute inset-0 z-10 bg-navy"
      />
      <motion.div
        initial={{ scale: 1.35 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </motion.div>
    </div>
  );
}
