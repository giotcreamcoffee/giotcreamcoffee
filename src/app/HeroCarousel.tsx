"use client";

import { useState, useRef } from "react";

interface HeroCarouselProps {
  images: { src: string; alt: string; slideOverlay?: React.ReactNode; objectPosition?: string }[];
  overlay: React.ReactNode;
  onSlideChange?: (index: number) => void;
}

export default function HeroCarousel({ images, overlay, onSlideChange }: HeroCarouselProps) {
  const [current, setCurrent] = useState(1);

  function goTo(index: number) {
    setCurrent(index);
    onSlideChange?.(index);
  }
  const touchStartX = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      const next = delta < 0
        ? Math.min(current + 1, images.length - 1)
        : Math.max(current - 1, 0);
      goTo(next);
    }
    touchStartX.current = null;
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img) => (
          <div key={img.src} className="relative shrink-0 h-full" style={{ width: "100%" }}>
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              style={{ objectPosition: img.objectPosition ?? "center" }}
            />
            {img.slideOverlay}
          </div>
        ))}
      </div>

      {/* Overlay (headline + CTA) */}
      {overlay}

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="flex items-center justify-center w-[18px] h-[18px]"
          >
            {i === current ? (
              /* Active: filled ring + inner dot matching Figma */
              <span className="block w-[13px] h-[13px] rounded-full border-2 border-white relative">
                <span className="absolute inset-[2px] rounded-full bg-white" />
              </span>
            ) : (
              /* Inactive: hollow ring */
              <span className="block w-[13px] h-[13px] rounded-full border-2 border-white opacity-60" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
