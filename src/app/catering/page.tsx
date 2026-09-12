import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catering | Giot Cream Coffee",
  description:
    "Bring the GIOT café experience to your event. Mobile catering cart with unlimited handcrafted drinks and mini croffles for weddings, corporate events, and celebrations.",
};

// TODO: replace with the real catering inbox / phone before launch.
const CONTACT = {
  email: "catering@giotcreamcoffee.com",
  instagram: "https://www.instagram.com/giot.creamcoffee/",
};

const INQUIRY_LINK = `mailto:${CONTACT.email}?subject=GIOT%20Catering%20Inquiry`;

const ASSETS = {
  logo:       "/images/home/logo.png",
  hero:       "/images/home/hero-right.jpg",
  coffee:     "/images/menu/egg.jpg",
  matcha:     "/images/menu/matcha/sakura-strawberry.jpg",
  croffles: [
    { name: "Ube Coconut",          image: "/images/menu/croffles/ube-coconut.jpg" },
    { name: "Strawberry Cheesecake", image: "/images/menu/croffles/strawberry-cheesecake.jpg" },
    { name: "Strawberry Pistachio",  image: "/images/menu/croffles/strawberry-pistachio.jpg" },
    { name: "Biscoff & Cream",       image: "/images/menu/croffles/biscoff-cream.jpg" },
  ],
};

type SpecKey = "guests" | "service" | "drinks" | "croffles" | "staff";

type Package = Record<SpecKey, string> & {
  name: string;
  price: string;
  featured?: boolean;
};

const PACKAGES: Package[] = [
  {
    name: "Intimate",
    guests: "Up to 50",
    service: "2 Hours",
    drinks: "Choose 3",
    croffles: "Choose 2",
    staff: "2",
    price: "$950",
  },
  {
    name: "Celebration",
    guests: "Up to 100",
    service: "2 Hours",
    drinks: "Choose 5",
    croffles: "Choose 4",
    staff: "2",
    price: "$1,600",
    featured: true,
  },
  {
    name: "Grand",
    guests: "Up to 150",
    service: "2 Hours",
    drinks: "Choose 5",
    croffles: "Choose 4",
    staff: "3",
    price: "$2,300",
  },
  {
    name: "Signature",
    guests: "Up to 200",
    service: "2 Hours",
    drinks: "Choose 5",
    croffles: "Choose 4",
    staff: "3–4",
    price: "$3,000",
  },
];

const SPEC_ROWS: { label: string; key: SpecKey }[] = [
  { label: "Guests",         key: "guests" },
  { label: "Service",        key: "service" },
  { label: "Drink Flavors",  key: "drinks" },
  { label: "Croffle Flavors", key: "croffles" },
  { label: "GIOT Staff",     key: "staff" },
];

const INCLUDED = [
  "Mobile GIOT catering cart",
  "Unlimited drinks during service",
  "Unlimited mini croffles during service",
  "GIOT staff",
  "Cups, lids & serving supplies",
  "Ice",
  "Toppings & garnishes",
  "Setup & breakdown",
];

const DRINK_MENUS = [
  {
    category: "Vietnamese Coffee",
    image: ASSETS.coffee,
    flavors: [
      "Original Vietnamese Coffee",
      "Cheesy Caramel",
      "Tiramisu",
      "Egg Coffee",
      "Salted Cream",
    ],
  },
  {
    category: "Matcha",
    image: ASSETS.matcha,
    flavors: [
      "Cream Matcha",
      "Coconut Cream Matcha",
      "Sakura Strawberry Matcha",
      "Seasonal Matcha",
    ],
  },
];

const STEPS = [
  {
    title: "Choose your package",
    body: "Start with the package that matches your expected guest count.",
  },
  {
    title: "Pick your menu",
    body: "Select your drink and croffle flavors from the available catering menu.",
  },
  {
    title: "Reserve your date",
    body: "A $100 non-refundable deposit secures your date and is applied toward your catering balance.",
  },
  {
    title: "We bring GIOT to you",
    body: "Our team arrives before service to set up the mobile café and have everything ready for your guests.",
  },
];

