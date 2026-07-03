"use client";

import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export type MenuGridCard = {
  key: string;
  title: string;
  src: string;
  zoomSrc: string;
  lqip?: string;
};

export function MenuGrid({ cards }: { cards: MenuGridCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <figure
          key={card.key}
          className="m-0 overflow-hidden rounded-xl border border-border bg-card transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-primary/45"
        >
          <Zoom zoomImg={{ src: card.zoomSrc, alt: card.title }}>
            <Image
              src={card.src}
              alt={card.title}
              width={720}
              height={984}
              placeholder={card.lqip ? "blur" : "empty"}
              blurDataURL={card.lqip}
              className="block aspect-[3/4.1] w-full object-cover object-top"
            />
          </Zoom>
        </figure>
      ))}
    </div>
  );
}
