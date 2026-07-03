import { Clock, Mail, MapPin, Phone, ShoppingCart } from "lucide-react";
import Image from "next/image";

import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import { FadeUp } from "@/components/site/fade-up";
import { MenuGrid, type MenuGridCard } from "@/components/site/menu-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { MENU_CARDS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

const DEFAULTS = {
  heroHeading: "Evje-trioen med bygdas (kanskje) beste burger",
  heroText:
    "Hjemmelagde burgere, hjemmelaget pizza og sprø fries — laget fra bunnen, midt i Evje sentrum.",
  aboutHeading: "Laget fra bunnen, midt i bygda",
  aboutText:
    "Jetburger drives av en trio fra Evje med ett mål: skikkelig god gatekjøkkenmat laget fra bunnen. Burgere med hjemmelaget dressing, hjemmelaget pizza og sprø fries — servert raskt, uten snarveier.\n\nDu finner oss midt i sentrum. Spis her, eller ta med hjem.",
  phone: "901 79 399",
  email: "evjeftas@gmail.com",
  address: "Nils Heglands veg 100, 4735 Evje",
  openingHours: "Alle dager 15:00–22:00",
  orderUrl: "https://bestilling.example.no/jetburger",
  facebookUrl: "https://www.facebook.com/p/Jetburger-100057352394070/",
  instagramUrl: "https://www.instagram.com/jetburger.no/",
};

const FALLBACK_MENU_CARDS: MenuGridCard[] = [
  { key: "burgere", title: "Burgere", src: "/meny-burgere.jpg", zoomSrc: "/meny-burgere.jpg" },
  { key: "pizza", title: "Pizza & barnemeny", src: "/meny-pizza.jpg", zoomSrc: "/meny-pizza.jpg" },
  { key: "sides", title: "Sides & snacks", src: "/meny-sides.jpg", zoomSrc: "/meny-sides.jpg" },
];

/** Renders a parenthesized part of the heading in the accent color, like the design's "(kanskje)". */
function Heading({ text }: { text: string }) {
  const match = text.match(/^([^(]*)(\([^)]*\))(.*)$/);
  if (!match) return text;
  return (
    <>
      {match[1]}
      <em className="not-italic text-primary">{match[2]}</em>
      {match[3]}
    </>
  );
}

