import axios from "axios";
import sampleCars from "../data/sampleCars";
import { scoreDeal } from "./deal";

const API_KEY = process.env.REACT_APP_MARKETCHECK_KEY;
const API_URL = "https://mc-api.marketcheck.com/v2/search/car/active";

function withDeal(car) {
  return { ...car, deal: scoreDeal(car.price, car.estimate) };
}

function matchesFilters(car, f) {
  if (f.make && !car.make.toLowerCase().includes(f.make.toLowerCase())) return false;
  if (f.model && !car.model.toLowerCase().includes(f.model.toLowerCase())) return false;
  if (f.yearMin && car.year < Number(f.yearMin)) return false;
  if (f.yearMax && car.year > Number(f.yearMax)) return false;
  if (f.maxPrice && car.price > Number(f.maxPrice)) return false;
  if (f.maxMiles && car.miles > Number(f.maxMiles)) return false;
  if (f.location) {
    const loc = `${car.city} ${car.state}`.toLowerCase();
    if (!loc.includes(f.location.toLowerCase())) return false;
  }
  return true;
}

function sortByDeal(cars) {
  return [...cars].sort(
    (a, b) => (b.deal.savingsPct ?? -1) - (a.deal.savingsPct ?? -1)
  );
}

function searchSample(filters) {
  const cars = sampleCars
    .filter((c) => matchesFilters(c, filters))
    .map(withDeal);
  return { cars: sortByDeal(cars), usingSampleData: true };
}

// Map a MarketCheck v2 listing to our internal car shape.
function mapListing(l) {
  const build = l.build || {};
  const dealer = l.dealer || {};
  const estimate = l.ref_price || l.msrp || null;
  return {
    id: l.id || `${l.vin}`,
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

export async function searchCars(filters = {}) {
  if (!API_KEY) return searchSample(filters);

  try {
    const params = {
      api_key: API_KEY,
      car_type: "used",
      rows: 30,
      sort_by: "price",
      sort_order: "asc",
    };
    if (filters.make) params.make = filters.make;
    if (filters.model) params.model = filters.model;
    if (filters.yearMin) params.year_range = `${filters.yearMin}-${filters.yearMax || ""}`;
    if (filters.maxPrice) params.price_range = `0-${filters.maxPrice}`;
    if (filters.maxMiles) params.miles_range = `0-${filters.maxMiles}`;
    if (filters.location) params.city = filters.location;

    const res = await axios.get(API_URL, { params, timeout: 12000 });
    const listings = res.data && res.data.listings ? res.data.listings : [];
    const cars = listings.map(mapListing).map(withDeal);
    return { cars: sortByDeal(cars), usingSampleData: false };
  } catch {
    // Live API unavailable (expired key, rate limit, network): fall back so the
    // UI stays useful instead of empty.
    return searchSample(filters);
  }
}
