import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://julianmesa-realestate.com"),
  title: {
    default: "JulianMesa Real Estate | Modern Homes, Timeless Value",
    template: "%s | JulianMesa Real Estate",
  },
  description:
    "JulianMesa Real Estate is a boutique agency curating exceptional homes and investment properties. Discover listings, work with expert agents, and find a place to call home.",
  keywords: [
    "real estate",
    "luxury homes",
    "property listings",
    "JulianMesa",
    "buy a home",
    "sell a home",
  ],
  openGraph: {
    title: "JulianMesa Real Estate | Modern Homes, Timeless Value",
    description:
      "A boutique real estate agency curating exceptional homes and investment properties.",
    url: "https://julianmesa-realestate.com",
    siteName: "JulianMesa Real Estate",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JulianMesa Real Estate | Modern Homes, Timeless Value",
    description:
      "A boutique real estate agency curating exceptional homes and investment properties.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`no-js ${poppins.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-brown-light selection:text-white">
        <SmoothScroll>
          <Cursor />
          <div className="noise-overlay" aria-hidden="true" />
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
