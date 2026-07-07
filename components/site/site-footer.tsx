import Image from "next/image";

import type { Settings } from "@/lib/site-data";

export function SiteFooter({ settings }: { settings: Settings }) {
  const { logo, orderUrl, orderCtaLabel, telHref, phone } = settings;
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-5 py-7 lg:px-6">
        <div className="flex items-center gap-2.5">
          {logo && <Image src={logo.src} alt="" width={28} height={28} unoptimized={logo.unoptimized} className="size-7 rounded-md object-cover" />}
          <span className="text-[13px] text-muted-foreground">© {new Date().getFullYear()} Jetburger · Evje</span>
        </div>
        <span className="text-[13px] text-muted-foreground">
          {orderUrl && (
            <>
              <a href={orderUrl} target="_blank" rel="noopener" data-umami-event="bestill-klikk" data-umami-event-sted="footer" className="font-semibold hover:text-foreground">
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
  );
}
