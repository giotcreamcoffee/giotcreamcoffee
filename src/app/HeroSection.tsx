"use client";

import { useState } from "react";
import HeroCarousel from "./HeroCarousel";

const MOBILE_BANNER: Record<number, string> = {
  0: "Cool Down With Our New Refreshers",
  1: "☀️ NEW SUMMER ADDITION ☀️",
  2: "Cool Down With Our New Refreshers",
};

interface Props {
  assets: {
    heroLeft: string;
    heroMangoDesktop: string;
    heroMangoMobile: string;
    heroCenter: string;
  };
}

export default function HeroSection({ assets }: Props) {
  const [mobileSlide, setMobileSlide] = useState(1);

  return (
    <>
      {/* ── Promo banner ── */}
      <div className="bg-[#b9ac89] flex items-center justify-center py-3 md:py-[18px] px-4">
        {/* Desktop: always the Mango hero */}
        <p className="hidden md:block text-white text-sm font-medium tracking-[0.15em] uppercase text-center">
          ☀️ NEW SUMMER ADDITION ☀️
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
            images={[
              { src: assets.heroLeft, alt: "" },
              {
                src: assets.heroMangoMobile,
                alt: "Mango Sticky Rice",
                slideOverlay: (
                  <div className="absolute inset-0 pointer-events-none">
                    <span className="absolute font-sans font-extrabold text-white uppercase" style={{ left: "30.3%", top: "5.5%",  fontSize: "clamp(1.1rem, 7.5vw, 1.9rem)", letterSpacing: "0.06em" }}>MANGO</span>
                    <span className="absolute font-sans font-extrabold text-white uppercase" style={{ left: "43.0%", top: "11%",   fontSize: "clamp(1.1rem, 7.5vw, 1.9rem)", letterSpacing: "0.06em" }}>STICKY</span>
                    <span className="absolute font-sans font-extrabold text-white uppercase" style={{ left: "38.3%", top: "16.5%", fontSize: "clamp(1.1rem, 7.5vw, 1.9rem)", letterSpacing: "0.06em" }}>RICE</span>
                    <span className="absolute text-white" style={{ left: "40.3%", top: "22%", fontSize: "clamp(0.75rem, 5vw, 1.25rem)" }}>seasonal</span>
                  </div>
                ),
              },
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

        {/* Desktop: full-width Mango Sticky Rice hero */}
        <div className="hidden md:block relative h-full overflow-hidden">
          <img
            src={assets.heroMangoDesktop}
            alt="Mango Sticky Rice"
            className="w-full h-full object-cover"
          />
          <span className="absolute font-sans font-extrabold text-white uppercase pointer-events-none" style={{ left: "10.7%", top: "21%",  fontSize: "clamp(1.8rem, 3.46vw, 3.5rem)", letterSpacing: "0.06em" }}>MANGO</span>
          <span className="absolute font-sans font-extrabold text-white uppercase pointer-events-none" style={{ left: "19.2%", top: "30%",  fontSize: "clamp(1.8rem, 3.46vw, 3.5rem)", letterSpacing: "0.06em" }}>STICKY</span>
          <span className="absolute font-sans font-extrabold text-white uppercase pointer-events-none" style={{ left: "16.9%", top: "39%",  fontSize: "clamp(1.8rem, 3.46vw, 3.5rem)", letterSpacing: "0.06em" }}>RICE</span>
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