const EXTRA_HOURS = [
  { size: "Up to 50 guests",  rate: "+$200/hour" },
  { size: "Up to 100 guests", rate: "+$275/hour" },
  { size: "Up to 150 guests", rate: "+$350/hour" },
  { size: "Up to 200 guests", rate: "+$450/hour" },
];

const GOOD_TO_KNOW = [
  {
    title: "Unlimited Service",
    body: "Unlimited service applies to the confirmed guest count, selected menu, and reserved service period.",
  },
  {
    title: "Guest Count",
    body: "Pricing is based on your event's guest count. If attendance increases into the next package tier, the package price will be adjusted accordingly.",
  },
  {
    title: "Availability",
    body: "We prepare inventory based on your confirmed guest count with additional allowance for normal guest consumption. Individual flavors are available while event inventory lasts.",
  },
  {
    title: "Venue Requirements",
    body: "We bring our own mobile cart and equipment. We primarily need a suitable service area with access to a standard electrical outlet. Additional venue requirements will be discussed before the event.",
  },
  {
    title: "Additional Time",
    body: "Want to keep the café open longer? Additional service hours can be added to your package.",
  },
  {
    title: "Deposit",
    body: "A $100 non-refundable deposit secures your event date and is applied toward your final balance.",
  },
];

const QUICK_FACTS = [
  { value: "200", label: "Guests served" },
  { value: "2 hrs", label: "Of unlimited service" },
  { value: "9+", label: "Drink & croffle flavors" },
  { value: "$100", label: "Deposit holds your date" },
];

