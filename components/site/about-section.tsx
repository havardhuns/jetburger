import Image from "next/image";

import type { Settings } from "@/lib/site-data";

export function AboutSection({ settings }: { settings: Settings }) {
  const { aboutHeading, aboutParagraphs, hero } = settings;
  return (
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
  );
}
