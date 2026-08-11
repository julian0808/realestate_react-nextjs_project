"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { properties } from "@/data/properties";
import { Property } from "@/types/property";
import PropertyCard from "@/components/PropertyCard";
import { formatPrice } from "@/lib/utils";

const PROPERTY_TYPES: Property["type"][] = [
  "House",
  "Villa",
  "Apartment",
  "Condo",
  "Penthouse",
  "Townhouse",
];

const PAGE_SIZE = 6;

type SortKey = "featured" | "price-asc" | "price-desc" | "sqft-desc" | "beds-desc";

export default function ListingsGrid() {
  const searchParams = useSearchParams();

  const [selectedTypes, setSelectedTypes] = useState<Set<Property["type"]>>(
    () => {
      const t = searchParams.get("type") as Property["type"] | null;
      return t ? new Set([t]) : new Set();
    }
  );
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [maxPrice, setMaxPrice] = useState(6000000);
  const [minBeds, setMinBeds] = useState(0);
  const [sort, setSort] = useState<SortKey>("featured");
  const [page, setPage] = useState(1);

  const toggleType = (type: Property["type"]) => {
    setPage(1);
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      if (selectedTypes.size > 0 && !selectedTypes.has(p.type)) return false;
      if (p.price > maxPrice) return false;
      if (p.beds < minBeds) return false;
      if (location) {
        const q = location.toLowerCase();
        const haystack = `${p.location.city} ${p.location.state} ${p.title}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "sqft-desc":
        result = [...result].sort((a, b) => b.sqft - a.sqft);
        break;
      case "beds-desc":
        result = [...result].sort((a, b) => b.beds - a.beds);
        break;
      default:
        result = [...result].sort(
          (a, b) => Number(b.featured) - Number(a.featured)
        );
    }

    return result;
  }, [selectedTypes, maxPrice, minBeds, location, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">
      {/* Sidebar filters */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="space-y-8">
          <div>
            <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setPage(1);
              }}
              placeholder="City or state"
              className="w-full rounded-full border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-navy/40 focus:outline-none"
            />
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
              Property Type
            </p>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    selectedTypes.has(type)
                      ? "border-navy bg-navy text-white"
                      : "border-navy/15 text-navy/70 hover:border-navy/40"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
              <span>Max Price</span>
              <span className="normal-case tracking-normal text-navy/70">
                {formatPrice(maxPrice)}
              </span>
            </label>
            <input
              type="range"
              min={500000}
              max={6000000}
              step={100000}
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setPage(1);
              }}
              className="w-full accent-brown"
            />
          </div>

          <div>
            <label className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
              <span>Min Beds</span>
              <span className="normal-case tracking-normal text-navy/70">
                {minBeds === 0 ? "Any" : `${minBeds}+`}
              </span>
            </label>
            <input
              type="range"
              min={0}
              max={6}
              step={1}
              value={minBeds}
              onChange={(e) => {
                setMinBeds(Number(e.target.value));
                setPage(1);
              }}
              className="w-full accent-brown"
            />
          </div>

          {(selectedTypes.size > 0 || location || maxPrice < 6000000 || minBeds > 0) && (
            <button
              onClick={() => {
                setSelectedTypes(new Set());
                setLocation("");
                setMaxPrice(6000000);
                setMinBeds(0);
                setPage(1);
              }}
              className="text-sm font-medium text-brown underline underline-offset-4"
            >
              Clear all filters
            </button>
          )}
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-navy/60">
            {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
          </p>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortKey);
              setPage(1);
            }}
            className="rounded-full border border-navy/15 bg-white px-4 py-2 text-sm text-navy focus:outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="sqft-desc">Largest Sqft</option>
            <option value="beds-desc">Most Beds</option>
          </select>
        </div>

        {paged.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={page + sort + location + maxPrice + minBeds + [...selectedTypes].join(",")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3"
            >
              {paged.map((property, i) => (
                <PropertyCard property={property} index={i} key={property.id} />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="rounded-2xl border border-dashed border-navy/20 py-24 text-center">
            <p className="text-lg font-semibold text-navy">No properties match your filters.</p>
            <p className="mt-2 text-sm text-navy/60">Try adjusting your search criteria.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-10 w-10 rounded-full text-sm font-medium transition-colors ${
                  page === i + 1
                    ? "bg-navy text-white"
                    : "bg-navy/5 text-navy/70 hover:bg-navy/10"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
