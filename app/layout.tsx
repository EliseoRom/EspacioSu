import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Espacio Su · Apreciar cada día más el cuerpo",
  description:
    "Espacio Su — perfumería, cosmética natural y rituales de cuidado. Apreciar cada día más el cuerpo, cuidarlo por dentro y por fuera. Con dedicación y amor, desde Argentina.",
  keywords: [
    "Espacio Su",
    "Calma Mía",
    "perfumería natural",
    "cosmética",
    "aromas",
    "Natura",
    "Susanita Balcar",
  ],
  openGraph: {
    title: "Espacio Su",
    description:
      "Apreciar cada día más el cuerpo, cuidarlo por dentro y por fuera.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
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
      <body>{children}</body>
    </html>
  );
}
