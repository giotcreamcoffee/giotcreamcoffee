import type { Metadata } from "next";
import AddToCart from "./AddToCart";
import CartButton from "./CartButton";

export const metadata: Metadata = {
  title: "Merch | Giot Cream Coffee",
};

const ASSETS = {
  logo:         "/images/home/logo.png",
  photo1:       "/images/merch/photo-1.jpg",
  photo2:       "/images/merch/photo-2.jpg",
  photo3:       "/images/merch/photo-3.jpg",
  gTee:         "/images/shop/g-tee.png",
  gBag:         "/images/shop/g-bag.png",
  gWaterBottle: "/images/shop/g-water-bottle.png",
  gCap:         "/images/shop/g-cap.png",
};

const PRODUCTS = [
  {
    name:      "G Tee",
    price:     "$45.00",
    image:     ASSETS.gTee,
    bg:        "bg-[#f5f5f3]",
    sizes:     ["S", "M", "L", "XL"],
    colors:    ["Black", "White", "Beige"],
    shopifyId: "8765442785451",
  },
  {
    name:      "G Bag",
    price:     "$20.00",
    image:     ASSETS.gBag,
    bg:        "bg-[#f5f5f3]",
    sizes:     [],
    colors:    ["Charcoal Navy", "White"],
    shopifyId: "8765530308779",
  },
  {
    name:      "G Water Bottle",
    price:     "$20.00",
    image:     ASSETS.gWaterBottle,
    bg:        "bg-[#efefed]",
    sizes:     [],
    colors:    [],
    shopifyId: "8765531914411",
  },
  {
    name:      "G Cap",
    price:     "$20.00",
    image:     ASSETS.gCap,
    bg:        "bg-[#efefed]",
    sizes:     [],
    colors:    [],
    shopifyId: "8765534240939",
  },
];

export default function MerchPage() {
  return (
    <main className="font-sans text-[#252a38] overflow-x-hidden bg-white">

      {/* ── Navigation ── */}
      <nav className="bg-[#252a38] h-[72px] md:h-[118px] flex items-center px-5 md:px-[11%] relative">
        <a href="/#about" className="text-white text-sm md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
          About us
        </a>
        <a href="/" className="absolute left-1/2 -translate-x-1/2">
          <img src={ASSETS.logo} alt="Giot Cream Coffee" className="h-[53px] md:h-[98px] w-auto" />
        </a>
        <div className="ml-auto flex items-center gap-4 md:gap-9">
          <span className="text-white text-sm md:text-[25px] font-medium">Merch</span>
          <a href="/#menu" className="text-white text-sm md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
            Menu
          </a>
          <CartButton />
        </div>
      </nav>

      {/* ── Collection header ── */}
      <div className="flex items-center gap-5 px-5 md:px-[11%] pt-10 md:pt-14 pb-8 md:pb-12">
        <span className="flex-1 h-px bg-[#d9d9d9]" />
        <h1 className="font-display font-light text-[#252a38] tracking-[0.3em] uppercase text-xs md:text-sm">
          Collection
        </h1>
        <span className="flex-1 h-px bg-[#d9d9d9]" />
      </div>

      {/* ── Product grid ── */}
      <section className="px-5 md:px-[11%] pb-20 md:pb-32">
        <div className="grid grid-cols-2 gap-x-4 md:gap-x-10 gap-y-10 md:gap-y-16">
          {PRODUCTS.map((product, i) => (
            <article key={product.name} className="group flex flex-col">

              {/* Image */}
              <div className={`relative w-full aspect-[4/5] ${product.bg} overflow-hidden`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  loading={i < 2 ? "eager" : "lazy"}
                  fetchPriority={i < 2 ? "high" : "auto"}
                />
                {!product.shopifyId && (
                  <span className="absolute top-2.5 right-2.5 md:top-4 md:right-4 bg-white/90 backdrop-blur-sm text-[#252a38] text-[7px] md:text-[10px] tracking-[0.2em] uppercase font-medium px-2 py-1">
                    Coming Soon
                  </span>
                )}
              </div>

              {/* Name + Price */}
              <div className="flex items-baseline justify-between mt-3 md:mt-5 gap-2">
                <h2
                  className="font-display font-light text-[#252a38] leading-tight"
                  style={{ fontSize: "clamp(0.85rem, 2.8vw, 1.75rem)" }}
                >
                  {product.name}
                </h2>
                {product.price && (
                  <span
                    className="font-display font-light text-[#656565] shrink-0 tabular-nums"
                    style={{ fontSize: "clamp(0.85rem, 2.8vw, 1.75rem)" }}
                  >
                    {product.price}
                  </span>
                )}
              </div>

              {/* Spacer — pins controls to bottom of card */}
              <div className="flex-1" />

              {/* Controls */}
              {product.shopifyId ? (
                <AddToCart
                  productId={product.shopifyId}
                  sizes={product.sizes}
                  colors={product.colors}
                />
              ) : (
                <div className="mt-3 md:mt-4">
                  <button
                    disabled
                    className="w-full border border-[#d9d9d9] rounded-full py-2 md:py-2.5 font-display font-light text-[#252a38]/40 cursor-not-allowed tracking-widest uppercase"
                    style={{ fontSize: "clamp(0.6rem, 2vw, 0.875rem)" }}
                  >
                    Coming Soon
                  </button>
                </div>
              )}

            </article>
          ))}
        </div>
      </section>

      {/* ── Editorial photos ── */}
      <section className="border-t border-[#d9d9d9]">
        {/* Desktop: 3-col strip */}
        <div className="hidden md:grid md:grid-cols-3">
          {[ASSETS.photo1, ASSETS.photo2, ASSETS.photo3].map((src, i) => (
            <div key={i} className="aspect-[4/5] overflow-hidden">
              <img
                src={src}
                alt={`Giot merch ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {/* Mobile: full-width + 2-col pair */}
        <div className="md:hidden">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={ASSETS.photo1} alt="Giot merch 1" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="grid grid-cols-2">
            {[ASSETS.photo2, ASSETS.photo3].map((src, i) => (
              <div key={i} className="aspect-[4/5] overflow-hidden">
                <img src={src} alt={`Giot merch ${i + 2}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
