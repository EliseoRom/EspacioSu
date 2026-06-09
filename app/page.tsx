import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { SEO_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cosméticos, Perfumes Natura y Cuidado de la Piel en Paraná",
  description: SEO_DESCRIPTION,
};

import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import Perfume from "@/components/Perfume";
import Manifest from "@/components/Manifest";
import Gracias from "@/components/Gracias";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Carousel />
      <Perfume />
      <Manifest />
      <Gracias />
      <Footer />
    </>
  );
}
