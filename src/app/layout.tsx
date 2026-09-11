import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { MotionProvider } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// favicon.ico, apple-icon.png and manifest.ts in this folder are picked up
// automatically by the App Router.

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Font variables live on <html> so Tailwind's :root theme tokens can see them.
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <MotionProvider>
          <SmoothScroll />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
