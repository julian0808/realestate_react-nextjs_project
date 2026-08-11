import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";

const columns = [
  {
    heading: "Explore",
    links: [
      { href: "/listings", label: "All Listings" },
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Property Types",
    links: [
      { href: "/listings?type=House", label: "Houses" },
      { href: "/listings?type=Villa", label: "Villas" },
      { href: "/listings?type=Penthouse", label: "Penthouses" },
      { href: "/listings?type=Condo", label: "Condos" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { href: "mailto:hello@julianmesa.com", label: "hello@julianmesa.com" },
      { href: "tel:+15552104488", label: "(555) 210-4488" },
      { href: "/contact", label: "123 Market St, Suite 400" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy text-white">
      <div className="container-px pt-24 pb-10">
        <AnimatedText
          text="Let's find your next address."
          as="h2"
          className="max-w-3xl text-4xl sm:text-5xl md:text-6xl font-bold tracking-tightest"
        />

        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-2xl font-bold tracking-tightest">JulianMesa</p>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              A boutique real estate agency curating exceptional homes and
              investment properties nationwide.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                {col.heading}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      data-cursor-hover
                      className="text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} JulianMesa Real Estate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white">Privacy Policy</Link>
            <Link href="/" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
