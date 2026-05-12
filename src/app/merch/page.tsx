import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merch | Giot Cream Coffee",
};

const ASSETS = {
  logo:   "/images/home/logo.png",
  hero:   "/images/merch/hero.png",
  photo1: "/images/merch/photo-1.jpg",
  photo2: "/images/merch/photo-2.jpg",
  photo3: "/images/merch/photo-3.jpg",
};

const PHOTOS = [ASSETS.photo1, ASSETS.photo2, ASSETS.photo3];

export default function MerchPage() {
  return (
    <main className="font-sans text-[#252a38] overflow-x-hidden bg-white">

      {/* ── Navigation ── */}
      <nav className="bg-[#252a38] h-[72px] md:h-[118px] flex items-center px-5 md:px-[11%] relative">
        <a href="/#about" className="text-white text-[10px] md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
          About us
        </a>
        <a href="/" className="absolute left-1/2 -translate-x-1/2">
          <img src={ASSETS.logo} alt="Giot Cream Coffee" className="h-[53px] md:h-[98px] w-auto" />
        </a>
        <div className="ml-auto flex items-center gap-4 md:gap-9">
          <a href="/" className="text-white text-[10px] md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
            Home
          </a>
          <span className="text-white text-[10px] md:text-[25px] font-medium">
            Merch
          </span>
        </div>
      </nav>

      {/* ── Promo bar ── */}
      <div className="bg-[#b9ac89] flex items-center justify-center py-3 md:py-[18px] px-4">
        <p className="text-white text-[12px] md:text-sm font-medium tracking-[0.12em] md:tracking-[0.15em] uppercase text-center">
          Cool Down With Our New Refreshers
        </p>
      </div>

      {/* ── Hero ── */}
      <section className="flex flex-col items-center text-center pt-10 pb-12 md:pt-16 md:pb-20 px-5">
        <img
          src={ASSETS.hero}
          alt="Giot Cream Coffee merch"
          className="w-full max-w-[340px] md:max-w-[500px] h-auto"
          loading="eager"
          fetchPriority="high"
        />
        <a
          href="/shop"
          className="mt-8 md:mt-10 inline-block border border-black/60 rounded-full px-10 md:px-14 py-2 md:py-3 font-display font-light text-[#938e7d] hover:bg-[#938e7d] hover:text-white hover:border-[#938e7d] transition-colors duration-300"
          style={{ fontSize: "clamp(1.2rem, 3vw, 2.2rem)" }}
        >
          Shop
        </a>
      </section>

      {/* ── Photo sections ── */}
      {PHOTOS.map((src, i) => (
        <div key={i} className="border-t border-[#d9d9d9] flex justify-center py-12 md:py-20 px-5">
          <img
            src={src}
            alt={`Giot merch photo ${i + 1}`}
            className="w-full max-w-[301px] md:max-w-[544px] h-auto"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

    </main>
  );
}
