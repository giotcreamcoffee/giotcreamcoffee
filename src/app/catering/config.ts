/* Single source of truth for catering: package cards, the inquiry form, and the
   API route's validation all read from here. Edit flavors freely; changing a
   package's price, quantities, or flavor limits is a change to that package only. */

export type PackageId = "gathering" | "celebration" | "signature";

export interface CateringPackage {
  id: PackageId;
  name: string;
  price: number;
  tagline: string;
  drinks: number;
  croffles: number;
  maxDrinkFlavors: number;
  maxCroffleFlavors: number;
  serviceHours: number;
  staff: number;
  featured?: boolean;
}

export const PACKAGES: CateringPackage[] = [
  {
    id: "gathering",
    name: "The Gathering",
    price: 795,
    tagline: "Perfect for intimate celebrations and smaller gatherings.",
    drinks: 75,
    croffles: 0,
    maxDrinkFlavors: 4,
    maxCroffleFlavors: 0,
    serviceHours: 2,
    staff: 2,
  },
  {
    id: "celebration",
    name: "The Celebration",
    price: 1150,
    tagline:
      "Perfect for weddings, birthdays, private parties, and corporate gatherings.",
    drinks: 100,
    croffles: 50,
    maxDrinkFlavors: 4,
    maxCroffleFlavors: 3,
    serviceHours: 2,
    staff: 2,
    featured: true,
  },
  {
    id: "signature",
    name: "The Signature",
    price: 1850,
    tagline:
      "Our premium catering experience for larger celebrations and corporate events.",
    drinks: 150,
    croffles: 100,
    maxDrinkFlavors: 6,
    maxCroffleFlavors: 4,
    serviceHours: 2,
    staff: 3,
  },
];

export function getPackage(id: string): CateringPackage | undefined {
  return PACKAGES.find((p) => p.id === id);
}

export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/** Bullet list shown on a package card, derived from the package's numbers. */
export function packageFeatures(pkg: CateringPackage): string[] {
  const list = [`${pkg.drinks} handcrafted drinks (16 oz)`];
  list.push(
    pkg.croffles > 0 ? `${pkg.croffles} mini croffles` : "Drinks only — no croffles included",
  );
  list.push(`Choose up to ${pkg.maxDrinkFlavors} drink flavors`);
  if (pkg.maxCroffleFlavors > 0) {
    list.push(`Choose up to ${pkg.maxCroffleFlavors} croffle flavors`);
  }
  list.push(`${pkg.serviceHours} hours of on-site service`);
  list.push(`${pkg.staff} GIOT staff members`);
  list.push("Mobile GIOT catering cart included");
  return list;
}

/* Mirrors the current menu pages. To add or retire a catering option, edit the
   lists here; a flavor's stored value is "Name (Category)" so the same name can
   appear in more than one category (e.g. Egg in Vietnamese and White Coffee). */
type Flavor = { name: string; image: string };

/* [display name, image file] pairs, resolved against an image folder. */
const flavors = (dir: string, items: [string, string][]): Flavor[] =>
  items.map(([name, file]) => ({ name, image: `/images/menu/${dir}${file}.jpg` }));

const VIETNAMESE_COFFEE_ITEMS: [string, string][] = [
  ["Egg", "egg"], ["Salted", "salted"], ["Pistachio", "pistachio"],
  ["Marshmallow", "marshmallow"], ["Pandan", "pandan"], ["Coconut", "coconut"],
  ["Tiramisu", "tiramisu"], ["Ube", "ube"], ["Cheesy Caramel", "cheesy-caramel"],
];

