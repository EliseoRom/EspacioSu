import { SEO_DESCRIPTION, SITE, SITE_URL } from "@/lib/site";

export default function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE.name,
    description: SEO_DESCRIPTION,
    url: SITE_URL,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${SITE_URL}/images/foto-08.jpeg`,
    founder: {
      "@type": "Person",
      name: SITE.founder,
      jobTitle: "Fundadora y consultora Natura",
      worksFor: { "@id": `${SITE_URL}/#business` },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: "AR",
    },
    areaServed: [
      {
        "@type": "City",
        name: SITE.city,
        containedInPlace: { "@type": "State", name: SITE.region },
      },
      { "@type": "State", name: SITE.region },
    ],
    sameAs: [SITE.instagram, SITE.natura],
    priceRange: "$$",
    knowsAbout: [
      "cosméticos naturales",
      "productos Natura",
      "perfumes Natura",
      "cuidado de la piel",
      "regalos",
      "consultoría de belleza",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catálogo Espacio Su",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Cosméticos y productos Natura",
            category: "Cuidado de la piel",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Perfumes Natura",
            category: "Perfumería",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Regalos y kits de belleza natural",
            category: "Regalos",
          },
        },
      ],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE.name,
    url: SITE_URL,
    description: SEO_DESCRIPTION,
    inLanguage: "es-AR",
    publisher: { "@id": `${SITE_URL}/#business` },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué es Espacio Su?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Espacio Su es un espacio de belleza y bienestar en Paraná, Entre Ríos, fundado por Susana Balcar. Ofrece cosméticos, perfumes Natura y productos naturales para el cuidado de la piel.",
        },
      },
      {
        "@type": "Question",
        name: "¿Dónde comprar productos Natura en Paraná, Entre Ríos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En Espacio Su, consultora Natura en Paraná, Entre Ríos, podés comprar cosméticos, perfumes y productos naturales para el cuidado de la piel, con asesoramiento personalizado de Susana Balcar.",
        },
      },
      {
        "@type": "Question",
        name: "¿Quién es la fundadora de Espacio Su?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La fundadora de Espacio Su es Susana Balcar, consultora Natura en Paraná, Entre Ríos, especializada en cosmética natural, perfumes y regalos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué productos vende Espacio Su?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Espacio Su vende cosméticos, productos Natura, perfumes Natura, productos naturales para el cuidado de la piel y regalos en Paraná, Entre Ríos.",
        },
      },
    ],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [localBusiness, website, faq],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
