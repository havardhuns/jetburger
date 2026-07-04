import { SITE_URL, type Settings } from "@/lib/site-data";

/** schema.org Restaurant markup for Google's local rich results. */
export function StructuredData({ settings }: { settings: Settings }) {
  // "Nils Heglands veg 100, 4735 Evje" -> street / postal code / locality
  const addressMatch = settings.address?.match(/^(.+?),\s*(\d{4})\s+(.+)$/);
  // "Alle dager 15:00–22:00" -> opens / closes (daily hours only)
  const hoursMatch = settings.openingHours?.match(/(\d{2}:\d{2})\s*[–-]\s*(\d{2}:\d{2})/);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Jetburger",
    url: SITE_URL,
    image: settings.hero?.src,
    logo: settings.logo?.src,
    telephone: settings.phone ? `+47${settings.phone.replace(/\s/g, "")}` : undefined,
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
    openingHoursSpecification: hoursMatch
      ? [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: hoursMatch[1],
            closes: hoursMatch[2],
          },
        ]
      : undefined,
    sameAs: [settings.facebookUrl, settings.instagramUrl].filter(Boolean),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
