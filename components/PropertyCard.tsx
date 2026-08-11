"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Property } from "@/types/property";
import { formatNumber, formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
    >
      <Link
        href={`/listings/${property.slug}`}
        className="group block"
        data-cursor-hover
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy/5">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/0 to-navy/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy backdrop-blur">
            {property.status}
          </span>
          <span className="absolute bottom-4 left-4 translate-y-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View Property →
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-navy transition-colors group-hover:text-brown">
              {property.title}
            </h3>
            <p className="mt-1 text-sm text-navy/60">
              {property.location.city}, {property.location.state}
            </p>
          </div>
          <p className="whitespace-nowrap text-lg font-bold text-navy">
            {formatPrice(property.price)}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-4 border-t border-navy/10 pt-4 text-sm text-navy/70">
          <span>{property.beds} Beds</span>
          <span className="h-1 w-1 rounded-full bg-navy/30" />
          <span>{property.baths} Baths</span>
          <span className="h-1 w-1 rounded-full bg-navy/30" />
          <span>{formatNumber(property.sqft)} Sqft</span>
        </div>
      </Link>
    </motion.div>
  );
}
