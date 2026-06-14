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
  const v = l.vehicle || {};
  return {
    id: l.vin || rl.vin || `${Math.random()}`,
    year: num(v.year),
    make: v.make || "",
    model: v.model || "",
    price: num(rl.price),
    miles: num(rl.miles),
    city: rl.city || "",
    state: rl.state || "",
    dealer: rl.dealer || "",
    photo: rl.primaryImage || null,
    carfax: rl.carfaxUrl || null,
    cpo: !!rl.cpo,
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
    const cars = list.map(mapListing).filter((c) => c.price > 0);
    res.status(200).json({ status: cars.length ? "ok" : "empty", cars });
  } catch {
    res.status(200).json({ status: "error", cars: [] });
  }
}
