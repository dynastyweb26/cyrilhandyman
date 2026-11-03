import type { Metadata, Viewport } from "next";
import { Open_Sans, Oswald } from "next/font/google";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/data/site";
import { businessSchema } from "@/lib/schema";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Handyman & Garage Door Service in ${site.nap.locality}, ${site.nap.region}`,
    template: `%s | ${site.name}`,
  },
  description:
    "TODO_CONTENT — one-sentence site description used as the default meta description.",
  applicationName: site.name,
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${openSans.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[4.5rem] md:pb-0">
        <JsonLd id="business-schema" data={businessSchema()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:font-display focus:text-small focus:uppercase focus:tracking-[0.12em] focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileCallBar />
      </body>
    </html>
  );
}
