import { Phone, ShoppingCart } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import type { Settings } from "@/lib/site-data";

export function SiteHeader({ settings }: { settings: Settings }) {
  const { logo, telHref, phone, orderUrl, orderCtaLabel } = settings;
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-6 px-5 lg:px-6">
        <a href="#hjem" className="flex items-center gap-2.5">
          {logo && (
            <Image src={logo.src} alt={logo.alt} width={40} height={40} unoptimized={logo.unoptimized} className="size-10 rounded-lg object-cover" />
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
              render={<a href={orderUrl} target="_blank" rel="noopener" data-umami-event="bestill-klikk" data-umami-event-sted="header" />}
            >
              <ShoppingCart data-icon="inline-start" />
              {orderCtaLabel}
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