export default async function Home() {
  const [{ data: settings }, { data: menuCards }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: MENU_CARDS_QUERY }),
  ]);

  const site = {
    heroHeading: settings?.heroHeading ?? DEFAULTS.heroHeading,
    heroText: settings?.heroText ?? DEFAULTS.heroText,
    aboutHeading: settings?.aboutHeading ?? DEFAULTS.aboutHeading,
    aboutText: settings?.aboutText ?? DEFAULTS.aboutText,
    phone: settings?.phone ?? DEFAULTS.phone,
    email: settings?.email ?? DEFAULTS.email,
    address: settings?.address ?? DEFAULTS.address,
    openingHours: settings?.openingHours ?? DEFAULTS.openingHours,
    orderUrl: settings?.orderUrl ?? DEFAULTS.orderUrl,
    facebookUrl: settings?.facebookUrl ?? DEFAULTS.facebookUrl,
    instagramUrl: settings?.instagramUrl ?? DEFAULTS.instagramUrl,
  };
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

  const logo = settings?.logo?.asset
    ? { src: urlFor(settings.logo).width(80).height(80).fit("crop").url(), alt: settings.logo.alt ?? "Jetburger" }
    : { src: "/logo.jpg", alt: "Jetburger" };

  const hero = settings?.heroImage?.asset
    ? {
        src: urlFor(settings.heroImage).width(2048).url(),
        alt: settings.heroImage.alt ?? "Jetburger i Evje sentrum",
        lqip: settings.heroImage.asset.metadata?.lqip ?? undefined,
      }
    : { src: "/storefront.jpg", alt: "Jetburger i Evje sentrum", lqip: undefined };

  const cards: MenuGridCard[] =
    menuCards && menuCards.length > 0
      ? menuCards.map((card) => ({
          key: card._id,
          title: card.title ?? "Meny",
          src: card.image?.asset ? urlFor(card.image).width(720).url() : "/meny-burgere.jpg",
          zoomSrc: card.image?.asset ? urlFor(card.image).width(1454).url() : "/meny-burgere.jpg",
          lqip: card.image?.asset?.metadata?.lqip ?? undefined,
        }))
      : FALLBACK_MENU_CARDS;

  const aboutParagraphs = site.aboutText.split(/\n+/).filter(Boolean);

  return (
    <div className="flex-1">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-6 px-5 lg:px-6">
          <a href="#hjem" className="flex items-center gap-2.5">
            <Image src={logo.src} alt={logo.alt} width={40} height={40} className="size-10 rounded-lg object-cover" />
            <span className="text-lg font-extrabold tracking-tight">Jetburger</span>
          </a>
          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-1 md:flex">
              <a href="#meny" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground">
                Meny
              </a>
              <a href="#om-oss" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground">
                Om oss
              </a>
              <a href="#kontakt" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground">
                Kontakt
              </a>
              <a href={telHref} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-foreground">
                <Phone className="size-3.5" />
                {site.phone}
              </a>
            </div>
            <Button
              className="ml-3 font-bold"
              nativeButton={false}
              render={<a href={site.orderUrl} target="_blank" rel="noopener" />}
            >
              <ShoppingCart data-icon="inline-start" />
              Bestill på nett
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="hjem" className="relative overflow-hidden">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          preload
          sizes="100vw"
          placeholder={hero.lqip ? "blur" : "empty"}
          blurDataURL={hero.lqip}
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background" />
        <div className="relative mx-auto flex max-w-[1120px] flex-col items-start gap-6 px-5 pt-[clamp(72px,12vw,120px)] pb-[clamp(88px,13vw,140px)] lg:px-6">
          <FadeUp delay={0.08}>
            <h1 className="max-w-[15ch] text-[clamp(40px,6vw,72px)] leading-[1.04] font-black tracking-tighter">
              <Heading text={site.heroHeading} />
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="max-w-[46ch] text-lg leading-relaxed text-foreground/90">{site.heroText}</p>
          </FadeUp>
          <FadeUp delay={0.24} className="mt-2 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="h-12 px-7 text-base font-bold"
              nativeButton={false}
              render={<a href={site.orderUrl} target="_blank" rel="noopener" />}
            >
              Bestill på nett
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 bg-background/60 px-7 text-base font-semibold hover:bg-background/85 hover:text-foreground"
              nativeButton={false}
              render={<a href="#meny" />}
            >
              Se menyen
            </Button>
          </FadeUp>
          <FadeUp delay={0.32} className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-sm font-medium text-foreground/80">
            <span className="flex items-center gap-2">
              <Clock className="size-4" />
              Åpent {site.openingHours.toLowerCase()}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="size-3.5" />
              <a href={telHref} className="font-semibold text-foreground">
                {site.phone}
              </a>
            </span>
          </FadeUp>
        </div>
      </section>

      {/* Meny */}
      <section id="meny" className="mx-auto max-w-[1120px] px-5 py-[clamp(48px,8vw,72px)] lg:px-6">
        <div className="mb-9 flex flex-col gap-2.5">
          <span className="text-[13px] font-bold tracking-[0.12em] text-primary uppercase">Meny</span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight">Det vi lager</h2>
          <p className="max-w-[55ch] leading-relaxed text-muted-foreground">
            Trykk på et menykort for å se det i full størrelse.{" "}
            <a href={site.orderUrl} target="_blank" rel="noopener" className="font-semibold text-primary">
              Bestill på nett
            </a>
            , eller ring oss på{" "}
            <a href={telHref} className="font-semibold text-primary">
              {site.phone}
            </a>
            .
          </p>
        </div>
        <MenuGrid cards={cards} />
      </section>

      {/* Om oss */}
      <section id="om-oss" className="border-y border-border bg-background-alt">
        <div className="mx-auto grid max-w-[1120px] items-center gap-[clamp(28px,5vw,48px)] px-5 py-[clamp(48px,8vw,72px)] md:grid-cols-2 lg:px-6">
          <div className="flex flex-col gap-4">
            <span className="text-[13px] font-bold tracking-[0.12em] text-primary uppercase">Om oss</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight">{site.aboutHeading}</h2>
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="leading-[1.7] text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <Image
            src={hero.src}
            alt={hero.alt}
            width={1024}
            height={607}
            sizes="(min-width: 768px) 50vw, 100vw"
            placeholder={hero.lqip ? "blur" : "empty"}
            blurDataURL={hero.lqip}
            className="w-full rounded-xl border border-border"
          />
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="mx-auto max-w-[1120px] px-5 py-[clamp(48px,8vw,72px)] lg:px-6">
        <div className="mb-9 flex flex-col gap-2.5">
          <span className="text-[13px] font-bold tracking-[0.12em] text-primary uppercase">Kontakt</span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight">Finn oss</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Card>
              <CardContent className="flex flex-col gap-4.5 p-6">
                <div className="flex items-start gap-3.5">
                  <span className="flex size-9.5 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <MapPin className="size-4" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-bold">Adresse</span>
                    <span className="text-[15px] text-muted-foreground">{site.address}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="flex size-9.5 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <Phone className="size-4" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-bold">Telefon</span>
                    <a href={telHref} className="text-[15px] font-semibold text-primary">
                      {site.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="flex size-9.5 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <Mail className="size-4" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-bold">E-post</span>
                    <a href={`mailto:${site.email}`} className="text-[15px] text-muted-foreground hover:text-foreground">
                      {site.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <span className="flex size-9.5 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <Clock className="size-4" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-bold">Åpningstider</span>
                    <span className="text-[15px] text-muted-foreground">{site.openingHours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="h-11 flex-1 font-semibold hover:border-primary/45"
                nativeButton={false}
              render={<a href={site.facebookUrl} target="_blank" rel="noopener" />}
              >
                <SiFacebook data-icon="inline-start" />
                Facebook
              </Button>
              <Button
                variant="outline"
                className="h-11 flex-1 font-semibold hover:border-primary/45"
                nativeButton={false}
              render={<a href={site.instagramUrl} target="_blank" rel="noopener" />}
              >
                <SiInstagram data-icon="inline-start" />
                Instagram
              </Button>
            </div>
          </div>
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
            title="Kart til Jetburger"
            loading="lazy"
            className="min-h-[380px] w-full rounded-xl border border-border invert-[.92] hue-rotate-180 grayscale-[0.25] contrast-[.95]"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-5 py-7 lg:px-6">
          <div className="flex items-center gap-2.5">
            <Image src={logo.src} alt="" width={28} height={28} className="size-7 rounded-md object-cover" />
            <span className="text-[13px] text-muted-foreground">© {new Date().getFullYear()} Jetburger · Evje</span>
          </div>
          <span className="text-[13px] text-muted-foreground">
            <a href={site.orderUrl} target="_blank" rel="noopener" className="font-semibold hover:text-foreground">
              Bestill på nett
            </a>{" "}
            eller ring{" "}
            <a href={telHref} className="font-semibold hover:text-foreground">
              {site.phone}
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
