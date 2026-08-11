"use client";

import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/utils";

export default function MortgageCalculator({ price }: { price: number }) {
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const monthly = useMemo(() => {
    const principal = price * (1 - downPct / 100);
    const monthlyRate = rate / 100 / 12;
    const payments = term * 12;
    if (monthlyRate === 0) return principal / payments;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) /
      (Math.pow(1 + monthlyRate, payments) - 1)
    );
  }, [price, downPct, rate, term]);

  return (
    <div className="rounded-3xl bg-cream p-8">
      <h3 className="text-xl font-bold text-navy">Estimate your payment</h3>

      <div className="mt-8 space-y-7">
        <div>
          <label className="mb-2 flex items-center justify-between text-sm text-navy/70">
            <span>Down payment</span>
            <span className="font-semibold text-navy">
              {downPct}% · {formatPrice((price * downPct) / 100)}
            </span>
          </label>
          <input
            type="range"
            min={5}
            max={60}
            step={1}
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            className="w-full accent-brown"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center justify-between text-sm text-navy/70">
            <span>Interest rate</span>
            <span className="font-semibold text-navy">{rate.toFixed(2)}%</span>
          </label>
          <input
            type="range"
            min={2}
            max={12}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-brown"
          />
        </div>

        <div>
          <p className="mb-2 text-sm text-navy/70">Loan term</p>
          <div className="flex gap-2">
            {[15, 20, 30].map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-colors ${
                  term === t
                    ? "bg-navy text-white"
                    : "bg-white text-navy/70 hover:bg-navy/5"
                }`}
              >
                {t} yr
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-navy/10 pt-6">
        <p className="text-sm text-navy/60">Estimated monthly payment</p>
        <p className="mt-1 text-4xl font-bold tracking-tightest text-navy">
          {formatPrice(Math.round(monthly))}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-navy/50">
          Principal and interest only. Taxes, insurance, and HOA dues are not
          included. This is an estimate, not a lending offer.
        </p>
      </div>
    </div>
  );
}
