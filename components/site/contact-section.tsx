import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Settings } from "@/lib/site-data";

export function ContactSection({ settings }: { settings: Settings }) {
  const { contactHeading, address, telHref, phone, email, openingHoursLines, facebookUrl, instagramUrl } = settings;
  return (
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
              {openingHoursLines.length > 0 && (
                <div className="flex items-start gap-3.5">
                  <span className="flex size-9.5 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <Clock className="size-4" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-bold">Åpningstider</span>
                    <span className="flex flex-col text-[15px] text-muted-foreground">
                      {openingHoursLines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
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
            src={`https://www.google.com/maps?q=${encodeURIComponent(`Jetburger, ${address}`)}&output=embed`}
            title="Kart til Jetburger"
            loading="lazy"
            className="min-h-[380px] w-full rounded-xl border border-border invert-[.92] hue-rotate-180 grayscale-[0.25] contrast-[.95]"
          />
        )}
      </div>
    </section>
  );
}
