import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Giot Cream Coffee",
};

const ASSETS = {
  logo:        "/images/home/logo.png",
  gTee:        "/images/shop/g-tee.png",
  gBag:        "/images/shop/g-bag.png",
  gWaterBottle:"/images/shop/g-water-bottle.png",
  gCap:        "/images/shop/g-cap.png",
};

const PRODUCTS = [
  {
    name:   "G Tee",
    price:  "$ 0.00",
    image:  ASSETS.gTee,
    bg:     "bg-white",
    sizes:  ["X", "L", "M"],
    colors: ["Black"],
  },
  {
    name:   "G Bag",
    price:  "$ 0.00",
    image:  ASSETS.gBag,
    bg:     "bg-white",
    sizes:  [],
    colors: ["Black"],
  },
  {
    name:   "G Water Bottle",
    price:  "$ 0.00",
    image:  ASSETS.gWaterBottle,
    bg:     "bg-[#f6f6f6]",
    sizes:  [],
    colors: ["Black"],
  },
  {
    name:   "G Cap",
    price:  "$ 0.00",
    image:  ASSETS.gCap,
    bg:     "bg-[#f6f6f6]",
    sizes:  ["X", "L", "M"],
    colors: ["Black", "Beige", "White"],
  },
];

export default function ShopPage() {
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
          <a href="/merch" className="text-white text-[10px] md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
            Merch
          </a>
        </div>
      </nav>

      {/* ── Promo bar ── */}
      <div className="bg-[#b9ac89] flex items-center justify-center py-3 md:py-[18px] px-4">
        <p className="text-white text-[12px] md:text-sm font-medium tracking-[0.12em] md:tracking-[0.15em] uppercase text-center">
          GET 5% OFF YOUR FIRST ONLINE ORDER
        </p>
      </div>

      {/* ── Product grid ── */}
      <section className="px-5 md:px-[11%] pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
          {PRODUCTS.map((product, i) => (
            <article key={product.name} className="flex flex-col">
              {/* Image */}
              <div className={`w-full aspect-square ${product.bg} overflow-hidden flex items-center justify-center`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  loading={i < 2 ? "eager" : "lazy"}
                  fetchPriority={i < 2 ? "high" : "auto"}
                />
              </div>

              {/* Name + Price */}
              <div className="flex items-baseline justify-between mt-3 md:mt-5 gap-2">
                <h2
                  className="font-display font-light text-[#272727] leading-tight"
                  style={{ fontSize: "clamp(1rem, 3.5vw, 2.8rem)" }}
                >
                  {product.name}
                </h2>
                <span
                  className="font-display font-light text-[#252a38] shrink-0"
                  style={{ fontSize: "clamp(1rem, 3.5vw, 2.8rem)" }}
                >
                  {product.price}
                </span>
              </div>

              {/* Size swatches */}
              {product.sizes.length > 0 && (
                <div className="flex gap-1.5 mt-2 md:mt-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="bg-[#d9d9d9] text-black text-[9px] md:text-[13px] font-medium flex items-center justify-center"
                      style={{ width: "clamp(2.5rem, 8vw, 4rem)", height: "clamp(0.75rem, 2vw, 1rem)" }}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              )}

              {/* Color swatches */}
              {product.colors.length > 0 && (
                <div className="flex gap-1.5 mt-1.5 md:mt-2 flex-wrap">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="bg-[#d9d9d9] text-black text-[9px] md:text-[13px] font-medium flex items-center justify-center"
                      style={{ width: "clamp(2.5rem, 8vw, 4rem)", height: "clamp(0.75rem, 2vw, 1rem)" }}
                    >
                      {color}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
