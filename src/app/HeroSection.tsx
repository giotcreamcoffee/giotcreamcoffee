"use client";

import { useState } from "react";
import HeroCarousel from "./HeroCarousel";

const MOBILE_BANNER: Record<number, string> = {
  0: "🍁 NEW FALL ADDITION 🍁",
  1: "☀️ NEW SUMMER ADDITION ☀️",
  2: "Cool Down With Our New Refreshers",
  3: "Cool Down With Our New Refreshers",
};

/* Salted Maple Sesame drink names. Figma only places these on the mobile frame
   (177:62); the desktop coordinates are those same positions mapped through the
   crop difference between the two frames, so every name keeps its own drink.
   Two desktop exceptions: "sesame tea"'s mapped spot lands in the strip the
   desktop hero crops away, so it sits beside the glass instead, and
   "Sesame Matcha" is pulled left of its mapped x to clear the Order Online
   button, which overlays the top centre of the desktop hero. */
const MAPLE_LABELS = [
  { top: "Maple Sesame",     bottom: "Latte",         mobile: [8.729, 41.063],  desktop: [22.119, 47.628] },
  { top: "Salted Maple",     bottom: "Sesame Matcha", mobile: [28.137, 32.158], desktop: [28.000, 27.545] },
  { top: "Maple Sesame",     bottom: "Viet Coffee",   mobile: [44.510, 51.340], desktop: [47.420, 70.804] },
  { top: "Maple Sesame",     bottom: "White Coffee",  mobile: [62.823, 50.281], desktop: [60.370, 68.416] },
  { top: "Maple Sesame",     bottom: "Matcha",        mobile: [80.766, 49.373], desktop: [73.058, 66.368] },
  { top: "Magnolia Jasmine", bottom: "Sesame Milk Tea", mobile: [28.801, 62.810], desktop: [17.500, 74.000] },
] as const;

/* The labels sit on a layer that matches the image's object-cover box, so they
   track the art at any window size. Below md the art is always width-fitted;
   on desktop either axis can win, so that layer is sized to cover explicitly.
   Font size is a fixed share of the art's width, matching the Figma ratio. */
const MAPLE_ART = {
  mobile: {
    ratio: "1622 / 3112",
    width: "100%",
    font: "2.48vw",
  },
  desktop: {
    ratio: "2752 / 1655",
    width: "max(100%, calc(min(75vh, 864px) * 2752 / 1655))",
    font: "calc(max(100vw, calc(min(75vh, 864px) * 2752 / 1655)) * 0.017414)",
  },
} as const;

function MapleLabels({ view }: { view: "mobile" | "desktop" }) {
  const art = MAPLE_ART[view];
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ width: art.width, aspectRatio: art.ratio }}
    >
      {MAPLE_LABELS.map((label) => {
        const [left, top] = label[view];
        return (
          <div
            key={label.bottom}
            className="absolute font-sans text-white whitespace-nowrap font-semibold"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              fontSize: art.font,
              lineHeight: 0.82,
              letterSpacing: "-0.01em",
              textShadow: "0 1px 2px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.7)",
            }}
          >
            {label.top}
            <br />
            {label.bottom}
          </div>
        );
      })}
    </div>
  );
}

interface Props {
  assets: {
    heroLeft: string;
    heroMapleDesktop: string;
    heroMapleMobile: string;
    heroCornDesktop: string;
    heroCornMobile: string;
    heroCenter: string;
  };
}

export default function HeroSection({ assets }: Props) {
  const [mobileSlide, setMobileSlide] = useState(0);

  return (
    <>
      {/* ── Promo banner ── */}
      <div className="bg-[#b9ac89] flex items-center justify-center py-3 md:py-[18px] px-4">
        {/* Desktop: always the Salted Maple Sesame hero */}
        <p className="hidden md:block text-white text-sm font-medium tracking-[0.15em] uppercase text-center">
          🍁 NEW FALL ADDITION 🍁
        </p>
        {/* Mobile: changes with carousel slide */}
        <p className="md:hidden text-white text-[10px] font-medium tracking-[0.1em] uppercase text-center transition-opacity duration-300">
          {MOBILE_BANNER[mobileSlide]}
        </p>
      </div>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ height: "min(75vh, 864px)" }}
      >
        {/* Mobile: swipeable carousel */}
        <div className="md:hidden h-full">
          <HeroCarousel
            onSlideChange={setMobileSlide}
            initialIndex={0}
            images={[
              {
                src: assets.heroMapleMobile,
                alt: "Salted Maple Sesame series",
                slideOverlay: <MapleLabels view="mobile" />,
              },
              { src: assets.heroCornMobile, alt: "Sweet Corn Series" },
              { src: assets.heroLeft, alt: "Tropic Sunrise", objectPosition: "bottom" },
              { src: assets.heroCenter, alt: "Giot signature drinks" },
            ]}
            overlay={
              <div className="absolute inset-0 flex items-end justify-center pb-[calc(8%+20px)] px-6 pointer-events-none">
                <div className="text-center pointer-events-auto">
                  <a href="https://order.snackpass.co/giotcreamcoffee" target="_blank" rel="noopener noreferrer" className="bg-[#252a38] text-white rounded-full px-6 py-2.5 text-sm font-semibold tracking-widest uppercase cursor-pointer inline-block ring-2 ring-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                    Order Online
                  </a>
                </div>
              </div>
            }
          />
        </div>

        {/* Desktop: full-width Salted Maple Sesame hero */}
        <div className="hidden md:block relative h-full overflow-hidden">
          <img
            src={assets.heroMapleDesktop}
            alt="Salted Maple Sesame"
            className="w-full h-full object-cover"
          />
          <MapleLabels view="desktop" />
          <div className="absolute inset-0 flex items-start justify-center pt-[5%] pointer-events-none">
            <a href="https://order.snackpass.co/giotcreamcoffee" target="_blank" rel="noopener noreferrer" className="pointer-events-auto bg-[#252a38] text-white rounded-full px-8 py-3 text-base font-semibold tracking-widest uppercase shadow-[0_4px_20px_rgba(0,0,0,0.5)] ring-2 ring-white/40 hover:bg-white hover:text-[#252a38] hover:ring-transparent transition-colors duration-300 cursor-pointer inline-block">
              Order Online
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
