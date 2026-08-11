import { Suspense } from "react";
import type { Metadata } from "next";
import AnimatedText from "@/components/AnimatedText";
import ListingsGrid from "@/components/ListingsGrid";

export const metadata: Metadata = {
  title: "Listings",
  description:
    "Browse every available property in the JulianMesa portfolio — filter by location, type, price, and bedrooms.",
};

export default function ListingsPage() {
  return (
    <>
      <section className="container-px pb-16 pt-40">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-brown">
          The Portfolio
        </p>
        <AnimatedText
          text="Every home, all in one place."
          as="h1"
          className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-bold tracking-tightest text-navy"
        />
        <p className="mt-6 max-w-xl text-base sm:text-lg text-navy/70">
          Filter by location, property type, price, and size to narrow the
          collection down to the homes that fit your life.
        </p>
      </section>

      <section className="container-px pb-28">
        <Suspense
          fallback={
            <div className="py-24 text-center text-navy/50">Loading listings…</div>
          }
        >
          <ListingsGrid />
        </Suspense>
      </section>
    </>
  );
}
