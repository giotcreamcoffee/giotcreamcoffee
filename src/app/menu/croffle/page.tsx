import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Croffles Menu | Giot Cream Coffee",
};

const ASSETS = {
  logo:                "/images/home/logo.png",
  brandStrip:          "/images/menu/brand-strip.jpg",
  tiramisu:            "/images/menu/croffles/tiramisu.jpg",
  biscoffCream:        "/images/menu/croffles/biscoff-cream.jpg",
  strawberryPistachio: "/images/menu/croffles/strawberry-pistachio.jpg",
  ubeCoconut:          "/images/menu/croffles/ube-coconut.jpg",
  blueberryCream:      "/images/menu/croffles/blueberry-cream.jpg",
  matchaStrawberry:    "/images/menu/croffles/matcha-strawberry.jpg",
  strawberryCheesecake:"/images/menu/croffles/strawberry-cheesecake.jpg",
};

const FEATURED = {
  name: "Blueberry & Cream",
  description: "Mascarpone, lemonade cream, fresh blueberry, blueberry syrup, garnish with fresh blueberry.",
  image: ASSETS.blueberryCream,
};

const CROFFLES = [
  {
    name: "Ube Coconut",
    description: "Croffle, ube mascarpone, coconut drizzle & coconut flakes.",
    image: ASSETS.ubeCoconut,
  },
  {
    name: "Biscoff & Cream",
    description: "Croffle, cream, cheese, Biscoff crumbs, Biscoff cookie, & house special caramel.",
    image: ASSETS.biscoffCream,
  },
  {
    name: "Strawberry Cheesecake",
    description: "Croffle, cream-cheese, fresh strawberry, strawberry syrup, cracker crumbs.",
    image: ASSETS.strawberryCheesecake,
  },
  {
    name: "Strawberry Pistachio",
    description: "Croffle, pistachio mascarpone, pistachio & chocolate sauce, kataifi, fresh strawberry & crushed pistachios.",
    image: ASSETS.strawberryPistachio,
  },
  {
    name: "Tiramisu",
    description: "Croffle, tiramisu cream espresso, & cocoa powder.",
    image: ASSETS.tiramisu,
  },
  {
    name: "Matcha Strawberry",
    description: "Croffle, matcha cream, fresh strawberry & matcha powder.",
    image: ASSETS.matchaStrawberry,
  },
];

const COLS_MOBILE = 2;
const COLS_DESKTOP = 3;

export default function CrofflePage() {
  return (
    <main className="font-sans text-[#252a38] overflow-x-hidden bg-[#dbd3bd]">

      {/* ── Navigation ── */}
      <nav className="bg-[#252a38] h-[72px] flex items-center px-5 md:px-[11%] relative">
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
          <a href="/#menu" className="text-white text-[10px] md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
            Menu
          </a>
        </div>
      </nav>

      {/* ── Promo bar ── */}
      <div className="bg-[#b9ac89] flex items-center justify-center py-3 md:py-[18px] px-4">
        <p className="text-white text-[12px] md:text-sm font-medium tracking-[0.12em] md:tracking-[0.15em] uppercase text-center">
          Cool Down With Our New Refreshers
        </p>
      </div>

      {/* ── Category header ── */}
      <div className="bg-[#d4c6a0] px-5 md:px-[11%] py-5 md:py-10 flex items-center justify-between">
        <a
          href="/#menu"
          className="font-display font-light text-white text-xl md:text-[40px] leading-none hover:opacity-75 transition-opacity"
        >
          MENU
        </a>
        <span className="font-display font-light text-white text-xl md:text-[40px] leading-none">
          Croffles
        </span>
      </div>

      {/* ── Featured croffle ── */}
      <section className="px-5 md:px-[11%] pt-10 md:pt-20 pb-0">
        <div className="flex flex-col items-center text-center max-w-xs md:max-w-md mx-auto">
          <span className="mb-3 inline-block border border-[#aa8158] text-[#aa8158] text-[10px] md:text-xs font-medium tracking-[0.18em] uppercase px-4 py-1 rounded-full">
            Seasonal
          </span>
          <h2
            className="font-display font-light text-[#252a38] leading-tight pb-4 md:pb-8"
            style={{ fontSize: "clamp(1.2rem, 4vw, 3.125rem)" }}
          >
            {FEATURED.name}
          </h2>
          <div className="w-full aspect-square overflow-hidden">
            <img
              src={FEATURED.image}
              alt={FEATURED.name}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <p
            className="mt-5 md:mt-8 pb-8 md:pb-12 text-[#252a38] leading-[1.5]"
            style={{ fontSize: "clamp(0.75rem, 2.5vw, 1.375rem)" }}
          >
            {FEATURED.description}
          </p>
        </div>
      </section>

      {/* ── Croffle grid ── */}
      <section className="px-5 md:px-[11%] pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8">
          {CROFFLES.flatMap((item, i) => {
            const rowStartMobile = i > 0 && i % COLS_MOBILE === 0;
            const rowStartDesktop = i > 0 && i % COLS_DESKTOP === 0;
            const elements = [];

            if (rowStartMobile || rowStartDesktop) {
              elements.push(
                <div
                  key={`divider-${i}`}
                  className={[
                    "border-t border-[#c9bfa5]",
                    rowStartMobile && !rowStartDesktop
                      ? "col-span-2 lg:hidden"
                      : rowStartDesktop && !rowStartMobile
                      ? "col-span-3 hidden lg:block"
                      : "col-span-2 lg:col-span-3",
                  ].join(" ")}
                />
              );
            }

            elements.push(
              <article
                key={item.name}
                className="row-span-3 grid [grid-template-rows:subgrid] text-center"
              >
                <h2
                  className="font-display font-light text-[#252a38] leading-tight self-end pt-8 md:pt-12"
                  style={{ fontSize: "clamp(1.2rem, 4vw, 3.125rem)" }}
                >
                  {item.name}
                </h2>

                <div className="w-full aspect-square overflow-hidden mt-4 md:mt-8">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading={i < 3 ? "eager" : "lazy"}
                    fetchPriority={i < 3 ? "high" : "auto"}
                  />
                </div>

                <p
                  className="mt-3 md:mt-4 pb-8 md:pb-12 text-[#252a38] leading-[1.5]"
                  style={{ fontSize: "clamp(0.75rem, 2.5vw, 1.375rem)" }}
                >
                  {item.description}
                </p>
              </article>
            );

            return elements;
          })}
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
