import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vietnamese Coffee Menu | Giot Cream Coffee",
};

const ASSETS = {
  logo:         "/images/home/logo.png",
  brandStrip:   "/images/menu/brand-strip.jpg",
  egg:          "/images/menu/egg.jpg",
  salted:       "/images/menu/salted.jpg",
  pandan:       "/images/menu/pandan.jpg",
  marshmallow:  "/images/menu/marshmallow.jpg",
  pistachio:    "/images/menu/pistachio.jpg",
  coconut:      "/images/menu/coconut.jpg",
  tiramisu:     "/images/menu/tiramisu.jpg",
  ube:          "/images/menu/ube.jpg",
  cheesyCaramel:"/images/menu/cheesy-caramel.jpg",
};

const DRINKS = [
  {
    name: "Egg",
    price: "$ 6.50",
    description: "Phin-filtered, egg cream, condensed milk, & cocoa powder.",
    image: ASSETS.egg,
  },
  {
    name: "Salted",
    price: "$ 6.50",
    description: "Phin-filtered, salted cream, condensed milk, & cocoa powder.",
    image: ASSETS.salted,
  },
  {
    name: "Pistachio",
    price: "$ 8.75",
    description:
      "Phin-filtered, pistachio cream, condensed milk, toasted katafi, glazed croffle, & chocolate sauce.",
    image: ASSETS.pistachio,
  },
  {
    name: "Marshmallow",
    price: "$ 6.75",
    description:
      "Phin-filtered, marshmallow cream, marshmallow, condensed milk, & cocoa powder.",
    image: ASSETS.marshmallow,
  },
  {
    name: "Pandan",
    price: "$ 6.50",
    description: "Phin-filtered, pandan cream, & condensed milk.",
    image: ASSETS.pandan,
  },
  {
    name: "Coconut",
    price: "$ 6.50",
    description: "Phin-filtered, coconut cream, condensed milk, & coconut flakes.",
    image: ASSETS.coconut,
  },
  {
    name: "Tiramisu",
    price: "$ 6.75",
    description:
      "Phin-filtered, tiramisu cream, ladyfinger, condensed milk, & cocoa powder.",
    image: ASSETS.tiramisu,
  },
  {
    name: "Ube",
    price: "$ 6.50",
    description: "Phin-filtered, ube cream, and condensed milk.",
    image: ASSETS.ube,
  },
  {
    name: "Cheesy Caramel",
    price: "$ 6.50",
    description:
      "Phin-filtered, condensed milk, cheese foam, house special caramel, biscoff crumbs.",
    image: ASSETS.cheesyCaramel,
  },
];

// Number of columns per breakpoint — used to insert row dividers
const COLS_MOBILE = 2;
const COLS_DESKTOP = 3;

export default function MenuPage() {
  return (
    <main className="font-sans text-[#252a38] overflow-x-hidden">

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
          <a href="/menu" className="text-white text-[10px] md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
            Menu
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
      <div className="bg-[#aa8158] px-5 md:px-[11%] py-5 md:py-10 flex items-center justify-between">
        <a
          href="/#menu"
          className="font-display font-light text-white text-xl md:text-[40px] leading-none hover:opacity-75 transition-opacity"
        >
          MENU
        </a>
        <span className="font-display font-light text-white text-xl md:text-[40px] leading-none">
          Vietnamese Coffee
        </span>
      </div>

      {/* ── Drink grid ── */}
      <section className="bg-white px-5 md:px-[11%] pt-10 md:pt-20 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8">
          {DRINKS.flatMap((drink, i) => {
            const rowStartMobile = i > 0 && i % COLS_MOBILE === 0;
            const rowStartDesktop = i > 0 && i % COLS_DESKTOP === 0;
            const elements = [];

            // Row dividers
            if (rowStartMobile || rowStartDesktop) {
              elements.push(
                <div
                  key={`divider-${i}`}
                  className={[
                    "border-t border-[#d9d9d9]",
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
                    fetchPriority={i < 3 ? "high" : "auto"}
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
