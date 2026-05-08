import HeroCarousel from "./HeroCarousel";

const ASSETS = {
  heroLeft: "https://www.figma.com/api/mcp/asset/1739acfe-894c-4d2f-9754-c29ad8472d9f",
  heroCenter: "https://www.figma.com/api/mcp/asset/069203ea-119a-496f-9245-af14a07537ec",
  heroRight: "https://www.figma.com/api/mcp/asset/40f7b414-25d7-4dcc-945a-cb78392e83ac",
  ingredients: "https://www.figma.com/api/mcp/asset/397fbdc9-0d4c-41ff-91eb-54f35e760991",
  menuCoffee: "https://www.figma.com/api/mcp/asset/677b761d-f75a-43f1-800b-09c813c25eaa",
  journey: "https://www.figma.com/api/mcp/asset/f8190c89-f3f9-481a-b32c-e3e9e88fa0ea",
  instagram: "https://www.figma.com/api/mcp/asset/f102f844-4d6a-4c64-b8f6-665d161b2b2c",
  mascot: "https://www.figma.com/api/mcp/asset/48969e2b-d12e-452e-9d1d-c32f54cbc758",
  mascot2: "https://www.figma.com/api/mcp/asset/092fc470-76e2-4fc2-8fab-b4595ef01901",
  logo: "https://www.figma.com/api/mcp/asset/1905bf47-a5c4-43b5-ac22-2997e667b79e",
};

const INGREDIENTS = [
  {
    title: "Egg Cream",
    body: "Made fresh with real, heavy whipped egg for a rich, authentic taste. Consuming raw or undercooked eggs may increase the risk of foodborne illness, especially for those with certain health conditions.",
  },
  {
    title: "Vietnamese Coffee",
    body: "Vietnamese Coffee (Phin-Filtered) Bold and robust with a naturally bitter edge, higher caffeine, and less sweetness — the classic strong Vietnamese brew.",
  },
  {
    title: "White Coffee",
    body: "White Coffee (Phin-Filtered) Sweeter & creamier with milk, lower caffeine, and a smooth, mellow flavor for a softer coffee experience.",
  },
];

const MENU_CATEGORIES = [
  "VIETNAMESE COFFEE",
  "WHITE COFFEE",
  "MILK SERIES",
  "MATCHA",
  "LATTE",
  "REFRESHING DRINK",
  "CROFFLE",
];

