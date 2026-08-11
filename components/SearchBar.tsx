"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const types = ["Any Type", "House", "Villa", "Apartment", "Condo", "Penthouse", "Townhouse"];
const prices = [
  { label: "Any Price", value: "" },
  { label: "Under $1M", value: "0-1000000" },
  { label: "$1M - $2.5M", value: "1000000-2500000" },
  { label: "$2.5M - $5M", value: "2500000-5000000" },
  { label: "$5M+", value: "5000000-" },
];

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Any Type");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type !== "Any Type") params.set("type", type);
    if (price) params.set("price", price);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-2xl bg-white/95 p-3 shadow-[0_30px_80px_-30px_rgba(10,37,64,0.5)] backdrop-blur sm:flex-row sm:items-center sm:rounded-full sm:p-2"
    >
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Search by city or neighborhood"
        className="w-full flex-1 rounded-full bg-transparent px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:outline-none sm:px-5"
      />
      <div className="hidden h-8 w-px bg-navy/10 sm:block" />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full rounded-full bg-navy/5 px-4 py-3 text-sm text-navy focus:outline-none sm:w-auto sm:bg-transparent"
      >
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <div className="hidden h-8 w-px bg-navy/10 sm:block" />
      <select
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full rounded-full bg-navy/5 px-4 py-3 text-sm text-navy focus:outline-none sm:w-auto sm:bg-transparent"
      >
        {prices.map((p) => (
          <option key={p.label} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        data-cursor-hover
        className="w-full shrink-0 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light sm:w-auto"
      >
        Search
      </button>
    </motion.form>
  );
}
