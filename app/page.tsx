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

  if (!settings) {
    throw new Error("The siteSettings document is missing in Sanity — run `pnpm seed`.");
  }

  const { heroHeading, heroText, menuHeading, menuText, aboutHeading, aboutText, contactHeading, phone, email, address, openingHours, orderUrl, facebookUrl, instagramUrl } = settings;
  const telHref = phone ? `tel:${phone.replace(/\s/g, "")}` : undefined;
  const orderCtaLabel = settings.orderCtaLabel ?? "Bestill på nett";

  const logo = settings.logo?.asset
    ? { src: urlFor(settings.logo).width(80).height(80).fit("crop").url(), alt: settings.logo.alt ?? "Jetburger" }
    : undefined;

  const hero = settings.heroImage?.asset
    ? {
        src: urlFor(settings.heroImage).width(2048).url(),
        alt: settings.heroImage.alt ?? "Jetburger i Evje sentrum",
        lqip: settings.heroImage.asset.metadata?.lqip ?? undefined,
      }
    : undefined;

  const cards: MenuGridCard[] = menuCards.flatMap((card) => {
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

  const aboutParagraphs = (aboutText ?? "").split(/\n+/).filter(Boolean);

  return (
    <div className="flex-1">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-6 px-5 lg:px-6">
          <a href="#hjem" className="flex items-center gap-2.5">
            {logo && (
              <Image src={logo.src} alt={logo.alt} width={40} height={40} className="size-10 rounded-lg object-cover" />
            )}
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
              {telHref && (
                <a href={telHref} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-foreground">
                  <Phone className="size-3.5" />
                  {phone}
                </a>
              )}
            </div>
            {orderUrl && (
              <Button
                className="ml-3 font-bold"
                nativeButton={false}
                render={<a href={orderUrl} target="_blank" rel="noopener" />}
              >
                <ShoppingCart data-icon="inline-start" />
                {orderCtaLabel}
              </Button>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="hjem" className="relative overflow-hidden">
        {hero && (
          <>
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
          </>
        )}
        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1120px] flex-col items-start justify-center gap-6 px-5 pt-[clamp(72px,12vw,120px)] pb-[clamp(88px,13vw,140px)] md:min-h-0 md:justify-start lg:px-6">
          <FadeUp delay={0.08}>
            <h1 className="max-w-[15ch] text-[clamp(40px,6vw,72px)] leading-[1.04] font-black tracking-tighter">
              <Heading text={heroHeading ?? "Jetburger"} />
            </h1>
          </FadeUp>
          {heroText && (
            <FadeUp delay={0.16}>
              <p className="max-w-[46ch] text-lg leading-relaxed text-foreground/90">{heroText}</p>
            </FadeUp>
          )}
          <FadeUp delay={0.24} className="mt-2 flex flex-wrap gap-3">
            {orderUrl && (
              <Button
                size="lg"
                className="h-12 px-7 text-base font-bold"
                nativeButton={false}
                render={<a href={orderUrl} target="_blank" rel="noopener" />}
              >
                {orderCtaLabel}
              </Button>
            )}
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
          <FadeUp delay={0.32} className="mt-3 flex flex-col md:flex-wrap md:items-center gap-x-4 gap-y-2.5 text-sm font-medium text-foreground/80">
            {openingHours && (
              <span className="flex items-center gap-2">
                <Clock className="size-4" />
                Åpent {openingHours.toLowerCase()}
              </span>
            )}
            {telHref && (
              <span className="flex items-center gap-2">
                <Phone className="size-3.5" />
                <a href={telHref} className="font-semibold text-foreground">
                  {phone}
                </a>
              </span>
            )}
          </FadeUp>
        </div>
      </section>

      {/* Meny */}
      <section id="meny" className="mx-auto max-w-[1120px] px-5 py-[clamp(48px,8vw,72px)] lg:px-6">
        <div className="mb-9 flex flex-col gap-2.5">
          <span className="text-[13px] font-bold tracking-[0.12em] text-primary uppercase">Meny</span>
          {menuHeading && (
            <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight">{menuHeading}</h2>
          )}
          <p className="max-w-[55ch] leading-relaxed text-muted-foreground">
            {menuText}
            {orderUrl && (
              <>
                {" "}
                <a href={orderUrl} target="_blank" rel="noopener" className="font-semibold text-primary">
                  {orderCtaLabel}
                </a>
                {telHref ? "," : "."}
              </>
            )}
            {telHref && (
              <>
                {" "}eller ring oss på{" "}
                <a href={telHref} className="font-semibold text-primary">
                  {phone}
                </a>
                .
              </>
            )}
          </p>
        </div>
        <MenuGrid cards={cards} />
      </section>

      {/* Om oss */}
      <section id="om-oss" className="border-y border-border bg-background-alt">
        <div className="mx-auto grid max-w-[1120px] items-center gap-[clamp(28px,5vw,48px)] px-5 py-[clamp(48px,8vw,72px)] md:grid-cols-2 lg:px-6">
          <div className="flex flex-col gap-4">
            <span className="text-[13px] font-bold tracking-[0.12em] text-primary uppercase">Om oss</span>
            {aboutHeading && (
              <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight">{aboutHeading}</h2>
            )}
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="leading-[1.7] text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          {hero && (
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
          )}
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="mx-auto max-w-[1120px] px-5 py-[clamp(48px,8vw,72px)] lg:px-6">
        <div className="mb-9 flex flex-col gap-2.5">
          <span className="text-[13px] font-bold tracking-[0.12em] text-primary uppercase">Kontakt</span>
          {contactHeading && (
            <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight">{contactHeading}</h2>
          )}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Card>
              <CardContent className="flex flex-col gap-4.5 p-6">
                {address && (
                  <div className="flex items-start gap-3.5">
                    <span className="flex size-9.5 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                      <MapPin className="size-4" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[15px] font-bold">Adresse</span>
                      <span className="text-[15px] text-muted-foreground">{address}</span>
                    </div>
                  </div>
                )}
                {telHref && (
                  <div className="flex items-start gap-3.5">
                    <span className="flex size-9.5 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                      <Phone className="size-4" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[15px] font-bold">Telefon</span>
                      <a href={telHref} className="text-[15px] font-semibold text-primary">
                        {phone}
                      </a>
                    </div>
                  </div>
                )}
                {email && (
                  <div className="flex items-start gap-3.5">
                    <span className="flex size-9.5 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                      <Mail className="size-4" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[15px] font-bold">E-post</span>
                      <a href={`mailto:${email}`} className="text-[15px] text-muted-foreground hover:text-foreground">
                        {email}
                      </a>
                    </div>
                  </div>
                )}
                {openingHours && (
                  <div className="flex items-start gap-3.5">
                    <span className="flex size-9.5 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                      <Clock className="size-4" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[15px] font-bold">Åpningstider</span>
                      <span className="text-[15px] text-muted-foreground">{openingHours}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            {(facebookUrl || instagramUrl) && (
              <div className="flex gap-3">
                {facebookUrl && (
                  <Button
                    variant="outline"
                    className="h-11 flex-1 font-semibold hover:border-primary/45"
                    nativeButton={false}
                    render={<a href={facebookUrl} target="_blank" rel="noopener" />}
                  >
                    <SiFacebook data-icon="inline-start" />
                    Facebook
                  </Button>
                )}
                {instagramUrl && (
                  <Button
                    variant="outline"
                    className="h-11 flex-1 font-semibold hover:border-primary/45"
                    nativeButton={false}
                    render={<a href={instagramUrl} target="_blank" rel="noopener" />}
                  >
                    <SiInstagram data-icon="inline-start" />
                    Instagram
                  </Button>
                )}
              </div>
            )}
          </div>
          {address && (
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
              title="Kart til Jetburger"
              loading="lazy"
              className="min-h-[380px] w-full rounded-xl border border-border invert-[.92] hue-rotate-180 grayscale-[0.25] contrast-[.95]"
            />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-5 py-7 lg:px-6">
          <div className="flex items-center gap-2.5">
            {logo && <Image src={logo.src} alt="" width={28} height={28} className="size-7 rounded-md object-cover" />}
            <span className="text-[13px] text-muted-foreground">© {new Date().getFullYear()} Jetburger · Evje</span>
          </div>
          <span className="text-[13px] text-muted-foreground">
            {orderUrl && (
              <>
                <a href={orderUrl} target="_blank" rel="noopener" className="font-semibold hover:text-foreground">
                  {orderCtaLabel}
                </a>{" "}
                eller{" "}
              </>
            )}
            {telHref && (
              <>
                ring{" "}
                <a href={telHref} className="font-semibold hover:text-foreground">
                  {phone}
                </a>
              </>
            )}
          </span>
        </div>
      </footer>
    </div>
  );
}
