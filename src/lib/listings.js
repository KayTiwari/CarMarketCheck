import { scoreDeal } from "./deal";
import { computeEstimates } from "./estimate";

function sortByDeal(cars) {
  return [...cars].sort(
    (a, b) => (b.deal.savingsPct ?? -Infinity) - (a.deal.savingsPct ?? -Infinity)
  );
}

/**
 * Search live listings through our serverless proxy (Auto.dev). Returns
 * { cars, status } with status "ok" | "empty" | "no-key" | "error". No
 * sample/fallback data. Deal scoring uses comparable-listing medians as the
 * market estimate.
 *
 * @param filters { make, model, yearMin, yearMax, maxPrice, maxMiles, radius }
 * @param coords  { zip, city, state } | null
 */
export async function searchCars(filters = {}, coords = null) {
  const qs = new URLSearchParams();
  if (coords && coords.zip) {
    qs.set("zip", coords.zip);
    qs.set("distance", filters.radius || "100");
  }
  if (filters.make) qs.set("make", filters.make);
  if (filters.model) qs.set("model", filters.model);
  if (filters.yearMin) qs.set("yearMin", filters.yearMin);
  if (filters.yearMax) qs.set("yearMax", filters.yearMax);
  if (filters.maxPrice) qs.set("maxPrice", filters.maxPrice);

  try {
    const res = await fetch(`/api/listings?${qs.toString()}`);
    const json = await res.json();

    if (json.status === "no-key") return { cars: [], status: "no-key" };
    if (json.status === "error") return { cars: [], status: "error" };

    let cars = Array.isArray(json.cars) ? json.cars : [];
    if (filters.maxMiles) {
      const cap = Number(filters.maxMiles);
      cars = cars.filter((c) => !c.miles || c.miles <= cap);
    }

    cars = computeEstimates(cars).map((c) => ({
      ...c,
      deal: scoreDeal(c.price, c.estimate),
    }));

    return { cars: sortByDeal(cars), status: cars.length ? "ok" : "empty" };
  } catch {
    return { cars: [], status: "error" };
  }
}
