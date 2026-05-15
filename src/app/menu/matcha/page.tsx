import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cream Matcha Menu | Giot Cream Coffee",
};

const ASSETS = {
  logo:                "/images/home/logo.png",
  brandStrip:          "/images/menu/brand-strip.jpg",
  sakuraStrawberry:    "/images/menu/matcha/sakura-strawberry.jpg",
  tiramisu:            "/images/menu/matcha/tiramisu.jpg",
  blueberry:           "/images/menu/matcha/blueberry.jpg",
  oreoCheese:          "/images/menu/matcha/oreo-cheese.jpg",
  banoffee:            "/images/menu/matcha/banoffee.jpg",
  double:              "/images/menu/matcha/double.jpg",
  brownSugarMarshmallow: "/images/menu/matcha/brown-sugar-marshmallow.jpg",
  ube:                 "/images/menu/matcha/ube.jpg",
  coconut:             "/images/menu/matcha/coconut.jpg",
  jasmineOolong:       "/images/menu/matcha/jasmine-oolong.jpg",
  earlGreyLavender:    "/images/menu/matcha/earl-grey-lavender.jpg",
  thaiTea:             "/images/menu/matcha/thai-tea.jpg",
};

const DRINKS = [
  {
    name: "Sakura Strawberry",
    price: "$ 8.00",
    description: "Matcha, sakura strawberry cream, almond milk, matcha powder, dried strawberry slices.",
    image: ASSETS.sakuraStrawberry,
  },
  {
    name: "Tiramisu",
    price: "$ 8.00",
    description: "Matcha, almond milk, tiramisu cream, ladyfinger cookie, matcha powder.",
    image: ASSETS.tiramisu,
  },
  {
    name: "Blueberry",
    price: "$ 8.00",
    description: "Blueberry compote, almond milk, matcha cream, matcha powder.",
    image: ASSETS.blueberry,
  },
  {
    name: "Oreo Cheese",
    price: "$ 8.50",
    description: "Matcha, condensed milk, 2% milk, cream cheese, cheese foam, gluten-free oreo.",
    image: ASSETS.oreoCheese,
  },
  {
    name: "Banoffee",
    price: "$ 8.50",
    description:
      "Matcha, Nilla Wafer, banana, almond milk, vanilla pudding, chocolate toffee, house special caramel.",
    image: ASSETS.banoffee,
  },
  {
    name: "Double",
    price: "$ 8.00",
    description: "Matcha, blueberry puree, almond milk, matcha powder.",
    image: ASSETS.double,
  },
  {
    name: "Brown Sugar Marshmallow",
    price: "$ 8.00",
    description: "Matcha, marshmallow cream, almond milk, brown sugar syrup, matcha powder.",
    image: ASSETS.brownSugarMarshmallow,
  },
  {
    name: "Ube",
    price: "$ 8.00",
    description: "Matcha, ube cream, almond milk, matcha powder.",
    image: ASSETS.ube,
  },
  {
    name: "Coconut",
    price: "$ 8.00",
    description: "Savoy coconut cream, matcha cream, 2% milk, condensed milk, & coconut flakes.",
    image: ASSETS.coconut,
  },
];

const PURE_MATCHA_LATTES = [
  {
    name: "Thai Tea",
    price: "$ 8.00",
    description: "Green Thai Tea syrup, Matcha, edible daisy topping.",
    image: ASSETS.thaiTea,
  },
  {
    name: "Jasmine Oolong",
    price: "$ 8.00",
    description: "Jasmine Oolong syrup, almond milk, matcha, jasmine flowers.",
    image: ASSETS.jasmineOolong,
  },
  {
    name: "Earl Grey Lavender",
    price: "$ 8.00",
    description: "Earl Grey Lavender Syrup, almond milk, Matcha, Blue cornflower petals.",
    image: ASSETS.earlGreyLavender,
  },
];

const COLS_MOBILE = 2;
const COLS_DESKTOP = 3;

export default function MatchaPage() {
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
          <a href="/merch" className="text-white text-[10px] md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
            Merch
          </a>
          <a href="/#menu" className="text-white text-[10px] md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
            Menu
          </a>
        </div>
      </nav>

      {/* ── Category header ── */}
      <div className="bg-[#787d41] px-5 md:px-[11%] py-5 md:py-10 flex items-center justify-between">
        <a
          href="/#menu"
          className="font-display font-light text-white text-xl md:text-[40px] leading-none hover:opacity-75 transition-opacity"
        >
          MENU
        </a>
        <span className="font-display font-light text-white text-xl md:text-[40px] leading-none">
          Cream Matcha
        </span>
      </div>

      {/* ── Drink grid ── */}
      <section className="bg-white px-5 md:px-[11%] pt-10 md:pt-20 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8">
          {DRINKS.flatMap((drink, i) => {
            const rowStartMobile = i > 0 && i % COLS_MOBILE === 0;
            const rowStartDesktop = i > 0 && i % COLS_DESKTOP === 0;
            const elements = [];

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
                {/* Name — shares a row track with adjacent cards so all images align */}
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

      {/* ── Pure Matcha Latte section ── */}
      <section className="bg-white px-5 md:px-[11%] pb-10">
        {/* Sub-category header */}
        <div className="border-t border-[#d9d9d9] pt-10 md:pt-16 pb-6 md:pb-10">
          <span
            className="font-display font-light text-[#787d41]"
            style={{ fontSize: "clamp(1.4rem, 4vw, 3rem)" }}
          >
            Pure Matcha Latte
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8">
          {PURE_MATCHA_LATTES.map((drink) => (
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
