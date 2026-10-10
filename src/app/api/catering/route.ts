import {
  ALL_CROFFLE_FLAVORS,
  ALL_DRINK_FLAVORS,
  formatPrice,
  getPackage,
} from "../../catering/config";

/* Sends the inquiry by email through Resend's REST API. Needs, in the server env:
     RESEND_API_KEY        API key
     CATERING_TO_EMAIL     inbox that receives inquiries
     CATERING_FROM_EMAIL   verified sender, e.g. "GIOT Catering <catering@yourdomain>"
   If any is missing we return 503 so the form never reports a false success. */

const MAX_TEXT = 2000;

function str(v: unknown, max = 200): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function strList(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success, send nothing.
  if (str(body.website)) return Response.json({ ok: true });

  const pkg = getPackage(str(body.packageId));
  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);
  const eventType = str(body.eventType);
  const eventDate = str(body.eventDate);
  const location = str(body.location, 300);
  const guests = Number(body.guests);
  const startTime = str(body.startTime);
  const extraHours = str(body.extraHours);
  const notes = str(body.notes, MAX_TEXT);
  const drinks = strList(body.drinks);
  const croffles = strList(body.croffles);

  const errors: string[] = [];
  if (!pkg) errors.push("Select a package.");
  if (!name) errors.push("Name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email is required.");
  if (phone.replace(/\D/g, "").length < 7) errors.push("A valid phone number is required.");
  if (!eventType) errors.push("Event type is required.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) errors.push("Event date is required.");
  if (!location) errors.push("Event location is required.");
  if (!Number.isInteger(guests) || guests < 1) errors.push("Guest count is required.");
  if (!startTime) errors.push("Preferred start time is required.");

  if (pkg) {
    if (drinks.length > pkg.maxDrinkFlavors)
      errors.push(`${pkg.name} allows up to ${pkg.maxDrinkFlavors} drink flavors.`);
    if (croffles.length > pkg.maxCroffleFlavors)
      errors.push(
        pkg.maxCroffleFlavors === 0
          ? `${pkg.name} does not include croffles.`
          : `${pkg.name} allows up to ${pkg.maxCroffleFlavors} croffle flavors.`,
      );
    if (drinks.some((d) => !ALL_DRINK_FLAVORS.includes(d)) ||
        croffles.some((c) => !ALL_CROFFLE_FLAVORS.includes(c)))
      errors.push("One or more selected flavors are not on the menu.");
  }

  if (errors.length || !pkg) {
    return Response.json({ error: errors.join(" ") }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CATERING_TO_EMAIL;
  const from = process.env.CATERING_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Catering inquiry not sent: email env vars are not configured.");
    return Response.json({ error: "Inquiries can't be sent right now." }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Package", `${pkg.name} — ${formatPrice(pkg.price)}`],
    ["Includes", `${pkg.drinks} drinks${pkg.croffles ? `, ${pkg.croffles} mini croffles` : ", no croffles"}; ${pkg.serviceHours} hrs; ${pkg.staff} staff`],
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Event type", eventType],
    ["Event date", eventDate],
    ["Location", location],
    ["Guests (est.)", String(guests)],
    ["Start time", startTime],
    ["Drink flavors", drinks.join(", ") || "—"],
    ["Croffle flavors", pkg.maxCroffleFlavors ? croffles.join(", ") || "—" : "n/a (drinks only)"],
    ["Additional hours", extraHours || "—"],
    ["Notes", notes || "—"],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Catering inquiry — ${pkg.name} — ${eventDate}`,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return Response.json({ error: "Inquiry could not be sent." }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend request failed", err);
    return Response.json({ error: "Inquiry could not be sent." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
