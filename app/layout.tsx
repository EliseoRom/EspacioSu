import type { Metadata } from "next";
import AudioPlayer from "@/components/AudioPlayer";
import CursorTrail from "@/components/CursorTrail";
import StructuredData from "@/components/StructuredData";
import WelcomeSplash from "@/components/WelcomeSplash";
import { SEO_DESCRIPTION, SEO_KEYWORDS, SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

const SEO_TITLE =
  "Espacio Su | Cosméticos y Perfumes Natura en Paraná, Entre Ríos";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_TITLE,
    template: "%s | Espacio Su",
  },
  description: SEO_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE.founder, url: SITE_URL }],
  creator: SITE.founder,
  publisher: SITE.name,
  category: "beauty",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: SITE.name,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [
      {
        url: "/images/foto-08.jpeg",
        width: 1200,
        height: 630,
        alt: "Espacio Su — cosméticos y perfumes Natura en Paraná, Entre Ríos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: ["/images/foto-08.jpeg"],
  },
  other: {
    "geo.region": "AR-E",
    "geo.placename": "Paraná",
    "geo.position": "-31.7333;-60.5297",
    ICBM: "-31.7333, -60.5297",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <head>
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <WelcomeSplash />
        <AudioPlayer />
        {children}
        <CursorTrail />
      </body>
    </html>
  );
}
