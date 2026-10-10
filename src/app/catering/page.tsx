import type { Metadata } from "next";
import InquiryForm from "./InquiryForm";
import RequestPackageLink from "./RequestPackageLink";
import {
  CROFFLES,
  DRINK_MENUS,
  FAQ,
  INCLUDED,
  PACKAGES,
  STEPS,
  formatPrice,
  packageFeatures,
} from "./config";

export const metadata: Metadata = {
  title: "Catering | Giot Cream Coffee",
  description:
    "Bring the GIOT café experience to your event. Handcrafted Vietnamese coffee, matcha, and mini croffles served from our mobile catering cart.",
};

const ASSETS = {
  logo: "/images/home/logo.png",
};

/* Hero photo mosaic: 3 columns x 3 rows, each tile placed explicitly. */
const HERO_PHOTOS = [
  { src: "/images/catering/croffle-tray.jpg",  alt: "Mini croffles plated on the GIOT cart",     place: "col-start-1 row-start-1 row-span-2", pos: "center" },
  { src: "/images/catering/barista.jpg",       alt: "GIOT barista preparing drinks at an event", place: "col-start-2 col-span-2 row-start-1", pos: "center 30%" },
  { src: "/images/catering/cups.jpg",          alt: "Iced Vietnamese coffee in labeled cups",    place: "col-start-2 row-start-2",            pos: "center 60%" },
  { src: "/images/catering/ube-croffles.jpg",  alt: "Ube mini croffles ready to serve",          place: "col-start-3 row-start-2 row-span-2", pos: "center" },
  { src: "/images/catering/event.jpg",         alt: "GIOT serving guests at a private event",    place: "col-start-1 row-start-3",            pos: "center 35%" },
  { src: "/images/catering/cart-staff.jpg",    alt: "GIOT staff setting up the catering cart",   place: "col-start-2 row-start-3",            pos: "center" },
] as const;

const ACCENT = "#b5582a"; // subtle burnt orange

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-[3px]" aria-hidden="true">
      <path d="M3 9.5L7 13.5L15 4.5" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  cart: <><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M3 4h3l2.5 11h10l2-8H7" /></>,
  staff: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></>,
  setup: <path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8" />,
  cup: <path d="M6 4h12l-1.5 16h-9zM6.5 9h11" />,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />,
  menu: <path d="M5 4h14v16H5zM9 9h6M9 13h6M9 17h3" />,
};