function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className="shrink-0 mt-[3px]"
      aria-hidden="true"
    >
      <path
        d="M3 9.5L7 13.5L15 4.5"
        stroke="#b9ac89"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CateringPage() {
  return (
    <main className="font-sans text-[#252a38] overflow-x-hidden">

      {/* ── Navigation ── */}
      <nav className="bg-[#252a38] h-[70px] md:h-[113px] flex items-center px-5 md:px-[11%] relative">
        <a href="/#about" className="text-white text-sm md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
          About us
        </a>
        <a href="/" className="absolute left-1/2 -translate-x-1/2">
          <img src={ASSETS.logo} alt="Giot Cream Coffee" className="h-[56px] md:h-[98px] w-auto" />
        </a>
        <div className="ml-auto flex items-center gap-4 md:gap-9">
          <span className="hidden md:inline text-[#b9ac89] text-[25px] font-medium">
            Catering
          </span>
          <a href="/merch" className="text-white text-sm md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
            Merch
          </a>
          <a href="/#menu" className="text-white text-sm md:text-[25px] font-medium hover:text-[#b9ac89] transition-colors">
            Menu
          </a>
        </div>
      </nav>

      {/* ── Category header ── */}
      <div className="bg-[#d4c6a0] px-5 md:px-[11%] py-5 md:py-10 flex items-center justify-between">
        <a
          href="/"
          className="font-display font-light text-white text-xl md:text-[40px] leading-none hover:opacity-75 transition-opacity"
        >
          GIOT
        </a>
        <span className="font-display font-light text-white text-xl md:text-[40px] leading-none">
          Catering
        </span>
      </div>

      {/* ── Hero ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-[#252a38]">
        {/* Copy */}
        <div className="order-2 lg:order-1 px-5 py-12 md:px-[9%] md:py-20 flex flex-col justify-center">
          <p className="text-[#b9ac89] text-[11px] md:text-xs font-medium tracking-[0.28em] uppercase mb-5">
            GIOT Catering
          </p>

          <h1
            className="font-display font-light text-white leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.4rem)" }}
          >
            Bring the GIOT Café
            <br className="hidden sm:block" /> Experience to Your Event
          </h1>

          <p className="text-white/70 leading-relaxed max-w-xl mb-4 text-[15px] md:text-lg">
            From weddings and corporate events to birthdays, celebrations, and
            private gatherings, GIOT brings the café to you with our mobile
            catering cart.
          </p>
          <p className="text-white/70 leading-relaxed max-w-xl mb-9 text-[15px] md:text-lg">
            Enjoy unlimited handcrafted drinks and mini croffles during your
            reserved service time, freshly prepared and served by the GIOT team.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={INQUIRY_LINK}
              className="bg-[#b9ac89] text-[#252a38] rounded-full px-8 py-3.5 text-sm font-semibold tracking-[0.15em] uppercase text-center hover:bg-white transition-colors duration-300"
            >
              Reserve Your Date
            </a>
            <a
              href="#packages"
              className="border border-white/35 text-white rounded-full px-8 py-3.5 text-sm font-semibold tracking-[0.15em] uppercase text-center hover:bg-white hover:text-[#252a38] hover:border-white transition-colors duration-300"
            >
              View Packages
            </a>
          </div>

          <p className="text-white/45 text-xs md:text-sm mt-5">
            A $100 deposit secures your date and applies toward your balance.
          </p>
        </div>

        {/* Photo */}
        <div className="order-1 lg:order-2 relative h-[300px] md:h-[440px] lg:h-auto lg:min-h-[620px] overflow-hidden">
          <img
            src={ASSETS.hero}
            alt="GIOT phin-filtered Vietnamese coffee"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* ── Quick facts ── */}
      <section className="bg-[#dbd3bd] px-5 md:px-[11%] py-8 md:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4">
          {QUICK_FACTS.map((fact) => (
            <div key={fact.label} className="text-center">
              <p
                className="font-display font-light text-[#252a38] leading-none"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
              >
                {fact.value}
              </p>
              <p className="text-[#5c5647] text-[11px] md:text-sm tracking-[0.12em] uppercase mt-2">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Packages ── */}
      <section id="packages" className="px-5 md:px-[11%] py-14 md:py-24 scroll-mt-4">
        <div className="text-center mb-10 md:mb-16">
          <h2
            className="font-display font-light leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Catering Packages
          </h2>
          <p className="text-[#656565] mt-4 text-[15px] md:text-lg">
            Every package includes unlimited drinks and mini croffles for a
            two-hour service.
          </p>
        </div>

        {/* Desktop: comparison grid */}
        <div className="hidden lg:grid grid-cols-[1.1fr_repeat(4,1fr)] border-t border-[#d9d9d9]">
          {/* Header row */}
          <div className="border-b border-[#d9d9d9]" />
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`border-b border-l border-[#d9d9d9] px-5 pt-8 pb-6 text-center ${
                pkg.featured ? "bg-[#f7f3ea]" : ""
              }`}
            >
              <div className="h-6 mb-1">
                {pkg.featured && (
                  <span className="inline-block bg-[#aa8158] text-white text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full">
                    ★ Most Popular
                  </span>
                )}
              </div>
              <p className="font-display font-light text-[#252a38] text-[32px] leading-tight">
                {pkg.name}
              </p>
            </div>
          ))}

          {/* Spec rows */}
          {SPEC_ROWS.map((row) => (
            <div key={row.label} className="contents">
              <div className="border-b border-[#d9d9d9] py-5 pr-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#252a38]">
                {row.label}
              </div>
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.name + row.label}
                  className={`border-b border-l border-[#d9d9d9] py-5 px-5 text-center text-[#656565] text-lg ${
                    pkg.featured ? "bg-[#f7f3ea]" : ""
                  }`}
                >
                  {pkg[row.key]}
                </div>
              ))}
            </div>
          ))}

          {/* Price row */}
          <div className="border-b border-[#d9d9d9] py-6 pr-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#252a38]">
            Starting At
          </div>
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name + "-price"}
              className={`border-b border-l border-[#d9d9d9] py-6 px-5 text-center ${
                pkg.featured ? "bg-[#f7f3ea]" : ""
              }`}
            >
              <p className="font-display font-light text-[#252a38] text-[40px] leading-none">
                {pkg.price}
              </p>
            </div>
          ))}

          {/* CTA row */}
          <div className="border-b border-[#d9d9d9]" />
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name + "-cta"}
              className={`border-b border-l border-[#d9d9d9] p-5 ${
                pkg.featured ? "bg-[#f7f3ea]" : ""
              }`}
            >
              <a
                href={`${INQUIRY_LINK}%20%E2%80%94%20${encodeURIComponent(pkg.name)}%20Package`}
                className={`block w-full rounded-full py-3 text-center text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300 ${
                  pkg.featured
                    ? "bg-[#252a38] text-white hover:bg-[#aa8158]"
                    : "border border-[#252a38] text-[#252a38] hover:bg-[#252a38] hover:text-white"
                }`}
              >
                Reserve
              </a>
            </div>
          ))}
        </div>

        {/* Mobile / tablet: cards */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-5">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`border rounded-2xl p-6 flex flex-col ${
                pkg.featured
                  ? "border-[#aa8158] bg-[#f7f3ea]"
                  : "border-[#d9d9d9] bg-white"
              }`}
            >
              {pkg.featured && (
                <span className="self-start bg-[#aa8158] text-white text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-4">
                  ★ Most Popular
                </span>
              )}

              <div className="flex items-baseline justify-between gap-3 mb-5">
                <p className="font-display font-light text-[#252a38] text-[30px] leading-none">
                  {pkg.name}
                </p>
                <p className="font-display font-light text-[#252a38] text-[30px] leading-none">
                  {pkg.price}
                </p>
              </div>

              <dl className="divide-y divide-[#d9d9d9] border-y border-[#d9d9d9] mb-6">
                {SPEC_ROWS.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 py-3">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#252a38]">
                      {row.label}
                    </dt>
                    <dd className="text-[#656565] text-[15px] text-right">
                      {pkg[row.key]}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={`${INQUIRY_LINK}%20%E2%80%94%20${encodeURIComponent(pkg.name)}%20Package`}
                className={`mt-auto block w-full rounded-full py-3 text-center text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300 ${
                  pkg.featured
                    ? "bg-[#252a38] text-white hover:bg-[#aa8158]"
                    : "border border-[#252a38] text-[#252a38] hover:bg-[#252a38] hover:text-white"
                }`}
              >
                Reserve {pkg.name}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-[#656565] mt-8 md:mt-10 text-[15px] md:text-lg">
          More than 200 guests?{" "}
          <a
            href={INQUIRY_LINK}
            className="text-[#aa8158] underline underline-offset-4 hover:text-[#252a38] transition-colors"
          >
            Contact us for a custom quote.
          </a>
        </p>
      </section>

      {/* ── Every package includes ── */}
      <section className="bg-[#252a38] px-5 md:px-[11%] py-14 md:py-20">
        <h2
          className="font-display font-light text-[#b9ac89] text-center leading-tight mb-10 md:mb-14"
          style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)" }}
        >
          Every Package Includes
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 max-w-6xl mx-auto">
          {INCLUDED.map((item) => (
            <li key={item} className="flex items-start gap-3 text-white/85 text-[15px] md:text-base leading-snug">
              <Check />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Choose your drinks ── */}
      <section className="px-5 md:px-[11%] py-14 md:py-24">
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-display font-light leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Choose Your Drinks
          </h2>
          <p className="text-[#656565] mt-4 text-[15px] md:text-lg max-w-2xl mx-auto">
            Choose from a curated selection of GIOT favorites. Available
            selections may change seasonally.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {DRINK_MENUS.map((menu) => (
            <div key={menu.category} className="border border-[#d9d9d9] overflow-hidden">
              <div className="h-[220px] md:h-[300px] overflow-hidden">
                <img
                  src={menu.image}
                  alt={menu.category}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-9">
                <h3
                  className="font-display font-light leading-tight mb-5"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
                >
                  {menu.category}
                </h3>
                <ul className="divide-y divide-[#d9d9d9] border-t border-[#d9d9d9]">
                  {menu.flavors.map((flavor) => (
                    <li key={flavor} className="py-3 text-[#656565] text-[15px] md:text-base">
                      {flavor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 border-l-2 border-[#aa8158] pl-5 md:pl-7 py-2 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#aa8158] mb-2">
            Premium Menu Upgrade
          </p>
          <p className="text-[#656565] leading-relaxed text-[15px] md:text-base">
            Specialty drinks — including pistachio, premium matcha, and fresh
            fruit selections — are available as a premium upgrade to your
            catering menu. Ask us when you reserve.
          </p>
        </div>
      </section>

      {/* ── Choose your croffles ── */}
      <section className="bg-[#dbd3bd] px-5 md:px-[11%] py-14 md:py-24">
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-display font-light leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Choose Your Croffles
          </h2>
          <p className="text-[#5c5647] mt-4 text-[15px] md:text-lg max-w-2xl mx-auto">
            GIOT Mini Croffles — the mini size means guests can try multiple
            flavors throughout your event.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8">
          {ASSETS.croffles.map((croffle) => (
            <div key={croffle.name} className="text-center">
              <div className="w-full aspect-square overflow-hidden">
                <img
                  src={croffle.image}
                  alt={croffle.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p
                className="font-display font-light text-[#252a38] leading-tight mt-4"
                style={{ fontSize: "clamp(1.05rem, 2.6vw, 1.75rem)" }}
              >
                {croffle.name}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-[#5c5647] mt-9 md:mt-12 text-[15px] md:text-lg">
          Plus rotating seasonal flavors.
        </p>
      </section>

      {/* ── How it works ── */}
      <section className="px-5 md:px-[11%] py-14 md:py-24">
        <h2
          className="font-display font-light leading-tight text-center mb-10 md:mb-16"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          How It Works
        </h2>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-t border-[#d9d9d9] pt-6">
              <p
                className="font-display font-light text-[#b9ac89] leading-none mb-4"
                style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-semibold uppercase tracking-[0.14em] text-[13px] text-[#252a38] mb-3">
                {step.title}
              </h3>
              <p className="text-[#656565] leading-relaxed text-[15px]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Add more time ── */}
      <section className="px-5 md:px-[11%] pb-14 md:pb-24">
        <div className="border border-[#d9d9d9] p-6 md:p-12 lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-[38%] mb-8 lg:mb-0">
            <h2
              className="font-display font-light leading-tight mb-4"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              Add More Time
            </h2>
            <p className="text-[#656565] leading-relaxed text-[15px] md:text-base">
              Need GIOT to stay longer? Additional time includes continued drink
              and croffle service.
            </p>
          </div>

          <dl className="lg:flex-1 divide-y divide-[#d9d9d9] border-y border-[#d9d9d9]">
            {EXTRA_HOURS.map((tier) => (
              <div key={tier.size} className="flex items-center justify-between gap-4 py-4">
                <dt className="text-[#252a38] text-[15px] md:text-lg">{tier.size}</dt>
                <dd className="font-display font-light text-[#252a38] text-xl md:text-[28px] leading-none whitespace-nowrap">
                  {tier.rate}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Good to know ── */}
      <section className="px-5 md:px-[11%] pb-14 md:pb-24">
        <h2
          className="font-display font-light leading-tight text-center mb-10 md:mb-14"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          Good to Know
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
          {GOOD_TO_KNOW.map((item) => (
            <div key={item.title} className="border-t border-[#d9d9d9] pt-5">
              <h3 className="font-semibold uppercase tracking-[0.14em] text-[13px] text-[#252a38] mb-3">
                {item.title}
              </h3>
              <p className="text-[#656565] leading-relaxed text-[15px]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="bg-[#252a38] px-5 md:px-[11%] py-16 md:py-28 text-center">
        <p className="text-[#b9ac89] text-[11px] md:text-xs font-medium tracking-[0.28em] uppercase mb-5">
          Reserve Your Date
        </p>
        <h2
          className="font-display font-light text-white leading-[1.05] mb-6"
          style={{ fontSize: "clamp(2.3rem, 5.5vw, 4.6rem)" }}
        >
          Let&apos;s bring GIOT
          <br /> to your celebration
        </h2>
        <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-9 text-[15px] md:text-lg">
          Tell us your date, venue, and guest count and we&apos;ll put together
          your package. A $100 non-refundable deposit secures your event date
          and is applied toward your final balance.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href={INQUIRY_LINK}
            className="bg-[#b9ac89] text-[#252a38] rounded-full px-9 py-3.5 text-sm font-semibold tracking-[0.15em] uppercase hover:bg-white transition-colors duration-300"
          >
            Request a Quote
          </a>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/35 text-white rounded-full px-9 py-3.5 text-sm font-semibold tracking-[0.15em] uppercase hover:bg-white hover:text-[#252a38] hover:border-white transition-colors duration-300"
          >
            Message Us on Instagram
          </a>
        </div>

        <p className="text-white/45 text-xs md:text-sm mt-6">
          {CONTACT.email}
        </p>
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
