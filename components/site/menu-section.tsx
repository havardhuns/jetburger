import { MenuGrid, type MenuGridCard } from "@/components/site/menu-grid";
import type { Settings } from "@/lib/site-data";

export function MenuSection({ settings, menuCards }: { settings: Settings; menuCards: MenuGridCard[] }) {
  const { menuHeading, menuText, orderUrl, orderCtaLabel, orderingEnabled, telHref, phone } = settings;
  return (
    <section id="meny" className="mx-auto max-w-[1120px] px-5 py-[clamp(48px,8vw,72px)] lg:px-6">
      <div className="mb-9 flex flex-col gap-2.5">
        <span className="text-[13px] font-bold tracking-[0.12em] text-primary uppercase">Meny</span>
        {menuHeading && (
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight">{menuHeading}</h2>
        )}
        <p className="max-w-[55ch] leading-relaxed text-muted-foreground">
          {menuText}
          {orderUrl && orderingEnabled && (
            <>
              {" "}
              <a href={orderUrl} target="_blank" rel="noopener" data-umami-event="bestill-klikk" data-umami-event-sted="meny" className="font-semibold text-primary">
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
      <MenuGrid cards={menuCards} />
    </section>
  );
}