export default function Home() {
  return (
    <main className="font-sans text-[#252a38] overflow-x-hidden">

      {/* ── Navigation ── */}
      <nav className="h-[70px] md:h-[113px] bg-[#252a38] flex items-center px-5 md:px-[11%] relative">
        {/* Left: About Us */}
        <a href="#about" className="text-white text-sm md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
          About us
        </a>

        {/* Center: Logo */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2">
          <img src={ASSETS.logo} alt="Giot Cream Coffee" className="h-[56px] md:h-[98px] w-auto" />
        </a>

        {/* Right: Home + Merch */}
        <div className="ml-auto flex items-center gap-4 md:gap-9">
          <a href="/" className="text-white text-sm md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
            Home
          </a>
          <a href="#merch" className="text-white text-sm md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
            Merch
          </a>
        </div>
      </nav>

      {/* ── Promo banner ── */}
      <div className="bg-[#b9ac89] flex items-center justify-center py-3 md:py-[18px] px-4">
        <p className="text-white text-[10px] md:text-sm font-medium tracking-[0.1em] md:tracking-[0.15em] uppercase text-center">
          GET 5% OFF YOUR FIRST ONLINE ORDER
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
            images={[
              { src: ASSETS.heroLeft, alt: "" },
              { src: ASSETS.heroCenter, alt: "Giot signature drinks" },
              { src: ASSETS.heroRight, alt: "" },
            ]}
            overlay={
              <div className="absolute inset-0 flex items-start justify-center pt-[12%] px-6 pointer-events-none">
                <div className="text-center pointer-events-auto">
                  <p
                    className="font-display text-white font-light leading-tight drop-shadow-lg"
                    style={{ fontSize: "clamp(2rem, 11vw, 3rem)" }}
                  >
                    Headline
                    <br />
                    Coletion Drink
                  </p>
                  <div className="flex justify-center">
                    <button className="mt-5 bg-[#252a38] text-[#989ca6] rounded-full px-6 py-2 text-sm font-medium tracking-widest uppercase shadow-lg cursor-pointer">
                      Order Online
                    </button>
                  </div>
                </div>
              </div>
            }
          />
        </div>

        {/* Desktop: three-column grid */}
        <div className="hidden md:grid grid-cols-3 h-full">
          <img src={ASSETS.heroLeft} alt="" className="w-full h-full object-cover" />
          <img src={ASSETS.heroCenter} alt="Giot signature drinks" className="w-full h-full object-cover" />
          <img src={ASSETS.heroRight} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Desktop overlay */}
        <div className="hidden md:flex absolute inset-0 items-start justify-start pt-[4%] pl-[37%] pr-0">
          <div className="text-left">
            <p
              className="font-display text-white font-light leading-tight drop-shadow-lg"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
            >
              Headline
              <br />
              Coletion Drink
            </p>
            <button className="mt-5 bg-[#252a38] text-[#989ca6] rounded-full px-8 py-3 text-base font-medium tracking-widest uppercase shadow-lg hover:bg-white hover:text-[#252a38] transition-colors duration-300 cursor-pointer">
              Order Online
            </button>
          </div>
        </div>
      </section>

      {/* ── Ingredients header (dark band) ── */}
      <div className="bg-[#252a38] pt-8 pb-6 md:pt-10 md:pb-8">
        <h2
          className="font-display text-[#b9ac89] font-light px-5 md:px-[11%] text-center"
          style={{ fontSize: "clamp(1.6rem, 5.5vw, 5rem)" }}
        >
          A few things about ingredients
        </h2>
      </div>

      {/* ── Ingredients content ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#d9d9d9]">
        {/* Left: ingredient list */}
        <div className="px-5 md:px-[11%] py-10 md:py-16 lg:border-r border-[#d9d9d9] divide-y divide-[#d9d9d9]">
          {INGREDIENTS.map((item) => (
            <div key={item.title} className="py-8 md:py-10 first:pt-0 last:pb-0">
              <h3 className="font-semibold text-[#252a38] uppercase tracking-widest text-sm mb-3">
                {item.title}
              </h3>
              <p className="text-[#656565] leading-relaxed text-[15px]">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Right: food photo */}
        <div className="h-[260px] md:h-[380px] lg:h-auto overflow-hidden">
          <img
            src={ASSETS.ingredients}
            alt="Egg cream coffee preparation"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── Taglines ── */}
      <section className="py-10 md:py-16 px-5 md:px-8 text-center space-y-2 border-b border-[#d9d9d9]">
        <p className="text-[#656565] text-base md:text-xl">
          Where the essence of Vietnamese specialty coffee meets the pulse of modern life.
        </p>
        <p className="text-[#656565] text-base md:text-xl">
          Indulge in signature creamy brews and crispy croffles in our inspiring sanctuary.
        </p>
      </section>

      {/* ── Menu: decorative heading ── */}
      <section className="bg-[#252a38] overflow-hidden">
        <p
          className="font-display text-white font-light leading-[0.82] text-center pt-3 pb-1"
          style={{ fontSize: "clamp(3.5rem, 22vw, 22rem)" }}
        >
          MENU
        </p>
      </section>

      {/* ── Menu: category rows ── */}
      <section className="relative overflow-hidden border-t border-[#d9d9d9]">
        {/* Centered mascot overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <img src={ASSETS.mascot} alt="Giot mascot" className="h-[70%] md:h-[80%] w-auto opacity-30" />
        </div>
        {MENU_CATEGORIES.map((category) => (
          <div
            key={category}
            className="bg-[#d9d9d9] border-b border-[#aaa]/30 flex items-center px-5 md:px-[11%] py-5 md:py-7"
          >
            <span
              className="font-bold text-[#252a38] uppercase tracking-wide flex-1"
              style={{ fontSize: "clamp(1rem, 4vw, 2.6rem)" }}
            >
              {category}
            </span>
            <svg width="80" height="14" viewBox="0 0 80 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[120px] md:h-[16px] shrink-0">
              <line x1="0" y1="7" x2="70" y2="7" stroke="#252a38" strokeWidth="1.5"/>
              <path d="M70 2L78 7L70 12" stroke="#252a38" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
        ))}
      </section>

      {/* ── Journey ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-t border-[#d9d9d9]">
        {/* Left: photo */}
        <div className="relative h-[260px] md:h-[380px] lg:h-auto overflow-hidden">
          <img
            src={ASSETS.journey}
            alt="Giot coffee shop"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right: story */}
        <div className="px-5 py-12 md:px-[8%] md:py-20 lg:border-l border-[#d9d9d9] flex flex-col justify-center">
          <h2
            className="font-display font-light mb-8 md:mb-10"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
          >
            Giot&apos;s Journey
          </h2>

          <div className="border-b border-[#d9d9d9] pb-6 mb-6 md:pb-8 md:mb-8">
            <p className="text-[#656565] leading-relaxed">
              At GIOT, every cup is a love story. It began with Mimi, a woman
              who expressed her devotion through the flavors her husband loved.
              After a serendipitous encounter with Vietnamese coffee in Orange
              County, they knew they had found their calling.
            </p>
          </div>

          <p className="text-[#656565] leading-relaxed mb-10 md:mb-12">
            In October 2023, Mimi turned a simple wish for warmth into an
            extraordinary brew. GIOT was born to share this blend of love and
            tradition with you—where every sip feels like home.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-[#656565] text-sm">Made with ♥ in Minneapolis</p>
            <img
              src={ASSETS.instagram}
              alt="Instagram"
              className="w-7 h-7 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative overflow-hidden border-t border-[#d9d9d9] flex items-center justify-center py-8 md:py-10">
        <p
          className="font-display font-light text-center leading-none select-none w-full"
          style={{
            fontSize: "clamp(2.5rem, 12vw, 11rem)",
            color: "rgba(185,172,137,0.2)",
          }}
        >
          GIOT COFFEE
        </p>
      </footer>
    </main>
  );
}
