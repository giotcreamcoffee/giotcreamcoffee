import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Milk Series Menu | Giot Cream Coffee",
};

const ASSETS = {
  logo:             "https://www.figma.com/api/mcp/asset/1905bf47-a5c4-43b5-ac22-2997e667b79e",
  brandStrip:       "/images/menu/brand-strip.jpg",
  sakuraStrawberry: "/images/menu/milk-series/sakura-strawberry.jpg",
  ubeEgg:           "/images/menu/milk-series/ube-egg.jpg",
};

const DRINKS = [
  {
    name: "Sakura Strawberry Latte",
    price: "$ 6.50",
    description: "Strawberry puree, 2% milk, sakura cream, and mochi.",
    image: ASSETS.sakuraStrawberry,
  },
  {
    name: "Ube Egg Latte",
    price: "$ 6.50",
    description: "Ube powder, 2% milk, egg cream, and cocoa powder.",
    image: ASSETS.ubeEgg,
  },
];

export default function MilkSeriesPage() {
  return (
    <main className="font-sans text-[#252a38] overflow-x-hidden">

      {/* ── Navigation ── */}
      <nav className="bg-[#252a38] h-[72px] flex items-center px-5 md:px-[11%] relative">
        <a href="#about" className="text-white text-[10px] md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
          About us
        </a>
        <a href="/" className="absolute left-1/2 -translate-x-1/2">
          <img src={ASSETS.logo} alt="Giot Cream Coffee" className="h-[53px] md:h-[98px] w-auto" />
        </a>
        <div className="ml-auto flex items-center gap-4 md:gap-9">
          <a href="/" className="text-white text-[10px] md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
            Home
          </a>
          <a href="#merch" className="text-white text-[10px] md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
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

      {/* ── Category header ── */}
      <div className="bg-[#dbd3bd] px-5 md:px-[11%] py-5 md:py-10 flex items-center justify-between">
        <a
          href="/#menu"
          className="font-display font-light text-white text-xl md:text-[40px] leading-none hover:opacity-75 transition-opacity"
        >
          MENU
        </a>
        <span className="font-display font-light text-white text-xl md:text-[40px] leading-none">
          Milk Series
        </span>
      </div>

      {/* ── Drink grid ── */}
      <section className="bg-white px-5 md:px-[11%] pt-10 md:pt-20 pb-10">
        <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 max-w-3xl mx-auto">
          {DRINKS.map((drink, i) => (
            <article
              key={drink.name}
              className="row-span-4 grid [grid-template-rows:subgrid] text-center"
            >
              <h2
                className="font-display font-light text-[#252a38] leading-tight self-end pt-8 md:pt-12"
                style={{ fontSize: "clamp(1.2rem, 4vw, 3.125rem)" }}
              >
                {drink.name}
              </h2>

              <div className="w-full aspect-square overflow-hidden mt-4 md:mt-8">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              <button
                className="mt-5 md:mt-8 mx-auto border border-[#252a38] rounded-full px-5 md:px-8 py-1.5 md:py-3 font-display font-light text-[#252a38] leading-none hover:bg-[#252a38] hover:text-white transition-colors duration-300 cursor-pointer"
                style={{ fontSize: "clamp(1rem, 3vw, 2.8rem)" }}
              >
                {drink.price}
              </button>

              <p
                className="mt-3 md:mt-4 pb-8 md:pb-12 text-[#656565] leading-[1.5]"
                style={{ fontSize: "clamp(0.75rem, 2.5vw, 1.375rem)" }}
              >
                {drink.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Brand strip ── */}
      <div className="px-5 md:px-[11%] py-8 md:py-14">
        <img src={ASSETS.brandStrip} alt="" className="w-full h-auto" />
      </div>

      {/* ── Tagline ── */}
      <div className="pb-16 md:pb-20 pt-2 text-center">
        <p
          className="font-display font-light text-[#b9ac89] leading-[1.1]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.3rem)" }}
        >
          Every Drop
          <br />
          Elevated
        </p>
      </div>

    </main>
  );
}
