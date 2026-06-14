import axios from "axios";
import { scoreDeal } from "./deal";

const API_KEY = process.env.REACT_APP_MARKETCHECK_KEY;
const API_URL = "https://mc-api.marketcheck.com/v2/search/car/active";

function withDeal(car) {
  return { ...car, deal: scoreDeal(car.price, car.estimate) };
}

function sortByDeal(cars) {
  return [...cars].sort(
    (a, b) => (b.deal.savingsPct ?? -Infinity) - (a.deal.savingsPct ?? -Infinity)
  );
}

// Map a MarketCheck v2 listing to our internal car shape.
function mapListing(l) {
  const build = l.build || {};
  const dealer = l.dealer || {};
  const estimate = l.ref_price || l.msrp || null;
  return {
    id: l.id || l.vin,
    year: build.year,
    make: build.make,
    model: [build.model, build.trim].filter(Boolean).join(" "),
    price: l.price,
    estimate,
    miles: l.miles,
    city: dealer.city,
    state: dealer.state,
    dealer: dealer.name,
    url: l.vdp_url,
  };
}

/**
 * Search live MarketCheck inventory. Returns { cars, status } where status is
 * one of: "ok" | "empty" | "no-key" | "error". No sample/fallback data.
 *
 * @param filters  { make, model, yearMin, yearMax, maxPrice, maxMiles, radius }
 * @param coords   { lat, lng } | null  - searches near these when provided
 */
export async function searchCars(filters = {}, coords = null) {
  if (!API_KEY) return { cars: [], status: "no-key" };

  const params = {
    api_key: API_KEY,
    car_type: "used",
    rows: 30,
    sort_by: "price",
    sort_order: "asc",
  };

  if (coords && coords.lat != null && coords.lng != null) {
    params.latitude = coords.lat;
    params.longitude = coords.lng;
    params.radius = filters.radius || 100;
  }
  if (filters.make) params.make = filters.make;
  if (filters.model) params.model = filters.model;
  if (filters.yearMin || filters.yearMax) {
    params.year_range = `${filters.yearMin || ""}-${filters.yearMax || ""}`;
  }
  if (filters.maxPrice) params.price_range = `0-${filters.maxPrice}`;
  if (filters.maxMiles) params.miles_range = `0-${filters.maxMiles}`;

  try {
    const res = await axios.get(API_URL, { params, timeout: 15000 });
    const listings = (res.data && res.data.listings) || [];
    const cars = listings.map(mapListing).map(withDeal);
    return { cars: sortByDeal(cars), status: cars.length ? "ok" : "empty" };
  } catch {
    return { cars: [], status: "error" };
  }
}
