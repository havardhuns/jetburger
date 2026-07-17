import { Clock, Phone } from "lucide-react";
import Image from "next/image";

import { FadeUp } from "@/components/site/fade-up";
import { Button } from "@/components/ui/button";
import { ResponsiveTooltip, ResponsiveTooltipContent, ResponsiveTooltipTrigger } from "@/components/ui/tooltip";
import type { Settings } from "@/lib/site-data";

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

export function Hero({ settings }: { settings: Settings }) {
  const {
    hero,
    heroHeading,
    heroText,
    orderUrl,
    orderCtaLabel,
    orderingEnabled,
    orderingDisabledMessage,
    openingHoursCompact,
    telHref,
    phone,
  } = settings;
  return (
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
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 via-45% to-background to-90%" />
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
        <FadeUp delay={0.24} nosnippet className="mt-2 flex flex-wrap gap-3">
          {orderUrl && (orderingEnabled ? (
            <Button
              size="lg"
              className="h-12 px-7 text-base font-bold"
              nativeButton={false}
              render={<a href={orderUrl} target="_blank" rel="noopener" data-umami-event="bestill-klikk" data-umami-event-sted="hero" />}
            >
              {orderCtaLabel}
            </Button>
          ) : (
            <ResponsiveTooltip>
              <ResponsiveTooltipTrigger
                render={<Button size="lg" className="h-12 px-7 text-base font-bold opacity-50 cursor-pointer" />}
              >
                {orderCtaLabel}
              </ResponsiveTooltipTrigger>
              <ResponsiveTooltipContent>{orderingDisabledMessage}</ResponsiveTooltipContent>
            </ResponsiveTooltip>
          ))}
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
        <FadeUp
          delay={0.32}
          className="mt-1 flex flex-col items-start gap-2 text-sm font-medium text-foreground/80 md:mt-3 md:flex-row md:flex-wrap md:items-center md:gap-x-4 md:gap-y-2.5"
        >
          {openingHoursCompact && (
            <span className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/55 py-1.5 pr-3.5 pl-2.5 backdrop-blur-sm md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
              <Clock className="size-4 text-primary md:text-foreground/80" />
              Åpent {openingHoursCompact}
            </span>
          )}
          {telHref && (
            <span className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/55 py-1.5 pr-3.5 pl-2.5 backdrop-blur-sm md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
              <Phone className="size-4 text-primary md:text-foreground/80" />
              <a href={telHref} className="font-semibold text-foreground">
                {phone}
              </a>
            </span>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
