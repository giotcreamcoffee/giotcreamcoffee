"use client";

import { useEffect, useState } from "react";
import {
  CONTACT,
  CROFFLES,
  DRINK_MENUS,
  EVENT_TYPES,
  drinkOptions,
  type FlavorOption,
  PACKAGES,
  formatPrice,
  getPackage,
  type PackageId,
} from "./config";
import { SELECT_PACKAGE_EVENT } from "./RequestPackageLink";

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full border border-[#d9d9d9] bg-white px-4 py-3 text-[15px] text-[#252a38] placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#aa8158] focus:ring-1 focus:ring-[#aa8158] rounded-none";
const labelCls = "block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#252a38] mb-2";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
        {required ? <span className="text-[#aa8158]"> *</span> : <span className="text-[#9a9a9a] normal-case tracking-normal font-normal"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

function FlavorPicker({
  legend,
  options,
  selected,
  max,
  onToggle,
}: {
  legend: string;
  options: readonly FlavorOption[];
  selected: string[];
  max: number;
  onToggle: (flavor: string) => void;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="text-[13px] text-[#656565] mb-2">{legend}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(({ value: flavor, label }) => {
          const on = selected.includes(flavor);
          const locked = !on && selected.length >= max;
          return (
            <label
              key={flavor}
              className={`cursor-pointer select-none rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#aa8158] ${
                on
                  ? "bg-[#252a38] border-[#252a38] text-white"
                  : locked
                    ? "border-[#e6e6e6] text-[#b5b5b5] cursor-not-allowed"
                    : "border-[#d9d9d9] text-[#252a38] hover:border-[#aa8158]"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={on}
                disabled={locked}
                onChange={() => onToggle(flavor)}
              />
              {label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default function InquiryForm() {
  const [packageId, setPackageId] = useState<PackageId | "">("");
  const [drinks, setDrinks] = useState<string[]>([]);
  const [croffles, setCroffles] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [trimmed, setTrimmed] = useState(false);

  const pkg = packageId ? getPackage(packageId) : undefined;

  function choosePackage(id: PackageId) {
    const next = getPackage(id);
    if (!next) return;
    const nextDrinks = drinks.slice(0, next.maxDrinkFlavors);
    const nextCroffles = croffles.slice(0, next.maxCroffleFlavors);
    setTrimmed(nextDrinks.length < drinks.length || nextCroffles.length < croffles.length);
    setDrinks(nextDrinks);
    setCroffles(nextCroffles);
    setPackageId(id);
  }

  useEffect(() => {
    const handler = (e: Event) => choosePackage((e as CustomEvent<PackageId>).detail);
    window.addEventListener(SELECT_PACKAGE_EVENT, handler);
    return () => window.removeEventListener(SELECT_PACKAGE_EVENT, handler);
  });

  const toggle = (list: string[], set: (v: string[]) => void, max: number) => (flavor: string) => {
    setTrimmed(false);
    set(list.includes(flavor) ? list.filter((f) => f !== flavor) : list.length < max ? [...list, flavor] : list);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pkg) {
      setError("Please choose a package.");
      setStatus("error");
      return;
    }
    const data = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(data.entries()),
      guests: Number(data.get("guests")),
      packageId: pkg.id,
      drinks,
      croffles,
    };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success" && pkg) {
    return (
      <div role="status" className="border border-[#d9d9d9] bg-white p-8 md:p-12 text-center">
        <h3 className="font-display font-light text-3xl md:text-4xl mb-4">Inquiry sent</h3>
        <p className="text-[#656565] leading-relaxed max-w-xl mx-auto">
          Thank you! We received your inquiry for {pkg.name}. GIOT will review your date and
          confirm availability — your date isn&apos;t reserved until we confirm and receive the
          $100 deposit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10" aria-describedby={status === "error" ? "form-error" : undefined}>
      {/* Package */}
      <fieldset>
        <legend className={labelCls}>
          Catering package <span className="text-[#aa8158]">*</span>
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PACKAGES.map((p) => (
            <label
              key={p.id}
              className={`cursor-pointer border p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#aa8158] ${
                packageId === p.id ? "border-[#aa8158] bg-[#f7f3ea]" : "border-[#d9d9d9] hover:border-[#aa8158]"
              }`}
            >
              <input
                type="radio"
                name="packageId"
                value={p.id}
                className="sr-only"
                required
                checked={packageId === p.id}
                onChange={() => choosePackage(p.id)}
              />
              <span className="flex items-baseline justify-between gap-2">
                <span className="font-display text-xl">{p.name}</span>
                <span className="font-display text-xl">{formatPrice(p.price)}</span>
              </span>
              <span className="block text-[13px] text-[#656565] mt-1">
                {p.drinks} drinks{p.croffles ? ` · ${p.croffles} mini croffles` : " · no croffles"}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Menu */}
      {pkg && (
        <div className="border border-[#d9d9d9] bg-white p-5 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
            <p className={`${labelCls} mb-0`}>Drink flavors</p>
            <p className="text-[13px] text-[#656565]" aria-live="polite">
              {drinks.length} of {pkg.maxDrinkFlavors} selected
            </p>
          </div>
          {DRINK_MENUS.map((menu) => (
            <FlavorPicker
              key={menu.category}
              legend={menu.category}
              options={drinkOptions(menu)}
              selected={drinks}
              max={pkg.maxDrinkFlavors}
              onToggle={toggle(drinks, setDrinks, pkg.maxDrinkFlavors)}
            />
          ))}

          {pkg.maxCroffleFlavors > 0 && (
            <div className="mt-8 pt-6 border-t border-[#d9d9d9]">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <p className={`${labelCls} mb-0`}>Mini croffle flavors</p>
                <p className="text-[13px] text-[#656565]" aria-live="polite">
                  {croffles.length} of {pkg.maxCroffleFlavors} selected
                </p>
              </div>
              <FlavorPicker
                legend="Seasonal flavors are subject to availability."
                options={CROFFLES.map((c) => ({ value: c.name, label: c.name }))}
                selected={croffles}
                max={pkg.maxCroffleFlavors}
                onToggle={toggle(croffles, setCroffles, pkg.maxCroffleFlavors)}
              />
            </div>
          )}
          {trimmed && (
            <p className="text-[13px] text-[#aa8158] mt-4" role="status">
              Some selections were removed to fit the {pkg.name} flavor limits.
            </p>
          )}
        </div>
      )}

      {/* Contact + event */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Name" htmlFor="name" required>
          <input id="name" name="name" required autoComplete="name" className={inputCls} />
        </Field>
        <Field label="Email" htmlFor="email" required>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputCls} />
        </Field>
        <Field label="Phone" htmlFor="phone" required>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={inputCls} />
        </Field>
        <Field label="Event type" htmlFor="eventType" required>
          <select id="eventType" name="eventType" required defaultValue="" className={inputCls}>
            <option value="" disabled>Select…</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Event date" htmlFor="eventDate" required>
          <input id="eventDate" name="eventDate" type="date" required className={inputCls} />
        </Field>
        <Field label="Preferred service start time" htmlFor="startTime" required>
          <input id="startTime" name="startTime" type="time" required className={inputCls} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Event location / address" htmlFor="location" required>
            <input id="location" name="location" required autoComplete="street-address" className={inputCls} />
          </Field>
        </div>
        <Field label="Estimated guest count" htmlFor="guests" required>
          <input id="guests" name="guests" type="number" min={1} step={1} inputMode="numeric" required className={inputCls} />
        </Field>
        <Field label="Additional service hours requested" htmlFor="extraHours">
          <input id="extraHours" name="extraHours" placeholder="e.g. 1 extra hour" className={inputCls} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Special requests or event details" htmlFor="notes">
            <textarea id="notes" name="notes" rows={4} maxLength={2000} className={inputCls} />
          </Field>
        </div>
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Summary */}
      <div className="bg-[#f7f3ea] border border-[#d9d9d9] p-5 md:p-8" aria-live="polite">
        <p className={labelCls}>Your inquiry</p>
        {pkg ? (
          <dl className="text-[15px] text-[#656565] space-y-1">
            <div className="flex justify-between gap-4">
              <dt>Package</dt>
              <dd className="text-[#252a38] font-medium">{pkg.name} — {formatPrice(pkg.price)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Included</dt>
              <dd className="text-right">
                {pkg.drinks} drinks{pkg.croffles ? `, ${pkg.croffles} mini croffles` : ", no croffles"} · {pkg.serviceHours} hrs · {pkg.staff} staff
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Drinks</dt>
              <dd className="text-right">{drinks.join(", ") || "None selected yet"}</dd>
            </div>
            {pkg.maxCroffleFlavors > 0 && (
              <div className="flex justify-between gap-4">
                <dt>Croffles</dt>
                <dd className="text-right">{croffles.join(", ") || "None selected yet"}</dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="text-[15px] text-[#656565]">Choose a package to see your summary.</p>
        )}
        <p className="text-[13px] text-[#656565] mt-4">
          This is an inquiry, not a booking or payment. GIOT will confirm availability, and a $100
          non-refundable deposit reserves your date.
        </p>
      </div>

      {status === "error" && (
        <p id="form-error" role="alert" className="border-l-2 border-[#aa8158] pl-4 text-[15px] text-[#252a38]">
          {error} Your inquiry was not sent. Please try again, or email us at{" "}
          <a className="underline text-[#aa8158]" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full md:w-auto bg-[#252a38] text-white rounded-full px-10 py-4 text-sm font-semibold tracking-[0.15em] uppercase hover:bg-[#aa8158] transition-colors duration-300 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
