"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/Button";

const links = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth",
        scrolled || menuOpen
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(10,37,64,0.08)]"
          : "bg-transparent"
      )}
    >
      <nav className="container-px flex h-20 items-center justify-between">
        <Link
          href="/"
          data-cursor-hover
          className="font-bold text-xl tracking-tightest text-navy"
        >
          JulianMesa
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor-hover
              className={cn(
                "relative text-sm font-medium tracking-wide text-navy/80 transition-colors hover:text-navy",
                pathname === link.href && "text-navy"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-brown"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button href="/contact" variant="primary" className="!px-6 !py-3 text-sm">
            Get in Touch
          </Button>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            className="h-[2px] w-6 bg-navy"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="h-[2px] w-6 bg-navy"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            className="h-[2px] w-6 bg-navy"
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-cream"
          >
            <div className="container-px flex flex-col gap-6 pb-10 pt-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl font-bold tracking-tightest text-navy"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Button href="/contact" variant="primary" className="mt-2 w-fit">
                Get in Touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
