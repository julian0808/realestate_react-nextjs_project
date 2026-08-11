import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A2540",
          light: "#1B3A5B",
        },
        brown: {
          DEFAULT: "#6B4E3D",
          light: "#A9825E",
        },
        cream: "#F7F5F2",
        paper: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-poppins)"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      backgroundImage: {
        grain: "url('/grain.svg')",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
