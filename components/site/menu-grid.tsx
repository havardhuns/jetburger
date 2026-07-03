"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export type MenuGridCard = {
  key: string;
  title: string;
  src: string;
  zoomSrc: string;
  zoomWidth?: number;
  zoomHeight?: number;
  lqip?: string;
};

export function MenuGrid({ cards }: { cards: MenuGridCard[] }) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <button
            key={card.key}
            type="button"
            aria-label={`Vis ${card.title} i full størrelse`}
            onClick={() => setIndex(i)}
            className="overflow-hidden rounded-xl border border-border bg-card transition-[transform,border-color] duration-200 outline-none hover:-translate-y-1 hover:border-primary/45 focus-visible:ring-3 focus-visible:ring-ring/30"
          >
            <Image
              src={card.src}
              alt={card.title}
              width={720}
              height={984}
              placeholder={card.lqip ? "blur" : "empty"}
              blurDataURL={card.lqip}
              className="block h-auto w-full"
            />
          </button>
        ))}
      </div>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={cards.map((card) => ({
          src: card.zoomSrc,
          alt: card.title,
          width: card.zoomWidth,
          height: card.zoomHeight,
        }))}
        plugins={[Zoom]}
        styles={{ container: { backgroundColor: "rgb(10 8 7 / 0.92)" } }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}
