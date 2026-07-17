import { SITE_URL, type Settings } from "@/lib/site-data";

/** schema.org Restaurant markup for Google's local rich results. */
export function StructuredData({ settings }: { settings: Settings }) {
  // "Nils Heglands veg 100, 4735 Evje" -> street / postal code / locality
  const addressMatch = settings.address?.match(/^(.+?),\s*(\d{4})\s+(.+)$/);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Jetburger",
    url: SITE_URL,
    image: settings.hero?.src,
    logo: settings.logo?.src,
    telephone: settings.phone ? `+47${settings.phone.replaceAll(/\s/g, "")}` : undefined,
    email: settings.email,
    servesCuisine: ["Burger", "Pizza"],
    menu: `${SITE_URL}/#meny`,
    address: addressMatch
      ? {
          "@type": "PostalAddress",
          streetAddress: addressMatch[1],
          postalCode: addressMatch[2],
          addressLocality: addressMatch[3],
          addressCountry: "NO",
        }
      : settings.address ?? undefined,
    openingHoursSpecification: settings.openingHoursSpecification,
    sameAs: [settings.facebookUrl, settings.instagramUrl].filter(Boolean),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
