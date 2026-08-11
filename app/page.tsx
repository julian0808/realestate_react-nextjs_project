import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import SearchBar from "@/components/SearchBar";
import SectionHeading from "@/components/SectionHeading";
import PropertyCard from "@/components/PropertyCard";
import StatCounter from "@/components/StatCounter";
import Testimonial from "@/components/Testimonial";
import ImageReveal from "@/components/ImageReveal";
import Button from "@/components/Button";
import { getFeaturedProperties } from "@/data/properties";
import { agents } from "@/data/agents";
import { testimonials } from "@/data/testimonials";

export default function Home() {
  const featured = getFeaturedProperties();

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy text-white">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2400&auto=format&fit=crop"
          alt="A striking modern home at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/10" />

        <div className="container-px relative z-10 w-full pb-16 pt-40 sm:pb-20">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Boutique Real Estate — Est. 2005
          </p>
          <AnimatedText
            text="Homes worth arriving home to."
            as="h1"
            className="max-w-5xl text-[13vw] leading-[0.95] sm:text-7xl md:text-8xl font-bold tracking-tightest"
          />
          <p className="mt-8 max-w-xl text-base sm:text-lg text-white/75">
            We curate exceptional homes and guide discerning buyers and
            sellers through every step, with the care and precision a
            lifelong investment deserves.
          </p>

          <div className="mt-10 max-w-3xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="container-px py-24 sm:py-32">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Featured Listings"
            title="Handpicked properties, ready for their next chapter."
          />
          <Button href="/listings" variant="outline" className="shrink-0">
            View All Listings
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property, i) => (
            <PropertyCard property={property} index={i} key={property.id} />
          ))}
        </div>
      </section>

      {/* Why us / stats */}
      <section className="bg-navy py-24 text-white sm:py-32">
        <div className="container-px">
          <SectionHeading
            eyebrow="Why JulianMesa"
            title="Two decades of trust, precision, and results."
            description="From the first showing to the final signature, our team combines deep market intelligence with a genuinely personal approach."
            light
          />

          <div className="mt-20 grid grid-cols-2 gap-10 sm:grid-cols-4">
            <StatCounter value={1200} suffix="+" label="Homes Sold" light />
            <StatCounter value={20} suffix="+" label="Years Experience" light />
            <StatCounter value={98} suffix="%" label="Client Satisfaction" light />
            <StatCounter value={4.9} suffix="/5" label="Average Rating" light />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-px py-24 sm:py-32">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say."
          align="center"
          className="mx-auto"
        />
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <Testimonial key={t.name} {...t} />
          ))}
        </div>
      </section>

      {/* Featured agents */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-px">
          <SectionHeading
            eyebrow="Our Team"
            title="Agents who know the market inside out."
          />
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent) => (
              <div key={agent.id} className="group">
                <ImageReveal
                  src={agent.photo}
                  alt={agent.name}
                  className="aspect-[3/4] rounded-2xl"
                />
                <p className="mt-5 font-semibold text-navy">{agent.name}</p>
                <p className="text-sm text-navy/60">{agent.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden bg-brown py-24 text-white sm:py-32">
        <div className="container-px relative z-10 flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
          <AnimatedText
            text="Ready to find your place in the world?"
            as="h2"
            className="max-w-2xl text-4xl sm:text-5xl md:text-6xl font-bold tracking-tightest"
          />
          <Button href="/contact" variant="primary" className="!bg-navy shrink-0 hover:!bg-navy-light">
            Start the Conversation
          </Button>
        </div>
      </section>
    </>
  );
}
