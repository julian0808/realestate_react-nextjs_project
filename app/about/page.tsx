import type { Metadata } from "next";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import ImageReveal from "@/components/ImageReveal";
import Button from "@/components/Button";
import { agents } from "@/data/agents";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the team behind JulianMesa Real Estate — two decades of curating exceptional homes with precision and genuine care.",
};

const values = [
  {
    number: "01",
    title: "Clarity over pressure",
    body: "We give you the full picture — the comps, the risks, the timeline — and let the decision be yours. No urgency theater, no manufactured bidding wars.",
  },
  {
    number: "02",
    title: "Fewer clients, deeper work",
    body: "We deliberately keep our roster small. Every listing gets a bespoke strategy, professional staging, and an agent who answers on the first ring.",
  },
  {
    number: "03",
    title: "Design-led marketing",
    body: "Homes are photographed, filmed, and presented like the architectural objects they are. Great presentation is not a luxury — it's leverage.",
  },
  {
    number: "04",
    title: "Relationships past closing",
    body: "Most of our business comes from past clients. That only happens when the work continues after the keys change hands.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="container-px pb-16 pt-40">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-brown">
          About Us
        </p>
        <AnimatedText
          text="A boutique agency built on craft, not volume."
          as="h1"
          className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-bold tracking-tightest text-navy"
        />
      </section>

      <section className="container-px pb-24">
        <ImageReveal
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop"
          alt="A sunlit modern living space"
          className="aspect-[16/9] rounded-3xl"
          sizes="100vw"
          priority
        />
      </section>

      {/* Story */}
      <section className="container-px pb-24 sm:pb-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <SectionHeading eyebrow="Our Story" title="Twenty years, one obsession." />
          <div className="space-y-6 text-base leading-relaxed text-navy/75 lg:pt-4">
            <p>
              JulianMesa Real Estate began in 2005 with a single conviction: the
              process of buying or selling a home had become transactional in a
              way that served everyone except the people actually moving.
            </p>
            <p>
              Two decades later, that conviction still shapes everything. We work
              with a deliberately limited number of clients each year so that
              every home gets the strategy, the photography, and the attention it
              deserves. Our agents live in the neighborhoods they sell, and they
              know the difference a single block can make.
            </p>
            <p>
              The result is an agency where most new business arrives through
              referral — and where the highest compliment we receive is a client
              coming back a decade later for their next chapter.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy py-24 text-white sm:py-32">
        <div className="container-px">
          <SectionHeading
            eyebrow="What We Believe"
            title="Four principles we don't compromise on."
            light
          />
          <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2">
            {values.map((value) => (
              <div key={value.number}>
                <p className="text-sm font-semibold tracking-[0.2em] text-brown-light">
                  {value.number}
                </p>
                <h3 className="mt-4 text-2xl font-bold tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-4 leading-relaxed text-white/70">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-px py-24 sm:py-32">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <StatCounter value={1200} suffix="+" label="Homes Sold" />
          <StatCounter value={20} suffix="+" label="Years Experience" />
          <StatCounter value={2} prefix="$" suffix="B+" label="Total Volume" />
          <StatCounter value={98} suffix="%" label="Referral Rate" />
        </div>
      </section>

      {/* Team */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-px">
          <SectionHeading
            eyebrow="The Team"
            title="The people you'll actually work with."
          />
          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent) => (
              <div key={agent.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-navy/5">
                  <Image
                    src={agent.photo}
                    alt={agent.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/90 via-navy/20 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <p className="text-sm leading-relaxed text-white">
                      {agent.bio}
                    </p>
                  </div>
                </div>
                <p className="mt-5 font-semibold text-navy">{agent.name}</p>
                <p className="text-sm text-navy/60">{agent.title}</p>
                <a
                  href={`mailto:${agent.email}`}
                  data-cursor-hover
                  className="mt-2 inline-block text-sm text-brown underline underline-offset-4"
                >
                  {agent.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brown py-24 text-white sm:py-32">
        <div className="container-px flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
          <AnimatedText
            text="Come see what a boutique approach feels like."
            as="h2"
            className="max-w-2xl text-4xl sm:text-5xl font-bold tracking-tightest"
          />
          <Button
            href="/contact"
            variant="primary"
            className="!bg-navy shrink-0 hover:!bg-navy-light"
          >
            Get in Touch
          </Button>
        </div>
      </section>
    </>
  );
}
