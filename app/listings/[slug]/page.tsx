import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyBySlug, getRelatedProperties, properties } from "@/data/properties";
import { agents } from "@/data/agents";
import { formatNumber, formatPrice } from "@/lib/utils";
import PropertyGallery from "@/components/PropertyGallery";
import MortgageCalculator from "@/components/MortgageCalculator";
import PropertyCard from "@/components/PropertyCard";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const property = getPropertyBySlug(params.slug);
  if (!property) return { title: "Property Not Found" };

  return {
    title: property.title,
    description: property.description.slice(0, 155),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 155),
      images: [{ url: property.images[0] }],
    },
  };
}

export default function PropertyDetailPage({ params }: PageProps) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  const agent = agents.find((a) => a.id === property.agentId) ?? agents[0];
  const related = getRelatedProperties(property);

  const specs = [
    { label: "Bedrooms", value: property.beds },
    { label: "Bathrooms", value: property.baths },
    { label: "Square Feet", value: formatNumber(property.sqft) },
    { label: "Year Built", value: property.yearBuilt },
    { label: "Property Type", value: property.type },
    { label: "Lot Size", value: property.lotSize ?? "—" },
  ];

  return (
    <>
      <section className="container-px pb-12 pt-36">
        <Link
          href="/listings"
          data-cursor-hover
          className="text-sm font-medium text-navy/60 transition-colors hover:text-navy"
        >
          ← Back to listings
        </Link>

        <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="inline-block rounded-full bg-brown/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brown">
              {property.status}
            </span>
            <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl font-bold tracking-tightest text-navy">
              {property.title}
            </h1>
            <p className="mt-4 text-base text-navy/60">
              {property.location.address}, {property.location.city},{" "}
              {property.location.state} {property.location.zip}
            </p>
          </div>
          <p className="shrink-0 text-4xl font-bold tracking-tightest text-navy sm:text-5xl">
            {formatPrice(property.price)}
          </p>
        </div>
      </section>

      <section className="container-px">
        <PropertyGallery images={property.images} title={property.title} />
      </section>

      <section className="container-px grid grid-cols-1 gap-16 py-20 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 border-b border-navy/10 pb-12 sm:grid-cols-3">
            {specs.map((spec) => (
              <div key={spec.label}>
                <p className="text-xs uppercase tracking-[0.2em] text-navy/45">
                  {spec.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-navy">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="py-12">
            <h2 className="text-3xl font-bold tracking-tightest text-navy">
              About this home
            </h2>
            <p className="mt-6 text-base leading-relaxed text-navy/75">
              {property.description}
            </p>
          </div>

          <div className="border-t border-navy/10 py-12">
            <h2 className="text-3xl font-bold tracking-tightest text-navy">
              Features
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {property.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-navy/75">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brown" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-navy/10 py-12">
            <h2 className="text-3xl font-bold tracking-tightest text-navy">
              Location
            </h2>
            <div className="mt-8 flex aspect-[16/9] flex-col items-center justify-center rounded-3xl bg-navy/5 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy/40">
                Map Preview
              </p>
              <p className="mt-3 max-w-xs text-sm text-navy/55">
                {property.location.address}, {property.location.city},{" "}
                {property.location.state}
              </p>
              <p className="mt-2 text-xs text-navy/40">
                {property.coordinates.lat.toFixed(4)},{" "}
                {property.coordinates.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-navy/10 bg-white p-8">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={agent.photo}
                  alt={agent.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-navy">{agent.name}</p>
                <p className="text-sm text-navy/60">{agent.title}</p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-navy/70">{agent.bio}</p>

            <div className="mt-6 space-y-2 text-sm">
              <a
                href={`tel:${agent.phone.replace(/\D/g, "")}`}
                data-cursor-hover
                className="block text-navy/75 transition-colors hover:text-brown"
              >
                {agent.phone}
              </a>
              <a
                href={`mailto:${agent.email}`}
                data-cursor-hover
                className="block text-navy/75 transition-colors hover:text-brown"
              >
                {agent.email}
              </a>
            </div>

            <div className="mt-8">
              <Button href="/contact" variant="primary" className="w-full">
                Schedule a Tour
              </Button>
            </div>
          </div>

          <MortgageCalculator price={property.price} />
        </aside>
      </section>

      {related.length > 0 && (
        <section className="container-px pb-28">
          <SectionHeading eyebrow="Keep Exploring" title="Similar properties." />
          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <PropertyCard property={p} index={i} key={p.id} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
