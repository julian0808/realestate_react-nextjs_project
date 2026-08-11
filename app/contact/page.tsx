import type { Metadata } from "next";
import AnimatedText from "@/components/AnimatedText";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the JulianMesa Real Estate team to schedule a tour, list your home, or ask a question.",
};

const offices = [
  {
    city: "San Francisco",
    address: ["123 Market St, Suite 400", "San Francisco, CA 94103"],
    phone: "(555) 210-4488",
    email: "sf@julianmesa.com",
  },
  {
    city: "Austin",
    address: ["88 Meridian Tower, Level 12", "Austin, TX 78701"],
    phone: "(555) 310-2291",
    email: "austin@julianmesa.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="container-px pb-16 pt-40">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-brown">
          Contact
        </p>
        <AnimatedText
          text="Tell us what you're looking for."
          as="h1"
          className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-bold tracking-tightest text-navy"
        />
        <p className="mt-6 max-w-xl text-base sm:text-lg text-navy/70">
          Whether you&apos;re ready to tour a home this week or just starting to
          think about a move, we&apos;d love to hear from you.
        </p>
      </section>

      <section className="container-px grid grid-cols-1 gap-16 pb-28 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl bg-cream p-8 sm:p-12">
          <ContactForm />
        </div>

        <aside className="space-y-12">
          {offices.map((office) => (
            <div key={office.city}>
              <h2 className="text-2xl font-bold tracking-tight text-navy">
                {office.city}
              </h2>
              <address className="mt-4 space-y-1 not-italic text-sm text-navy/70">
                {office.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
              <div className="mt-4 space-y-2 text-sm">
                <a
                  href={`tel:${office.phone.replace(/\D/g, "")}`}
                  data-cursor-hover
                  className="block text-navy transition-colors hover:text-brown"
                >
                  {office.phone}
                </a>
                <a
                  href={`mailto:${office.email}`}
                  data-cursor-hover
                  className="block text-navy transition-colors hover:text-brown"
                >
                  {office.email}
                </a>
              </div>
            </div>
          ))}

          <div className="border-t border-navy/10 pt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
              Office Hours
            </h2>
            <dl className="mt-4 space-y-2 text-sm text-navy/70">
              <div className="flex justify-between">
                <dt>Monday – Friday</dt>
                <dd>9:00 – 18:00</dd>
              </div>
              <div className="flex justify-between">
                <dt>Saturday</dt>
                <dd>10:00 – 16:00</dd>
              </div>
              <div className="flex justify-between">
                <dt>Sunday</dt>
                <dd>By appointment</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>
    </>
  );
}
