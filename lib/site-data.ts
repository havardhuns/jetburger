import type { MenuGridCard } from "@/components/site/menu-grid";
import { urlFor } from "@/sanity/lib/image";
import type { MENU_CARDS_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";

export const SITE_URL = "https://jetburger.no";

export function deriveSettings(settings: NonNullable<SITE_SETTINGS_QUERY_RESULT>) {
  // SVG logos are served as-is: Sanity rasterizes SVGs when transforms are
  // applied, and next/image won't optimize SVG sources.
  const logoIsSvg = settings.logo?.asset?._id.endsWith("-svg") ?? false;

  return {
    heroHeading: settings.heroHeading,
    heroText: settings.heroText,
    menuHeading: settings.menuHeading,
    menuText: settings.menuText,
    aboutHeading: settings.aboutHeading,
    aboutParagraphs: (settings.aboutText ?? "").split(/\n+/).filter(Boolean),
    contactHeading: settings.contactHeading,
    phone: settings.phone,
    telHref: settings.phone ? `tel:${settings.phone.replace(/\s/g, "")}` : undefined,
    email: settings.email,
    address: settings.address,
    openingHours: settings.openingHours,
    orderUrl: settings.orderUrl,
    orderCtaLabel: settings.orderCtaLabel ?? "Bestill på nett",
    facebookUrl: settings.facebookUrl,
    instagramUrl: settings.instagramUrl,
    logo: settings.logo?.asset
      ? {
          src: logoIsSvg
            ? settings.logo.asset.url!
            : urlFor(settings.logo).width(80).height(80).fit("crop").url(),
          alt: settings.logo.alt ?? "Jetburger",
          unoptimized: logoIsSvg,
        }
      : undefined,
    hero: settings.heroImage?.asset
      ? {
          src: urlFor(settings.heroImage).width(2048).url(),
          alt: settings.heroImage.alt ?? "Jetburger i Evje sentrum",
          lqip: settings.heroImage.asset.metadata?.lqip ?? undefined,
        }
      : undefined,
  };
}

export type Settings = ReturnType<typeof deriveSettings>;

export function deriveMenuCards(menuCards: MENU_CARDS_QUERY_RESULT): MenuGridCard[] {
  return menuCards.flatMap((card): MenuGridCard[] => {
    if (!card.image?.asset) return [];
    const dimensions = card.image.asset.metadata?.dimensions;
    const zoomWidth = dimensions?.width ? Math.min(dimensions.width, 2048) : undefined;
    const zoomHeight =
      dimensions?.width && dimensions.height && zoomWidth
        ? Math.round((dimensions.height / dimensions.width) * zoomWidth)
        : undefined;
    return [
      {
        key: card._id,
        title: card.title ?? "Meny",
        src: urlFor(card.image).width(720).url(),
        zoomSrc: zoomWidth ? urlFor(card.image).width(zoomWidth).url() : urlFor(card.image).url(),
        zoomWidth,
        zoomHeight,
        lqip: card.image.asset.metadata?.lqip ?? undefined,
      },
    ];
  });
}
