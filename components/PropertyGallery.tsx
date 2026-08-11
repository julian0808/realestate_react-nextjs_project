"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-navy/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`${title} — photo ${index + 1} of ${images.length}`}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => go(-1)}
          aria-label="Previous photo"
          data-cursor-hover
          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy backdrop-blur transition-transform hover:scale-110"
        >
          ←
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next photo"
          data-cursor-hover
          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy backdrop-blur transition-transform hover:scale-110"
        >
          →
        </button>

        <span className="absolute bottom-4 right-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {index + 1} / {images.length}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setIndex(i)}
            aria-label={`View photo ${i + 1}`}
            data-cursor-hover
            className={`relative aspect-[4/3] overflow-hidden rounded-xl transition-opacity ${
              i === index ? "opacity-100 ring-2 ring-navy" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="20vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