function Icon({ name }: { name: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
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
        <div className="order-2 lg:order-1 px-5 py-12 md:px-[9%] md:py-20 flex flex-col justify-center">
          <p className="text-[#b9ac89] text-[11px] md:text-xs font-medium tracking-[0.28em] uppercase mb-5">
            GIOT Catering
          </p>
          <h1 className="font-display font-light text-white leading-[1.05] mb-6" style={{ fontSize: "clamp(2.4rem, 5vw, 4.4rem)" }}>
            Bring the GIOT Café Experience to Your Event
          </h1>
          <p className="text-white/70 leading-relaxed max-w-xl mb-9 text-[15px] md:text-lg">
            Handcrafted Vietnamese coffee, matcha, and mini croffles, beautifully served at your celebration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a
              href="#packages"
              className="bg-[#b9ac89] text-[#252a38] rounded-full px-8 py-3.5 text-sm font-semibold tracking-[0.15em] uppercase text-center hover:bg-white transition-colors duration-300"
            >
              Explore Catering Packages
            </a>
            <a
              href="#inquiry"
              className="border border-white/35 text-white rounded-full px-8 py-3.5 text-sm font-semibold tracking-[0.15em] uppercase text-center hover:bg-white hover:text-[#252a38] hover:border-white transition-colors duration-300"
            >
              Request Catering
            </a>
          </div>
        </div>
        <div className="order-1 lg:order-2 grid grid-cols-3 grid-rows-3 gap-1 bg-[#252a38] h-[340px] md:h-[480px] lg:h-auto lg:min-h-[620px]">
          {HERO_PHOTOS.map((photo, i) => (
            <div key={photo.src} className={`${photo.place} relative overflow-hidden min-h-0`}>
              <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                style={{ objectPosition: photo.pos }}
                loading={i < 3 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Packages ── */}
      <section id="packages" className="px-5 md:px-[8%] py-14 md:py-24 scroll-mt-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-display font-light leading-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
            Catering Packages
          </h2>
          <p className="text-[#656565] mt-4 text-[15px] md:text-lg">
            Choose the package that fits your event. Each includes 2 hours of on-site service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className={`relative flex flex-col p-7 md:p-9 border transition-shadow duration-300 hover:shadow-[0_10px_40px_rgba(37,42,56,0.08)] ${
                pkg.featured ? "border-[#b5582a] bg-[#faf5ee]" : "border-[#d9d9d9] bg-white"
              }`}
            >
              <div className="h-7 mb-2">
                {pkg.featured && (
                  <span className="inline-block text-white text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full" style={{ background: ACCENT }}>
                    Most Popular
                  </span>
                )}
              </div>
              <h3 className="font-display font-light text-[32px] leading-tight">{pkg.name}</h3>
              <p className="font-display font-light text-[#252a38] text-[52px] leading-none mt-3 mb-4">
                {formatPrice(pkg.price)}
              </p>
              <p className="text-[#656565] text-[15px] leading-relaxed mb-6 min-h-[3.75rem]">{pkg.tagline}</p>
              <ul className="space-y-3 border-t border-[#d9d9d9] pt-6 mb-8 text-[15px] text-[#252a38]">
                {packageFeatures(pkg).map((f) => (
                  <li key={f} className="flex items-start gap-3 leading-snug">
                    <Check />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <RequestPackageLink
                packageId={pkg.id}
                className={`mt-auto block w-full rounded-full py-3.5 text-center text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300 ${
                  pkg.featured
                    ? "bg-[#252a38] text-white hover:bg-[#b5582a]"
                    : "border border-[#252a38] text-[#252a38] hover:bg-[#252a38] hover:text-white"
                }`}
              >
                Request This Package
              </RequestPackageLink>
            </article>
          ))}
        </div>
      </section>

      {/* ── Every experience includes ── */}
      <section className="bg-[#252a38] px-5 md:px-[11%] py-14 md:py-20">
        <h2 className="font-display font-light text-[#b9ac89] text-center leading-tight mb-10 md:mb-14" style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)" }}>
          Every GIOT Experience Includes
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 max-w-6xl mx-auto">
          {INCLUDED.map((item) => (
            <li key={item.label} className="flex items-start gap-4 text-white/85 text-[15px] md:text-base leading-snug">
              <Icon name={item.icon} />
              <span className="pt-0.5">{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Customize your menu ── */}
      <section className="px-5 md:px-[8%] py-14 md:py-24">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-display font-light leading-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
            Customize Your Menu
          </h2>
          <p className="text-[#656565] mt-4 text-[15px] md:text-lg max-w-2xl mx-auto">
            Choose your favorite GIOT drinks and mini croffles, within your package&apos;s flavor limits. Seasonal flavors are subject to availability.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
          {DRINK_MENUS.map((menu) => (
            <div key={menu.category}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[#d9d9d9] pb-3 mb-6">
                <h3 className="font-display font-light leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                  {menu.category}
                </h3>
                {"note" in menu && (
                  <p className="text-[12px] tracking-[0.12em] uppercase text-[#aa8158]">{menu.note}</p>
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {menu.flavors.map((flavor) => (
                  <div
                    key={flavor.name}
                    className="w-[calc((100%-1rem)/2)] sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-4rem)/5)] text-center"
                  >
                    <div className="aspect-square overflow-hidden bg-[#f7f3ea]">
                      <img
                        src={flavor.image}
                        alt={`${flavor.name} ${menu.category}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <p className="font-display font-light leading-tight mt-3" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>
                      {flavor.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 md:mt-20 bg-[#dbd3bd] px-5 md:px-[6%] py-10 md:py-14 -mx-5 md:mx-0 max-w-6xl lg:mx-auto">
          <h3 className="font-display font-light text-center leading-tight mb-8 md:mb-10" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Mini Croffles
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
            {CROFFLES.map((croffle) => (
              <div key={croffle.name} className="text-center">
                <div className="w-full aspect-square overflow-hidden bg-[#efe9d8] flex items-center justify-center">
                  {croffle.image ? (
                    <img src={croffle.image} alt={croffle.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <span className="font-display font-light text-[#b9ac89] text-5xl" aria-hidden="true">✦</span>
                  )}
                </div>
                <p className="font-display font-light leading-tight mt-3" style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.5rem)" }}>
                  {croffle.name}
                </p>
                {"note" in croffle && <p className="text-[12px] text-[#5c5647] mt-1">{croffle.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-5 md:px-[11%] pb-14 md:pb-24">
        <h2 className="font-display font-light leading-tight text-center mb-10 md:mb-16" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
          How It Works
        </h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-t border-[#d9d9d9] pt-6">
              <p className="font-display font-light leading-none mb-4" style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", color: ACCENT }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-semibold uppercase tracking-[0.14em] text-[13px] mb-3">{step.title}</h3>
              <p className="text-[#656565] leading-relaxed text-[15px]">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── FAQ ── */}
      <section className="px-5 md:px-[11%] pb-14 md:pb-24">
        <h2 className="font-display font-light leading-tight text-center mb-10 md:mb-14" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
          Good to Know
        </h2>
        <div className="max-w-3xl mx-auto border-t border-[#d9d9d9]">
          {FAQ.map((item) => (
            <details key={item.q} className="group border-b border-[#d9d9d9]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[16px] md:text-lg font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="text-2xl leading-none transition-transform group-open:rotate-45" style={{ color: ACCENT }} aria-hidden="true">+</span>
              </summary>
              <p className="text-[#656565] leading-relaxed text-[15px] md:text-base pb-6 pr-8">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Inquiry form ── */}
      <section id="inquiry" className="bg-[#f7f3ea] px-5 md:px-[11%] py-14 md:py-24 scroll-mt-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="font-display font-light leading-tight" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
              Request Catering
            </h2>
            <p className="text-[#656565] mt-4 text-[15px] md:text-lg">
              Tell us about your event and we&apos;ll confirm availability.
            </p>
          </div>
          <InquiryForm />
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
