import { AboutSection } from "@/components/site/about-section";
import { ContactSection } from "@/components/site/contact-section";
import { Hero } from "@/components/site/hero";
import { MenuSection } from "@/components/site/menu-section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { deriveMenuCards, deriveSettings } from "@/lib/site-data";
import { sanityFetch } from "@/sanity/lib/live";
import { MENU_CARDS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const [{ data: siteSettingsData }, { data: menuCardsData }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: MENU_CARDS_QUERY }),
  ]);

  if (!siteSettingsData) {
    throw new Error("The siteSettings document is missing in Sanity — run `pnpm seed`.");
  }

  const settings = deriveSettings(siteSettingsData);
  const menuCards = deriveMenuCards(menuCardsData);

  return (
    <div className="flex-1">
      <SiteHeader settings={settings} />
      <Hero settings={settings} />
      <MenuSection settings={settings} menuCards={menuCards} />
      <AboutSection settings={settings} />
      <ContactSection settings={settings} />
      <SiteFooter settings={settings} />
    </div>
  );
}
