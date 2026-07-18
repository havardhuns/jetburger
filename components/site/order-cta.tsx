import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  ResponsiveTooltip,
  ResponsiveTooltipContent,
  ResponsiveTooltipTrigger,
} from "@/components/ui/responsive-tooltip";
import type { Settings } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/**
 * The "Bestill på nett" button. A live link when online ordering is enabled;
 * a dimmed button that explains why via tooltip when it's not. Renders
 * nothing without an order URL.
 */
export function OrderCta({
  settings,
  sted,
  size,
  className,
  disabledClassName,
  icon,
}: {
  settings: Settings;
  /** Where on the page this CTA sits — becomes data-umami-event-sted. */
  sted: string;
  size?: ComponentProps<typeof Button>["size"];
  className?: string;
  /** Extra classes applied only to the disabled variant. */
  disabledClassName?: string;
  icon?: ReactNode;
}) {
  const { orderUrl, orderCtaLabel, orderingEnabled, orderingDisabledMessage } = settings;
  if (!orderUrl) return;
  if (orderingEnabled) {
    return (
      <Button
        size={size}
        className={className}
        nativeButton={false}
        render={<a href={orderUrl} target="_blank" rel="noopener" data-umami-event="bestill-klikk" data-umami-event-sted={sted} />}
      >
        {icon}
        {orderCtaLabel}
      </Button>
    );
  }
  return (
    <ResponsiveTooltip>
      <ResponsiveTooltipTrigger
        render={<Button size={size} className={cn("opacity-50 cursor-pointer", className, disabledClassName)} />}
      >
        {icon}
        {orderCtaLabel}
      </ResponsiveTooltipTrigger>
      <ResponsiveTooltipContent>{orderingDisabledMessage}</ResponsiveTooltipContent>
    </ResponsiveTooltip>
  );
}
