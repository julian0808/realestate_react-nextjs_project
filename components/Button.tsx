"use client";

import { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy-light",
  secondary: "bg-brown text-white hover:bg-brown-light",
  outline: "border border-navy text-navy hover:bg-navy hover:text-white",
};

function useMagnetic() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.setProperty("--mx", `${x * 0.35}px`);
    el.style.setProperty("--my", `${y * 0.35}px`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  };

  return { ref, handleMouseMove, handleMouseLeave };
}

interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

interface LinkProps
  extends BaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> {
  href: string;
}

export default function Button({
  children,
  variant = "primary",
  className,
  href,
  ...props
}: ButtonProps | LinkProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic();

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 ease-smooth",
    variantClasses[variant],
    className
  );

  const content = (
    <motion.span
      animate={{ x: "var(--mx, 0px)", y: "var(--my, 0px)" }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.2 }}
      className={classes}
      data-cursor-hover
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        <Link href={href} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {content}
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <button {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} className="contents">
        {content}
      </button>
    </div>
  );
}