export const DRINK_MENUS = [
  {
    category: "Vietnamese Coffee",
    flavors: flavors("", VIETNAMESE_COFFEE_ITEMS),
  },
  {
    category: "White Coffee",
    flavors: flavors("white-coffee/", VIETNAMESE_COFFEE_ITEMS),
  },
  {
    category: "Cream Matcha",
    flavors: flavors("matcha/", [
      ["Sakura Strawberry", "sakura-strawberry"], ["Tiramisu", "tiramisu"],
      ["Blueberry", "blueberry"], ["Oreo Cheese", "oreo-cheese"], ["Banoffee", "banoffee"],
      ["Double", "double"], ["Brown Sugar Marshmallow", "brown-sugar-marshmallow"],
      ["Ube", "ube"], ["Coconut", "coconut"],
    ]),
  },
  {
    category: "Pure Matcha Latte",
    flavors: flavors("matcha/", [
      ["Thai Tea", "thai-tea"], ["Jasmine Oolong", "jasmine-oolong"],
      ["Earl Grey Lavender", "earl-grey-lavender"],
    ]),
  },
  {
    category: "Milk Series",
    note: "Non-caffeinated",
    flavors: flavors("milk-series/", [
      ["Sakura Strawberry Latte", "sakura-strawberry"], ["Ube Egg Latte", "ube-egg"],
    ]),
  },
] as const;

export interface FlavorOption {
  value: string;
  label: string;
}

/** Options for one drink category, with category-qualified stored values. */
export function drinkOptions(menu: (typeof DRINK_MENUS)[number]): FlavorOption[] {
  return menu.flavors.map(({ name }) => ({ value: `${name} (${menu.category})`, label: name }));
}

export const CROFFLES = [
  { name: "Sesame Coconut", image: "/images/menu/croffles/sesame-coconut.jpg" },
  { name: "Ube Coconut", image: "/images/menu/croffles/ube-coconut.jpg" },
  { name: "Biscoff & Cream", image: "/images/menu/croffles/biscoff-cream.jpg" },
  { name: "Strawberry Cheesecake", image: "/images/menu/croffles/strawberry-cheesecake.jpg" },
  { name: "Strawberry Pistachio", image: "/images/menu/croffles/strawberry-pistachio.jpg" },
  { name: "Apple Crisp", image: "/images/menu/croffles/apple-crisp.jpg" },
  { name: "Seasonal Flavor", image: null, note: "Subject to availability" },
] as const;

export const ALL_DRINK_FLAVORS: string[] = DRINK_MENUS.flatMap((m) => drinkOptions(m).map((o) => o.value));
export const ALL_CROFFLE_FLAVORS: string[] = CROFFLES.map((c) => c.name);

export const EVENT_TYPES = [
  "Wedding",
  "Birthday",
  "Corporate event",
  "Private party",
  "Other",
] as const;

export const INCLUDED = [
  { icon: "cart", label: "GIOT mobile catering cart" },
  { icon: "staff", label: "Professional on-site staff" },
  { icon: "clock", label: "2 hours of beverage service" },
  { icon: "setup", label: "Setup and breakdown" },
  { icon: "cup", label: "16 oz cups, ice, lids, and serving supplies" },
  { icon: "sparkle", label: "Signature creams, toppings, and garnishes" },
  { icon: "menu", label: "Personalized drink menu selections" },
] as const;

export const STEPS = [
  { title: "Choose your package", body: "Pick the package that fits your event." },
  { title: "Select your flavors", body: "Choose your drinks and croffles from the catering menu." },
  { title: "Send your inquiry", body: "Tell us your date, venue, and guest count. GIOT confirms availability." },
  { title: "Let GIOT handle the experience", body: "We arrive early, set up the cart, and serve your guests." },
];

export const FAQ = [
  {
    q: "How do I reserve my event?",
    a: "A $100 non-refundable deposit is required to reserve your event date. This amount is applied toward your final catering balance.",
  },
  {
    q: "How long is the catering service?",
    a: "Each package includes 2 hours of on-site service. Additional hours may be available upon request.",
  },
  {
    q: "Can I customize my menu?",
    a: "Yes! You can choose your favorite GIOT drinks and croffle flavors based on your package.",
  },
  {
    q: "Can I order additional drinks or croffles?",
    a: "Additional quantities may be available for an additional charge. Please include your request in the inquiry form.",
  },
  {
    q: "What does GIOT need at the venue?",
    a: "A suitable setup area with access to a standard electrical outlet.",
  },
  {
    q: "Is catering unlimited?",
    a: "No. These packages include a fixed number of drinks and mini croffles.",
  },
];

/* Shown as the fallback address if the inquiry form can't send. Inquiries
   themselves go to CATERING_TO_EMAIL (server env). */
export const CONTACT = {
  email: "giotcreamcoffee@gmail.com",
  instagram: "https://www.instagram.com/giot.creamcoffee/",
};
