import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import CarCard from "./components/CarCard";
import { searchCars } from "./lib/marketcheck";
import "./styles.css";

export default function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingSampleData, setUsingSampleData] = useState(false);

  const run = async (filters) => {
    setLoading(true);
    const result = await searchCars(filters);
    setCars(result.cars);
    setUsingSampleData(result.usingSampleData);
    setLoading(false);
  };

  useEffect(() => {
    run({});
  }, []);

  const stats = useMemo(() => {
    const great = cars.filter((c) => c.deal.rating === "great").length;
    const totalSavings = cars
      .filter((c) => c.deal.savings > 0)
      .reduce((sum, c) => sum + c.deal.savings, 0);
    return { count: cars.length, great, totalSavings };
  }, [cars]);

  return (
    <div className="app">
      <header className="hero">
        <div className="container">
          <div className="brand">
            <span className="brand-mark">CMC</span>
            <span className="brand-name">Car Market Check</span>
          </div>
          <h1 className="hero-title">
            Find the cars priced <span className="accent">below market</span>.
          </h1>
          <p className="hero-sub">
            Search used inventory and instantly see how each asking price compares
            to its fair-market value. Great deals float to the top.
          </p>
        </div>
      </header>

      <main className="container">
        <SearchBar onSearch={run} loading={loading} />

        {usingSampleData && (
          <div className="notice">
            Showing sample inventory. Add a MarketCheck API key
            (<code>REACT_APP_MARKETCHECK_KEY</code>) to search live listings.
          </div>
        )}

        {!loading && cars.length > 0 && (
          <div className="result-stats">
            <span><strong>{stats.count}</strong> matches</span>
            <span><strong>{stats.great}</strong> great deals</span>
            <span>
              up to{" "}
              <strong>
                {stats.totalSavings.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </strong>{" "}
              in total savings
            </span>
          </div>
        )}

        {loading ? (
          <div className="state">Loading inventory...</div>
        ) : cars.length === 0 ? (
          <div className="state">
            No cars match those filters. Try widening your search.
          </div>
        ) : (
          <section className="grid">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </section>
        )}
      </main>

      <footer className="footer container">
        <span>Car Market Check</span>
        <span>Deal scoring compares asking price to a fair-market estimate.</span>
      </footer>
    </div>
  );
}
