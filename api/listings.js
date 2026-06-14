// Vercel serverless proxy to the Auto.dev Vehicle Listings API.
// Keeps the Bearer key server-side (out of the browser bundle) and avoids CORS.
// Configure AUTODEV_API_KEY as an environment variable on the host.

const AUTODEV_URL = "https://api.auto.dev/listings";

function num(v) {
  if (v == null) return null;
  const n = typeof v === "string" ? parseInt(v.replace(/[^0-9.]/g, ""), 10) : v;
  return Number.isFinite(n) ? n : null;
}

function mapListing(l) {
  const rl = l.retailListing || {};
  const vehicle = l.vehicle || {};
  const loc = l.location || {};
  return {
    id: l.vin || l.id || `${Math.random()}`,
    year: num(l.year ?? vehicle.year),
    make: l.make || vehicle.make || "",
    model: [l.model || vehicle.model, l.trim || vehicle.trim]
      .filter(Boolean)
      .join(" "),
    price: num(rl.price ?? l.price),
    miles: num(l.mileage ?? l.miles ?? rl.miles ?? l.odometer),
    city: loc.city || l.city || rl.city || "",
    state: loc.state || l.state || rl.state || "",
    dealer: l.dealerName || (l.dealer && l.dealer.name) || rl.dealerName || "",
    url: l.vdpUrl || l.clickoffUrl || l.url || rl.vdpUrl || null,
  };
}

export default async function handler(req, res) {
  const key = process.env.AUTODEV_API_KEY;
  if (!key) {
    res.status(200).json({ status: "no-key", cars: [] });
    return;
  }

  const q = req.query || {};
  const params = new URLSearchParams();
  params.set("limit", "30");
  params.set("sort", "price.asc");
  if (q.zip) {
    params.set("zip", q.zip);
    params.set("distance", q.distance || "100");
  }
  if (q.make) params.set("vehicle.make", q.make);
  if (q.model) params.set("vehicle.model", q.model);
  if (q.yearMin || q.yearMax) {
    params.set("vehicle.year", `${q.yearMin || ""}-${q.yearMax || ""}`);
  }
  if (q.maxPrice) params.set("retailListing.price", `0-${q.maxPrice}`);

  try {
    const r = await fetch(`${AUTODEV_URL}?${params.toString()}`, {
      headers: { Authorization: `Bearer ${key}`, Accept: "application/json" },
    });
    if (!r.ok) {
      res.status(200).json({ status: "error", cars: [], code: r.status });
      return;
    }
    const json = await r.json();
    const list = json.data || json.listings || json.records || [];
    const cars = list.map(mapListing).filter((c) => c.make || c.price);
    res.status(200).json({ status: cars.length ? "ok" : "empty", cars });
  } catch {
    res.status(200).json({ status: "error", cars: [] });
  }
}
